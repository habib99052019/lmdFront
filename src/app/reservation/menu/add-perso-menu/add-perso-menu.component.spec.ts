import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersoMenuComponent } from './add-perso-menu.component';

describe('AddPersoMenuComponent', () => {
  let component: AddPersoMenuComponent;
  let fixture: ComponentFixture<AddPersoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
