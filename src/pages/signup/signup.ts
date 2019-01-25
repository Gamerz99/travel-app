import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { LoginPage } from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    console.log(this.user)
    this.services.signuptourist(this.user).subscribe(res => {
      alert(JSON.stringify(res.message));
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
