import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexpensesComponent } from './myexpenses.component';

describe('MyexpensesComponent', () => {
  let component: MyexpensesComponent;
  let fixture: ComponentFixture<MyexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyexpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
