import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesDepotComponent } from './all-articles-depot.component';

describe('AllArticlesDepotComponent', () => {
  let component: AllArticlesDepotComponent;
  let fixture: ComponentFixture<AllArticlesDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticlesDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticlesDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
