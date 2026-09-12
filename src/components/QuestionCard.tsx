import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  Timer,
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  TreePine,
  Sun,
  Droplets,
  Wind,
  Layers,
  Recycle,
  Fuel,
  Volume2
} from 'lucide-react';
import { Question } from '../types';
import { soundManager } from '../utils/audio';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  comboStreak: number;
  onAnswerSubmit: (isCorrect: boolean, earnedPoints: number, challengeSucceeded: boolean) => void;
  onProceedToClimb: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  comboStreak,
  onAnswerSubmit,
  onProceedToClimb,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(question.challenge.timeLimitSeconds || 15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(
    question.challenge.type === 'fast_time'
  );
  const [challengeSuccess, setChallengeSuccess] = useState<boolean>(false);
  const [earnedScore, setEarnedScore] = useState<number>(0);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setTimeLeft(question.challenge.timeLimitSeconds || 15);
    setIsTimerRunning(question.challenge.type === 'fast_time');
    setChallengeSuccess(false);
    setEarnedScore(0);
  }, [question.id]);

  // Countdown timer for fast_time challenges
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;

    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isSubmitted]);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
    setIsSubmitted(true);
    setIsTimerRunning(false);

    const isCorrect = index === question.correctAnswer;
    let points = 0;
    let challengePassed = false;

    if (isCorrect) {
      soundManager.playCorrect();

      // Check special challenge criteria
      if (question.challenge.type === 'fast_time') {
        if (timeLeft > 0) {
          challengePassed = true;
          soundManager.playBonus();
        }
      } else if (question.challenge.type === 'streak') {
        challengePassed = comboStreak >= 1;
        if (challengePassed) soundManager.playBonus();
      } else {
        // Eco action / Detective: awarded on correct answer
        challengePassed = true;
        soundManager.playBonus();
      }

      const base = question.basePoints;
      const challengeBonus = challengePassed ? question.challenge.bonusPoints : 0;
      const comboBonus = Math.min(comboStreak * 15, 60);

      points = base + challengeBonus + comboBonus;
      setChallengeSuccess(challengePassed);
      setEarnedScore(points);
    } else {
      soundManager.playWrong();
      setChallengeSuccess(false);
      setEarnedScore(0);
    }

    onAnswerSubmit(isCorrect, points, challengePassed);
  };

  const getThemeIcon = () => {
    switch (question.illustrationType) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'water':
        return <Droplets className="w-6 h-6 text-blue-500" />;
      case 'forest':
        return <TreePine className="w-6 h-6 text-emerald-600" />;
      case 'wind':
        return <Wind className="w-6 h-6 text-cyan-500" />;
      case 'recycle':
        return <Recycle className="w-6 h-6 text-teal-600" />;
      case 'petroleum':
      case 'coal':
        return <Fuel className="w-6 h-6 text-orange-600" />;
      default:
        return <Layers className="w-6 h-6 text-emerald-600" />;
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div id="active-quiz-card" className="w-full bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
      {/* Question Header & Special Challenge Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-emerald-50/50 to-slate-50 border-b border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-extrabold rounded-full shadow-xs">
              Soal {questionNumber} dari {totalQuestions}
            </span>
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-slate-200">
              {getThemeIcon()}
              {question.posName}
            </span>
          </div>

          {/* Combo Streak pill */}
          {comboStreak > 0 && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-black shadow-xs"
            >
              <Flame className="w-4 h-4 text-yellow-200 fill-yellow-200 animate-bounce" />
              <span>Combo x{comboStreak + 1}</span>
            </motion.div>
          )}
        </div>

        {/* Special Challenge Box */}
        <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                <span>{question.challenge.title}</span>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.2 rounded-full font-bold">
                  +{question.challenge.bonusPoints} Poin Bonus
                </span>
              </div>
              <p className="text-xs text-amber-800 font-medium">{question.challenge.description}</p>
            </div>
          </div>

          {/* Timer Display if fast_time */}
          {question.challenge.type === 'fast_time' && (
            <div className="flex items-center gap-2 self-end sm:self-center bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs">
              <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-amber-600'}`} />
              <span className={`text-sm font-black tabular-nums ${timeLeft <= 5 ? 'text-red-600' : 'text-slate-800'}`}>
                {timeLeft} detik
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-relaxed mb-6">
          {question.text}
        </h3>

        {/* 4 Interactive Answer Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctAnswer;

            let cardStyle =
              'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 text-slate-700 hover:border-emerald-300 hover:shadow-sm';
            let badgeStyle = 'bg-white border-slate-300 text-slate-600';

            if (isSubmitted) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                badgeStyle = 'bg-emerald-600 border-emerald-600 text-white';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                badgeStyle = 'bg-rose-500 border-rose-500 text-white';
              } else {
                cardStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <motion.button
                id={`quiz-option-${idx}`}
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isSubmitted}
                whileHover={!isSubmitted ? { scale: 1.015, y: -2 } : {}}
                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all relative ${cardStyle} cursor-pointer disabled:cursor-default`}
              >
                <span
                  className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-black text-sm border shadow-2xs transition-colors ${badgeStyle}`}
                >
                  {optionLetters[idx]}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1 font-semibold">{option}</span>

                {isSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation & Feedback Card once submitted */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
            >
              {/* Result banner */}
              <div
                className={`p-4 flex flex-wrap items-center justify-between gap-3 ${
                  selectedOption === question.correctAnswer
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption === question.correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-200" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-amber-200" />
                  )}
                  <div>
                    <h4 className="font-black text-base">
                      {selectedOption === question.correctAnswer
                        ? 'Hebat, Jawabanmu Benar!'
                        : 'Belum Tepat, Jangan Menyerah!'}
                    </h4>
                    <p className="text-xs opacity-90 font-medium">
                      {selectedOption === question.correctAnswer
                        ? 'Persiapan mendaki gunung ke pos berikutnya!'
                        : 'Pelajari pembahasannya di bawah ini agar semakin paham.'}
                    </p>
                  </div>
                </div>

                {/* Points earned tag */}
                {selectedOption === question.correctAnswer && (
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/30 text-sm font-black text-yellow-200">
                    <Award className="w-4 h-4 text-yellow-300" />
                    <span>+{earnedScore} Poin Didapat!</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                {/* Challenge outcome note */}
                {challengeSuccess && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-2 rounded-lg border border-emerald-300">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>
                      Tantangan Khusus Terpenuhi! Bonus +{question.challenge.bonusPoints} Poin berhasil dikumpulkan.
                    </span>
                  </div>
                )}

                {/* Explanation text */}
                <div className="text-sm text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1 text-xs uppercase tracking-wider text-emerald-700">
                    Pembahasan Materi:
                  </span>
                  {question.explanation}
                </div>

                {/* Tahukah Kamu? (Fun fact) */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="p-2 bg-sky-500 text-white rounded-lg shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-sky-900 block">Tahukah Kamu?</span>
                    <p className="text-xs text-sky-800 mt-0.5 leading-relaxed font-medium">{question.funFact}</p>
                  </div>
                </div>

                {/* Call to action: Proceed to Climbing Mountain Animation */}
                <div className="pt-2 flex justify-end">
                  <button
                    id="btn-proceed-climb"
                    onClick={onProceedToClimb}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Lanjut Mendaki Gunung Menuju Pos Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
