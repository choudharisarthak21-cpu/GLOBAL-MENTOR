import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Shield, Target, Compass, Award } from 'lucide-react';
import { Container } from '../common/Container';
import { ChatInterface } from '../common/ChatInterface';

export const HomeChatbotSection = () => {
  return (
    <section id="ai-mentor-assistant" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden border-y border-slate-200/80 dark:border-slate-800/80">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-royal-500/10 dark:bg-royal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 dark:bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-50 dark:bg-royal-950/80 border border-royal-200/80 dark:border-royal-800 text-royal-700 dark:text-royal-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>AI-Powered Mentor Matching</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
              Get Matched with Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 to-indigo-600">Perfect Mentor.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Not sure where to begin? Our interactive AI Mentor Assistant analyzes your goals, preferred experience level, specific technologies, and budget to recommend the top 3 verified faculty members in real time.
            </p>

            {/* Benefit Points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">Conversational Profiling</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Understands your exact learning goals, career roadmap, or legal/wellbeing guidance needs step by step.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">Ranked Top 3 Recommendations</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Evaluates skill fit, reviews, and mentor track records, displaying detailed profile previews and 1-click booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy-900 dark:text-white">100% Vetted Faculty</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Every mentor is verified across academic credentials, commercial bar admissions, or clinical coaching credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Embedded AI Chatbot UI */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Outer decorative gradient frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-royal-600 via-indigo-600 to-gold-500 rounded-3xl opacity-20 blur-lg" />
              <div className="relative">
                <ChatInterface isInline={true} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
