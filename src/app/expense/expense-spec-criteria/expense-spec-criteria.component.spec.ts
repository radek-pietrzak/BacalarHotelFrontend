import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSpecCriteriaComponent } from './expense-spec-criteria.component';

describe('ExpenseSpecCriteriaComponent', () => {
  let component: ExpenseSpecCriteriaComponent;
  let fixture: ComponentFixture<ExpenseSpecCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSpecCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSpecCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
