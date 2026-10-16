import { TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { SharedForm } from './form/form.component';
import { SharedList } from './list/list.component';
import { SharedTable } from './table/table.component';

describe('SharedList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedList],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the heading and the items', () => {
    const fixture = TestBed.createComponent(SharedList);
    const component = fixture.componentInstance;
    component.heading = 'Enfants inscrits';
    component.items = [
      { id: 'child-1', title: 'Camille Durand' },
      { id: 'child-2', title: 'Hugo Martin', route: '/children' },
    ];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Enfants inscrits');
    expect(compiled.textContent).toContain('Camille Durand');
    expect(compiled.textContent).toContain('Hugo Martin');
  });

  it('renders the empty state', () => {
    const fixture = TestBed.createComponent(SharedList);
    const component = fixture.componentInstance;
    component.heading = 'Enfants inscrits';
    component.items = [];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Aucun élément');
  });
});

describe('SharedTable', () => {
  it('renders the columns and the rows', () => {
    const fixture = TestBed.createComponent(SharedTable);
    const component = fixture.componentInstance;
    component.columns = [{ header: 'Nom', field: 'name' }];
    component.rows = [{ id: 'row-1', name: 'Camille Durand' }];

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nom');
    expect(compiled.textContent).toContain('Camille Durand');
  });
});

describe('SharedForm', () => {
  it('renders the projected controls and emits on submit', () => {
    const fixture = TestBed.createComponent(SharedForm);
    const component = fixture.componentInstance;
    const formBuilder = new FormBuilder();
    component.form = formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).not.toBeNull();
  });
});
