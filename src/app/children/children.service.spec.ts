import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChildrenListComponent } from './children-list.component';
import { ChildrenService } from './children.service';

describe('ChildrenService', () => {
  let service: ChildrenService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(ChildrenService);
  });

  it('starts with an empty directory', () => {
    expect(service.listChildren()).toEqual([]);
    expect(service.listParents()).toEqual([]);
  });

  it('registers a child', () => {
    const child = service.createChild({ firstName: 'Camille', lastName: 'Durand' });

    expect(service.listChildren()).toContainEqual(child);
    expect(child.parentIds).toEqual([]);
  });

  it('updates a child', () => {
    const child = service.createChild({ firstName: 'Camille', lastName: 'Durand' });

    service.updateChild(child.id, { firstName: 'Camille', lastName: 'Martin' });

    const updated = service.listChildren().find((item) => item.id === child.id);
    expect(updated?.lastName).toBe('Martin');
  });

  it('links parents to a child', () => {
    const child = service.createChild({ firstName: 'Camille', lastName: 'Durand' });
    const parent = service.createParent({
      firstName: 'Sophie',
      lastName: 'Durand',
    });

    service.linkParents(child.id, [parent.id]);

    const linked = service.listChildren().find((item) => item.id === child.id);
    expect(linked?.parentIds).toEqual([parent.id]);
  });

  it('removes a child', () => {
    const child = service.createChild({ firstName: 'Camille', lastName: 'Durand' });

    service.removeChild(child.id);

    expect(service.listChildren()).not.toContainEqual(child);
  });

  it('manages parent records', () => {
    const parent = service.createParent({
      firstName: 'Sophie',
      lastName: 'Durand',
      email: 'sophie.durand@example.org',
    });

    expect(parent.email).toBe('sophie.durand@example.org');
    service.updateParent(parent.id, {
      firstName: 'Sophie',
      lastName: 'Durand',
      email: 'sophie.martin@example.org',
    });
    const updated = service
      .listParents()
      .find((item) => item.id === parent.id);
    expect(updated?.email).toBe('sophie.martin@example.org');

    service.removeParent(parent.id);
    expect(service.listParents()).not.toContainEqual(parent);
  });
});

describe('ChildrenListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenListComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the enrolled children', async () => {
    const service = TestBed.inject(ChildrenService);
    service.createChild({ firstName: 'Camille', lastName: 'Durand' });

    const fixture = TestBed.createComponent(ChildrenListComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Camille Durand');
  });

  it('shows the add-child form', async () => {
    const fixture = TestBed.createComponent(ChildrenListComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Enfants inscrits');
  });
});
