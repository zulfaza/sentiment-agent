// Types
export interface User {
  id: string
  name: string
  email: string
}

export type AgentType = 'brand' | 'person'
export type Platform = 'x.com' | 'instagram' | 'reddit' | 'tiktok'
export type Sentiment = 'positive' | 'neutral' | 'negative'
export type AgentStatus = 'analyzing' | 'ready'

export interface Agent {
  id: string
  name: string
  type: AgentType
  platforms: Array<Platform>
  createdAt: string
}

export interface SentimentSummary {
  positive: number
  neutral: number
  negative: number
}

export interface SentimentTrend {
  date: string
  positive: number
  neutral: number
  negative: number
}

export interface Mention {
  id: string
  platform: Platform
  user: string
  content: string
  sentiment: Sentiment
  timestamp: string
}

export interface AgentWithData extends Agent {
  status: AgentStatus
  sentimentSummary: SentimentSummary | null
  trends: Array<SentimentTrend>
  mentions: Array<Mention>
}

export interface CreateAgentInput {
  name: string
  type: AgentType
  platforms: Array<string>
}

// Mock Data
const mockAgentsData: Array<AgentWithData> = [
  {
    id: '1',
    name: 'Apple Inc.',
    type: 'brand',
    platforms: ['x.com', 'reddit', 'instagram'],
    createdAt: '2024-01-15',
    status: 'ready',
    sentimentSummary: { positive: 62, neutral: 25, negative: 13 },
    trends: [
      { date: '2024-12-17', positive: 58, neutral: 28, negative: 14 },
      { date: '2024-12-18', positive: 60, neutral: 26, negative: 14 },
      { date: '2024-12-19', positive: 55, neutral: 30, negative: 15 },
      { date: '2024-12-20', positive: 63, neutral: 24, negative: 13 },
      { date: '2024-12-21', positive: 65, neutral: 23, negative: 12 },
      { date: '2024-12-22', positive: 61, neutral: 26, negative: 13 },
      { date: '2024-12-23', positive: 62, neutral: 25, negative: 13 },
    ],
    mentions: [
      {
        id: 'm1',
        platform: 'x.com',
        user: '@techreviewer',
        content:
          "The new MacBook Pro is absolutely incredible. Best laptop I've ever used!",
        sentiment: 'positive',
        timestamp: '2 min ago',
      },
      {
        id: 'm2',
        platform: 'reddit',
        user: 'u/gadgetfan',
        content:
          "Apple's customer service has really gone downhill lately. Waited 3 hours for support.",
        sentiment: 'negative',
        timestamp: '15 min ago',
      },
      {
        id: 'm3',
        platform: 'instagram',
        user: '@lifestyletech',
        content:
          'Unboxing the new iPhone. Pretty standard upgrade from last year.',
        sentiment: 'neutral',
        timestamp: '32 min ago',
      },
      {
        id: 'm4',
        platform: 'x.com',
        user: '@devlife',
        content:
          'SwiftUI keeps getting better with each update. Love the new APIs!',
        sentiment: 'positive',
        timestamp: '1 hr ago',
      },
      {
        id: 'm5',
        platform: 'reddit',
        user: 'u/applefan2024',
        content:
          'Vision Pro is overpriced but the tech is genuinely impressive.',
        sentiment: 'neutral',
        timestamp: '2 hr ago',
      },
      {
        id: 'm6',
        platform: 'x.com',
        user: '@stockwatcher',
        content: 'AAPL hitting new highs. Tim Cook doing amazing work.',
        sentiment: 'positive',
        timestamp: '3 hr ago',
      },
      {
        id: 'm7',
        platform: 'instagram',
        user: '@creativedesign',
        content: "Apple's M3 chip performance in Final Cut is insane!",
        sentiment: 'positive',
        timestamp: '4 hr ago',
      },
      {
        id: 'm8',
        platform: 'reddit',
        user: 'u/privacy_matters',
        content:
          "Apple's privacy features are the main reason I stay in the ecosystem.",
        sentiment: 'positive',
        timestamp: '5 hr ago',
      },
      {
        id: 'm9',
        platform: 'x.com',
        user: '@mobilenews',
        content: 'iOS 18 update rolling out today. Checking patch notes now.',
        sentiment: 'neutral',
        timestamp: '6 hr ago',
      },
      {
        id: 'm10',
        platform: 'tiktok',
        user: '@techtoker',
        content: 'Apple repair costs are ridiculous. $800 for a screen??',
        sentiment: 'negative',
        timestamp: '7 hr ago',
      },
    ],
  },
  {
    id: '2',
    name: 'Elon Musk',
    type: 'person',
    platforms: ['x.com', 'reddit', 'tiktok'],
    createdAt: '2024-02-20',
    status: 'ready',
    sentimentSummary: { positive: 38, neutral: 22, negative: 40 },
    trends: [
      { date: '2024-12-17', positive: 35, neutral: 25, negative: 40 },
      { date: '2024-12-18', positive: 40, neutral: 22, negative: 38 },
      { date: '2024-12-19', positive: 42, neutral: 20, negative: 38 },
      { date: '2024-12-20', positive: 36, neutral: 24, negative: 40 },
      { date: '2024-12-21', positive: 34, neutral: 23, negative: 43 },
      { date: '2024-12-22', positive: 37, neutral: 21, negative: 42 },
      { date: '2024-12-23', positive: 38, neutral: 22, negative: 40 },
    ],
    mentions: [
      {
        id: 'm1',
        platform: 'x.com',
        user: '@spacefan',
        content:
          'SpaceX Starship launch was incredible! The future of space travel.',
        sentiment: 'positive',
        timestamp: '5 min ago',
      },
      {
        id: 'm2',
        platform: 'reddit',
        user: 'u/evdriver',
        content:
          'Tesla service centers are a nightmare. 6 weeks for a simple fix.',
        sentiment: 'negative',
        timestamp: '20 min ago',
      },
      {
        id: 'm3',
        platform: 'tiktok',
        user: '@newstoday',
        content:
          'Another Elon tweet causing stock movement. Interesting times.',
        sentiment: 'neutral',
        timestamp: '45 min ago',
      },
      {
        id: 'm4',
        platform: 'x.com',
        user: '@cryptoking',
        content:
          "Elon's DOGE tweets are getting old. Market manipulation much?",
        sentiment: 'negative',
        timestamp: '1 hr ago',
      },
      {
        id: 'm5',
        platform: 'reddit',
        user: 'u/teslabull',
        content:
          'Model Y is still the best EV on the market. Haters gonna hate.',
        sentiment: 'positive',
        timestamp: '2 hr ago',
      },
    ],
  },
  {
    id: '3',
    name: 'Nike',
    type: 'brand',
    platforms: ['instagram', 'tiktok', 'x.com'],
    createdAt: '2024-03-10',
    status: 'ready',
    sentimentSummary: { positive: 71, neutral: 20, negative: 9 },
    trends: [
      { date: '2024-12-17', positive: 68, neutral: 22, negative: 10 },
      { date: '2024-12-18', positive: 70, neutral: 21, negative: 9 },
      { date: '2024-12-19', positive: 69, neutral: 22, negative: 9 },
      { date: '2024-12-20', positive: 72, neutral: 19, negative: 9 },
      { date: '2024-12-21', positive: 73, neutral: 18, negative: 9 },
      { date: '2024-12-22', positive: 70, neutral: 21, negative: 9 },
      { date: '2024-12-23', positive: 71, neutral: 20, negative: 9 },
    ],
    mentions: [
      {
        id: 'm1',
        platform: 'instagram',
        user: '@sneakerhead',
        content: 'New Jordan drop is fire! Copped a pair immediately.',
        sentiment: 'positive',
        timestamp: '10 min ago',
      },
      {
        id: 'm2',
        platform: 'tiktok',
        user: '@fitnessmom',
        content:
          'Nike leggings are honestly the best for workouts. Super comfortable.',
        sentiment: 'positive',
        timestamp: '30 min ago',
      },
      {
        id: 'm3',
        platform: 'x.com',
        user: '@runningclub',
        content: 'Nike Run Club app update is nice. New features work well.',
        sentiment: 'positive',
        timestamp: '1 hr ago',
      },
    ],
  },
  {
    id: '4',
    name: 'Taylor Swift',
    type: 'person',
    platforms: ['instagram', 'x.com', 'tiktok'],
    createdAt: '2024-01-05',
    status: 'ready',
    sentimentSummary: { positive: 85, neutral: 10, negative: 5 },
    trends: [
      { date: '2024-12-17', positive: 82, neutral: 12, negative: 6 },
      { date: '2024-12-18', positive: 84, neutral: 11, negative: 5 },
      { date: '2024-12-19', positive: 86, neutral: 9, negative: 5 },
      { date: '2024-12-20', positive: 88, neutral: 8, negative: 4 },
      { date: '2024-12-21', positive: 87, neutral: 9, negative: 4 },
      { date: '2024-12-22', positive: 85, neutral: 10, negative: 5 },
      { date: '2024-12-23', positive: 85, neutral: 10, negative: 5 },
    ],
    mentions: [
      {
        id: 'm1',
        platform: 'instagram',
        user: '@swiftie4ever',
        content: 'Eras Tour was the best concert of my life!! Still crying.',
        sentiment: 'positive',
        timestamp: '3 min ago',
      },
      {
        id: 'm2',
        platform: 'tiktok',
        user: '@concertvibes',
        content: "Taylor's new album hints are everywhere. Can't wait!",
        sentiment: 'positive',
        timestamp: '25 min ago',
      },
      {
        id: 'm3',
        platform: 'x.com',
        user: '@musiccritic',
        content:
          'Taylor Swift continues to dominate streaming. Record breaking numbers.',
        sentiment: 'positive',
        timestamp: '1 hr ago',
      },
    ],
  },
]

