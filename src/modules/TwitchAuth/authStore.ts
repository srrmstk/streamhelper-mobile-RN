import { AuthService } from './service/authService';
import { LoadingModel } from '../../base/LoadingModel';
import { TokenService } from './service/tokenService';
import { action, makeAutoObservable } from 'mobx';
import { ToastService } from '../Toast/toastService';

export class AuthStore {
  private authService: AuthService;
  private tokenService: TokenService;
  private toastService: ToastService;

  loadingModel = new LoadingModel();
  accessToken: string | null = null;

  constructor() {
    makeAutoObservable(this);

    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.toastService = new ToastService();
  }

  auth = async (uri: string) => {
    this.loadingModel.setIsLoading(true);

    try {
      const token = await this.authService.auth(uri);

      if (token) {
        await this.tokenService.saveToken(token);
        this.accessToken = token;
      }

      return true;
    } catch (e) {
      this.toastService.showErrorToast({});
      return false;
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  logout = async () => {
    this.loadingModel.setIsLoading(true);

    try {
      await this.authService.logout(this.accessToken || '');
      return true;
    } catch (e) {
      this.toastService.showErrorToast({});
      return false;
    } finally {
      action(async () => {
        await this.tokenService.deleteToken();
        this.accessToken = null;

        this.loadingModel.setIsLoading(false);
      });
    }
  };

  setAccessToken = (value: string | null) => {
    this.accessToken = value;
  };

  checkAuth = async () => {
    try {
      const token = await this.tokenService.getToken();

      if (token) {
        this.setAccessToken(token);
      }

      return !!token.trim();
    } catch (e) {
      this.toastService.showErrorToast({});
    }
  };
}