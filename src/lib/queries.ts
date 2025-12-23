import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import {
  fetchAgents,
  fetchAgentById,
  createAgent,
  type CreateAgentInput,
  type AgentWithData,
} from './data'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgents,
  })
}

export function useAgent(id: string | null) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgentById(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      // Poll every 1s while analyzing
      return query.state.data?.status === 'analyzing' ? 1000 : false
    },
    select: (data) => {
      // When agent becomes ready, update it in the agents list cache
      if (data?.status === 'ready') {
        queryClient.setQueryData<AgentWithData[]>(['agents'], (oldAgents) => {
          if (!oldAgents) return oldAgents
          return oldAgents.map((agent) => (agent.id === data.id ? data : agent))
        })
      }
      return data
    },
  })
}

export function useCreateAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateAgentInput) => createAgent(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] })
    },
  })
}