// Mutable agents store (simulates database)
let agents: Array<AgentWithData> = [...mockAgentsData]

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper to generate random sentiment data
function generateMockSentimentData(platforms: Array<Platform>): {
  sentimentSummary: SentimentSummary
  trends: Array<SentimentTrend>
  mentions: Array<Mention>
} {
  const positive = Math.floor(Math.random() * 40) + 40 // 40-80
  const negative = Math.floor(Math.random() * 20) + 5 // 5-25
  const neutral = 100 - positive - negative

  const sentimentSummary = { positive, neutral, negative }

  // Generate 7 days of trends
  const trends: Array<SentimentTrend> = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    trends.push({
      date: date.toISOString().split('T')[0],
      positive: positive + Math.floor(Math.random() * 10) - 5,
      neutral: neutral + Math.floor(Math.random() * 6) - 3,
      negative: negative + Math.floor(Math.random() * 6) - 3,
    })
  }

  // Generate mock mentions
  const sentiments: Array<Sentiment> = ['positive', 'neutral', 'negative']
  const mentions: Array<Mention> = Array.from({ length: 5 }, (_, i) => ({
    id: `m${i + 1}`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    user: `@user${Math.floor(Math.random() * 1000)}`,
    content: `Sample mention content for this agent. This is mention #${i + 1}.`,
    sentiment: sentiments[Math.floor(Math.random() * 3)],
    timestamp: `${i * 10 + 5} min ago`,
  }))

  return { sentimentSummary, trends, mentions }
}

