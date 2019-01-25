import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GloginPage } from './glogin';

@NgModule({
  declarations: [
    GloginPage,
  ],
  imports: [
    IonicPageModule.forChild(GloginPage),
  ],
})
export class GloginPageModule {}
