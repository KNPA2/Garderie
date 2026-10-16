# Payments Specification

## Purpose

Tracks the payments made to the daycare and the amounts still to be paid.

## Requirements

### Requirement: Staff can record payments made
The system SHALL allow staff to record payments made to the daycare.

#### Scenario: A payment is recorded
- **WHEN** a payment is recorded
- **THEN** it appears in the list of payments made

### Requirement: Each payment belongs to a child
Every payment SHALL belong to the child it was paid for.

#### Scenario: The child is shown with the payment
- **WHEN** a payment is displayed
- **THEN** the child it belongs to is shown

### Requirement: Outstanding amounts are listed
The system SHALL list the amounts still to be paid.

#### Scenario: Pending payments are shown
- **WHEN** the list of pending payments is shown
- **THEN** every outstanding amount is displayed
