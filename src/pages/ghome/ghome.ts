import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GeditPage } from '../gedit/gedit';
import { IonRating } from '../../components/ion-rating/ion-rating';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { CallNumber } from '@ionic-native/call-number';
import { ServicesProvider } from '../../providers/services/services'


@IonicPage()
@Component({
  selector: 'page-ghome',
  templateUrl: 'ghome.html',
})
export class GhomePage {
  user = {
    online: null
  }
  profile: string = "details";
  userdata: any;
  ratinglist: Array<{ rate_by: any, comment: any, rating: any, photo: any, timestamp: any }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public events: Events, public service: ServicesProvider) {

    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
      this.checkonline();
    }
    this.events.publish('app');
  }

  ionViewDidLoad() {
    this.getratinglist();
  }

  starClicked(value) {
    alert(value);
  }

  checkonline() {
    this.service.getguide(this.userdata.username).subscribe(res => {
      this.user.online = res.online;
      this.userdata.rating = res.rating;
      localStorage.setItem('guideData', JSON.stringify(this.userdata))
    })
  }

  getratinglist() {
    this.service.getguideratinglist(this.userdata.username, "1").subscribe(res => {
      this.ratinglist = [];
      for (let i = 0; i < Object.keys(res).length; i++) {
        this.service.getguide(this.userdata.username).subscribe(pic => {
          this.ratinglist.push({
            rate_by: res[i].rate_by,
            comment: res[i].comment,
            rating: res[i].rating,
            photo: pic.profile_pic,
            timestamp: res[i].timestamp
          });
        })
      }

    })
    this.service.autogetguideratinglist(this.userdata.username, "1").subscribe(res => {
      if (Object.keys(res).length > Object.keys(this.ratinglist).length) {
        this.ratinglist=[];
        for (let i = 0; i < Object.keys(res).length; i++) {
          this.service.getguide(this.userdata.username).subscribe(pic => {
            this.ratinglist.push({
              rate_by: res[i].rate_by,
              comment: res[i].comment,
              rating: res[i].rating,
              photo: pic.profile_pic,
              timestamp: res[i].timestamp
            });
          })
        }
      }
    })
  }

  edit() {
    this.navCtrl.push(GeditPage)
  }

  toogle() {
    this.service.gchangeonline(this.userdata.username, this.user).subscribe(res => {
      this.checkonline();
    });
  }

  call() {
    this.callNumber.callNumber(this.userdata.contact_number, true)
  }

}
