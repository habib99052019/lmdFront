import { FactoryTarget } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './depot/categorie/categorie.component';
import { FamilleComponent } from './depot/categorie/famille/famille.component';
import { ArticleComponent } from './depot/categorie/famille/type/article/article.component';
import { TypeComponent } from './depot/categorie/famille/type/type.component';
import { DepotComponent } from './depot/depot.component';
import { AlimentaireComponent } from './stcok-options/economat/alimentaire/alimentaire.component';
import { ViandeComponent } from './stcok-options/economat/alimentaire/viande/viande.component';
import { EconomatComponent } from './stcok-options/economat/economat.component';
import { NettoyageComponent } from './stcok-options/economat/nettoyage/nettoyage.component';
import { ExterieurComponent } from './stcok-options/exterieur/exterieur.component';
import { ShopComponent } from './stcok-options/shop/shop.component';
import { StcokOptionsComponent } from './stcok-options/stcok-options.component';

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
    path: 'gestion-stock/economat/nettoyage',
    component: NettoyageComponent
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
