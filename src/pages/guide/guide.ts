import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GprofilePage } from '../gprofile/gprofile';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { ServicesProvider } from '../../providers/services/services';
import { UprofilePage } from '../uprofile/uprofile';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html',
})
export class GuidePage {
  mylocation: any;
  userdata: any;
  nearestguide: Array<{ name: any, area: any, username: any, rating: any, online: any }> = [];
  onlineguidelist: Array<{ name: any, area: any, username: any, rating: any, online: any }> = [];
  offlineguidelist: Array<{ name: any, area: any, username: any, rating: any, online: any }> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, public nativeGeocoder: NativeGeocoder, public geoLoc: Geolocation, public loadingCtrl: LoadingController) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('mylocation')) {
      this.mylocation = JSON.parse(localStorage.getItem('mylocation'));
    }
  }

  ionViewDidLoad() {
    this.getguidelist();
  }

  doRefresh(refresher) {
    this.offlineguidelist = [];
    this.onlineguidelist = [];
    this.nearestguide = [];
    this.getguidelist();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getguidelist() {
      this.service.getguidelist().subscribe(res => {
        this.guidelist(res);
      })
      this.service.autogetguidelist().subscribe(res => {
        this.guidelist(res);
      })
  }

  guidelist(res){
    this.offlineguidelist = [];
    this.onlineguidelist = [];
    for (let i = 0; i < Object.keys(res).length; i++) {
      if (res[i].online == true) {
        this.onlineguidelist.push({
          name: res[i].name,
          area: res[i].area,
          username: res[i].username,
          rating: res[i].rating,
          online: res[i].online
        });
      }
      else {
        this.offlineguidelist.push({
          name: res[i].name,
          area: res[i].area,
          username: res[i].username,
          rating: res[i].rating,
          online: res[i].online
        });
      }
    }

    this.nativeGeocoder.reverseGeocode(this.mylocation.latitude, this.mylocation.longitude).then((result: NativeGeocoderReverseResult) => {
      this.nearestguide = [];
      for (let i = 0; i < Object.keys(res).length; i++) {
        if (result[0].subAdministrativeArea == res[i].area) {
          this.nearestguide.push({
            name: res[i].name,
            area: res[i].area,
            username: res[i].username,
            rating: res[i].rating,
            online: res[i].online
          });
        }
      }
    }).catch(err0r => ("ss"));
  }

  presentProfileModal(username) {
    this.navCtrl.push(GprofilePage, { username: username });
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
  }

  searchguide(event){
    console.log(event.target.value)
    
  }
}
