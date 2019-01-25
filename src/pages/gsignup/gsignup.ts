import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
import { GloginPage } from '../glogin/glogin';

@IonicPage()
@Component({
  selector: 'page-gsignup',
  templateUrl: 'gsignup.html',
})
export class GsignupPage {
  month: '1990-02-19'
  repassword: null;
  user = {
    username: null,
    name: null,
    email: null,
    contact_number: null,
    area: null,
    password: null,
    gender: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider) {
  }
  signup() {
    console.log(this.user)
    if (this.repassword == this.user.password) {
      this.service.signupguide(this.user).subscribe(res => {
        alert(JSON.stringify(res.message));
        if (res.message == "User created") {
          this.navCtrl.setRoot(GloginPage);
        }
      })
    }
    else {
      alert("Password not match")
    }
  }

}
