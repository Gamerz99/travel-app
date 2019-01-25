import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonRating } from '../../components/ion-rating/ion-rating';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { CallNumber } from '@ionic-native/call-number';
import { TransisitionProvider } from '../../providers/transisition/transisition';
import { UprofilePage } from '../uprofile/uprofile';
import { ServicesProvider } from '../../providers/services/services';


@IonicPage()
@Component({
  selector: 'page-tprofile',
  templateUrl: 'tprofile.html',
})
export class TprofilePage {
  userdata: any;
  id: any;
  profile: string = "details";
  taxi:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, private callNumber: CallNumber, public transisition: TransisitionProvider) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    this.id = navParams.get('userId');
    this.gettaxi();
  }


  starClicked(value) {
    alert(value);
  }

  call() {
    this.callNumber.callNumber("18001010101", true)
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
    //this.navCtrl.push(UprofilePage);
  }

  gettaxi(){
    this.service.gettaxi(this.id).subscribe(res=>{
      this.taxi=res;
    })
  }

}
