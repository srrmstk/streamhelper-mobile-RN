import { LOCALES } from 'constants/locales';
import Toast, { ToastConfig } from 'react-native-toast-message';

import { toastConfig } from './helpers';
import { IToastProps } from './types';

export class ToastService {
  static get config(): ToastConfig {
    return toastConfig;
  }

  showSuccessToast = ({
    title = LOCALES.Success,
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: description,
    });
  };

  showErrorToast = ({
    title = LOCALES.Error,
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: description,
    });
  };
}
