import React, { useState, useEffect, useRef } from 'react';

export const AnimatedCounter = ({ endValue, duration = 1800, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  // Extract numeric part
  const numericTarget = parseInt(endValue.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(numericTarget);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(easeOutProgress * numericTarget));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setDisplayValue(numericTarget);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, duration]);

  // Format with commas if > 1000
  const formatted = displayValue.toLocaleString();

  return (
    <span ref={elementRef} className="tabular-nums font-bold">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
