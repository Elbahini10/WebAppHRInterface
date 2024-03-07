import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEmployeurComponent } from './delete-employeur.component';

describe('DeleteEmployeurComponent', () => {
  let component: DeleteEmployeurComponent;
  let fixture: ComponentFixture<DeleteEmployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEmployeurComponent]
    });
    fixture = TestBed.createComponent(DeleteEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
