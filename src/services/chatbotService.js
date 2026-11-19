// Global Mentor AI Recommendation Engine & Chatbot Service
// Fully modular conversational mentor matching engine
//
// NOTE FOR BACKEND / LLM INTEGRATION:
// Replace the rule-based conversational state machine and scoring logic below
// with your actual LLM endpoint (e.g. POST /api/v1/chat/recommendations with OpenAI, Gemini, or Claude).

import { MENTORS, DOMAINS } from '../data/mockData';

// Simulated latency to feel like an authentic AI thinking process
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Conversational Question Flow Definition
export const CONVERSATION_STEPS = {
  WELCOME: 'WELCOME',
  DOMAIN: 'DOMAIN',
  GOALS: 'GOALS',
  EXPERIENCE: 'EXPERIENCE',
  EXPERTISE: 'EXPERTISE',
  BUDGET: 'BUDGET',
  LANGUAGE: 'LANGUAGE',
  RECOMMENDATION: 'RECOMMENDATION'
};

export class ChatbotService {
  constructor() {
    this.resetState();
  }

  resetState() {
    this.state = {
      step: CONVERSATION_STEPS.WELCOME,
      domain: null, // 'education' | 'legal' | 'counselling'
      goal: null,
      experienceLevel: null, // 'senior' | 'mid' | 'any'
      expertise: null,
      budget: null, // 'budget' | 'standard' | 'premium' | 'flexible'
      language: null
    };
  }

  getState() {
    return { ...this.state };
  }

  // Calculate matching relevance score for a mentor against current preferences
  calculateRelevanceScore(mentor, prefs) {
    let score = 0;

    // 1. Domain match (Weight: 35)
    if (prefs.domain && mentor.domain === prefs.domain) {
      score += 35;
    }

    // 2. Goal / Keyword match against mentor skills, title, bio, fullBio (Weight: up to 30)
    if (prefs.goal) {
      const goalLower = prefs.goal.toLowerCase();
      const mentorSearchText = `${mentor.name} ${mentor.title} ${mentor.skills.join(' ')} ${mentor.bio} ${mentor.fullBio}`.toLowerCase();
      
      const keywords = goalLower.split(/[\s,+/&]+/).filter(w => w.length > 2);
      let matchedCount = 0;
      for (const kw of keywords) {
        if (mentorSearchText.includes(kw)) {
          matchedCount++;
        }
      }
      score += Math.min(matchedCount * 8, 30);
    }

    // 3. Specific expertise / technologies (Weight: up to 25)
    if (prefs.expertise && prefs.expertise.toLowerCase() !== 'any' && !prefs.expertise.toLowerCase().includes('skip')) {
      const expLower = prefs.expertise.toLowerCase();
      const mentorSearchText = `${mentor.skills.join(' ')} ${mentor.title} ${mentor.bio}`.toLowerCase();
      const expKeywords = expLower.split(/[\s,+/&]+/).filter(w => w.length > 2);
      
      let expMatched = 0;
      for (const kw of expKeywords) {
        if (mentorSearchText.includes(kw)) {
          expMatched++;
        }
      }
      score += Math.min(expMatched * 10, 25);
    }

    // 4. Experience level match (Weight: 15)
    if (prefs.experienceLevel) {
      const exp = prefs.experienceLevel.toLowerCase();
      if (exp.includes('senior') || exp.includes('12')) {
        if (mentor.experienceYears >= 12) score += 15;
        else if (mentor.experienceYears >= 10) score += 8;
      } else if (exp.includes('mid') || exp.includes('8')) {
        if (mentor.experienceYears >= 8 && mentor.experienceYears <= 12) score += 15;
        else score += 7;
      } else {
        // Any / 5+ years
        score += 10;
      }
    }

    // 5. Budget compatibility (Weight: 15)
    if (prefs.budget) {
      const b = prefs.budget.toLowerCase();
      if (b.includes('50') || b.includes('70') || b.includes('budget')) {
        if (mentor.hourlyRate <= 70) score += 15;
        else if (mentor.hourlyRate <= 80) score += 8;
      } else if (b.includes('standard') || b.includes('70 - 90')) {
        if (mentor.hourlyRate >= 70 && mentor.hourlyRate <= 90) score += 15;
        else score += 8;
      } else if (b.includes('premium') || b.includes('90') || b.includes('120')) {
        if (mentor.hourlyRate >= 90) score += 15;
        else score += 8;
      } else {
        // Flexible
        score += 10;
      }
    }

    // 6. Language preference (Weight: 15)
    if (prefs.language && !prefs.language.toLowerCase().includes('any')) {
      const langLower = prefs.language.toLowerCase();
      const hasLang = mentor.languages.some(l => langLower.includes(l.toLowerCase()));
      if (hasLang) score += 15;
    } else {
      score += 10;
    }

    // 7. Base reputation boost (Rating + Verified status)
    score += (mentor.rating || 4.5) * 2; // ~10 pts
    if (mentor.verified) score += 5;

    return score;
  }

