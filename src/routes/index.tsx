import { Link, createFileRoute } from '@tanstack/react-router'
import {
  CaretDownIcon,
  ChartLineUpIcon,
  CheckIcon,
  GlobeIcon,
  LightningIcon,
  RobotIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <RobotIcon className="size-5 text-primary" weight="duotone" />
          <span className="text-sm font-medium">Sentiment Agent</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex h-7 items-center justify-center bg-primary px-2.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Sentiment Analysis
        </Badge>
        <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-5xl">
          Track brand sentiment
          <br />
          across social media
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Monitor what people say about your brand or any public figure across
          X, Instagram, Reddit, and TikTok. Get real-time sentiment analysis
          powered by AI.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex h-9 items-center justify-center bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Start Free
          </Link>
          <a
            href="#pricing"
            className="inline-flex h-9 items-center justify-center border border-border bg-background px-4 text-xs font-medium hover:bg-muted"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: RobotIcon,
    title: 'Brand & Person Tracking',
    description:
      'Create agents to monitor brands, companies, or public figures. Track sentiment for any entity across multiple platforms.',
  },
  {
    icon: GlobeIcon,
    title: 'Multi-Platform Coverage',
    description:
      'Aggregate mentions from X (Twitter), Instagram, Reddit, and TikTok in one unified dashboard.',
  },
  {
    icon: LightningIcon,
    title: 'Real-Time Analysis',
    description:
      'Get instant sentiment classification for every mention. Positive, neutral, or negative—know immediately.',
  },
  {
    icon: ChartLineUpIcon,
    title: 'Trend Visualization',
    description:
      'Track sentiment changes over time with interactive charts. Identify patterns and respond to shifts.',
  },
]

function Features() {
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-medium">How it works</h2>
          <p className="text-muted-foreground">
            Powerful features to understand your brand perception
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon
                  className="mb-2 size-6 text-primary"
                  weight="duotone"
                />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for trying out sentiment tracking',
    features: [
      '1 agent',
      '2 platforms',
      '7-day history',
      'Basic sentiment analysis',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For growing brands and marketers',
    features: [
      '10 agents',
      'All platforms',
      '30-day history',
      'Advanced sentiment analysis',
      'Priority support',
      'Export reports',
      'Custom alerts',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams with custom needs',
    features: [
      'Unlimited agents',
      'All platforms',
      'Unlimited history',
      'API access',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'SSO & security',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-medium">Simple pricing</h2>
          <p className="text-muted-foreground">
            Start free, upgrade when you need more
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? 'ring-2 ring-primary' : ''}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && <Badge>Popular</Badge>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-medium">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckIcon
                        className="size-4 text-primary"
                        weight="bold"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  to="/dashboard"
                  className={cn(
                    'inline-flex h-8 w-full items-center justify-center text-xs font-medium',
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border bg-background hover:bg-muted',
                  )}
                >
                  {plan.cta}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const faqs = [
  {
    question: 'What platforms do you support?',
    answer:
      'We currently support X (formerly Twitter), Instagram, Reddit, and TikTok. We analyze public posts and mentions from these platforms to provide sentiment analysis.',
  },
  {
    question: 'How accurate is the sentiment analysis?',
    answer:
      'Our AI-powered sentiment analysis achieves over 90% accuracy on standard benchmarks. We continuously improve our models based on real-world data and user feedback.',
  },
  {
    question: 'Can I track competitors?',
    answer:
      'Yes! You can create agents for any brand, company, or public figure—including your competitors. This helps you understand market positioning and comparative sentiment.',
  },
  {
    question: 'How often is data updated?',
    answer:
      'Data is updated in near real-time. New mentions are typically processed and analyzed within minutes of being posted on supported platforms.',
  },
  {
    question: 'Can I export my data?',
    answer:
      'Pro and Enterprise plans include export functionality. You can download reports in CSV or PDF format for further analysis or presentations.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer:
      'Yes! You can try Pro features free for 14 days. No credit card required to start.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-medium">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about Sentiment Agent
          </p>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border">
              <button
                className="flex w-full items-center justify-between p-4 text-left text-sm font-medium hover:bg-muted/50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <CaretDownIcon
                  className={cn(
                    'size-4 transition-transform',
                    openIndex === index && 'rotate-180',
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <RobotIcon className="size-4 text-primary" weight="duotone" />
            <span className="text-xs text-muted-foreground">
              Sentiment Agent
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sentiment Agent. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
