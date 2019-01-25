import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { TloginPage } from '../tlogin/tlogin';


@IonicPage()
@Component({
  selector: 'page-tsignup',
  templateUrl: 'tsignup.html',
})
export class TsignupPage {
  repassword: any = null;
  user = {
    username: null,
    email: null,
    name: null,
    password: null,
    contact_number: null,
    gender: null,
    country: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
  }

  signup() {
    console.log(this.user)
    this.services.signuptourist(this.user).subscribe(res => {
      alert(JSON.stringify(res.message));
      this.navCtrl.setRoot(TloginPage);
    })
  }

}
