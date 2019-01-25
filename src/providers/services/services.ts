
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';

@Injectable()
export class ServicesProvider {

  constructor(public http: Http) {
  }

  distance(lati: number, long: number, elati: number, elong: number) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" + lati + "," + long + "&destinations=" + elati + "," + elong + "&key=AIzaSyCgxi35QRbP0a_59DYOfSFBqxw9GnnKcrs").map(res => res.json());
  }

  getguide(username: any) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://13.229.65.223/user/guide/" + username).map(res => res.json());
  }

  getguidelist() {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://13.229.65.223/user/guides/").map(res => res.json());
  }

  autogetguidelist() {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return Observable
      .interval(5000).mergeMapTo(this.http.get("http://13.229.65.223/user/guides/")).map(res => res.json());
  }

  signuptourist(user) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.post("http://13.229.65.223/user/tourist/", user).map(res => res.json());
  }

  logintourist(credentials) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.post("http://13.229.65.223/cas/login/", credentials).map(res => res.json());
  }

  gettourist(username) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.get("http://13.229.65.223/user/tourist/" + username + "/").map(res => res.json());
  }

  updatetourist(user) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.put("http://13.229.65.223/user/tourist/" + user.username + "/", user).map(res => res.json());
  }

  locationlist() {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.get("http://13.229.65.223/destination/nearby/beach/").map(res => res.json());
  }

  getlocation(id) {
    let headears = new Headers();
    headears.append('Accept', 'application/json');
    return this.http.get("http://13.229.65.223/destination/" + id + "/").map(res => res.json());
  }

  signupguide(user) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.post("http://13.229.65.223/user/guide/", user).map(res => res.json());
  }

  guidelogin(credentials) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.post("http://13.229.65.223/cas/login/", credentials).map(res => res.json());
  }

  guideupdate(user) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.put("http://13.229.65.223/user/guide/" + user.username + "/", user).map(res => res.json());
  }

  rateguide(username, rate) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.post("http://13.229.65.223/user/rate/guide/" + username + "/", rate).map(res => res.json());
  }

  getweather(state, city) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://api.wunderground.com/api/31d0c3cfb0fbd374/conditions/q/" + state + "/" + city + ".json").map(res => res.json());
  }

  gchangeonline(username, online) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.put("http://13.229.65.223/user/guide/" + username + "/", online).map(res => res.json());
  }

  getcurrency(to) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://free.currencyconverterapi.com/api/v3/convert?q=LKR_" + to + "&compact=ultra").map(res => res.json());
  }

  getguideratinglist(username, page) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://13.229.65.223/user/ratings/guide/" + username + "/" + page + "/").map(res => res.json());
  }

  autogetguideratinglist(username, page) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return Observable
      .interval(5000).mergeMapTo(this.http.get("http://13.229.65.223/user/ratings/guide/" + username + "/" + page + "/")).map(res => res.json());
  }

  gettaxilist(type) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://13.229.65.223/taxi/list/"+type+"/").map(res => res.json());
  }

  gettaxi(id) {
    let headears = new Headers();
    headears.append('Content-Type', 'application/json');
    return this.http.get("http://13.229.65.223/taxi/"+id+"/").map(res => res.json());
  }
}
