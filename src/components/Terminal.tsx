import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import portfolioData from '../data/portfolio.json';

interface TerminalProps {
  onClose?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string | React.ReactNode }[]>([
    { type: 'output', content: 'Welcome to MT-OS v2.4.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let output: string | React.ReactNode = '';

    switch (command) {
      case 'help':
        output = 'Available commands: about, skills, projects, experience, summary, contact, ls, clear, exit';
        break;
      case 'ls':
        output = 'Sections: home, about, journey, projects, case-studies, github, contact';
        break;
      case 'summary':
        output = `Experience: ${portfolioData.quickSummary.experience}\nStatus: ${portfolioData.quickSummary.availability}\nLocation: ${portfolioData.quickSummary.location}\n\nHighlights:\n${portfolioData.quickSummary.highlights.map(h => `- ${h}`).join('\n')}`;
        break;
      case 'about':
        output = portfolioData.profile.bio;
        break;
      case 'skills':
        output = portfolioData.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
        break;
      case 'projects':
        output = portfolioData.projects.map(p => `- ${p.title}: ${p.description}`).join('\n');
        break;
      case 'experience':
        output = portfolioData.journey
          .filter(j => j.type === 'experience')
          .map(j => `${j.year} | ${j.title} at ${j.organization}`)
          .join('\n');
        break;
      case 'contact':
        output = `Email: ${portfolioData.profile.email}\nSocials: ${portfolioData.socials.map(s => s.platform).join(', ')}`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        if (onClose) onClose();
        return;
      default:
        output = `Command not found: ${command}. Type "help" for assistance.`;
    }

    setHistory(prev => [...prev, { type: 'input', content: cmd }, { type: 'output', content: output }]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="w-full max-w-3xl h-[400px] glass rounded-lg overflow-hidden flex flex-col border border-primary/30 shadow-[0_0_30px_rgba(0,255,65,0.1)]"
    >
      {/* Header */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-xs font-mono text-white/60">manish@portfolio: ~</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/40"
      >
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.type === 'input' ? (
              <div className="flex gap-2">
                <span className="text-primary">➜</span>
                <span className="text-secondary">~</span>
                <span className="text-white">{item.content}</span>
              </div>
            ) : (
              <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-2 items-center">
          <span className="text-primary">➜</span>
          <span className="text-secondary">~</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
          />
        </div>
      </div>
    </motion.div>
  );
};
