import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-amountpayable',
  templateUrl: './amountpayabledelivery.component.html',
  styleUrls: ['./amountpayabledelivery.component.css']
})
export class AmountpayabledeliveryComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

  public firm = sessionStorage.getItem('firm')
  public title = '';
  public subtitle = '';

  public docServer = this.restService.docServer;


  public userType = sessionStorage.getItem('type');
  public userRole = sessionStorage.getItem('role');

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data = [];
  public totalamount;
  public fromDatee = '';
  public toDatee = '';
  public dperson = sessionStorage.getItem('id');

  public customdate;
  public selectfirm;
  public firmlist = [];
  ngOnInit() {
    // alert(this.userRole);
    // alert(this.userType);


    if (this.route.url === '/manage_amountpayable_delivery') {
      this.title = 'Manage Amount Payable Orders';
      this.subtitle = 'Fill new Rate Label information and submit.';

      if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
        this.getallfirm();
      }
      else {
        this.getamountpayablemonth();
      }
    }
    else {
      this.title = 'Manage Amount Recieved Orders ';
      this.subtitle = 'Manage  Rate Label information including view, add, update and delete';


      if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
        this.getallfirm();
      }
      else {
        this.getamountpayablemonth();
      }
    }
  }

  changemonth(str: string) {
    if (str === 'c') {
      console.log('current month');
      this.getamountpayablemonth();
      this.customdate = null;

    }

    if (str === 'w') {
      console.log('WEEK');

      this.getamountpayableweek();
      this.customdate = null;


    }
    if (str === 't') {

      console.log('today');
      this.getamountpayabletoday();
      this.customdate = null;
    }
    if (str === 'l') {

      console.log('last month');
      this.getamountpayablelastmonth();
      this.customdate = null;
    }
  }


  public getamountpayablemonth() {
    this.restService.enableloading();


    //http://localhost:8090/SmartSupplyManager/rest/order/payable?dperson=19341&type=TODAY.

    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      // alert(this.selectfirm);
      var api = '?dperson=' + this.selectfirm + '&type=THISMONTH'
    }
    else {
      var api = '?dperson=' + this.dperson + '&type=THISMONTH'
    }

    if (this.route.url === '/manage_amountpayable_delivery') {
      var url = this.restService.OrdersRestURL('accountspayable_delivery', api);
    }
    else {
      var url = this.restService.OrdersRestURL('accountsreceived_delivery', api);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.totalamount = response.amount
        this.data = response.order;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  public getamountpayablelastmonth() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?dperson=19341&type=TODAY

    this.restService.enableloading();


    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      // alert(this.selectfirm);
      var api = '?dperson=' + this.selectfirm + '&type=LASTMONTH'
    }
    else {
      var api = '?dperson=' + this.dperson + '&type=LASTMONTH'
    }


    if (this.route.url === '/manage_amountpayable_delivery') {
      var url = this.restService.OrdersRestURL('accountspayable_delivery', api);
    }
    else {
      var url = this.restService.OrdersRestURL('accountsreceived_delivery', api);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.totalamount = response.amount
        this.data = response.order;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  public getamountpayableweek() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?dperson=19341&type=TODAY


    this.restService.enableloading();


    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      // alert(this.selectfirm);
      var api = '?dperson=' + this.selectfirm + '&type=THISWEEK'
    }
    else {
      var api = '?dperson=' + this.dperson + '&type=THISWEEK'
    }


    if (this.route.url === '/manage_amountpayable_delivery') {
      var url = this.restService.OrdersRestURL('accountspayable_delivery', api);
    }
    else {
      var url = this.restService.OrdersRestURL('accountsreceived_delivery', api);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.totalamount = response.amount
        this.data = response.order;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  public getamountpayabletoday() {
    this.restService.enableloading();


    //http://localhost:8090/SmartSupplyManager/rest/order/payable?dperson=19341&type=TODAY
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      // alert(this.selectfirm);
      var api = '?dperson=' + this.selectfirm + '&type=TODAY'
    }
    else {
      var api = '?dperson=' + this.dperson + '&type=TODAY'
    }


    if (this.route.url === '/manage_amountpayable_delivery') {
      var url = this.restService.OrdersRestURL('accountspayable_delivery', api);
    }
    else {
      var url = this.restService.OrdersRestURL('accountsreceived_delivery', api);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.totalamount = response.amount
        this.data = response.order;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }


  private searchdayspayable() {
    this.restService.enableloading();

    if (this.fromDatee === '' || this.toDatee === '') {
      Swal.fire('From date or To date is NULL', 'please fill the data', 'error')
    }
    else {



      const fdate = this.fromDatee;
      const todate = this.toDatee;
      //http://localhost:8090/SmartSupplyManager/rest/order/payable?dperson=20&fromdate=2020-06-01&todate=2020-05-30
      var api = '?dperson=' + this.dperson + '&fromdate=' + fdate + '&todate=' + todate;
      if (this.route.url === '/manage_amountpayable_delivery') {
        var url = this.restService.OrdersRestURL('accountspayable_delivery', api);
      }
      else {
        var url = this.restService.OrdersRestURL('accountsreceived_delivery', api);
      }

      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {

          this.restService.getJSONFromURL(response);

          console.log(response);
          this.totalamount = response.amount
          this.data = response.order;
          this.restService.disableloading();

        },
        error => {

          console.log('Error in data load.');
          this.restService.disableloading();

          // this.isLoader = false;
          // this.isLoader = false;
          // alert('false2='+this.isLoader);
        }
      );
    }
  }



  getallfirm() {

    var url = this.restService.delivertypoolRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.firmlist = response;


      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  refreshincall() {

    this.selectfirm = undefined;

  }

  public gettodaysdate() {
    var url = this.restService.docsRestURL('todaysdate', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        const res = response;

        this.fromDatee = response.firstdate.substring(10, 0);
        this.toDatee = response.currentdate.substring(10, 0);

      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
}
