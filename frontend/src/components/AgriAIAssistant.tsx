import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, HelpCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { queryAgriAI, AIResponse } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendations?: AIResponse['recommendedEquipment'];
  suggestedPrompts?: string[];
}

export const AgriAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Namaste! I am **AgriAI**, your digital farming and equipment advisor. 🌾

Ask me about:
- Equipment recommendations for your crop and acreage (e.g. wheat, mustard, bajra)
- Cost calculations & Group Rental savings
- Government machinery subsidies (SMAM, PM-KUSUM)
- Soil preparation & weather advisories`,
      suggestedPrompts: [
        'I have 7 acres of wheat. Which equipment do I need?',
        'Tell me about SMAM government subsidy',
        'How does Group Rental save money?',
        'Check farming weather advisory'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = queryAgriAI(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.message,
        recommendations: response.recommendedEquipment,
        suggestedPrompts: response.suggestedPrompts,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-700/40 border border-emerald-400/40 flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline tracking-wide">AgriAI Advisor</span>
        </button>
      )}

      {/* Interactive AI Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-5 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-emerald-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base">AgriAI Assistant</h3>
                  <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 font-medium">
                    AI Active
                  </span>
                </div>
                <p className="text-emerald-200/80 text-xs">Machinery, Crops & Scheme Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Recommendation Cards */}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                        Recommended Implements:
                      </span>
                      {m.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-slate-800"
                        >
                          <div className="flex items-center justify-between font-bold text-emerald-950">
                            <span>{rec.name}</span>
                            <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              {rec.approxRate}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-0.5">{rec.reason}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/farmer/search');
                        }}
                        className="w-full mt-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1"
                      >
                        <span>Match & Rent These Implements</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Prompt Chips */}
                {m.suggestedPrompts && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {m.suggestedPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(p)}
                        className="text-[11px] bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300/80 rounded-full px-2.5 py-1 transition-colors text-left flex items-center gap-1 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{p}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs bg-white p-3 rounded-2xl w-fit border border-slate-200">
                <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>AgriAI is analyzing agricultural parameters...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, acres, machinery or schemes..."
                className="flex-1 px-4 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-2xl transition-colors shadow-md shadow-emerald-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-1.5">
              General informational advice. Always verify field parameters with local agri officers.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
