import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddLabratFormComponent } from './dialog-add-labrat-form.component';

describe('DialogAddLabratFormComponent', () => {
  let component: DialogAddLabratFormComponent;
  let fixture: ComponentFixture<DialogAddLabratFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddLabratFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLabratFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
