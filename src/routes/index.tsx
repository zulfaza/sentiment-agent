import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { AgentList } from '@/components/agent-list'
import { AgentHeader } from '@/components/agent-header'
import { SentimentStats } from '@/components/sentiment-stats'
import { SentimentChart } from '@/components/sentiment-chart'
import { RecentMentions } from '@/components/recent-mentions'
import { NewAgentModal } from '@/components/new-agent-modal'
import { Button } from '@/components/ui/button'
import { useAgents, useAgent, useCreateAgent } from '@/lib/queries'
import type { CreateAgentInput } from '@/lib/data'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: agents = [], isLoading: agentsLoading } = useAgents()
  const { data: selectedAgent } = useAgent(selectedId)
  const createAgentMutation = useCreateAgent()

  const handleSelectAgent = (id: string) => {
    setSelectedId(id)
  }

  const handleBack = () => {
    setSelectedId(null)
  }

  const handleCreateAgent = async (data: CreateAgentInput) => {
    try {
      const newAgent = await createAgentMutation.mutateAsync(data)
      setSelectedId(newAgent.id)
      setIsModalOpen(false)
      toast.success('Agent created! Analyzing sentiment...')
    } catch {
      toast.error('Failed to create agent')
    }
  }

  if (agentsLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading agents...</p>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* Agent List - hidden on mobile when agent is selected */}
      <div
        className={selectedId ? 'hidden md:block' : 'block w-full md:w-auto'}
      >
        <AgentList
          agents={agents}
          selectedId={selectedId}
          onSelect={handleSelectAgent}
        />
      </div>

      {/* Main Content - hidden on mobile when no agent selected */}
      <div
        className={`flex-1 overflow-y-auto ${selectedId ? 'block' : 'hidden md:block'}`}
      >
        {selectedAgent ? (
          <>
            <AgentHeader
              agent={selectedAgent}
              onNewAgent={() => setIsModalOpen(true)}
              onBack={handleBack}
            />
            <div className="space-y-6 p-4 md:p-6">
              <SentimentStats
                summary={selectedAgent.sentimentSummary}
                trends={selectedAgent.trends}
                isAnalyzing={selectedAgent.status === 'analyzing'}
              />
              <SentimentChart
                trends={selectedAgent.trends}
                isAnalyzing={selectedAgent.status === 'analyzing'}
              />
              <RecentMentions
                mentions={selectedAgent.mentions}
                isAnalyzing={selectedAgent.status === 'analyzing'}
              />
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <p className="text-muted-foreground">No agent selected</p>
            <p className="text-sm text-muted-foreground">
              Select an agent from the list to view sentiment analysis details
            </p>
          </div>
        )}
      </div>

      {/* Floating New Agent button for mobile */}
      <Button
        className="fixed bottom-20 right-4 md:hidden"
        onClick={() => setIsModalOpen(true)}
      >
        + New Agent
      </Button>

      <NewAgentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateAgent}
        isPending={createAgentMutation.isPending}
      />
    </div>
  )
}
