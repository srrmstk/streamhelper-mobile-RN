import AbstractRepository from 'base/AbstractRepository';
import { BanUserDto } from 'modules/User/dto/banUserDto';
import { UnbanUserDto } from 'modules/User/dto/unbanUserDto';

import TwitchAxios from '../TwitchAuth/client';

export class UserRepository extends AbstractRepository {
  constructor() {
    super(TwitchAxios);
  }

  getUser = () => {
    return this.client.get({
      url: 'https://api.twitch.tv/helix/users',
    });
  };

  getUserById = (id: string) => {
    return this.client.get({
      url: `https://api.twitch.tv/helix/users?id=${id}`,
    });
  };

  banUser = ({ userId, reason, duration, broadcasterId }: BanUserDto) => {
    return this.client.post({
      url: `https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${broadcasterId}&moderator_id=${broadcasterId}`,
      data: {
        data: {
          user_id: userId,
          reason,
          duration,
        },
      },
    });
  };

  unbanUser = ({ broadcasterId, userId }: UnbanUserDto) => {
    return this.client.delete({
      url: `https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${broadcasterId}&moderator_id=${broadcasterId}&user_id=${userId}`,
    });
  };
}
