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

const { TWITCH_WS_URL } = CONFIG;

export class ChatStore {
  private service: ChatService;
  private toastService: ToastService;
  private userStore: UserStore;
  loadingModel: LoadingModel;
  ws: WebSocket | null = null;
  isConnected: boolean = false;
  messages: ChatMessage[] = [];

  constructor(userStore: UserStore) {
    makeAutoObservable(this);

    this.service = new ChatService();
    this.toastService = new ToastService();
    this.loadingModel = new LoadingModel();

    this.userStore = userStore;
  }

  connect = async () => {
    if (this.isConnected) {
      return;
    }

    try {
      this.isConnected = true;
      this.ws = new WebSocket(`${TWITCH_WS_URL}?keepalive_timeout_seconds=30`);
      this.initListeners();
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      this.isConnected = false;
    }
  };

  getChatUser = async (userId: string) => {
    try {
      return this.service.getChatUser(userId);
    } catch {
      this.toastService.showErrorToast({});
    }
  };

  setMessages = (newMessages: ChatMessage[]) => {
    this.messages = newMessages;
  };

  initListeners = () => {
    if (this.isConnected && this.ws) {
      this.ws.onopen = () => {
        this.onOpen();
      };

      this.ws.onmessage = e => {
        const data = JSON.parse(e.data);
        this.onMessage(data);
      };

      this.ws.onerror = e => {
        this.onError(e);
      };

      this.ws.onclose = e => {
        this.onClose(e);
      };
    }
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

  private onOpen = () => {
    this.isConnected = true;
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

  private onError = (e: WebSocketErrorEvent) => {
    // eslint-disable-next-line
    console.log('error', e);
    this.toastService.showErrorToast({
      description: LOCALES.ChatConnectionError,
    });
  };

  private onClose = (e: WebSocketCloseEvent) => {
    // eslint-disable-next-line
    console.log('close', e);
    this.ws = null;
    this.isConnected = false;
  };
}
