import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;

@IonicPage()
@Component({
  selector: 'page-feedmap',
  templateUrl: 'feedmap.html',
})
export class FeedmapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  destination: null;
  currentlocation: null;
  userdata:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    if (localStorage.getItem('touristData')) {
      this.userdata=JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('guideData')) {
      this.userdata=JSON.parse(localStorage.getItem('guideData'));
    }
    this.destination = this.navParams.get('destination');
    this.currentlocation = this.navParams.get('currentlocation');
  }

  ionViewDidLoad() {
    this.displaydirection(this.destination, this.currentlocation);
  }

  displaydirection(destination, currentlocation) {
    let mapOptions = {
      zoom: 15,
      zoomControl: false,
      fullscreenControl: false,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(currentlocation, destination, directionsService, directionsDisplay);

  }

  calculateAndDisplayRoute(start, end, directionsService, directionsDisplay) {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
