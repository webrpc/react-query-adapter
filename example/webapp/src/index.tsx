import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import { App }  from './App'

import { Example } from './client.gen'
import { WebRpcQueryClient, WebRpcQueryClientProvider } from './rq'

import { client } from './hmm'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

root.render(
  <WebRpcQueryClientProvider client={client}>
    <App />
  </WebRpcQueryClientProvider>
)
