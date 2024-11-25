import AbstractRepository from '../../base/AbstractRepository';
import TwitchAxios from '../TwitchAuth/client';

export class UserRepository extends AbstractRepository {
  constructor() {
    super(TwitchAxios);
  }

  getUser = () => {
    return this.client.get({
      url: 'https://api.twitch.tv/helix/users',
    });
  };
}
