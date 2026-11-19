import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ score = 5.0, count, size = 'sm', showNumeric = true }) => {
  const stars = [1, 2, 3, 4, 5];

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size] || 'w-4 h-4';

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Rating ${score} out of 5`}>
      <div className="flex items-center text-amber-400">
        {stars.map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.floor(score)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= score
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
      {showNumeric && (
        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          {score.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({count})
        </span>
      )}
    </div>
  );
};
