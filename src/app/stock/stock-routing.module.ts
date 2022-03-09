import { FactoryTarget } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { AllArticlesDepotComponent } from './depot/all-articles-depot/all-articles-depot.component';
import { AllDepotComponent } from './depot/all-depot/all-depot.component';
import { AllArticlesCategorieComponent } from './depot/categorie/all-articles-categorie/all-articles-categorie.component';
import { CategorieComponent } from './depot/categorie/categorie.component';
import { AllArticlesComponent } from './depot/categorie/famille/all-articles/all-articles.component';
import { AllFamilyComponent } from './depot/categorie/famille/all-family/all-family.component';
import { FamilleComponent } from './depot/categorie/famille/famille.component';
import { AllArticlesTypesComponent } from './depot/categorie/famille/type/all-articles-types/all-articles-types.component';
import { AllTypesComponent } from './depot/categorie/famille/type/all-types/all-types.component';
import { ArticleComponent } from './depot/categorie/famille/type/article/article.component';
import { TypeComponent } from './depot/categorie/famille/type/type.component';
import { DepotComponent } from './depot/depot.component';


const routes: Routes = [
  {
    path: 'gestion-stock',
    component: DepotComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name',
    component: CategorieComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name',
    component: FamilleComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name/:name',
    component: TypeComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/:name/:name/:name',
    component: ArticleComponent
  },
  {
    path: 'gestion-stock/depot/tous',
    component: AllDepotComponent
  },
  {
    path: 'gestion-stock/depot/tous/:name',
    component: FamilleComponent
  },
  {
    path: 'gestion-stock/depot/tous/:name/:name',
    component: TypeComponent
  },
  {
    path: 'gestion-stock/depot/tous/:name/:name/:name',
    component: ArticleComponent
  },

  {
    path: 'gestion-stock/depot/articles',
    component: AllArticlesDepotComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/list/articles/all/details',
    component: AllArticlesCategorieComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/list/familles/all/details/go',
    component: AllFamilyComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/list/familles/all/details/go/articles',
    component: AllArticlesComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/list/familles/all/details/go/spec/types',
    component: AllTypesComponent
  },
  {
    path: 'gestion-stock/depot/categorie/:name/list/familles/all/details/go/spec/full/articles',
    component: AllArticlesTypesComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courses/add',
    component: AddCourseComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
