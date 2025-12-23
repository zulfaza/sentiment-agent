import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { createAgent, fetchAgentById, fetchAgents } from './data'
import type { CreateAgentInput } from './data'

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
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgentById(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      // Poll every 1s while analyzing
      return query.state.data?.status === 'analyzing' ? 1000 : false
    },
  })
}

export function useCreateAgent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateAgentInput) => createAgent(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['agents'] })
    },
  })
}
