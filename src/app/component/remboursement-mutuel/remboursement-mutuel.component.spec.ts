import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemboursementMutuelComponent } from './remboursement-mutuel.component';

describe('RemboursementMutuelComponent', () => {
  let component: RemboursementMutuelComponent;
  let fixture: ComponentFixture<RemboursementMutuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemboursementMutuelComponent]
    });
    fixture = TestBed.createComponent(RemboursementMutuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
