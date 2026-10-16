# Tasks

## 1. Application shell and shared components

- [x] 1.1 Implement the application layout, the navigation, and the routing to the four capability views, and verify the navigation works in the browser.
- [x] 1.2 Implement the shared presentational components (list views, tables, and forms) and verify they render within the views.

## 2. Children capability

- [x] 2.1 Implement the children capability: the model, the service, and the list view showing children with their parents, and verify the directory lists enrolled children with their parents.
- [x] 2.2 Implement registration and management of children and parent records, and verify new records can be created and edited.
- [x] 2.3 Implement linking parents to children, and verify a linked parent is shown with the child.
- [x] 2.4 Add tests for the children capability and verify the test suite covers it.

## 3. Attendance capability

- [x] 3.1 Implement the attendance capability: the model, the service, and the daily register view, and verify a day can be opened.
- [x] 3.2 Implement marking whether each child was present on a day, and verify every enrolled child is recorded as present or absent.
- [x] 3.3 Implement correcting the attendance recorded for a day, and verify the register shows the corrected attendance.
- [x] 3.4 Add tests for the attendance capability and verify the test suite covers it.

## 4. Payments capability

- [x] 4.1 Implement the payments capability: the model, the service, and the payments list view, and verify the list of payments made is displayed.
- [x] 4.2 Implement recording payments made, linking each payment to its child, and verify the child is shown with the payment.
- [x] 4.3 Implement the list of amounts still to be paid, and verify every outstanding amount is displayed.
- [x] 4.4 Add tests for the payments capability and verify the test suite covers it.

## 5. Parent communication capability

- [x] 5.1 Implement the communication capability: the message model, the service, and the outbox view, and verify the outbox is displayed.
- [x] 5.2 Implement sending messages to parents and reviewing sent messages, and verify a message is stored as delivered to the selected parents.
- [x] 5.3 Add tests for the communication capability and verify the test suite covers it.

## 6. Integration and verification

- [x] 6.1 Verify that all four capability views are reachable through the navigation.
- [x] 6.2 Verify cross-capability data: children registered in the children view appear in the attendance register, and payments link to their child.
- [x] 6.3 Run the full test suite and verify all tests pass.
- [x] 6.4 Build the project for production and verify the build succeeds.
