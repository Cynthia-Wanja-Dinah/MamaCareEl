import React, { useState } from 'react';

interface RegistrationProps {
  onRegister: (data: { name: string; phone: string; dueDate: string }) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim() && dueDate) {
      onRegister({ name, phone, dueDate });
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-sm border border-rose-100">
        <div className="w-24 h-24 bg-rose-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-6">
          <i className="fa-solid fa-person-pregnant text-rose-500 text-5xl"></i>
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Welcome Mama!</h2>
        <p className="text-gray-500 mb-10 text-sm font-medium leading-relaxed">
          The best pregnancy journey starts with support. Join the MamaCare community in Eldoret.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 ml-2 uppercase tracking-widest">Your Full Name</label>
            <input
              type="text"
              required
              className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-rose-400 outline-none transition-all text-gray-800 font-medium"
              placeholder="e.g. Mary Jepkemboi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 ml-2 uppercase tracking-widest">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-rose-400 outline-none transition-all text-gray-800 font-medium"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 ml-2 uppercase tracking-widest">Expected Delivery Date</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-rose-400 outline-none transition-all text-gray-800 font-medium"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-5 rounded-[1.5rem] mt-6 shadow-[0_10px_20px_-5px_rgba(225,29,72,0.4)] active:scale-95 transition-all text-xl"
          >
            Start Journey
          </button>
        </form>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <i className="fa-solid fa-shield-halved"></i>
          Secure & Supportive
        </div>
      </div>
    </div>
  );
};

export default Registration;