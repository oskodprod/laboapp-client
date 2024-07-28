import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabratComponent } from './view-labrat.component';

describe('ViewLabratComponent', () => {
  let component: ViewLabratComponent;
  let fixture: ComponentFixture<ViewLabratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLabratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLabratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
