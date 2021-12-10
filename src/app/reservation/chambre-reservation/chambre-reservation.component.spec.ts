import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreReservationComponent } from './chambre-reservation.component';

describe('ChambreReservationComponent', () => {
  let component: ChambreReservationComponent;
  let fixture: ComponentFixture<ChambreReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambreReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambreReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
