import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StockRoutingModule } from './stock-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';

import { DepotComponent } from './depot/depot.component';
import { CategorieComponent } from './depot/categorie/categorie.component';
import { FamilleComponent } from './depot/categorie/famille/famille.component';
import { TypeComponent } from './depot/categorie/famille/type/type.component';
import { ArticleComponent } from './depot/categorie/famille/type/article/article.component';
import { AllDepotComponent } from './depot/all-depot/all-depot.component';
import { AllArticlesDepotComponent } from './depot/all-articles-depot/all-articles-depot.component';
import { AllArticlesCategorieComponent } from './depot/categorie/all-articles-categorie/all-articles-categorie.component';
import { AllFamilyComponent } from './depot/categorie/famille/all-family/all-family.component';
import { AllArticlesComponent } from './depot/categorie/famille/all-articles/all-articles.component';
import { AllTypesComponent } from './depot/categorie/famille/type/all-types/all-types.component';
import { AllArticlesTypesComponent } from './depot/categorie/famille/type/all-articles-types/all-articles-types.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { ShowCourseComponent } from './courses/show-course/show-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';



//pagination module
import {NgxPaginationModule} from 'ngx-pagination';
import { ShowArticleComponent } from './depot/categorie/famille/type/article/show-article/show-article.component';


@NgModule({
  declarations: [
    DepotComponent,
    CategorieComponent,
    FamilleComponent,
    TypeComponent,
    ArticleComponent,
    AllDepotComponent,
    AllArticlesDepotComponent,
    AllArticlesCategorieComponent,
    AllFamilyComponent,
    AllArticlesComponent,
    AllTypesComponent,
    AllArticlesTypesComponent,
    CoursesComponent,
    AddCourseComponent,
    ShowCourseComponent,
    EditCourseComponent,
    ShowArticleComponent 
    
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StockRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class StockModule { }
