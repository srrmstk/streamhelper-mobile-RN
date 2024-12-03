import { ModelFactory } from 'base/ModelFactory';
import { EmojiRepository } from 'modules/Emoji/emojiRepository';
import { Emoji } from 'modules/Emoji/models/emoji';
import { EmojiSet } from 'modules/Emoji/types/emojiSet';

export class EmojiService {
  private repository: EmojiRepository;

  constructor() {
    this.repository = new EmojiRepository();
  }

  getSevenTvUserEmojiSet = async (userId: string) => {
    const { data } = await this.repository.getSevenTvUserEmojiSet(userId);

    const emojiSet: EmojiSet = {};

    for (let emote of data.emote_set.emotes) {
      const host = emote.data.host;
      const file = host.files[0];

      const emoji = ModelFactory.create(Emoji, {
        url: `https:${host.url}/${file.name}`,
        height: file.height,
        width: file.width,
      });

      emojiSet[emote.name] = emoji;
    }

    return emojiSet;
  };
}
