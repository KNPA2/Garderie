import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class SharedForm {
  @Input({ required: true }) form!: FormGroup;
  @Output() submitted = new EventEmitter<Record<string, unknown>>();

  protected save(): void {
    this.submitted.emit(this.form.value);
  }
}
