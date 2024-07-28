import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSampleFormComponent } from './dialog-edit-sample-form.component';

describe('DialogEditSampleFormComponent', () => {
  let component: DialogEditSampleFormComponent;
  let fixture: ComponentFixture<DialogEditSampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditSampleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditSampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
