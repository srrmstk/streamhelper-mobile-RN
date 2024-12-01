import React from 'react';

import { ChatStore } from 'modules/Chat/chatStore';

import { AuthStore } from '../TwitchAuth/authStore';
import { UserStore } from '../User/userStore';
class RootStore {
  authStore = new AuthStore();
  userStore = new UserStore();
  chatStore = new ChatStore();
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
