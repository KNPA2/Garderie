export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  parentIds: string[];
}

export type ChildDirectory = Child[];
export type ParentDirectory = Parent[];
