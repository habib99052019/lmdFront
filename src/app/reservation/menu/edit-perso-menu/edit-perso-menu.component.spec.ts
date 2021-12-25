import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersoMenuComponent } from './edit-perso-menu.component';

describe('EditPersoMenuComponent', () => {
  let component: EditPersoMenuComponent;
  let fixture: ComponentFixture<EditPersoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
