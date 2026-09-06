import React, { useState } from 'react';
import { X, Search, Award, BookOpen, CheckCircle2, Lock } from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  CULTURAL_BADGES,
  LanguageMode,
  VocabPair,
} from '../data/quizData';
import { CulturalBadgeIcon } from './CulturalBadgeIcon';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
  userXp: number;
  unlockedQuestionIds: string[];
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  language,
  userXp,
  unlockedQuestionIds,
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'badges'>('vocab');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Gather all vocabulary pairs from all questions, highlighting ones the player already answered
  const allVocab: Array<VocabPair & { questionId: string; mastered: boolean }> = [];
  QUIZ_QUESTIONS.forEach((q) => {
    const mastered = unlockedQuestionIds.includes(q.id);
    q.vocabSpotlight.forEach((v) => {
      allVocab.push({ ...v, questionId: q.id, mastered });
    });
  });

  const filteredVocab = allVocab.filter(
    (item) =>
      item.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col bg-[#FFFBF2] dark:bg-[#1C222E] border-4 border-slate-900 dark:border-slate-700 rounded-3xl shadow-[0_10px_0_rgba(30,36,43,0.2)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#FF5E3A] to-[#00B894] text-white">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6" />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold leading-tight">
                {language === 'ms'
                  ? 'Buku Nota Kosa Kata & Lencana Warisan'
                  : 'Bilingual Vocab Book & Cultural Badges'}
              </h2>
              <p className="text-xs text-white/90">
                {language === 'ms'
                  ? 'Kuasai perbendaharaan kata Inggeris ↔ Melayu & kumpul trofi'
                  : 'Master English ↔ Bahasa Melayu vocabulary & collect Nusantara trophies'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 px-5 pt-2 gap-3">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`pb-2.5 px-3 font-display font-bold text-sm flex items-center gap-2 border-b-4 transition-colors ${
              activeTab === 'vocab'
                ? 'border-[#FF5E3A] text-[#FF5E3A]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {language === 'ms' ? 'Kosa Kata EN ↔ BM' : 'Vocabulary (EN ↔ BM)'} ({allVocab.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-2.5 px-3 font-display font-bold text-sm flex items-center gap-2 border-b-4 transition-colors ${
              activeTab === 'badges'
                ? 'border-[#00B894] text-[#00B894]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>
              {language === 'ms' ? 'Lencana Warisan' : 'Cultural Badges'} ({CULTURAL_BADGES.length})
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'vocab' ? (
            <>
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'ms'
                      ? 'Cari perkataan Inggeris atau Melayu...'
                      : 'Search English or Bahasa Melayu word...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-[#00B894]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredVocab.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border-2 transition-all ${
                      item.mastered
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono-arcade uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {item.partOfSpeech}
                      </span>
                      {item.mastered && (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === 'ms' ? 'Dikuasai' : 'Mastered'}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      🇬🇧 {item.en}
                    </div>
                    <div className="font-semibold text-teal-700 dark:text-teal-300 text-sm sm:text-base mt-0.5">
                      🇲🇾 {item.ms}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CULTURAL_BADGES.map((badge) => {
                const isUnlocked = userXp >= badge.requiredXp;
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-amber-400 dark:border-amber-600 shadow-sm'
                        : 'bg-slate-100/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="shrink-0">
                      <CulturalBadgeIcon type={badge.iconType} size={52} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                          {language === 'ms' ? badge.nameMs : badge.nameEn}
                        </h3>
                        {isUnlocked ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                            Unlocked!
                          </span>
                        ) : (
                          <span className="text-xs font-mono-arcade px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {badge.requiredXp} XP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {language === 'ms' ? badge.descMs : badge.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
