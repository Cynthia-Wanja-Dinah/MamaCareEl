import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Message } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatbotProps {
  profile: UserProfile;
}

const Chatbot: React.FC<ChatbotProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: `Habari ${profile.name}! I am your MamaCare AI. Ask me about your Trimester ${profile.trimester} journey.`, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const finalInput = textToSend || input;
    if (!finalInput.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: finalInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const response = await getChatResponse(finalInput, profile, messages);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] animate-in fade-in duration-500">
      <header className="mb-6">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">MamaCare AI</h2>
        <p className="text-sm text-gray-500 font-medium italic">Support for Eldoret mothers, 24/7</p>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-5 mb-6 pr-1 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm font-medium ${msg.role === 'user' ? 'bg-rose-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 border border-gray-200 p-5 rounded-[2rem] rounded-tl-none text-xs text-gray-400 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        {[`Foods for Trimester ${profile.trimester}`, 'Sleep positions', 'Clinic locations'].map(suggest => (
          <button key={suggest} onClick={() => handleSend(suggest)} className="whitespace-nowrap bg-white text-rose-600 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-full border-2 border-rose-50 shadow-sm active:scale-95">
            {suggest}
          </button>
        ))}
      </div>

      <div className="flex gap-3 bg-gray-50 border-2 border-gray-100 p-2 rounded-[1.5rem] shadow-inner focus-within:border-rose-400">
        <input type="text" className="flex-1 bg-transparent px-5 py-3 outline-none text-sm font-medium text-gray-800" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} />
        <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-rose-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center disabled:opacity-40 shadow-lg shadow-rose-200 transition-all active:scale-90">
          <i className="fa-solid fa-paper-plane text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;