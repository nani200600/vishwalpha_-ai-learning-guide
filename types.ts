
export type Page = 'dashboard' | 'activities' | 'careers' | 'reports' | 'settings';

export type Theme = 'light' | 'dark';

export interface Skill {
  id: string;
  name: string;
  progress: number; // 0-100
  color: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  skill: string;
  interest: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  badge: string; // Emoji
}

export interface CareerSuggestion {
    name: string;
    match: number; // 0-100
    explanation: string;
}

export interface ReportData {
  radar: { subject: string; value: number }[];
  bar: { name: string; value: number }[];
  strengths: string[];
  improvements: string[];
}

export interface AIRecommendation {
    title: string;
    description: string;
}
