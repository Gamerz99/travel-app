import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { TaxiPage } from '../pages/taxi/taxi';
import { UprofilePage } from '../pages/uprofile/uprofile';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { WelcomePage } from '../pages/welcome/welcome';
import { FavouritePage } from '../pages/favourite/favourite';
import { GhomePage } from '../pages/ghome/ghome';
import { TripPage } from '../pages/trip/trip';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { ThomePage } from '../pages/thome/thome';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  mylocation = {
    latitude: null,
    longitude: null
  };

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loadingCtrl: LoadingController, public events: Events, public geoLoc: Geolocation) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    events.subscribe('app', () => {
      if (localStorage.getItem('touristData')) {
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Profile', component: UprofilePage },
          { title: 'Favourite', component: FavouritePage },
          { title: 'Taxi', component: TaxiPage },
          { title: 'Wishlist', component: WishlistPage },
          { title: 'Logout', component: LogoutPage }
        ];
      }
      if (localStorage.getItem('guideData')) {
        this.pages = [
          { title: 'Home', component: TripPage },
          { title: 'Profile', component: GhomePage },
          { title: 'Favourite', component: FavouritePage },
          { title: 'Map', component: MapPage },
          { title: 'Logout', component: LogoutPage }
        ];
      }
      if (localStorage.getItem('taxiData')) {
        this.pages = [
          { title: 'Home', component: TripPage },
          { title: 'Profile', component: ThomePage },
          { title: 'Map', component: MapPage },
          { title: 'Logout', component: LogoutPage }
        ];
      }
    })

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (localStorage.getItem('touristData')) {
        this.rootPage = HomePage;
      }
      else {
        if (localStorage.getItem('guideData')) {
          this.rootPage = TripPage;
        }
        else {
          if (localStorage.getItem('taxiData')) {
            this.rootPage = TripPage;
          }
          else {
            this.rootPage = TaxiPage;
          }
        }
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getmylocation();
    });
  }

  getmylocation() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Search Your location...'
    });
    if (this.mylocation.latitude == null) {
      loading.present();
      this.geoLoc.getCurrentPosition().then((position) => {
        this.mylocation.latitude = (position.coords.latitude);
        this.mylocation.longitude = (position.coords.longitude);
        localStorage.setItem('mylocation', JSON.stringify(this.mylocation));
        loading.dismiss();
      })
    }
    else {
      this.geoLoc.getCurrentPosition().then((position) => {
        this.mylocation.latitude = (position.coords.latitude);
        this.mylocation.longitude = (position.coords.longitude);
        localStorage.setItem('mylocation', JSON.stringify(this.mylocation));
      })
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == HomePage) {
      this.nav.setRoot(page.component);
    }
    else {
      if (page.component == TripPage) {
        this.nav.setRoot(page.component);
      }
      else {
        this.nav.push(page.component);
      }
    }
  }


}
