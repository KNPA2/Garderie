import { Injectable, Signal, signal } from '@angular/core';
import { Message, MessageDirectory } from './messages.models';
import { readCollection, writeCollection } from '../core/storage';

const KEY_MESSAGES = 'messages';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly messagesSignal = signal<MessageDirectory>(this.loadMessages());

  readonly messages: Signal<MessageDirectory> = this.messagesSignal;

  listSentMessages(): Message[] {
    return [...this.messagesSignal()];
  }

  send(input: NewMessage): Message {
    const message: Message = {
      id: createId(),
      subject: input.subject,
      body: input.body,
      recipientIds: input.recipientIds,
      sentAt: new Date().toISOString(),
      state: 'delivered',
    };
    this.messagesSignal.set([...this.messagesSignal(), message]);
    this.persist();
    return message;
  }

  private loadMessages(): MessageDirectory {
    return readCollection<Message>(KEY_MESSAGES);
  }

  private persist(): void {
    writeCollection(KEY_MESSAGES, this.messagesSignal());
  }
}

export interface NewMessage {
  subject: string;
  body: string;
  recipientIds: string[];
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
