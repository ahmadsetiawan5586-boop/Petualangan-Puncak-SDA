import React from 'react';
import { motion } from 'motion/react';
import { Flag, Mountain, Compass, Check, Sparkles } from 'lucide-react';
import { ChapterLevel, Question } from '../types';

interface MountainCanvasProps {
  chapter: ChapterLevel;
  currentQuestionIndex: number; // 0 to 4 (corresponding to pos 1 to 5)
  isCompleted?: boolean;
  avatar: 'bima' | 'laras';
  isMoving?: boolean;
}

export const MountainCanvas: React.FC<MountainCanvasProps> = ({
  chapter,
  currentQuestionIndex,
  isCompleted = false,
  avatar,
  isMoving = false,
}) => {
  // 5 checkpoints normalized along the mountain trail (x: 0-100%, y: 0-100%)
  // SVG coordinates: viewBox 0 0 1000 480
  const checkpoints = [
    { x: 120, y: 410, name: 'Pos 1', alt: chapter.questions[0]?.altitudeMdpl || 600 },
    { x: 300, y: 330, name: 'Pos 2', alt: chapter.questions[1]?.altitudeMdpl || 1100 },
    { x: 500, y: 260, name: 'Pos 3', alt: chapter.questions[2]?.altitudeMdpl || 1700 },
    { x: 680, y: 170, name: 'Pos 4', alt: chapter.questions[3]?.altitudeMdpl || 2300 },
    { x: 860, y: 85, name: 'PUNCAK', alt: chapter.mountainMaxAltitude },
  ];

  const activeIndex = isCompleted ? 4 : Math.min(currentQuestionIndex, 4);
  const currentCheckpoint = checkpoints[activeIndex];
  const currentQuestion: Question | undefined = chapter.questions[activeIndex];

  // Mountain color scheme depending on chapter
  const getMountainColors = () => {
    switch (chapter.id) {
      case 1:
        return {
          sky: 'from-emerald-100 via-sky-100 to-teal-50',
          peakSnow: '#f8fafc',
          mountainBack: '#047857',
          mountainMid: '#059669',
          mountainFront: '#10b981',
          trailColor: '#b45309',
        };
      case 2:
        return {
          sky: 'from-amber-100 via-sky-100 to-orange-50',
          peakSnow: '#fffbeb',
          mountainBack: '#b45309',
          mountainMid: '#d97706',
          mountainFront: '#f59e0b',
          trailColor: '#78350f',
        };
      case 3:
        return {
          sky: 'from-sky-200 via-blue-100 to-cyan-50',
          peakSnow: '#f0f9ff',
          mountainBack: '#0369a1',
          mountainMid: '#0284c7',
          mountainFront: '#38bdf8',
          trailColor: '#0f172a',
        };
      case 4:
      default:
        return {
          sky: 'from-indigo-100 via-teal-100 to-emerald-50',
          peakSnow: '#ffffff',
          mountainBack: '#115e59',
          mountainMid: '#0f766e',
          mountainFront: '#14b8a6',
          trailColor: '#854d0e',
        };
    }
  };

  const colors = getMountainColors();

  return (
    <div id="mountain-expedition-container" className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-emerald-900/10 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 select-none">
      {/* Mountain Header Banner */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-white/85 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-sm">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {chapter.title.split(':')[0]} • Ekspedisi
            </div>
            <div className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
              <span>{chapter.mountainName}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {chapter.mountainMaxAltitude} mdpl
              </span>
            </div>
          </div>
        </div>

        {/* Altitude & Progress Meter */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Ketinggian Saat Ini</div>
            <div className="text-base font-black text-emerald-700 flex items-center justify-end gap-1">
              <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
              <span>{currentCheckpoint.alt} mdpl</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Posisi Pendakian</div>
            <div className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {isCompleted ? 'Puncak Tercapai! 🚩' : `${currentQuestion?.posName || `Pos ${activeIndex + 1}`}`}
            </div>
          </div>
        </div>
      </div>

      {/* SVG Mountain Hiking Landscape */}
      <div className="w-full aspect-[2.4/1] min-h-[260px] max-h-[400px]">
        <svg
          viewBox="0 0 1000 480"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="60%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#ecfdf5" />
            </linearGradient>

            <linearGradient id="mountainGradBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.mountainBack} stopOpacity="0.75" />
              <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="mountainGradMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.mountainMid} />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            <linearGradient id="mountainGradFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.mountainFront} />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>

            <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Sky background */}
          <rect width="1000" height="480" fill="url(#skyGrad)" />

          {/* Sun with gentle pulse */}
          <motion.circle
            cx="890"
            cy="70"
            r="42"
            fill="#fbbf24"
            animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="890" cy="70" r="56" fill="#fde047" opacity="0.3" />

          {/* Drifting Clouds */}
          <motion.g
            animate={{ x: [-40, 1000] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            <path
              d="M60,90 Q75,70 95,75 Q115,60 135,75 Q150,70 160,85 Q165,100 150,105 L70,105 Q55,105 60,90 Z"
              fill="#ffffff"
              opacity="0.85"
            />
          </motion.g>

          <motion.g
            animate={{ x: [-120, 1000] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear', delay: 10 }}
          >
            <path
              d="M320,65 Q335,45 355,50 Q380,35 405,52 Q420,48 430,62 Q440,75 425,82 L330,82 Q315,82 320,65 Z"
              fill="#ffffff"
              opacity="0.75"
            />
          </motion.g>

          {/* Distant Mountain Peak (Left and Back) */}
          <path
            d="M0,480 L180,240 L380,480 Z"
            fill="url(#mountainGradBack)"
            opacity="0.6"
          />
          <path
            d="M260,480 L460,190 L680,480 Z"
            fill="url(#mountainGradBack)"
            opacity="0.7"
          />

          {/* Primary High Peak with Summit Snow/Mist */}
          <path
            d="M480,480 L860,65 L1000,480 Z"
            fill="url(#mountainGradMid)"
          />
          {/* Snowy or Misty Peak Cap */}
          <polygon
            points="860,65 820,115 845,110 860,122 878,108 905,118"
            fill={colors.peakSnow}
            opacity="0.95"
          />

          {/* Foreground Mountain Slope & Forest Ridges */}
          <path
            d="M0,480 L80,360 Q220,380 340,310 Q480,270 620,200 Q780,120 860,70 L1000,200 L1000,480 Z"
            fill="url(#mountainGradFront)"
          />

          {/* Little pine trees along the ridges for decoration */}
          {[
            { x: 70, y: 395, s: 0.9 },
            { x: 95, y: 405, s: 0.8 },
            { x: 230, y: 350, s: 0.8 },
            { x: 260, y: 360, s: 0.7 },
            { x: 420, y: 285, s: 0.75 },
            { x: 450, y: 295, s: 0.7 },
            { x: 620, y: 195, s: 0.65 },
            { x: 645, y: 210, s: 0.6 },
            { x: 780, y: 125, s: 0.5 },
          ].map((tree, idx) => (
            <g key={idx} transform={`translate(${tree.x}, ${tree.y}) scale(${tree.s})`}>
              <polygon points="0,0 -8,18 8,18" fill="#064e3b" />
              <polygon points="0,-8 -6,8 6,8" fill="#047857" />
              <rect x="-2" y="18" width="4" height="6" fill="#78350f" />
            </g>
          ))}

          {/* Winding Trail Path */}
          <path
            d="M 120 410 Q 210 390, 300 330 T 500 260 T 680 170 T 860 85"
            fill="none"
            stroke={colors.trailColor}
            strokeWidth="5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Highlighted completed trail segments */}
          {activeIndex > 0 && (
            <path
              d={
                activeIndex === 1
                  ? "M 120 410 Q 210 390, 300 330"
                  : activeIndex === 2
                  ? "M 120 410 Q 210 390, 300 330 T 500 260"
                  : activeIndex === 3
                  ? "M 120 410 Q 210 390, 300 330 T 500 260 T 680 170"
                  : "M 120 410 Q 210 390, 300 330 T 500 260 T 680 170 T 860 85"
              }
              fill="none"
              stroke="#fbbf24"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#shadowFilter)"
            />
          )}

          {/* Checkpoint Markers (Pos 1 to Pos 5) */}
          {checkpoints.map((cp, idx) => {
            const isPassed = idx < activeIndex || isCompleted;
            const isCurrent = idx === activeIndex && !isCompleted;
            const isSummit = idx === 4;

            return (
              <g key={idx} transform={`translate(${cp.x}, ${cp.y})`}>
                {/* Pulsing ring for current position */}
                {isCurrent && (
                  <motion.circle
                    r="24"
                    fill="#3b82f6"
                    opacity="0.3"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Base Post Circle */}
                <circle
                  r={isSummit ? 18 : 14}
                  fill={isPassed ? '#10b981' : isCurrent ? '#3b82f6' : '#94a3b8'}
                  stroke="#ffffff"
                  strokeWidth="3"
                  filter="url(#shadowFilter)"
                />

                {/* Icon inside circle */}
                {isPassed ? (
                  <g transform="translate(-6, -6) scale(0.6)">
                    <path
                      d="M2 7 L6 11 L14 3"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : isSummit ? (
                  <text
                    x="0"
                    y="5"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="#ffffff"
                  >
                    ★
                  </text>
                ) : (
                  <text
                    x="0"
                    y="4"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="#ffffff"
                  >
                    {idx + 1}
                  </text>
                )}

                {/* Flag on Summit */}
                {isSummit && (
                  <g transform="translate(4, -36)">
                    {/* Flag pole */}
                    <line x1="0" y1="0" x2="0" y2="30" stroke="#475569" strokeWidth="2.5" />
                    {/* Indonesian Flag / Merah Putih waving */}
                    <motion.path
                      d="M0,0 Q12,-3 24,0 L24,14 Q12,11 0,14 Z"
                      fill="#ef4444"
                      animate={{ d: [
                        "M0,0 Q12,-3 24,0 L24,14 Q12,11 0,14 Z",
                        "M0,0 Q12,3 24,0 L24,14 Q12,17 0,14 Z",
                        "M0,0 Q12,-3 24,0 L24,14 Q12,11 0,14 Z"
                      ] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M0,7 Q12,4 24,7 L24,14 Q12,11 0,14 Z"
                      fill="#ffffff"
                      animate={{ d: [
                        "M0,7 Q12,4 24,7 L24,14 Q12,11 0,14 Z",
                        "M0,7 Q12,10 24,7 L24,14 Q12,17 0,14 Z",
                        "M0,7 Q12,4 24,7 L24,14 Q12,11 0,14 Z"
                      ] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </g>
                )}

                {/* Checkpoint Name Tag */}
                <g transform="translate(0, 26)">
                  <rect
                    x="-34"
                    y="-1"
                    width="68"
                    height="18"
                    rx="9"
                    fill={isCurrent ? '#1e293b' : '#ffffff'}
                    stroke={isCurrent ? '#38bdf8' : '#cbd5e1'}
                    strokeWidth="1.5"
                    filter="url(#shadowFilter)"
                  />
                  <text
                    x="0"
                    y="12"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill={isCurrent ? '#ffffff' : '#334155'}
                  >
                    {cp.name} ({cp.alt}m)
                  </text>
                </g>
              </g>
            );
          })}

          {/* Animated Climber Mascot at current checkpoint */}
          <motion.g
            id="climber-mascot"
            animate={{
              x: currentCheckpoint.x - 18,
              y: currentCheckpoint.y - 48,
              scale: isMoving ? [1, 1.15, 1] : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 18,
              duration: 1.2,
            }}
          >
            {/* Dust puffs when moving */}
            {isMoving && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.4, 2], y: [0, -8, -14] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <circle cx="12" cy="46" r="6" fill="#cbd5e1" />
                <circle cx="24" cy="44" r="5" fill="#e2e8f0" />
              </motion.g>
            )}

            {/* Mascot SVG Drawing (Student Explorer / Ranger Cilik) */}
            <g transform="translate(0, 0)">
              {/* Backpack */}
              <rect x="2" y="18" width="12" height="18" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
              <rect x="4" y="22" width="8" height="6" rx="2" fill="#d97706" />

              {/* Legs with climbing walking movement */}
              <motion.line
                x1="12"
                y1="36"
                x2="10"
                y2="46"
                stroke="#1e3a8a"
                strokeWidth="4"
                strokeLinecap="round"
                animate={isMoving ? { x2: [8, 14, 8] } : {}}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <motion.line
                x1="18"
                y1="36"
                x2="22"
                y2="46"
                stroke="#1e3a8a"
                strokeWidth="4"
                strokeLinecap="round"
                animate={isMoving ? { x2: [24, 16, 24] } : {}}
                transition={{ duration: 0.4, repeat: Infinity }}
              />

              {/* Hiking Boots */}
              <ellipse cx="9" cy="47" rx="4" ry="2.5" fill="#78350f" />
              <ellipse cx="23" cy="47" rx="4" ry="2.5" fill="#78350f" />

              {/* Body / Explorer Shirt (Khaki / Scout Green) */}
              <path
                d="M8,17 L22,17 L25,36 L6,36 Z"
                fill={avatar === 'bima' ? '#059669' : '#0284c7'}
                stroke="#064e3b"
                strokeWidth="1.5"
              />
              {/* Scout neckerchief / scarf */}
              <polygon points="12,17 18,17 15,24" fill="#ef4444" />

              {/* Head / Face */}
              <circle cx="15" cy="11" r="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
              {/* Happy smiling eyes */}
              <path d="M12,10 Q14,8 15,10" fill="none" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M16,10 Q18,8 19,10" fill="none" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
              {/* Joyful smile */}
              <path d="M13,14 Q15.5,17 18,14" fill="none" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" />

              {/* Ranger Explorer Hat */}
              <ellipse cx="15" cy="6" rx="12" ry="3.5" fill="#ca8a04" stroke="#854d0e" strokeWidth="1" />
              <path d="M9,6 Q15,-1 21,6 Z" fill="#a16207" />

              {/* Hiking Staff / Tongkat Daki */}
              <line x1="28" y1="8" x2="28" y2="48" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="28" cy="8" r="3" fill="#d97706" />

              {/* Arms */}
              <line x1="18" y1="20" x2="28" y2="18" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />

              {/* Speech bubble or sparkles */}
              <motion.g
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <rect x="22" y="-18" width="56" height="18" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.5" filter="url(#shadowFilter)" />
                <polygon points="26,0 30,0 24,-4" fill="#ffffff" />
                <text x="50" y="-6" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#047857">
                  {isCompleted ? 'PUNCAK! 🏆' : isMoving ? 'Mendaki... 🏃' : 'Semangat! 🧗'}
                </text>
              </motion.g>
            </g>
          </motion.g>
        </svg>
      </div>

      {/* Interactive Bottom Progress Indicator */}
      <div className="p-3 bg-white/95 border-t border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Jalur Pendakian:</span>
          <div className="flex items-center gap-1.5">
            {checkpoints.map((cp, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center w-6 h-6 rounded-full font-bold transition-all ${
                  idx < activeIndex || isCompleted
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : idx === activeIndex
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-110'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {idx < activeIndex || isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-28 sm:w-44 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + (isCompleted ? 1 : 0)) / 5) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="font-extrabold text-emerald-800">
            {Math.round(((activeIndex + (isCompleted ? 1 : 0)) / 5) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
