import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStagiairesComponent } from './add-stagiaires.component';

describe('AddStagiairesComponent', () => {
  let component: AddStagiairesComponent;
  let fixture: ComponentFixture<AddStagiairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStagiairesComponent]
    });
    fixture = TestBed.createComponent(AddStagiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
