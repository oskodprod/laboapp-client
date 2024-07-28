import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddClientFormComponent } from './dialog-add-client-form.component';

describe('DialogAddClientFormComponent', () => {
  let component: DialogAddClientFormComponent;
  let fixture: ComponentFixture<DialogAddClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddClientFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
