import { createElement } from 'react'
import { ApiTemplate, WebRpcQueryClient } from './adapter'
import { QueryClientProvider } from '@tanstack/react-query'

export const WebRpcQueryClientProvider = <
  Api extends ApiTemplate,
  QueryPrefixes extends string[] = [],
>(props: {
  client: WebRpcQueryClient<Api, QueryPrefixes>
  children: React.ReactNode
}) => {
  // <QueryClientProvider client={props.client.queryClient}>
  //   {props.children}
  // </QueryClientProvider>

  return createElement(
    QueryClientProvider,
    { client: props.client.queryClient },
    props.children
  )

}
