import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the UprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uprofile',
  templateUrl: 'uprofile.html',
})
export class UprofilePage {
  userdata: any;
  profile: string = "details";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem('touristData')) {
      this.userdata=JSON.parse(localStorage.getItem('touristData'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UprofilePage');
  }

  home(){
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.push(HomePage);

  }

  viewedit(){
   this.navCtrl.push(EditPage);


  }

}
