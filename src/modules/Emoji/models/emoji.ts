import { jsonProperty, Serializable } from 'ts-serializable';

export class Emoji extends Serializable {
  @jsonProperty(String, null)
  url: string | null = null;

  @jsonProperty(Number, null)
  height: number | null = null;

  @jsonProperty(Number, null)
  width: number | null = null;
}
