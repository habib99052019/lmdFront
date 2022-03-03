import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArticlesCategorieComponent } from './all-articles-categorie.component';

describe('AllArticlesCategorieComponent', () => {
  let component: AllArticlesCategorieComponent;
  let fixture: ComponentFixture<AllArticlesCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllArticlesCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllArticlesCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
