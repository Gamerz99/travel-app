import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services'
import { GhomePage } from '../ghome/ghome'

@IonicPage()
@Component({
  selector: 'page-gedit',
  templateUrl: 'gedit.html',
})
export class GeditPage {
  userdata: any;
  user = {
    username: null,
    name: null,
    email: null,
    contact_number: null,
    area: null,
    gender: null
  }

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public service: ServicesProvider) {
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
    }
  }

  updateguide() {
    this.user.username = this.userdata.username;
    this.user.name = this.userdata.name;
    this.user.email = this.userdata.email;
    this.user.contact_number = this.userdata.contact_number;
    this.user.area = this.userdata.area;
    this.user.gender = this.userdata.gender;
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Updating...'
    });
    loading.present();
    this.service.guideupdate(this.user).subscribe(res => {
      alert(JSON.stringify(res.message));
      if (res.message == "User updated") {
        this.service.getguide(this.userdata.username).subscribe(res => {
          localStorage.clear();
          //store cash
          localStorage.setItem('guideData', JSON.stringify(this.userdata))
          //loading dismiss
          loading.dismiss();
          this.navCtrl.setRoot(GhomePage);
        })
      }
      else {
        loading.dismiss();
      }
    })
  }
}
