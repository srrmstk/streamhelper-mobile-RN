import AbstractRepository from 'base/AbstractRepository';
import { CreateSubscriptionDto } from 'modules/Chat/dto/createSubscriptionDto';

export class ChatRepository extends AbstractRepository {
  createSubscription = ({ userId, sessionId }: CreateSubscriptionDto) => {
    return this.client.post({
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      data: {
        type: 'channel.chat.message',
        version: '1',
        condition: {
          broadcaster_user_id: userId,
          user_id: userId,
        },
        transport: {
          method: 'websocket',
          session_id: sessionId,
        },
      },
    });
  };

  getChatUser = (userId: string) => {
    return this.client.get({
      url: `https://api.twitch.tv/helix/users?id=${userId}`,
    });
  };
}
