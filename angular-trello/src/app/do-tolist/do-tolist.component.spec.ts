import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoTolistComponent } from './do-tolist.component';

describe('DoTolistComponent', () => {
  let component: DoTolistComponent;
  let fixture: ComponentFixture<DoTolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoTolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoTolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
