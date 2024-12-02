import AbstractRepository from 'base/AbstractRepository';

export class EmojiRepository extends AbstractRepository {
  getSevenTvUserEmojiSet = (userId: string) => {
    return this.client.get({
      url: `https://7tv.io/v3/users/twitch/${userId}`,
    });
  };
}
