import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { DEMO_USER } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gm_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gm_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_wishlist');
      return saved ? JSON.parse(saved) : ['m1', 'm3'];
    } catch {
      return ['m1', 'm3'];
    }
  });

  useEffect(() => {
    localStorage.setItem('gm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (mentorId, mentorName = 'Mentor') => {
    setWishlist((prev) => {
      const exists = prev.includes(mentorId);
      if (exists) {
        toast(`${mentorName} removed from saved mentors`, { icon: '🤍' });
        return prev.filter((id) => id !== mentorId);
      } else {
        toast.success(`${mentorName} added to saved mentors!`, {
          icon: '❤️',
          style: { borderRadius: '12px', background: '#0B1F52', color: '#fff' }
        });
        return [...prev, mentorId];
      }
    });
  };

  const isInWishlist = (mentorId) => wishlist.includes(mentorId);

  // Authenticated user demo state
  const [user, setUser] = useState(DEMO_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const loginDemo = (role = 'student') => {
    let customUser = { ...DEMO_USER };
    if (role === 'mentor') {
      customUser = {
        ...DEMO_USER,
        name: 'Dr. Evelyn Reed',
        role: 'Verified Mentor — Higher Education & Research',
        email: 'evelyn.reed@globalmentor.example'
      };
    } else if (role === 'professional') {
      customUser = {
        ...DEMO_USER,
        name: 'Julian Vance',
        role: 'Senior Tech Strategist & Mentee',
        email: 'julian.v@example.com'
      };
    }
    setUser(customUser);
    setIsAuthenticated(true);
    toast.success(`Logged in as ${customUser.name} (${role.toUpperCase()})`);
  };

  const logoutDemo = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast('Logged out of demo session');
  };

  // User bookings state
  const [bookings, setBookings] = useState(DEMO_USER.upcomingBookings);

  const addBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'Upcoming Session Tomorrow',
      message: 'Your 1-on-1 strategy call with Dr. Alistair Vance is scheduled for tomorrow at 3:00 PM.',
      time: '2 hours ago',
      read: false,
      type: 'session'
    },
    {
      id: 'n-2',
      title: 'New Guide Released',
      message: 'Check out the updated 2026 Ivy League & Oxbridge Statement of Purpose Framework.',
      time: '1 day ago',
      read: false,
      type: 'resource'
    },
    {
      id: 'n-3',
      title: 'Profile Verified',
      message: 'Your academic background credentials have been verified with 100% integrity score.',
      time: '3 days ago',
      read: true,
      type: 'account'
    }
  ]);

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  // Chatbot State
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotInitialPrompt, setChatbotInitialPrompt] = useState(null);

  const openChatbot = (initialPrompt = null) => {
    if (initialPrompt) {
      setChatbotInitialPrompt(initialPrompt);
    }
    setIsChatbotOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        isAuthenticated,
        loginDemo,
        logoutDemo,
        bookings,
        addBooking,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isChatbotOpen,
        setIsChatbotOpen,
        openChatbot,
        chatbotInitialPrompt,
        setChatbotInitialPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
