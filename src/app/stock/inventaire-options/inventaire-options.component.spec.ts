import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaireOptionsComponent } from './inventaire-options.component';

describe('InventaireOptionsComponent', () => {
  let component: InventaireOptionsComponent;
  let fixture: ComponentFixture<InventaireOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaireOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
