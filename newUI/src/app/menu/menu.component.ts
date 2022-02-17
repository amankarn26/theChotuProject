import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {




public userType;
public userRole;



public enable = {
  insurance : 'NO',
  customer : 'NO',
  employee : 'NO',
  product : 'NO',
  exchange : 'NO',
  warranty : 'NO',
  servicing : 'NO',
  jobcard : 'NO',
  crm : 'NO',
  campaign : 'NO',
};















constructor(public route: Router,
  public restService: RestService,
  public routprms: ActivatedRoute) { }

  ngOnInit() {

    this.userType = sessionStorage.getItem('type');
    this.userRole = sessionStorage.getItem('role');

    if (sessionStorage.getItem('enable.insurance')) {
      this.enable.insurance = sessionStorage.getItem('enable.insurance');
    }

    if (sessionStorage.getItem('enable.customer')) {
      this.enable.customer = sessionStorage.getItem('enable.customer');
    }

    if (sessionStorage.getItem('enable.employee')) {
      this.enable.employee = sessionStorage.getItem('enable.employee');
    }

    if (sessionStorage.getItem('enable.product')) {
      this.enable.product = sessionStorage.getItem('enable.product');
      // console.log(this.enable.product);
    }

    if (sessionStorage.getItem('enable.exchange')) {
      this.enable.exchange = sessionStorage.getItem('enable.exchange');
    }

    if (sessionStorage.getItem('enable.warranty')) {
      this.enable.warranty = sessionStorage.getItem('enable.warranty');
    }

    if (sessionStorage.getItem('enable.servicing')) {
      this.enable.servicing = sessionStorage.getItem('enable.servicing');
    }

    if (sessionStorage.getItem('enable.jobcard')) {
      this.enable.jobcard = sessionStorage.getItem('enable.jobcard');
    }

    if (sessionStorage.getItem('enable.crm')) {
      this.enable.crm = sessionStorage.getItem('enable.crm');
    }

    if (sessionStorage.getItem('enable.campaign')) {
      this.enable.campaign = sessionStorage.getItem('enable.campaign');
    }

    console.log('this.enable');
    console.log(this.enable);

  }

  logoutApp(){

    // Cookie.delete('openapplogin');
     // location.reload();

     sessionStorage.clear();
     // Cookie.deleteAll();
     localStorage.clear();
     // localStorage.removeItem('currentGame');
     // localStorage.clear();

     location.reload();

   }

}
