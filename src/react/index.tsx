import { ReactNode } from 'react'
import { ApiTemplate, WebRpcClient } from '../client/client'
import { QueryClientProvider } from '@tanstack/react-query'

export const WebRpcClientProvider = <Api extends ApiTemplate>(props: {
  client: WebRpcClient<Api>
  children: ReactNode
}) => (
  <QueryClientProvider client={props.client.queryClient}>
    {props.children}
  </QueryClientProvider>
)
