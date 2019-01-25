import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SmallIonRatingComponent } from '../../components/small-ion-rating/small-ion-rating';
import { ServicesProvider } from '../../providers/services/services';
import { Geolocation } from '@ionic-native/geolocation';
import { FeedmapPage } from '../feedmap/feedmap';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

declare var google;

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  distance: string = "loading";
  duration: string = "loading";
  destination: any;
  id: number;
  mylocation: any;
  currentlocation: any = null;
  userdata: any;
  wishlist: Array<{ name: any, description: any, id: any }> = [];
  ficon: any = "primary";
  favourite: Array<{ name: any, description: any, id: any }> = [];
  weather: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeGeocoder: NativeGeocoder, public services: ServicesProvider, public toastCtrl: ToastController, public geoLoc: Geolocation, public loadingCtrl: LoadingController) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
    }
    if (localStorage.getItem('mylocation')) {
      this.mylocation = JSON.parse(localStorage.getItem('mylocation'));
    }
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    this.getlocations();
    setTimeout(() => {
      this.getweather();
      //this.services.getweather("LK","Galle").subscribe(res => {
      // this.weather = res.current_observation;
      //})
      this.calcdistance(this.mylocation.latitude, this.mylocation.longitude, this.destination.latitude, this.destination.longitude);
      this.currentlocation = new google.maps.LatLng(this.mylocation.latitude, this.mylocation.longitude);
    }, 500);
    this.changeficon();

  }

  getweather() {
    this.nativeGeocoder.reverseGeocode(this.destination.latitude, this.destination.longitude).then((result: NativeGeocoderReverseResult) => {
      this.services.getweather(result[0].countryCode, result[0].subAdministrativeArea).subscribe(res => {
        this.weather = res.current_observation;
      })
    }
    )
  }

  calcdistance(lati: number, long: number, elati: number, elong: number) {
    this.services.distance(lati, long, elati, elong).subscribe(res => {
      this.distance = res.rows[0].elements[0].distance.text;
      this.duration = res.rows[0].elements[0].duration.text;
    });

  }

  getlocations() {
    this.services.getlocation(this.id).subscribe(res => {
      this.destination = res;
    })

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
        if (this.favourite[i].id == this.id) {
          status = true;
        }
      }
      if (status == true) {
        this.ficon = "danger";
      }
    }
  }

  addlist() {
    if (localStorage.getItem('touristData')) {
      if (localStorage.getItem('wishlist')) {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist'));
      }
      if (Object.keys(this.wishlist).length == 0) {
        let toast = this.toastCtrl.create({
          message: 'Add to wishlist',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.wishlist.push({ name: this.destination.name, description: this.destination.description, id: this.id });
      }
      else {
        let status = true;
        for (let i = 0; i < Object.keys(this.wishlist).length; i++) {
          if (this.wishlist[i].id == this.id) {
            status = false;
          }
        }
        if (status == true) {
          let toast = this.toastCtrl.create({
            message: 'Add to wishlist',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.wishlist.push({ name: this.destination.name, description: this.destination.description, id: this.id });
        }
      }
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))

    }

    if (localStorage.getItem('guideData')) {
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
        this.favourite.push({ name: this.destination.name, description: this.destination.description, id: this.id });
        this.ficon = "danger";
      }
      else {
        let status = true;
        for (let i = 0; i < Object.keys(this.favourite).length; i++) {
          if (this.favourite[i].id == this.id) {
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
          this.favourite.push({ name: this.destination.name, description: this.destination.description, id: this.id });
          this.ficon = "danger";
        }
      }
      localStorage.setItem('favourite', JSON.stringify(this.favourite))
    }
  }

  gotomap(destination) {
    this.navCtrl.push(FeedmapPage, { destination: destination, currentlocation: this.currentlocation });
  }


}
