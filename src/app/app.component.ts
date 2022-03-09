import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUrl: string;
  constructor(public _router: Router, private spinner: NgxSpinnerService) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
      window.scrollTo(0, 0);
    });

    //iconRegistry.addSvgIcon('thermometer', sanitizer.bypassSecurityTrustResourceUrl("./assets/icons/thermometer.svg"));
   // iconRegistry.addSvgIcon('quantity', sanitizer.bypassSecurityTrustResourceUrl("./assets/icons/quantity.svg"));
  }
}
