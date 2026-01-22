import React, { useState } from 'react';
import { Appointment } from '../types';

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: '1', title: 'Routine ANC Checkup', date: '2024-06-12', time: '09:00 AM', location: 'MTRH Eldoret', smsReminder: true }
];

const Appointments: React.FC = () => {
  const [apps, setApps] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  const addAppointment = () => {
    if (!newTitle || !newDate) return;
    setApps([...apps, { id: Date.now().toString(), title: newTitle, date: newDate, time: '10:00 AM', location: 'Local Center', smsReminder: true }]);
    setNewTitle(''); setNewDate(''); setShowAdd(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Clinic Visits</h2>
          <p className="text-sm text-gray-500 font-medium">Track your prenatal appointments</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${showAdd ? 'bg-gray-100' : 'bg-rose-600 text-white shadow-rose-200 active:scale-95'}`}>
          <i className={`fa-solid ${showAdd ? 'fa-xmark' : 'fa-plus'} text-xl`}></i>
        </button>
      </header>

      {showAdd && (
        <div className="bg-white p-8 rounded-[2rem] border-2 border-rose-100 shadow-2xl animate-in zoom-in duration-300">
          <h4 className="font-black mb-6">Schedule New Visit</h4>
          <div className="space-y-5">
            <input type="text" placeholder="Reason (e.g. Ultrasound)" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-rose-400 font-bold" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-rose-400 font-bold" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            <button onClick={addAppointment} className="w-full bg-rose-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95">Add Visit</button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {apps.length > 0 ? apps.map(app => (
          <div key={app.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-rose-600"></div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-black text-gray-800 text-lg leading-tight mb-2">{app.title}</h4>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                  <span className="flex items-center gap-2"><i className="fa-regular fa-calendar-check text-rose-500"></i> {app.date}</span>
                  <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-rose-500"></i> {app.location}</span>
                </div>
              </div>
              {app.smsReminder && <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-xl text-[10px] font-black border border-green-100 flex items-center gap-2"><i className="fa-solid fa-comment-sms"></i> SMS</div>}
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="font-bold text-gray-400">No appointments scheduled.</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <h4 className="font-black text-xl mb-3 flex items-center gap-3"><i className="fa-solid fa-tower-cell"></i> Community</h4>
        <p className="text-xs text-indigo-100 font-medium leading-relaxed mb-6">MamaCare supports everyone via SMS for clinic reminders and daily health tips.</p>
        <div className="grid grid-cols-2 gap-3 text-xs font-black uppercase tracking-widest">
          <button className="bg-white/10 p-4 rounded-2xl border border-white/20">Find CHV</button>
          <button className="bg-white/10 p-4 rounded-2xl border border-white/20">SMS Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;