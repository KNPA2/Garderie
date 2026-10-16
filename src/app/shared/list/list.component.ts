import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ListItem {
  id: string;
  title: string;
  route?: string;
  hint?: string;
}

@Component({
  selector: 'shared-list',
  imports: [RouterLink],
  templateUrl: './list.component.html',
})
export class SharedList {
  @Input({ required: true }) heading = '';
  @Input({ required: true }) items: ListItem[] = [];
}
