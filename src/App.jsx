import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { BackToTop } from './components/common/BackToTop';
import { Chatbot } from './components/common/Chatbot';

// Pages
import { Home } from './pages/Home';
import { Mentors } from './pages/Mentors';
import { MentorProfile } from './pages/MentorProfile';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard';
import { BecomeMentor } from './pages/BecomeMentor';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';
import { Auth } from './pages/Auth';
import { NotFound } from './pages/NotFound';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
          {/* Global Header */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentors/:id" element={<MentorProfile />} />
              <Route path="/booking/:mentorId" element={<Booking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/become-a-mentor" element={<BecomeMentor />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Auth initialMode="login" />} />
              <Route path="/signup" element={<Auth initialMode="signup" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating Utilities & AI Advisor Chatbot */}
          <BackToTop />
          <Chatbot />

          {/* Toast Notification Provider */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: '14px',
                background: '#0B1F52',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(11, 31, 82, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              },
              success: {
                iconTheme: {
                  primary: '#2563EB',
                  secondary: '#fff'
                }
              }
            }}
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
