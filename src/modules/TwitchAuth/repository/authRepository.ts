import AbstractRepository from '../../../base/AbstractRepository';
import { NativeModules } from 'react-native';
import { CONFIG } from '../../../constants/config';
import TwitchAxios from '../client';

const IntentModule = NativeModules.IntentModule;

const { TWITCH_CLIENT_ID } = CONFIG;

export class AuthRepository extends AbstractRepository<typeof TwitchAxios> {
  constructor() {
    super(TwitchAxios);
  }

  auth = (uri: string): Promise<string> => {
    return IntentModule.openIntent(uri);
  };

  logout = (token: string) => {
    return this.client.post({
      url: `https://id.twitch.tv/oauth2/revoke?client_id=${TWITCH_CLIENT_ID}&token=${token}`,
    });
  };

  validateToken = () => {
    return this.client.get({
      url: 'https://id.twitch.tv/oauth2/validate',
    });
  };
}
