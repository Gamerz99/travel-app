import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GuidePage } from '../guide/guide';
import { MapPage } from '../map/map';
import { TripPage } from '../trip/trip';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { CalculatorPage } from '../calculator/calculator';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loaded: boolean = false;
  tabIndex: number = 0;
  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
    
  }
  tab1 = TripPage;
  tab2 = MapPage;
  tab3 = GuidePage;
  tab4 = CalculatorPage;

  private getAnimationDirection(index): string {
    let currentIndex = this.tabIndex;

    this.tabIndex = index;

    switch (true) {
      case (currentIndex < index):
        return ('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  public transition(e): void {
    let options: NativeTransitionOptions = {
      direction: this.getAnimationDirection(e.index),
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 48
    };

    if (!this.loaded) {
      this.loaded = true;
      return;
    }

    this.nativePageTransitions.slide(options);
  }
}
