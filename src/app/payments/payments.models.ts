export type PaymentState = 'paid' | 'outstanding';

export interface Payment {
  id: string;
  childId: string;
  amount: number;
  /** ISO date (yyyy-MM-dd) on which the payment was made. */
  paidOn: string | null;
  /** ISO date (yyyy-MM-dd) on which the payment is due. */
  dueDate: string;
  state: PaymentState;
}

export type PaymentDirectory = Payment[];
