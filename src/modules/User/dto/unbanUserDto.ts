import { jsonProperty, Serializable } from 'ts-serializable';

export class UnbanUserDto extends Serializable {
  @jsonProperty(String, null)
  broadcasterId: string | null = null;

  @jsonProperty(String, null)
  userId: string | null = null;
}
