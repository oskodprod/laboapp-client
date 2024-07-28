import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedReportComponent } from './generated-report.component';

describe('GeneratedReportComponent', () => {
  let component: GeneratedReportComponent;
  let fixture: ComponentFixture<GeneratedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
