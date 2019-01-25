import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ServicesProvider } from '../../providers/services/services';
import { TsignupPage } from '../tsignup/tsignup';
import { TripPage } from '../trip/trip';

@IonicPage()
@Component({
  selector: 'page-tlogin',
  templateUrl: 'tlogin.html',
})
export class TloginPage {
  credentials = {
    username: null,
    password: null,
    remember: false
  }
  userdata = {
    username: null,
    email: null,
    name: "taxi",
    photo: "assets/imgs/profile.png",
    gender: null,
    contact_number: null,
    area: null,
    rating: null,
    idToken: null,
    login: null
  }
  password: null;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, private fb: Facebook, public service: ServicesProvider) {
    //check cash data
    if (localStorage.getItem('taxiData')) {
      this.presentLoadingDefault(TripPage);
    }
  }

  //normal login 
  login() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging in...'
    });
    loading.present();
    this.service.guidelogin(this.credentials).subscribe(suc => {
      this.userdata.idToken = suc.token;
      this.service.getguide(this.credentials.username).subscribe(res => {
        this.userdata.username = res.username;
        this.userdata.email = res.email;
        this.userdata.name = res.name;
        this.userdata.gender = res.gender;
        this.userdata.contact_number = res.contact_number;
        this.userdata.area = res.area;
        this.userdata.rating = res.rating;
        //store cash
        localStorage.setItem('taxiData', JSON.stringify(this.userdata))
        //loading dismiss
        loading.dismiss();
        this.navCtrl.setRoot(TripPage);
      })
    }, error => {
      loading.dismiss();
      alert("Invalid Credentials")
    })
  }

  //login with facebook
  logwithfacebook() {
    //create loading
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging in...'
    });
    loading.present();
    this.fb.login(["email"]).then(FacebookLoginResponse => {
      let credential = firebase.auth.FacebookAuthProvider.credential(FacebookLoginResponse.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then(res => {
        //assign value to local variable
        this.userdata.email = res.email;
        this.userdata.name = res.displayName;
        this.userdata.photo = res.photoURL;
        this.userdata.login = "facebook"
        //store cash
        localStorage.setItem('taxiData', JSON.stringify(this.userdata))
        //loading dismiss
        loading.dismiss();
        this.navCtrl.setRoot(TripPage);
      }).catch(ns => {
        loading.dismiss();
        alert("Login Fail")
      }).catch(ns => {
        loading.dismiss();
        alert("Login Fail")
      })
    })
  }

  //login with gmail
  logwithgmail() {
    //create loading
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging in...'
    });
    loading.present();
    //call google login
    this.googlePlus.login({
      'webClientId': '950905678459-asuvouh7lvfnh98sbu4bdq7mrq7ralec.apps.googleusercontent.com',
      'offline': true,
    }).then(res => {
      //google login result
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc => {
        //assign value to local variable
        this.userdata.email = res.email;
        this.userdata.name = res.displayName;
        this.userdata.photo = res.imageUrl;
        this.userdata.login = "gmail"
        //store cash
        localStorage.setItem('taxiData', JSON.stringify(this.userdata))
        //loading dismiss
        loading.dismiss();
        this.navCtrl.setRoot(TripPage);
      }).catch(ns => {
        loading.dismiss();
        alert("Login Fail")
      })
    }).catch(ns => {
      loading.dismiss();
      alert("Login Fail")
    });
  }

  //user signup 
  signup() {
    this.presentLoadingDefault(TsignupPage);
  }
  //loading method
  presentLoadingDefault(page: any) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
      if (page == TripPage) {
        this.navCtrl.setRoot(page);
      }
      else {
        this.navCtrl.push(page);
      }
    }, 500);
  }

}
