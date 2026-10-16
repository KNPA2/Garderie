# Children Specification

## Purpose

Manages the enrolled children of the daycare together with their parent records.

## Requirements

### Requirement: Staff can list enrolled children with their parents
The system SHALL allow staff to list enrolled children together with the parents associated with each child.

#### Scenario: Directory shows children with parents
- **WHEN** staff open the directory of enrolled children
- **THEN** every enrolled child is listed together with their parents

### Requirement: Each enrolled child is linked to their parent records
Every enrolled child SHALL be linked to the parent records associated with the child.

#### Scenario: Linked parents are shown
- **WHEN** a child's record is displayed
- **THEN** the parents linked to the child are shown with their contact details

### Requirement: Staff can register a new child
The system SHALL allow staff to register a new child as enrolled.

#### Scenario: New child appears in the directory
- **WHEN** a new child is registered
- **THEN** the child appears in the list of enrolled children

### Requirement: Staff can manage parent records
The system SHALL allow staff to create, edit, and remove parent records, and to link them to children.

#### Scenario: Parent is linked to a child
- **WHEN** staff link a parent to a child
- **THEN** the parent is shown with the child in the child's record
