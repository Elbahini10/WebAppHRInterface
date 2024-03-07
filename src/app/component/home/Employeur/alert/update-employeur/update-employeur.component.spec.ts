import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeurComponent } from './update-employeur.component';

describe('UpdateEmployeurComponent', () => {
  let component: UpdateEmployeurComponent;
  let fixture: ComponentFixture<UpdateEmployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEmployeurComponent]
    });
    fixture = TestBed.createComponent(UpdateEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
