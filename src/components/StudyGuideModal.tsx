import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  BookOpen,
  Sprout,
  Sun,
  Globe,
  Leaf,
  Flame,
  PackageCheck,
  Zap,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { ChapterLevel } from '../types';

interface StudyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterLevel[];
  initialChapterId: number;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({
  isOpen,
  onClose,
  chapters,
  initialChapterId,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialChapterId);

  if (!isOpen) return null;

  const currentChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const getNoteIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-emerald-600" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-600" />;
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div
      id="study-guide-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs border border-white/30">
              <BookOpen className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-xl font-black">Buku Saku Ranger Alam - IPAS Kelas 5 SD</h3>
              <p className="text-xs text-emerald-100 font-medium">
                Ringkasan materi inti Sumber Daya Alam Nusantara
              </p>
            </div>
          </div>

          <button
            id="btn-close-study-guide"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter Switcher Tabs */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
          {chapters.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapterId(chap.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                selectedChapterId === chap.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Bab {chap.chapterNumber}: {chap.mountainName}
            </button>
          ))}
        </div>

        {/* Notes Content List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="mb-4">
            <h4 className="text-lg font-black text-slate-800">{currentChapter.title}</h4>
            <p className="text-xs text-emerald-700 font-semibold">{currentChapter.subtitle}</p>
          </div>

          <div className="space-y-4">
            {currentChapter.studyNotes.map((note, idx) => (
              <div
                key={idx}
                className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200">
                    {getNoteIcon(note.icon)}
                  </div>
                  <h5 className="text-sm font-black text-slate-800">{note.title}</h5>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3 font-medium">
                  {note.content}
                </p>

                <div className="bg-white rounded-xl p-3 border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Poin Penting untuk Diingat:
                  </span>
                  <ul className="space-y-1.5">
                    {note.keyPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Materi Kurikulum Merdeka / K13 IPAS Kelas 5 SD</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Tutup Buku & Lanjut Game
          </button>
        </div>
      </motion.div>
    </div>
  );
};
