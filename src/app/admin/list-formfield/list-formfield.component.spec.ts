import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormfieldComponent } from './list-formfield.component';

describe('ListFormfieldComponent', () => {
  let component: ListFormfieldComponent;
  let fixture: ComponentFixture<ListFormfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormfieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
