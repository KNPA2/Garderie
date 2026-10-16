import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListItem } from '../shared/list/list.component';
import { SharedList } from '../shared/list/list.component';
import { ChildDirectory, ParentDirectory } from './children.models';
import { Child, Parent } from './children.models';
import { ChildrenService } from './children.service';

@Component({
  selector: 'app-children',
  imports: [ReactiveFormsModule, SharedList],
  templateUrl: './children-list.component.html',
})
export class ChildrenListComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly childrenService = inject(ChildrenService);

  protected childDirectory = signal<ChildDirectory>([]);
  protected parentDirectory = signal<ParentDirectory>([]);
  protected childItems = computed(() =>
    this.childDirectory().map((child) => this.toListItem(child)),
  );
  protected readonly parentItems = computed(() =>
    this.parentDirectory().map((parent) => this.toParentListItem(parent)),
  );

  protected editingChildId: string | null = null;
  protected editingParentId: string | null = null;
  protected showCreateChild = false;
  protected showCreateParent = false;
  protected selectedParentIds: string[] = [];

  protected readonly childForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  protected readonly parentForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [''],
    phone: [''],
  });

  constructor() {
    this.childDirectory.set(this.childrenService.listChildren());
    this.parentDirectory.set(this.childrenService.listParents());
  }

  protected startCreateChild(): void {
    this.showCreateChild = true;
    this.editingChildId = null;
    this.selectedParentIds = [];
    this.childForm.reset();
  }

  protected startCreateParent(): void {
    this.showCreateParent = true;
    this.editingParentId = null;
    this.parentForm.reset();
  }

  protected startEditChild(child: Child): void {
    this.showCreateChild = false;
    this.editingChildId = child.id;
    this.selectedParentIds = [...child.parentIds];
    this.childForm.patchValue({
      firstName: child.firstName,
      lastName: child.lastName,
    });
  }

  protected startEditParent(parent: Parent): void {
    this.showCreateParent = false;
    this.editingParentId = parent.id;
    this.parentForm.patchValue({
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email ?? '',
      phone: parent.phone ?? '',
    });
  }

  protected saveChild(): void {
    const input = {
      firstName: this.childForm.controls.firstName.value,
      lastName: this.childForm.controls.lastName.value,
      parentIds: this.selectedParentIds,
    };
    if (this.editingChildId === null) {
      this.childrenService.createChild(input);
    } else {
      this.childrenService.updateChild(this.editingChildId, input);
    }
    this.stopEditing();
    this.childDirectory.set(this.childrenService.listChildren());
  }

  protected saveParent(): void {
    const input = {
      firstName: this.parentForm.controls.firstName.value,
      lastName: this.parentForm.controls.lastName.value,
      email: this.parentForm.controls.email.value || undefined,
      phone: this.parentForm.controls.phone.value || undefined,
    };
    if (this.editingParentId === null) {
      this.childrenService.createParent(input);
    } else {
      this.childrenService.updateParent(this.editingParentId, input);
    }
    this.stopEditing();
    this.parentDirectory.set(this.childrenService.listParents());
  }

  protected removeChild(childId: string): void {
    this.childrenService.removeChild(childId);
    this.stopEditing();
    this.childDirectory.set(this.childrenService.listChildren());
  }

  protected removeParent(parentId: string): void {
    this.childrenService.removeParent(parentId);
    this.stopEditing();
    this.parentDirectory.set(this.childrenService.listParents());
  }

  private stopEditing(): void {
    this.showCreateChild = false;
    this.showCreateParent = false;
    this.editingChildId = null;
    this.editingParentId = null;
    this.childForm.reset();
    this.parentForm.reset();
    this.selectedParentIds = [];
  }

  protected toggleParent(parentId: string): void {
    this.selectedParentIds = this.selectedParentIds.includes(parentId)
      ? this.selectedParentIds.filter((id) => id !== parentId)
      : [...this.selectedParentIds, parentId];
  }

  private toListItem(child: ChildDirectory[number]): ListItem {
    return {
      id: child.id,
      title: `${child.firstName} ${child.lastName}`,
    };
  }

  private toParentListItem(parent: ParentDirectory[number]): ListItem {
    return {
      id: parent.id,
      title: `${parent.firstName} ${parent.lastName}`,
    };
  }
}
