import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCurrentMonthHeaderComponent } from './expense-current-month-header.component';

describe('ExpenseCurrentMonthHeaderComponent', () => {
  let component: ExpenseCurrentMonthHeaderComponent;
  let fixture: ComponentFixture<ExpenseCurrentMonthHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCurrentMonthHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCurrentMonthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
