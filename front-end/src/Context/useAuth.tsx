import React, { createContext, useEffect, useState } from 'react';
import type { UserProfile } from '../Models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/AuthService';
import { toast } from 'react-toastify';
import axios from 'axios';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await registerAPI(email, username, password);
      if (response) {
        const { token, username, email } = response?.data;
        console.log('token: ', token);
        console.log('userName: ', username);
        console.log('email: ', email);
        localStorage.setItem('token', token);
        const userObj = {
          username: username,
          email: email,
        };
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token!);
        setUser(userObj!);
        toast.success('Login Success!');
        navigate('/search');
      }
    } catch (e) {
      toast.warning('Server error occurred');
    }
  };

  const loginUser = async (username: string, password: string) => {
    const response = await loginAPI(username, password);

    if (response?.status === 200) {
      const { username: userName, email, token } = response?.data;
      localStorage.setItem('token', token);
      const userObj = {
        username: userName,
        email: email,
      };
      localStorage.setItem('user', JSON.stringify(userObj));

      setToken(token!);
      setUser(userObj!);
      toast.success('Login Success!');
      navigate('/search');
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
