import React from 'react';
import { AuthStore } from '../TwitchAuth/authStore';
import { UserStore } from '../User/userStore';
class RootStore {
  authStore = new AuthStore();
  userStore = new UserStore();
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
