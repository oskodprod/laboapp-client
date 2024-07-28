import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLabratComponent } from './list-labrat.component';

describe('ListLabratComponent', () => {
  let component: ListLabratComponent;
  let fixture: ComponentFixture<ListLabratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLabratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
