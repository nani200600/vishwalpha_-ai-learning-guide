
import React from 'react';
import { Skill, Activity, ReportData } from './types';

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

export const ActivitiesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />
  </svg>
);

export const CareersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 0 1-1.258 5.42m-5.84-2.56a16.5 16.5 0 0 0-1.258 5.42m14.332-5.42a16.5 16.5 0 0 1-.332 4.07M3.75 14.37a16.5 16.5 0 0 1-.332 4.07M1.5 10.5a16.5 16.5 0 0 1 19.5 0m0 0a16.5 16.5 0 0 1-1.258 5.42M1.5 10.5a16.5 16.5 0 0 0-1.258 5.42m12-5.42a6 6 0 0 1-5.84 7.38m5.84-7.38a6 6 0 0 0-5.84-7.38m5.84 7.38v4.82m-5.84-7.38a6 6 0 0 1 5.84-7.38m-5.84 7.38a6 6 0 0 0 5.84 7.38m-5.84-12.2a6 6 0 0 1-5.84-7.38v4.82m5.84 2.56a16.5 16.5 0 0 1 1.258-5.42m-14.332 5.42a16.5 16.5 0 0 1 .332-4.07m12 5.42a6 6 0 0 0 5.84-7.38m-5.84 7.38a6 6 0 0 1-5.84 7.38" />
  </svg>
);

export const ReportsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.952l2.176.42a1.125 1.125 0 0 1 .986 1.103l.258 2.115a1.125 1.125 0 0 0 1.057.945l2.323-.33a1.125 1.125 0 0 1 1.22.804l.363 2.118a1.125 1.125 0 0 1-.578 1.218l-2.016.953a1.125 1.125 0 0 0-.583 1.056l.123 2.392a1.125 1.125 0 0 1-.804 1.22l-2.118.363a1.125 1.125 0 0 1-1.218-.578l-.953-2.016a1.125 1.125 0 0 0-1.056-.583l-2.392.123a1.125 1.125 0 0 1-1.22-.804l-.363-2.118a1.125 1.125 0 0 1 .578-1.218l2.016-.953a1.125 1.125 0 0 0 .583-1.056l-.123-2.392a1.125 1.125 0 0 1 .804-1.22l2.118-.363a1.125 1.125 0 0 1 1.218.578l.953 2.016a1.125 1.125 0 0 0 1.056.583l2.392-.123a1.125 1.125 0 0 1 1.22.804l.363 2.118a1.125 1.125 0 0 1-.578 1.218l-2.016.953a1.125 1.125 0 0 0-.583 1.056l.123 2.392a1.125 1.125 0 0 1-.804 1.22l-2.118.363a1.125 1.125 0 0 1-1.218-.578l-.953-2.016a1.125 1.125 0 0 0-1.056-.583l-2.392.123a1.125 1.125 0 0 1-1.22-.804l-.363-2.118a1.125 1.125 0 0 1 .578-1.218l2.016-.953a1.125 1.125 0 0 0 .583-1.056l-.123-2.392a1.125 1.125 0 0 1 .804-1.22Z" />
  </svg>
);

export const MOCK_SKILLS: Skill[] = [
  { id: '1', name: 'Creativity', progress: 75, color: 'from-pink-400 to-red-500' },
  { id: '2', name: 'Problem Solving', progress: 90, color: 'from-blue-400 to-indigo-500' },
  { id: '3', name: 'Coding', progress: 60, color: 'from-green-400 to-teal-500' },
  { id: '4', name: 'Communication', progress: 85, color: 'from-yellow-400 to-orange-500' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', title: '30-Day Sketch Challenge', description: 'Draw something new every day for a month.', skill: 'Creativity', interest: 'Art', difficulty: 'Medium', badge: '🎨' },
  { id: 'a2', title: 'Solve a Sudoku Puzzle', description: 'Train your logical reasoning skills.', skill: 'Problem Solving', interest: 'Puzzles', difficulty: 'Easy', badge: '🧩' },
  { id: 'a3', title: 'Build a Personal Website', description: 'Learn the basics of HTML & CSS.', skill: 'Coding', interest: 'Tech', difficulty: 'Hard', badge: '💻' },
  { id: 'a4', title: 'Join a Debate Club', description: 'Practice public speaking and argumentation.', skill: 'Communication', interest: 'Social', difficulty: 'Medium', badge: '🎤' },
];

export const MOCK_REPORT_DATA: ReportData = {
  radar: [
    { subject: 'Creativity', value: 75 },
    { subject: 'Logic', value: 90 },
    { subject: 'Coding', value: 60 },
    { subject: 'Teamwork', value: 70 },
    { subject: 'Speaking', value: 85 },
    { subject: 'Leadership', value: 65 },
  ],
  bar: [
    { name: 'Creativity', value: 75 },
    { name: 'Problem Solving', value: 90 },
    { name: 'Coding', value: 60 },
    { name: 'Communication', value: 85 },
  ],
  strengths: ['Analytical Thinking', 'Clear Communication'],
  improvements: ['Project Management', 'Advanced Algorithms'],
};
