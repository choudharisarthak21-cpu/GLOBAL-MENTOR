import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe2,
  Users,
  Compass,
  CheckCircle,
  BookOpen,
  HelpCircle,
  GraduationCap,
  Scale,
  HeartHandshake
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { HeroGlobe } from '../components/home/HeroGlobe';
import { DomainCard } from '../components/home/DomainCard';
import { HowItWorks } from '../components/home/HowItWorks';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialSlider } from '../components/home/TestimonialSlider';
import { PricingSection } from '../components/home/PricingSection';
import { TrustStrip } from '../components/home/TrustStrip';
import { HomeChatbotSection } from '../components/home/HomeChatbotSection';
import { Accordion } from '../components/common/Accordion';
import { MentorCard } from '../components/mentors/MentorCard';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { DOMAINS, FAQS, RESOURCES } from '../data/mockData';
import { mentorService } from '../services/mentorService';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const { openChatbot } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredMentors, setFeaturedMentors] = useState([]);
  const [selectedDomainTab, setSelectedDomainTab] = useState('all');
  const [aboutTab, setAboutTab] = useState('mission');
  const navigate = useNavigate();

  useEffect(() => {
    mentorService.getMentors().then((data) => {
      setFeaturedMentors(data.slice(0, 6));
    });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/mentors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/mentors');
    }
  };

  const filteredPreviewMentors =
    selectedDomainTab === 'all'
      ? featuredMentors
      : featuredMentors.filter((m) => m.domain === selectedDomainTab);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] hero-glow-blob pointer-events-none rounded-full" />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-50 dark:bg-royal-950/80 border border-royal-200/80 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>World-Class Mentorship Across 120+ Countries</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 dark:text-white tracking-tight leading-[1.15]">
                Bridge the Gap to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 via-royal-500 to-indigo-600">
                  Global Excellence.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Direct 1-on-1 guidance from Oxford scholars, FAANG engineering leaders, international legal experts, and somatic wellbeing mentors. Master admissions, rights, and inner resilience.
              </p>

              {/* Quick Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="pt-2 max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2.5 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-navy-900/5 border border-slate-200 dark:border-slate-800"
              >
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic (e.g. Oxford, Term Sheets, Burnout)..."
                    className="w-full px-3 py-2.5 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  <span>Find Mentors</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Quick AI Advisor CTA */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('ai-mentor-assistant');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      openChatbot();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-royal-600 via-royal-500 to-indigo-600 hover:from-royal-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-royal-600/25 hover:shadow-royal-600/40 transition-all cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-12 transition-transform" />
                  <span>Chat with AI Mentor Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">or browse popular tags:</span>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { name: 'Ivy League SOP', domain: 'education' },
                  { name: 'Startup Term Sheets', domain: 'legal' },
                  { name: 'Burnout Recovery', domain: 'counselling' },
                  { name: 'Chevening Grants', domain: 'education' }
                ].map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/mentors?search=${encodeURIComponent(tag.name)}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-royal-50 dark:hover:bg-royal-950/60 hover:text-royal-600 dark:hover:text-royal-300 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>

              {/* Trust badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">100% Verified Credentials</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-royal-500" />
                  <span className="font-medium">Direct Video & Async Audio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gold-500" />
                  <span className="font-medium">54,000+ Guidance Hours</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Holographic Orb / Globe */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroGlobe />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Animated Stats */}
      <StatsSection />

      {/* 4. Three Core Domains */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <Container size="xl">
          <SectionHeading
            badge="Three Pillars"
            title="Comprehensive Mentorship Across Core Domains"
            subtitle="Specialized guidance tailored to each pivotal area of personal and professional elevation."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DOMAINS.map((domain) => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </div>

          {/* Compliance & Scope disclaimer banner */}
          <DisclaimerBanner />
        </Container>
      </section>

      {/* 4.5. AI Mentor Assistant Section */}
      <HomeChatbotSection />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Mission, Vision & About Platform */}
      <section className="py-20 bg-white dark:bg-slate-900 relative">
        <Container size="xl">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              badge="Our Purpose"
              title="Global Guidance Without Geographic Barriers"
              subtitle="Why Global Mentor was founded and our commitment to equitable access."
              align="center"
            />

            {/* Tabs */}
            <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 mb-8">
              {[
                { id: 'mission', label: 'Our Mission' },
                { id: 'vision', label: 'Global Vision' },
                { id: 'ethics', label: 'Ethical Standards' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAboutTab(tab.id)}
                  className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
                    aboutTab === tab.id
                      ? 'border-royal-600 text-royal-600 dark:text-royal-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="glass-card rounded-3xl p-8 sm:p-10">
              {aboutTab === 'mission' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                    Democratizing Elite Insight & Life Navigation
                  </h3>
                  <p>
                    Throughout history, access to top-tier university advisors, knowledgeable commercial counsel, and empathetic life mentors has been restricted to the wealthy elite. Global Mentor tears down geographic and economic silos by enabling anyone anywhere to connect with verified master practitioners for focused, affordable 1-on-1 strategy sessions.
                  </p>
                  <p>
                    Whether you are an aspiring student in Nairobi drafting an Oxford scholarship essay, a tech founder in Berlin reviewing your first term sheet, or a remote worker in Tokyo coping with severe burnout—world-class guidance is now one click away.
                  </p>
                </div>
              )}

              {aboutTab === 'vision' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                    A Borderless Human Knowledge Exchange
                  </h3>
                  <p>
                    By 2030, our goal is to empower 1,000,000 mentees across 180 countries. We believe authentic human connection, lived experience, and nuanced cultural understanding transcend algorithmic approximations. Our platform champions human empathy, rigorous scholarship, and actionable empowerment.
                  </p>
                  <p>
                    Every mentor is verified not just for their resume, but for their genuine passion to lift others as they climb.
                  </p>
                </div>
              )}

              {aboutTab === 'ethics' && (
                <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                    Uncompromising Ethical Boundaries & Safety
                  </h3>
                  <p>
                    We maintain strict boundaries regarding legal and psychological support. We never claim AI substitutes for qualified attorneys or emergency medical personnel. Our legal sessions focus on informational literacy; our counselling sessions provide peer wellbeing mentorship and life coaching, never clinical crisis intervention.
                  </p>
                  <p>
                    We protect user privacy, never sell mentee data, and uphold zero tolerance for predatory behavior.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Mentor Discovery Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              badge="Verified Mentors"
              title="Meet Featured Global Advisors"
              subtitle="Browse top-rated practitioners ready to partner with you on your next breakthrough."
              align="left"
              className="mb-0"
            />

            {/* Domain Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Domains' },
                { id: 'education', label: 'Education' },
                { id: 'legal', label: 'Legal Literacy' },
                { id: 'counselling', label: 'Counselling' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDomainTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedDomainTab === tab.id
                      ? 'bg-navy-900 dark:bg-royal-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPreviewMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link to="/mentors">
              <Button variant="secondary" size="lg">
                <span>View All 1,200+ Mentors</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 8. Testimonials */}
      <TestimonialSlider />

      {/* 9. Pricing */}
      <PricingSection />

      {/* 10. Curated Resources Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              badge="Knowledge Base"
              title="Curated Frameworks & Guides"
              subtitle="Deep-dive frameworks authored by our master mentors to accelerate your progress."
              align="left"
              className="mb-0"
            />
            <Link to="/resources">
              <Button variant="outline" size="sm">
                <span>Explore All Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.slice(0, 3).map((res) => (
              <div
                key={res.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-royal-600 dark:text-royal-400 uppercase tracking-wider text-[10px]">
                      {res.category}
                    </span>
                    <span>{res.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-navy-900 dark:text-white mb-2 line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {res.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">By {res.author}</span>
                  <Link
                    to="/resources"
                    className="text-xs font-bold text-royal-600 dark:text-royal-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 11. CTA for Mentors */}
      <section className="py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-royal-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-royal-600/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/60 border border-gold-800/60 px-3.5 py-1 rounded-full">
                For Established Experts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Share Your Expertise. Shape Global Futures.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Join an elite collective of university tutors, legal counsels, and wellbeing practitioners. Set your own rates, control your calendar, and guide ambitious minds worldwide.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/become-a-mentor">
                  <Button variant="gold" size="lg">
                    <span>Apply as a Global Mentor</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="text-white border-slate-700 hover:bg-slate-800">
                    <span>Ask Our Faculty Team</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xs space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle className="w-4 h-4 text-gold-400" />
                  <span>Why Mentors Love Us</span>
                </div>
                <p className="text-slate-300">
                  ✓ 100% calendar autonomy & custom session rates
                </p>
                <p className="text-slate-300">
                  ✓ High-intent international students & founders
                </p>
                <p className="text-slate-300">
                  ✓ Zero administrative hassle & guaranteed payouts
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 12. FAQ Accordion */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <Container size="md">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about bookings, credentials, and platform boundaries."
            align="center"
          />

          <Accordion items={FAQS} />

          <div className="mt-12 text-center text-xs text-slate-500">
            Have a question not listed here?{' '}
            <Link to="/contact" className="font-semibold text-royal-600 hover:underline">
              Contact our global support desk
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};
