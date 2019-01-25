import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events } from 'ionic-angular';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { FeedPage } from '../feed/feed';
import { UprofilePage } from '../uprofile/uprofile';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage {
  userdata: any;
  location: Array<{ id: any, name: any, description: any }> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider,public events: Events) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
    }
    if (localStorage.getItem('taxiData')) {
      this.userdata = JSON.parse(localStorage.getItem('taxiData'));
    }
    this.events.publish('app');
  }

  ionViewDidLoad() {
    this.locationlist();
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
    //this.navCtrl.push(UprofilePage);
  }

  locationlist() {
      this.service.locationlist().subscribe(res => {
        for (let i = 0; i < Object.keys(res).length; i++) {
          this.location.push({
            id: res[i].id,
            name: res[i].name,
            description: res[i].description
          });
        }
      })
  }

  doRefresh(refresher) {
    this.location =[];
    this.locationlist();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  gotofeed(id) {
    this.navCtrl.push(FeedPage, { id: id });
  }
}
