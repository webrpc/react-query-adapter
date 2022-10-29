import { Example } from './client.gen'
import { WebRpcQueryClient, WebRpcQueryClientProvider } from './rq'


const _fetch = (a, b) => window.fetch(a, b)
const exampleRpc = new Example('http://localhost:4242', _fetch)

export const client = new WebRpcQueryClient(exampleRpc)
