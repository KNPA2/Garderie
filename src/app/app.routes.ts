import { Routes } from '@angular/router';

import { AttendanceRegisterComponent } from './attendance/attendance-register.component';
import { ChildrenListComponent } from './children/children-list.component';
import { ParentCommunicationComponent } from './parent-communication/parent-communication.component';
import { PaymentsListComponent } from './payments/payments-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'children' },
  { path: 'children', component: ChildrenListComponent },
  { path: 'attendance', component: AttendanceRegisterComponent },
  { path: 'payments', component: PaymentsListComponent },
  { path: 'parent-communication', component: ParentCommunicationComponent },
];
