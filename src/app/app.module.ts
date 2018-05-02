import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TimerPage } from '../pages/timer/timer';
import { Flashlight } from '@ionic-native/flashlight';
import { AdMobFree } from '@ionic-native/admob-free';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TimerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TimerPage
  ],
  providers: [
    StatusBar,
    Flashlight,
    AdMobFree,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
