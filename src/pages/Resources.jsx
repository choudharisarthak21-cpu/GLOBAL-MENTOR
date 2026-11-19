import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Clock,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Scale,
  HeartHandshake,
  CheckCircle,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { Badge } from '../components/common/Badge';
import { RESOURCES } from '../data/mockData';
import { mentorService } from '../services/mentorService';

export const Resources = () => {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeResource, setActiveResource] = useState(null);

  useEffect(() => {
    setLoading(true);
    mentorService
      .getResources(category, search)
      .then((data) => setResources(data))
      .finally(() => setLoading(false));
  }, [category, search]);

  const handleDownload = (res) => {
    toast.success(`Downloaded: ${res.title}.pdf`);
  };

  const categories = [
    { id: 'all', label: 'All Frameworks' },
    { id: 'education', label: 'Higher Education' },
    { id: 'legal', label: 'Legal Literacy' },
    { id: 'counselling', label: 'Wellbeing Workbooks' }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Faculty Knowledge Base"
          title="Curated Frameworks & Guides"
          subtitle="Field-tested Statement of Purpose structures, startup term sheet explanations, and psychological wellbeing protocols."
          align="center"
        />

        {/* Search & Category Pills */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides by keyword, topic, or mentor author..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-navy-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  category === c.id
                    ? 'bg-royal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {resources.length === 0 ? (
          <EmptyState
            title="No resources found"
            description="No guides matched your current search query. Try broadening your terms or reset the category filter."
            actionLabel="Reset Search"
            onAction={() => {
              setSearch('');
              setCategory('all');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="font-bold text-royal-600 dark:text-royal-400 uppercase tracking-wider text-[10px]">
                      {res.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {res.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-navy-900 dark:text-white mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400">
                    <span>By {res.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(res)}
                      className="p-2 rounded-xl text-slate-400 hover:text-royal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveResource(res)}
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Guide Detail Modal */}
      {activeResource && (
        <Modal
          isOpen={!!activeResource}
          onClose={() => setActiveResource(null)}
          title={activeResource.title}
          subtitle={`Authored by ${activeResource.author} • Updated ${activeResource.updatedAt}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="capitalize font-semibold text-royal-600">
                Domain: {activeResource.domain}
              </span>
              <span>•</span>
              <span>{activeResource.readTime}</span>
              <span>•</span>
              <span>{activeResource.downloads} Downloads</span>
            </div>

            <div className="prose dark:prose-invert text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              {activeResource.content}
            </div>

            <div className="p-4 rounded-2xl bg-royal-50 dark:bg-royal-950/40 border border-royal-200 text-xs text-royal-900 dark:text-royal-200 flex items-center justify-between">
              <div>
                <strong>Want personalized critique on this framework?</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Book a direct 1-on-1 strategy session with {activeResource.author}.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setActiveResource(null);
                  window.location.assign('/mentors');
                }}
              >
                Find Mentor
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(activeResource)}
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Save Offline PDF</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveResource(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
