import { jsonName, jsonProperty, Serializable } from 'ts-serializable';

export class UserModel extends Serializable {
  @jsonProperty(String, null)
  id: string | null = null;

  @jsonProperty(String, null)
  profileImageUrl: string | null = null;

  @jsonName('display_name')
  @jsonProperty(String, null)
  name: string | null = null;
}
