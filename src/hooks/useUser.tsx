import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { data: session, status } = useSession({
    required: false,
  });

  switch (status) {
    case 'loading':
      return setIsLoading(true);
    case 'authenticated':
      return setIsAuthenticated(true);
    case 'unauthenticated':
      return setIsAuthenticated(false);
    default:
      break;
  }

  return {
    user: session,
    isLoading,
    isAuthenticated,
  };
};

export default useUser;
