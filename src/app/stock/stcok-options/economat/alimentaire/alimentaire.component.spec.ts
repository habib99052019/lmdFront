import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentaireComponent } from './alimentaire.component';

describe('AlimentaireComponent', () => {
  let component: AlimentaireComponent;
  let fixture: ComponentFixture<AlimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlimentaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
