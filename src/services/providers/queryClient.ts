import appConfig from "@/appConfig";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";

const {graphqlCmsUrl} = appConfig

const defaultQueryClientConfig = {
  defaultOptions: {
    queries: {
      suspense: false,
      retry: 3,
      useErrorBoundary: false,
    },
  },
};

export const queryClient = new QueryClient({
  ...defaultQueryClientConfig,
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('🚀 An error ocurred!');
    },
  }),
});

export const getGraphQLClient = (url: string):GraphQLClient => {
  if (!url) {
    throw new Error(`Hey ⚠️ No graphql api URL was given`);
  }

  return new GraphQLClient(url);
};

export const graphQLClient = getGraphQLClient(graphqlCmsUrl);