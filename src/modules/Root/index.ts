import React from 'react';
import { AuthStore } from '../Auth/authStore';
class RootStore {
  authStore = new AuthStore();
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
