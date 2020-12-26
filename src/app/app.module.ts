import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigService } from './services/config.service';

import * as Parse from 'parse';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [ConfigService],
      multi: true,
    },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Executes prior to Angular fully bootstrapping.
 * @param config The Configuration Service
 */
export function appInitFactory(config: ConfigService) {
  return () => {
    return new Promise<void>((resolve, reject) => {
      (Parse as any).serverURL = config.configParams.parseServerUrl;
      Parse.initialize(config.configParams.parseAppId);

      resolve();
    });
  };
}
