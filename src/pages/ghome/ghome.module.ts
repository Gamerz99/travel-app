import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GhomePage } from './ghome';

@NgModule({
  declarations: [
    GhomePage,
  ],
  imports: [
    IonicPageModule.forChild(GhomePage),
  ],
})
export class GhomePageModule {}
