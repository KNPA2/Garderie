import { TestBed } from '@angular/core/testing';
import { ChildrenService } from '../children/children.service';
import { AttendanceRegisterComponent } from './attendance-register.component';
import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(AttendanceService);
  });

  it('starts without recorded days', () => {
    expect(service.listDays()).toEqual([]);
  });

  it('records the presence of each child for a day', () => {
    service.recordDay('2026-10-16', {
      'child-1': 'present',
      'child-2': 'absent',
    });

    const day = service.getDay('2026-10-16');
    expect(day?.entries['child-1']).toBe('present');
    expect(day?.entries['child-2']).toBe('absent');
  });

  it('keeps the records of previous days', () => {
    service.recordDay('2026-10-15', { 'child1': 'present' });
    service.recordDay('2026-10-16', { 'child1': 'absent' });

    expect(service.getDay('2026-10-15')?.entries['child1']).toBe('present');
    expect(service.getDay('2026-10-16')?.entries['child1']).toBe('absent');
  });

  it('overwrites the entries of the selected day', () => {
    service.recordDay('2026-10-16', { 'child1': 'present' });

    service.recordDay('2026-10-16', { 'child1': 'absent' });

    expect(service.getDay('2026-10-16')?.entries['child1']).toBe('absent');
  });
});

describe('AttendanceRegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceRegisterComponent],
    }).compileComponents();
  });

  it('renders the recorded days', async () => {
    const childrenService = TestBed.inject(ChildrenService);
    const child = childrenService.createChild({
      firstName: 'Camille',
      lastName: 'Durand',
    });
    const service = TestBed.inject(AttendanceService);
    service.recordDay('2026-10-16', { [child.id]: 'present' });

    const fixture = TestBed.createComponent(AttendanceRegisterComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('2026-10-16');
    expect(compiled.textContent).toContain('Présent');
  });
});
