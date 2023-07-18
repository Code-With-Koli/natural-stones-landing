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
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>Welcome to Natural Stones</h1>
      {status === 'unauthenticated' ? (
        <div>
          <h2>not signed in</h2>
          <button onClick={() => signIn('google')}>sign in with google</button>
        </div>
      ) : (
        <div>
          <h2>welcome to authenticated page {session?.user?.name}</h2>
          <p>you are logged with email: {session?.user?.email}</p>
          <button onClick={() => signOut()}>sing out</button>
        </div>
      )}
    </main>
  );
}
