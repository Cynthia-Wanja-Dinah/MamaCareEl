import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Tips from './components/Tips';
import Appointments from './components/Appointments';
import { calculatePregnancyStats } from './utils';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tips' | 'chat' | 'appointments'>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('mamacare_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        const stats = calculatePregnancyStats(parsed.dueDate);
        setProfile({ ...parsed, ...stats });
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleRegister = (data: { name: string; phone: string; dueDate: string }) => {
    const stats = calculatePregnancyStats(data.dueDate);
    const newProfile: UserProfile = { ...data, ...stats };
    setProfile(newProfile);
    localStorage.setItem('mamacare_profile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to reset your profile? This will clear your data locally.")) {
      localStorage.removeItem('mamacare_profile');
      setProfile(null);
    }
  };

  if (!isLoaded) return (
    <div className="flex flex-col h-screen items-center justify-center bg-rose-50 p-6 text-center">
      <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-rose-600 font-bold">MamaCare Eldoret...</p>
    </div>
  );

  if (!profile) {
    return <Registration onRegister={handleRegister} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard profile={profile} />;
      case 'tips':
        return <Tips trimester={profile.trimester} />;
      case 'chat':
        return <Chatbot profile={profile} />;
      case 'appointments':
        return <Appointments />;
      default:
        return <Dashboard profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-white shadow-2xl relative flex flex-col">
      <header className="bg-rose-600 text-white p-6 rounded-b-[2.5rem] shadow-xl sticky top-0 z-40">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">MamaCare</h1>
            <p className="text-rose-100 text-[10px] font-bold uppercase tracking-widest">Eldoret Maternal Support</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-8 h-8 flex items-center justify-center bg-rose-700/50 hover:bg-rose-700 rounded-full transition-colors"
            title="Reset Profile"
          >
            <i className="fa-solid fa-power-off text-xs"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 px-5 py-6 overflow-y-auto">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-rose-100 px-3 py-4 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]">
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
          icon="fa-house" 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'tips'} 
          onClick={() => setActiveTab('tips')} 
          icon="fa-lightbulb" 
          label="Tips" 
        />
        <NavButton 
          active={activeTab === 'chat'} 
          onClick={() => setActiveTab('chat')} 
          icon="fa-comment-dots" 
          label="Mama AI" 
        />
        <NavButton 
          active={activeTab === 'appointments'} 
          onClick={() => setActiveTab('appointments')} 
          icon="fa-calendar-day" 
          label="Clinics" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center min-w-[64px] transition-all duration-300 ${active ? 'text-rose-600 scale-110' : 'text-gray-400'}`}
  >
    <i className={`fa-solid ${icon} text-lg mb-1`}></i>
    <span className="text-[10px] font-bold tracking-tight">{label}</span>
    {active && <div className="w-4 h-1 bg-rose-600 rounded-full mt-1 animate-pulse"></div>}
  </button>
);

export default App;