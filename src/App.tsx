import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mountain,
  Compass,
  Award,
  BookOpen,
  Volume2,
  VolumeX,
  MapPin,
  Sparkles,
  RotateCcw,
  Flame,
  ChevronRight,
  Info
} from 'lucide-react';
import { ChapterLevel, GameProgress } from './types';
import { CHAPTERS_DATA, BADGES_DATA } from './data/chapters';
import { MountainCanvas } from './components/MountainCanvas';
import { QuestionCard } from './components/QuestionCard';
import { ClimbingTransitionModal } from './components/ClimbingTransitionModal';
import { SummitVictoryModal } from './components/SummitVictoryModal';
import { ChapterSelectModal } from './components/ChapterSelectModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { BadgeGalleryModal } from './components/BadgeGalleryModal';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'petualangan_puncak_sda_save_v1';

const defaultProgress: GameProgress = {
  playerName: 'Ranger Cilik',
  avatar: 'bima',
  currentChapterId: 1,
  unlockedChapters: [1],
  chapterScores: {},
  chapterStars: {},
  totalPoints: 0,
  soundEnabled: true,
  unlockedBadges: ['badge-1'],
};

export default function App() {
  const [progress, setProgress] = useState<GameProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultProgress, ...parsed };
      }
    } catch {
      // localStorage error fallback
    }
    return defaultProgress;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentChapterScore, setCurrentChapterScore] = useState<number>(0);
  const [comboStreak, setComboStreak] = useState<number>(0);

  // Modals
  const [isClimbingTransitionOpen, setIsClimbingTransitionOpen] = useState<boolean>(false);
  const [isSummitVictoryOpen, setIsSummitVictoryOpen] = useState<boolean>(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState<boolean>(false);
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState<boolean>(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  // Transition data
  const [transitionData, setTransitionData] = useState({
    fromAlt: 0,
    toAlt: 0,
    fromPosName: '',
    toPosName: '',
    isSummit: false,
  });

  // Current active chapter
  const currentChapter =
    CHAPTERS_DATA.find((c) => c.id === progress.currentChapterId) || CHAPTERS_DATA[0];

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  // Sync sound manager with progress setting
  useEffect(() => {
    soundManager.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  const toggleSound = () => {
    const newSetting = !progress.soundEnabled;
    setProgress((prev) => ({ ...prev, soundEnabled: newSetting }));
    soundManager.setEnabled(newSetting);
    if (newSetting) soundManager.playBonus();
  };

  // Called when user submits an answer in QuestionCard
  const handleAnswerSubmit = (isCorrect: boolean, earnedPoints: number, challengeSucceeded: boolean) => {
    if (isCorrect) {
      setCurrentChapterScore((prev) => prev + earnedPoints);
      setComboStreak((prev) => prev + 1);

      // Add to global total points
      setProgress((prev) => {
        const newTotal = prev.totalPoints + earnedPoints;
        const newBadges = [...prev.unlockedBadges];

        // Check badge unlocks
        BADGES_DATA.forEach((b) => {
          if (!newBadges.includes(b.id) && newTotal >= b.unlockedAtPoints) {
            newBadges.push(b.id);
          }
        });

        return {
          ...prev,
          totalPoints: newTotal,
          unlockedBadges: newBadges,
        };
      });
    } else {
      setComboStreak(0);
    }
  };

  // Called when user clicks "Lanjut Mendaki Gunung" after reading feedback
  const handleProceedToClimb = () => {
    const currentQ = currentChapter.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex >= currentChapter.questions.length - 1;

    if (isLastQuestion) {
      // Heading to the Summit!
      setTransitionData({
        fromAlt: currentQ.altitudeMdpl,
        toAlt: currentChapter.mountainMaxAltitude,
        fromPosName: currentQ.posName,
        toPosName: `Puncak ${currentChapter.mountainName}`,
        isSummit: true,
      });
      setIsClimbingTransitionOpen(true);
    } else {
      // Moving to next Pos
      const nextQ = currentChapter.questions[currentQuestionIndex + 1];
      setTransitionData({
        fromAlt: currentQ.altitudeMdpl,
        toAlt: nextQ.altitudeMdpl,
        fromPosName: currentQ.posName,
        toPosName: nextQ.posName,
        isSummit: false,
      });
      setIsClimbingTransitionOpen(true);
    }
  };

  // Called when climbing animation completes
  const handleClimbingAnimationComplete = () => {
    setIsClimbingTransitionOpen(false);

    if (transitionData.isSummit) {
      // Student reached the summit!
      handleSummitReached();
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Calculate stars and unlock next level when summit is reached
  const handleSummitReached = () => {
    // Max theoretical base score is around 600 - 750 points with bonuses
    let stars = 1;
    if (currentChapterScore >= 500) stars = 3;
    else if (currentChapterScore >= 350) stars = 2;

    const nextChapter = CHAPTERS_DATA.find((c) => c.id === currentChapter.id + 1);
    const newUnlocked = [...progress.unlockedChapters];

    // Check if next chapter gets unlocked
    if (nextChapter && !newUnlocked.includes(nextChapter.id)) {
      // Check unlock criteria: user earned points or accumulated total points
      if (
        progress.totalPoints >= nextChapter.requiredPointsToUnlock ||
        currentChapterScore >= 300
      ) {
        newUnlocked.push(nextChapter.id);
      }
    }

    setProgress((prev) => ({
      ...prev,
      unlockedChapters: newUnlocked,
      chapterScores: {
        ...prev.chapterScores,
        [currentChapter.id]: Math.max(prev.chapterScores[currentChapter.id] || 0, currentChapterScore),
      },
      chapterStars: {
        ...prev.chapterStars,
        [currentChapter.id]: Math.max(prev.chapterStars[currentChapter.id] || 0, stars),
      },
    }));

    setIsSummitVictoryOpen(true);
  };

  // Switch to a chosen chapter
  const handleSelectChapter = (chapterId: number) => {
    if (!progress.unlockedChapters.includes(chapterId)) return;
    setProgress((prev) => ({ ...prev, currentChapterId: chapterId }));
    setCurrentQuestionIndex(0);
    setCurrentChapterScore(0);
    setComboStreak(0);
    setIsSummitVictoryOpen(false);
  };

  // Restart current chapter
  const handleReplayChapter = () => {
    setCurrentQuestionIndex(0);
    setCurrentChapterScore(0);
    setComboStreak(0);
    setIsSummitVictoryOpen(false);
  };

  // Proceed to next chapter from victory screen
  const handleNextChapter = () => {
    const nextChap = CHAPTERS_DATA.find((c) => c.id === currentChapter.id + 1);
    if (nextChap && progress.unlockedChapters.includes(nextChap.id)) {
      handleSelectChapter(nextChap.id);
    }
  };

  // Reset entire game progress
  const handleResetProgress = () => {
    if (window.confirm('Apakah kamu yakin ingin mengulang seluruh petualangan dari awal? Semua poin dan lencana akan direset.')) {
      localStorage.removeItem(STORAGE_KEY);
      setProgress(defaultProgress);
      setCurrentQuestionIndex(0);
      setCurrentChapterScore(0);
      setComboStreak(0);
    }
  };

  const nextChapter = CHAPTERS_DATA.find((c) => c.id === currentChapter.id + 1);
  const isNextChapterUnlocked = nextChapter ? progress.unlockedChapters.includes(nextChapter.id) : false;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-emerald-200">
      {/* Top Application Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          {/* Logo / Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-none">
                  Petualangan Puncak SDA
                </h1>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300">
                  Kelas 5 SD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Game Interaktif Sumber Daya Alam Nusantara
              </p>
            </div>
          </div>

          {/* Quick Stats & Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Total Points Badge */}
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-300/80 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <div className="text-left">
                <span className="text-[9px] font-bold text-amber-800 uppercase block leading-none">
                  Poin Ekspedisi
                </span>
                <span className="text-xs sm:text-sm font-black text-amber-950 tabular-nums leading-none">
                  {progress.totalPoints}
                </span>
              </div>
            </div>

            {/* Peta Gunung Button */}
            <button
              id="btn-nav-chapter-map"
              onClick={() => setIsChapterModalOpen(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer transition-colors"
              title="Peta 4 Gunung"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Peta Gunung</span>
            </button>

            {/* Buku Saku Materi Button */}
            <button
              id="btn-nav-study-guide"
              onClick={() => setIsStudyGuideOpen(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer transition-colors"
              title="Buku Saku Materi"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span className="hidden md:inline">Buku Saku</span>
            </button>

            {/* Prestasi & Badges Button */}
            <button
              id="btn-nav-badges"
              onClick={() => setIsBadgeModalOpen(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-xl border border-slate-200 text-xs font-bold cursor-pointer transition-colors"
              title="Ruang Prestasi"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span className="hidden md:inline">Prestasi</span>
            </button>

            {/* Sound Mute/Unmute Toggle */}
            <button
              id="btn-nav-sound-toggle"
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                progress.soundEnabled
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  : 'bg-rose-50 text-rose-600 border-rose-200'
              }`}
              title={progress.soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Expedition Board */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 space-y-6">
        {/* Mountain Hiking Interactive Visualizer */}
        <section aria-label="Visualisasi Pendakian Gunung">
          <MountainCanvas
            chapter={currentChapter}
            currentQuestionIndex={currentQuestionIndex}
            isCompleted={isSummitVictoryOpen}
            avatar={progress.avatar}
            isMoving={isClimbingTransitionOpen}
          />
        </section>

        {/* Active Quiz Question & Special Challenge */}
        <section aria-label="Tantangan Kuis Soal">
          {currentChapter.questions[currentQuestionIndex] ? (
            <QuestionCard
              question={currentChapter.questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentChapter.questions.length}
              comboStreak={comboStreak}
              onAnswerSubmit={handleAnswerSubmit}
              onProceedToClimb={handleProceedToClimb}
            />
          ) : (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center">
              <h3 className="text-lg font-black text-slate-800 mb-2">Seluruh Pos Telah Dilewati!</h3>
              <p className="text-xs text-slate-500 mb-4">
                Kamu telah menuntaskan seluruh 5 pos di gunung ini.
              </p>
              <button
                onClick={handleReplayChapter}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 cursor-pointer"
              >
                Daki Ulang Bab Ini
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer info & reset */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            🌿 <strong>Petualangan Puncak SDA</strong> • Materi IPAS Kelas 5 SD Kurikulum Merdeka
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStudyGuideOpen(true)}
              className="text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              Baca Rangkuman Bab
            </button>
            <span>•</span>
            <button
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Reset Data Petualangan
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      {/* 1. Walking / Climbing Mountain Trail Transition Modal */}
      <ClimbingTransitionModal
        isOpen={isClimbingTransitionOpen}
        fromAltitude={transitionData.fromAlt}
        toAltitude={transitionData.toAlt}
        fromPosName={transitionData.fromPosName}
        toPosName={transitionData.toPosName}
        avatar={progress.avatar}
        isSummitReached={transitionData.isSummit}
        mountainName={currentChapter.mountainName}
        onComplete={handleClimbingAnimationComplete}
      />

      {/* 2. Summit Victory & Level Unlock Modal */}
      <SummitVictoryModal
        isOpen={isSummitVictoryOpen}
        chapter={currentChapter}
        earnedScore={currentChapterScore}
        maxScore={currentChapter.questions.length * 150}
        stars={progress.chapterStars[currentChapter.id] || 3}
        isNextChapterUnlocked={isNextChapterUnlocked}
        nextChapter={nextChapter}
        onNextChapter={handleNextChapter}
        onReplayChapter={handleReplayChapter}
        onOpenMap={() => {
          setIsSummitVictoryOpen(false);
          setIsChapterModalOpen(true);
        }}
        onOpenStudyGuide={() => {
          setIsSummitVictoryOpen(false);
          setIsStudyGuideOpen(true);
        }}
      />

      {/* 3. Level Map & Chapter Switcher Modal */}
      <ChapterSelectModal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        chapters={CHAPTERS_DATA}
        progress={progress}
        onSelectChapter={handleSelectChapter}
      />

      {/* 4. Study Notes Guide Modal */}
      <StudyGuideModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
        chapters={CHAPTERS_DATA}
        initialChapterId={currentChapter.id}
      />

      {/* 5. Trophy Badges & Avatar Customizer */}
      <BadgeGalleryModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        progress={progress}
        onChangeAvatar={(avatar) => setProgress((prev) => ({ ...prev, avatar }))}
      />
    </div>
  );
}
