import { EmojiRepository } from 'modules/Emoji/emojiRepository';
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
      emojiSet[emote.name] = `https:${host.url}/${host.files[0].name}`;
    }

    return emojiSet;
  };
}