// API Functions
export async function fetchAgents(): Promise<Array<AgentWithData>> {
  await delay(200)
  return [...agents]
}

export async function fetchAgentById(
  id: string,
): Promise<AgentWithData | undefined> {
  await delay(200)
  return agents.find((agent) => agent.id === id)
}

export async function createAgent(
  input: CreateAgentInput,
): Promise<AgentWithData> {
  await delay(800) // Simulate network delay

  const newAgent: AgentWithData = {
    id: String(Date.now()),
    name: input.name,
    type: input.type,
    platforms: input.platforms as Array<Platform>,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'analyzing',
    sentimentSummary: null,
    trends: [],
    mentions: [],
  }

  agents = [...agents, newAgent]

  // Simulate analysis completion after 3 seconds
  setTimeout(() => {
    const mockData = generateMockSentimentData(newAgent.platforms)
    agents = agents.map((agent) =>
      agent.id === newAgent.id
        ? {
            ...agent,
            status: 'ready' as const,
            ...mockData,
          }
        : agent,
    )
  }, 3000)

  return newAgent
}

// Legacy export for backward compatibility
export const mockAgents = agents
export function getAgentById(id: string): AgentWithData | undefined {
  return agents.find((agent) => agent.id === id)
}

// User data
let currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
}

export async function fetchUser(): Promise<User> {
  await delay(200)
  return { ...currentUser }
}

export async function updateUser(data: Partial<User>): Promise<User> {
  await delay(500)
  currentUser = { ...currentUser, ...data }
  return { ...currentUser }
}

export async function logout(): Promise<void> {
  await delay(300)
  // Mock logout - in real app would clear session/tokens
}
