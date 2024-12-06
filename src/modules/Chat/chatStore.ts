import { Dto } from 'base/Dto';
import { LoadingModel } from 'base/LoadingModel';
import { CONFIG } from 'constants/config';
import i18next from 'i18next';
import { makeAutoObservable } from 'mobx';
import { ChatService } from 'modules/Chat/chatService';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { ToastService } from 'modules/Toast/toastService';

const { TWITCH_WS_URL } = CONFIG;

export class ChatStore {
  private service: ChatService;
  private toastService: ToastService;
  loadingModel: LoadingModel;
  ws: WebSocket | null = null;
  isInitialized: boolean = false;
  messages: ChatMessage[] = [];

  constructor() {
    makeAutoObservable(this);

    this.service = new ChatService();
    this.toastService = new ToastService();
    this.loadingModel = new LoadingModel();
  }

  initWs = () => {
    this.loadingModel.setIsLoading(true);
    this.ws = new WebSocket(`${TWITCH_WS_URL}?keepalive_timeout_seconds=30`);
  };

  deinitWs = () => {
    this.ws = null;
    this.setIsInitialized(false);
    this.loadingModel.setIsLoading(false);
  };

  createSubscription = async (userId: string, sessionId: string) => {
    const dto = Dto.populate(CreateSubscriptionDto, { userId, sessionId });

    try {
      await this.service.createSubscription(dto);
      this.setIsInitialized(true);
      this.toastService.showSuccessToast({
        description: i18next.t('chatConnectionSuccess'),
      });
    } catch (e) {
      /* empty */
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  addMessage = (
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

  setMessages = (newMessages: ChatMessage[]) => {
    this.messages = newMessages;
  };

  setIsInitialized = (value: boolean) => {
    this.isInitialized = value;
  };

  getChatUser = async (userId: string) => {
    try {
      return this.service.getChatUser(userId);
    } catch {
      this.toastService.showErrorToast({});
    }
  };
}
