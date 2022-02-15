import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

import { StockRoutingModule } from './stock-routing.module';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { InventaireOptionsComponent } from './inventaire-options/inventaire-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { EconomatComponent } from './stcok-options/economat/economat.component';
import { ShopComponent } from './stcok-options/shop/shop.component';
import { ExterieurComponent } from './stcok-options/exterieur/exterieur.component';

@NgModule({
  declarations: [
    StcokOptionsComponent,
    EmptyPageComponent,
    InventaireOptionsComponent,
    EconomatComponent,
    ShopComponent,
    ExterieurComponent
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
