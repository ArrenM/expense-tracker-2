import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGoal } from './budget-goal';

describe('BudgetGoal', () => {
  let component: BudgetGoal;
  let fixture: ComponentFixture<BudgetGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetGoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGoal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
