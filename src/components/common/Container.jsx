import React from 'react';

export const Container = ({ children, className = '', size = 'xl' }) => {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizes[size] || sizes.xl} ${className}`}>
      {children}
    </div>
  );
};
