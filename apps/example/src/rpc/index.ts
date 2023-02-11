import { Example } from "./client.gen";
import { WebRpcClient } from "@webrpc/react-query-adapter";

export * from "./client.gen";

const customFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => window.fetch(input, init);

export const rpcClient = new Example("http://localhost:4242", customFetch);

export const rpcQueryClient = new WebRpcClient<
  typeof rpcClient,
  ["get", "find"]
>(rpcClient);
