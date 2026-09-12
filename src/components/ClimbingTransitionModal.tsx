import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Mountain, ArrowUpRight, Sparkles, Footprints, Flag } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ClimbingTransitionModalProps {
  isOpen: boolean;
  fromAltitude: number;
  toAltitude: number;
  fromPosName: string;
  toPosName: string;
  avatar: 'bima' | 'laras';
  isSummitReached: boolean;
  mountainName: string;
  onComplete: () => void;
}

export const ClimbingTransitionModal: React.FC<ClimbingTransitionModalProps> = ({
  isOpen,
  fromAltitude,
  toAltitude,
  fromPosName,
  toPosName,
  avatar,
  isSummitReached,
  mountainName,
  onComplete,
}) => {
  const [currentAlt, setCurrentAlt] = useState<number>(fromAltitude);
  const [stepCount, setStepCount] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    // Reset altimeter
    setCurrentAlt(fromAltitude);
    setStepCount(0);

    // Audio step loop
    soundManager.playClimbingAscent();

    const stepInterval = setInterval(() => {
      soundManager.playStep();
      setStepCount((prev) => prev + 1);
    }, 450);

    // Altitude counter animated increment
    const altitudeStep = Math.max(1, Math.round((toAltitude - fromAltitude) / 30));
    const altInterval = setInterval(() => {
      setCurrentAlt((prev) => {
        if (prev + altitudeStep >= toAltitude) {
          clearInterval(altInterval);
          return toAltitude;
        }
        return prev + altitudeStep;
      });
    }, 40);

    // Auto-complete or allow user to click after 3.2s
    const timeout = setTimeout(() => {
      // Finished
    }, 3200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(altInterval);
      clearTimeout(timeout);
    };
  }, [isOpen, fromAltitude, toAltitude]);

  if (!isOpen) return null;

  return (
    <div
      id="climbing-transition-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="w-full max-w-lg bg-gradient-to-b from-sky-100 via-emerald-50 to-white rounded-3xl shadow-2xl border-2 border-emerald-400 overflow-hidden"
      >
        {/* Animated Scenic Trail Header */}
        <div className="relative h-56 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 overflow-hidden flex items-end justify-center">
          {/* Drifting Clouds in background */}
          <motion.div
            animate={{ x: [-100, 400] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 left-0 text-white/80"
          >
            <div className="w-24 h-8 bg-white/70 rounded-full blur-xs" />
          </motion.div>
          <motion.div
            animate={{ x: [-80, 500] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 4 }}
            className="absolute top-10 left-10 text-white/70"
          >
            <div className="w-32 h-9 bg-white/60 rounded-full blur-xs" />
          </motion.div>

          {/* Mountains SVG silhouettes */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Distant mountain */}
            <polygon points="40,200 160,70 280,200" fill="#047857" opacity="0.35" />
            <polygon points="200,200 300,50 400,200" fill="#065f46" opacity="0.45" />

            {/* Steep Climbing Trail Slope */}
            <path
              d="M-20,200 Q150,190 280,110 T420,40 L420,200 Z"
              fill="#10b981"
            />
            {/* Trail Line */}
            <path
              d="M0,190 Q150,180 270,110 T400,45"
              fill="none"
              stroke="#b45309"
              strokeWidth="6"
              strokeDasharray="10 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Animated Mascot Walking Up The Trail */}
          <motion.div
            animate={{
              x: [-60, 30],
              y: [20, -40],
            }}
            transition={{ duration: 2.8, ease: 'easeInOut' }}
            className="relative z-10 mb-6 flex flex-col items-center"
          >
            {/* Mascot Avatar Graphics */}
            <div className="relative">
              {/* Hiking stick swinging */}
              <motion.div
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-3 bottom-0 w-1 h-12 bg-amber-800 rounded-full origin-top"
              />

              {/* Explorer Mascot Body */}
              <div className="relative flex flex-col items-center">
                {/* Explorer Hat */}
                <div className="w-10 h-3 bg-amber-600 rounded-full shadow-xs -mb-1 z-10 border border-amber-800" />
                <div className="w-6 h-4 bg-amber-700 rounded-t-lg -mb-2 border border-amber-900" />

                {/* Head */}
                <div className="w-9 h-9 bg-orange-200 rounded-full border-2 border-orange-400 flex items-center justify-center relative shadow-xs">
                  {/* Smiling Face */}
                  <div className="text-[11px] font-black text-amber-950 select-none">
                    ^_^
                  </div>
                  {/* Neckerchief */}
                  <div className="absolute -bottom-1 w-3 h-3 bg-red-500 rotate-45" />
                </div>

                {/* Body with backpack */}
                <div className="relative">
                  <div
                    className={`w-9 h-11 rounded-xl border-2 flex items-center justify-center shadow-xs ${
                      avatar === 'bima'
                        ? 'bg-emerald-600 border-emerald-800'
                        : 'bg-sky-600 border-sky-800'
                    }`}
                  >
                    <span className="text-[9px] text-white font-black">SDA</span>
                  </div>
                  {/* Backpack */}
                  <div className="absolute -left-2.5 top-1 w-3.5 h-8 bg-amber-800 rounded-l-md border border-amber-950" />
                </div>

                {/* Animated walking legs */}
                <div className="flex gap-2 -mt-1">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                    className="w-3 h-5 bg-slate-800 rounded-b-md"
                  />
                  <motion.div
                    animate={{ y: [-6, 0, -6] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                    className="w-3 h-5 bg-slate-800 rounded-b-md"
                  />
                </div>
              </div>

              {/* Dust puffs at feet */}
              <motion.div
                animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="absolute -bottom-2 -left-2 text-slate-400"
              >
                <div className="w-3 h-3 bg-slate-300/80 rounded-full blur-2xs" />
              </motion.div>
            </div>
          </motion.div>

          {/* Summit flag in top right corner */}
          {isSummitReached && (
            <div className="absolute top-6 right-8 flex flex-col items-center animate-bounce">
              <div className="w-8 h-5 bg-red-500 rounded-t-xs border-b border-white" />
              <div className="w-8 h-5 bg-white rounded-b-xs shadow-xs" />
              <div className="w-1 h-14 bg-slate-700" />
            </div>
          )}
        </div>

        {/* Content & Progress Stats */}
        <div className="p-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black mb-2 border border-emerald-300">
            <Footprints className="w-4 h-4" />
            <span>Sedang Mendaki Jalur {mountainName}</span>
          </div>

          <h3 className="text-xl font-black text-slate-800 mb-1">
            {isSummitReached ? 'Hore! Menuju Puncak Tertinggi!' : 'Melangkah Maju ke Pos Berikutnya!'}
          </h3>

          <p className="text-xs text-slate-600 font-medium mb-5">
            Dari <span className="font-bold text-slate-800">{fromPosName}</span> menuju{' '}
            <span className="font-bold text-emerald-700">{toPosName}</span>
          </p>

          {/* Animated Altimeter Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex items-center justify-around">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Mountain className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ketinggian Posisi
                </span>
                <span className="text-2xl font-black text-emerald-700 tabular-nums">
                  {currentAlt.toLocaleString()} mdpl
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-emerald-600 font-black text-sm bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <ArrowUpRight className="w-5 h-5" />
              <span>+{Math.max(0, toAltitude - fromAltitude)} m</span>
            </div>
          </div>

          {/* Action button */}
          <button
            id="btn-confirm-next-pos"
            onClick={onComplete}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSummitReached ? 'Kibarkan Bendera di Puncak! 🚩' : 'Tiba di Pos Baru, Siap Lanjut! ➔'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
