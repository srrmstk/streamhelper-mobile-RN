import { AxiosClient } from 'base/AxiosClient';
import { CONFIG } from 'constants/config';

const { TWITCH_CLIENT_ID } = CONFIG;

class TwitchAxiosClient extends AxiosClient {
  private static instance: TwitchAxiosClient;

  public static getInstance(): TwitchAxiosClient {
    if (!TwitchAxiosClient.instance) {
      TwitchAxiosClient.instance = new AxiosClient({
        headers: {
          'Client-Id': TWITCH_CLIENT_ID,
        },
      });
    }

    return TwitchAxiosClient.instance;
  }
}

export default TwitchAxiosClient.getInstance();
