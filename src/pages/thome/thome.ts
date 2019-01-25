import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { IonRating } from '../../components/ion-rating/ion-rating';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { CallNumber } from '@ionic-native/call-number';
import { ServicesProvider } from '../../providers/services/services'
import { TeditPage } from '../tedit/tedit';

@IonicPage()
@Component({
  selector: 'page-thome',
  templateUrl: 'thome.html',
})
export class ThomePage {
  profile: string = "details";
  userdata: any;
  ratinglist: Array<{ rate_by: any, comment: any, rating: any, photo: any, timestamp: any }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public events: Events, public service: ServicesProvider) {
    if (localStorage.getItem('taxiData')) {
      this.userdata = JSON.parse(localStorage.getItem('taxiData'));
    }
    this.events.publish('app');
  }

  ionViewDidLoad() {
    this.getratinglist();
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
    this.navCtrl.push(TeditPage)
  }

  call() {
    this.callNumber.callNumber(this.userdata.contact_number, true)
  
  }
}
