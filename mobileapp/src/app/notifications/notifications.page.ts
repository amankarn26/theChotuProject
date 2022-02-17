import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {



  notificationList=[];

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.notificationList = JSON.parse(localStorage.getItem('notificationList'));
    console.log(this.notificationList);
  }


  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  clear(){
    localStorage.removeItem('notificationList');
    this.notificationList = [];
    location.reload();
  }
}
