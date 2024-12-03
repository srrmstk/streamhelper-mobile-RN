import { makeAutoObservable } from 'mobx';
import { EmojiService } from 'modules/Emoji/emojiService';
import { EmojiSet } from 'modules/Emoji/types/emojiSet';

export class EmojiStore {
  private service: EmojiService;

  sevenTvUserSet: EmojiSet = {};
  twitchSet: EmojiSet = {};

  constructor() {
    makeAutoObservable(this);
    this.service = new EmojiService();
  }

  getSevenTvUserEmojiSet = async (userId: string) => {
    const emojiList = await this.service.getSevenTvUserEmojiSet(userId);
    this.setSevenTvUserSet(emojiList);
  };

  getTwitchGlobalSet = async () => {
    const emojiList = await this.service.getTwitchGlobalEmojiSet();
    this.setTwitchGlobalSet(emojiList);
  };

  private setSevenTvUserSet = (emojiList: EmojiSet) => {
    this.sevenTvUserSet = emojiList;
  };

  private setTwitchGlobalSet = (emojiList: EmojiSet) => {
    this.twitchSet = emojiList;
  };
}
