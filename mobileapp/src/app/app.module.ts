import { HttpRequestInterceptor } from './interceptors/http-loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalNotifications} from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({hardwareBackButton: false}), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
   // { provide: LocationStrategy, useClass: HashLocationStrategy }
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        // {
        //   provide:HTTP_INTERCEPTORS,
        //   useClass: HttpRequestInterceptor,
        //   multi:true
        // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