  // Get Top 3 matching mentors based on current collected preferences
  getTop3Mentors(prefs) {
    const scoredMentors = MENTORS.map(m => ({
      mentor: m,
      score: this.calculateRelevanceScore(m, prefs)
    }));

    // Sort descending by relevance score
    scoredMentors.sort((a, b) => b.score - a.score);

    // Return the top 3 mentors
    return scoredMentors.slice(0, 3).map(sm => sm.mentor);
  }

  // Process user input conversational message
  async generateResponse(userMessage) {
    await delay(600);

    const rawInput = userMessage.trim();
    const text = rawInput.toLowerCase();

    // Check for explicit reset command
    if (text === 'reset' || text === 'restart' || text.includes('start over') || text.includes('start again')) {
      this.resetState();
      return {
        reply: "Conversation reset! 👋\n\nHi! I'm your AI Mentor Assistant. Tell me what you want to learn, and I'll find the right mentor for you.",
        recommendedMentors: [],
        step: CONVERSATION_STEPS.DOMAIN,
        suggestedActions: [
          '🎓 Higher Education & Admissions',
          '⚖️ Legal Guidance & Literacy',
          '🌿 Wellbeing & Personal Growth'
        ]
      };
    }

    // Check for direct natural language queries (shortcuts)
    // If user explicitly asks for something direct like "Oxford admissions" or "burnout help" at any point
    if (this.state.step === CONVERSATION_STEPS.WELCOME) {
      if (text.includes('oxford') || text.includes('cambridge') || text.includes('sop') || text.includes('college') || text.includes('ivy')) {
        this.state.domain = 'education';
        this.state.goal = 'Elite College Admissions & SOP Prep';
      } else if (text.includes('faang') || text.includes('tech interview') || text.includes('system design') || text.includes('coding')) {
        this.state.domain = 'education';
        this.state.goal = 'FAANG System Design & Tech Careers';
      } else if (text.includes('scholarship') || text.includes('chevening') || text.includes('erasmus') || text.includes('funding')) {
        this.state.domain = 'education';
        this.state.goal = 'Full-Ride International Scholarships';
      } else if (text.includes('term sheet') || text.includes('startup') || text.includes('contract') || text.includes('saas')) {
        this.state.domain = 'legal';
        this.state.goal = 'Startup Term Sheets & Commercial Contracts';
      } else if (text.includes('cyber') || text.includes('fraud') || text.includes('scam') || text.includes('phishing')) {
        this.state.domain = 'legal';
        this.state.goal = 'Cybercrime Awareness & Online Fraud Rights';
      } else if (text.includes('visa') || text.includes('immigration') || text.includes('o-1') || text.includes('eb-2')) {
        this.state.domain = 'legal';
        this.state.goal = 'US Talent Visas & Relocation Roadmaps';
      } else if (text.includes('burnout') || text.includes('stress') || text.includes('somatic') || text.includes('exhausted')) {
        this.state.domain = 'counselling';
        this.state.goal = 'Burnout Recovery & Somatic Regulation';
      } else if (text.includes('expat') || text.includes('relocation') || text.includes('moving abroad') || text.includes('nomad')) {
        this.state.domain = 'counselling';
        this.state.goal = 'Expat Adjustment & Overcoming Loneliness Abroad';
      } else if (text.includes('ikigai') || text.includes('purpose') || text.includes('mid-career')) {
        this.state.domain = 'counselling';
        this.state.goal = 'Ikigai Purpose Alignment & Career Transitions';
      }
    }

    // Step-by-Step Conversational State Flow:
    // Ask questions one by one:
    // 1. Domain
    // 2. Goal
    // 3. Experience Level
    // 4. Specific Expertise
    // 5. Budget
    // 6. Language
    // 7. Top 3 Mentors Match

    // STEP 1: Determine Domain
    if (!this.state.domain) {
      if (text.includes('education') || text.includes('college') || text.includes('study') || text.includes('school') || text.includes('career') || text.includes('tech') || text.includes('scholarship')) {
        this.state.domain = 'education';
      } else if (text.includes('legal') || text.includes('law') || text.includes('contract') || text.includes('term sheet') || text.includes('cyber') || text.includes('visa') || text.includes('patent')) {
        this.state.domain = 'legal';
      } else if (text.includes('counselling') || text.includes('wellbeing') || text.includes('burnout') || text.includes('stress') || text.includes('mental') || text.includes('life') || text.includes('growth')) {
        this.state.domain = 'counselling';
      } else {
        // Ask Question 1: Domain
        this.state.step = CONVERSATION_STEPS.DOMAIN;
        return {
          reply: "To find your ideal match, **which domain or skill area do you need help with?**",
          recommendedMentors: [],
          step: CONVERSATION_STEPS.DOMAIN,
          suggestedActions: [
            '🎓 Higher Education & Admissions',
            '⚖️ Legal Literacy & Guidance',
            '🌿 Wellbeing & Personal Growth'
          ]
        };
      }
    }

    // STEP 2: Determine Learning or Career Goals
    if (!this.state.goal) {
      // If user typed something other than just the domain name, treat as goal
      if (!['education', 'legal', 'counselling', 'higher education', 'legal guidance', 'wellbeing'].includes(text)) {
        this.state.goal = rawInput;
      } else {
        this.state.step = CONVERSATION_STEPS.GOALS;
        let goalActions = [];
        if (this.state.domain === 'education') {
          goalActions = [
            '🏛️ Oxford & Ivy League Admissions',
            '💰 Full-Ride Scholarships (Chevening/Erasmus)',
            '💻 FAANG System Design & Tech Careers',
            '📑 PhD Research & SOP Polish'
          ];
        } else if (this.state.domain === 'legal') {
          goalActions = [
            '📄 Startup Term Sheets & Contracts',
            '🛡️ Cybercrime & Digital Fraud Rights',
            '🛂 US Talent Visas (O-1 / EB-2 NIW)',
            '💡 Intellectual Property & Licensing'
          ];
        } else {
          goalActions = [
            '🔥 Workplace Burnout Recovery',
            '🌍 Expat Relocation & Loneliness Abroad',
            '🧭 Ikigai & Mid-Career Purpose',
            '🧘 Mindfulness & Somatic Regulation'
          ];
        }

        return {
          reply: `Great! For **${this.state.domain.toUpperCase()}**, **what is your primary learning or career goal right now?**\n\n*(You can select an option below or type your specific goal in your own words)*`,
          recommendedMentors: [],
          step: CONVERSATION_STEPS.GOALS,
          suggestedActions: goalActions
        };
      }
    }

    // STEP 3: Determine Preferred Mentor Experience Level
    if (!this.state.experienceLevel) {
      // Check if user answer is experience
      if (text.includes('senior') || text.includes('12+') || text.includes('10+')) {
        this.state.experienceLevel = 'Senior Expert (12+ years)';
      } else if (text.includes('mid') || text.includes('8-11') || text.includes('8 years')) {
        this.state.experienceLevel = 'Mid-to-Senior (8-11 years)';
      } else if (text.includes('any') || text.includes('5+') || text.includes('flexible')) {
        this.state.experienceLevel = 'Any experienced mentor (5+ years)';
      } else {
        this.state.step = CONVERSATION_STEPS.EXPERIENCE;
        return {
          reply: "Got it! **What preferred mentor experience level are you looking for?**",
          recommendedMentors: [],
          step: CONVERSATION_STEPS.EXPERIENCE,
          suggestedActions: [
            '🌟 Senior Expert (12+ years experience)',
            '🚀 Mid-to-Senior (8-11 years experience)',
            '✨ Any experienced mentor (5+ years)'
          ]
        };
      }
    }

    // STEP 4: Determine Specific Expertise or Technologies Required
    if (!this.state.expertise) {
      // Check if user provided expertise or opted out
      if (text.includes('skip') || text.includes('any') || text.includes('none') || text.includes('not sure')) {
        this.state.expertise = 'General domain expertise';
      } else {
        // If they just answered the experience question, prompt for expertise
        if (!this.state.expertise) {
          this.state.step = CONVERSATION_STEPS.EXPERTISE;
          let expertiseSuggestions = [];
          if (this.state.domain === 'education') {
            expertiseSuggestions = [
              'Oxford/Cambridge SOP Polish',
              'FAANG Distributed Systems',
              'Chevening & Scholarship Grants',
              'Skip / Any relevant expertise'
            ];
          } else if (this.state.domain === 'legal') {
            expertiseSuggestions = [
              'Pre-Seed SaaS Term Sheets',
              'GDPR & Cross-Border Data Laws',
              'EB-2 NIW Petition Portfolios',
              'Skip / Any relevant expertise'
            ];
          } else {
            expertiseSuggestions = [
              'Nervous System & Vagus Regulation',
              'Expat Cross-Cultural Adaptation',
              'Ikigai Vocation Framework',
              'Skip / Any relevant expertise'
            ];
          }

          // If raw input doesn't look like an expertise response, ask question
          if (rawInput === this.state.experienceLevel || text.includes('senior') || text.includes('mid') || text.includes('any experienced')) {
            return {
              reply: "**Are there specific technologies, methodologies, or focus areas required?**\n\n*(You can choose from the suggestions below, type your specific requirements, or choose Skip)*",
              recommendedMentors: [],
              step: CONVERSATION_STEPS.EXPERTISE,
              suggestedActions: expertiseSuggestions
            };
          } else {
            this.state.expertise = rawInput;
          }
        }
      }
    }

    // STEP 5: Determine Preferred Budget
    if (!this.state.budget) {
      if (text.includes('50') || text.includes('70') || text.includes('budget-friendly')) {
        this.state.budget = '$50 - $70/hr';
      } else if (text.includes('standard') || text.includes('70 - 90') || text.includes('80')) {
        this.state.budget = '$70 - $90/hr';
      } else if (text.includes('premium') || text.includes('90+') || text.includes('100')) {
        this.state.budget = '$90+/hr';
      } else if (text.includes('flexible') || text.includes('any') || text.includes('no preference')) {
        this.state.budget = 'Flexible / Any budget';
      } else {
        this.state.step = CONVERSATION_STEPS.BUDGET;
        return {
          reply: "Understood! **What is your preferred hourly budget for 1-on-1 mentorship sessions?**",
          recommendedMentors: [],
          step: CONVERSATION_STEPS.BUDGET,
          suggestedActions: [
            '💚 Budget-friendly ($50 - $70/hr)',
            '💙 Standard ($70 - $90/hr)',
            '💜 Premium ($90+/hr)',
            '🌟 Flexible / Any budget'
          ]
        };
      }
    }

    // STEP 6: Determine Preferred Language (Optional)
    if (!this.state.language) {
      if (text.includes('english') || text.includes('french') || text.includes('german') || text.includes('hindi') || text.includes('japanese') || text.includes('spanish')) {
        this.state.language = rawInput;
      } else if (text.includes('any') || text.includes('flexible') || text.includes('skip') || text.includes('no preference')) {
        this.state.language = 'Any language';
      } else {
        this.state.step = CONVERSATION_STEPS.LANGUAGE;
        return {
          reply: "Almost done! **Do you have a preferred language for your mentorship sessions?** (Optional)",
          recommendedMentors: [],
          step: CONVERSATION_STEPS.LANGUAGE,
          suggestedActions: [
            '🇬🇧 English',
            '🇫🇷 French',
            '🇩🇪 German',
            '🇮🇳 Hindi',
            '🇯🇵 Japanese',
            '🇪🇸 Spanish',
            '🌍 Any language is fine'
          ]
        };
      }
    }

    // STEP 7: Run Matching Engine & Return Top 3 Mentors!
    this.state.step = CONVERSATION_STEPS.RECOMMENDATION;
    const top3 = this.getTop3Mentors(this.state);

    const domainTitle = DOMAINS.find(d => d.id === this.state.domain)?.name || this.state.domain;
    
    // Check if legal or counselling disclosures should be highlighted
    let domainDisclaimer = '';
    if (this.state.domain === 'legal') {
      domainDisclaimer = '\n\n*Notice: Guidance is strictly educational & informational. It does not establish an attorney-client relationship.*';
    } else if (this.state.domain === 'counselling') {
      domainDisclaimer = '\n\n*Notice: Mentorship is non-clinical life guidance and not emergency crisis care.*';
    }

    const replyHeader = `🎯 **I found the top 3 verified mentors tailored for you!**\n\n` +
      `• **Domain:** ${domainTitle}\n` +
      `• **Goal:** ${this.state.goal}\n` +
      `• **Experience:** ${this.state.experienceLevel || 'Any'}\n` +
      `• **Expertise:** ${this.state.expertise || 'General'}\n` +
      `• **Budget:** ${this.state.budget || 'Flexible'}\n` +
      `• **Language:** ${this.state.language || 'Any'}` +
      domainDisclaimer +
      `\n\nHere are your ranked matches:`;

    return {
      reply: replyHeader,
      recommendedMentors: top3,
      step: CONVERSATION_STEPS.RECOMMENDATION,
      matchSummary: {
        domain: this.state.domain,
        goal: this.state.goal,
        budget: this.state.budget,
        count: top3.length
      },
      suggestedActions: [
        '🔄 Start a new search',
        '💰 Compare mentor rates',
        '💬 Ask a question about these mentors',
        '📅 Book a session now'
      ]
    };
  }
}

export const chatbotService = new ChatbotService();
