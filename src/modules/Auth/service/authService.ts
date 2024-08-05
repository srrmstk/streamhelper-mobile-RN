import { AuthRepository } from '../repository/authRepository';

export class AuthService {
  repository: AuthRepository;
  constructor() {
    this.repository = new AuthRepository();
  }

  auth = async (uri: string): Promise<string> => {
    const result = await this.repository.auth(uri);
    return result.split('#access_token=')[1].split('&')[0];
  };

  logout = async (token: string) => {
    return await this.repository.logout(token);
  };
}
