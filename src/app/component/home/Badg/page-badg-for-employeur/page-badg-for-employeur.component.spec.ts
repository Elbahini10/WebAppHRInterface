import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBadgForEmployeurComponent } from './page-badg-for-employeur.component';

describe('PageBadgForEmployeurComponent', () => {
  let component: PageBadgForEmployeurComponent;
  let fixture: ComponentFixture<PageBadgForEmployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageBadgForEmployeurComponent]
    });
    fixture = TestBed.createComponent(PageBadgForEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
