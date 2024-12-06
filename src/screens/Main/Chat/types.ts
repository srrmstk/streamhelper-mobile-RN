import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { UserModel } from 'modules/User/models/userModel';

export type TSelectedMessage = {
  userData: UserModel;
  messageData: ChatMessage;
};
