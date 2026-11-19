import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Compass,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { useApp } from '../context/AppContext';

export const Auth = ({ initialMode = 'login' }) => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginDemo } = useApp();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      loginDemo('student');
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleQuickDemo = (role) => {
    loginDemo(role);
    navigate('/dashboard');
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center">
      <Container size="sm">
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-royal-600 flex items-center justify-center text-white shadow-md shadow-royal-600/30">
                <Compass className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-navy-900 dark:text-white">
                Global<span className="text-royal-600 dark:text-royal-400">Mentor</span>
              </span>
            </Link>

            <h1 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
              {mode === 'login' ? 'Welcome Back to Your Journey' : 'Create Your Mentee Account'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'login'
                ? 'Sign in to access your scheduled strategy sessions and roadmaps'
                : 'Join ambitious scholars and professionals worldwide'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`py-2.5 rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`py-2.5 rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-800 text-navy-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Demo Auth Disclaimer Badge */}
          <div className="p-3.5 rounded-2xl bg-royal-50 dark:bg-royal-950/40 border border-royal-200/80 dark:border-royal-800 text-xs text-royal-900 dark:text-royal-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-royal-600 shrink-0" />
              <span>Simulated Demo Authentication</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              No backend required. Use any demo email/password or click one-click demo login below.
            </p>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full shadow-lg shadow-royal-600/30"
            >
              <span>{mode === 'login' ? 'Sign In to Account' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-[11px] font-bold uppercase text-slate-400">
              Or Instant Demo Sign-In
            </span>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="p-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors text-center"
            >
              Mentee / Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('professional')}
              className="p-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors text-center"
            >
              Professional
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('mentor')}
              className="p-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors text-center"
            >
              Verified Mentor
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
