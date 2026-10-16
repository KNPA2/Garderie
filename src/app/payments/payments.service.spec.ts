import { TestBed } from '@angular/core/testing';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.models';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(PaymentsService);
  });

  it('starts without payments', () => {
    expect(service.listPayments()).toEqual([]);
    expect(service.outstandingPayments()).toEqual([]);
    expect(service.paidPayments()).toEqual([]);
  });

  it('records an outstanding payment', () => {
    const payment = service.recordPayment({
      childId: 'child-1',
      amount: 120,
      dueDate: '2026-11-01',
      paidOn: null,
    });

    expect(payment.state).toBe('outstanding');
    expect(service.outstandingPayments()).toContainEqual(payment);
    expect(service.paidPayments()).toEqual([]);
  });

  it('records a payment as made', () => {
    const payment = service.recordPayment({
      childId: 'child-1',
      amount: 120,
      dueDate: '2026-11-01',
      paidOn: '2026-10-16',
    });

    expect(payment.state).toBe('paid');
    expect(service.paidPayments()).toContainEqual(payment);
    expect(service.outstandingPayments()).toEqual([]);
  });

  it('updates the amount of a payment', () => {
    const payment = service.recordPayment({
      childId: 'child-1',
      amount: 120,
      dueDate: '2026-11-01',
      paidOn: '2026-10-16',
    });

    service.updatePayment(payment.id, {
      childId: 'child-1',
      amount: 150,
      dueDate: '2026-11-01',
      paidOn: '2026-10-16',
    });

    expect(service.paidPayments()[0].amount).toBe(150);
  });
});
