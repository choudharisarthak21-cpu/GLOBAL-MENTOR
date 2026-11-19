import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Video,
  Phone,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Download,
  LayoutDashboard,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useApp } from '../context/AppContext';
import { mentorService } from '../services/mentorService';

export const Booking = () => {
  const { mentorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, addBooking } = useApp();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [sessionType, setSessionType] = useState('video');
  const [selectedDay, setSelectedDay] = useState(searchParams.get('day') || '');
  const [selectedSlot, setSelectedSlot] = useState(searchParams.get('slot') || '');
  const [menteeName, setMenteeName] = useState(user?.name || '');
  const [menteeEmail, setMenteeEmail] = useState(user?.email || '');
  const [goals, setGoals] = useState('');
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    mentorService
      .getMentorById(mentorId)
      .then((data) => {
        setMentor(data);
        if (!selectedDay && data.availabilityDays?.length > 0) {
          setSelectedDay(data.availabilityDays[0]);
        }
        if (!selectedSlot && data.availableSlots?.length > 0) {
          setSelectedSlot(data.availableSlots[0]);
        }
      })
      .catch(() => {
        navigate('/mentors');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mentorId, navigate]);

  const sessionTypes = [
    {
      id: 'video',
      title: '1-on-1 Video Strategy Call',
      description: 'Face-to-face HD consultation with real-time screen sharing and collaborative document editing.',
      icon: Video,
      duration: '60 minutes',
      badge: 'Most Popular'
    },
    {
      id: 'audio',
      title: 'Voice-Only Strategy Session',
      description: 'Focused voice dialogue ideal for bandwidth-sensitive locations or commute.',
      icon: Phone,
      duration: '45 minutes',
      badge: 'Low Bandwidth'
    },
    {
      id: 'async',
      title: 'Async Document Review & Memo',
      description: 'In-depth markup of your SOP, contract, or strategy with a personalized 15-min audio breakdown.',
      icon: FileText,
      duration: 'Turnaround 48h',
      badge: 'Deep Review'
    }
  ];

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDay || !selectedSlot) {
      toast.error('Please select both a date and an available time slot.');
      return;
    }

    if (!menteeName.trim() || !menteeEmail.trim()) {
      toast.error('Please provide your name and email address.');
      return;
    }

    if (!acceptedDisclaimer) {
      toast.error('Please acknowledge the informational guidance and non-emergency terms.');
      return;
    }

    setSubmitting(true);
    try {
      const selectedTypeObj = sessionTypes.find((s) => s.id === sessionType);
      const newBooking = await mentorService.createBooking({
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorTitle: mentor.title,
        mentorAvatar: mentor.avatar,
        domain: mentor.domain,
        date: `${selectedDay}, ${selectedSlot}`,
        sessionType: selectedTypeObj.title,
        meetingUrl: `https://meet.globalmentor.example/${mentor.id}-${Date.now().toString().slice(-4)}`,
        notes: goals || 'General mentorship strategy and roadmapping.',
        menteeName,
        menteeEmail,
        rate: mentor.hourlyRate
      });

      // Add to global state so it immediately appears in Dashboard!
      addBooking(newBooking);
      setConfirmedBooking(newBooking);
      toast.success('Session booked successfully! Added to your dashboard.');
    } catch {
      toast.error('Failed to book session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !mentor) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-500">Loading booking portal...</p>
      </div>
    );
  }

  // Confirmation Success View
  if (confirmedBooking) {
    return (
      <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <Container size="md">
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border-2 border-emerald-500/20">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
                Booking Confirmed (Demo Mode)
              </span>
              <h1 className="text-3xl font-extrabold text-navy-900 dark:text-white mt-3">
                You're Scheduled with {mentor.name}!
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                A calendar invitation and join link have been generated for your session.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-6 text-left border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Reference ID:</span>
                <span className="font-mono font-bold text-navy-900 dark:text-white">
                  {confirmedBooking.id}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Mentor:</span>
                <span className="font-bold text-navy-900 dark:text-white">
                  {mentor.name} ({mentor.title})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Session Type:</span>
                <span className="font-semibold text-royal-600 dark:text-royal-400">
                  {confirmedBooking.sessionType}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-navy-900 dark:text-white">
                  {confirmedBooking.date}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Demo Meeting URL:</span>
                <a
                  href={confirmedBooking.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-royal-600 dark:text-royal-400 underline truncate max-w-[200px]"
                >
                  {confirmedBooking.meetingUrl}
                </a>
              </div>
            </div>

            {/* Note about Demo */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-800 dark:text-amber-300 text-left">
              <strong>Notice:</strong> This is a simulation. No real credit card was charged. This booking is now actively reflected on your Mentee Dashboard!
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link to="/dashboard">
                <Button variant="primary" size="lg">
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  <span>Go to Mentee Dashboard</span>
                </Button>
              </Link>
              <Link to="/mentors">
                <Button variant="outline" size="lg">
                  <span>Browse More Mentors</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        <div className="mb-8">
          <Link
            to={`/mentors/${mentor.id}`}
            className="text-xs font-semibold text-royal-600 dark:text-royal-400 hover:underline mb-2 inline-block"
          >
            ← Back to {mentor.name}'s Profile
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
            Schedule Mentorship Session
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure your session format, preferred slot, and preparation notes.
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Booking Controls */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Session Type Selection */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <span>1. Choose Session Format</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sessionTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = sessionType === type.id;

                  return (
                    <div
                      key={type.id}
                      onClick={() => setSessionType(type.id)}
                      className={`rounded-2xl p-4 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-royal-600 bg-royal-50/50 dark:bg-royal-950/40 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`p-2 rounded-xl ${
                              isSelected
                                ? 'bg-royal-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 bg-royal-100 dark:bg-royal-900/60 px-2 py-0.5 rounded-full">
                            {type.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-navy-900 dark:text-white">
                          {type.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {type.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-slate-400">
                        {type.duration}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Date & Time Selection */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                2. Select Date & Slot
              </h2>

              {/* Days */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Select Day
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {mentor.availabilityDays.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedDay === day
                          ? 'bg-royal-600 text-white border-royal-600 shadow-md shadow-royal-600/20'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Select Time Slot (Your Local Timezone)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {mentor.availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                        selectedSlot === slot
                          ? 'bg-navy-900 dark:bg-royal-600 text-white border-transparent shadow-md'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Mentee Details & Preparation Goals */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">
                3. Your Details & Session Agenda
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={menteeName}
                    onChange={(e) => setMenteeName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={menteeEmail}
                    onChange={(e) => setMenteeEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Specific Questions / Document Links for {mentor.name}
                </label>
                <textarea
                  rows="3"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Share what you hope to resolve (e.g., critique my Oxford statement draft, clarify term sheet liquidation clauses, or discuss burnout recovery)..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              {/* Mandatory Informational Scope Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedDisclaimer}
                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-royal-600 focus:ring-royal-500 border-slate-300"
                  />
                  <span className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-normal">
                    I understand that Global Mentor provides educational literacy and life mentorship. Legal guidance does not establish an attorney-client relationship, and counselling is non-clinical and not emergency care.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Sticky Price Summary Column */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-royal-500/20"
                />
                <div>
                  <h3 className="font-bold text-sm text-navy-900 dark:text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate max-w-[180px]">
                    {mentor.title}
                  </p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Mentor Consultation (60m)</span>
                  <span className="font-semibold">${mentor.hourlyRate}.00</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Platform Booking Fee</span>
                  <span className="font-semibold text-emerald-600">$0.00 (Demo Promo)</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Taxes / VAT</span>
                  <span className="font-semibold">$0.00</span>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-navy-900 dark:text-white">
                    Total Due
                  </span>
                  <span className="text-2xl font-black text-navy-900 dark:text-white font-heading">
                    ${mentor.hourlyRate}.00
                  </span>
                </div>
              </div>

              {/* Demo Mode Notice */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 text-[11px] text-blue-800 dark:text-blue-300">
                <strong>Demo Mode:</strong> No real payment gateway is integrated. Clicking Confirm simulates the transaction and creates a live booking reference.
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitting}
                className="w-full shadow-lg shadow-royal-600/30"
              >
                <span>Confirm & Reserve Slot</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <div className="space-y-1 text-center text-[11px] text-slate-400">
                <p>Free cancellation up to 24 hours before session</p>
                <p>100% Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
