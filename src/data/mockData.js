// Global Mentor Unified Mock Data Module
// Single source of truth across all components and pages

export const DOMAINS = [
  {
    id: 'education',
    name: 'Education & Career',
    shortName: 'Education',
    tagline: 'Unlock elite admissions, scholarships & accelerated career paths',
    description: 'Direct guidance from Ivy League alumni, Oxford scholars, and Silicon Valley hiring managers. Master applications, scholarships, interview preparation, and lifelong skill mastery.',
    icon: 'GraduationCap',
    accentColor: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    disclaimer: 'Educational mentorship provides career, academic, and application advice based on mentor experience. It does not guarantee university admission or employment outcomes.',
    topics: [
      'Global College Admissions & Ivy League Prep',
      'Full-Ride Scholarships & Financial Aid Strategy',
      'FAANG & Tier-1 Tech Interview Preparation',
      'PhD & Post-Doctoral Research Roadmaps',
      'Cross-Border Study Visas & Transition Advice',
      'Executive Leadership & Career Pivot Coaching'
    ],
    stats: { mentorsCount: 480, sessionsDone: '24,000+', satisfaction: '99.2%' }
  },
  {
    id: 'legal',
    name: 'Legal Literacy & Guidance',
    shortName: 'Legal Guidance',
    tagline: 'Demystifying law, rights, cybercrime protection & documentation',
    description: 'Empowering individuals and founders with foundational legal literacy, contract comprehension, cyber laws, property clarity, and statutory navigation worldwide.',
    icon: 'Scale',
    accentColor: 'from-amber-500 to-yellow-600',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    disclaimer: 'CRITICAL NOTICE: Information provided through Global Mentor is strictly for legal literacy and educational purposes. It does not constitute formal legal representation, legal advice, or establish an attorney-client relationship. Always consult a licensed attorney in your jurisdiction for formal disputes or legal proceedings.',
    topics: [
      'Startup Contract Review & Term Sheet Literacy',
      'Cybercrime Awareness & Data Privacy Rights',
      'Immigration & Global Relocation Documentation',
      'Intellectual Property & Trademark Basics',
      'Property, Tenancy & Consumer Protection Guidance',
      'Family Law Concepts & Civic Dispute Resolution'
    ],
    stats: { mentorsCount: 310, sessionsDone: '11,500+', satisfaction: '98.5%' }
  },
  {
    id: 'counselling',
    name: 'Wellbeing & Personal Growth',
    shortName: 'Counselling',
    tagline: 'Evidence-informed mental wellbeing, life transitions & inner resilience',
    description: 'Compassionate conversations for stress management, overcoming burnout, relationship guidance, emotional intelligence, and holistic life balance.',
    icon: 'HeartHandshake',
    accentColor: 'from-emerald-500 to-teal-700',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    disclaimer: 'CRITICAL NOTICE: Global Mentor counselling mentors provide non-clinical wellbeing mentorship, personal development coaching, and life navigation support. This service is NOT emergency crisis care and is NOT a substitute for licensed psychiatric or clinical mental health treatment. If you are experiencing a mental health emergency or crisis, please immediately dial your local emergency hotline (e.g., 988 in the US/Canada, 111 in the UK, or 112 in the EU).',
    topics: [
      'Burnout Recovery & Sustainable High Performance',
      'Cross-Cultural Relocation & Expat Adjustment',
      'Mindfulness, Anxiety Management & Emotional Health',
      'Career Transition Grief & Impostor Syndrome',
      'Work-Life Boundaries & Healthy Relationship Dynamics',
      'Confidence Building & Identity Alignment'
    ],
    stats: { mentorsCount: 420, sessionsDone: '18,800+', satisfaction: '99.4%' }
  }
];

