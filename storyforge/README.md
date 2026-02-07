# StoryForge

A gamified storytelling learning platform built with Next.js. Master the craft of narrative writing through structured lessons, hands-on exercises, and AI-powered feedback.

## Features

### Guided Learning Path
8 modules with 32 lessons covering storytelling from fundamentals to advanced techniques:

| # | Module | Focus |
|---|--------|-------|
| 1 | The Story Spine | Three-act structure, hero's journey, story arcs |
| 2 | Character Craft | Character creation, development, archetypes |
| 3 | Conflict & Tension | Types of conflict, stakes, dramatic irony |
| 4 | Dialogue | Subtext, voice, exposition through dialogue |
| 5 | World-Building | Setting, sensory detail, atmosphere |
| 6 | Pacing & Structure | Scene tempo, tension curves, transitions |
| 7 | Theme & Meaning | Symbolism, motifs, thematic layering |
| 8 | Narrative Voice | POV, unreliable narrators, style |

Each lesson includes content, literary/film examples, a quiz, and a writing prompt.

### Practice Exercises
12 writing exercises across beginner, intermediate, and advanced difficulty levels. Submit your writing and receive structured AI feedback scored across four dimensions: creativity, structure, voice, and technique.

### AI Writing Mentor
Get personalized feedback from an AI mentor. Supports multiple providers:

- **Anthropic** — Direct Claude API
- **OpenRouter** — Multi-model gateway
- **AWS Bedrock** — Claude via AWS

Choose your preferred provider from the exercise page. The selection persists across sessions.

### Gamification
- **XP System** — Earn points for completing lessons (50 XP), passing quizzes (30 XP), submitting exercises (40 XP), receiving AI feedback (20 XP), and daily streaks (10 XP)
- **20 Levels** — Progress from *Scribbler* to *Master Narrator*
- **15 Badges** — Unlock achievements like First Chapter, Quiz Ace, Streak Legend, and Critic's Choice
- **Daily Streaks** — Maintain consecutive-day engagement

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom design tokens
- **Animations:** Framer Motion
- **State:** Zustand with localStorage persistence
- **AI:** Anthropic SDK, OpenRouter (fetch), AWS Bedrock SDK
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings), Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+
- At least one AI provider API key (see below)

### Installation

```bash
git clone <repository-url>
cd storyforge
npm install
```

### Environment Variables

Copy and configure `.env.local`:

```env
# Anthropic - Direct API (https://console.anthropic.com/)
ANTHROPIC_API_KEY=

# OpenRouter - Multi-model gateway (https://openrouter.ai/)
OPENROUTER_API_KEY=

# AWS Bedrock - Claude via AWS
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# App URL (used for OpenRouter HTTP-Referer header)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

You only need to configure the provider(s) you plan to use. At minimum, set one of:
- `ANTHROPIC_API_KEY` for direct Anthropic access
- `OPENROUTER_API_KEY` for OpenRouter
- `AWS_REGION` + `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` for Bedrock

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── mentor/route.ts          # AI feedback endpoint
│   │   └── providers/route.ts       # Provider availability endpoint
│   ├── learn/                        # Learning path pages
│   ├── practice/                     # Exercise pages
│   ├── reference/                    # Technique reference pages
│   └── profile/page.tsx              # User profile & stats
├── components/
│   ├── gamification/                 # XPBar, LevelBadge, StreakCounter, BadgeGrid
│   ├── layout/                       # Navbar, Footer, ThemeProvider
│   └── ui/                           # Button, Card, Badge, ProviderSelector, etc.
├── data/
│   ├── curriculum.ts                 # 8 modules x 4 lessons
│   ├── exercises.ts                  # 12 writing exercises
│   ├── badges.ts                     # 15 badge definitions
│   └── reference.ts                  # Storytelling techniques
├── lib/
│   ├── mentor.ts                     # System prompt & feedback prompt builder
│   ├── xp.ts                         # XP thresholds, levels, titles
│   └── providers/                    # AI provider abstraction layer
│       ├── types.ts                  # ProviderName, AIProvider, ProviderRequest
│       ├── anthropic.ts              # Anthropic Claude provider
│       ├── openrouter.ts             # OpenRouter provider
│       ├── bedrock.ts                # AWS Bedrock provider
│       └── index.ts                  # Provider registry
└── stores/
    ├── useGamificationStore.ts       # XP, level, badges, streaks
    ├── useProgressStore.ts           # Lesson/quiz/exercise progress
    ├── useSettingsStore.ts           # AI provider preference
    └── useThemeStore.ts              # Dark/light theme
```

## API Routes

### `POST /api/mentor`
Submit writing for AI feedback.

**Request body:**
```json
{
  "exercise": { "title": "...", "description": "...", "techniqueCategory": "..." },
  "writing": "The user's submitted text (min 20 words)",
  "provider": "anthropic"
}
```

**Response:**
```json
{
  "overallImpression": "...",
  "scores": { "creativity": 85, "structure": 78, "voice": 82, "technique": 80 },
  "strengths": ["...", "..."],
  "improvements": ["...", "..."],
  "nextStep": "..."
}
```

### `GET /api/providers`
Returns available AI providers and their configuration status (no secrets exposed).

## Deployment

Deploy on any platform that supports Next.js:

- **Vercel** — `vercel deploy`
- **Docker** — standard Next.js Dockerfile
- **Node.js** — `npm run build && npm start`

Set the environment variables on your hosting platform. Only configure the AI providers you intend to use.

## License

MIT
