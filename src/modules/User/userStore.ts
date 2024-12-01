import { UserModel } from 'modules/User/models/userModel';

import { UserService } from './userService';
import { ToastService } from '../Toast/toastService';

export class UserStore {
  private userService: UserService;
  private toastService: ToastService;
  user: UserModel | null = null;

  constructor() {
    this.userService = new UserService();
    this.toastService = new ToastService();
  }

  getUser = async () => {
    try {
      this.user = await this.userService.getUser();
      return true;
    } catch (e) {
      this.toastService.showErrorToast({
        description: e as string,
      });
      return false;
    }
  };
}
