import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireEmployeurComponent } from './salaire-employeur.component';

describe('SalaireEmployeurComponent', () => {
  let component: SalaireEmployeurComponent;
  let fixture: ComponentFixture<SalaireEmployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaireEmployeurComponent]
    });
    fixture = TestBed.createComponent(SalaireEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
