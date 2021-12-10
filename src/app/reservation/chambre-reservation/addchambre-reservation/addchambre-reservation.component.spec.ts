import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchambreReservationComponent } from './addchambre-reservation.component';

describe('AddchambreReservationComponent', () => {
  let component: AddchambreReservationComponent;
  let fixture: ComponentFixture<AddchambreReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddchambreReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchambreReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
