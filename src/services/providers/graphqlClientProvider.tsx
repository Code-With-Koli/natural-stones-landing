import React, { createContext } from 'react';
import { GraphQLClient } from 'graphql-request';

export type GraphQLClientState = {
  graphQLClient: GraphQLClient;
};

type Props = {
  children: React.ReactNode;
  defaultState?: GraphQLClientState;
};

export type GraphQLClientProviderState = GraphQLClientState | null;

export const GraphQLClientContext =
  createContext<GraphQLClientProviderState>(null);

if (!process.env.NEXT_PUBLIC_CMS_URL) {
  throw new Error(
    `No Graphql URL from CMS setup.Make sure to setup a .env file in the root of the project with NEXT_PUBLIC_CMS_URL variable`
  );
}
const apiUrl: string = `${process.env.NEXT_PUBLIC_CMS_URL}/graphql`;

const initialState: GraphQLClientState = {
  graphQLClient: new GraphQLClient(apiUrl),
};

// eslint-disable-next-line arrow-body-style
export const GraphQLClientProvider = ({ children, defaultState }: Props) => (
  <GraphQLClientContext.Provider value={defaultState || initialState}>
    {children}
  </GraphQLClientContext.Provider>
);
