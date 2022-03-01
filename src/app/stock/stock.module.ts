import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

import { StockRoutingModule } from './stock-routing.module';
import { InventaireOptionsComponent } from './inventaire-options/inventaire-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { EconomatComponent } from './stcok-options/economat/economat.component';
import { ShopComponent } from './stcok-options/shop/shop.component';
import { ExterieurComponent } from './stcok-options/exterieur/exterieur.component';
import { AlimentaireComponent } from './stcok-options/economat/alimentaire/alimentaire.component';
import { ViandeComponent } from './stcok-options/economat/alimentaire/viande/viande.component';
import { NettoyageComponent } from './stcok-options/economat/nettoyage/nettoyage.component';
import { DepotComponent } from './depot/depot.component';
import { CategorieComponent } from './depot/categorie/categorie.component';
import { FamilleComponent } from './depot/categorie/famille/famille.component';
import { TypeComponent } from './depot/categorie/famille/type/type.component';
import { ArticleComponent } from './depot/categorie/famille/type/article/article.component';

@NgModule({
  declarations: [
    StcokOptionsComponent,
    InventaireOptionsComponent,
    EconomatComponent,
    ShopComponent,
    ExterieurComponent,
    AlimentaireComponent,
    ViandeComponent,
    NettoyageComponent,
    DepotComponent,
    CategorieComponent,
    FamilleComponent,
    TypeComponent,
    ArticleComponent 
    
   
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
