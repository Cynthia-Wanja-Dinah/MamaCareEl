import React from 'react';
import { Trimester, Tip } from '../types';

interface TipsProps {
  trimester: Trimester;
}

const ALL_TIPS: Tip[] = [
  { trimester: 1, category: 'Nutrition', title: 'Focus on Folic Acid', content: 'Eat leafy greens like Sukuma Wiki and Managu for baby\'s neural development.' },
  { trimester: 1, category: 'Lifestyle', title: 'Managing Nausea', content: 'Eat small, frequent meals and try ginger tea in the morning.' },
  { trimester: 2, category: 'Nutrition', title: 'Iron & Calcium', content: 'Baby is growing bones! Eat eggs, milk, and Omena for calcium.' },
  { trimester: 2, category: 'Lifestyle', title: 'Stay Active', content: 'A gentle 20-minute walk around Eldoret is perfect exercise.' },
  { trimester: 3, category: 'Safety', title: 'Kick Counting', content: 'Baby should move 10 times in 2 hours. If slow, visit MTRH immediately.' },
  { trimester: 3, category: 'Nutrition', title: 'Preparation Diet', content: 'Eat energy foods like Ugali and Sweet Potatoes for delivery strength.' }
];

const Tips: React.FC<TipsProps> = ({ trimester }) => {
  const currentTips = ALL_TIPS.filter(t => t.trimester === trimester);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Your Health Guide</h2>
        <p className="text-gray-500 font-medium">Custom tips for Trimester {trimester}</p>
      </header>

      <div className="space-y-5">
        {currentTips.map((tip, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm flex gap-5 items-start">
            <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner ${
              tip.category === 'Nutrition' ? 'bg-orange-50 text-orange-500' :
              tip.category === 'Lifestyle' ? 'bg-indigo-50 text-indigo-500' : 'bg-red-50 text-red-500'
            }`}>
              <i className={`fa-solid ${
                tip.category === 'Nutrition' ? 'fa-apple-whole' :
                tip.category === 'Lifestyle' ? 'fa-shoe-prints' : 'fa-circle-exclamation'
              } text-2xl`}></i>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">{tip.category}</span>
              <h4 className="font-black text-gray-800 mb-2 text-lg leading-tight">{tip.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-rose-50 p-8 rounded-[2.5rem] border-2 border-rose-100 relative overflow-hidden">
        <h4 className="font-black text-rose-800 mb-4 text-xl">Help Desk</h4>
        <div className="space-y-4">
          <a href="tel:999" className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm text-rose-600 font-black">
            <span className="flex items-center gap-3"><i className="fa-solid fa-truck-medical"></i> Emergency</span>
            <span>999 / 911</span>
          </a>
          <div className="flex justify-between items-center bg-rose-100/50 p-4 rounded-2xl text-rose-900 font-bold text-sm">
            <span>MTRH Eldoret</span>
            <span className="font-mono">053 2033041</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;