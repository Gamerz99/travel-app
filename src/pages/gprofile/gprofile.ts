import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IonRating } from '../../components/ion-rating/ion-rating';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { CallNumber } from '@ionic-native/call-number';
import { ServicesProvider } from '../../providers/services/services';
import { UprofilePage } from '../uprofile/uprofile';

@IonicPage()
@Component({
  selector: 'page-gprofile',
  templateUrl: 'gprofile.html',
})
export class GprofilePage {
  userdata: any;
  username: any;
  profile: string = "details";
  guide: any;
  ficon: any = "primary";
  rate = {
    rate_by: null,
    comment: null,
    rating: 0
  }
  ratinglist: Array<{ rate_by: any, comment: any, rating: any, photo:any, timestamp: any }> = [];
  favourite: Array<{ name: any, area: any, username: any }> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public service: ServicesProvider, public toastCtrl: ToastController) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    this.username = navParams.get('username');

  }
  ionViewDidLoad() {
    this.getguide();
    this.changeficon();
    this.getratinglist();
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
    //this.navCtrl.push(UprofilePage);
  }


  getguide() {
    this.service.getguide(this.username).subscribe(res => {
      this.guide = res;
    })
  }

  starClicked(value) {
    this.rate.rating = value;
    this.rate.rate_by = this.userdata.username;
  }

  addrate() {
    if (this.rate.rating > 0) {
      this.service.rateguide(this.username, this.rate).subscribe(res => {
        this.getratinglist();
        alert("Rate succesfull");
        this.rate.rating = 0;
        this.rate.comment=null;
      })
    }
    else {
      alert("Please select star")
    }
  }

  getratinglist() {
    this.service.getguideratinglist(this.username, "1").subscribe(res => {
      this.ratinglist=[];
      for (let i = 0; i < Object.keys(res).length; i++) {
        this.service.getguide(this.username).subscribe(pic=>{
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
  }

  call() {
    this.callNumber.callNumber(this.guide.contact_number, true)
  }

  changeficon() {
    if (localStorage.getItem('favourite')) {
      this.favourite = JSON.parse(localStorage.getItem('favourite'));
    }
    if (Object.keys(this.favourite).length == 0) {
      this.ficon = "primary";
    }
    else {
      let status = false;
      for (let i = 0; i < Object.keys(this.favourite).length; i++) {
        if (this.favourite[i].username == this.username) {
          status = true;
        }
        console.log(status)
      }
      if (status == true) {
        this.ficon = "danger";
      }
    }
  }

  addfavourite() {
    if (localStorage.getItem('favourite')) {
      this.favourite = JSON.parse(localStorage.getItem('favourite'));
    }
    if (Object.keys(this.favourite).length == 0) {
      let toast = this.toastCtrl.create({
        message: 'Add to favourite',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.favourite.push({ name: this.guide.name, area: this.guide.area, username: this.guide.username });
      this.ficon = "danger";
    }
    else {
      let status = true;
      for (let i = 0; i < Object.keys(this.favourite).length; i++) {
        if (this.favourite[i].username == this.username) {
          status = false;
        }
      }
      if (status == true) {
        let toast = this.toastCtrl.create({
          message: 'Add to favourite',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.favourite.push({ name: this.guide.name, area: this.guide.area, username: this.guide.username });
        this.ficon = "danger";
      }
    }
    localStorage.setItem('favourite', JSON.stringify(this.favourite))
  }

}
