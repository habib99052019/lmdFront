import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { ReservationServiceService } from './service/reservation-service.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { StockService } from './service/stock.service';
import { InventaireService } from './service/inventaire.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    AuthGuard,
    AuthService,
    DynamicScriptLoaderService,
    ReservationServiceService,
    StockService,
    InventaireService
    

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
