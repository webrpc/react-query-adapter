import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { App }  from './App'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

import { Example } from './client.gen'
// import { WebRpcQueryClient, WebRpcQueryClientProvider } from './rq'

// import { client } from './hmm'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
