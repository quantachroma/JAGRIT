'use client';

import React, { useState } from 'react';
import { useCitizen } from '@/context/CitizenContext';
import { Send, Phone, Mic, Camera, Paperclip, CheckCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function WhatsAppSimulatorPage() {
  const { language } = useCitizen();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text:
        language === 'hi'
          ? 'नमस्ते! झारखण्ड जन-समस्या नवाचार (JAGRIT) में आपका स्वागत है। कृपया अपनी समस्या बोलकर या लिखकर भेजें।'
          : language === 'sat'
          ? 'ᱡᱚᱦᱟᱨ! ᱡᱟᱜᱽᱨᱤᱛ (JAGRIT) ᱨᱮ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾ ᱟᱢᱟᱜ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱞᱟᱹᱭ ᱢᱮ᱾'
          : 'Johar! Welcome to JAGRIT Jharkhand Civic Assistance Bot. Please send your civic problem description, voice note, or photo.',
      time: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      time: '10:01 AM',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Bot automatic response simulating NLP pipeline
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          language === 'hi'
            ? 'धन्यवाद! आपकी समस्या दर्ज कर ली गई है। शिकायत संख्या: JAG-2026-RAN-0104। एआई विशेषज्ञ जांच लंबित है।'
            : 'Dhanyawad! Ticket created: JAG-2026-RAN-0104. Status: PENDING_HITL evaluation.',
        time: '10:01 AM',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-[#075E54] text-white p-3 rounded-t-xl flex items-center justify-between shadow">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white border border-emerald-400">
            J
          </div>
          <div>
            <h3 className="font-bold text-sm">JAGRIT Civic Assistant</h3>
            <p className="text-[10px] text-emerald-200">Online • Govt of Jharkhand</p>
          </div>
        </div>
        <Phone className="w-4 h-4 text-white/80" />
      </div>

      <div className="bg-[#EFEAE2] min-h-[380px] max-h-[420px] overflow-y-auto p-4 space-y-3 rounded-b-xl border border-slate-300">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2.5 text-xs shadow-sm ${
                m.sender === 'user' ? 'bg-[#DCF8C6] text-slate-900' : 'bg-white text-slate-900'
              }`}
            >
              <p>{m.text}</p>
              <div className="flex items-center justify-end space-x-1 text-[9px] text-slate-400 mt-1">
                <span>{m.time}</span>
                {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 text-xs px-3 py-2 border-none focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-[#075E54] text-white rounded-full hover:bg-emerald-800 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

