import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ChildrenService } from '../children/children.service';
import { AttendanceDay, Presence } from './attendance.models';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'app-attendance',
  imports: [],
  templateUrl: './attendance-register.component.html',
})
export class AttendanceRegisterComponent {
  private readonly attendanceService = inject(AttendanceService);
  private readonly childrenService = inject(ChildrenService);

  protected days = signal<AttendanceDay[]>([]);
  protected readonly childNames = computed(() =>
    this.childrenService
      .listChildren()
      .map((child) => ({
        id: child.id,
        label: `${child.firstName} ${child.lastName}`,
      })),
  );
  protected selectedDate: string | null = null;
  /** Presence of each child, edited locally until the day is saved. */
  protected draft: Record<string, Presence> = {};
  protected selectedChildId = '';

  constructor() {
    this.days.set(this.attendanceService.listDays());
  }

  protected selectDay(date: string): void {
    this.selectedDate = date;
    this.draft = { ...(this.attendanceService.getDay(date)?.entries ?? {}) };
  }

  protected togglePresence(presence: Presence): void {
    if (this.selectedDate === null) {
      return;
    }
    this.draft = { ...this.draft, [this.currentChildId()]: presence };
  }

  protected saveDay(): void {
    if (this.selectedDate === null) {
      return;
    }
    this.attendanceService.recordDay(this.selectedDate, { ...this.draft });
    this.days.set(this.attendanceService.listDays());
  }

  protected startNewDay(): void {
    const today = todayIsoDate();
    this.selectedDate = today;
    this.draft = {};
  }

  protected onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
  }

  private currentChildId(): string {
    return this.selectedChildId;
  }
}

function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
