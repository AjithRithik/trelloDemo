import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router){

  }

  /** Function to navigate to DashBoard page**/
  gotoHome(url){
    this.router.navigate([url]);
  }
}
