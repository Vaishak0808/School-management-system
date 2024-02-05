import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSheetComponent } from './results-sheet.component';

describe('ResultsSheetComponent', () => {
  let component: ResultsSheetComponent;
  let fixture: ComponentFixture<ResultsSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsSheetComponent]
    });
    fixture = TestBed.createComponent(ResultsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
