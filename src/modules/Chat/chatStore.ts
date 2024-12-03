import { Dto } from 'base/Dto';
import { LoadingModel } from 'base/LoadingModel';
import { CONFIG } from 'constants/config';
import { makeAutoObservable } from 'mobx';
import { ChatService } from 'modules/Chat/chatService';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';
import { ChatMessage } from 'modules/Chat/models/chatMessage';

const { TWITCH_WS_URL } = CONFIG;

export class ChatStore {
  private service: ChatService;
  loadingModel: LoadingModel;
  ws: WebSocket | null = null;
  isInitialized: boolean = false;
  messages: ChatMessage[] = [];

  constructor() {
    makeAutoObservable(this);

    this.service = new ChatService();
    this.loadingModel = new LoadingModel();
  }

  initWs = () => {
    this.ws = new WebSocket(`${TWITCH_WS_URL}?keepalive_timeout_seconds=30`);
  };

  deinitWs = () => {
    this.ws = null;
  };

  createSubscription = async (userId: string, sessionId: string) => {
    this.loadingModel.setIsLoading(true);

    const dto = Dto.populate(CreateSubscriptionDto, { userId, sessionId });

    try {
      await this.service.createSubscription(dto);
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };

  addMessage = (user: string, message: string, id: string, color: string) => {
    const newMessage = this.service.createChatMessageModel(
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
}
