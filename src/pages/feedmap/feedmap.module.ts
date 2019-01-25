import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedmapPage } from './feedmap';

@NgModule({
  declarations: [
    FeedmapPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedmapPage),
  ],
})
export class FeedmapPageModule {}
