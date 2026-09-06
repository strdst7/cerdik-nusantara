import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { QuizQuestion, LanguageMode, QUIZ_CATEGORIES } from '../data/quizData';
import { MascotHornbill, MascotMood } from './MascotHornbill';
import { sound } from '../utils/sound';

interface QuizArenaProps {
  questions: QuizQuestion[];
  language: LanguageMode;
  onCompleteRound: (results: {
    score: number;
    totalQuestions: number;
    earnedXp: number;
    correctCount: number;
    masteredIds: string[];
  }) => void;
  onUpdateStats: (xpDelta: number, newStreak: number, masteredId?: string) => void;
  currentStreak: number;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  questions,
  language,
  onCompleteRound,
  onUpdateStats,
  currentStreak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showVocabHint, setShowVocabHint] = useState(false);

  // Round metrics
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXpTotal, setEarnedXpTotal] = useState(0);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [mascotMood, setMascotMood] = useState<MascotMood>('thinking');

  const currentQ = questions[currentIndex];
  const category = QUIZ_CATEGORIES.find((c) => c.id === currentQ?.categoryId);

  useEffect(() => {
    // Reset states on new question
    setSelectedOption(null);
    setIsAnswered(false);
    setCardFlipped(false);
    setShowVocabHint(false);
    setMascotMood('thinking');
  }, [currentIndex]);

  if (!currentQ) return null;

  const triggerTropicalConfetti = () => {
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF5E3A', '#00B894', '#FDCB6E', '#2ECC71'],
    });
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      const nextStreak = currentStreak + 1;
      // Streak bonus multiplier: +5 XP per streak level up to +25 XP
      const streakBonus = Math.min(nextStreak * 5, 25);
      const xpEarned = currentQ.xpReward + streakBonus;

      sound.playCorrect();
      if (nextStreak >= 3) {
        sound.playStreak();
      }
      triggerTropicalConfetti();

      setCorrectCount((prev) => prev + 1);
      setEarnedXpTotal((prev) => prev + xpEarned);
      setMasteredIds((prev) => [...prev, currentQ.id]);
      setMascotMood('excited');

      onUpdateStats(xpEarned, nextStreak, currentQ.id);
    } else {
      sound.playWrong();
      setMascotMood('oops');
      onUpdateStats(5, 0); // +5 participation XP even on learning mistake
      setEarnedXpTotal((prev) => prev + 5);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sound.playVictory();
      onCompleteRound({
        score: Math.round((correctCount / questions.length) * 100),
        totalQuestions: questions.length,
        earnedXp: earnedXpTotal,
        correctCount,
        masteredIds,
      });
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Determine which language text to show on the main card depending on flip state & language mode
  const showMalayPrimary =
    language === 'ms' ? !cardFlipped : language === 'en' ? cardFlipped : false;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-14">
      {/* Top Quiz Progress Bar & Category Badge */}
      <div className="bg-white dark:bg-[#1C222E] rounded-3xl p-4 sm:p-5 border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category?.icon || '🪁'}</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF5E3A]">
                {language === 'ms' ? category?.titleMs : category?.titleEn}
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {language === 'ms'
                  ? `Soalan ${currentIndex + 1} daripada ${questions.length}`
                  : `Question ${currentIndex + 1} of ${questions.length}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono-arcade font-bold uppercase ${
                currentQ.difficulty === 'easy'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : currentQ.difficulty === 'medium'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
              }`}
            >
              {currentQ.difficulty}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-mono-arcade font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              +{currentQ.xpReward} XP
            </span>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF5E3A] via-[#FDCB6E] to-[#00B894] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Mascot Coach Banner */}
      <MascotHornbill mood={mascotMood} language={language} />

      {/* MAIN BILINGUAL QUESTION CARD */}
      <div className="relative rounded-3xl bg-white dark:bg-[#1C222E] border-4 border-slate-900 dark:border-slate-700 p-6 sm:p-8 shadow-[0_8px_0_rgba(30,36,43,0.16)] transition-all">
        {/* Top Row: Language Indicator & Flip Button */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-display font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {language === 'dual'
                ? '✨ Dwi-Bahasa (EN + BM)'
                : showMalayPrimary
                ? '🇲🇾 Bahasa Melayu'
                : '🇬🇧 English'}
            </span>

            {/* Vocab Hint Toggle Pill */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowVocabHint(!showVocabHint);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 hover:bg-teal-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>
                {language === 'ms' ? 'Kosa Kata Soalan' : 'Vocab Spotlight'} (
                {currentQ.vocabSpotlight.length})
              </span>
            </button>
          </div>

          {language !== 'dual' && (
            <button
              type="button"
              onClick={() => {
                sound.playFlip();
                setCardFlipped(!cardFlipped);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 text-amber-900 dark:text-amber-300 text-xs font-display font-bold transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>
                {cardFlipped ? 'Flip Back' : 'Tap to Flip EN ↔ BM'}
              </span>
            </button>
          )}
        </div>

        {/* Optional Vocabulary Spotlight Drawer inside Question Card */}
        {showVocabHint && (
          <div className="mb-5 p-3.5 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border-2 border-teal-200 dark:border-teal-800/70 animate-fadeIn">
            <div className="text-xs font-display font-bold text-teal-800 dark:text-teal-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>
                {language === 'ms'
                  ? 'Petunjuk Kosa Kata EN ↔ BM:'
                  : 'Bilingual Vocabulary Key:'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentQ.vocabSpotlight.map((v, i) => (
                <div
                  key={i}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-slate-700 text-xs"
                >
                  <div className="font-bold text-slate-900 dark:text-white">
                    🇬🇧 {v.en}
                  </div>
                  <div className="font-semibold text-teal-600 dark:text-teal-400">
                    🇲🇾 {v.ms}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Prompt Typography */}
        <div className="space-y-3 py-2">
          {language === 'dual' ? (
            <div className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                🇬🇧 {currentQ.questionEn}
              </h2>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#00B894] leading-snug">
                🇲🇾 {currentQ.questionMs}
              </h3>
            </div>
          ) : showMalayPrimary ? (
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                {currentQ.questionMs}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                🇬🇧 EN: "{currentQ.questionEn}"
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                {currentQ.questionEn}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                🇲🇾 BM: "{currentQ.questionMs}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2x2 TACTILE ARCADE CHOICE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQ.optionsEn.map((optEn, idx) => {
          const optMs = currentQ.optionsMs[idx];
          const optionLabels = ['A', 'B', 'C', 'D'];
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === currentQ.correctIndex;

          let btnStyleClass = 'btn-3d-white';
          if (isAnswered) {
            if (isThisCorrect) {
              btnStyleClass = 'btn-3d-correct';
            } else if (isThisSelected && !isThisCorrect) {
              btnStyleClass = 'btn-3d-wrong animate-shake';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`group relative text-left p-4 sm:p-5 rounded-2xl font-body transition-all cursor-pointer flex items-start gap-3.5 ${btnStyleClass}`}
            >
              {/* Option Letter Badge (A, B, C, D) */}
              <div
                className={`w-9 h-9 rounded-xl font-mono-arcade font-bold text-sm flex items-center justify-center shrink-0 transition-colors ${
                  isAnswered && isThisCorrect
                    ? 'bg-white text-emerald-700'
                    : isAnswered && isThisSelected && !isThisCorrect
                    ? 'bg-white text-red-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-[#FF5E3A] group-hover:text-white'
                }`}
              >
                {optionLabels[idx]}
              </div>

              {/* Option Text in selected language mode */}
              <div className="flex-1 pr-2">
                {language === 'dual' ? (
                  <div className="space-y-1">
                    <div className="font-bold text-sm sm:text-base leading-snug">
                      {optEn}
                    </div>
                    {optEn !== optMs && (
                      <div
                        className={`text-xs font-semibold leading-snug ${
                          isAnswered && (isThisCorrect || isThisSelected)
                            ? 'text-white/90'
                            : 'text-teal-600 dark:text-teal-400'
                        }`}
                      >
                        {optMs}
                      </div>
                    )}
                  </div>
                ) : showMalayPrimary ? (
                  <div>
                    <div className="font-bold text-sm sm:text-base leading-snug">
                      {optMs}
                    </div>
                    {optMs !== optEn && (
                      <div
                        className={`text-xs mt-0.5 ${
                          isAnswered && (isThisCorrect || isThisSelected)
                            ? 'text-white/80'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {optEn}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-sm sm:text-base leading-snug">
                      {optEn}
                    </div>
                    {optEn !== optMs && (
                      <div
                        className={`text-xs mt-0.5 ${
                          isAnswered && (isThisCorrect || isThisSelected)
                            ? 'text-white/80'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {optMs}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Check/Cross Icon when answered */}
              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
              )}
              {isAnswered && isThisSelected && !isThisCorrect && (
                <XCircle className="w-6 h-6 text-white shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* POST-ANSWER BILINGUAL EXPLANATION & CULTURAL FACT DRAWER */}
      {isAnswered && (
        <div className="rounded-3xl bg-white dark:bg-[#1C222E] border-4 border-slate-900 dark:border-slate-700 p-5 sm:p-6 shadow-[0_8px_0_rgba(30,36,43,0.16)] space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              {selectedOption === currentQ.correctIndex ? (
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
              )}

              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {selectedOption === currentQ.correctIndex
                    ? language === 'ms'
                      ? 'Syabas! Jawapan Anda Tepat!'
                      : 'Syabas! Spot-on Answer!'
                    : language === 'ms'
                    ? 'Mari Belajar Bersama! (Jawapan Sebenar Di Atas)'
                    : 'Great Effort! Here is Why:'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'ms'
                    ? 'Nota Ilmu Dwi-Bahasa Inggeris & Melayu'
                    : 'Bilingual Educational Breakdown'}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="btn-3d-coral px-6 py-3 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentIndex + 1 < questions.length
                  ? language === 'ms'
                    ? 'Soalan Seterusnya'
                    : 'Next Question'
                  : language === 'ms'
                  ? 'Lihat Keputusan'
                  : 'See Final Results'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bilingual Explanations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5">
                <span>🇬🇧</span> English Explanation
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {currentQ.explanationEn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-1">
              <div className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase flex items-center gap-1.5">
                <span>🇲🇾</span> Penerangan Bahasa Melayu
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {currentQ.explanationMs}
              </p>
            </div>
          </div>

          {/* Cultural Fact Spotlight if available */}
          {(currentQ.culturalFactEn || currentQ.culturalFactMs) && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="font-display font-bold text-amber-900 dark:text-amber-300">
                  🌟 Tahukah Anda? • Cultural Trivia
                </div>
                <p className="text-slate-700 dark:text-slate-200">
                  {language === 'ms'
                    ? currentQ.culturalFactMs
                    : currentQ.culturalFactEn}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
