import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSampleComponent } from './test-sample.component';

describe('TestSampleComponent', () => {
  let component: TestSampleComponent;
  let fixture: ComponentFixture<TestSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
