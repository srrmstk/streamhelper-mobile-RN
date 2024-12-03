import i18next from 'i18next';
import Toast, { ToastConfig } from 'react-native-toast-message';

import { toastConfig } from './helpers';
import { IToastProps } from './types';

export class ToastService {
  static get config(): ToastConfig {
    return toastConfig;
  }

  showSuccessToast = ({
    title = i18next.t('success'),
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: description,
    });
  };

  showErrorToast = ({
    title = i18next.t('error'),
    description = '',
  }: IToastProps) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: description,
    });
  };
}
