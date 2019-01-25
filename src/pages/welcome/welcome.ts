import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GloginPage } from '../glogin/glogin';
import { TloginPage } from '../tlogin/tlogin';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  public menu:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  guide(){
    this.menu="guide";
    this.navCtrl.push(GloginPage);
  }

  tourist(){
    this.menu="tourist";
    this.navCtrl.push(LoginPage);
  }

  taxi(){
    this.menu="guide";
    this.navCtrl.push(TloginPage);
  }
}
