import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Clock,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { mentorService } from '../services/mentorService';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'admissions',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await mentorService.sendContactMessage(formData);
      setSubmittedTicket(res.referenceId);
      toast.success('Inquiry received! Reference #' + res.referenceId);
    } catch {
      toast.error('Could not submit message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container size="xl">
        <SectionHeading
          badge="Global Helpdesk"
          title="Connect with Our Support Desk"
          subtitle="Have a question about scheduling, faculty vetting, or institutional partnerships? We are here to assist."
          align="center"
        />

        {/* Global Urgent Crisis Disclaimer */}
        <div className="mb-12 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Emergency Crisis Support Notice</span>
          </div>
          <p className="leading-relaxed">
            Global Mentor is an educational and supportive mentorship service. We do not provide emergency clinical intervention or acute crisis response. If you or someone you know is in immediate distress or danger, please contact local emergency authorities or call national hotlines immediately:
          </p>
          <div className="pt-1 flex flex-wrap gap-4 font-semibold text-navy-900 dark:text-white">
            <span>🇺🇸/🇨🇦 USA & Canada: Dial 988</span>
            <span>🇬🇧 United Kingdom: Dial 111 / 999</span>
            <span>🇪🇺 European Union: Dial 112</span>
            <span>🇮🇳 India: Dial 112 / 14416 (Tele-MANAS)</span>
            <span>🇦🇺 Australia: Dial 13 11 14 (Lifeline)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
            {submittedTicket ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Your inquiry has been assigned support reference <strong>#{submittedTicket}</strong>. Our faculty concierge desk responds within 12 business hours.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmittedTicket(null);
                      setFormData({
                        name: '',
                        email: '',
                        category: 'admissions',
                        subject: '',
                        message: ''
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Inquiry Domain Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  >
                    <option value="admissions">Higher Education / Admissions</option>
                    <option value="legal">Legal Literacy Inquiry</option>
                    <option value="counselling">Wellbeing & Coaching Question</option>
                    <option value="mentor-application">Faculty & Mentor Application</option>
                    <option value="partnership">University / Corporate Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our global advisory team help you today?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={submitting}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Send Message to Faculty Desk</span>
                </Button>
              </form>
            )}
          </div>

          {/* Info & Global Map Placeholder Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Global Offices */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-base text-navy-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-royal-600" />
                <span>Global Operational Nodes</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-900 dark:text-white">London Hub:</strong>
                    <p className="text-slate-500">100 Cheapside, City of London, EC2V 6DT, UK</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-900 dark:text-white">San Francisco Hub:</strong>
                    <p className="text-slate-500">500 Howard Street, San Francisco, CA 94105, USA</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-royal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-navy-900 dark:text-white">Singapore Hub:</strong>
                    <p className="text-slate-500">1 Raffles Place, #20-01 One Raffles, Singapore</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-royal-600" />
                  <span>concierge@globalmentor.example</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-royal-600" />
                  <span>24/7 International Dispatch Support</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="glass-card rounded-3xl p-6 text-center space-y-3 bg-gradient-to-br from-royal-950 via-navy-950 to-slate-950 text-white overflow-hidden relative border border-royal-900/60">
              <div className="relative z-10 space-y-2 py-4">
                <div className="w-10 h-10 rounded-xl bg-royal-600 text-white flex items-center justify-center mx-auto">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">International Routing Grid</h4>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Connected across 120+ territories with zero latency scheduling and encrypted video channels.
                </p>
                <div className="pt-2 flex justify-center gap-4 text-[10px] text-royal-400 font-mono">
                  <span>LAT 51.5074° N</span>
                  <span>LNG 0.1278° W</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
