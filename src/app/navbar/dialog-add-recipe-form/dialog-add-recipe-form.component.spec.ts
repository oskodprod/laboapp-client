import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRecipeFormComponent } from './dialog-add-recipe-form.component';

describe('DialogAddRecipeFormComponent', () => {
  let component: DialogAddRecipeFormComponent;
  let fixture: ComponentFixture<DialogAddRecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddRecipeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
