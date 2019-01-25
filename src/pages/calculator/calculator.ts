import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UprofilePage } from '../uprofile/uprofile';
import { ServicesProvider } from '../../providers/services/services';

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  userdata: any;
  curency: any = null;
  curnm:number;
  result: number;
  rate:number;
  cal: any = "calc";
  constructor(public navCtrl: NavController, public navParams: NavParams, public services: ServicesProvider) {
    if (localStorage.getItem('touristData')) {
      this.userdata = JSON.parse(localStorage.getItem('touristData'));
    }
  }


  viewprofile() {
    this.navCtrl.push(UprofilePage);
    //this.navCtrl.push(UprofilePage);
  }

  cur() {
    
    if (this.curency == null) {
      alert("Please Select Currency")
    }
    else {
      this.services.getcurrency(this.curency).subscribe(res => {
        if(this.curency=="USD"){
          this.rate=res.LKR_USD;
        }
        if(this.curency=="AUD"){
          this.rate=res.LKR_AUD;
        }
        if(this.curency=="CAD"){
          this.rate=res.LKR_CAD;
        }
        if(this.curency=="HKD"){
          this.rate=res.LKR_HKD;
        }
        if(this.curency=="LBP"){
          this.rate=res.LKR_LBP;
        }
        if(this.curency=="PKR"){
          this.rate=res.LKR_PKR;
        }
        if(this.curency=="YER"){
          this.rate=res.LKR_YER;
        }
        this.result=this.rate *this.curnm;
      })
    }
  }

}
