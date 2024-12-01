import { ModelFactory } from 'base/ModelFactory';
import { ChatRepository } from 'modules/Chat/chatRepository';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
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

  createChatMessageModel = (
    author: string,
    message: string,
    id: string,
    color: string,
  ) => {
    return ModelFactory.create(ChatMessage, {
      author,
      message,
      id,
      color,
    });
  };
}
