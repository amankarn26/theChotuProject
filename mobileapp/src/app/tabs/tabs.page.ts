import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  islogin = false;

  constructor(public router: Router) {
    this.checklogin()
   }
  home() {
    // location.reload();
    this.router.navigate(['/tabs/tab1']);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem("islogout","true");
    location.reload();
  }

  checklogin() {
    if (localStorage.getItem('islogin') === 'true') {
      this.islogin = true;
    }
  }

  goHome() {
    this.router.navigate(['/index/home']);
  }

  gologin() {
    this.router.navigate(['/index/login']);
  }

  gosignup() {
    this.router.navigate(['/index/register']);
  }

}
