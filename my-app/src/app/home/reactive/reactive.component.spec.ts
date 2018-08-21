import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { REACTIVEComponent } from './reactive.component';

describe('REACTIVEComponent', () => {
  let component: REACTIVEComponent;
  let fixture: ComponentFixture<REACTIVEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ REACTIVEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(REACTIVEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
