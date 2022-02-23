import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentaireComponent } from './stcok-options/economat/alimentaire/alimentaire.component';
import { ViandeComponent } from './stcok-options/economat/alimentaire/viande/viande.component';
import { EconomatComponent } from './stcok-options/economat/economat.component';
import { ExterieurComponent } from './stcok-options/exterieur/exterieur.component';
import { ShopComponent } from './stcok-options/shop/shop.component';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

const routes: Routes = [
  {
    path: 'gestion-stock',
    component: StcokOptionsComponent
  },
  {
    path: 'gestion-stock/economat',
    component: EconomatComponent
  },
  {
    path: 'gestion-stock/economat/alimentaire',
    component: AlimentaireComponent 
  },
  {
    path: 'gestion-stock/economat/alimentaire/viande',
    component: ViandeComponent
  },

  {
    path: 'gestion-stock/shop',
    component: ShopComponent
  },
  {
    path: 'gestion-stock/exterieur',
    component: ExterieurComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
