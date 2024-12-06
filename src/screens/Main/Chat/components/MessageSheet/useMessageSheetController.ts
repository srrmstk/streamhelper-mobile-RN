import { useRootStore } from 'hooks/useRootStore';
import { TSelectedMessage } from 'screens/Main/Chat/types';

type TBanProps = {
  reason?: string;
  duration?: number;
};

export const useMessageSheetController = (message?: TSelectedMessage) => {
  const { chatStore, userStore } = useRootStore();

  const banUser = async (data?: TBanProps) => {
    if (!message?.userData.id) {
      return;
    }

    await userStore.banUser(message.userData.id, data?.reason, data?.duration);
  };

  const unbanUser = async () => {
    if (!message?.userData.id) {
      return;
    }

    await userStore.unbanUser(message.userData.id);
  };

  const deleteMessage = async () => {
    if (!message?.messageData?.id) {
      return;
    }

    await chatStore.deleteMessage(message?.messageData?.id);
  };

  return {
    banUser,
    unbanUser,
    deleteMessage,
  };
};
