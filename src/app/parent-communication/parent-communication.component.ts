import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildrenService } from '../children/children.service';
import { MessagesService } from './messages.service';
import { Message } from './messages.models';

interface OutboxRow {
  id: string;
  subject: string;
  body: string;
  recipients: string;
  sentAt: string;
}

interface ChildOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-parent-communication',
  imports: [ReactiveFormsModule],
  templateUrl: './parent-communication.component.html',
})
export class ParentCommunicationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly messagesService = inject(MessagesService);
  private readonly childrenService = inject(ChildrenService);

  protected readonly sentMessages: Signal<OutboxRow[]> = computed(() =>
    this.messagesService
      .listSentMessages()
      .map((message) => this.toRow(message)),
  );

  protected readonly children = computed(() =>
    this.childrenService
      .listChildren()
      .map((child) => ({
        id: child.id,
        label: `${child.firstName} ${child.lastName}`,
      })),
  );

  protected showCreateForm = false;
  protected selectedRecipients: string[] = [];
  protected readonly form = this.formBuilder.nonNullable.group({
    subject: ['', Validators.required],
    body: ['', Validators.required],
  });

  constructor() {}

  protected startCreate(): void {
    this.showCreateForm = true;
    this.resetForm();
    this.selectedRecipients = [];
  }

  protected cancelCreate(): void {
    this.showCreateForm = false;
    this.resetForm();
    this.selectedRecipients = [];
  }

  protected toggleRecipient(childId: string): void {
    this.selectedRecipients = this.selectedRecipients.includes(childId)
      ? this.selectedRecipients.filter((id) => id !== childId)
      : [...this.selectedRecipients, childId];
  }

  protected saveMessage(): void {
    const input = {
      subject: this.form.controls.subject.value,
      body: this.form.controls.body.value,
      recipientIds: this.selectedRecipients,
    };
    this.messagesService.send(input);
    this.showCreateForm = false;
    this.resetForm();
    this.selectedRecipients = [];
  }

  private resetForm(): void {
    this.form.reset({ subject: '', body: '' });
  }

  private toRow(message: Message): OutboxRow {
    const recipients = message.recipientIds
      .map((id) => this.labelOf(id))
      .join(', ');
    return {
      id: message.id,
      subject: message.subject,
      body: message.body,
      recipients,
      sentAt: message.sentAt,
    };
  }

  private labelOf(id: string): string {
    const child = this.children().find((option) => option.id === id);
    return child ? child.label : id;
  }
}
