export interface Message {
  id: string;
  subject: string;
  body: string;
  recipientIds: string[];
  sentAt: string;
  state: 'delivered';
}

export type MessageDirectory = Message[];
