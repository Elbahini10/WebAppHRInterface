import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStagiairesComponent } from './list-stagiaires.component';

describe('ListStagiairesComponent', () => {
  let component: ListStagiairesComponent;
  let fixture: ComponentFixture<ListStagiairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStagiairesComponent]
    });
    fixture = TestBed.createComponent(ListStagiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
