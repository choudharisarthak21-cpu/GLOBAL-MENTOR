// Global Mentor Service Layer
// NOTE FOR BACKEND INTEGRATION:
// Replace simulated promises with real Axios / Fetch calls to your backend API endpoints
// (e.g. GET /api/v1/mentors, POST /api/v1/bookings, POST /api/v1/applications)

import { MENTORS, DOMAINS, RESOURCES, DEMO_USER, FAQS, PRICING_PLANS } from '../data/mockData';

// Simulated network delay helper
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const mentorService = {
  // Fetch all mentors with optional filter parameters
  async getMentors(filters = {}) {
    await delay(200);
    let list = [...MENTORS];

    if (filters.domain && filters.domain !== 'all') {
      list = list.filter((m) => m.domain === filters.domain);
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.title.toLowerCase().includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q)) ||
          m.country.toLowerCase().includes(q)
      );
    }

    if (filters.country && filters.country !== 'all') {
      list = list.filter((m) => m.country === filters.country);
    }

    if (filters.language && filters.language !== 'all') {
      list = list.filter((m) => m.languages.includes(filters.language));
    }

    if (filters.maxPrice) {
      list = list.filter((m) => m.hourlyRate <= Number(filters.maxPrice));
    }

    if (filters.minRating) {
      list = list.filter((m) => m.rating >= Number(filters.minRating));
    }

    if (filters.minExperience) {
      list = list.filter((m) => m.experienceYears >= Number(filters.minExperience));
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating-desc':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'price-asc':
          list.sort((a, b) => a.hourlyRate - b.hourlyRate);
          break;
        case 'price-desc':
          list.sort((a, b) => b.hourlyRate - a.hourlyRate);
          break;
        case 'exp-desc':
          list.sort((a, b) => b.experienceYears - a.experienceYears);
          break;
        case 'reviews-desc':
          list.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
        default:
          // featured / recommended
          list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    return list;
  },

  // Fetch mentor by ID
  async getMentorById(id) {
    await delay(180);
    const mentor = MENTORS.find((m) => m.id === id);
    if (!mentor) {
      throw new Error(`Mentor with id ${id} not found.`);
    }
    return mentor;
  },

  // Book a mentorship session
  // Backend integration point: POST /api/v1/bookings
  async createBooking(bookingData) {
    await delay(400);
    const newBooking = {
      id: `bk-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    return newBooking;
  },

  // Submit mentor application
  // Backend integration point: POST /api/v1/mentor-applications
  async submitApplication(applicationData) {
    await delay(500);
    return {
      success: true,
      applicationId: `app-${Date.now()}`,
      message: 'Application received successfully. Review takes 3-5 business days.',
      submittedAt: new Date().toISOString()
    };
  },

  // Fetch educational resources
  async getResources(category = 'all', searchQuery = '') {
    await delay(150);
    let list = [...RESOURCES];
    if (category && category !== 'all') {
      list = list.filter((r) => r.category === category);
    }
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  },

  // Submit contact message
  // Backend integration point: POST /api/v1/contact
  async sendContactMessage(formData) {
    await delay(350);
    return {
      success: true,
      referenceId: `msg-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: new Date().toISOString()
    };
  }
};
