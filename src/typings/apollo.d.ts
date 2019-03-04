/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="apollo-cache-inmemory" />
/// <reference types="rapollo-client" />
/// <reference types="next" />
/// <reference types="next/app" />

declare interface IApolloContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

declare interface IAppContext {
  ctx: NextContext & IApolloContext;
}

/**
 * A React.FunctionComponent with getInitialProps
 */
declare interface StatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: NextContext & IApolloContextany) => Promise<P>;
}
