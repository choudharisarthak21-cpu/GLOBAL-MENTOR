import React from 'react';
import { Container } from '../common/Container';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { STATS } from '../../data/mockData';

export const StatsSection = () => {
  return (
    <section className="py-14 bg-navy-900 text-white relative overflow-hidden border-y border-navy-800">
      {/* Background glow lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:16px_16px]" />

      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10 text-center">
          {STATS.map((stat, index) => {
            let prefix = '';
            let suffix = '';
            if (stat.value.includes('+')) suffix = '+';
            if (stat.value.includes('%')) suffix = '%';

            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3.5xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-2">
                  <AnimatedCounter endValue={stat.value} suffix={suffix} prefix={prefix} />
                </div>
                <div className="text-sm font-bold text-gold-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 max-w-[200px]">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
