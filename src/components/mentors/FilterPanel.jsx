import React from 'react';
import { RotateCcw, Filter, Heart, DollarSign, Star, Globe, Award } from 'lucide-react';
import { DOMAINS } from '../../data/mockData';

export const FilterPanel = ({
  filters,
  onChange,
  onReset,
  totalResults = 0,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const countries = ['all', 'United Kingdom', 'United States', 'Germany', 'Canada', 'India', 'France', 'Kenya', 'Japan'];
  const languages = ['all', 'English', 'French', 'German', 'Spanish', 'Hindi', 'Arabic', 'Japanese'];

  const handleDomainChange = (domainId) => {
    onChange({ ...filters, domain: domainId });
  };

  const handleFieldChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-royal-600 dark:text-royal-400" />
          <h3 className="font-bold text-navy-900 dark:text-white text-base">
            Filter Mentors
          </h3>
          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {totalResults}
          </span>
        </div>

        <button
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-royal-600 dark:hover:text-royal-400 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Wishlist only toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <input
            type="checkbox"
            checked={!!filters.savedOnly}
            onChange={(e) => handleFieldChange('savedOnly', e.target.checked)}
            className="w-4 h-4 rounded text-royal-600 focus:ring-royal-500 rounded border-slate-300"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Show Saved Mentors Only
          </span>
        </label>
      </div>

      {/* Domain Selection Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Domain Category
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => handleDomainChange('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
              filters.domain === 'all'
                ? 'bg-royal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>All Domains</span>
          </button>
          {DOMAINS.map((dom) => (
            <button
              key={dom.id}
              onClick={() => handleDomainChange(dom.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                filters.domain === dom.id
                  ? 'bg-royal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{dom.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Max Hourly Rate */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            Max Hourly Rate
          </label>
          <span className="text-xs font-bold text-royal-600 dark:text-royal-400">
            ${filters.maxPrice || 150}/hr
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="150"
          step="5"
          value={filters.maxPrice || 150}
          onChange={(e) => handleFieldChange('maxPrice', e.target.value)}
          className="w-full accent-royal-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$40</span>
          <span>$150+</span>
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          Country
        </label>
        <select
          value={filters.country || 'all'}
          onChange={(e) => handleFieldChange('country', e.target.value)}
          className="w-full text-xs font-medium px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-500"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All Countries' : c}
            </option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Language
        </label>
        <select
          value={filters.language || 'all'}
          onChange={(e) => handleFieldChange('language', e.target.value)}
          className="w-full text-xs font-medium px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-royal-500"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {l === 'all' ? 'All Languages' : l}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Experience */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          Minimum Experience
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {['all', '5', '10', '15'].map((exp) => (
            <button
              key={exp}
              onClick={() => handleFieldChange('minExperience', exp === 'all' ? '' : exp)}
              className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                (exp === 'all' && !filters.minExperience) || filters.minExperience === exp
                  ? 'bg-navy-900 dark:bg-royal-600 text-white border-transparent'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {exp === 'all' ? 'Any' : `${exp}+ yr`}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
          <Star className="w-3.5 h-3.5" />
          Minimum Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Any', value: '' },
            { label: '★ 4.8+', value: '4.8' },
            { label: '★ 4.9+', value: '4.9' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleFieldChange('minRating', item.value)}
              className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                filters.minRating === item.value
                  ? 'bg-navy-900 dark:bg-royal-600 text-white border-transparent'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {isMobileDrawer && (
        <button
          onClick={onCloseMobile}
          className="w-full mt-4 py-3 rounded-xl bg-royal-600 text-white font-semibold text-sm"
        >
          View Results ({totalResults})
        </button>
      )}
    </div>
  );
};
