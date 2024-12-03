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

  getTwitchSet = async (userId: string) => {
    const emojiList = await this.service.getTwitchEmojiSet(userId);
    this.setTwitchSet(emojiList);
  };

  private setSevenTvUserSet = (emojiList: EmojiSet) => {
    this.sevenTvUserSet = emojiList;
  };

  private setTwitchSet = (emojiList: EmojiSet) => {
    this.twitchSet = emojiList;
  };
}
