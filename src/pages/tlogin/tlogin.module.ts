import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TloginPage } from './tlogin';

@NgModule({
  declarations: [
    TloginPage,
  ],
  imports: [
    IonicPageModule.forChild(TloginPage),
  ],
})
export class TloginPageModule {}
