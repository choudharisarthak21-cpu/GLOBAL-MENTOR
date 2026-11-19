# Global Mentor — World-Class Human Mentorship Platform

A production-style, accessible SaaS frontend connecting learners, founders, and professionals with elite global mentors across three pivotal domains:

1. **Education & Admissions**: Oxford, Cambridge, and Ivy League preparatory guidance, full-ride international scholarships (Chevening, Rhodes, Fulbright), PhD research proposals, and FAANG tech interview preparation.
2. **Legal Literacy & Compliance**: Startup term sheets, liquidation preferences, GDPR privacy regulations, cybercrime reporting protocols, and IP protection. *(Clearly delineated as informational literacy, not formal legal representation or attorney-client relationship).*
3. **Wellbeing & Somatic Mentorship**: Burnout recovery, high-performance nervous system regulation, expat relocation shock, and work-life boundaries. *(Clearly delineated as non-clinical peer coaching and not emergency crisis care).*

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS 3 (Custom design system palette: Navy `#0B1F52`, Royal Blue `#2563EB`, Gold `#F59E0B`, Soft Slate)
- **Routing**: React Router 6 with scroll-to-top Restoration
- **Animation**: Framer Motion 11 (`prefers-reduced-motion` compliant)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Typography**: Poppins & Manrope for display headings; Inter for readable body text

---

## 📁 Project Architecture

```
global-mentor/
├── index.html                  # HTML entry with Poppins & Inter Google Fonts
├── vite.config.js              # Vite config with manual chunk optimization
├── tailwind.config.js          # Design system color tokens & glass surfaces
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies and scripts
└── src/
    ├── main.jsx                # Application bootstrap
    ├── App.jsx                 # Routes, AppProvider, Toaster, Layout
    ├── index.css               # Glassmorphism utilities & accessibility styles
    ├── context/
    │   └── AppContext.jsx      # Theme, Wishlist (localStorage), Demo Auth & Bookings
    ├── data/
    │   └── mockData.js         # Single unified mock data module
    ├── services/
    │   └── mentorService.js    # Isolated service layer simulating API calls
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx      # Sticky glass nav, wishlist badge, notifications, profile menu
    │   │   ├── Footer.jsx      # Comprehensive footer with legal & crisis disclaimers
    │   │   ├── Button.jsx      # Multi-variant, loading spinner states
    │   │   ├── Container.jsx   # Responsive container wrapper
    │   │   ├── SectionHeading.jsx
    │   │   ├── Badge.jsx       # Domain pills and verified tags
    │   │   ├── Rating.jsx      # Star rating and numeric score
    │   │   ├── Modal.jsx       # Accessible backdrop dialog with Esc key handler
    │   │   ├── Accordion.jsx   # Animated FAQ expand/collapse
    │   │   ├── Skeleton.jsx    # Shimmer loading cards
    │   │   ├── EmptyState.jsx  # Zero-result state with reset trigger
    │   │   ├── BackToTop.jsx   # Smooth floating scroll-to-top button
    │   │   ├── ThemeToggle.jsx # Dark/Light mode switcher
    │   │   ├── NotificationDropdown.jsx # Dropdown with real-time mark-as-read
    │   │   ├── DisclaimerBanner.jsx     # Prominent legal & wellbeing boundaries
    │   │   └── AnimatedCounter.jsx      # Accessible IntersectionObserver stats counter
    │   ├── mentors/
    │   │   ├── MentorCard.jsx  # Card with verified badge, rate, skills, wishlist
    │   │   ├── SearchBar.jsx   # Debounced keyword search input
    │   │   └── FilterPanel.jsx # Multi-facet filters (domain, rate, exp, country)
    │   └── home/
    │       ├── HeroGlobe.jsx   # Animated orbiting globe graphic
    │       ├── DomainCard.jsx  # Deep dive into the 3 core guidance areas
    │       ├── HowItWorks.jsx  # 4-step workflow cards
    │       ├── StatsSection.jsx# Animated counters
    │       ├── TestimonialSlider.jsx # Mentee outcomes with navigation
    │       ├── PricingSection.jsx    # Monthly/Annual pricing with 20% discount
    │       └── TrustStrip.jsx  # Partner institutions
    └── pages/
        ├── Home.jsx            # Landing page with complete SaaS hierarchy
        ├── Mentors.jsx         # Searchable directory, sorting & pagination
        ├── MentorProfile.jsx   # Detailed bio, video modal, reviews & sticky booking
        ├── Booking.jsx         # 3-step scheduling, price breakdown & confirmation
        ├── Dashboard.jsx       # Mentee dashboard with sessions, wishlist, tracker
        ├── BecomeMentor.jsx    # 5-step faculty application wizard
        ├── Resources.jsx       # Searchable knowledge base & PDF reader modal
        ├── Contact.jsx         # Contact form, office hubs & emergency hotlines
        ├── Auth.jsx            # Sign-in/Sign-up with one-click demo personas
        └── NotFound.jsx        # Accessible 404 screen
```

