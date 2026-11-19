import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Scale, HeartHandshake, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const DomainCard = ({ domain }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'education':
        return <GraduationCap className="w-7 h-7 text-royal-600 dark:text-royal-400" />;
      case 'legal':
        return <Scale className="w-7 h-7 text-amber-600 dark:text-amber-400" />;
      case 'counselling':
        return <HeartHandshake className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <GraduationCap className="w-7 h-7" />;
    }
  };

  const getThemeClass = (id) => {
    switch (id) {
      case 'education':
        return {
          iconBg: 'bg-royal-50 dark:bg-royal-950/60 ring-royal-100 dark:ring-royal-900',
          badgeVariant: 'royal',
          borderHover: 'hover:border-royal-400 dark:hover:border-royal-600',
          accent: 'text-royal-600 dark:text-royal-400'
        };
      case 'legal':
        return {
          iconBg: 'bg-amber-50 dark:bg-amber-950/60 ring-amber-100 dark:ring-amber-900',
          badgeVariant: 'warning',
          borderHover: 'hover:border-amber-400 dark:hover:border-amber-600',
          accent: 'text-amber-600 dark:text-amber-400'
        };
      case 'counselling':
        return {
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 ring-emerald-100 dark:ring-emerald-900',
          badgeVariant: 'success',
          borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-600',
          accent: 'text-emerald-600 dark:text-emerald-400'
        };
      default:
        return {
          iconBg: 'bg-slate-50',
          badgeVariant: 'default',
          borderHover: 'hover:border-royal-400',
          accent: 'text-royal-600'
        };
    }
  };

  const theme = getThemeClass(domain.id);

  return (
    <div
      className={`glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${theme.borderHover} group`}
    >
      <div>
        {/* Top Icon and Badge */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-8 transition-transform group-hover:scale-105 ${theme.iconBg}`}
          >
            {getIcon(domain.id)}
          </div>
          <Badge variant={theme.badgeVariant} size="md">
            {domain.shortName}
          </Badge>
        </div>

        {/* Title and Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors">
          {domain.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
          {domain.tagline}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {domain.description}
        </p>

        {/* Key Topics List */}
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Key Guidance Areas
          </span>
          {domain.topics.slice(0, 4).map((topic, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accent}`} />
              <span>{topic}</span>
            </div>
          ))}
        </div>

        {/* Informational Disclaimer Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          <div className="flex items-start gap-1.5 font-semibold text-slate-700 dark:text-slate-300 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>Scope & Boundaries</span>
          </div>
          <p className="line-clamp-3">{domain.disclaimer}</p>
        </div>
      </div>

      {/* Footer Stats & CTA */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] text-slate-400 block">Verified Mentors</span>
          <span className="text-sm font-bold text-navy-900 dark:text-white">
            {domain.stats.mentorsCount}+ active
          </span>
        </div>

        <Link
          to={`/mentors?domain=${domain.id}`}
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all ${
            domain.id === 'education'
              ? 'bg-royal-600 hover:bg-royal-700 text-white shadow-sm'
              : domain.id === 'legal'
              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
          }`}
        >
          <span>Explore Mentors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
