import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepotComponent } from './add-depot.component';

describe('AddDepotComponent', () => {
  let component: AddDepotComponent;
  let fixture: ComponentFixture<AddDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
