import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UprofilePage } from '../uprofile/uprofile';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  userdata:any;
  user={
    username:null,
    email: null,
    name:null,
    contact_number:null,
    gender:null,
    country:null,
    age:null,
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public services: ServicesProvider) {
    if (localStorage.getItem('touristData')) {
      this.userdata=JSON.parse(localStorage.getItem('touristData'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }



  updatetourist(){
    this.user.username=this.userdata.username;
    this.user.name=this.userdata.name;
    this.user.contact_number=this.userdata.contact_number;
    this.user.email=this.userdata.email;
    this.user.gender=this.userdata.gender;
    this.user.age=this.userdata.age;
    this.user.country=this.userdata.country;
    console.log(this.user)
    this.services.updatetourist(this.user).subscribe(res=>{
      localStorage.clear();
      alert(JSON.stringify(res));
      localStorage.setItem('touristData', JSON.stringify(this.userdata))
      this.navCtrl.setRoot(UprofilePage);
    })
  }
}
