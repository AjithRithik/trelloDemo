import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WelcomeBoardComponent } from './welcome-board/welcome-board.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { SharedModule } from './shared/shared.module';
import { DoTolistComponent } from './do-tolist/do-tolist.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    WelcomeBoardComponent,
    DoTolistComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  entryComponents:[CreateDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
