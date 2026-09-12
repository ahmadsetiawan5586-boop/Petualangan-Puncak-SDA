export type QuestionType = 'multiple_choice' | 'classification' | 'true_false';

export type ChallengeType = 'fast_time' | 'streak' | 'eco_action' | 'detective';

export interface ClassificationItem {
  id: string;
  name: string;
  category: 'terbarukan' | 'tidak_terbarukan' | 'hayati' | 'non_hayati';
  iconName: string;
}

export interface Question {
  id: string;
  posNumber: number; // 1 to 5
  posName: string;
  altitudeMdpl: number; // e.g. 750, 1300, 1900, 2400, 3142
  text: string;
  questionType: QuestionType;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  funFact: string;
  basePoints: number;
  illustrationType: 'sun' | 'water' | 'forest' | 'petroleum' | 'coal' | 'animal' | 'recycle' | 'plant' | 'wind' | 'soil';
  
  // Special challenge feature requested by user
  challenge: {
    type: ChallengeType;
    title: string;
    description: string;
    bonusPoints: number;
    timeLimitSeconds?: number;
  };

  // Optional classification data for interactive sorting
  classificationItems?: ClassificationItem[];
}

export interface ChapterLevel {
  id: number;
  chapterNumber: number;
  title: string;
  mountainName: string;
  subtitle: string;
  description: string;
  iconName: string;
  accentColor: string; // Tailwind color name or hex
  mountainMaxAltitude: number; // e.g. 3142
  requiredPointsToUnlock: number; // Minimum accumulated or chapter score to unlock
  questions: Question[];
  studyNotes: {
    title: string;
    content: string;
    keyPoints: string[];
    icon: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAtPoints: number;
  chapterIdRequired?: number;
}

export interface GameProgress {
  playerName: string;
  avatar: 'bima' | 'laras';
  currentChapterId: number;
  unlockedChapters: number[]; // [1, 2, ...]
  chapterScores: Record<number, number>; // chapterId -> best score
  chapterStars: Record<number, number>; // chapterId -> stars (1-3)
  totalPoints: number;
  soundEnabled: boolean;
  unlockedBadges: string[];
}
