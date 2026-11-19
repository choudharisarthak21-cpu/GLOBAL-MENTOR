import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TESTIMONIALS } from '../../data/mockData';
import { Badge } from '../common/Badge';

export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const active = TESTIMONIALS[currentIndex];

  const getDomainLabel = (d) => {
    switch (d) {
      case 'education':
        return { name: 'Higher Education', variant: 'royal' };
      case 'legal':
        return { name: 'Legal Literacy', variant: 'warning' };
      case 'counselling':
        return { name: 'Wellbeing Mentorship', variant: 'success' };
      default:
        return { name: d, variant: 'default' };
    }
  };

  const domain = getDomainLabel(active.domain);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <Container size="xl">
        <SectionHeading
          badge="Global Impact"
          title="Transformative Mentorship Stories"
          subtitle="Real outcomes from scholars, founders, and professionals guided by our international community."
          align="center"
        />

        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card rounded-3xl p-8 sm:p-12 relative shadow-xl">
            {/* Quote Icon */}
            <div className="w-12 h-12 rounded-2xl bg-royal-100 dark:bg-royal-950/60 text-royal-600 dark:text-royal-400 flex items-center justify-center mb-6">
              <Quote className="w-6 h-6" />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote content */}
            <blockquote className="text-lg sm:text-2xl font-medium text-navy-900 dark:text-white leading-relaxed mb-8">
              "{active.content}"
            </blockquote>

            {/* Mentee & Mentor detail */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-royal-500/20"
                />
                <div>
                  <h4 className="font-bold text-base text-navy-900 dark:text-white">
                    {active.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {active.role} • {active.country}
                  </p>
                  <p className="text-xs text-royal-600 dark:text-royal-400 font-semibold mt-0.5">
                    Mentored by: {active.mentorName}
                  </p>
                </div>
              </div>

              <div>
                <Badge variant={domain.variant} size="md">
                  {domain.name}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-royal-600'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
