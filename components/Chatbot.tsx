
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
      text: `Habari ${profile.name}! I am your MamaCare Assistant. How can I help you today with your Trimester ${profile.trimester} journey?`, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getChatResponse(input, profile, messages);
    
    const botMsg: Message = { role: 'model', text: response, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <header className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Ask MamaCare AI</h2>
        <p className="text-sm text-gray-500">Ask about nutrition, comfort, or local clinics.</p>
      </header>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-rose-600 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-3xl rounded-tl-none text-xs text-gray-500 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              MamaCare is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 bg-white border border-gray-200 p-2 rounded-2xl shadow-inner">
        <input
          type="text"
          className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
          placeholder="Ask e.g. What should I eat?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-rose-600 text-white w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 disabled:opacity-50 transition-all"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Best foods for Trimester ' + profile.trimester, 'Clinic hours', 'Safety tips'].map(suggest => (
          <button 
            key={suggest}
            onClick={() => setInput(suggest)}
            className="whitespace-nowrap bg-rose-50 text-rose-600 text-[10px] font-bold px-3 py-1.5 rounded-full border border-rose-100"
          >
            {suggest}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
