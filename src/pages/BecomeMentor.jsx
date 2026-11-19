import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Scale,
  HeartHandshake,
  DollarSign,
  FileCheck
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { DOMAINS } from '../data/mockData';
import { mentorService } from '../services/mentorService';

export const BecomeMentor = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    domain: 'education',
    currentRole: '',
    institution: '',
    experienceYears: '8',
    bio: '',
    skills: '',
    languages: 'English',
    hourlyRate: '85',
    availabilityDays: ['Mon', 'Thu'],
    uploadedFileName: null
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.country.trim()) {
        toast.error('Please complete all personal profile fields.');
        return;
      }
    } else if (step === 2) {
      if (!formData.currentRole.trim() || !formData.institution.trim()) {
        toast.error('Please specify your current role and institution.');
        return;
      }
    } else if (step === 3) {
      if (!formData.hourlyRate || Number(formData.hourlyRate) <= 0) {
        toast.error('Please enter a valid target hourly rate.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files[0]) {
      handleChange('uploadedFileName', files[0].name);
      toast.success(`Attached: ${files[0].name}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await mentorService.submitApplication(formData);
      setSubmitted(true);
      toast.success('Application submitted for review!');
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <Container size="md">
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl border-2 border-emerald-500/20">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-3xl font-extrabold text-navy-900 dark:text-white">
              Application Submitted Successfully!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              Thank you for applying to become a verified Global Mentor, {formData.fullName}. Our Faculty Review Board examines applications within <strong>3 to 5 business days</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-left max-w-md mx-auto space-y-2 border border-slate-200 dark:border-slate-800">
              <p><strong>Applicant:</strong> {formData.fullName} ({formData.email})</p>
              <p><strong>Primary Domain:</strong> <span className="capitalize">{formData.domain}</span></p>
              <p><strong>Document Verification:</strong> {formData.uploadedFileName || 'Standard Curriculum Vitae.pdf'}</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                Status: In Academic & Compliance Screening
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Link to="/">
                <Button variant="primary" size="md">
                  Return to Home
                </Button>
              </Link>
              <Link to="/mentors">
                <Button variant="outline" size="md">
                  View Mentor Directory
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const steps = [
    { num: 1, title: 'Profile & Domain' },
    { num: 2, title: 'Credentials' },
    { num: 3, title: 'Availability & Rate' },
    { num: 4, title: 'Documents' },
    { num: 5, title: 'Review & Submit' }
  ];

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="lg">
        <SectionHeading
          badge="Faculty Application"
          title="Become a Verified Global Mentor"
          subtitle="Join an elite international collective empowering ambitious minds across Education, Law, and Wellbeing."
          align="center"
        />

        {/* Wizard Progress Steps */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
            {steps.map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num
                      ? 'bg-royal-600 text-white shadow-md shadow-royal-600/30 ring-4 ring-white dark:ring-slate-950'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {s.num}
                </div>
                <span className="text-[10px] font-semibold text-slate-500 mt-1 hidden sm:block">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Form Container */}
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-xl">
          {/* STEP 1: Basic Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                Step 1: Personal Profile & Primary Domain
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Dr. Julian Reed"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Professional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="julian@institution.edu"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      placeholder="United Kingdom"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                {/* Domain Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Primary Mentoring Domain *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'education', label: 'Education & Admissions', icon: GraduationCap },
                      { id: 'legal', label: 'Legal Literacy', icon: Scale },
                      { id: 'counselling', label: 'Wellbeing Mentorship', icon: HeartHandshake }
                    ].map((d) => {
                      const Icon = d.icon;
                      const isSel = formData.domain === d.id;
                      return (
                        <div
                          key={d.id}
                          onClick={() => handleChange('domain', d.id)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${
                            isSel
                              ? 'border-royal-600 bg-royal-50/60 dark:bg-royal-950/40 text-royal-700 dark:text-royal-300'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-bold">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Credentials */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                Step 2: Professional Credentials & Experience
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Current Professional Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.currentRole}
                    onChange={(e) => handleChange('currentRole', e.target.value)}
                    placeholder="e.g. Senior Admissions Advisor or Partner"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Alma Mater / University / Affiliation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                    placeholder="University of Oxford, Harvard, or Supreme Court Bar"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Years of Relevant Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => handleChange('experienceYears', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    >
                      <option value="5">5-7 years</option>
                      <option value="8">8-11 years</option>
                      <option value="12">12-15 years</option>
                      <option value="16">16+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => handleChange('languages', e.target.value)}
                      placeholder="English, French, etc."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Core Specializations (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    placeholder="Oxbridge SOP, Interview Prep, Scholarship Strategy"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Rates & Availability */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                Step 3: Hourly Session Rate & Schedule
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    Target Hourly Session Rate (USD) *
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={formData.hourlyRate}
                    onChange={(e) => handleChange('hourlyRate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Average mentor rates on Global Mentor range between $65 and $120 per hour.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Available Days for Mentorship
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const isSel = formData.availabilityDays.includes(day);
                      return (
                        <button
                          type="button"
                          key={day}
                          onClick={() => {
                            const nextDays = isSel
                              ? formData.availabilityDays.filter((d) => d !== day)
                              : [...formData.availabilityDays, day];
                            handleChange('availabilityDays', nextDays);
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            isSel
                              ? 'bg-royal-600 text-white border-royal-600'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Short Bio & Mentorship Philosophy
                  </label>
                  <textarea
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Summarize your mentoring approach and how you guide students or founders..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Verification Documents Upload */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                Step 4: Academic or Professional Verification
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed">
                To maintain our 100% verified faculty standard, please attach your academic degree transcript, professional bar registration, or comprehensive CV.
              </p>

              {/* Drag & Drop Simulation */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-900/60 space-y-3 cursor-pointer hover:border-royal-500 transition-colors relative"
              >
                <input
                  type="file"
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-2xl bg-royal-100 dark:bg-royal-950 text-royal-600 dark:text-royal-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900 dark:text-white">
                    {formData.uploadedFileName ? (
                      <span className="text-emerald-600 flex items-center justify-center gap-1">
                        <FileCheck className="w-4 h-4" />
                        {formData.uploadedFileName}
                      </span>
                    ) : (
                      'Click to upload or drag & drop files here'
                    )}
                  </p>
                  <span className="text-[11px] text-slate-400">
                    PDF, DOCX, or PNG up to 25MB
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                Step 5: Review & Submit Application
              </h2>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 space-y-3 text-xs border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-bold text-navy-900 dark:text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                  <span className="text-slate-400">Domain:</span>
                  <span className="font-bold capitalize text-royal-600">{formData.domain}</span>
                </div>
                <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                  <span className="text-slate-400">Role & Institution:</span>
                  <span className="font-bold text-navy-900 dark:text-white">
                    {formData.currentRole} at {formData.institution}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                  <span className="text-slate-400">Hourly Rate:</span>
                  <span className="font-bold text-navy-900 dark:text-white">${formData.hourlyRate}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Document:</span>
                  <span className="font-bold text-emerald-600">
                    {formData.uploadedFileName || 'Curriculum Vitae Attached'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs text-blue-900 dark:text-blue-300">
                By submitting, you agree to adhere to Global Mentor's ethics charter, respect informational scope boundaries, and maintain confidentiality.
              </div>
            </div>
          )}

          {/* Form Actions (Back / Next / Submit) */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <Button variant="ghost" size="md" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Back</span>
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button variant="primary" size="md" onClick={handleNext}>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                loading={submitting}
                onClick={handleSubmit}
              >
                <span>Submit Faculty Application</span>
                <CheckCircle2 className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
