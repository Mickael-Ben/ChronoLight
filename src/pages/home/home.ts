import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  constructor(public navCtrl: NavController, private admobFree: AdMobFree) {

  }

  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  ionViewDidLoad()
  { 
    console.log("Ionviewloaded")
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    
    this.admobFree.banner.prepare()
      .then(() => {
         console.log("Banner is ready")
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
    
  }
  validate(){
    this.navCtrl.push(TimerPage, {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds
      })
  }

  


}
