import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDepotComponent } from './all-depot.component';

describe('AllDepotComponent', () => {
  let component: AllDepotComponent;
  let fixture: ComponentFixture<AllDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
