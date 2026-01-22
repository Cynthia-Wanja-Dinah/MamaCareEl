
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
    if (name && phone && dueDate) {
      onRegister({ name, phone, dueDate });
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-person-pregnant text-rose-500 text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to MamaCare</h2>
        <p className="text-gray-500 mb-8 text-sm">Join the support community for Eldoret mothers</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Your Full Name</label>
            <input
              type="text"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              placeholder="e.g. Mary Wanjiku"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              placeholder="0712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Expected Delivery Date (EDD)</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-rose-600 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg active:scale-95 transition-transform text-lg"
          >
            Start My Journey
          </button>
        </form>
        
        <p className="mt-6 text-[10px] text-gray-400">
          By registering, you agree to receive maternal health SMS updates (Optional)
        </p>
      </div>
    </div>
  );
};

export default Registration;
