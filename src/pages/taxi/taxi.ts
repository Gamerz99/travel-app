import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { TprofilePage } from '../tprofile/tprofile';
import { TransisitionProvider } from '../../providers/transisition/transisition';
import { UprofilePage } from '../uprofile/uprofile';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-taxi',
  templateUrl: 'taxi.html',
})
export class TaxiPage {
  userdata: any;
  taxiguidelist: Array<{ model: any, make: any, rate_per_km: any, id: any, is_available: any }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public transisition: TransisitionProvider, public service: ServicesProvider) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    this.gettaxilist();
  }

  presentProfileModal(userId) {
    this.navCtrl.push(TprofilePage, { userId: userId });
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
  }

  gettaxilist() {
    this.service.gettaxilist("available").subscribe(res => {
      for (let i = 0; i < Object.keys(res).length; i++) {
        this.taxiguidelist.push({
          model: res[i].model,
          make: res[i].make,
          rate_per_km: res[i].rate_per_km,
          id: res[i].id,
          is_available: res[i].is_available
        });
      }
    })
  }

}
