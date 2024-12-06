import { Dto } from 'base/Dto';
import { LoadingModel } from 'base/LoadingModel';
import { LOCALES } from 'constants/locales';
import { BanUserDto } from 'modules/User/dto/banUserDto';
import { UnbanUserDto } from 'modules/User/dto/unbanUserDto';
import { UserModel } from 'modules/User/models/userModel';

import { UserService } from './userService';
import { ToastService } from '../Toast/toastService';

export class UserStore {
  private userService: UserService;
  private toastService: ToastService;
  user: UserModel | null = null;
  loadingModel: LoadingModel;

  constructor() {
    this.userService = new UserService();
    this.toastService = new ToastService();
    this.loadingModel = new LoadingModel();
  }

  getUser = async () => {
    this.loadingModel.setIsLoading(true);

    try {
      this.user = await this.userService.getUser();
      return true;
    } catch (e) {
      this.toastService.showErrorToast({
        description: e as string,
      });
      return false;
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  getUserById = async (id: string) => {
    this.loadingModel.setIsLoading(true);

    try {
      return await this.userService.getUserById(id);
    } catch (e) {
      this.toastService.showErrorToast();
      return false;
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  banUser = async (userId: string, reason?: string, duration?: number) => {
    const dto = Dto.populate(BanUserDto, {
      broadcasterId: this.user?.id,
      userId,
      reason,
      duration,
    });

    this.loadingModel.setIsLoading(true);

    try {
      await this.userService.banUser(dto);

      this.toastService.showSuccessToast({
        description: duration
          ? LOCALES.SuccessfullyTimedOut
          : LOCALES.SuccessfullyBanned,
      });
    } catch (e) {
      this.toastService.showErrorToast();
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  unbanUser = async (userId: string) => {
    const dto = Dto.populate(UnbanUserDto, {
      broadcasterId: this.user?.id,
      userId,
    });

    this.loadingModel.setIsLoading(true);

    try {
      await this.userService.unbanUser(dto);

      this.toastService.showSuccessToast({
        description: LOCALES.SuccessfullyUnbanned,
      });
    } catch (e) {
      this.toastService.showErrorToast();
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };
}
