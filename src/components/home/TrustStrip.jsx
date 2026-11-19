import React from 'react';
import { Container } from '../common/Container';
import { TRUST_PARTNERS } from '../../data/mockData';

export const TrustStrip = () => {
  return (
    <div className="py-8 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <Container size="xl">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Mentors Admitted From & Advising At World-Class Institutions
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-75 dark:opacity-60">
          {TRUST_PARTNERS.map((partner, index) => (
            <span
              key={index}
              className="text-xs sm:text-sm font-bold tracking-tight text-slate-600 dark:text-slate-300 font-heading hover:text-royal-600 dark:hover:text-royal-400 transition-colors"
            >
              {partner}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
};
