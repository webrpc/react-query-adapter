import React from 'react'
import ReactDOM from 'react-dom/client'
import { WebRpcQueryClientProvider } from 'webrpc-react-query'
import { App }  from './App'
import { rpcQueryClient } from './rpc'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <WebRpcQueryClientProvider client={rpcQueryClient}>
    <App />
  </WebRpcQueryClientProvider>
)
