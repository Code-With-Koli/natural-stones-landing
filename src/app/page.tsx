'use client';
import {
  GetAllProducts,
  GetAllProductsVariables,
  ProductEntity,
  useGetAllProducts,
} from '@/services/generated/graphql';
import { graphQLClient, queryClient } from '@/services/providers/queryClient';
import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_MINUTE_IN_MILLISECONDS,
  TWO_MINUTES_IN_MILLISECONDS,
} from '@/utils/timeConstants';
import { signIn, signOut, useSession } from 'next-auth/react';
import { dehydrate, useQuery } from '@tanstack/react-query';
import Hero from '@/components/HomeComponents/Hero';
import ProductsCategory from '@/components/HomeComponents/ProductsCategory';
import LimitedProducts from '@/components/HomeComponents/LimitedProducts';

async function getUsers() {
  return await fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
    res.json()
  );
}

const variables: GetAllProductsVariables = {
  pageSize: 50,
};

type Props = {
  products: ProductEntity[];
};

function Home(props: any) {
  console.log('🚀 ~ file: page.tsx:37 ~ Home ~ props:', props);
  const { data: session, status } = useSession({
    required: false,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-all-products'],
    queryFn: () => useGetAllProducts.fetcher(graphQLClient, variables)(),
    suspense: true,
    staleTime: ONE_DAY_IN_MILLISECONDS,
  });
  console.log('demo fetch data', { data, isLoading, error });

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      {/* hero section with carousel Swiperjs */}
      <Hero />

      {/* showcase categories */}
      <ProductsCategory />

      {/* show case limited products aka featured products */}
      <LimitedProducts />
    </main>
  );
}

export default Home;
