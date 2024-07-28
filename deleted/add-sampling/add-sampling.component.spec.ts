import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSamplingComponent } from './add-sampling.component';

describe('AddSamplingComponent', () => {
  let component: AddSamplingComponent;
  let fixture: ComponentFixture<AddSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
