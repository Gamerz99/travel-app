import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ServicesProvider } from '../../providers/services/services';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {
    username: null,
    password: null,
    remember: false
  }

  userdata = {
    username: null,
    email: null,
    name: null,
    contact_number: null,
    gender: null,
    country: null,
    photo: "http://www.actorsphotos.in/wp-content/uploads/2018/01/allu-arjun-images-free-download-13.jpg",
    login: null,
    idToken: null
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, private fb: Facebook, public services: ServicesProvider) {
    //check cash data
    if (localStorage.getItem('touristData')) {
      this.presentLoadingDefault(HomePage);
    }
  }

  logwithfacebook() {
    //create loading
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging in...'
    });
    loading.present();
    this.fb.login(['public_profile', "email"]).then(FacebookLoginResponse => {
      this.fb.api(FacebookLoginResponse.authResponse.userID + '/?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userdata.email = profile.email;
        this.userdata.name = profile.name;
        this.userdata.gender = profile.gender;
        this.userdata.photo = profile.picture_large.data.url;
        this.userdata.login = "facebook"
        let credential = firebase.auth.FacebookAuthProvider.credential(FacebookLoginResponse.authResponse.accessToken);
        firebase.auth().signInWithCredential(credential).then(res => {
          //assign value to local variable
          // this.userdata.email = res.email;
          //this.userdata.name = res.displayName;
          //this.userdata.photo = res.photoURL;
          //this.userdata.login = "facebook"
          //store cash
          localStorage.setItem('touristData', JSON.stringify(this.userdata))
          //loading dismiss
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        }).catch(ns => {
          loading.dismiss();
          alert("Login Fail")
        }).catch(ns => {
          loading.dismiss();
          alert("Login Fail")
        })
      });

    })

  }

  login() {
    //create loading
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Logging in...'
    });
    loading.present();
    this.services.logintourist(this.credentials).subscribe(res => {
      this.userdata.idToken = res.token;
      this.services.gettourist(this.credentials.username).subscribe(res => {
        this.userdata.username = res.username;
        this.userdata.email = res.email;
        this.userdata.name = res.name;
        this.userdata.contact_number = res.contact_number;
        this.userdata.gender = res.gender;
        this.userdata.country = res.country;
        localStorage.setItem('touristData', JSON.stringify(this.userdata))
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
    }, error => {
      loading.dismiss();
      alert("Invalid Credentials")
    })
  }

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
        this.userdata.login = "gmail";
        //store cash
        localStorage.setItem('touristData', JSON.stringify(this.userdata))
        //loading dismiss
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      }).catch(ns => {
        loading.dismiss();
        alert("Login Fail");
      })
    }).catch(ns => {
      loading.dismiss();
    });
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
      if (page == HomePage) {
        this.navCtrl.setRoot(page);
      }
      else {
        this.navCtrl.push(page);
      }
    }, 500);
  }

  signup() {
    this.navCtrl.push(SignupPage)
  }
}
