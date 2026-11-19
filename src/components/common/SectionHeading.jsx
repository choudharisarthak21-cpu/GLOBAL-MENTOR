import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  badgeColor = 'royal'
}) => {
  const alignClass = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto'
  }[align];

  const badgeStyles = {
    royal: 'bg-royal-50 dark:bg-royal-950/60 text-royal-700 dark:text-royal-300 border-royal-200 dark:border-royal-800',
    gold: 'bg-gold-50 dark:bg-gold-950/60 text-gold-700 dark:text-gold-300 border-gold-200 dark:border-gold-800',
    navy: 'bg-navy-50 dark:bg-navy-950/60 text-navy-800 dark:text-navy-200 border-navy-200 dark:border-navy-800'
  }[badgeColor] || 'bg-royal-50 text-royal-700 border-royal-200';

  return (
    <div className={`flex flex-col max-w-3xl mb-12 ${alignClass} ${className}`}>
      {badge && (
        <span
          className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border mb-3 shadow-xs ${badgeStyles}`}
        >
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-bold tracking-tight text-navy-900 dark:text-white leading-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