---

## 🛠️ Quickstart & Local Setup

### 1. Prerequisites
- Node.js `v18+` or `v20+` (LTS recommended)
- npm `v9+` or `v10+`

### 2. Installation
Open your terminal in the project directory:
```bash
cd global-mentor
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 💻 Running in VS Code

1. Launch VS Code.
2. Select **File > Open Folder...** and select:
   `C:\Users\sarthak\.gemini\antigravity\scratch\global-mentor`
3. Open the built-in terminal (`Ctrl + \`` or **Terminal > New Terminal**).
4. Run:
   ```bash
   npm run dev
   ```
5. Click on `http://localhost:5173` to view the live app with Hot Module Replacement (HMR).

---

## 🔌 Backend Integration Points

The application isolates all simulated calls behind `src/services/mentorService.js`. When connecting a production backend (Node/Express, NestJS, FastAPI, Go, or Supabase), replace mock returns with real HTTP calls:

| Frontend Function | Method | Target Backend Endpoint | Notes |
| :--- | :--- | :--- | :--- |
| `mentorService.getMentors(filters)` | `GET` | `/api/v1/mentors` | Pass query params: `?domain=&search=&maxPrice=&country=&sortBy=` |
| `mentorService.getMentorById(id)` | `GET` | `/api/v1/mentors/:id` | Returns full profile, reviews, and availability calendar |
| `mentorService.createBooking(payload)`| `POST` | `/api/v1/bookings` | Creates reservation and triggers calendar invitation email |
| `mentorService.submitApplication(data)`| `POST` | `/api/v1/mentor-applications` | Handles faculty onboarding and multipart document uploads |
| `mentorService.getResources(cat, q)` | `GET` | `/api/v1/resources` | Returns filtered educational guides & workbooks |
| `mentorService.sendContactMessage(data)`| `POST` | `/api/v1/contact` | Creates CRM ticket with automatic routing |
| `chatbotService.generateResponse(msg)` | `POST` | `/api/v1/chat/recommendations` | Connects conversational LLM (OpenAI/Gemini/Claude) |
| **Real Video Calls** | `GET` | `/api/v1/sessions/:id/token` | Integrate WebRTC, Daily.co, Twilio, or Zoom Server-to-Server API |
| **Real Payment Processing** | `POST` | `/api/v1/checkout/session` | Integrate Stripe Elements / Stripe Checkout webhook |

---

## ⚡ Deploying to Vercel

This repository is pre-configured for 1-click deployment on [Vercel](https://vercel.com):

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Import the repository: `GLOBAL-MENTOR`.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. The included [`vercel.json`](vercel.json) automatically handles React Router client-side rewrites so all routes (`/mentors`, `/booking/:id`, `/dashboard`, etc.) refresh seamlessly without 404 errors!

---

## ⚖️ Compliance & Scope Boundaries

- **Legal Literacy**: Mentorship sessions provide informational education on contracts, IP, and cyber safety. They never constitute formal legal representation or establish an attorney-client relationship.
- **Wellbeing Support**: Counselling mentors provide life navigation, somatic regulation tools, and burnout recovery support. This is strictly non-clinical and never substitutes for emergency psychiatric healthcare. Hotlines for immediate crises are accessible across the footer and contact pages.