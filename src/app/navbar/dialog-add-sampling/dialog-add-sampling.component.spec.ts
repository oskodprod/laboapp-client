import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSamplingComponent } from './dialog-add-sampling.component';

describe('DialogAddSamplingComponent', () => {
  let component: DialogAddSamplingComponent;
  let fixture: ComponentFixture<DialogAddSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
