
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Page, Theme, Skill, Activity, AIRecommendation } from './types';
import { MOCK_SKILLS, MOCK_ACTIVITIES, MOCK_REPORT_DATA, HomeIcon, ActivitiesIcon, CareersIcon, ReportsIcon, SettingsIcon } from './constants';
import { GlassCard, SkillProgressCircle, ReportCharts, Badge } from './components/ui';
import { getAIDailyTip, getAIRecommendations, getAICareerExplanation, getAISkillSimulation } from './services/geminiService';

// Helper Components defined outside main app to prevent re-renders
const AnimatedCard: React.FC<{ children: React.ReactNode; delay: number; className?: string }> = ({ children, delay, className }) => (
  <div className={`animate-fadeIn ${className}`} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

// Page Components
const Dashboard: React.FC = () => {
    const [dailyTip, setDailyTip] = useState('Loading your daily tip...');
    const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

    useEffect(() => {
        getAIDailyTip().then(setDailyTip);
        getAIRecommendations(MOCK_SKILLS.map(s => s.name)).then(setRecommendations);
    }, []);

    return (
        <div className="space-y-6">
            <AnimatedCard delay={100}>
                <h1 className="text-3xl font-bold text-white">Hello, Student!</h1>
                <p className="text-indigo-200">Ready to unlock your potential?</p>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <GlassCard>
                    <h2 className="font-bold text-white mb-3">Daily Tip</h2>
                    <p className="text-gray-200 text-sm">{dailyTip}</p>
                </GlassCard>
            </AnimatedCard>

            <AnimatedCard delay={300}>
                <h2 className="font-bold text-xl text-white">Your Skills</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                    {MOCK_SKILLS.map(skill => (
                        <GlassCard key={skill.id} className="flex flex-col items-center justify-center p-2 text-center">
                            <SkillProgressCircle progress={skill.progress} colorGradient={skill.color} />
                            <p className="mt-2 text-sm font-semibold text-white">{skill.name}</p>
                        </GlassCard>
                    ))}
                </div>
            </AnimatedCard>

            <AnimatedCard delay={400}>
                <h2 className="font-bold text-xl text-white">AI Recommendations</h2>
                <div className="flex overflow-x-auto space-x-4 p-1 mt-2 snap-x snap-mandatory">
                    {recommendations.map((rec, index) => (
                        <div key={index} className="snap-center flex-shrink-0 w-4/5">
                            <GlassCard className="h-full">
                                <h3 className="font-bold text-white">{rec.title}</h3>
                                <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </AnimatedCard>
        </div>
    );
};

const Activities: React.FC = () => {
    const [activities, setActivities] = useState(MOCK_ACTIVITIES);
    const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
    const [completed, setCompleted] = useState<Set<string>>(new Set());

    const filteredActivities = useMemo(() => {
        if (filter === 'All') return activities;
        return activities.filter(a => a.difficulty === filter);
    }, [activities, filter]);

    const handleComplete = (id: string) => {
        setCompleted(prev => new Set(prev).add(id));
        setTimeout(() => {
            setActivities(prev => prev.filter(a => a.id !== id));
        }, 300);
    };
    
    const difficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
        if (difficulty === 'Easy') return 'bg-green-500/80';
        if (difficulty === 'Medium') return 'bg-yellow-500/80';
        return 'bg-red-500/80';
    }

    return (
        <div className="space-y-6">
            <AnimatedCard delay={100}>
                <h1 className="text-3xl font-bold text-white">Activities</h1>
                <p className="text-indigo-200">Complete tasks to boost your skills.</p>
            </AnimatedCard>
            <div className="flex space-x-2">
                {(['All', 'Easy', 'Medium', 'Hard'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-sm rounded-full transition-all ${filter === f ? 'bg-white text-purple-700 font-bold' : 'bg-white/10 text-white'}`}>
                        {f}
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                {filteredActivities.map((activity, index) => (
                    <AnimatedCard key={activity.id} delay={200 + index * 50} className={`transition-all duration-300 ${completed.has(activity.id) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        <GlassCard className="relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{activity.badge} {activity.title}</h3>
                                    <p className="text-sm text-gray-300 mt-1">{activity.description}</p>
                                </div>
                                <button onClick={() => handleComplete(activity.id)} className="bg-green-500 text-white rounded-full p-2 hover:bg-green-400 transition-transform transform hover:scale-110">
                                    ✓
                                </button>
                            </div>
                            <div className="mt-3">
                                <Badge className="bg-blue-500/80 text-white">{activity.skill}</Badge>
                                <Badge className="bg-purple-500/80 text-white">{activity.interest}</Badge>
                                <Badge className={difficultyColor(activity.difficulty) + ' text-white'}>{activity.difficulty}</Badge>
                            </div>
                        </GlassCard>
                    </AnimatedCard>
                ))}
            </div>
        </div>
    );
};

const Careers: React.FC = () => {
    const [explanation, setExplanation] = useState('Loading AI insights...');
    const [simulation, setSimulation] = useState('');
    const [simulating, setSimulating] = useState(false);
    
    const userSkills = MOCK_SKILLS.map(s => s.name);

    useEffect(() => {
        getAICareerExplanation(userSkills).then(setExplanation);
    }, [userSkills]);
    
    const handleSimulation = async () => {
        setSimulating(true);
        const result = await getAISkillSimulation('Coding', userSkills);
        setSimulation(result);
        setSimulating(false);
    };

    const careerMatches = [
        { name: 'UX Designer', match: 92 },
        { name: 'Data Artist', match: 85 },
        { name: 'Game Dev', match: 78 },
        { name: 'AI Ethicist', match: 65 },
    ];

    return (
        <div className="space-y-6">
            <AnimatedCard delay={100}>
                <h1 className="text-3xl font-bold text-white">AI Career Suggestions</h1>
                <p className="text-indigo-200">Explore paths that match your skills.</p>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <GlassCard>
                     <h2 className="font-bold text-xl text-white mb-2">Top Career Matches</h2>
                     <div className="space-y-3">
                        {careerMatches.map(career => (
                            <div key={career.name}>
                                <div className="flex justify-between text-sm text-gray-200 mb-1">
                                    <span>{career.name}</span>
                                    <span className="font-bold text-white">{career.match}%</span>
                                </div>
                                <div className="w-full bg-white/20 rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${career.match}%` }}></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </GlassCard>
            </AnimatedCard>

            <AnimatedCard delay={300}>
                 <GlassCard>
                    <h2 className="font-bold text-xl text-white mb-2">AI Explanation</h2>
                    <p className="text-gray-200">{explanation}</p>
                </GlassCard>
            </AnimatedCard>
            
            <AnimatedCard delay={400}>
                <GlassCard>
                    <h2 className="font-bold text-xl text-white mb-2">Skill Improvement Simulation</h2>
                    <p className="text-gray-200 mb-3">See how improving a skill impacts your options.</p>
                    <button onClick={handleSimulation} disabled={simulating} className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-400 transition-all disabled:opacity-50">
                        {simulating ? "Thinking..." : "Simulate Improving 'Coding'"}
                    </button>
                    {simulation && <p className="text-gray-200 mt-3 p-3 bg-black/20 rounded-lg">{simulation}</p>}
                </GlassCard>
            </AnimatedCard>
        </div>
    );
};

const Reports: React.FC = () => (
    <div className="space-y-6">
        <AnimatedCard delay={100}>
            <h1 className="text-3xl font-bold text-white">Reports & Insights</h1>
            <p className="text-indigo-200">Visualize your learning journey.</p>
        </AnimatedCard>

        <AnimatedCard delay={200}>
           <ReportCharts data={MOCK_REPORT_DATA} />
        </AnimatedCard>

        <AnimatedCard delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassCard>
                    <h3 className="text-lg font-bold text-white mb-2">Strengths 💪</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                        {MOCK_REPORT_DATA.strengths.map(s => <li key={s}>{s}</li>)}
                    </ul>
                </GlassCard>
                 <GlassCard>
                    <h3 className="text-lg font-bold text-white mb-2">Improvement Areas 🧠</h3>
                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                        {MOCK_REPORT_DATA.improvements.map(i => <li key={i}>{i}</li>)}
                    </ul>
                </GlassCard>
            </div>
        </AnimatedCard>
         <AnimatedCard delay={400} className="text-center">
            <button className="bg-white/20 text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition-all">
                Download Full Report
            </button>
        </AnimatedCard>
    </div>
);

const Settings: React.FC<{ theme: Theme, setTheme: (theme: Theme) => void }> = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };
    
    return (
        <div className="space-y-6">
            <AnimatedCard delay={100}>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-indigo-200">Customize your experience.</p>
            </AnimatedCard>

            <AnimatedCard delay={200}>
                <GlassCard>
                    <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Dark Mode</span>
                        <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors ${theme === 'dark' ? 'bg-indigo-500 justify-end' : 'bg-gray-400/50 justify-start'}`}>
                            <span className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform"></span>
                        </button>
                    </div>
                </GlassCard>
            </AnimatedCard>
            
            {/* Other settings are mocked */}
            <AnimatedCard delay={300}>
                <GlassCard className="space-y-4">
                    <div className="flex justify-between items-center text-white font-semibold"><span>Language</span> <span>English &gt;</span></div>
                     <div className="flex justify-between items-center text-white font-semibold"><span>Accessibility</span> <span>&gt;</span></div>
                    <div className="flex justify-between items-center text-white font-semibold"><span>Privacy & Consent</span> <span>&gt;</span></div>
                </GlassCard>
            </AnimatedCard>
        </div>
    );
};

// Main App Shell
const VishwAlphaApp: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [theme, setTheme] = useState<Theme>('dark');
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <Dashboard />;
            case 'activities': return <Activities />;
            case 'careers': return <Careers />;
            case 'reports': return <Reports />;
            case 'settings': return <Settings theme={theme} setTheme={setTheme} />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 bg-gradient-to-br from-purple-800 via-indigo-900 to-brand-dark dark:from-gray-900 dark:via-brand-dark dark:to-black`}>
            <div className="max-w-md mx-auto p-4 pb-24">
                {renderPage()}
            </div>
            <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};

// Bottom Navigation
const BottomNav: React.FC<{ currentPage: Page, setCurrentPage: (page: Page) => void }> = ({ currentPage, setCurrentPage }) => {
    const navItems: { page: Page; icon: React.FC<any> }[] = [
        { page: 'dashboard', icon: HomeIcon },
        { page: 'activities', icon: ActivitiesIcon },
        { page: 'careers', icon: CareersIcon },
        { page: 'reports', icon: ReportsIcon },
        { page: 'settings', icon: SettingsIcon },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-2">
            <GlassCard className="flex justify-around items-center rounded-full p-2">
                {navItems.map(item => (
                    <button key={item.page} onClick={() => setCurrentPage(item.page)} className="p-2 rounded-full transition-all">
                        <item.icon className={`h-7 w-7 transition-all ${currentPage === item.page ? 'text-white scale-110' : 'text-indigo-300/70'}`} />
                        {currentPage === item.page && <div className="absolute bottom-3 w-1.5 h-1.5 bg-white rounded-full animate-fadeIn"></div>}
                    </button>
                ))}
            </GlassCard>
        </nav>
    );
};

// Login Screen
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-purple-800 via-indigo-900 to-brand-dark">
        <GlassCard className="animate-fadeIn">
            <h1 className="text-5xl font-bold text-white tracking-wider">VishwAlpha</h1>
            <p className="text-indigo-200 mt-2">Your AI-Powered Learning Co-Pilot</p>
        </GlassCard>
        <button
            onClick={onLogin}
            className="mt-12 bg-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg animate-pulseGlow transition-transform transform hover:scale-105"
        >
            Get Started
        </button>
    </div>
);


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }

    return <VishwAlphaApp />;
}
