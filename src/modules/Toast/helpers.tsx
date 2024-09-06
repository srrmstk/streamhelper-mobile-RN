import Toast, {
  SuccessToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      style={{
        borderLeftColor: 'green',
        width: '90%',
      }}
      onPress={Toast.hide}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        width: '90%',
      }}
      onPress={Toast.hide}
    />
  ),
};
