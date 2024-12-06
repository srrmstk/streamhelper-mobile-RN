import { LOCALES } from 'constants/locales';
import Toast, { ToastConfig } from 'react-native-toast-message';

import { toastConfig } from './helpers';
import { IToastProps } from './types';

export class ToastService {
  static get config(): ToastConfig {
    return toastConfig;
  }

  showSuccessToast = (props?: IToastProps) => {
    Toast.show({
      type: 'success',
      text1: props?.title ?? LOCALES.Success,
      text2: props?.description ?? '',
    });
  };

  showErrorToast = (props?: IToastProps) => {
    Toast.show({
      type: 'error',
      text1: props?.title ?? LOCALES.Error,
      text2: props?.description ?? '',
    });
  };
}
