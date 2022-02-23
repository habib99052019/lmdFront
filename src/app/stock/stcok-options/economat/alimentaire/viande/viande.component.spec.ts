import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViandeComponent } from './viande.component';

describe('ViandeComponent', () => {
  let component: ViandeComponent;
  let fixture: ComponentFixture<ViandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
