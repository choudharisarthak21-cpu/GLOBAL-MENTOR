import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle2, Globe, Clock, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Rating } from '../common/Rating';
import { Badge } from '../common/Badge';

export const MentorCard = ({ mentor }) => {
  const { isInWishlist, toggleWishlist } = useApp();
  const isSaved = isInWishlist(mentor.id);

  const getDomainBadge = (domain) => {
    switch (domain) {
      case 'education':
        return { label: 'Education', variant: 'royal' };
      case 'legal':
        return { label: 'Legal Guidance', variant: 'warning' };
      case 'counselling':
        return { label: 'Counselling', variant: 'success' };
      default:
        return { label: domain, variant: 'default' };
    }
  };

  const domainBadge = getDomainBadge(mentor.domain);

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300">
      {/* Top row: Avatar, Info, Wishlist */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                loading="lazy"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm"
              />
              {mentor.verified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-royal-600 text-white rounded-full p-0.5 shadow-sm"
                  title="Verified Global Mentor"
                >
                  <CheckCircle2 className="w-4 h-4 fill-royal-600 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  to={`/mentors/${mentor.id}`}
                  className="font-bold text-base sm:text-lg text-navy-900 dark:text-white hover:text-royal-600 dark:hover:text-royal-400 transition-colors line-clamp-1"
                >
                  {mentor.name}
                </Link>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {mentor.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Rating score={mentor.rating} count={mentor.reviewsCount} />
              </div>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(mentor.id, mentor.name)}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:border-rose-200'
            }`}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            title={isSaved ? 'Saved in wishlist' : 'Save mentor'}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isSaved ? 'fill-current' : ''
              }`}
            />
          </button>
        </div>

        {/* Badges: Domain & Location */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge variant={domainBadge.variant} size="sm">
            {domainBadge.label}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full">
            <Globe className="w-3 h-3 text-slate-400" />
            {mentor.country}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-slate-400" />
            {mentor.experienceYears}y exp
          </span>
        </div>

        {/* Bio summary */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {mentor.bio}
        </p>

        {/* Skills Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {mentor.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {mentor.skills.length > 3 && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
              +{mentor.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Rate and Booking CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-400 block leading-none">Session Rate</span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-lg font-bold text-navy-900 dark:text-white">
              ${mentor.hourlyRate}
            </span>
            <span className="text-xs text-slate-400 font-normal">/ hour</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/mentors/${mentor.id}`}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Profile
          </Link>
          <Link
            to={`/booking/${mentor.id}`}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-royal-600 hover:bg-royal-700 text-white shadow-sm shadow-royal-600/20 flex items-center gap-1 transition-colors"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
