import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { WelcomeBoardComponent } from './welcome-board/welcome-board.component';


const routes: Routes = [
  { path:'dashboard', component: DashBoardComponent},
  { path:'taskBoard/:id', component: WelcomeBoardComponent },
  { path:'', redirectTo:'/dashboard', pathMatch:'full' },
  { path:'**', redirectTo:'/dashboard', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
