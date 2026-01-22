
import React, { useState, useEffect } from 'react';
import { UserProfile, Appointment, Message } from './types';
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
      const parsed = JSON.parse(savedProfile);
      // Recalculate stats based on current date
      const stats = calculatePregnancyStats(parsed.dueDate);
      setProfile({ ...parsed, ...stats });
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
    localStorage.removeItem('mamacare_profile');
    setProfile(null);
  };

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading MamaCare...</div>;

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
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* Header */}
      <header className="bg-rose-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">MamaCare</h1>
            <p className="text-rose-100 text-sm">Supporting Eldoret Mothers</p>
          </div>
          <button onClick={handleLogout} className="text-xs bg-rose-700 px-3 py-1 rounded-full">
            Reset
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 py-6">
        {renderContent()}
      </main>

      {/* Persistent Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-rose-100 px-2 py-3 flex justify-around items-center z-50">
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
          label="Ask AI" 
        />
        <NavButton 
          active={activeTab === 'appointments'} 
          onClick={() => setActiveTab('appointments')} 
          icon="fa-calendar-check" 
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
    className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${active ? 'text-rose-600' : 'text-gray-400'}`}
  >
    <i className={`fa-solid ${icon} text-xl mb-1`}></i>
    <span className="text-[10px] font-medium">{label}</span>
    {active && <div className="w-1 h-1 bg-rose-600 rounded-full mt-1"></div>}
  </button>
);

export default App;
