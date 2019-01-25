import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThomePage } from './thome';

@NgModule({
  declarations: [
    ThomePage,
  ],
  imports: [
    IonicPageModule.forChild(ThomePage),
  ],
})
export class ThomePageModule {}
