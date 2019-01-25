import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GprofilePage } from './gprofile';

@NgModule({
  declarations: [
    GprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(GprofilePage),
  ],
})
export class GprofilePageModule {}
