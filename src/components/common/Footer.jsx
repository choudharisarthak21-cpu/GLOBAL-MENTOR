import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Heart, ShieldAlert, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from './Container';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Subscribed to Global Mentor Monthly Dispatch!');
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <Container size="xl">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-royal-600 flex items-center justify-center text-white shadow-md shadow-royal-600/30">
                <Compass className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Global<span className="text-royal-400">Mentor</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering learners, professionals, and founders worldwide with direct access to elite mentors across Higher Education, Legal Literacy, and Wellbeing Counselling.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Join 45,000+ Global Dispatches
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to our monthly guidance digest.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-white text-xs font-semibold shrink-0 transition-colors flex items-center gap-1"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column: Core Domains */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Core Domains
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/mentors?domain=education" className="hover:text-white transition-colors">
                  Higher Education & Admissions
                </Link>
              </li>
              <li>
                <Link to="/mentors?domain=education" className="hover:text-white transition-colors">
                  International Scholarships
                </Link>
              </li>
              <li>
                <Link to="/mentors?domain=legal" className="hover:text-white transition-colors">
                  Startup & Commercial Law
                </Link>
              </li>
              <li>
                <Link to="/mentors?domain=legal" className="hover:text-white transition-colors">
                  Cybercrime & Digital Rights
                </Link>
              </li>
              <li>
                <Link to="/mentors?domain=counselling" className="hover:text-white transition-colors">
                  Burnout & Somatic Health
                </Link>
              </li>
              <li>
                <Link to="/mentors?domain=counselling" className="hover:text-white transition-colors">
                  Cross-Border Relocation Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Platform & Community */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/mentors" className="hover:text-white transition-colors">
                  All Mentors Directory
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resource Library & Guides
                </Link>
              </li>
              <li>
                <Link to="/become-a-mentor" className="hover:text-white transition-colors">
                  Apply as a Mentor
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Mentee Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Help & Contact Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Trust & Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Global Presence
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>London, United Kingdom</li>
              <li>San Francisco, United States</li>
              <li>Singapore, Asia-Pacific</li>
              <li>Berlin, European Union</li>
              <li>Toronto, Canada</li>
              <li className="pt-2 text-[11px] text-gold-400 font-semibold flex items-center gap-1">
                <span>Active across 120+ countries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Essential Compliance & Disclaimers Box */}
        <div className="my-8 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-start gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Platform Disclaimer & Non-Emergency Protocol</span>
          </div>
          <p className="leading-relaxed">
            <strong>Legal Guidance:</strong> All legal discussions on Global Mentor are strictly for educational literacy and informational purposes. They do not constitute formal legal representation, legal advice, or create an attorney-client relationship. Consult a licensed attorney in your local jurisdiction for binding counsel.
          </p>
          <p className="leading-relaxed">
            <strong>Wellbeing Counselling:</strong> Mentorship conversations provide supportive life and wellbeing guidance. They are not emergency psychiatric care or a substitute for licensed mental health therapy. In an emergency crisis, immediately contact your local emergency services (e.g., 988 in the US/Canada, 111 in the UK, 112 in the EU).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Global Mentor Inc. All rights reserved. Built for world-class human mentorship.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/resources" className="hover:text-slate-300 transition-colors">
              Terms of Guidance
            </Link>
            <Link to="/resources" className="hover:text-slate-300 transition-colors">
              Privacy Standard
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
