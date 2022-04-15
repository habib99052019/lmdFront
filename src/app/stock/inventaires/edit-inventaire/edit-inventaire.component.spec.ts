import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInventaireComponent } from './edit-inventaire.component';

describe('EditInventaireComponent', () => {
  let component: EditInventaireComponent;
  let fixture: ComponentFixture<EditInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInventaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
