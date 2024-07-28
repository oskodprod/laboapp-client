import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabratComponent } from './add-labrat.component';

describe('AddLabratComponent', () => {
  let component: AddLabratComponent;
  let fixture: ComponentFixture<AddLabratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
