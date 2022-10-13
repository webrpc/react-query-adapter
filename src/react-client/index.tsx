import { ApiTemplate, WebRpcClient } from '../client/client'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export const WebRpcClientProvider = <
  Api extends ApiTemplate,
  QueryPrefixes extends string[] = [],
>(props: {
  client: WebRpcClient<Api, QueryPrefixes>
  children: React.ReactNode
}) => (
  <QueryClientProvider client={props.client.queryClient}>
    {props.children}
  </QueryClientProvider>
)
