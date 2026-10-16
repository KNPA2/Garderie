import { Injectable, Signal, signal } from '@angular/core';
import {
  AttendanceDay,
  AttendanceDirectory,
} from './attendance.models';
import { readCollection, writeCollection } from '../core/storage';

const KEY_DAYS = 'attendance';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly daysSignal = signal<AttendanceDirectory>(this.loadDays());

  readonly days: Signal<AttendanceDirectory> = this.daysSignal;

  listDays(): AttendanceDay[] {
    return [...this.daysSignal()];
  }

  getDay(date: string): AttendanceDay | null {
    return this.daysSignal().find((day) => day.date === date) ?? null;
  }

  recordDay(date: string, entries: Record<string, 'present' | 'absent'>): void {
    this.daysSignal.set([
      ...this.daysSignal().filter((day) => day.date !== date),
      { date, entries },
    ]);
    this.persist();
  }

  private loadDays(): AttendanceDirectory {
    return readCollection<AttendanceDay>(KEY_DAYS);
  }

  private persist(): void {
    writeCollection(KEY_DAYS, this.daysSignal());
  }
}
