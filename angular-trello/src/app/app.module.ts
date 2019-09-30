import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WelcomeBoardComponent } from './welcome-board/welcome-board.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { DoTolistComponent } from './do-tolist/do-tolist.component';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ResizeDirective } from './resize.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToggleFabComponent } from './toggle-fab/toggle-fab.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    WelcomeBoardComponent,
    DoTolistComponent,
    CreateDialogComponent,
    ResizeDirective,
    ConfirmationDialogComponent,
    ToggleFabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  entryComponents:[CreateDialogComponent, ConfirmationDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
