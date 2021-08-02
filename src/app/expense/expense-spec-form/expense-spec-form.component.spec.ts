import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSpecFormComponent } from './expense-spec-form.component';

describe('ExpenseSpecFormComponent', () => {
  let component: ExpenseSpecFormComponent;
  let fixture: ComponentFixture<ExpenseSpecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSpecFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSpecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
