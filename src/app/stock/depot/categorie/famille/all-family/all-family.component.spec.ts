import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFamilyComponent } from './all-family.component';

describe('AllFamilyComponent', () => {
  let component: AllFamilyComponent;
  let fixture: ComponentFixture<AllFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
