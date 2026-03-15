import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Globe, Cpu, Layers, Shield, Zap, Terminal } from 'lucide-react';

const icons = [
  { Icon: Code2, color: 'text-primary' },
  { Icon: Database, color: 'text-secondary' },
  { Icon: Globe, color: 'text-accent' },
  { Icon: Cpu, color: 'text-primary' },
  { Icon: Layers, color: 'text-secondary' },
  { Icon: Shield, color: 'text-accent' },
  { Icon: Zap, color: 'text-primary' },
  { Icon: Terminal, color: 'text-secondary' },
];

export const OrbitingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, color }, index) => {
        const angle = (index / icons.length) * Math.PI * 2;
        const radius = 220; // Radius of orbit
        
        return (
          <motion.div
            key={index}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3 glass rounded-xl ${color}`}
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI * 2) * radius
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI * 2) * radius
              ],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5
            }}
          >
            <Icon size={20} />
          </motion.div>
        );
      })}
      
      {/* Inner Orbit */}
      {icons.slice(0, 4).map(({ Icon, color }, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const radius = 140;
        
        return (
          <motion.div
            key={`inner-${index}`}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 glass rounded-lg ${color} opacity-60`}
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle - Math.PI * 2) * radius
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle - Math.PI * 2) * radius
              ],
              rotate: [0, -360]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: index * 1
            }}
          >
            <Icon size={16} />
          </motion.div>
        );
      })}
    </div>
  );
};
