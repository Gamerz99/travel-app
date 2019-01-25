import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { UprofilePage } from '../uprofile/uprofile';
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  mylocation:any;
  map: any;
  location: any;
  currentlocation: any = null;
  radius: any = "500";
  markers: any = [];
  userdata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public loadingCtrl: LoadingController) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
    if (localStorage.getItem('guideData')) {
      this.userdata = JSON.parse(localStorage.getItem('guideData'));
    }
    if (localStorage.getItem('mylocation')) {
      this.mylocation = JSON.parse(localStorage.getItem('mylocation'));  
    }
    if (localStorage.getItem('taxiData')) {
      this.userdata = JSON.parse(localStorage.getItem('taxiData'));  
    }
  }

  ionViewDidLoad() {
    this.loadMap();
    this.currentlocation = new google.maps.LatLng(this.mylocation.latitude, this.mylocation.longitude);
  }


  loadMap() {
    let latLng = new google.maps.LatLng(7.750506, 80.783407);
    let mapOptions = {
      center: latLng,
      zoom: 7,
      zoomControl: false,
      fullscreenControl: false,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  viewprofile() {
    this.navCtrl.push(UprofilePage);
    //this.navCtrl.push(UprofilePage);
  }

  gomylocation() {
    this.map.setCenter(this.currentlocation);
    this.map.setZoom(15);
    let icon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#FF355A',
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#f7f4f4'
    }
    // this.map.panTo(latLng)
    let marker = new google.maps.Marker({
      map: this.map,
      position: this.currentlocation,
      icon: icon,
    });
    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent("me");
      infowindow.open(this.map, marker);
    })

  }

  shownearest() {
    let zoom = 15;
    this.removemarker();
    if (this.radius < 1000) {
      zoom = 15;
    }
    else {
      if (this.radius < 2000) {
        zoom = 14;
      }
      else {
        if (this.radius < 5000) {
          zoom = 13;
        }
        else {
          if (this.radius < 10000) {
            zoom = 12;
          }
          else {
            zoom = 12;
          }
        }
      }
    }
    this.nearlocation(this.radius, this.location, zoom);
  }

  nearlocation(radius, location, zoom) {
    let request = {
      location: this.currentlocation,
      radius: radius,
      type: [location]
    };
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      this.map.setZoom(zoom);
      this.map.setCenter(this.currentlocation);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          let icon = null;
          this.addMarker(results[i].geometry.location, results[i].name, icon);
        }
      }
    });
  }

  addMarker(possition, description, icon) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: possition,
      icon: icon
    });
    this.markers.push(marker);
    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', () => {
      infowindow.setContent(description);
      infowindow.open(this.map, marker);
    });
  }

  removemarker() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }


}
