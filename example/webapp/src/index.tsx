import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { App }  from './App'

import { WebRpcQueryClientProvider } from 'webrpc-react-query'

import { rpcQueryClient } from './rpc'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   }
// })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

root.render(
  <WebRpcQueryClientProvider client={rpcQueryClient}>
    <App />
  </WebRpcQueryClientProvider>
)
