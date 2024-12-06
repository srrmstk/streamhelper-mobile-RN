import { CONFIG } from 'constants/config';

const { TWITCH_CLIENT_ID, TWITCH_AUTH_URL, REDIRECT_URI } = CONFIG;

export const getAuthUri = () => {
  const scopes = [
    'channel:manage:broadcast',
    'channel:manage:polls',
    'channel:manage:predictions',
    'user:read:chat',
    'user:write:chat',
    'moderator:manage:banned_users',
    'moderator:manage:chat_messages',
    'moderation:read',
  ];

  return `${TWITCH_AUTH_URL}?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${scopes.join(
    '+',
  )}`;
};
