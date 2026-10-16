import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChildrenService } from '../children/children.service';
import { ParentCommunicationComponent } from './parent-communication.component';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(MessagesService);
  });

  it('starts with an empty outbox', () => {
    expect(service.listSentMessages()).toEqual([]);
  });

  it('sends a message to selected recipients', () => {
    const message = service.send({
      subject: 'Absence pour demain',
      body: 'Cyril sera absent demain matin.',
      recipientIds: ['child-1'],
    });

    expect(message.state).toBe('delivered');
    expect(message.sentAt).toBeTruthy();
    expect(service.listSentMessages()).toContainEqual(message);
  });
});

describe('ParentCommunicationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentCommunicationComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the sent messages', async () => {
    const messagesService = TestBed.inject(MessagesService);
    messagesService.send({
      subject: 'Absence pour demain',
      body: 'Cyril sera absent demain matin.',
      recipientIds: ['child-1'],
    });

    const fixture = TestBed.createComponent(ParentCommunicationComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Absence pour demain');
    expect(compiled.textContent).toContain('Envoyé le');
  });
});
