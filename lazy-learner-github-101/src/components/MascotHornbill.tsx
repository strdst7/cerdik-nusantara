import React from 'react';
import { LanguageMode } from '../data/quizData';

export type MascotMood = 'happy' | 'excited' | 'thinking' | 'oops' | 'champion';

interface MascotHornbillProps {
  mood: MascotMood;
  language: LanguageMode;
  customMessageEn?: string;
  customMessageMs?: string;
  compact?: boolean;
}

export const MascotHornbill: React.FC<MascotHornbillProps> = ({
  mood,
  language,
  customMessageEn,
  customMessageMs,
  compact = false,
}) => {
  const getDefaultMessages = () => {
    switch (mood) {
      case 'excited':
        return {
          en: 'Syabas! Brilliant answer! Your streak is blazing! 🔥',
          ms: 'Syabas! Jawapan tepat! Kombo anda semakin membara! 🔥',
        };
      case 'thinking':
        return {
          en: 'Take your time! Tap "Flip EN ↔ BM" if you want a bilingual clue! 💡',
          ms: 'Fikir dengan tenang! Tekan "Terbalikkan EN ↔ BM" untuk petunjuk dwi-bahasa! 💡',
        };
      case 'oops':
        return {
          en: 'Tak apa! Every mistake is a step to mastery. Check the explanation! 🌱',
          ms: 'Tak mengapa! Setiap kesilapan adalah langkah ilmu. Semak penjelasan di bawah! 🌱',
        };
      case 'champion':
        return {
          en: 'Tahniah! You are a true Nusantara Polyglot Champion! 🏆',
          ms: 'Tahniah! Anda benar-benar Juara Poliglot Nusantara! 🏆',
        };
      default:
        return {
          en: 'Selamat Datang! Ready to level up your English & Bahasa Melayu?',
          ms: 'Selamat Datang! Bersedia menguji minda dalam Bahasa Inggeris & Melayu?',
        };
    }
  };

  const defaultMsg = getDefaultMessages();
  const msgEn = customMessageEn || defaultMsg.en;
  const msgMs = customMessageMs || defaultMsg.ms;

  return (
    <div className={`flex items-center gap-3.5 ${compact ? 'py-1' : 'py-2'}`}>
      {/* Custom Animated Vector Hornbill Mascot */}
      <div className={`relative shrink-0 ${compact ? 'w-14 h-14' : 'w-20 h-20'} animate-float select-none`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow backdrop */}
          <circle cx="60" cy="62" r="50" fill="#FDCB6E" fillOpacity="0.22" />

          {/* Hornbill Tail Feathers (Black & White band) */}
          <path
            d="M25 85 L12 105 L28 108 L36 90 Z"
            fill="#1E242B"
            stroke="#1E242B"
            strokeWidth="2"
          />
          <path d="M16 98 L31 101" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

          {/* Hornbill Body */}
          <ellipse cx="56" cy="74" rx="28" ry="26" fill="#1E242B" />
          {/* White Belly Patch */}
          <ellipse cx="60" cy="79" rx="18" ry="17" fill="#FFFBF2" />

          {/* Left Wing (Animated by mood) */}
          {mood === 'excited' || mood === 'champion' ? (
            <path
              d="M32 68 C18 48, 12 58, 28 78 Z"
              fill="#FF5E3A"
              stroke="#1E242B"
              strokeWidth="2.5"
            />
          ) : (
            <path
              d="M32 66 C22 72, 26 88, 38 84 Z"
              fill="#1E242B"
              stroke="#00B894"
              strokeWidth="2"
            />
          )}

          {/* Hornbill Head */}
          <circle cx="58" cy="44" r="21" fill="#1E242B" />

          {/* Eye Ring & Expressive Eye */}
          <circle cx="62" cy="42" r="7.5" fill="#FFFBF2" />
          {mood === 'oops' ? (
            // Wincing encouraging eye
            <path
              d="M58 42 L66 42 M62 38 L62 46"
              stroke="#1E242B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ) : mood === 'excited' || mood === 'champion' ? (
            // Happy arc eye
            <path
              d="M57 43 Q62 37 67 43"
              stroke="#1E242B"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Bright alert pupil
            <>
              <circle cx="63.5" cy="42" r="4" fill="#1E242B" />
              <circle cx="65" cy="40.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Iconic Rhinoceros Hornbill Casque (Tanduk Atas Paruh - Red & Gold) */}
          <path
            d="M54 25 C68 15, 92 20, 82 32 C72 34, 62 32, 54 25 Z"
            fill="#FF5E3A"
            stroke="#1E242B"
            strokeWidth="2.5"
          />
          {/* Casque Upward Curl */}
          <path
            d="M78 26 C88 22, 95 14, 86 12 C78 14, 74 20, 78 26 Z"
            fill="#FDCB6E"
            stroke="#1E242B"
            strokeWidth="2"
          />

          {/* Large Curved Tropical Beak */}
          <path
            d="M66 34 C94 34, 108 48, 102 58 C90 54, 74 52, 65 48 Z"
            fill="#FDCB6E"
            stroke="#1E242B"
            strokeWidth="2.5"
          />
          {/* Beak Red Base Tint */}
          <path
            d="M66 34 C76 34, 82 38, 80 44 C73 44, 68 42, 65 39 Z"
            fill="#FF5E3A"
          />
          {/* Smile line */}
          <path
            d="M68 45 Q84 47 96 53"
            stroke="#1E242B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Champion Crown or Thinking Scholar Badge */}
          {mood === 'champion' && (
            <path
              d="M42 22 L48 10 L55 18 L62 8 L68 22 Z"
              fill="#FDCB6E"
              stroke="#D49B2A"
              strokeWidth="2"
            />
          )}
          {mood === 'oops' && (
            // Gentle sweat drop
            <path
              d="M42 32 C42 32, 38 38, 42 41 C46 38, 42 32, 42 32 Z"
              fill="#38BDF8"
            />
          )}

          {/* Cute Orange Feet */}
          <path d="M48 99 L44 106 M48 99 L48 107 M48 99 L52 106" stroke="#FF5E3A" strokeWidth="3" strokeLinecap="round" />
          <path d="M64 99 L60 106 M64 99 L64 107 M64 99 L68 106" stroke="#FF5E3A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bilingual Speech Bubble */}
      <div className="relative flex-1 bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-500/40 rounded-2xl px-4 py-2.5 shadow-sm">
        {/* Speech triangle pointer */}
        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-l-2 border-b-2 border-amber-300 dark:border-amber-500/40 rotate-45" />

        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-[11px] font-display uppercase tracking-wider font-bold text-orange-600 dark:text-amber-400">
            Cerdik The Hornbill • Burung Enggang
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold">
            {mood.toUpperCase()}
          </span>
        </div>

        {language === 'en' && (
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
            {msgEn}
          </p>
        )}
        {language === 'ms' && (
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
            {msgMs}
          </p>
        )}
        {language === 'dual' && (
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
              🇬🇧 {msgEn}
            </p>
            <p className="text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-300 leading-snug">
              🇲🇾 {msgMs}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
