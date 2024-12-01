import { jsonProperty, Serializable } from 'ts-serializable';

export class CreateSubscriptionDto extends Serializable {
  @jsonProperty(String, null)
  userId: string | null = null;

  @jsonProperty(String, null)
  sessionId: string | null = null;
}
