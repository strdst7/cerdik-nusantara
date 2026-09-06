import { useState, useEffect } from 'react';
import {
  QUIZ_QUESTIONS,
  LanguageMode,
  QuizQuestion,
} from './data/quizData';
import { ArcadeHeader } from './components/ArcadeHeader';
import { LobbyView } from './components/LobbyView';
import { QuizArena } from './components/QuizArena';
import { VictoryModal } from './components/VictoryModal';
import { GlossaryModal } from './components/GlossaryModal';
import { sound } from './utils/sound';

export function App() {
  // Persistent user progress
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('cerdik_xp');
    return saved ? parseInt(saved, 10) : 120; // Start with 120 XP so the first Wau Bulan badge is unlocked!
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('cerdik_streak');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [completedQuestionIds, setCompletedQuestionIds] = useState<string[]>(
    () => {
      const saved = localStorage.getItem('cerdik_completed_ids');
      return saved ? JSON.parse(saved) : ['her-1'];
    }
  );

  const [language, setLanguage] = useState<LanguageMode>('dual');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  // Navigation View: 'lobby' | 'arena' | 'victory'
  const [view, setView] = useState<'lobby' | 'arena' | 'victory'>('lobby');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [lastRoundResults, setLastRoundResults] = useState<{
    score: number;
    totalQuestions: number;
    earnedXp: number;
    correctCount: number;
  } | null>(null);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('cerdik_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('cerdik_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem(
      'cerdik_completed_ids',
      JSON.stringify(completedQuestionIds)
    );
  }, [completedQuestionIds]);

  // Apply Dark Mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const handleLanguageChange = (newLang: LanguageMode) => {
    sound.playClick();
    setLanguage(newLang);
  };

  const handleStartQuiz = (
    categoryId: string | 'all',
    difficulty: 'all' | 'easy' | 'medium' | 'hard'
  ) => {
    let pool = [...QUIZ_QUESTIONS];

    if (categoryId !== 'all') {
      pool = pool.filter((q) => q.categoryId === categoryId);
    }

    if (difficulty !== 'all') {
      const filteredByDiff = pool.filter((q) => q.difficulty === difficulty);
      if (filteredByDiff.length > 0) {
        pool = filteredByDiff;
      }
    }

    // Shuffle questions for replayability
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 6);
    setActiveQuestions(shuffled);
    setView('arena');
  };

  const handleUpdateStats = (
    xpDelta: number,
    newStreak: number,
    masteredId?: string
  ) => {
    setXp((prev) => prev + xpDelta);
    setStreak(newStreak);
    if (masteredId && !completedQuestionIds.includes(masteredId)) {
      setCompletedQuestionIds((prev) => [...prev, masteredId]);
    }
  };

  const handleCompleteRound = (results: {
    score: number;
    totalQuestions: number;
    earnedXp: number;
    correctCount: number;
    masteredIds: string[];
  }) => {
    setLastRoundResults({
      score: results.score,
      totalQuestions: results.totalQuestions,
      earnedXp: results.earnedXp,
      correctCount: results.correctCount,
    });
    setView('victory');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF2] dark:bg-[#12161F] text-[#1E242B] dark:text-[#F8FAFC] bg-songket transition-colors">
      {/* Top Sticky Arcade Header */}
      <ArcadeHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        xp={xp}
        streak={streak}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        darkMode={darkMode}
        onToggleDark={() => {
          sound.playClick();
          setDarkMode(!darkMode);
        }}
        onOpenGlossary={() => {
          sound.playClick();
          setIsGlossaryOpen(true);
        }}
        onGoHome={() => {
          sound.playClick();
          setView('lobby');
        }}
        inGame={view !== 'lobby'}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6">
        {view === 'lobby' && (
          <LobbyView
            language={language}
            xp={xp}
            streak={streak}
            completedQuestionIds={completedQuestionIds}
            onStartQuiz={handleStartQuiz}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}

        {view === 'arena' && (
          <QuizArena
            questions={activeQuestions}
            language={language}
            onCompleteRound={handleCompleteRound}
            onUpdateStats={handleUpdateStats}
            currentStreak={streak}
          />
        )}

        {view === 'victory' && lastRoundResults && (
          <VictoryModal
            score={lastRoundResults.score}
            totalQuestions={lastRoundResults.totalQuestions}
            correctCount={lastRoundResults.correctCount}
            earnedXp={lastRoundResults.earnedXp}
            language={language}
            onPlayAgain={() => {
              // Re-shuffle active questions and restart
              const reshuffled = [...activeQuestions].sort(
                () => Math.random() - 0.5
              );
              setActiveQuestions(reshuffled);
              setView('arena');
            }}
            onGoHome={() => setView('lobby')}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}
      </main>

      {/* Bilingual Vocab & Cultural Badges Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        language={language}
        userXp={xp}
        unlockedQuestionIds={completedQuestionIds}
      />

      {/* Playful Footer */}
      <footer className="py-5 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-display font-bold text-slate-700 dark:text-slate-300">
            🪁 Cerdik Nusantara • Playful Tropical Nusantara Edu-Arcade
          </div>
          <div>
            {language === 'ms'
              ? 'Belajar Bahasa Inggeris & Bahasa Melayu Dengan Seronok!'
              : 'Learn English & Bahasa Melayu Joyfully Together!'}
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
