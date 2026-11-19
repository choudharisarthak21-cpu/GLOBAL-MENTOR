import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  RotateCcw,
  Star,
  CheckCircle2,
  Calendar,
  Globe,
  Bot,
  User,
  Info,
  ExternalLink,
  ChevronRight,
  Shield,
  X
} from 'lucide-react';
import { chatbotService, CONVERSATION_STEPS } from '../../services/chatbotService';

export const ChatInterface = ({ isInline = false, onClose = null }) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: "Hi! I'm your AI Mentor Assistant. Tell me what you want to learn, and I'll find the right mentor for you.",
      recommendedMentors: [],
      suggestedActions: [
        '🎓 Higher Education & Admissions',
        '⚖️ Legal Literacy & Guidance',
        '🌿 Wellbeing & Personal Growth'
      ],
      time: 'Just now'
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (customText = null) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatbotService.generateResponse(textToSend);

      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.reply,
        recommendedMentors: response.recommendedMentors || [],
        suggestedActions: response.suggestedActions || [],
        step: response.step,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "I encountered a minor issue finding the best mentors. Please try again or ask in different words!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    chatbotService.resetState();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Hi! I'm your AI Mentor Assistant. Tell me what you want to learn, and I'll find the right mentor for you.",
        recommendedMentors: [],
        suggestedActions: [
          '🎓 Higher Education & Admissions',
          '⚖️ Legal Literacy & Guidance',
          '🌿 Wellbeing & Personal Growth'
        ],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleMentorAction = (route) => {
    if (onClose) onClose();
    navigate(route);
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-slate-900 overflow-hidden font-sans ${isInline ? 'h-[620px] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl' : 'h-full w-full'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-royal-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-royal-500/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-royal-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-navy-950 animate-pulse" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2 leading-tight">
              <span>AI Mentor Assistant</span>
              <span className="text-[10px] bg-royal-500/40 text-royal-200 px-2 py-0.5 rounded-full font-semibold">
                Smart Matcher
              </span>
            </h3>
            <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Online • Tailored recommendations from verified faculty
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetChat}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close chat"
              aria-label="Close chat"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/70 dark:bg-slate-950/50 text-xs sm:text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-royal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4 text-gold-400" />
              </div>
            )}

            <div className={`max-w-[88%] sm:max-w-[82%] space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Message Bubble */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-royal-600 text-white rounded-tr-xs font-medium'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>

              {/* Top 3 Mentor Recommendation Cards */}
              {msg.recommendedMentors && msg.recommendedMentors.length > 0 && (
                <div className="space-y-3 pt-2 w-full">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-royal-600 dark:text-royal-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      Top {msg.recommendedMentors.length} Matching Mentors
                    </span>
                    <span className="text-[10px] bg-royal-100 dark:bg-royal-950/80 text-royal-700 dark:text-royal-300 px-2 py-0.5 rounded-full font-medium">
                      Ranked by Relevance
                    </span>
                  </div>

                  {msg.recommendedMentors.map((mentor, index) => (
                    <div
                      key={mentor.id}
                      className="bg-white dark:bg-slate-900 border border-royal-200/90 dark:border-royal-900/70 rounded-2xl p-4 shadow-md shadow-royal-600/5 hover:border-royal-500 hover:shadow-lg transition-all text-left relative overflow-hidden group"
                    >
                      {/* Match Rank Pill */}
                      <div className="absolute top-3 right-3 text-[10px] font-bold text-royal-600 dark:text-royal-300 bg-royal-50 dark:bg-royal-950/60 px-2.5 py-0.5 rounded-full border border-royal-200/60 dark:border-royal-800">
                        Match #{index + 1}
                      </div>

                      <div className="flex items-start gap-3.5 pr-14">
                        <div className="relative shrink-0">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-13 h-13 rounded-2xl object-cover ring-2 ring-royal-500/20 group-hover:ring-royal-500/40 transition-all shadow-xs"
                          />
                          {mentor.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-royal-600 text-white rounded-full p-0.5 shadow-xs" title="Verified Mentor">
                              <CheckCircle2 className="w-3.5 h-3.5 fill-royal-600 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-sm sm:text-base text-navy-950 dark:text-white flex items-center gap-1.5 truncate">
                            {mentor.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                            {mentor.title}
                          </p>

                          {/* Rating, Experience & Rate */}
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/40">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{mentor.rating.toFixed(1)}</span>
                              <span className="text-[10px] text-amber-600/80 font-normal">({mentor.reviewsCount})</span>
                            </div>

                            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              🎓 {mentor.experienceYears} yrs exp
                            </span>

                            <span className="font-bold text-royal-600 dark:text-royal-400 bg-royal-50 dark:bg-royal-950/60 px-2 py-0.5 rounded-md border border-royal-200/60 dark:border-royal-800 text-[11px]">
                              ${mentor.hourlyRate}/hr
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlighted Expertise / Skills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {mentor.skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        <span className="text-[10px] text-slate-400 ml-auto flex items-center gap-1 pt-0.5">
                          🌍 {mentor.country}
                        </span>
                      </div>

                      {/* Action Buttons: View Profile & Connect with Mentor */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => handleMentorAction(`/mentors/${mentor.id}`)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => handleMentorAction(`/booking/${mentor.id}`)}
                          className="px-4 py-1.5 rounded-xl bg-royal-600 hover:bg-royal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Connect with Mentor</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Suggestion Chips */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(action)}
                      className="text-[11px] text-left px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-royal-200/90 dark:border-royal-900/60 text-royal-700 dark:text-royal-300 hover:bg-royal-50 dark:hover:bg-royal-950/60 transition-all font-medium shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <span className="text-[10px] text-slate-400 block px-1">
                {msg.time}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-navy-900 dark:bg-royal-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-xl bg-royal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-gold-400" />
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-[11px] text-slate-400 ml-1.5">Analyzing requirements & ranking mentors...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your goals or answer (e.g. Oxford, Startup contracts, $70/hr)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500/40 border border-transparent focus:border-royal-500 transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-royal-600/20 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shrink-0"
            aria-label="Send message"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-royal-500 shrink-0" />
            Direct matching from 1,200+ verified mentors
          </span>
          <button
            onClick={() => handleMentorAction('/mentors')}
            className="text-royal-600 dark:text-royal-400 hover:underline font-semibold"
          >
            Explore Directory →
          </button>
        </div>
      </div>
    </div>
  );
};
