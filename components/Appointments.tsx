
import React, { useState } from 'react';
import { Appointment } from '../types';

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    title: 'ANC Routine Checkup',
    date: '2024-05-15',
    time: '09:00 AM',
    location: 'MTRH Eldoret - ANC Wing',
    smsReminder: true
  }
];

const Appointments: React.FC = () => {
  const [apps, setApps] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Clinic Visits</h2>
          <p className="text-sm text-gray-500">Track your prenatal appointments</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-rose-100 text-rose-600 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
        >
          <i className={`fa-solid ${showAdd ? 'fa-xmark' : 'fa-plus'}`}></i>
        </button>
      </header>

      {showAdd && (
        <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-lg animate-in fade-in slide-in-from-top-4">
          <h4 className="font-bold mb-4">Add New Visit</h4>
          <div className="space-y-4">
            <input type="text" placeholder="Title (e.g. Ultrasound)" className="w-full p-3 bg-gray-50 rounded-xl outline-none border border-gray-100 focus:border-rose-400" />
            <div className="grid grid-cols-2 gap-2">
              <input type="date" className="p-3 bg-gray-50 rounded-xl outline-none border border-gray-100" />
              <input type="time" className="p-3 bg-gray-50 rounded-xl outline-none border border-gray-100" />
            </div>
            <button className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl">Save Appointment</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {apps.length > 0 ? (
          apps.map(app => (
            <div key={app.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{app.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <i className="fa-regular fa-clock"></i>
                    <span>{app.time} on {app.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{app.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  {app.smsReminder && (
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase flex items-center gap-1">
                      <i className="fa-solid fa-check"></i> SMS On
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-xl text-xs font-bold active:bg-gray-100">Reschedule</button>
                <button className="flex-1 bg-gray-50 text-red-400 py-2 rounded-xl text-xs font-bold active:bg-red-50">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400">
            <i className="fa-regular fa-calendar-xmark text-4xl mb-4 opacity-20"></i>
            <p>No upcoming visits scheduled.</p>
          </div>
        )}
      </div>

      {/* Offline Support Message */}
      <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-lg">
        <h4 className="font-bold mb-2 flex items-center gap-2">
          <i className="fa-solid fa-tower-broadcast"></i>
          Offline Support
        </h4>
        <p className="text-xs text-indigo-100 leading-relaxed mb-4">
          For users without smartphones or stable internet, we send automated clinic reminders and daily nutrition tips via SMS to your registered number.
        </p>
        <button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-xl text-xs transition-colors border border-white/30">
          Request SMS Support Only
        </button>
      </div>
    </div>
  );
};

export default Appointments;
