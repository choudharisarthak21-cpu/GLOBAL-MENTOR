import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Globe,
  Clock,
  CheckCircle2,
  Calendar,
  Play,
  Award,
  BookOpen,
  Languages,
  Shield,
  Star,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Rating } from '../components/common/Rating';
import { Modal } from '../components/common/Modal';
import { Skeleton } from '../components/common/Skeleton';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useApp } from '../context/AppContext';
import { mentorService } from '../services/mentorService';

export const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useApp();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    setLoading(false);
    mentorService
      .getMentorById(id)
      .then((data) => {
        setMentor(data);
        if (data.availabilityDays?.length > 0) {
          setSelectedDay(data.availabilityDays[0]);
        }
        if (data.availableSlots?.length > 0) {
          setSelectedSlot(data.availableSlots[0]);
        }
      })
      .catch(() => {
        navigate('/mentors');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading || !mentor) {
    return (
      <div className="py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <Container size="xl">
          <div className="space-y-6 max-w-4xl mx-auto">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </Container>
      </div>
    );
  }

  const isSaved = isInWishlist(mentor.id);

  const getDomainInfo = (d) => {
    switch (d) {
      case 'education':
        return { label: 'Higher Education & Career', variant: 'royal' };
      case 'legal':
        return { label: 'Legal Guidance & Literacy', variant: 'warning' };
      case 'counselling':
        return { label: 'Wellbeing & Somatic Coaching', variant: 'success' };
      default:
        return { label: d, variant: 'default' };
    }
  };

  const domain = getDomainInfo(mentor.domain);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/mentors" className="hover:text-royal-600 transition-colors">
            Mentors
          </Link>
          <span>/</span>
          <span className="capitalize">{mentor.domain}</span>
          <span>/</span>
          <span className="text-navy-900 dark:text-white font-medium">{mentor.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Header Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="relative">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-lg"
                    />
                    {mentor.verified && (
                      <div
                        className="absolute -bottom-1 -right-1 bg-royal-600 text-white p-1 rounded-full shadow-md"
                        title="Verified Global Mentor"
                      >
                        <CheckCircle2 className="w-5 h-5 fill-royal-600 text-white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white">
                        {mentor.name}
                      </h1>
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                      {mentor.title}
                    </p>

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <Rating score={mentor.rating} count={mentor.reviewsCount} size="md" />
                      <Badge variant={domain.variant} size="sm">
                        {domain.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(mentor.id, mentor.name)}
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-semibold self-end sm:self-start ${
                    isSaved
                      ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Save Mentor'}</span>
                </button>
              </div>

              {/* Sub-meta strip */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">Location</span>
                  <div className="font-semibold text-navy-900 dark:text-white flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-royal-600" />
                    <span>{mentor.country}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Languages</span>
                  <div className="font-semibold text-navy-900 dark:text-white flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-royal-600" />
                    <span>{mentor.languages.join(', ')}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Experience</span>
                  <div className="font-semibold text-navy-900 dark:text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-royal-600" />
                    <span>{mentor.experienceYears} Years Active</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Rate</span>
                  <div className="font-semibold text-royal-600 dark:text-royal-400 text-sm">
                    ${mentor.hourlyRate} / hour
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Video Intro Placeholder */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-navy-900/5 via-royal-900/5 to-transparent border border-royal-200/40 dark:border-royal-800/40">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 flex items-center gap-1 justify-center sm:justify-start">
                  <Play className="w-3 h-3 fill-current" />
                  Video Introduction
                </span>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                  Watch 90-Second Intro from {mentor.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hear their mentoring philosophy, session structure, and real mentee expectations.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setVideoModalOpen(true)}
                className="shrink-0"
              >
                <Play className="w-4 h-4 fill-current mr-1" />
                <span>Play Video Intro</span>
              </Button>
            </div>

            {/* 3. Biography & Deep Background */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                About & Background
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {mentor.fullBio}
              </p>
            </div>

            {/* 4. Credentials, Education & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-royal-600 dark:text-royal-400">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Education & Credentials
                  </h3>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <p className="font-medium text-navy-900 dark:text-white">
                    {mentor.education}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">Certifications:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {mentor.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-gold-500">
                  <Award className="w-5 h-5" />
                  <h3 className="font-bold text-base text-navy-900 dark:text-white">
                    Key Achievements
                  </h3>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  {mentor.achievements.map((ach, i) => (
                    <li key={i} className="leading-relaxed">
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Core Skills & Topics */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                Guidance Topics & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {mentor.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Mentee Reviews */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                    Verified Mentee Reviews
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Ratings from completed 1-on-1 strategy sessions
                  </p>
                </div>
                <Rating score={mentor.rating} count={mentor.reviewsCount} size="md" />
              </div>

              <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                {mentor.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-navy-900 dark:text-white">
                          {rev.userName}
                        </span>
                        <span className="text-slate-400 ml-2">({rev.userCountry})</span>
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-royal-500/20 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  1-on-1 Strategy Session
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-navy-900 dark:text-white font-heading">
                    ${mentor.hourlyRate}
                  </span>
                  <span className="text-xs text-slate-400">/ 60 minutes</span>
                </div>
              </div>

              {/* Day selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Available Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {mentor.availabilityDays.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedDay === day
                          ? 'bg-royal-600 text-white border-royal-600 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Available Time Slots (Your Timezone)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mentor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        selectedSlot === slot
                          ? 'bg-navy-900 dark:bg-royal-600 text-white border-transparent'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Types preview */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-navy-900 dark:text-white block">
                  Included in Session:
                </span>
                <p>✓ 1-on-1 Live HD Video / Screen share</p>
                <p>✓ Post-session recording & written roadmap</p>
                <p>✓ 48-hour follow-up chat support</p>
              </div>

              {/* Action Button */}
              <Link
                to={`/booking/${mentor.id}?day=${selectedDay || ''}&slot=${selectedSlot || ''}`}
                className="w-full block"
              >
                <Button variant="primary" size="lg" className="w-full shadow-lg shadow-royal-600/30">
                  <span>Continue to Book Session</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                Demo Booking Mode • Free simulation without payment
              </p>
            </div>

            {/* Compact disclaimer */}
            <DisclaimerBanner compact={true} />
          </div>
        </div>
      </Container>

      {/* Video Intro Modal */}
      <Modal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={`Video Introduction — ${mentor.name}`}
        subtitle={`${mentor.title} • Verified Mentor`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-800">
            <div className="text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-royal-600/80 text-white flex items-center justify-center mx-auto shadow-xl">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h4 className="text-white font-bold text-base">
                Simulated Video Stream
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                "Welcome to my mentorship room. In our sessions, we focus on rigorous preparation, real feedback, and concrete results."
              </p>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={() => setVideoModalOpen(false)}>
              Close Video
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
