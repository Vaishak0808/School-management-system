import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAddComponent } from './results-add.component';

describe('ResultsAddComponent', () => {
  let component: ResultsAddComponent;
  let fixture: ComponentFixture<ResultsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsAddComponent]
    });
    fixture = TestBed.createComponent(ResultsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
