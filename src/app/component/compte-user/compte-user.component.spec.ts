import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteUserComponent } from './compte-user.component';

describe('CompteUserComponent', () => {
  let component: CompteUserComponent;
  let fixture: ComponentFixture<CompteUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteUserComponent]
    });
    fixture = TestBed.createComponent(CompteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
