import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliverypool-home',
  templateUrl: './deliverypool-home.page.html',
  styleUrls: ['./deliverypool-home.page.scss'],
})
export class DeliverypoolHomePage implements OnInit {

  user = localStorage.getItem('name');

  notificationList = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.notificationList = JSON.parse(localStorage.getItem('notificationList'));
  }

  showOrders(status: string){
    this.router.navigate(['/deliverypools/deliverypool-orders/' + status]);
  }

  onNotificationsClick(){
    console.log('notifiations viewed');
    this.router.navigate(['notifications']);
  }


}
