import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GprofilePage } from '../gprofile/gprofile';
import { FeedPage } from '../feed/feed';

@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  favourite: any = [];
  userdata: any;
  tourist: any = null;
  guide: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
      this.tourist = "tourist";
    }
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
      this.guide = "guide";
    }
    if (localStorage.getItem('favourite')) {
      this.favourite = JSON.parse(localStorage.getItem('favourite'));
    }
  }

  clearlist() {
    this.favourite = [];
    localStorage.setItem('favourite', JSON.stringify(this.favourite))
  }

  presentProfileModal(username) {
    this.navCtrl.push(GprofilePage, { username: username });
  }

  gotolocation(id) {
    this.navCtrl.push(FeedPage, { id: id });
  }
}
