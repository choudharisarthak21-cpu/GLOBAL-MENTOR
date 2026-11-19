import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No results found',
  description = 'Try adjusting your search filters or clear existing selections to find what you are looking for.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/40 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-royal-50 dark:bg-royal-950/50 flex items-center justify-center text-royal-600 dark:text-royal-400 mb-4 ring-8 ring-royal-50/50 dark:ring-royal-950/20">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-navy-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="outline" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
