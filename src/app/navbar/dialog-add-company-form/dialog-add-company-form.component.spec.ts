import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCompanyFormComponent } from './dialog-add-company-form.component';

describe('DialogAddCompanyFormComponent', () => {
  let component: DialogAddCompanyFormComponent;
  let fixture: ComponentFixture<DialogAddCompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCompanyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
