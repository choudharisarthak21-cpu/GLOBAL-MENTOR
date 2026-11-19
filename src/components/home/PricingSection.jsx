import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { PRICING_PLANS } from '../../data/mockData';
import { Badge } from '../common/Badge';

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-white dark:bg-slate-900/60 relative overflow-hidden">
      <Container size="xl">
        <SectionHeading
          badge="Transparent Plans"
          title="Flexible Mentorship Access"
          subtitle="Choose pay-per-session flexibility or unlock priority booking with our Pro membership."
          align="center"
        />

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={`text-sm font-semibold cursor-pointer ${
              !isAnnual ? 'text-navy-900 dark:text-white' : 'text-slate-400'
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly Billing
          </span>

          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 flex items-center bg-royal-600 rounded-full p-1 cursor-pointer transition-colors focus:outline-none"
            aria-label="Toggle annual pricing"
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>

          <span
            className={`text-sm font-semibold cursor-pointer flex items-center gap-1.5 ${
              isAnnual ? 'text-navy-900 dark:text-white' : 'text-slate-400'
            }`}
            onClick={() => setIsAnnual(true)}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-navy-900 text-white shadow-2xl ring-2 ring-royal-500 scale-105 z-10'
                    : 'glass-card text-slate-800 dark:text-slate-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-royal-600 to-indigo-600 text-white text-[11px] font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`text-xl font-bold ${
                        plan.popular ? 'text-white' : 'text-navy-900 dark:text-white'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    {!plan.popular && (
                      <Badge variant="default" size="sm">
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  <p
                    className={`text-xs mb-6 ${
                      plan.popular ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-extrabold font-heading ${
                        plan.popular ? 'text-white' : 'text-navy-900 dark:text-white'
                      }`}
                    >
                      ${price}
                    </span>
                    <span
                      className={`text-xs ${
                        plan.popular ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      / month {isAnnual && price > 0 && '(billed yearly)'}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        plan.popular ? 'text-royal-300' : 'text-slate-400'
                      }`}
                    >
                      Included Features:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? 'text-gold-400' : 'text-royal-600 dark:text-royal-400'
                          }`}
                        />
                        <span
                          className={
                            plan.popular ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                          }
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={plan.monthlyPrice === 0 ? '/mentors' : '/signup'}
                  className={`w-full py-3.5 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-royal-500 hover:bg-royal-600 text-white shadow-lg shadow-royal-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-navy-900 dark:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
