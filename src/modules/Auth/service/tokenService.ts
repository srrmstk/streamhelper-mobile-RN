import { TokenApiRepository } from '../repository/tokenApiRepository';
import TokenLocalRepository from '../repository/tokenLocalRepository';

export class TokenService {
  private localRepository: TokenLocalRepository;
  private apiRepository: TokenApiRepository;

  constructor() {
    this.localRepository = new TokenLocalRepository();
    this.apiRepository = new TokenApiRepository();
  }

  saveToken = (token: string) => {
    this.apiRepository.setAccessToken(token);
    return this.localRepository.set(token);
  };

  deleteToken = () => {
    this.apiRepository.clearAccessToken();
    return this.localRepository.removeAll();
  };

  getToken = async (): Promise<string> => {
    const token = await this.localRepository.get();
    this.apiRepository.setAccessToken(token);

    return token;
  };
}
