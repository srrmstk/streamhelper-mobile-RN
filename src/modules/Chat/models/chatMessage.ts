import { jsonName, jsonProperty, Serializable } from 'ts-serializable';

export class ChatMessage extends Serializable {
  @jsonProperty(String, null)
  author: string | null = null;

  @jsonProperty(String, null)
  message: string | null = null;

  @jsonProperty(String, null)
  color: string | null = null;

  @jsonName('messageId')
  @jsonProperty(String, null)
  id: string | null = null;
}
