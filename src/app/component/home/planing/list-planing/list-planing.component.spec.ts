import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlaningComponent } from './list-planing.component';

describe('ListPlaningComponent', () => {
  let component: ListPlaningComponent;
  let fixture: ComponentFixture<ListPlaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlaningComponent]
    });
    fixture = TestBed.createComponent(ListPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
