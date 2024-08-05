import AbstractRepository from '../../../base/AbstractRepository';
import { NativeModules } from 'react-native';
import { CONFIG } from '../../../constants/config';

const IntentModule = NativeModules.IntentModule;

const { TWITCH_CLIENT_ID } = CONFIG;

export class AuthRepository extends AbstractRepository {
  auth = (uri: string): Promise<string> => {
    return IntentModule.openIntent(uri);
  };

  logout = (token: string) => {
    return this.client.post({
      url: `https://id.twitch.tv/oauth2/revoke?client_id=${TWITCH_CLIENT_ID}&token=${token}`,
    });
  };
}
