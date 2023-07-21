'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { queryClient } from './queryClient';
import NextAuthSessionProvider from './sessionProvider';
import { ThemeProvider } from 'next-themes';

function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthSessionProvider>
        <ThemeProvider attribute='class'>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        </ThemeProvider>
      </NextAuthSessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
