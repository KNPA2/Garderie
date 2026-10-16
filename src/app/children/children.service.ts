import { Injectable, Signal, signal } from '@angular/core';
import {
  Child,
  ChildDirectory,
  Parent,
  ParentDirectory,
} from './children.models';
import { readCollection, removeCollection, writeCollection } from '../core/storage';

const KEY_CHILDREN = 'children';
const KEY_PARENTS = 'parents';

export interface ChildInput {
  firstName: string;
  lastName: string;
  parentIds?: string[];
}

export interface ParentInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

@Injectable({ providedIn: 'root' })
export class ChildrenService {
  private readonly childrenSignal = signal<ChildDirectory>(this.loadChildren());
  private readonly parentsSignal = signal<ParentDirectory>(this.loadParents());

  readonly children: Signal<ChildDirectory> = this.childrenSignal;
  readonly parents: Signal<ParentDirectory> = this.parentsSignal;

  listChildren(): Child[] {
    return [...this.children()];
  }

  listParents(): Parent[] {
    return [...this.parents()];
  }

  createChild(input: ChildInput): Child {
    const child: Child = { id: createId(), ...input, parentIds: [] };
    this.childrenSignal.set([...this.childrenSignal(), child]);
    this.persist();
    return child;
  }

  updateChild(id: string, input: ChildInput): void {
    const parentIds = input.parentIds ?? [];
    this.childrenSignal.set(
      this.childrenSignal().map((child) =>
        child.id === id
          ? { ...child, firstName: input.firstName, lastName: input.lastName, parentIds }
          : child,
      ),
    );
    this.persist();
  }

  removeChild(id: string): void {
    this.childrenSignal.set(
      this.childrenSignal().filter((child) => child.id !== id),
    );
    this.persist();
  }

  linkParents(childId: string, parentIds: string[]): void {
    this.childrenSignal.set(
      this.childrenSignal().map((child) =>
        child.id === childId ? { ...child, parentIds } : child,
      ),
    );
    this.persist();
  }

  createParent(input: ParentInput): Parent {
    const parent: Parent = { id: createId(), ...input };
    this.parentsSignal.set([...this.parentsSignal(), parent]);
    this.persist();
    return parent;
  }

  updateParent(id: string, input: ParentInput): void {
    this.parentsSignal.set(
      this.parentsSignal().map((parent) =>
        parent.id === id ? { ...parent, ...input } : parent,
      ),
    );
    this.persist();
  }

  removeParent(id: string): void {
    this.parentsSignal.set(
      this.parentsSignal().filter((parent) => parent.id !== id),
    );
    this.persist();
  }

  private loadChildren(): ChildDirectory {
    return readCollection<Child>(KEY_CHILDREN);
  }

  private loadParents(): ParentDirectory {
    return readCollection<Parent>(KEY_PARENTS);
  }

  private persist(): void {
    writeCollection(KEY_CHILDREN, this.children());
    writeCollection(KEY_PARENTS, this.parents());
  }
}
