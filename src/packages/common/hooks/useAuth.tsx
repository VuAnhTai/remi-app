import router, { Router } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LocalStorageUtils } from '../utils';
import { ACCESS_TOKEN_KEY, USER_KEY } from '@/env/constants';

type AuthContextType = {
  logout: () => void;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  logout: () => {},
  isAuth: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logout = useCallback(() => {
    LocalStorageUtils.remove(ACCESS_TOKEN_KEY);
    LocalStorageUtils.remove(USER_KEY);
    router.push('/login');
  }, []);

  const isAuth = useMemo(() => !!LocalStorageUtils.get(ACCESS_TOKEN_KEY), []);

  const providerValue = useMemo(
    () => ({
      isAuth,
      logout,
    }),
    [isAuth, logout]
  );

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
