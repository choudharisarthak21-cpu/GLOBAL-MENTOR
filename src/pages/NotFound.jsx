import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';

export const NotFound = () => {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-950 min-h-[75vh] flex items-center justify-center text-center">
      <Container size="sm">
        <div className="glass-card rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8 rotate-45" />
          </div>
          <h1 className="text-4xl font-black text-navy-900 dark:text-white font-heading">
            404
          </h1>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">
            Lost in the Global Network?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            The page or mentor profile you were looking for does not exist or has moved.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/">
              <Button variant="primary" size="md">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Return to Home</span>
              </Button>
            </Link>
            <Link to="/mentors">
              <Button variant="outline" size="md">
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
