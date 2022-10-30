import { Example } from './client.gen'
import { WebRpcQueryClient } from 'webrpc-react-query'


const _fetch = (a, b) => window.fetch(a, b)
const rpc = new Example('http://localhost:4242', _fetch)

export { rpc }

export const client = new WebRpcQueryClient(rpc)