export const MENTORS = [
  {
    id: 'm1',
    name: 'Dr. Alistair Vance',
    title: 'Former Oxford Admissions Tutor & Rhodes Scholar',
    domain: 'education',
    rating: 4.98,
    reviewsCount: 142,
    hourlyRate: 85,
    country: 'United Kingdom',
    countryCode: 'GB',
    languages: ['English', 'French'],
    experienceYears: 14,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: true,
    bio: 'Guided 350+ students to Oxford, Cambridge, and Harvard. Specializes in personal statements, interviews, and academic scholarships.',
    fullBio: 'With 14 years of experience at Oxford University and international preparatory programs, Dr. Vance demystifies the elite college admissions process. He has evaluated thousands of applications and understands the precise nuance that transforms a strong applicant into a scholarship recipient. His mentees currently study at Oxford, Harvard, MIT, and Stanford.',
    skills: ['Oxford/Cambridge Prep', 'Personal Statement Polish', 'Rhodes & Fulbright Prep', 'Academic Research Roadmaps'],
    education: 'DPhil in Comparative Literature, University of Oxford; BA First Class, Oxford',
    certifications: ['Fellow of the Higher Education Academy (UK)', 'Certified Academic Strategist'],
    achievements: [
      'Admissions advisor to over 350 successful Oxbridge and Ivy applicants',
      'Author of "The Oxford Interview Demystified" (2022)',
      'Featured contributor to The Times Higher Education'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Mon', 'Tue', 'Thu', 'Sat'],
    availableSlots: ['09:00 AM', '11:30 AM', '03:00 PM', '06:00 PM'],
    reviews: [
      {
        id: 'r1',
        userName: 'Priya Sharma',
        userCountry: 'India',
        date: '2 weeks ago',
        rating: 5,
        comment: 'Dr. Vance restructured my entire SOP for Oxford MSc. His feedback on intellectual coherence was worth ten times the booking fee!'
      },
      {
        id: 'r2',
        userName: 'Marcus Lindqvist',
        userCountry: 'Sweden',
        date: '1 month ago',
        rating: 5,
        comment: 'Brilliant interview mock session. He anticipated 4 of the exact questions the Cambridge panel asked me. Got an unconditional offer!'
      }
    ]
  },
  {
    id: 'm2',
    name: 'Elena Rostova, Esq.',
    title: 'International Commercial Arbitrator & Tech Counsel',
    domain: 'legal',
    rating: 4.95,
    reviewsCount: 98,
    hourlyRate: 110,
    country: 'Germany',
    countryCode: 'DE',
    languages: ['English', 'German', 'Russian'],
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: true,
    bio: 'Educates founders and professionals on cross-border SaaS agreements, GDPR privacy literacy, and IP protection.',
    fullBio: 'Elena is a dual-qualified European attorney focused on making legal structures accessible to startups and independent contractors. She spent eight years advising high-growth tech firms in Berlin and London on SaaS master service agreements, open-source licensing, and cross-border data transfer regulations. Her sessions simplify legal jargon into actionable business confidence.',
    skills: ['Startup Term Sheets', 'GDPR & Privacy Literacy', 'Cross-Border SaaS Contracts', 'IP Protection Strategy'],
    education: 'LL.M. in International Law, Humboldt-Universität Berlin; Bar Admission (Germany & EU)',
    certifications: ['Certified Information Privacy Professional (CIPP/E)', 'WIPO Intellectual Property Scholar'],
    achievements: [
      'Mentored 120+ early-stage tech founders on pre-seed term sheet risks',
      'Guest lecturer on Legal Tech at Technical University of Munich',
      'Founder of the European Open Law Initiative'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Tue', 'Wed', 'Fri'],
    availableSlots: ['10:00 AM', '02:00 PM', '04:30 PM'],
    reviews: [
      {
        id: 'r3',
        userName: 'David Chen',
        userCountry: 'Singapore',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Elena clarified our intellectual property transfer clauses in 45 minutes. Saved our seed-round syndicate negotiations.'
      }
    ]
  },
  {
    id: 'm3',
    name: 'Maya Sen, MSc',
    title: 'Executive Wellbeing Strategist & Somatic Practitioner',
    domain: 'counselling',
    rating: 4.99,
    reviewsCount: 210,
    hourlyRate: 75,
    country: 'Canada',
    countryCode: 'CA',
    languages: ['English', 'Hindi'],
    experienceYears: 10,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: true,
    bio: 'Specialist in tech burnout recovery, nervous system regulation, and navigating high-pressure corporate environments.',
    fullBio: 'Maya combines positive psychology, neuro-resilience frameworks, and evidence-based stress reduction methods to help executives and professionals regain inner stillness. Having experienced tech burnout firsthand as a former VP of Operations, Maya creates a non-judgmental, grounded sanctuary for tackling anxiety, perfectionism, and work-life boundaries.',
    skills: ['Burnout Recovery', 'Impostor Syndrome Relief', 'Mindfulness & Vagus Nerve Work', 'Healthy Boundaries'],
    education: 'MSc in Applied Positive Psychology, University of East London; BA Psychology, UBC',
    certifications: ['International Coaching Federation (ICF PCC)', 'Mindfulness-Based Stress Reduction (MBSR) Certified'],
    achievements: [
      'Delivered corporate wellbeing workshops for Google, Shopify, and Figma teams',
      'Over 2,500 1-on-1 coaching and supportive mentorship sessions completed',
      'Host of "The Still Mind" podcast with 250k+ downloads'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['08:00 AM', '12:00 PM', '03:00 PM', '07:00 PM'],
    reviews: [
      {
        id: 'r4',
        userName: 'Sarah Jenkins',
        userCountry: 'United States',
        date: '5 days ago',
        rating: 5,
        comment: 'Maya helped me break the relentless cycle of workaholism without sacrificing my career momentum. Life-changing session.'
      }
    ]
  },
  {
    id: 'm4',
    name: 'Tariq Al-Mansoor',
    title: 'Principal Staff Engineer at FAANG & Career Architect',
    domain: 'education',
    rating: 4.96,
    reviewsCount: 165,
    hourlyRate: 95,
    country: 'United States',
    countryCode: 'US',
    languages: ['English', 'Arabic'],
    experienceYears: 16,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: true,
    bio: 'Helped 180+ software engineers land L5/L6 roles at Meta, Google, and Amazon through systematic system design coaching.',
    fullBio: 'Tariq has conducted over 400 hiring committee reviews at top tech companies. He helps senior and aspiring staff engineers master large-scale distributed systems design, behavioral leadership stories, and salary negotiation strategies with data-driven precision.',
    skills: ['System Design Architecture', 'FAANG L5/L6 Coding Prep', 'Salary Negotiation Tactics', 'Promotion Roadmaps'],
    education: 'MS Computer Science, Carnegie Mellon University; BS UC Berkeley',
    certifications: ['AWS Solutions Architect Professional', 'Google Cloud Certified Fellow'],
    achievements: [
      'Coached engineers who negotiated an aggregate $4.2M in compensation increases',
      'Keynote speaker at Strange Loop & QCon San Francisco',
      'Patent holder for 4 distributed cloud caching systems'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Tue', 'Thu', 'Sun'],
    availableSlots: ['05:00 PM', '07:00 PM', '08:30 PM'],
    reviews: [
      {
        id: 'r5',
        userName: 'Karthik Raja',
        userCountry: 'India',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Tariq broke down Google L6 system design expectations down to a science. Received an offer last Friday!'
      }
    ]
  },
  {
    id: 'm5',
    name: 'Adv. Ananya Deshmukh',
    title: 'Cybercrime Law & Digital Rights Advisor',
    domain: 'legal',
    rating: 4.93,
    reviewsCount: 74,
    hourlyRate: 65,
    country: 'India',
    countryCode: 'IN',
    languages: ['English', 'Hindi', 'Marathi'],
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: false,
    bio: 'Educates netizens, creators, and businesses on cyber fraud recovery, online defamation, digital evidence, and IT Act rights.',
    fullBio: 'Advocate Ananya Deshmukh is a leading digital rights advocate and legal educator. She specializes in guiding individuals who have encountered online identity theft, financial phishing scams, revenge media, and copyright infringement on social networks. Her informational sessions provide clear step-by-step reporting protocols and statutory understanding.',
    skills: ['Cybercrime Reporting Steps', 'Online Harassment Literacy', 'Digital Forensics Protocols', 'IT Act & Consumer Rights'],
    education: 'LL.B. Symbiosis Law School; Post-Graduate Diploma in Cyber Laws, ILS Pune',
    certifications: ['Certified Cyber Crime Intervention Officer (CCIO)', 'DSCI Certified Privacy Lead'],
    achievements: [
      'Educated 5,000+ college students on digital safety through community workshops',
      'Published "Every Citizen\'s Guide to Cyber Self-Defense" in Indian Express',
      'Invited speaker at National Cyber Security Conclave'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    availableSlots: ['11:00 AM', '02:00 PM', '05:00 PM'],
    reviews: [
      {
        id: 'r6',
        userName: 'Rohan Verma',
        userCountry: 'India',
        date: '1 week ago',
        rating: 5,
        comment: 'Clear, reassuring, and methodical guidance on how to report a UPI phishing incident through official cybercrime portals.'
      }
    ]
  },
  {
    id: 'm6',
    name: 'Dr. Lucas Moreau',
    title: 'Transitional Psychologist & Expat Integration Coach',
    domain: 'counselling',
    rating: 4.97,
    reviewsCount: 184,
    hourlyRate: 80,
    country: 'France',
    countryCode: 'FR',
    languages: ['English', 'French', 'Spanish'],
    experienceYears: 11,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: true,
    bio: 'Helping expats, international students, and remote nomads navigate loneliness, identity shifts, and cultural adaptation.',
    fullBio: 'Relocating to a new country often brings profound identity dislocation alongside excitement. Dr. Moreau has lived across five continents and provides culturally-sensitive mentorship for navigating cross-border relocation, overcoming culture shock, and building deep community abroad.',
    skills: ['Expat Culture Shock', 'Remote Nomad Isolation', 'Third-Culture Kids Identity', 'Life Stage Transitions'],
    education: 'PhD in Social Psychology, Sorbonne Université Paris; MA Universitat de Barcelona',
    certifications: ['European Federation of Psychologists Associations (EFPA) Member', 'Certified Cross-Cultural Coach'],
    achievements: [
      'Supported over 400 expatriates in their first 12 months abroad',
      'Consultant to European Commission on international mobility wellbeing',
      'Bilingual author of "Rooted Everywhere: Finding Home Within"'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Mon', 'Tue', 'Thu'],
    availableSlots: ['09:30 AM', '01:00 PM', '04:00 PM', '06:30 PM'],
    reviews: [
      {
        id: 'r7',
        userName: 'Chloe Bennett',
        userCountry: 'Australia',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Moving to Paris alone was overwhelming until I met Lucas. His practical reframing turned my homesickness into adventurous curiosity.'
      }
    ]
  },
  {
    id: 'm7',
    name: 'Sofia Ramirez, JD',
    title: 'Immigration Literacy & Human Rights Researcher',
    domain: 'legal',
    rating: 4.91,
    reviewsCount: 88,
    hourlyRate: 70,
    country: 'United States',
    countryCode: 'US',
    languages: ['English', 'Spanish'],
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: false,
    bio: 'Demystifying US visa pathways (O-1, H-1B, EB-1, EB-2 NIW) for global talent, researchers, and entrepreneurs.',
    fullBio: 'Sofia specializes in providing high-clarity informational roadmaps for complex immigration classifications. She helps mentees evaluate their publication citations, letters of recommendation, and petition evidence before consulting formal counsel.',
    skills: ['EB-2 NIW Strategy', 'O-1 Extraordinary Ability Criteria', 'Visa Roadmap Literacy', 'Evidence Portfolio Audit'],
    education: 'JD, Georgetown University Law Center; BA Political Science, UCLA',
    certifications: ['American Bar Association Section of International Law Fellow'],
    achievements: [
      'Audited over 200 researcher portfolios for self-petition readiness',
      'Invited panelist at Global Tech Immigration Summit 2023',
      'Pro bono mentor for international STEM scholars'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Wed', 'Fri', 'Sat'],
    availableSlots: ['01:00 PM', '03:30 PM', '06:00 PM'],
    reviews: [
      {
        id: 'r8',
        userName: 'Alejandro Gomez',
        userCountry: 'Mexico',
        date: '1 month ago',
        rating: 5,
        comment: 'Clear, realistic guidance on what USCIS looks for in EB-2 NIW endeavor statements. Invaluable prep before hiring my attorney.'
      }
    ]
  },
  {
    id: 'm8',
    name: 'Kwame Mensah',
    title: 'Global Scholarship Strategist & Commonwealth Fellow',
    domain: 'education',
    rating: 4.97,
    reviewsCount: 115,
    hourlyRate: 55,
    country: 'Kenya',
    countryCode: 'KE',
    languages: ['English', 'Swahili'],
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: false,
    bio: 'Secured full-ride scholarships worth over $3.8M for students across Africa, Asia, and Latin America.',
    fullBio: 'Kwame is dedicated to democratizing global higher education. He coaches ambitious students from developing nations on winning Chevening, Erasmus Mundus, Commonwealth, and Mastercard Foundation scholarships through storytelling and rigorous essay drafting.',
    skills: ['Chevening & Erasmus Mundus', 'Scholarship Essay Crafting', 'Leadership Evidence Mapping', 'Global South Funding Grants'],
    education: 'MSc Public Policy, London School of Economics (Chevening Scholar); BSc University of Nairobi',
    certifications: ['Commonwealth Youth Ambassador', 'Global Youth Mentorship Fellow'],
    achievements: [
      '48 mentees received full-ride international master\'s scholarships in 2023 alone',
      'Recipient of the African Educational Leadership Award',
      'TEDx speaker: "Talent is Universal, Opportunity Must Be Too"'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Tue', 'Thu', 'Sat', 'Sun'],
    availableSlots: ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM'],
    reviews: [
      {
        id: 'r9',
        userName: 'Amina Bello',
        userCountry: 'Nigeria',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Kwame coached me through every draft of my Chevening essays. Today I received my offer for King\'s College London with 100% funding!'
      }
    ]
  },
  {
    id: 'm9',
    name: 'Hiroshi Tanaka',
    title: 'Mindful Leadership Coach & Ikigai Facilitator',
    domain: 'counselling',
    rating: 4.94,
    reviewsCount: 92,
    hourlyRate: 85,
    country: 'Japan',
    countryCode: 'JP',
    languages: ['English', 'Japanese'],
    experienceYears: 13,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    verified: true,
    featured: false,
    bio: 'Synthesizing ancient Japanese Ikigai philosophy with modern cognitive science for purpose-driven career alignment.',
    fullBio: 'Hiroshi helps mid-career professionals navigating crisis of purpose, corporate disillusionment, and life stagnation find clarity in their authentic vocation. Using the 4-pillar Ikigai framework, Hiroshi guides mentees through discovering what they love, what the world needs, and what gives deep meaning to their days.',
    skills: ['Ikigai Purpose Alignment', 'Mid-Career Crisis Navigation', 'Zen Mindfulness Practices', 'Values-Based Decision Making'],
    education: 'MA Cognitive Science, University of Tokyo; BA Philosophy, Kyoto University',
    certifications: ['Certified Ikigai Master Practitioner', 'International Association of Coaching Fellow'],
    achievements: [
      'Facilitated life transitions for over 300 corporate leaders across Asia-Pacific',
      'Author of "The Calm Engine: Ikigai in the Modern Age"',
      'Featured in NHK World and Nikkei Asian Review'
    ],
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    availabilityDays: ['Mon', 'Wed', 'Fri'],
    availableSlots: ['07:00 AM', '11:00 AM', '06:00 PM'],
    reviews: [
      {
        id: 'r10',
        userName: 'Liam O\'Connor',
        userCountry: 'Ireland',
        date: '2 weeks ago',
        rating: 5,
        comment: 'Hiroshi’s gentle questions completely reoriented how I viewed my 15-year finance career. I now wake up with intentional peace.'
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Nadia Volkova',
    role: 'MSc Candidate at University of Oxford',
    domain: 'education',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    country: 'Ukraine / UK',
    content: 'Global Mentor bridged the impossible gap between my aspirations in Eastern Europe and Oxford admissions. Dr. Vance dissected every paragraph of my proposal with uncompromising precision. His mentorship is the sole reason I received full funding.',
    rating: 5,
    mentorName: 'Dr. Alistair Vance'
  },
  {
    id: 't2',
    name: 'Rajeev Menon',
    role: 'Founder & CEO at Synapse AI',
    domain: 'legal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    country: 'India',
    content: 'As a first-time founder negotiating our Series A term sheet with European VCs, Elena’s legal literacy session was a lifeline. She explained liquidation preference pitfalls and drag-along rights with unbelievable clarity before we sat down with our law firm.',
    rating: 5,
    mentorName: 'Elena Rostova, Esq.'
  },
  {
    id: 't3',
    name: 'Emily Watson',
    role: 'Staff Product Designer at FinTech',
    domain: 'counselling',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    country: 'United States',
    content: 'I had been running on fumes for two years, convinced that chronic exhaustion was just the price of tech success. Maya gave me tangible, somatic tools to set boundaries and regulate my nervous system. She didn’t just save my career; she gave me my peace back.',
    rating: 5,
    mentorName: 'Maya Sen, MSc'
  },
  {
    id: 't4',
    name: 'Tariq Benali',
    role: 'Erasmus Mundus Scholar',
    domain: 'education',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    country: 'Morocco',
    content: 'Kwame Mensah’s mentorship showed me how to articulate my community leadership in a way scholarship panels respect. 100% tuition and living stipend secured across three EU universities. Thank you Global Mentor!',
    rating: 5,
    mentorName: 'Kwame Mensah'
  }
];

export const RESOURCES = [
  {
    id: 'res-1',
    title: 'The Ultimate Ivy League & Oxbridge Statement of Purpose Framework',
    category: 'education',
    domain: 'education',
    readTime: '12 min read',
    downloads: '14.2k',
    description: 'A comprehensive structural guide breaking down hook narratives, academic coherence, research alignment, and common SOP red flags.',
    tags: ['Admissions', 'SOP Writing', 'Ivy League', 'Oxford'],
    updatedAt: 'October 2026',
    author: 'Dr. Alistair Vance',
    content: `
### Executive Summary
Most candidates treat the Statement of Purpose (SOP) as an annotated resume. Admissions committees at Cambridge, Oxford, and Harvard already have your transcripts and CV; what they seek in the SOP is proof of intellectual momentum.

### The 4-Pillar SOP Architecture
1. **The Catalyst (10%)**: The specific intellectual puzzle or empirical anomaly that drives your research question. Avoid generic childhood epiphanies.
2. **The Scholarly Foundation (30%)**: Concise critique of existing literature and methodologies you have tested. Highlight your methodological literacy.
3. **The Proposed Investigation (40%)**: Specific lab, archival corpus, or quantitative problem you intend to engage with, naming specific faculty mentors and why their laboratory/department is the unique habitat for your work.
4. **Trajectory & Horizon (20%)**: Where this scholarship leads over the subsequent decade.
    `
  },
  {
    id: 'res-2',
    title: 'Startup Legal Literacy: Term Sheet Clauses Every Founder Must Know',
    category: 'legal',
    domain: 'legal',
    readTime: '15 min read',
    downloads: '8.7k',
    description: 'Demystifying liquidation preferences, anti-dilution provisions, founder vesting, and board control before you sign with investors.',
    tags: ['Startups', 'Term Sheets', 'Legal Literacy', 'Venture Capital'],
    updatedAt: 'September 2026',
    author: 'Elena Rostova, Esq.',
    content: `
### Disclaimer
*This document provides business legal literacy and educational overview. It is not formal legal counsel.*

### Critical Clauses Explained
- **1x Non-Participating vs Participating Preferred**: Participating preferred is founder-hostile in moderate exits. Understand why 1x non-participating is the standard market baseline.
- **Weighted Average Anti-Dilution vs Full Ratchet**: Why full-ratchet is punitive and how broad-based weighted average protects everyone fairly.
- **Protective Provisions**: Distinguish between ordinary board votes and investor veto rights over hiring, debt, or acquisitions.
    `
  },
  {
    id: 'res-3',
    title: 'Burnout Recovery Protocol for High-Performing Professionals',
    category: 'counselling',
    domain: 'counselling',
    readTime: '9 min read',
    downloads: '19.5k',
    description: 'A somatic and psychological reset framework for recognizing chronic sympathetic nervous system overload and reclaiming cognitive baseline.',
    tags: ['Wellbeing', 'Burnout', 'Mental Health', 'Work-Life Balance'],
    updatedAt: 'October 2026',
    author: 'Maya Sen, MSc',
    content: `
### The 3 Stages of Burnout
1. **Hyper-Drive**: Euphoric productivity masking severe physiological fatigue.
2. **Depersonalization / Cynicism**: Detachment from colleagues, irritability, loss of empathy.
3. **Exhaustion & Brain Fog**: Loss of executive memory, executive function deficits, insomnia despite fatigue.

### The 21-Day Nervous System Reset
- **Dopamine Downregulation**: No screens 60 minutes after waking; prioritize natural sunlight.
- **Vagus Nerve Stimulation**: Physiological sighs (double inhale, slow extended exhale) to interrupt acute cortisol surges.
- **Firm Energetic Boundary Setting**: Replacing default "Yes" with standard deferral: *"Let me consult my quarterly bandwidth and confirm tomorrow."*
    `
  },
  {
    id: 'res-4',
    title: 'Global Full-Ride Scholarship Directory & Application Checklist',
    category: 'education',
    domain: 'education',
    readTime: '20 min read',
    downloads: '28.1k',
    description: 'Curated list of 45+ premier international master and doctoral scholarships covering 100% tuition, travel, and monthly living allowances.',
    tags: ['Scholarships', 'Study Abroad', 'Funding', 'Chevening'],
    updatedAt: 'October 2026',
    author: 'Kwame Mensah',
    content: `
### Major Fully-Funded Programs
- **Chevening (UK)**: Open to leaders worldwide; covers tuition, economy flights, monthly stipend.
- **Erasmus Mundus Joint Master Degrees (EU)**: Multi-country mobility with €1,400 monthly allowance.
- **Fulbright Foreign Student Program (US)**: Comprehensive graduate study support.
- **DAAD Scholarships (Germany)**: State-funded research and postgraduate degrees with zero tuition.
    `
  },
  {
    id: 'res-5',
    title: 'Cyber Safety & Evidence Preservation Handbook',
    category: 'legal',
    domain: 'legal',
    readTime: '11 min read',
    downloads: '6.4k',
    description: 'Step-by-step guidance on legally documenting online harassment, financial fraud, unauthorized data leaks, and lodging formal complaints.',
    tags: ['Cybercrime', 'Digital Rights', 'Data Privacy', 'Security'],
    updatedAt: 'August 2026',
    author: 'Adv. Ananya Deshmukh',
    content: `
### Preserving Digital Evidence
1. **Never Just Screenshot**: Save complete web pages as single-file HTML or PDF with active timestamp headers.
2. **Email Headers**: Extract full RFC 822 internet headers to identify originating IP addresses and DKIM signatures.
3. **Hash Matching**: How using SHA-256 checksums proves that digital logs were not manipulated post-incident.
    `
  },
  {
    id: 'res-6',
    title: 'The Expat Transition & Cultural Grounding Workbook',
    category: 'counselling',
    domain: 'counselling',
    readTime: '14 min read',
    downloads: '11.8k',
    description: 'Navigating the 4 stages of relocation shock, overcoming expatriate isolation, and cultivating authentic belonging in foreign environments.',
    tags: ['Expat Life', 'Cultural Adaptation', 'Resilience', 'Nomad'],
    updatedAt: 'September 2026',
    author: 'Dr. Lucas Moreau',
    content: `
### The 4 Stages of Relocation
- **Honeymoon**: Novelty and sensory stimulation.
- **Crisis / Shock**: Friction with language, bureaucratic hurdles, loneliness.
- **Recovery**: Gradual decoding of cultural norms and subtle social cues.
- **Adjustment**: True bicultural integration without sacrificing your core roots.
    `
  }
];

export const FAQS = [
  {
    category: 'General',
    question: 'What is Global Mentor and how does it work?',
    answer: 'Global Mentor is a curated international mentorship platform connecting individuals and founders worldwide with verified mentors across three core domains: Education & Admissions, Legal Literacy & Compliance, and Wellbeing & Counselling. You can search mentors by domain, language, country, and price; review their credentials; and book 1-on-1 strategy sessions via video, voice, or structured asynchronous consultations.'
  },
  {
    category: 'General',
    question: 'How are mentors vetted and verified on Global Mentor?',
    answer: 'Every mentor on our platform undergoes a rigorous 4-stage evaluation: professional identity verification, academic and bar credential review, a simulated guidance interview with our advisory board, and ongoing student feedback rating maintenance (must maintain minimum 4.8/5.0 rating).'
  },
  {
    category: 'Legal Guidance',
    question: 'Is legal guidance on this platform a substitute for hiring a lawyer?',
    answer: 'NO. Global Mentor strictly provides legal literacy, educational overviews, statutory navigation, and general documentation awareness. It does NOT establish an attorney-client relationship, does not constitute legal representation in court, and is not a formal substitute for a licensed attorney admitted to practice in your jurisdiction.'
  },
  {
    category: 'Counselling & Support',
    question: 'Is counselling on Global Mentor suitable for psychiatric or medical emergencies?',
    answer: 'NO. Our counselling mentors provide non-clinical wellbeing mentorship, personal development coaching, life transition navigation, and stress management tools. If you or someone you know is in acute distress or experiencing a mental health emergency, please contact your local national crisis line immediately (e.g., 988 in the US/Canada, 111 in the UK).'
  },
  {
    category: 'Booking & Sessions',
    question: 'How does session booking and scheduling work?',
    answer: 'Browse our directory, select a mentor, and choose your preferred date and time slot in your local timezone. You can select between 1-on-1 Video Strategy Calls, Audio-Only Sessions, or Async Written Roadmaps. In this demo preview, bookings are simulated seamlessly without real payment processing.'
  },
  {
    category: 'For Mentors',
    question: 'How can I apply to become a mentor?',
    answer: 'Visit the "Become a Mentor" portal in our top navigation. Complete the multi-step application including your verified credentials, domain expertise, target rate, and weekly availability. Our global team evaluates submissions within 3 to 5 business days.'
  }
];

export const PRICING_PLANS = [
  {
    id: 'explorer',
    name: 'Explorer',
    badge: 'Free Forever',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for students and self-directed learners exploring pathways.',
    features: [
      'Unlimited mentor directory search & filters',
      'Access to 25+ free foundational guides & SOP roadmaps',
      'Community Q&A discussion board preview',
      'Save unlimited mentors to your Wishlist',
      'Pay-per-session mentor booking (no monthly commitment)'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Learner',
    badge: 'Most Popular',
    monthlyPrice: 29,
    yearlyPrice: 24, // billed annually $288/yr (save 20%)
    description: 'For ambitious students, professionals, and international applicants.',
    features: [
      'Everything in Explorer',
      '15% discount on all 1-on-1 mentor booking fees',
      'Full access to all premium guides, term sheets & workbooks',
      'Priority slot booking 7 days ahead of general calendar',
      'Dedicated Slack/Discord peer accountability circle',
      'Monthly group AMA with featured master mentors'
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true
  },
  {
    id: 'executive',
    name: 'Global Executive',
    badge: 'Comprehensive Guidance',
    monthlyPrice: 89,
    yearlyPrice: 72, // save 20%
    description: 'For founders, PhD researchers, and professionals undergoing high-stakes pivots.',
    features: [
      'Everything in Pro Learner',
      'Includes 1 complimentary 45-min master consultation each month',
      'Direct WhatsApp/Asynchronous concierge question line',
      'Expedited 24-hour review on SOPs and document literacy audits',
      'Quarterly executive career & wellbeing trajectory mapping',
      'Custom invoice and enterprise expense receipts'
    ],
    cta: 'Upgrade to Executive',
    popular: false
  }
];

export const STATS = [
  { value: '120+', label: 'Countries Represented', description: 'Cross-border guidance from top minds worldwide' },
  { value: '1,200+', label: 'Verified Global Mentors', description: 'Top 3% accepted after rigorous verification' },
  { value: '54,000+', label: 'Mentorship Hours Completed', description: 'Empowering dreams across 5 continents' },
  { value: '98.8%', label: 'Satisfaction Rating', description: 'Rated 5 stars by thousands of satisfied mentees' }
];

export const TRUST_PARTNERS = [
  'Harvard University',
  'University of Oxford',
  'Stanford Graduate School',
  'London School of Economics',
  'Technical University of Munich',
  'National University of Singapore',
  'MIT Sloan',
  'ETH Zürich'
];

export const DEMO_USER = {
  id: 'u-101',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  role: 'Aspiring Graduate Scholar & Product Lead',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  country: 'Canada',
  savedMentors: ['m1', 'm3'],
  completedSessions: 8,
  learningHours: 12.5,
  upcomingBookings: [
    {
      id: 'bk-901',
      mentorId: 'm1',
      mentorName: 'Dr. Alistair Vance',
      mentorTitle: 'Former Oxford Admissions Tutor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      domain: 'education',
      date: 'Tomorrow, 03:00 PM',
      sessionType: 'Video Call (1-on-1)',
      status: 'Confirmed',
      meetingUrl: 'https://meet.globalmentor.example/vance-alex-901',
      notes: 'Final review of my Oxford DPhil Statement of Purpose and research methodology critique.'
    },
    {
      id: 'bk-902',
      mentorId: 'm3',
      mentorName: 'Maya Sen, MSc',
      mentorTitle: 'Executive Wellbeing Strategist',
      mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      domain: 'counselling',
      date: 'Friday, 12:00 PM',
      sessionType: 'Video Call (1-on-1)',
      status: 'Confirmed',
      meetingUrl: 'https://meet.globalmentor.example/maya-alex-902',
      notes: 'Weekly nervous system reset and cognitive workload restructuring.'
    }
  ],
  recentActivity: [
    { id: 'act-1', text: 'Completed session with Adv. Ananya Deshmukh on Startup Terms', time: 'Yesterday' },
    { id: 'act-2', text: 'Downloaded "Ivy League & Oxbridge SOP Framework" guide', time: '3 days ago' },
    { id: 'act-3', text: 'Added Dr. Lucas Moreau to your Saved Mentors', time: '1 week ago' },
    { id: 'act-4', text: 'Earned "Academic Literacy Milestone I" badge', time: '2 weeks ago' }
  ],
  milestones: [
    { id: 'm-1', title: 'Admissions Preparation', progress: 85, status: 'In Progress' },
    { id: 'm-2', title: 'Legal & IP Literacy', progress: 60, status: 'Active' },
    { id: 'm-3', title: 'Executive Stress Regulation', progress: 75, status: 'Ongoing' }
  ]
};
