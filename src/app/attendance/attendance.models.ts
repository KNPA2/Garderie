export type Presence = 'present' | 'absent';

export interface AttendanceDay {
  /** ISO date (yyyy-MM-dd) of the day the register covers. */
  date: string;
  /** childId -> presence of that child on the day. */
  entries: Record<string, Presence>;
}

export type AttendanceDirectory = AttendanceDay[];
