import React from 'react';
import { motion } from 'motion/react';
import {
  X,
  Award,
  Lock,
  CheckCircle,
  Compass,
  Trees,
  Sun,
  Hammer,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { BADGES_DATA } from '../data/chapters';
import { GameProgress } from '../types';

interface BadgeGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: GameProgress;
  onChangeAvatar: (avatar: 'bima' | 'laras') => void;
}

export const BadgeGalleryModal: React.FC<BadgeGalleryModalProps> = ({
  isOpen,
  onClose,
  progress,
  onChangeAvatar,
}) => {
  if (!isOpen) return null;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-emerald-600" />;
      case 'Trees':
        return <Trees className="w-6 h-6 text-emerald-600" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-blue-600" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div
      id="badge-gallery-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs border border-white/30">
              <Award className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h3 className="text-xl font-black">Ruang Prestasi & Lencana Ranger</h3>
              <p className="text-xs text-amber-100 font-medium">
                Koleksi lencana penjelajah alam dan profil pendaki
              </p>
            </div>
          </div>

          <button
            id="btn-close-badge-modal"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar Profile Switcher */}
        <div className="p-5 bg-amber-50/60 border-b border-amber-200/80">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 block mb-2.5">
            Pilih Karakter Penjelajah:
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onChangeAvatar('bima')}
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                progress.avatar === 'bima'
                  ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-300'
                  : 'bg-white/60 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                B
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-800">Bima Sang Penjelajah</div>
                <div className="text-[11px] text-slate-500 font-medium">Seragam Rimba Hijau</div>
              </div>
              {progress.avatar === 'bima' && (
                <CheckCircle className="w-4 h-4 text-emerald-600 ml-auto" />
              )}
            </button>

            <button
              onClick={() => onChangeAvatar('laras')}
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                progress.avatar === 'laras'
                  ? 'bg-white border-sky-500 shadow-sm ring-2 ring-sky-300'
                  : 'bg-white/60 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-sm">
                L
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-800">Laras Sahabat Alam</div>
                <div className="text-[11px] text-slate-500 font-medium">Seragam Biru Samudra</div>
              </div>
              {progress.avatar === 'laras' && (
                <CheckCircle className="w-4 h-4 text-sky-600 ml-auto" />
              )}
            </button>
          </div>
        </div>

        {/* Badges List */}
        <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
          {BADGES_DATA.map((badge) => {
            const isUnlocked =
              progress.unlockedBadges.includes(badge.id) ||
              progress.totalPoints >= badge.unlockedAtPoints;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isUnlocked
                        ? 'bg-amber-100 border-amber-300'
                        : 'bg-slate-200 border-slate-300 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? getBadgeIcon(badge.icon) : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div>
                    <h5 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                      <span>{badge.title}</span>
                      {isUnlocked && (
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                          Terbuka ✓
                        </span>
                      )}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{badge.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Syarat</span>
                  <span className="text-xs font-black text-slate-700">
                    {badge.unlockedAtPoints} Poin
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
