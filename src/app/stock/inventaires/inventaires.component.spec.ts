import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventairesComponent } from './inventaires.component';

describe('InventairesComponent', () => {
  let component: InventairesComponent;
  let fixture: ComponentFixture<InventairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
