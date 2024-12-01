import { Dto } from 'base/Dto';
import { LoadingModel } from 'base/LoadingModel';
import { CONFIG } from 'constants/config';
import { makeAutoObservable } from 'mobx';
import { ChatService } from 'modules/Chat/chatService';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';

const { TWITCH_WS_URL } = CONFIG;

export class ChatStore {
  private service: ChatService;
  loadingModel: LoadingModel;
  ws: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this);

    this.service = new ChatService();
    this.loadingModel = new LoadingModel();
  }

  initWs = () => {
    this.ws = new WebSocket(`${TWITCH_WS_URL}?keepalive_timeout_seconds=30`);
  };

  createSubscription = async (userId: string, sessionId: string) => {
    this.loadingModel.setIsLoading(true);

    const dto = Dto.populate(CreateSubscriptionDto, { userId, sessionId });

    try {
      await this.service.createSubscription(dto);
    } catch (e) {
      console.log({ e });
    } finally {
      this.loadingModel.setIsLoading(false);
    }
  };
}
