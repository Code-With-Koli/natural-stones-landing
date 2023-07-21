
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://strapi-ts-blog-production.up.railway.app/graphql",
  documents: ['src/services/graphql/**/*.graphql'],
  ignoreNoDocuments: true, 
  generates: {
    "src/services/generated/graphql.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: "graphql-request",
        omitOperationSuffix: true,
        addInfiniteQuery: true,
        exposeFetcher: true,
        exposeQueryKeys: true
      },
    }
  }
};

export default config;
