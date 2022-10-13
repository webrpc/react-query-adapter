import {
  QueryClient,
  QueryClientConfig,
  QueryKey,
  useMutation as __useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery as __useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { Awaited } from 'types/utility'

export interface ApiTemplate {
  [methodName: string]: any
}
interface WebRPCError extends Error {
  readonly code: string
  readonly msg: string
  readonly status: number
}

// type ExtractKeys<Config extends ApiTemplate['query' | 'mutation']> = {
//   [MethodName in keyof Config]-?: Config[MethodName] extends Function ? MethodName : never
// }[keyof Config]
type ExtractKeys<Config extends ApiTemplate> = {
  [MethodName in keyof Config]-?: Config[MethodName] extends Function
    ? MethodName
    : never
}[keyof Config]
type QueryNameTemplates<Prefixes extends string[]> = {
  [Prefix in keyof Prefixes]: `${Prefixes[Prefix]}${string}`
}
type QueryPaths<
  Contract extends ApiTemplate,
  Prefixes extends string[] = [],
> = {
  [Query in keyof Contract]-?: Query extends QueryNameTemplates<Prefixes>
    ? Contract[Query] extends Function
      ? Query
      : never
    : never
}[keyof Contract]
type ClientQueries<Contract extends ApiTemplate, Prefixes extends string[]> = {
  [Query in QueryPaths<Contract, Prefixes>]: {
    args: Parameters<Contract[Query]>[0]
    headers: Parameters<Contract[Query]>[1]
    response: ReturnType<Contract[Query]>
    awaitedResponse: Awaited<ReturnType<Contract[Query]>>
  }
}
type MutationPaths<Contract extends ApiTemplate> = Exclude<
  ExtractKeys<Contract>,
  QueryPaths<Contract>
>
type ClientMutations<Contract extends ApiTemplate> = {
  [Mutation in MutationPaths<Contract>]: {
    args: Parameters<Contract[Mutation]>[0]
    headers: Parameters<Contract[Mutation]>[1]
    response: ReturnType<Contract[Mutation]>
    awaitedResponse: Awaited<ReturnType<Contract[Mutation]>>
  }
}
type inferHandlerInput<TProcedure extends ApiTemplate[string]> =
  TProcedure extends (args: infer TInput, headers?: any) => Promise<any>
    ? undefined extends TInput // ? is input optional
      ? unknown extends TInput // ? is input unset
        ? null | undefined // -> there is no input
        : TInput | null | undefined // -> there is optional input
      : TInput // -> input is required
    : undefined | null // -> there is no input

export class WebRpcClient<
  Api extends ApiTemplate,
  QueryPrefixes extends string[] = [],
> {
  public queryClient: QueryClient

  private contract: Api

  constructor(contract: Api, queryClientConfig?: QueryClientConfig) {
    this.queryClient = new QueryClient(queryClientConfig)
    this.contract = contract
  }

  public useQuery<
    TPath extends QueryPaths<Api, QueryPrefixes> & string,
    TQueryOutput extends ClientQueries<
      Api,
      QueryPrefixes
    >[TPath]['awaitedResponse'],
    TQueryInput extends inferHandlerInput<Api[TPath]>,
  >(
    pathAndInput: [path: TPath, args: TQueryInput],
    opts?: UseQueryOptions<TQueryOutput, WebRPCError>,
  ) {
    const [path, args] = pathAndInput
    const endpoint = this.contract[path]

    return __useQuery(pathAndInput as QueryKey, () => endpoint(args), opts)
  }

  public useMutation<
    TPath extends MutationPaths<Api> & string,
    TMutationOutput extends ClientMutations<Api>[TPath]['awaitedResponse'],
    TMutationInput extends inferHandlerInput<Api[TPath]>,
  >(
    path: [TPath] | TPath,
    opts?: UseMutationOptions<TMutationOutput, WebRPCError, TMutationInput>,
  ): UseMutationResult<TMutationOutput, WebRPCError, TMutationInput> {
    const actualPath = Array.isArray(path) ? path[0] : path
    const endpoint = this.contract[actualPath]

    return __useMutation((input: TMutationInput) => {
      return endpoint(input)
    }, opts)
  }
}
