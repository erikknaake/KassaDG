import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeCreditsDialogComponent } from './negative-credits-dialog.component';

describe('NegativeCreditsDialogComponent', () => {
  let component: NegativeCreditsDialogComponent;
  let fixture: ComponentFixture<NegativeCreditsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegativeCreditsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativeCreditsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
