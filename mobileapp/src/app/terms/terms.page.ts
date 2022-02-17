import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public back() {
    if (localStorage.getItem('islogin')) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/index/home']);
    }
  }

}
