import { UserService } from './userService';
import { ToastService } from '../Toast/toastService';

export class UserStore {
  private userService: UserService;
  private toastService: ToastService;

  constructor() {
    this.userService = new UserService();
    this.toastService = new ToastService();
  }

  getUser = async () => {
    try {
      return await this.userService.getUser();
    } catch (e) {
      this.toastService.showErrorToast({
        description: e as string,
      });
    }
  };
}
