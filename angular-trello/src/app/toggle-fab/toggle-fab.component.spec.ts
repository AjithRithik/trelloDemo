import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFabComponent } from './toggle-fab.component';

describe('ToggleFabComponent', () => {
  let component: ToggleFabComponent;
  let fixture: ComponentFixture<ToggleFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
