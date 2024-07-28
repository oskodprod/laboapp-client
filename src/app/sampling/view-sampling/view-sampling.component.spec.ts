import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSamplingComponent } from './view-sampling.component';

describe('ViewSamplingComponent', () => {
  let component: ViewSamplingComponent;
  let fixture: ComponentFixture<ViewSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
