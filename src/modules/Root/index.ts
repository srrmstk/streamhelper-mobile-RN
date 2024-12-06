import React from 'react';

import { ChatStore } from 'modules/Chat/chatStore';
import { EmojiStore } from 'modules/Emoji/emojiStore';

import { AuthStore } from '../TwitchAuth/authStore';
import { UserStore } from '../User/userStore';

class RootStore {
  authStore = new AuthStore();
  userStore = new UserStore();
  chatStore = new ChatStore(this.userStore);
  emojiStore = new EmojiStore();
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
