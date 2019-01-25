import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaxiPage } from './taxi';

@NgModule({
  declarations: [
    TaxiPage,
  ],
  imports: [
    IonicPageModule.forChild(TaxiPage),
  ],
})
export class TaxiPageModule {}
