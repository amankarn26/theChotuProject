import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
})
export class PrivacypolicyPage implements OnInit {

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
