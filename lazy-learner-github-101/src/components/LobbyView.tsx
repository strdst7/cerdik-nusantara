import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  RotateCw,
  CheckCircle2,
  BookOpen,
  Compass,
} from 'lucide-react';
import {
  QUIZ_CATEGORIES,
  QUIZ_QUESTIONS,
  LanguageMode,
  QuizCategory,
} from '../data/quizData';
import { MascotHornbill } from './MascotHornbill';
import { sound } from '../utils/sound';

interface LobbyViewProps {
  language: LanguageMode;
  xp: number;
  streak: number;
  completedQuestionIds: string[];
  onStartQuiz: (categoryId: string | 'all', difficulty: 'all' | 'easy' | 'medium' | 'hard') => void;
  onOpenGlossary: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  language,
  completedQuestionIds,
  onStartQuiz,
  onOpenGlossary,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'all' | 'easy' | 'medium' | 'hard'
  >('all');
  const [heroFlipped, setHeroFlipped] = useState(false);

  const handleHeroFlip = () => {
    sound.playFlip();
    setHeroFlipped(!heroFlipped);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* SPLIT HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF5E3A]/12 via-[#FDCB6E]/15 to-[#00B894]/12 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Bilingual Headline & Quick Arcade Action */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800 border border-amber-300 dark:border-amber-600/50 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-display font-bold tracking-wide text-slate-800 dark:text-amber-300">
                {language === 'ms'
                  ? 'ARKED PENDIDIKAN DWI-BAHASA #1 NUSANTARA'
                  : 'PLAYFUL BILINGUAL ENGLISH & MALAY EDU-ARCADE'}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {language === 'ms' ? (
                  <>
                    Uji Minda Anda!{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E3A] to-[#00B894]">
                      Level Up Your Mind!
                    </span>
                  </>
                ) : (
                  <>
                    Level Up Your Mind!{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E3A] to-[#00B894]">
                      Uji Minda Anda!
                    </span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                {language === 'ms'
                  ? 'Terokai kuiz interaktif Warisan Malaysia, Sains Hutan Hujan, Peribahasa Inggeris-Melayu & Logik Kopitiam. Tukar bahasa bila-bila masa!'
                  : 'Master English & Bahasa Melayu simultaneously through fun gamified quizzes across Malaysian Heritage, Tropical Science, Idioms, and Kopitiam Math!'}
              </p>
            </div>

            {/* Difficulty Filter Pills */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {language === 'ms' ? 'Pilih Tahap Cabaran:' : 'Select Difficulty Level:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'all', labelEn: '🌟 All Levels', labelMs: '🌟 Semua Tahap' },
                    { id: 'easy', labelEn: '🌱 Easy / Mudah', labelMs: '🌱 Mudah (Easy)' },
                    {
                      id: 'medium',
                      labelEn: '🔥 Medium / Sederhana',
                      labelMs: '🔥 Sederhana (Medium)',
                    },
                    { id: 'hard', labelEn: '⚡ Hard / Cabar Minda', labelMs: '⚡ Cabar Minda (Hard)' },
                  ] as const
                ).map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedDifficulty(diff.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedDifficulty === diff.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm scale-105'
                        : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {language === 'ms' ? diff.labelMs : diff.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  sound.playClick();
                  onStartQuiz('all', selectedDifficulty);
                }}
                className="btn-3d-coral px-6 py-3.5 rounded-2xl font-display font-bold text-base sm:text-lg flex items-center gap-2.5 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>
                  {language === 'ms'
                    ? 'Mula Cabaran Pantas (Semua Topik)'
                    : 'Quick Arcade Challenge (All Topics)'}
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenGlossary();
                }}
                className="btn-3d-white px-4 py-3.5 rounded-2xl font-display font-bold text-sm flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#00B894]" />
                <span>
                  {language === 'ms' ? 'Kamus & Lencana' : 'Vocab & Badges'}
                </span>
              </button>
            </div>

            {/* Mascot Greeting Row */}
            <div className="pt-2">
              <MascotHornbill mood="happy" language={language} compact />
            </div>
          </div>

          {/* Right Column: Interactive Bilingual Flip Card Demo */}
          <div className="lg:col-span-5">
            <div
              onClick={handleHeroFlip}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-5 sm:p-6 shadow-[0_8px_0_rgba(30,36,43,0.18)] hover:translate-y-[-3px] transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {heroFlipped
                    ? '🇲🇾 Versi Bahasa Melayu'
                    : '🇬🇧 English Version Preview'}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B894] group-hover:underline"
                >
                  <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                  <span>Tap to Flip EN ↔ BM</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="min-h-[145px] flex flex-col justify-between space-y-4">
                {!heroFlipped ? (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#FF5E3A]">
                      Sample Bilingual Question • Heritage
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                      "What does the Malay proverb 'Bagai aur dengan tebing' celebrate?"
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      💡 Tap this card to see the instant Bahasa Melayu translation & vocabulary breakdown!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#00B894]">
                      Soalan Dwi-Bahasa • Peribahasa
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                      "Apakah nilai murni yang diraikan dalam peribahasa 'Bagai aur dengan tebing'?"
                    </h3>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                      ✨ Maksud: Saling bekerjasama & bantu-membantu (Mutual cooperation & support)!
                    </p>
                  </div>
                )}

                {/* Mini Vocab Pill */}
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      🇬🇧 Riverbank
                    </span>{' '}
                    ↔{' '}
                    <span className="font-bold text-[#00B894]">
                      🇲🇾 Tebing Sungai
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono-arcade font-bold text-[11px]">
                    +25 XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SELECTION GRID */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-7 h-7 text-[#FF5E3A]" />
              <span>
                {language === 'ms'
                  ? 'Pilih Zon Pengembaraan Kuiz'
                  : 'Choose Your Learning Arcade Zone'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {language === 'ms'
                ? 'Setiap kategori dilengkapi nota budaya, perbendaharaan kata EN ↔ BM & ganjaran XP'
                : 'Every topic features cultural insights, EN ↔ BM vocabulary spotlights & XP rewards'}
            </p>
          </div>

          <div className="text-xs font-mono-arcade font-bold px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            {completedQuestionIds.length} / {QUIZ_QUESTIONS.length}{' '}
            {language === 'ms' ? 'Soalan Dikuasai' : 'Questions Mastered'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUIZ_CATEGORIES.map((cat: QuizCategory) => {
            const categoryQuestions = QUIZ_QUESTIONS.filter(
              (q) => q.categoryId === cat.id
            );
            const completedCount = categoryQuestions.filter((q) =>
              completedQuestionIds.includes(q.id)
            ).length;
            const progressPercent =
              categoryQuestions.length > 0
                ? Math.round((completedCount / categoryQuestions.length) * 100)
                : 0;

            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#1C222E] border-2 border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-[0_6px_0_rgba(30,36,43,0.08)] hover:border-[#FF5E3A] dark:hover:border-[#FF5E3A] transition-all"
              >
                <div>
                  {/* Top Badge & Progress */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-200/60 dark:border-slate-700"
                      style={{ backgroundColor: `${cat.accentColor}18` }}
                    >
                      {cat.icon}
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono-arcade font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {completedCount}/{categoryQuestions.length}
                      </span>
                    </div>
                  </div>

                  {/* Category Title (Bilingual support) */}
                  <div className="space-y-1 mb-4">
                    {language === 'en' && (
                      <>
                        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                          {cat.titleEn}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.subtitleEn}
                        </p>
                      </>
                    )}
                    {language === 'ms' && (
                      <>
                        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                          {cat.titleMs}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.subtitleMs}
                        </p>
                      </>
                    )}
                    {language === 'dual' && (
                      <>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                          {cat.titleEn}
                        </h3>
                        <div className="text-sm font-semibold text-[#00B894] leading-snug">
                          {cat.titleMs}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                          {cat.subtitleEn} • {cat.subtitleMs}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {/* Mastery Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span>
                        {language === 'ms' ? 'Tahap Penguasaan' : 'Mastery Progress'}
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: cat.accentColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Play Category Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      onStartQuiz(cat.id, selectedDifficulty);
                    }}
                    className="w-full btn-3d-teal py-3 rounded-2xl font-display font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      {language === 'ms' ? 'Main Zon Ini' : 'Play This Zone'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
