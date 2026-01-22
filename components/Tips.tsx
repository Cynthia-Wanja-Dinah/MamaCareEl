
import React from 'react';
import { Trimester, Tip } from '../types';

interface TipsProps {
  trimester: Trimester;
}

const ALL_TIPS: Tip[] = [
  {
    trimester: 1,
    category: 'Nutrition',
    title: 'Focus on Folic Acid',
    content: 'Eat plenty of green leafy vegetables like Sukuma Wiki and Managu. These help baby’s brain development.'
  },
  {
    trimester: 1,
    category: 'Lifestyle',
    title: 'Managing Nausea',
    content: 'Eat small, frequent meals. Try ginger tea or dry bread in the morning to help with "morning sickness".'
  },
  {
    trimester: 2,
    category: 'Nutrition',
    title: 'Increase Iron',
    content: 'Baby is growing fast! Eat beans, liver, and eggs. Omena is also a great source of calcium and proteins.'
  },
  {
    trimester: 2,
    category: 'Lifestyle',
    title: 'Active Living',
    content: 'Walking for 20 minutes around your estate is great exercise. Avoid heavy lifting now.'
  },
  {
    trimester: 3,
    category: 'Safety',
    title: 'Kick Counting',
    content: 'Monitor baby’s movements. You should feel at least 10 kicks in 2 hours. If fewer, visit MTRH immediately.'
  },
  {
    trimester: 3,
    category: 'Nutrition',
    title: 'Energy Foods',
    content: 'You need strength for delivery. Eat healthy portions of Ugali, Rice, and Potatoes along with proteins.'
  }
];

const Tips: React.FC<TipsProps> = ({ trimester }) => {
  const currentTips = ALL_TIPS.filter(t => t.trimester === trimester);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-bold text-gray-800">Health Tips</h2>
        <p className="text-gray-500">For your current Trimester {trimester}</p>
      </header>

      <div className="space-y-4">
        {currentTips.map((tip, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${
              tip.category === 'Nutrition' ? 'bg-orange-100 text-orange-600' :
              tip.category === 'Lifestyle' ? 'bg-indigo-100 text-indigo-600' : 'bg-red-100 text-red-600'
            }`}>
              <i className={`fa-solid ${
                tip.category === 'Nutrition' ? 'fa-apple-whole' :
                tip.category === 'Lifestyle' ? 'fa-person-walking' : 'fa-triangle-exclamation'
              } text-xl`}></i>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{tip.category}</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-rose-50 p-6 rounded-3xl border border-rose-100">
        <h4 className="font-bold text-rose-800 mb-2">Emergency Contacts</h4>
        <div className="space-y-2">
          <a href="tel:999" className="flex justify-between items-center text-rose-600 font-medium">
            <span>Ambulance</span>
            <span>999 / 911</span>
          </a>
          <div className="flex justify-between items-center text-gray-600">
            <span>MTRH Eldoret</span>
            <span className="font-mono">053 2033041</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
