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
    const existingSubscriptions = await this.getSubscriptions();

    if (existingSubscriptions.length > 0) {
      for (let sub of existingSubscriptions) {
        try {
          this.deleteSubscription(sub.id);
        } catch (e) {
          /* empty */
        }
      }
    }

    const { data } = await this.repository.createSubscription(dto);
    return data;
  };

  getSubscriptions = async () => {
    const { data } = await this.repository.getSubscriptions();
    return data.data;
  };

  deleteSubscription = async (id: string) => {
    await this.repository.deleteSubscription(id);
  };

  createChatMessageModel = (
    authorId: string,
    author: string,
    message: string,
    id: string,
    color: string,
  ) => {
    return ModelFactory.create(ChatMessage, {
      authorId,
      author,
      message,
      id,
      color,
    });
  };

  deleteMessage = async (userId: string, messageId: string) => {
    await this.repository.deleteMessage(userId, messageId);
  };
}
