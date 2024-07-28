import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSamplingComponent } from './filter-sampling.component';

describe('FilterSamplingComponent', () => {
  let component: FilterSamplingComponent;
  let fixture: ComponentFixture<FilterSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
