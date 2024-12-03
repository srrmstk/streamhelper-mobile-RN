import AbstractRepository from 'base/AbstractRepository';
import TwitchAxios from 'modules/TwitchAuth/client/index';

export class EmojiRepository extends AbstractRepository {
  private twitchClient = TwitchAxios;

  getSevenTvUserEmojiSet = (userId: string) => {
    return this.client.get({
      url: `https://7tv.io/v3/users/twitch/${userId}`,
    });
  };

  getTwitchGlobalEmojiSet = () => {
    return this.twitchClient.get({
      url: 'https://api.twitch.tv/helix/chat/emotes/global',
    });
  };

  getTwitchUserEmojiSet = (userId: string) => {
    return this.twitchClient.get({
      url: `https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${userId}`,
    });
  };
}
