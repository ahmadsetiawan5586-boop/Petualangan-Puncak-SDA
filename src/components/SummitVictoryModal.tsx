import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  Flag,
  Sparkles,
  Mountain,
  RotateCcw,
  ArrowRight,
  MapPin,
  Award,
  BookOpen
} from 'lucide-react';
import { ChapterLevel } from '../types';
import { soundManager } from '../utils/audio';

interface SummitVictoryModalProps {
  isOpen: boolean;
  chapter: ChapterLevel;
  earnedScore: number;
  maxScore: number;
  stars: number;
  isNextChapterUnlocked: boolean;
  nextChapter?: ChapterLevel;
  onNextChapter: () => void;
  onReplayChapter: () => void;
  onOpenMap: () => void;
  onOpenStudyGuide: () => void;
}

export const SummitVictoryModal: React.FC<SummitVictoryModalProps> = ({
  isOpen,
  chapter,
  earnedScore,
  maxScore,
  stars,
  isNextChapterUnlocked,
  nextChapter,
  onNextChapter,
  onReplayChapter,
  onOpenMap,
  onOpenStudyGuide,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    soundManager.playSummitFanfare();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#fbbf24', '#38bdf8', '#ef4444', '#a855f7'],
      });

      const timeout = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
        });
      }, 500);

      return () => clearTimeout(timeout);
    } catch {
      // Confetti fallback
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="summit-victory-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
      >
        {/* Banner with Mountain Peak Illustration */}
        <div className="relative p-6 bg-gradient-to-b from-emerald-600 via-teal-600 to-emerald-700 text-white text-center overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />

          {/* Trophy & Summit Flag Visual */}
          <div className="relative z-10 flex justify-center items-center gap-3 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-20 h-20 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-lg border-4 border-white"
            >
              <Trophy className="w-10 h-10" />
            </motion.div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-emerald-100 border border-white/30 mb-2">
              <Flag className="w-3.5 h-3.5 text-red-300" />
              <span>Puncak {chapter.mountainMaxAltitude} mdpl Tertembus!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              Selamat! Kamu Berhasil Menaklukkan {chapter.mountainName}!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Kamu telah membuktikan ketangguhan dan pemahaman luar biasa tentang Sumber Daya Alam.
            </p>
          </div>

          {/* Star Rating Display */}
          <div className="relative z-10 flex justify-center items-center gap-2 mt-4">
            {[1, 2, 3].map((starIndex) => (
              <motion.div
                key={starIndex}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + starIndex * 0.15, type: 'spring' }}
              >
                <Star
                  className={`w-9 h-9 ${
                    starIndex <= stars
                      ? 'text-yellow-300 fill-yellow-300 drop-shadow-md'
                      : 'text-white/40'
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content & Results Summary */}
        <div className="p-6 space-y-5">
          {/* Score breakdown card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Total Poin Ekspedisi
                </span>
                <span className="text-2xl font-black text-slate-800">
                  {earnedScore} <span className="text-sm font-semibold text-slate-500">/ {maxScore}</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Predikat Ranger
              </span>
              <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                {stars === 3 ? '🌟 Bintang Emas' : stars === 2 ? '⭐ Pendaki Hebat' : '✨ Penjelajah Cilik'}
              </span>
            </div>
          </div>

          {/* Level Unlock Notification (Key Feature Requested by User) */}
          {nextChapter && (
            <div
              className={`p-4 rounded-2xl border ${
                isNextChapterUnlocked
                  ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isNextChapterUnlocked ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black">
                    {isNextChapterUnlocked
                      ? '🎉 HORE! Bab Baru Berhasil Terbuka!'
                      : 'Kumpulkan Poin Lebih Banyak untuk Buka Bab Berikutnya!'}
                  </h4>
                  <p className="text-xs mt-0.5 opacity-90 font-medium leading-relaxed">
                    {isNextChapterUnlocked
                      ? `Kamu berhasil mengumpulkan poin maksimal! Kini kamu dapat mendaki ${nextChapter.mountainName} (${nextChapter.title}).`
                      : `Perlu minimal ${nextChapter.requiredPointsToUnlock} poin untuk membuka ${nextChapter.mountainName}. Daki ulang level ini untuk memaksimalkan tantangan!`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {isNextChapterUnlocked && nextChapter ? (
              <button
                id="btn-next-chapter-action"
                onClick={onNextChapter}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Mulai Ekspedisi Bab Berikutnya: {nextChapter.mountainName}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}

            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="btn-replay-chapter"
                onClick={onReplayChapter}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Daki Ulang Bab Ini</span>
              </button>

              <button
                id="btn-open-map"
                onClick={onOpenMap}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Peta 4 Gunung</span>
              </button>
            </div>

            <button
              id="btn-open-study-guide-from-victory"
              onClick={onOpenStudyGuide}
              className="w-full py-2.5 px-4 text-emerald-700 hover:bg-emerald-50 font-bold text-xs rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Buku Saku Materi Bab Ini</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
