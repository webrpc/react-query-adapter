import {
  CancelOptions,
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  QueryClientConfig,
  QueryFilters,
  QueryKey,
  SetDataOptions,
  Updater,
  useMutation as __useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery as __useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { Awaited } from "../types/utility";

export interface ApiTemplate {
  [methodName: string]: any;
}

interface WebRPCError extends Error {
  readonly code: string;
  readonly msg: string;
  readonly status: number;
}

type ExtractKeys<Config extends ApiTemplate> = {
  [MethodName in keyof Config]-?: Config[MethodName] extends Function
    ? MethodName
    : never;
}[keyof Config];
type QueryNameTemplates<Prefixes extends string[]> = Prefixes extends []
  ? string
  : {
      [Prefix in keyof Prefixes]: `${Prefixes[Prefix]}${string}`;
    }[number];
type QueryPaths<Contract extends ApiTemplate, Prefixes extends string[]> = {
  [QueryName in keyof Contract]-?: QueryName extends QueryNameTemplates<Prefixes>
    ? Contract[QueryName] extends Function
      ? QueryName
      : never
    : never;
}[keyof Contract];
type ClientQueries<Contract extends ApiTemplate, Prefixes extends string[]> = {
  [Query in QueryPaths<Contract, Prefixes>]: {
    args: Parameters<Contract[Query]>[0];
    headers: Parameters<Contract[Query]>[1];
    response: ReturnType<Contract[Query]>;
    awaitedResponse: Awaited<ReturnType<Contract[Query]>>;
  };
};
type MutationPaths<
  Contract extends ApiTemplate,
  QueryPrefixes extends string[]
> = Exclude<ExtractKeys<Contract>, QueryPaths<Contract, QueryPrefixes>>;
type ClientMutations<
  Contract extends ApiTemplate,
  QueryPrefixes extends string[]
> = {
  [Mutation in MutationPaths<Contract, QueryPrefixes>]: {
    args: Parameters<Contract[Mutation]>[0];
    headers: Parameters<Contract[Mutation]>[1];
    response: ReturnType<Contract[Mutation]>;
    awaitedResponse: Awaited<ReturnType<Contract[Mutation]>>;
  };
};
type inferHandlerInput<TProcedure extends ApiTemplate[string]> =
  TProcedure extends (args: infer TInput, headers?: any) => Promise<any>
    ? undefined extends TInput // ? is input optional
      ? unknown extends TInput // ? is input unset
        ? null | undefined // -> there is no input
        : TInput | null | undefined // -> there is optional input
      : TInput // -> input is required
    : undefined | null; // -> there is no input

export class WebRpcClient<
  Api extends ApiTemplate,
  QueryPrefixes extends string[] = []
> {
  public queryClient: QueryClient;

  private contract: Api;

  constructor(contract: Api, queryClientConfig?: QueryClientConfig) {
    this.queryClient = new QueryClient(queryClientConfig);
    this.contract = contract;
  }

  public useQuery<
    TPath extends QueryPaths<Api, QueryPrefixes> & string,
    TQueryOutput extends ClientQueries<
      Api,
      QueryPrefixes
    >[TPath]["awaitedResponse"],
    TQueryInput extends inferHandlerInput<Api[TPath]>
  >(
    pathAndInput: [path: TPath, args: TQueryInput],
    opts?: UseQueryOptions<TQueryOutput, WebRPCError>
  ) {
    const [path, args] = pathAndInput;
    const endpoint = this.contract[path];

    return __useQuery(pathAndInput as QueryKey, () => endpoint(args), opts);
  }

  public useMutation<
    TPath extends MutationPaths<Api, QueryPrefixes> & string,
    TMutationOutput extends ClientMutations<
      Api,
      QueryPrefixes
    >[TPath]["awaitedResponse"],
    TMutationInput extends inferHandlerInput<Api[TPath]>
  >(
    path: [TPath] | TPath,
    opts?: UseMutationOptions<TMutationOutput, WebRPCError, TMutationInput>
  ): UseMutationResult<TMutationOutput, WebRPCError, TMutationInput> {
    const actualPath = Array.isArray(path) ? path[0] : path;
    const endpoint = this.contract[actualPath];

    return __useMutation((input: TMutationInput) => {
      return endpoint(input);
    }, opts);
  }

  public invalidateQueries<
    TPath extends MutationPaths<Api, QueryPrefixes> & string,
    TQueryInput extends inferHandlerInput<Api[TPath]>
  >(
    filters: InvalidateQueryFilters & { queryKey: [TPath, TQueryInput] },
    options?: InvalidateOptions
  ) {
    return this.queryClient.invalidateQueries(filters, options);
  }

  public getQueryData<
    TPath extends QueryPaths<Api, QueryPrefixes> & string,
    TQueryInput extends inferHandlerInput<Api[TPath]>,
    TQueryOutput extends ClientQueries<
      Api,
      QueryPrefixes
    >[TPath]["awaitedResponse"]
  >(queryKey: [[TPath, TQueryInput]], filters?: QueryFilters) {
    return this.queryClient.getQueryData<TQueryOutput>(queryKey, filters);
  }

  public setQueryData<
    TPath extends QueryPaths<Api, QueryPrefixes> & string,
    TQueryInput extends inferHandlerInput<Api[TPath]>,
    TQueryOutput extends ClientQueries<
      Api,
      QueryPrefixes
    >[TPath]["awaitedResponse"]
  >(
    queryKey: [[TPath, TQueryInput]],
    updater: Updater<TQueryInput | undefined, TQueryOutput | undefined>,
    options?: SetDataOptions
  ) {
    return this.queryClient.setQueryData(queryKey, updater, options);
  }

  public cancelQueries<
    TPath extends QueryPaths<Api, QueryPrefixes> & string,
    TQueryInput extends inferHandlerInput<Api[TPath]>
  >(
    filters: InvalidateQueryFilters & { queryKey: [TPath, TQueryInput] },
    options?: CancelOptions
  ) {
    return this.queryClient.cancelQueries(filters, options);
  }
}
