import Toast, { ToastConfig } from 'react-native-toast-message';
import { IToastProps } from './types';
import { ELocales } from '../../constants/locales';
import { toastConfig } from './helpers';

export class ToastService {
  static get config(): ToastConfig {
    return toastConfig;
  }

  showSuccessToast = ({
    title = ELocales.success,
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: description,
    });
  };

  showErrorToast = ({
    title = ELocales.error,
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: description,
    });
  };
}
