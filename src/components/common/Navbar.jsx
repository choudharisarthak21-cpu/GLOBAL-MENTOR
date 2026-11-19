import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Heart,
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Calendar,
  Sparkles,
  BookOpen,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeToggle } from './ThemeToggle';
import { NotificationDropdown } from './NotificationDropdown';
import { Container } from './Container';

export const Navbar = () => {
  const { user, isAuthenticated, logoutDemo, wishlist, openChatbot } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Find Mentors', to: '/mentors' },
    { name: 'Resources', to: '/resources' },
    { name: 'Become a Mentor', to: '/become-a-mentor' },
    { name: 'Contact', to: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-colors">
      <Container size="xl">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-royal-600 flex items-center justify-center text-white shadow-md shadow-royal-600/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-gold-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl text-navy-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Global<span className="text-royal-600 dark:text-royal-400">Mentor</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-1">
                World-Class Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-royal-600 dark:text-royal-400 bg-royal-50/60 dark:bg-royal-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Wishlist, Notifications, Theme, Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Advisor Chatbot Trigger */}
            <button
              onClick={() => openChatbot()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-royal-50 dark:bg-royal-950/60 border border-royal-200/80 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-xs font-semibold hover:bg-royal-100 dark:hover:bg-royal-900 transition-colors shadow-2xs"
              title="Chat with AI Advisor to get mentor recommendations"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>AI Advisor</span>
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/mentors?savedOnly=true"
              className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Saved Mentors"
              aria-label="Saved Mentors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Dropdown or Auth CTA */}
            {isAuthenticated && user ? (
              <div className="relative ml-2">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-800 hover:border-royal-300 dark:hover:border-royal-700 bg-white dark:bg-slate-900 transition-all focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-royal-500/20"
                  />
                  <span className="text-xs font-semibold text-navy-900 dark:text-white max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-navy-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-royal-600 dark:text-royal-400 bg-royal-50 dark:bg-royal-950 px-2 py-0.5 rounded-full">
                        Demo Account
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-royal-600" />
                      Dashboard & Bookings
                    </Link>

                    <Link
                      to="/mentors?savedOnly=true"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Saved Mentors ({wishlist.length})
                    </Link>

                    <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logoutDemo();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out (Demo)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-royal-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-royal-600 hover:bg-royal-700 text-white shadow-sm shadow-royal-600/20 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChatbot();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-royal-700 dark:text-royal-300 bg-royal-50 dark:bg-royal-950/40"
            >
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>Chat with AI Advisor</span>
            </button>
            <Link
              to="/mentors?savedOnly=true"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Saved Mentors
              </span>
              <span className="text-xs bg-rose-100 dark:bg-rose-950 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-950/40"
              >
                <LayoutDashboard className="w-4 h-4" />
                Mentee Dashboard
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-navy-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logoutDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-rose-600 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl text-xs font-semibold bg-royal-600 text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
