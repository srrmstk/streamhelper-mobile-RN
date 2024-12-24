import { Dto } from 'base/Dto';
import { LoadingModel } from 'base/LoadingModel';
import { CONFIG } from 'constants/config';
import { LOCALES } from 'constants/locales';
import { makeAutoObservable } from 'mobx';
import { ChatService } from 'modules/Chat/chatService';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { ToastService } from 'modules/Toast/toastService';
import { UserStore } from 'modules/User/userStore';
import { WebSocketStore } from 'modules/WebSocket/websocketStore';

const { TWITCH_WS_URL } = CONFIG;

export class ChatStore {
  private service: ChatService;
  private toastService: ToastService;
  private userStore: UserStore;
  loadingModel: LoadingModel;
  ws: WebSocketStore;
  messages: ChatMessage[] = [];

  constructor(userStore: UserStore) {
    makeAutoObservable(this);

    this.service = new ChatService();
    this.toastService = new ToastService();
    this.loadingModel = new LoadingModel();

    this.userStore = userStore;
    this.ws = new WebSocketStore({
      onMessage: this.onMessage,
      onError: this.onError,
    });
  }

  connect = () => {
    const url = `${TWITCH_WS_URL}?keepalive_timeout_seconds=30`;
    this.ws.connect(url);
  };

  clearMessages = () => {
    this.setMessages([]);
  };

  deleteMessage = async (messageId: string) => {
    try {
      if (!this.userStore.user?.id) {
        return;
      }

      await this.service.deleteMessage(this.userStore.user?.id, messageId);
      this.markMessageAsDeleted(messageId);

      this.toastService.showSuccessToast({
        description: LOCALES.SuccessfullyDeleted,
      });
    } catch {
      /* empty */
    }
  };

  private setMessages = (newMessages: ChatMessage[]) => {
    this.messages = newMessages;
  };

  private markMessageAsDeleted = (id: string) => {
    const idx = this.messages.findIndex(message => message.id === id);
    const updatedMessage = this.messages.find(message => message.id === id);

    if (idx === -1 || !updatedMessage || updatedMessage.isDeleted) {
      return;
    }

    updatedMessage.isDeleted = true;
    updatedMessage.message += ` - ${LOCALES.Deleted}`;

    this.messages.splice(idx, 1, updatedMessage);
  };

  private createSubscription = async (userId: string, sessionId: string) => {
    const dto = Dto.populate(CreateSubscriptionDto, { userId, sessionId });

    try {
      await this.service.createSubscription(dto);
      this.toastService.showSuccessToast({
        description: LOCALES.ChatConnectionSuccess,
      });
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  private addMessage = (
    authorId: string,
    user: string,
    message: string,
    id: string,
    color: string,
  ) => {
    const newMessage = this.service.createChatMessageModel(
      authorId,
      user,
      message,
      id,
      color,
    );
    const newMessages = [...this.messages, newMessage];
    this.setMessages(newMessages);
  };

  // @TODO: add types for twitch messages
  // eslint-disable-next-line
  private onMessage = (data: any) => {
    const messageType = data?.metadata?.message_type;

    if (messageType === 'session_welcome') {
      const sessionId = data?.payload?.session?.id;

      if (sessionId && this.userStore.user?.id) {
        this.createSubscription(this.userStore.user.id, sessionId);
      }

      return;
    }

    if (messageType === 'notification') {
      const payload = data?.payload?.event;

      this.addMessage(
        payload?.chatter_user_id,
        payload?.chatter_user_name,
        payload?.message?.text,
        payload?.message_id,
        payload?.color,
      );
    }
  };

  private onError = () => {
    this.toastService.showErrorToast({
      description: LOCALES.ChatConnectionError,
    });
  };
}
