import { Injectable, Signal, signal } from '@angular/core';
import {
  Payment,
  PaymentDirectory,
} from './payments.models';
import { readCollection, writeCollection } from '../core/storage';

const KEY_PAYMENTS = 'payments';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private readonly paymentsSignal = signal<PaymentDirectory>(this.loadPayments());

  readonly payments: Signal<PaymentDirectory> = this.paymentsSignal;

  listPayments(): Payment[] {
    return [...this.paymentsSignal()];
  }

  recordPayment(input: NewPayment): Payment {
    const payment: Payment = {
      id: createId(),
      state: input.paidOn === null ? 'outstanding' : 'paid',
      ...input,
    };
    this.paymentsSignal.set([...this.paymentsSignal(), payment]);
    this.persist();
    return payment;
  }

  updatePayment(id: string, input: NewPayment): void {
    this.paymentsSignal.set(
      this.paymentsSignal().map((payment) =>
        payment.id === id
          ? {
              ...payment,
              amount: input.amount,
              dueDate: input.dueDate,
              paidOn: input.paidOn,
            }
          : payment,
      ),
    );
    this.persist();
  }

  outstandingPayments(): Payment[] {
    return this.paymentsSignal().filter((payment) => payment.state === 'outstanding');
  }

  paidPayments(): Payment[] {
    return this.paymentsSignal()
      .filter((payment) => payment.state === 'paid')
      .sort((left, right) => (left.paidOn ?? '').localeCompare(right.paidOn ?? ''));
  }

  private loadPayments(): PaymentDirectory {
    return readCollection<Payment>(KEY_PAYMENTS);
  }

  private persist(): void {
    writeCollection(KEY_PAYMENTS, this.paymentsSignal());
  }
}

export interface NewPayment {
  childId: string;
  amount: number;
  dueDate: string;
  paidOn: string | null;
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
