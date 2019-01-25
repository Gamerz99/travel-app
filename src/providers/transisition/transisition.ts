import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
/*
  Generated class for the TransisitionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransisitionProvider {

  constructor(private nativePageTransitions: NativePageTransitions) {
    
  }

  transisition(animation){
    let options: NativeTransitionOptions = {
      direction: animation,
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };
    this.nativePageTransitions.slide(options);
  }
}
