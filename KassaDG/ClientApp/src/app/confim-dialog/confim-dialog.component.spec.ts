import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimDialogComponent } from './confim-dialog.component';

describe('ConfimDialogComponent', () => {
  let component: ConfimDialogComponent;
  let fixture: ComponentFixture<ConfimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
