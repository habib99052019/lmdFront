import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

import { StockRoutingModule } from './stock-routing.module';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { InventaireOptionsComponent } from './inventaire-options/inventaire-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    StcokOptionsComponent,
    EmptyPageComponent,
    InventaireOptionsComponent
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
