import React from 'react';
import { Volume2, VolumeX, Moon, Sun, BookOpen, Home, Flame, Zap } from 'lucide-react';
import { LanguageMode } from '../data/quizData';

interface ArcadeHeaderProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  xp: number;
  streak: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  onOpenGlossary: () => void;
  onGoHome: () => void;
  inGame: boolean;
}

export const ArcadeHeader: React.FC<ArcadeHeaderProps> = ({
  language,
  onLanguageChange,
  xp,
  streak,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDark,
  onOpenGlossary,
  onGoHome,
  inGame,
}) => {
  const level = Math.floor(xp / 100) + 1;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFFBF2]/90 dark:bg-[#12161F]/90 border-b-2 border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo & Home Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
            title={language === 'ms' ? 'Kembali ke Laman Utama' : 'Return to Home Lobby'}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E3A] to-[#FDCB6E] flex items-center justify-center shadow-[0_3px_0_#CC3D1B] group-hover:scale-105 transition-transform">
              <span className="text-xl" role="img" aria-label="Wau Bulan">
                🪁
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg leading-none text-slate-900 dark:text-white flex items-center gap-1.5">
                Cerdik Nusantara
                <span className="text-[10px] font-mono-arcade px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                  LVL {level}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {language === 'ms'
                  ? 'Arked Kuiz Dwi-Bahasa Ceria'
                  : 'Bilingual English & Malay Edu-Arcade'}
              </p>
            </div>
          </button>

          {inGame && (
            <button
              onClick={onGoHome}
              className="ml-1 px-2.5 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {language === 'ms' ? 'Keluar' : 'Lobby'}
              </span>
            </button>
          )}
        </div>

        {/* Center: Instant Language Switcher Pill (EN | BM | DUAL) */}
        <div className="flex items-center bg-slate-200/90 dark:bg-slate-800 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-700">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'en'
                ? 'bg-[#FF5E3A] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
          <button
            onClick={() => onLanguageChange('ms')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'ms'
                ? 'bg-[#00B894] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <span>🇲🇾</span>
            <span>BM</span>
          </button>
          <button
            onClick={() => onLanguageChange('dual')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              language === 'dual'
                ? 'bg-gradient-to-r from-[#FF5E3A] to-[#00B894] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
            title="Show both English & Bahasa Melayu side-by-side"
          >
            <span>✨</span>
            <span className="hidden sm:inline">Dwi-Bahasa</span>
            <span className="sm:hidden">DUAL</span>
          </button>
        </div>

        {/* Right: Streak Flame, XP Counter, Glossary & Utility Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Streak Flame Counter */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono-arcade text-xs sm:text-sm font-bold border ${
              streak > 0
                ? 'bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700 animate-flame'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title={
              language === 'ms'
                ? `Kombo Jawapan Tepat Berturut-turut: ${streak}`
                : `Current Answer Streak: ${streak}`
            }
          >
            <Flame className={`w-4 h-4 ${streak > 0 ? 'fill-orange-500 text-orange-500' : ''}`} />
            <span>{streak}</span>
          </div>

          {/* XP Counter */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono-arcade text-xs sm:text-sm font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
            title={language === 'ms' ? 'Mata Pengalaman (XP)' : 'Experience Points (XP)'}
          >
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{xp}</span>
          </div>

          {/* Bilingual Vocabulary Glossary Button */}
          <button
            onClick={onOpenGlossary}
            className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 hover:bg-teal-200 border border-teal-300 dark:border-teal-800 transition-colors"
            title={
              language === 'ms'
                ? 'Kamus Kosa Kata EN ↔ BM'
                : 'Bilingual Vocabulary Notebook (EN ↔ BM)'
            }
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            title={soundEnabled ? 'Mute Arcade Sound' : 'Enable Arcade Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Toggle Tropical Light / Midnight Jungle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
