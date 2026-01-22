import React from 'react';
import { UserProfile } from '../types';
import { formatDate } from '../utils';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const progressPercent = Math.min(100, (profile.weeksPregnant / 40) * 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Habari, {profile.name}! 👋</h2>
        <p className="text-gray-500 font-medium">You and your baby are thriving today.</p>
      </section>

      <section className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-[0_15px_30px_-10px_rgba(225,29,72,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <div className="flex justify-between items-end mb-6 relative z-10">
          <div>
            <h3 className="text-5xl font-black text-rose-600 tracking-tighter">{profile.weeksPregnant}</h3>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Weeks Along</p>
          </div>
          <div className="text-right">
            <span className="bg-rose-600 text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-200">
              Trimester {profile.trimester}
            </span>
          </div>
        </div>
        
        <div className="relative h-5 bg-rose-50 rounded-full overflow-hidden mb-3">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[11px] text-gray-400 font-black uppercase tracking-widest">
          <span>Start</span>
          <span>DUE: {formatDate(profile.dueDate)}</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-5">
        <HealthMetric icon="fa-droplet" color="blue" label="Water Intake" value="2.5L / 3L" sub="Drink for baby" />
        <HealthMetric icon="fa-utensils" color="green" label="Iron & Folic" value="Daily Dose" sub="For strength" />
      </div>

      <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">🏥</div>
        <div>
          <h4 className="font-black text-lg leading-tight">Next Clinic Visit</h4>
          <p className="text-sm text-indigo-100 font-medium opacity-90">Visit MTRH ANC Wing soon for your checkup.</p>
        </div>
      </div>
    </div>
  );
};

const HealthMetric: React.FC<{ icon: string; color: string; label: string; value: string; sub: string }> = ({ icon, color, label, value, sub }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100'
  };
  const iconBgs: Record<string, string> = { blue: 'bg-blue-100', green: 'bg-green-100' };

  return (
    <div className={`p-6 rounded-[2rem] border ${colors[color]} shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1`}>
      <div className={`w-12 h-12 ${iconBgs[color]} rounded-2xl flex items-center justify-center mb-4`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
      </div>
      <h4 className="font-black text-xs uppercase tracking-widest opacity-60 mb-1">{label}</h4>
      <p className="font-black text-gray-800 text-sm mb-1">{value}</p>
      <p className="text-[10px] font-bold opacity-60 leading-tight">{sub}</p>
    </div>
  );
};

export default Dashboard;