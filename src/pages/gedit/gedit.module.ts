import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeditPage } from './gedit';

@NgModule({
  declarations: [
    GeditPage,
  ],
  imports: [
    IonicPageModule.forChild(GeditPage),
  ],
})
export class GeditPageModule {}
