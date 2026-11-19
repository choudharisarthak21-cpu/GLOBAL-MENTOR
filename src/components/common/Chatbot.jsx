import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatInterface } from './ChatInterface';

export const Chatbot = () => {
  const {
    isChatbotOpen: isOpen,
    setIsChatbotOpen: setIsOpen,
    chatbotInitialPrompt,
    setChatbotInitialPrompt
  } = useApp();

  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-dismiss tooltip after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  // When chatbot is opened, hide the launcher tooltip
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Launcher Trigger */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col">
        {/* Friendly Greeting Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="mb-3 max-w-xs bg-navy-950 text-white p-3.5 rounded-2xl shadow-2xl border border-royal-500/30 flex items-start gap-3 cursor-pointer group hover:scale-[1.02] transition-transform"
            >
              <div className="p-2 rounded-xl bg-royal-600 text-gold-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>Need mentor guidance?</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(false);
                    }}
                    className="text-slate-400 hover:text-white p-0.5"
                    aria-label="Dismiss tooltip"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  Chat with our AI Mentor Assistant to get matched with the right expert!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Launcher Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close chat' : 'Open AI mentor recommendation chatbot'}
          className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-navy-900 via-royal-700 to-royal-600 text-white shadow-2xl shadow-royal-600/40 hover:shadow-royal-600/60 transition-all flex items-center justify-center border border-white/20 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <div className="relative">
                <Bot className="w-6 h-6 text-gold-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-navy-900 animate-pulse" />
              </div>
              <span className="hidden sm:inline-block ml-2 text-xs font-bold tracking-wide">
                AI Mentor Assistant
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] md:w-[480px] h-[640px] max-h-[82vh] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <ChatInterface isInline={false} onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
