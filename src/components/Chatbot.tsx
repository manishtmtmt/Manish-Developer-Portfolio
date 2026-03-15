import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import portfolioData from '../data/portfolio.json';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Manish's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `You are an AI assistant for Manish Tiwari's portfolio. 
          Use the following data to answer questions about him: ${JSON.stringify(portfolioData)}.
          Pay special attention to the 'caseStudies' for deep technical insights and 'quickSummary' for high-level info.
          Be professional, concise, and helpful. Use markdown for formatting (bold, lists, etc.) where appropriate. 
          If you don't know something, say you'll forward the message to Manish.`
        }
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'bot', text: text }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-135 max-h-[70vh] glass rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-primary/10 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-white">Resume AI</h3>
                  <p className="text-[10px] text-primary animate-pulse">Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-secondary/20" : "bg-primary/20"
                  )}>
                    {msg.role === 'user' ? <User size={14} className="text-secondary" /> : <Bot size={14} className="text-primary" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm max-w-[80%]",
                    msg.role === 'user' ? "bg-secondary/10 text-white rounded-tr-none" : "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                  )}>
                    {msg.role === 'bot' ? (
                      <div className="markdown-body prose prose-invert prose-sm">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="text-primary animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Manish..."
                  className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-bg shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-110 transition-transform active:scale-95"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

import { cn } from '../utils/cn';
