import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';
import { AdMobFree, AdMobFreeBannerConfig  } from '@ionic-native/admob-free';
/**
 * Generated class for the TimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@IonicPage()


@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  

  constructor(private admobFree: AdMobFree, public navCtrl: NavController, public navParams: NavParams, private flashlight: Flashlight) {
  }

  timeInSeconds: number;
  public seconds;
  public hours;
  public minutes;
  public idOfSetTimeout;

  timer: CountdownTimer;


  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
   
    this.minutes = this.navParams.get("minutes");
    this.seconds = this.navParams.get("seconds");
    this.hours = this.navParams.get("hours");
    

    this.timeInSeconds = this.hours*3600 + this.minutes*60 + 1*this.seconds;
    console.log("Time in sec: " + this.timeInSeconds)

    this.initTimer();

    this.flashlight.switchOn();

    this.idOfSetTimeout = setTimeout(() => {
      console.log("The lamp is going to be switch off the timer is finished")
      this.flashlight.switchOff();
    }, 1000*this.timeInSeconds);

    this.startTimer();
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave")
    this.timer.secondsRemaining = 0
    console.log("Time in sec: " + this.timer.secondsRemaining)
    this.flashlight.switchOff();
    clearTimeout(this.idOfSetTimeout);
  }

  hasFinished() {
    return this.timer.hasFinished;
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    console.log("startTimer : start")
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }

  pauseTimer() {
    console.log("pauseTimer : start")
    console.log("Time in sec: " + this.timer.secondsRemaining)
    this.flashlight.switchOff();
    this.timer.runTimer = false;
    this.timer.hasStarted = false;
    clearTimeout(this.idOfSetTimeout);
  }

  resumeTimer() {
    console.log("resumeTimer : start")
    this.startTimer();
    if(this.timer.secondsRemaining != 0)
        this.flashlight.switchOn();
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    console.log("Time in sec: " + this.timer.secondsRemaining)

    this.idOfSetTimeout = setTimeout(() => {
      console.log("The lamp is going to be switch off the timer is finished")
      this.flashlight.switchOff();
    }, 1000*this.timer.secondsRemaining);
  }

  timerTick() {
    setTimeout(() => {
      if (!this.timer.runTimer || this.timer.secondsRemaining == 0 ) { return; }
      this.timer.secondsRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
      if (this.timer.secondsRemaining > 0 && this.timer.runTimer) {
        console.log("timertick : Gonna run a timer tick")
        console.log("Time in sec: " + this.timer.secondsRemaining) 
        this.timerTick();
      } else {
        this.timer.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    console.log("Get Seconds as Digital Clock")
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
