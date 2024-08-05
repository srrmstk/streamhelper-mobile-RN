import AbstractRepository from '../../../base/AbstractRepository';

export class TokenApiRepository extends AbstractRepository {
  setAccessToken = (token: string) => {
    this.client.setAccessToken(token);
  };

  clearAccessToken = () => {
    this.client.clearAccessToken();
  };
}
