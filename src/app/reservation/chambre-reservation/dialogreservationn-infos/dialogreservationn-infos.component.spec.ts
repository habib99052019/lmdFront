import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogreservationnInfosComponent } from './dialogreservationn-infos.component';

describe('DialogreservationnInfosComponent', () => {
  let component: DialogreservationnInfosComponent;
  let fixture: ComponentFixture<DialogreservationnInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogreservationnInfosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogreservationnInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
