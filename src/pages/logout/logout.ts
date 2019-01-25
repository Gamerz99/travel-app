import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';


@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  userdata: any;
  mylocation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, private googlePlus: GooglePlus, private fb: Facebook) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging Out'
    });
    loading.present();
    if (localStorage.getItem('mylocation')) {
      this.mylocation = JSON.parse(localStorage.getItem('mylocation'));  
    }
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
    }
    if (localStorage.getItem('taxiData')) {
      this.userdata = JSON.parse(localStorage.getItem('taxiData'));
    }

    if (this.userdata.login == "facebook") {
      this.fb.logout();
    }
    if (this.userdata.login == "gmail") {
      this.googlePlus.logout();
    }
    localStorage.clear();
    setTimeout(() => {
      localStorage.setItem('mylocation', JSON.stringify(this.mylocation));
    }, 2000);
    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.setRoot(WelcomePage);
    }, 3000);



  }

}
