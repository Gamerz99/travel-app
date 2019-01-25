import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {
  wishlist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem('wishlist')) {
      this.wishlist = JSON.parse(localStorage.getItem('wishlist'));
    }
  }

  clearlist(){
    this.wishlist=[];
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
  }

}
