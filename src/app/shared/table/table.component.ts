import { Component, Input } from '@angular/core';

export interface TableColumn {
  header: string;
  field: string;
}

@Component({
  selector: 'shared-table',
  template: `
    <table class="table">
      <thead>
        <tr>
          @for (column of columns; track column.header) {
            <th>{{ column.header }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of rows; track row.id) {
          <tr>
            @for (column of columns; track column.header) {
              <td>{{ value(row, column.field) }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class SharedTable {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input({ required: true }) rows: Array<{ id: string } & Record<string, unknown>> = [];

  protected value(row: Record<string, unknown>, field: string): string {
    const raw = row[field];
    return raw === null || raw === undefined ? '' : String(raw);
  }
}
