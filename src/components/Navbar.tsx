'use client';
import { RiSettings5Line } from 'react-icons/ri';
import { BiMailSend } from 'react-icons/bi';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { MdLogin } from 'react-icons/md';
import { BiUser } from 'react-icons/bi';
import { ImSpinner6 } from 'react-icons/im';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { BsFillBagFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import icon96 from '@/assets/png/icon96.png';
import cn from 'classnames';
import { useTheme } from 'next-themes';
import useUser from '@/hooks/useUser';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Popover, Button, Dropdown, MenuProps } from 'antd';

type Props = {};

const ToggleButton = ({ isScrolled }: any) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  console.log({ mounted, resolvedTheme });

  return (
    <button
      title='Toggle Dark Mode'
      aria-label='Toggle Dark Mode'
      type='button'
      className={cn(
        isScrolled ? 'fixed bottom-5 md:top-5 right-4 z-50' : 'relative',
        'w-9 h-9 bg-purple-200 rounded-lg dark:bg-purple-600 flex items-center justify-center  hover:ring-2  dark:rounded-full  transition-all'
      )}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          className={cn(
            isScrolled ? 'absolute' : 'relative',
            'w-5 h-5 text-gray-800 dark:text-gray-200'
          )}
        >
          {resolvedTheme === 'dark' ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
          )}
        </svg>
      )}
    </button>
  );
};

const profileMenuItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'full name',
    icon: <BsFillPersonVcardFill className='text-xl' />,
  },
  {
    key: '2',
    label: 'email',
    icon: <BiMailSend />,
  },
  {
    key: '3',
    label: 'settings',
    icon: <RiSettings5Line />,
  },
  {
    key: '4',
    label: 'Logout',
    icon: <MdLogout onClick={() => signOut()} />,
  },
];

const Navbar = (props: Props) => {
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);

  const closePopover = () => setIsOpenPopover(false);
  const handleOpenChange = (newOpen: boolean) => setIsOpenPopover(newOpen);

  const items = [];
  const { data: session, status } = useSession({
    required: false,
  });

  const userProfileContent = useCallback(() => {
    return (
      <div className='flex flex-col items-start justify-center gap-2 pt-4'>
        <Link
          href={'/profile'}
          className='flex gap-2 items-center'
          onClick={closePopover}
        >
          <BsFillPersonVcardFill className='text-xl' /> Your Profile
        </Link>
        <Link
          href={'/purchase-history'}
          className='flex gap-2 items-center'
          onClick={closePopover}
        >
          <BsFillPersonVcardFill className='text-xl' /> Your Profile
        </Link>
        <Link
          href={'/profile/settings'}
          className='flex gap-2 items-center'
          onClick={closePopover}
        >
          <BsFillPersonVcardFill className='text-xl' /> Your Profile
        </Link>
      </div>
    );
  }, []);

  const userTitle = useCallback(() => {
    return (
      <div className='flex justify-start items-center gap-2'>
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            width={30}
            height={30}
            className='rounded-full'
            alt='current user profile image'
          />
        ) : (
          <BsFillPersonVcardFill className='text-xl' />
        )}
        <p className='m-0 p-0'>{session?.user?.name}</p>
      </div>
    );
  }, [session]);

  const getAuthButton = useCallback(() => {
    switch (status) {
      case 'loading':
        return (
          <button>
            <ImSpinner6 className='animate-spin text-2xl' />
          </button>
        );
      case 'authenticated':
        return (
          <Popover
            content={userProfileContent}
            title={userTitle}
            trigger='click'
            placement='bottomRight'
            open={isOpenPopover}
            onOpenChange={handleOpenChange}
          >
            <Button
              size='large'
              className='bg-purple-200 rounded-lg p-2 dark:bg-purple-400 dark:ring-1 ring-0 dark:border-transparent  hover:ring-2'
              icon={
                <BiUser className='text-xl text-purple-800 dark:text-gray-800' />
              }
            />
          </Popover>
        );
      case 'unauthenticated':
        return (
          <Button
            size='large'
            className='bg-purple-200 rounded-lg p-2 dark:bg-purple-400'
            icon={<MdLogin />}
            onClick={() => signIn('google')}
          >
            Login
          </Button>
        );

        break;

      default:
        break;
    }
  }, [status, isOpenPopover]);

  return (
    <nav className='w-full relative'>
      <div className='max-w-7xl py-2 px-8 lg:px-12 mx-auto hidden sm:flex justify-between items-center'>
        <Link href={'/'}>
          <Image
            src={icon96}
            alt='natural stones icon'
            width={46}
            height={46}
            className='shadow-md shadow-cyan-400 rounded-full p-1'
          />
        </Link>

        <p>Natural Stones</p>

        <div className='flex gap-2 justify-center items-center'>
          <ToggleButton isScrolled={false} />
          <button className='bg-purple-200 rounded-lg p-2 dark:bg-purple-400 dark:ring-1 hover:ring-2'>
            {items.length > 1 ? (
              <BsFillBagHeartFill className='text-2xl' />
            ) : (
              <BsFillBagFill className='text-2xl text-purple-800 dark:text-purple-900' />
            )}
          </button>
          {/* user profile component */}
          <div>{getAuthButton()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
