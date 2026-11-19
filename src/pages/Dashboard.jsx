import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Award,
  BookOpen,
  Video,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  FileCheck,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { MentorCard } from '../components/mentors/MentorCard';
import { useApp } from '../context/AppContext';
import { MENTORS, RESOURCES } from '../data/mockData';

export const Dashboard = () => {
  const { user, bookings, wishlist } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeMeetingModal, setActiveMeetingModal] = useState(null);

  // Filter mentors in wishlist
  const savedMentorsList = MENTORS.filter((m) => wishlist.includes(m.id));

  const handleJoinMeeting = (booking) => {
    setActiveMeetingModal(booking);
  };

  const handleCancelBooking = (bookingId) => {
    toast('Simulated cancellation: Slot reopened in mentor schedule.');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'My Sessions', icon: Calendar, badge: bookings.length },
    { id: 'saved', label: 'Saved Mentors', icon: Heart, badge: savedMentorsList.length },
    { id: 'progress', label: 'Progress & Goals', icon: TrendingUp },
    { id: 'resources', label: 'My Resources', icon: BookOpen }
  ];

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        {/* Top Welcome Banner */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-royal-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
                  Welcome back, {user?.name || 'Alex Morgan'}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 px-2 py-0.5 rounded-full">
                  Mentee Demo
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {user?.role || 'Aspiring Graduate Scholar & Product Lead'} • {user?.country || 'Canada'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/mentors">
              <Button variant="primary" size="sm">
                <span>Book New Session</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar + Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav */}
          <aside className="lg:col-span-3 glass-card rounded-2xl p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-royal-600 text-white shadow-sm shadow-royal-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-8">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Upcoming Sessions', value: bookings.length, icon: Calendar, color: 'text-royal-600' },
                    { label: 'Mentorship Hours', value: `${user?.learningHours || 12.5}h`, icon: Clock, color: 'text-emerald-600' },
                    { label: 'Saved Mentors', value: savedMentorsList.length, icon: Heart, color: 'text-rose-600' },
                    { label: 'Milestones Active', value: '3', icon: TrendingUp, color: 'text-amber-600' }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="glass-card rounded-2xl p-5 space-y-1">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            {stat.label}
                          </span>
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div className="text-2xl font-black text-navy-900 dark:text-white font-heading">
                          {stat.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next Upcoming Session Highlight */}
                {bookings.length > 0 && (
                  <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-royal-500/30 bg-gradient-to-r from-royal-500/5 via-transparent to-transparent space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 bg-royal-100 dark:bg-royal-950 px-3 py-1 rounded-full">
                        Next Upcoming Session
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {bookings[0].date}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={bookings[0].mentorAvatar}
                          alt={bookings[0].mentorName}
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-royal-500/20"
                        />
                        <div>
                          <h3 className="font-bold text-base text-navy-900 dark:text-white">
                            {bookings[0].mentorName}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {bookings[0].mentorTitle}
                          </p>
                          <span className="text-xs font-semibold text-royal-600 dark:text-royal-400 mt-1 block">
                            {bookings[0].sessionType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => handleJoinMeeting(bookings[0])}
                        >
                          <Video className="w-4 h-4 mr-1.5" />
                          <span>Join Meeting Room</span>
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-300">
                      <strong>Focus / Preparation Notes:</strong> {bookings[0].notes}
                    </div>
                  </div>
                )}

                {/* Progress Milestones */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Active Development Milestones
                  </h3>
                  <div className="space-y-4">
                    {(user?.milestones || []).map((m) => (
                      <div key={m.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-navy-900 dark:text-white">{m.title}</span>
                          <span className="text-royal-600 dark:text-royal-400">{m.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-royal-600 rounded-full transition-all duration-500"
                            style={{ width: `${m.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity List */}
                <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Recent Platform Activity
                  </h3>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {(user?.recentActivity || []).map((act) => (
                      <div key={act.id} className="py-3 flex items-center justify-between text-xs">
                        <span className="text-slate-700 dark:text-slate-200">{act.text}</span>
                        <span className="text-slate-400">{act.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MY SESSIONS / BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                    Your Scheduled Mentorship Sessions
                  </h2>
                  <Link to="/mentors">
                    <Button variant="outline" size="sm">
                      Book Another Mentor
                    </Button>
                  </Link>
                </div>

                {bookings.length === 0 ? (
                  <EmptyState
                    title="No upcoming sessions"
                    description="You have no mentorship sessions scheduled at the moment. Browse mentors to book a 1-on-1 strategy call."
                    actionLabel="Explore Mentors"
                    onAction={() => window.location.assign('/mentors')}
                  />
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={booking.mentorAvatar}
                            alt={booking.mentorName}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-base text-navy-900 dark:text-white">
                                {booking.mentorName}
                              </h3>
                              <Badge variant="success" size="sm">
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {booking.mentorTitle}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-royal-600 dark:text-royal-400">
                              <span>📅 {booking.date}</span>
                              <span>•</span>
                              <span>{booking.sessionType}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleJoinMeeting(booking)}
                          >
                            <Video className="w-3.5 h-3.5 mr-1" />
                            <span>Join</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SAVED MENTORS (WISHLIST) */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                    Saved Mentors ({savedMentorsList.length})
                  </h2>
                  <Link to="/mentors">
                    <Button variant="outline" size="sm">
                      Discover More
                    </Button>
                  </Link>
                </div>

                {savedMentorsList.length === 0 ? (
                  <EmptyState
                    title="No saved mentors"
                    description="You haven't added any mentors to your wishlist yet. Click the heart icon on any mentor profile to bookmark them."
                    actionLabel="Browse Mentors"
                    onAction={() => window.location.assign('/mentors')}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedMentorsList.map((mentor) => (
                      <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROGRESS TRACKER */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                  Academic & Career Progress Tracker
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Admissions & Scholarships', progress: 85, sessions: 4 },
                    { title: 'Contract & IP Literacy', progress: 60, sessions: 2 },
                    { title: 'Executive Stress Regulation', progress: 75, sessions: 3 }
                  ].map((track, i) => (
                    <div key={i} className="glass-card rounded-2xl p-6 space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600">
                        {track.sessions} Sessions Done
                      </span>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white">
                        {track.title}
                      </h4>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full bg-royal-600 rounded-full"
                          style={{ width: `${track.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">{track.progress}% completed</span>
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-3">
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Accredited Guidance Milestones
                  </h3>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-royal-50 dark:bg-royal-950/40 border border-royal-200/60 dark:border-royal-800 text-xs">
                    <FileCheck className="w-8 h-8 text-royal-600 shrink-0" />
                    <div>
                      <p className="font-bold text-navy-900 dark:text-white">
                        Certificate of Academic Readiness: Oxford SOP Tier-1
                      </p>
                      <p className="text-slate-500 mt-0.5">
                        Verified by Dr. Alistair Vance • Issued October 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                    Your Saved Frameworks & Literature
                  </h2>
                  <Link to="/resources">
                    <Button variant="outline" size="sm">
                      Browse Library
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RESOURCES.slice(0, 4).map((res) => (
                    <div key={res.id} className="glass-card rounded-2xl p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600">
                        {res.category} • {res.readTime}
                      </span>
                      <h4 className="font-bold text-sm text-navy-900 dark:text-white line-clamp-1">
                        {res.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {res.description}
                      </p>
                      <Link
                        to="/resources"
                        className="inline-block text-xs font-semibold text-royal-600 hover:underline pt-2"
                      >
                        Open Guide →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* Simulated Meeting Room Modal */}
      <Modal
        isOpen={!!activeMeetingModal}
        onClose={() => setActiveMeetingModal(null)}
        title="Live Mentorship Room Preview"
        subtitle={`Session with ${activeMeetingModal?.mentorName}`}
        maxWidth="max-w-xl"
      >
        <div className="space-y-4 text-center">
          <div className="p-8 rounded-2xl bg-navy-950 text-white space-y-3">
            <Video className="w-12 h-12 text-royal-400 mx-auto animate-pulse" />
            <h4 className="font-bold text-lg">
              Connecting to Secure Room...
            </h4>
            <p className="text-xs text-slate-400">
              Demo Preview: In a live environment with configured WebRTC/Daily.co or Zoom backend, your high-definition video session begins here automatically.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Meeting Link: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{activeMeetingModal?.meetingUrl}</code>
          </div>

          <div className="flex justify-center pt-2">
            <Button variant="primary" size="md" onClick={() => setActiveMeetingModal(null)}>
              Exit Meeting Room
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
