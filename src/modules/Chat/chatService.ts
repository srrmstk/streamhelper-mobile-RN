import { ChatRepository } from 'modules/Chat/chatRepository';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';
import TwitchAxios from 'modules/TwitchAuth/client';

export class ChatService {
  private repository: ChatRepository;

  constructor() {
    this.repository = new ChatRepository(TwitchAxios);
  }

  createSubscription = async (dto: CreateSubscriptionDto) => {
    const { data } = await this.repository.createSubscription(dto);
    return data;
  };
}
