import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSamplesFormComponent } from './dialog-add-samples-form.component';

describe('DialogAddSamplesFormComponent', () => {
  let component: DialogAddSamplesFormComponent;
  let fixture: ComponentFixture<DialogAddSamplesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSamplesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSamplesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
