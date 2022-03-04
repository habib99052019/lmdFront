import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTypesComponent } from './all-types.component';

describe('AllTypesComponent', () => {
  let component: AllTypesComponent;
  let fixture: ComponentFixture<AllTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
