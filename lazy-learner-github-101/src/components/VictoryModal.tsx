import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, BookOpen, Sparkles } from 'lucide-react';
import { LanguageMode } from '../data/quizData';
import { MascotHornbill } from './MascotHornbill';
import { CulturalBadgeIcon } from './CulturalBadgeIcon';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  earnedXp: number;
  language: LanguageMode;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenGlossary: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  totalQuestions,
  correctCount,
  earnedXp,
  language,
  onPlayAgain,
  onGoHome,
  onOpenGlossary,
}) => {
  useEffect(() => {
    // Launch celebratory confetti fireworks
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF5E3A', '#00B894', '#FDCB6E', '#2ECC71'],
    });
  }, []);

  // Radial Donut Ring math
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getBilingualGrade = () => {
    if (score >= 90) return { grade: 'A+ (Cemerlang)', color: '#2ECC71' };
    if (score >= 75) return { grade: 'A (Kepujian)', color: '#00B894' };
    if (score >= 50) return { grade: 'B (Baik)', color: '#F39C12' };
    return { grade: 'C (Teruskan Usaha)', color: '#FF5E3A' };
  };

  const gradeInfo = getBilingualGrade();

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 animate-fadeIn">
      <div className="rounded-3xl bg-white dark:bg-[#1C222E] border-4 border-slate-900 dark:border-slate-700 p-6 sm:p-8 shadow-[0_10px_0_rgba(30,36,43,0.18)] space-y-6 text-center">
        {/* Top Wau Bulan Emblem & Headline */}
        <div className="flex flex-col items-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-display font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {language === 'ms'
                ? 'PENGEMBARAAN KUIZ SELESAI!'
                : 'QUIZ QUEST COMPLETED!'}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            {score >= 80
              ? language === 'ms'
                ? 'Tahniah! Prestasi Luar Biasa!'
                : 'Tahniah! Outstanding Mastery!'
              : language === 'ms'
              ? 'Syabas! Usaha Yang Hebat!'
              : 'Syabas! Great Bilingual Effort!'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'ms'
              ? `Anda menjawab ${correctCount} daripada ${totalQuestions} soalan dengan tepat.`
              : `You answered ${correctCount} out of ${totalQuestions} questions correctly.`}
          </p>
        </div>

        {/* Center Radial Accuracy Donut Ring + Wau Trophy */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
          {/* SVG Donut Chart */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
              {/* Background Track */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-100 dark:text-slate-800"
                fill="transparent"
              />
              {/* Animated Accuracy Arc */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke={score >= 75 ? '#2ECC71' : score >= 50 ? '#F39C12' : '#FF5E3A'}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono-arcade font-bold text-3xl text-slate-900 dark:text-white">
                {score}%
              </span>
              <span className="text-[10px] font-bold uppercase text-slate-400">
                {language === 'ms' ? 'Ketepatan' : 'Accuracy'}
              </span>
            </div>
          </div>

          {/* Wau Bulan Trophy Badge */}
          <div className="flex flex-col items-center space-y-2">
            <CulturalBadgeIcon type="wau" size={74} />
            <div className="text-xs font-display font-bold text-slate-700 dark:text-slate-300">
              {language === 'ms'
                ? 'Trofi Penerbang Wau Bulan'
                : 'Wau Bulan Sky Trophy'}
            </div>
          </div>
        </div>

        {/* 3 KPI Summary Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800">
            <div className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
              {language === 'ms' ? 'Ketepatan Jawapan' : 'Quiz Accuracy'}
            </div>
            <div className="font-mono-arcade font-bold text-2xl text-slate-900 dark:text-white mt-1">
              {score}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800">
            <div className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
              {language === 'ms' ? 'Jumlah XP Diperoleh' : 'Total XP Earned'}
            </div>
            <div className="font-mono-arcade font-bold text-2xl text-amber-600 dark:text-amber-400 mt-1">
              +{earnedXp} XP
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-800">
            <div className="text-xs font-bold uppercase text-teal-700 dark:text-teal-400">
              {language === 'ms' ? 'Gred Dwi-Bahasa' : 'Bilingual Grade'}
            </div>
            <div
              className="font-display font-bold text-xl mt-1"
              style={{ color: gradeInfo.color }}
            >
              {gradeInfo.grade}
            </div>
          </div>
        </div>

        {/* Champion Hornbill Mascot */}
        <div className="text-left">
          <MascotHornbill mood="champion" language={language} />
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto btn-3d-coral px-6 py-3.5 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{language === 'ms' ? 'Main Semula' : 'Play Again'}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenGlossary();
            }}
            className="w-full sm:w-auto btn-3d-teal px-6 py-3.5 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>
              {language === 'ms' ? 'Semak Kosa Kata' : 'Review Vocabulary'}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoHome();
            }}
            className="w-full sm:w-auto btn-3d-white px-6 py-3.5 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span>{language === 'ms' ? 'Laman Utama' : 'Lobby Hub'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
