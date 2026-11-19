import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sparkles, Award, Shield, Heart } from 'lucide-react';

export const HeroGlobe = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
      {/* Outer ambient glow pulses */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-royal-600/20 via-gold-400/10 to-royal-400/20 blur-3xl animate-pulse" />

      {/* Orbit Rings */}
      <div className="absolute w-[95%] h-[95%] rounded-full border border-royal-200/50 dark:border-royal-800/40 animate-[spin_40s_linear_infinite]" />
      <div className="absolute w-[75%] h-[75%] rounded-full border border-dashed border-slate-300 dark:border-slate-700/60 animate-[spin_30s_linear_infinite_reverse]" />
      <div className="absolute w-[55%] h-[55%] rounded-full border border-royal-400/30 dark:border-royal-600/30" />

      {/* Central Holographic Globe Core */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-navy-900 via-royal-900 to-navy-950 p-1 shadow-2xl shadow-royal-600/30 flex items-center justify-center overflow-hidden border border-royal-500/30">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Globe Grid SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-royal-400/40 stroke-current fill-none stroke-[0.8]"
        >
          <circle cx="50" cy="50" r="45" />
          <ellipse cx="50" cy="50" rx="45" ry="20" />
          <ellipse cx="50" cy="50" rx="20" ry="45" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="50" y1="5" x2="50" y2="95" />
        </svg>

        {/* Central Brand Badge */}
        <div className="absolute flex flex-col items-center justify-center text-center p-3">
          <div className="w-12 h-12 rounded-2xl bg-royal-600/90 text-white flex items-center justify-center shadow-lg shadow-royal-600/50 mb-1 backdrop-blur-md">
            <Globe className="w-6 h-6 text-gold-400 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <span className="text-[11px] font-bold text-white tracking-wider uppercase">
            120+ Nations
          </span>
          <span className="text-[9px] text-royal-300 font-medium">Live Mentorship</span>
        </div>
      </div>

      {/* Floating Floating Pill: Education */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 right-4 sm:right-6 glass-card rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-20 border-l-4 border-l-royal-600"
      >
        <div className="w-8 h-8 rounded-xl bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 flex items-center justify-center font-bold text-xs shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
            Oxford & Ivy League
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Admissions & Scholarships
          </span>
        </div>
      </motion.div>

      {/* Floating Floating Pill: Legal Guidance */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-6 -left-2 sm:left-2 glass-card rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-20 border-l-4 border-l-amber-500"
      >
        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
            Legal Literacy
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Startup Contracts & IP
          </span>
        </div>
      </motion.div>

      {/* Floating Floating Pill: Counselling */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-3 right-8 sm:right-12 glass-card rounded-2xl p-3 shadow-lg flex items-center gap-2.5 z-20 border-l-4 border-l-emerald-500"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-bold text-navy-900 dark:text-white leading-tight">
            Wellbeing & Somatic
          </p>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Burnout & Life Balance
          </span>
        </div>
      </motion.div>
    </div>
  );
};
