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

      const emoji = this.makeEmojiModel(
        `https:${host.url}/${file.name}`,
        file.height,
        file.width,
      );

      emojiSet[emote.name] = emoji;
    }

    return emojiSet;
  };

  getTwitchEmojiSet = async (userId: string) => {
    const { data: globalSet } = await this.repository.getTwitchGlobalEmojiSet();
    const { data: userSet } = await this.repository.getTwitchUserEmojiSet(
      userId,
    );
    const emojiSet: EmojiSet = {};

    const template = globalSet.template;

    for (let emote of [...globalSet.data, ...userSet.data]) {
      const id = emote.id;
      const format = emote.format.includes('animated') ? 'animated' : 'static';
      const url = template
        .replace('{{id}}', id)
        .replace('{{format}}', format)
        .replace('{{theme_mode}}', 'light')
        .replace('{{scale}}', '1.0');

      const emoji = this.makeEmojiModel(url, 32, 32);
      emojiSet[emote.name] = emoji;
    }

    return emojiSet;
  };

  private makeEmojiModel = (url: string, height: number, width: number) => {
    return ModelFactory.create(Emoji, {
      url,
      height,
      width,
    });
  };
}
