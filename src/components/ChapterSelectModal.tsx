import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Lock,
  Star,
  Mountain,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Compass
} from 'lucide-react';
import { ChapterLevel, GameProgress } from '../types';

interface ChapterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterLevel[];
  progress: GameProgress;
  onSelectChapter: (chapterId: number) => void;
}

export const ChapterSelectModal: React.FC<ChapterSelectModalProps> = ({
  isOpen,
  onClose,
  chapters,
  progress,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="chapter-select-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs border border-white/30">
              <Compass className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-xl font-black">Peta Ekspedisi 4 Puncak Gunung</h3>
              <p className="text-xs text-emerald-100 font-medium">
                Kumpulkan poin dan selesaikan tantangan untuk membuka level berikutnya!
              </p>
            </div>
          </div>

          <button
            id="btn-close-chapter-modal"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Total Poin Ekspedisi:</span>
            <span className="font-black text-emerald-700 text-sm bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              {progress.totalPoints} Poin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Status Gunung Terbuka:</span>
            <span className="font-black text-slate-800">
              {progress.unlockedChapters.length} dari 4 Gunung
            </span>
          </div>
        </div>

        {/* Chapter Mountain Cards Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto">
          {chapters.map((chap) => {
            const isUnlocked = progress.unlockedChapters.includes(chap.id);
            const isCurrent = progress.currentChapterId === chap.id;
            const stars = progress.chapterStars[chap.id] || 0;
            const bestScore = progress.chapterScores[chap.id] || 0;

            return (
              <div
                key={chap.id}
                className={`relative rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? isCurrent
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-md ring-2 ring-emerald-300'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                    : 'bg-slate-100/80 border-slate-300 opacity-80'
                }`}
              >
                {/* Status Badge Top Right */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Bab {chap.chapterNumber}
                  </span>

                  {isUnlocked ? (
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= stars
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                      <Lock className="w-3 h-3" />
                      Terkunci
                    </span>
                  )}
                </div>

                {/* Mountain Details */}
                <div className="mb-4">
                  <h4 className="text-base font-black text-slate-800 flex items-center gap-1.5">
                    <Mountain className={`w-4 h-4 ${isUnlocked ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{chap.mountainName}</span>
                  </h4>
                  <div className="text-xs font-bold text-emerald-700 mt-0.5">
                    {chap.subtitle} • {chap.mountainMaxAltitude} mdpl
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
                    {chap.description}
                  </p>
                </div>

                {/* Bottom Info or Action */}
                <div>
                  {isUnlocked ? (
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
                      <div className="text-[11px] font-semibold text-slate-500">
                        Skor Terbaik:{' '}
                        <span className="font-extrabold text-slate-800">{bestScore}</span>
                      </div>
                      <button
                        id={`btn-select-chapter-${chap.id}`}
                        onClick={() => {
                          onSelectChapter(chap.id);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 cursor-pointer transition-colors ${
                          isCurrent
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-900 text-white'
                        }`}
                      >
                        <span>{isCurrent ? 'Lanjutkan' : 'Mulai Daki'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-amber-800 font-semibold bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                      <Lock className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>
                        Kumpulkan minimal {chap.requiredPointsToUnlock} poin untuk membuka gunung ini!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-medium">
            💡 Tips Ranger: Selesaikan semua tantangan khusus di setiap soal untuk mendapatkan bonus poin maksimal!
          </p>
        </div>
      </motion.div>
    </div>
  );
};
