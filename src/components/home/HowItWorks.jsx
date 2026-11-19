import React from 'react';
import { Search, CalendarCheck, Video, Compass } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';

export const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Find Your Mentor',
      description: 'Filter by domain, target countries, languages, hourly rates, and verified credentials across Education, Law, or Wellbeing.',
      icon: Search,
      accent: 'bg-royal-50 dark:bg-royal-950 text-royal-600 dark:text-royal-400'
    },
    {
      number: '02',
      title: 'Schedule Securely',
      description: 'Choose between 1-on-1 HD Video strategy calls, Audio consultations, or Async written reviews in your local timezone.',
      icon: CalendarCheck,
      accent: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
    },
    {
      number: '03',
      title: 'Actionable Session',
      description: 'Engage in focused, high-impact mentorship. Walk away with specific SOP revisions, legal term literacy, or nervous system tools.',
      icon: Video,
      accent: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
    },
    {
      number: '04',
      title: 'Track Milestones',
      description: 'Access session notes, action roadmaps, recommended literature, and follow-up check-ins directly in your Mentee Dashboard.',
      icon: Compass,
      accent: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <section className="py-20 bg-slate-100/60 dark:bg-slate-900/40 relative overflow-hidden">
      <Container size="xl">
        <SectionHeading
          badge="Seamless Experience"
          title="How Global Mentor Works"
          subtitle="From your first question to lifelong breakthrough — four simple steps to world-class guidance."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-6 relative flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${step.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800 font-heading">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-royal-600 dark:text-royal-400">
                  Step {index + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
