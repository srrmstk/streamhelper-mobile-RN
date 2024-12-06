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

  getSubscriptions = () => {
    return this.client.get({
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
    });
  };

  deleteSubscription = (id: string) => {
    return this.client.delete({
      url: `https://api.twitch.tv/helix/eventsub/subscriptions?id=${id}`,
    });
  };

  deleteMessage = (userId: string, messageId: string) => {
    return this.client.delete({
      url: `https://api.twitch.tv/helix/moderation/chat?broadcaster_id=${userId}&moderator_id=${userId}&message_id=${messageId}`,
    });
  };
}
