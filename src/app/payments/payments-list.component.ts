import { Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChildrenService } from '../children/children.service';
import { PaymentsService } from './payments.service';
import { Payment } from './payments.models';

type PaymentMode = 'outstanding' | 'paid';

interface PaymentRow {
  id: string;
  childLabel: string;
  amount: number;
  dueDate: string;
  paidOn: string | null;
  state: 'paid' | 'outstanding';
}

interface ChildOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments-list.component.html',
})
export class PaymentsListComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly paymentsService = inject(PaymentsService);
  private readonly childrenService = inject(ChildrenService);

  protected readonly paidRows: Signal<PaymentRow[]> = computed(() =>
    this.paymentsService
      .paidPayments()
      .map((payment) => this.toRow(payment)),
  );

  protected readonly outstandingRows: Signal<PaymentRow[]> = computed(() =>
    this.paymentsService
      .outstandingPayments()
      .map((payment) => this.toRow(payment)),
  );

  protected readonly childOptions: Signal<ChildOption[]> = computed(() =>
    this.childrenService
      .listChildren()
      .map((child) => ({
        id: child.id,
        label: `${child.firstName} ${child.lastName}`,
      })),
  );

  protected createMode: PaymentMode = 'outstanding';
  protected showCreateForm = false;
  protected readonly form = this.formBuilder.nonNullable.group({
    childId: ['', Validators.required],
    amount: [0, Validators.required],
    dueDate: ['', Validators.required],
    paidOn: [''],
  });

  constructor() {}

  protected startCreateOutstanding(): void {
    this.createMode = 'outstanding';
    this.showCreateForm = true;
    this.resetForm();
  }

  protected startCreatePaid(): void {
    this.createMode = 'paid';
    this.showCreateForm = true;
    this.resetForm();
  }

  protected savePayment(): void {
    const input = {
      childId: this.form.controls.childId.value,
      amount: this.form.controls.amount.value,
      dueDate: this.form.controls.dueDate.value,
      paidOn:
        this.createMode === 'paid' && this.form.controls.paidOn.value
          ? this.form.controls.paidOn.value
          : null,
    };
    this.paymentsService.recordPayment(input);
    this.showCreateForm = false;
  }

  private resetForm(): void {
    this.form.reset({
      childId: '',
      amount: 0,
      dueDate: '',
      paidOn: '',
    });
  }

  private toRow(payment: Payment): PaymentRow {
    const child = this.childOptions().find((option) => option.id === payment.childId);
    return {
      id: payment.id,
      childLabel: child ? child.label : 'Inconnu',
      amount: payment.amount,
      dueDate: payment.dueDate,
      paidOn: payment.paidOn,
      state: payment.state,
    };
  }
}
