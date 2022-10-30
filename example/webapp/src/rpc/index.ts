import { Example } from './client.gen'
import { WebRpcQueryClient } from 'webrpc-react-query'

export * from './client.gen'

const _fetch = (a, b) => window.fetch(a, b)

export const rpcClient = new Example('http://localhost:4242', _fetch)

export const rpcQueryClient = new WebRpcQueryClient(rpcClient)
