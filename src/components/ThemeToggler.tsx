import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Sun, Moon, Zap, Ghost } from 'lucide-react';

type Theme = 'default' | 'cyber-blue' | 'solar-orange' | 'ghost-white';

const themes: { id: Theme; name: string; icon: any; color: string }[] = [
  { id: 'default', name: 'Neon Green', icon: Zap, color: 'bg-[#00FF41]' },
  { id: 'cyber-blue', name: 'Cyber Blue', icon: Moon, color: 'bg-[#00E5FF]' },
  { id: 'solar-orange', name: 'Solar Orange', icon: Sun, color: 'bg-[#FF8A00]' },
  { id: 'ghost-white', name: 'Ghost White', icon: Ghost, color: 'bg-[#334155]' },
];

export const ThemeToggler: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('portfolio-theme', theme);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-24 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 glass rounded-full text-primary hover:scale-110 transition-transform shadow-lg border border-primary/20"
        >
          <Palette size={20} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute top-16 right-0 glass p-4 rounded-2xl border border-white/10 min-w-[180px] shadow-2xl"
            >
              <h4 className="text-[10px] font-orbitron text-white/40 uppercase tracking-widest mb-4 px-2">Select Theme</h4>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => toggleTheme(theme.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${
                      currentTheme === theme.id ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-white/60'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${theme.color}`} />
                    <span className="text-xs font-rajdhani font-bold">{theme.name}</span>
                    {currentTheme === theme.id && <div className="ml-auto w-1 h-1 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
