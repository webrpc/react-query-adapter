@webrpc/react-query -- a react-query adapter for webrpc
=======================================================

Enjoy the RPC code-gen ergonomics + type-safety benefits of webrpc, with the comfort
of react-query from your React apps :) 


## Install

From your webapps: `npm install @webrpc/react-query`

As well, make sure you install `@tanstack/react-query` and `react` in your app, which are
peer-dependencies of this library.


## Example

Please see a full example project with both server and client [here](./example).

To run the example:

1. git clone this repo
2. `cd example/webapp`
3. `pnpm install`
4. Start the server -- in one terminal: `make run-server`
5. Start the webapp -- in another terminal: `make run-webapp`
6. Open the webapp at http://localhost:4444 and open your browser console


## How to use

First, you'll need a webrpc schema definition either in JSON or RIDL.

Then create an instance of your RPC client and pass it as an argument to the WebRpcClient constructor.
It should look something like this:

```ts
import { Example } from './client.gen'
import { WebRpcQueryClient } from '@webrpc/react-query'

const rpc = new Example('http://localhost:4242', fetch)
const client = new WebRpcQueryClient(rpc)
```

Import `client` where you need to make your API calls and let type inference guide your way!


## Differentiating queries and mutations

If you want to make the distinction between a query and a mutation even clearer, you can define custom _query prefixes_.
You do so by adding a generic type to your `WebRpcClient` instance.

```ts
import { Example } from './client.gen'
import { WebRpcQueryClient } from '@webrpc/react-query'

const rpc = new Example('http://localhost:4242', fetch)
const client = new WebRpcQueryClient<typeof rpc, ['get', 'list']>(rpc)
```

With this configuration, you can only use `client.useQuery` hook with paths that start with either `'get'` or `'list'`.

Any other method from your contract will be considered a _mutation_. If you choose not to provide _query prefixes_, you will be able to call both `client.useQuery` and `client.useMutation` with any path from your contract.


## Local dev

You can update `example/webapp/package.json` package to `"@webrpc/react-query": "workspace:../../"`
which will use the build from the local repo.


## Credits

Thank you to @vojoup from the github.com/golang-cz team for the idea and original implementation of this library :)


## LICENSE

Licensed under [MIT License](./LICENSE)
