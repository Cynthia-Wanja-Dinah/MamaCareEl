
import React from 'react';
import { UserProfile } from '../types';
import { formatDate } from '../utils';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const progressPercent = Math.min(100, (profile.weeksPregnant / 40) * 100);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <section>
        <h2 className="text-xl font-bold text-gray-800">Hello, {profile.name}! 👋</h2>
        <p className="text-gray-500">You are doing a great job caring for yourself and baby.</p>
      </section>

      {/* Progress Card */}
      <section className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-3xl font-black text-rose-600">{profile.weeksPregnant}</h3>
            <p className="text-sm font-semibold text-gray-600">Weeks Pregnant</p>
          </div>
          <div className="text-right">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Trimester {profile.trimester}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-4 bg-rose-50 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-rose-500 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
          <span>CONCEPTION</span>
          <span>DUE: {formatDate(profile.dueDate)}</span>
        </div>
      </section>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <i className="fa-solid fa-droplet text-blue-500"></i>
          </div>
          <h4 className="font-bold text-blue-900 text-sm">Stay Hydrated</h4>
          <p className="text-[10px] text-blue-700 mt-1">8 glasses today</p>
        </div>
        <div className="bg-green-50 p-5 rounded-3xl border border-green-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <i className="fa-solid fa-utensils text-green-500"></i>
          </div>
          <h4 className="font-bold text-green-900 text-sm">Iron & Folic</h4>
          <p className="text-[10px] text-green-700 mt-1">Take your supplements</p>
        </div>
      </div>

      {/* Local Health Notice */}
      <div className="bg-rose-600 text-white p-5 rounded-3xl shadow-lg flex items-center gap-4">
        <div className="text-2xl">🏥</div>
        <div>
          <h4 className="font-bold text-sm">Clinic Reminder</h4>
          <p className="text-xs text-rose-100">Your next ANC visit is in 4 days at MTRH Eldoret.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
