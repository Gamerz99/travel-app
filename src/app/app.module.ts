import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { IonRating } from '../components/ion-rating/ion-rating';
import { SmallIonRatingComponent } from '../components/small-ion-rating/small-ion-rating';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { ServicesProvider } from '../providers/services/services';

//native-plugin
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { GooglePlus } from '@ionic-native/google-plus';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Facebook } from '@ionic-native/facebook';

//tourist page
import { WelcomePage } from '../pages/welcome/welcome';
import { FavouritePage } from '../pages/favourite/favourite';
import { LogoutPage } from '../pages/logout/logout';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GuidePage } from '../pages/guide/guide';
import { MapPage } from '../pages/map/map';
import { FeedmapPage } from '../pages/feedmap/feedmap';
import { TripPage } from '../pages/trip/trip';
import { FeedPage } from '../pages/feed/feed';
import { GprofilePage } from '../pages/gprofile/gprofile';
import { TaxiPage } from '../pages/taxi/taxi';
import { TprofilePage } from '../pages/tprofile/tprofile';
import { EditPage } from '../pages/edit/edit';
import { CalculatorPage } from '../pages/calculator/calculator';
import { TransisitionProvider } from '../providers/transisition/transisition';
import { UprofilePage } from '../pages/uprofile/uprofile';
import { WishlistPage } from '../pages/wishlist/wishlist';
import { SignupPage } from '../pages/signup/signup';

//guide page
import { GloginPage } from '../pages/glogin/glogin';
import { GhomePage } from '../pages/ghome/ghome';
import { GsignupPage } from '../pages/gsignup/gsignup';
import { GeditPage } from '../pages/gedit/gedit';

//taxi page
import { TloginPage } from '../pages/tlogin/tlogin';
import { TsignupPage } from '../pages/tsignup/tsignup';
import { ThomePage } from '../pages/thome/thome';
import { TeditPage } from '../pages/tedit/tedit';

export const firebaseconfig = {
  apiKey: "AIzaSyBJHIHUHiABXsTcuawIBdJmixVCajAAS7k",
  authDomain: "travel-app-4434b.firebaseapp.com",
  databaseURL: "https://travel-app-4434b.firebaseio.com",
  projectId: "travel-app-4434b",
  storageBucket: "travel-app-4434b.appspot.com",
  messagingSenderId: "950905678459"
}

firebase.initializeApp(firebaseconfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuidePage,
    MapPage,
    TripPage,
    IonRating,
    FeedPage,
    GprofilePage,
    FeedmapPage,
    SmallIonRatingComponent,
    LoginPage,
    LogoutPage,
    TaxiPage,
    TprofilePage,
    UprofilePage,
    CalculatorPage,
    WishlistPage,
    SignupPage,
    EditPage,
    WelcomePage,
    FavouritePage,
    GloginPage,
    GsignupPage,
    GhomePage,
    GeditPage,
    TloginPage,
    TsignupPage,
    ThomePage,
    TeditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseconfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuidePage,
    MapPage,
    TripPage,
    FeedPage,
    FeedmapPage,
    GprofilePage,
    LoginPage,
    LogoutPage,
    TaxiPage,
    TprofilePage,
    UprofilePage,
    CalculatorPage,
    WishlistPage,
    SignupPage,
    EditPage,
    WelcomePage,
    FavouritePage,
    GloginPage,
    GsignupPage,
    GhomePage,
    GeditPage,
    TloginPage,
    TsignupPage,
    ThomePage,
    TeditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesProvider,
    CallNumber,
    Geolocation,
    GooglePlus,
    NativePageTransitions,
    TransisitionProvider,
    Facebook,
    NativeGeocoder
  ]
})
export class AppModule { }
