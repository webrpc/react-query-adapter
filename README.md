# webRPC react-query client

Server synchronization made easy & type-safe!
## How to use

First, you'll need an api contract, ideally in the webRPC format.
Then create an instance of your contract and pass it as an argument to the WebRPCClient constructor.
It should look something like this:

```ts
const ContractInstance = new Chat('hostname', customFetch)
export const client = new WebRpcClient(ContractInstance)
```

Import `client` where you need to make your API calls and let type inference guide your way!

## Differentiating queries and mutations

If you want to make the distinction between a query and a mutation even clearer, you can define custom _query prefixes_.
You do so by adding a generic type to your `WebRpcClient` instance.

```ts
const ContractInstance = new Chat('hostname', fetch)
const client = new WebRpcClient<typeof ContractInstance, ['get', 'list']>(
  ContractInstance,
)
```

With this configuration, you can only use `client.useQuery` hook with paths that start with either `'get'` or `'list'`.
Any other method from your contract will be considered a _mutation_. If you choose not to provide _query prefixes_, you will be able to call both `client.useQuery` and `client.useMutation` with any path from your contract.