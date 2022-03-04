import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesTypesComponent } from './all-articles-types.component';

describe('AllArticlesTypesComponent', () => {
  let component: AllArticlesTypesComponent;
  let fixture: ComponentFixture<AllArticlesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticlesTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticlesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
