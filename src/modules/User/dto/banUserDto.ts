import { jsonProperty, Serializable } from 'ts-serializable';

export class BanUserDto extends Serializable {
  @jsonProperty(String, null)
  broadcasterId: string | null = null;

  @jsonProperty(String, null)
  userId: string | null = null;

  @jsonProperty(String, undefined)
  reason: string | undefined;

  @jsonProperty(Number, undefined)
  duration: number | undefined;
}
