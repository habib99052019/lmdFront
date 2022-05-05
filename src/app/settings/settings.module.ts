import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';




//pagination module
import {NgxPaginationModule} from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AddArticleComponent } from './article/add-article/add-article.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddDepotComponent } from './depot/add-depot/add-depot.component';
import { AddFamilyComponent } from './family/add-family/add-family.component';
import { AddTypeComponent } from './type/add-type/add-type.component';

@NgModule({
  declarations: [
    
    AddArticleComponent,
         AddCategoryComponent,
         AddDepotComponent,
         AddFamilyComponent,
         AddTypeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SettingsRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SlickCarouselModule
  ]
})
export class SettingsModule { }