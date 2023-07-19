'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession({
    required: false,
  });
  console.log({ session, status });

  if (status === 'loading') return <h1>loading...</h1>;

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'></main>
  );
}
