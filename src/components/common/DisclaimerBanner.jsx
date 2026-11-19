import React from 'react';
import { AlertCircle, Scale, HeartHandshake, Info } from 'lucide-react';

export const DisclaimerBanner = ({ domain = 'all', compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Important Scope Notice:</strong> Mentorship on Global Mentor provides informational, educational, and supportive life guidance. Legal mentorship does not constitute an attorney-client relationship. Counselling is non-clinical and not emergency care.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-navy-950/60 border-y border-slate-200 dark:border-slate-800 py-6 my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Legal Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-300 block">
              Legal Guidance Disclosure
            </span>
            <p>
              Informational and educational guidance only. Sessions do not constitute formal legal representation, legal advice, or establish an attorney-client relationship. Always consult a licensed lawyer in your jurisdiction for disputes or court filings.
            </p>
          </div>
        </div>

        {/* Counselling Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
              Wellbeing & Counselling Disclosure
            </span>
            <p>
              Supportive peer and life mentorship only. This is not emergency care or licensed clinical psychiatry. In an acute mental health crisis, immediately dial local emergency hotlines (e.g. 988 US/CA, 111 UK, or 112 EU).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
