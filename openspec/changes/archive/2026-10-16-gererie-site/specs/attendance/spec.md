# Spec Delta

## Purpose

Records the daily attendance of the children, so that absences are always visible.

## ADDED Requirements

### Requirement: Staff can record the attendance of a day
The system SHALL allow staff to record whether each child was present on a given day.

#### Scenario: Attendance is marked for a day
- **WHEN** staff mark the attendance of a day
- **THEN** every enrolled child is recorded as present or absent

### Requirement: Attendance of previous days is kept
The system SHALL keep the attendance records of previous days.

#### Scenario: An earlier day is still available
- **WHEN** the register is opened for an earlier day
- **THEN** the attendance recorded that day is still shown

### Requirement: Recorded attendance can be corrected
The system SHALL allow staff to correct the attendance recorded for a day.

#### Scenario: Attendance is corrected
- **WHEN** staff change the attendance of a recorded day
- **THEN** the register shows the corrected attendance
