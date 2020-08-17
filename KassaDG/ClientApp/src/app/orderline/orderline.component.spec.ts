import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlineComponent } from './orderline.component';

describe('OrderlineComponent', () => {
  let component: OrderlineComponent;
  let fixture: ComponentFixture<OrderlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
