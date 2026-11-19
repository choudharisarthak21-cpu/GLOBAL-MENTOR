import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { SearchBar } from '../components/mentors/SearchBar';
import { FilterPanel } from '../components/mentors/FilterPanel';
import { MentorCard } from '../components/mentors/MentorCard';
import { MentorCardSkeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useApp } from '../context/AppContext';
import { mentorService } from '../services/mentorService';

export const Mentors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useApp();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filters state initialized from URL params if present
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    domain: searchParams.get('domain') || 'all',
    country: searchParams.get('country') || 'all',
    language: searchParams.get('language') || 'all',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    minExperience: searchParams.get('minExperience') || '',
    sortBy: searchParams.get('sortBy') || 'featured',
    savedOnly: searchParams.get('savedOnly') === 'true'
  });

  // Keep URL in sync with filters
  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.domain && filters.domain !== 'all') params.domain = filters.domain;
    if (filters.country && filters.country !== 'all') params.country = filters.country;
    if (filters.language && filters.language !== 'all') params.language = filters.language;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minRating) params.minRating = filters.minRating;
    if (filters.minExperience) params.minExperience = filters.minExperience;
    if (filters.sortBy && filters.sortBy !== 'featured') params.sortBy = filters.sortBy;
    if (filters.savedOnly) params.savedOnly = 'true';

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Load mentors with service
  useEffect(() => {
    setLoading(true);
    mentorService
      .getMentors(filters)
      .then((data) => {
        let result = data;
        if (filters.savedOnly) {
          result = result.filter((m) => wishlist.includes(m.id));
        }
        setMentors(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, wishlist]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      domain: 'all',
      country: 'all',
      language: 'all',
      maxPrice: '',
      minRating: '',
      minExperience: '',
      sortBy: 'featured',
      savedOnly: false
    });
    setVisibleCount(6);
  };

  const paginatedMentors = mentors.slice(0, visibleCount);

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            badge="Verified Global Mentors"
            title="Explore 1,200+ International Mentors"
            subtitle="Search across higher education admissions, startup legal literacy, and holistic wellbeing."
            align="left"
            className="mb-6"
          />

          {/* Search bar & Mobile Filter Trigger */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <SearchBar
                value={filters.search}
                onChange={(val) => setFilters({ ...filters, search: val })}
                onClear={() => setFilters({ ...filters, search: '' })}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full sm:w-auto text-xs font-semibold px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-500 shadow-sm"
                >
                  <option value="featured">Sort: Recommended</option>
                  <option value="rating-desc">Sort: Highest Rating</option>
                  <option value="price-asc">Sort: Price (Low to High)</option>
                  <option value="price-desc">Sort: Price (High to Low)</option>
                  <option value="exp-desc">Sort: Most Experienced</option>
                  <option value="reviews-desc">Sort: Most Reviews</option>
                </select>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-royal-600" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner compact */}
        <DisclaimerBanner compact={true} />

        {/* Content Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResults={mentors.length}
            />
          </aside>

          {/* Mentors Grid / Skeletons / Empty State */}
          <main className="lg:col-span-3 space-y-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <MentorCardSkeleton key={i} />
                ))}
              </div>
            ) : mentors.length === 0 ? (
              <EmptyState
                title="No mentors match your current filters"
                description="We couldn't find any mentors matching these criteria. Try adjusting the maximum hourly price, experience level, or domain category."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    Showing <strong className="text-navy-900 dark:text-white">{paginatedMentors.length}</strong> of{' '}
                    <strong className="text-navy-900 dark:text-white">{mentors.length}</strong> available mentors
                  </span>
                  {filters.savedOnly && (
                    <span className="font-semibold text-rose-500 flex items-center gap-1">
                      Filtering by Wishlist
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>

                {/* Pagination / Load More */}
                {visibleCount < mentors.length && (
                  <div className="pt-6 text-center">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                    >
                      Load More Mentors ({mentors.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </Container>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-white dark:bg-slate-900 h-full overflow-y-auto p-6 z-10 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-navy-900 dark:text-white">Filter Directory</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 flex-1">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                totalResults={mentors.length}
                isMobileDrawer={true}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
