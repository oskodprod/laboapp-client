import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfdeleteSamplingComponent } from './dialog-confdelete-sampling.component';

describe('DialogConfdeleteSamplingComponent', () => {
  let component: DialogConfdeleteSamplingComponent;
  let fixture: ComponentFixture<DialogConfdeleteSamplingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfdeleteSamplingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfdeleteSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
