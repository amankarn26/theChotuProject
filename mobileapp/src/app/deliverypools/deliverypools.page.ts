import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliverypools',
  templateUrl: './deliverypools.page.html',
  styleUrls: ['./deliverypools.page.scss'],
})
export class DeliverypoolsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    location.reload();
  }

}
