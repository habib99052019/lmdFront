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
    AllFamilyComponent 
    
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StockRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
  ]
})
export class StockModule { }
