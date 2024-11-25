import AbstractRepository from '../../../base/AbstractRepository';
import TwitchAxios from '../client';

export class TokenApiRepository extends AbstractRepository {
  constructor() {
    super(TwitchAxios);
  }

  setAccessToken = (token: string) => {
    this.client.setAccessToken(token);
  };

  clearAccessToken = () => {
    this.client.clearAccessToken();
  };
}
