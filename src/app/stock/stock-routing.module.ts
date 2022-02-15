import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { EconomatComponent } from './stcok-options/economat/economat.component';
import { ExterieurComponent } from './stcok-options/exterieur/exterieur.component';
import { ShopComponent } from './stcok-options/shop/shop.component';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

const routes: Routes = [
  {
    path: 'gestion-stock',
    component: EmptyPageComponent
  },
  {
    path: 'economat',
    component: EconomatComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'exterieur',
    component: ExterieurComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
