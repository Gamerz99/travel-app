import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeditPage } from './tedit';

@NgModule({
  declarations: [
    TeditPage,
  ],
  imports: [
    IonicPageModule.forChild(TeditPage),
  ],
})
export class TeditPageModule {}
