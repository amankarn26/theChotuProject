import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // @ViewChild('abcde') abcde: ElementRef;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  public routecategory;
  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public firmcatgeory = sessionStorage.getItem('category');


  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;

  public filterQuery1 = '';

  customdate;
  customdate1;
  public tab1 = false;

  public fromDatee = '';
  public toDatee = '';

  public current_check = false;

  public paidorders = [];
  public totalamount_paid;
  public totalservice_paid;

  public selectedorders = [];

  public notpaidorders = [];
  public totalamount_notpaid;
  public totalservice_notpaid;
  mapid = [];

  checked;
  ngOnInit() {

    this.getlastmonthorders();
    this.getlastmonthorders_notpaid();
  }

  cancel() {
    this.tab1 = false;
  }

  public gettodaysdate() {
    //  this.customdate=null;
    // this.customdate1=null;
    // this.customdate2=null;

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

    // this.selectedorders=[];

  }

  getvendororders(data: any) {

    console.log(data);
    const json = {
      order: data
    }

    var url = this.restService.OrdersRestURL('getvendororders', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {

        console.log('Status on Post API');
        console.log(response);
        this.data = response;

        window.scrollTo(0, 0);
        this.tab1 = true;

      },
      error => {
        // Error Message
        Swal.fire(
          error.statusText,
          error._body,
          'error'
        );
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;

  }

  public getlastmonthorders() {
    this.customdate = null;
    this.checked = false;
    // this.customdate1=null;
    this.restService.enableloading();
    let api = 'type=LASTMONTH';
    var url = this.restService.firmRestURL('invoice_paid', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.paidorders = response.amtobj;
        this.totalamount_paid = response.totalamount;
        this.totalservice_paid = response.totalservice;

        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );

    this.selectedorders = [];
    this.mapid = [];
  }

  private searchbydate_paid() {
    this.customdate = true;
    this.customdate1 = false;

    this.restService.enableloading();

    if (this.fromDatee === '' || this.toDatee === '') {
      Swal.fire('From date or To date is NULL', 'please fill the data', 'error')
    }
    else {



      const fdate = this.fromDatee;
      const todate = this.toDatee;

      var api = 'fromdate=' + fdate + '&todate=' + todate;
      var url = this.restService.firmRestURL('invoice_paid', api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {

          this.restService.getJSONFromURL(response);

          console.log(response);
          this.paidorders = response.amtobj;
          this.totalamount_paid = response.totalamount;
          this.totalservice_paid = response.totalservice;


          this.restService.disableloading();


        },
        error => {

          console.log('Error in data load.');
          this.restService.disableloading();

        }
      );
    }
    this.selectedorders = [];
    this.mapid = [];
  }

  public getlastmonthorders_notpaid() {
    this.customdate1 = null;
    // this.customdate1=null;
    this.restService.enableloading();
    let api = 'type=LASTMONTH';
    var url = this.restService.firmRestURL('invoice_not_paid', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.notpaidorders = response.amtobj;
        this.totalamount_notpaid = response.totalamount;
        this.totalservice_notpaid = response.totalservice;

        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
    this.selectedorders = [];
    this.mapid = [];
  }

  private searchbydate_notpaid() {
    this.customdate = false;
    this.customdate1 = true;

    this.restService.enableloading();

    if (this.fromDatee === '' || this.toDatee === '') {
      Swal.fire('From date or To date is NULL', 'please fill the data', 'error')
    }
    else {



      const fdate = this.fromDatee;
      const todate = this.toDatee;

      var api = 'fromdate=' + fdate + '&todate=' + todate;
      var url = this.restService.firmRestURL('invoice_not_paid', api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {


          this.restService.getJSONFromURL(response);

          console.log(response);
          this.notpaidorders = response.amtobj;
          this.totalamount_notpaid = response.totalamount;
          this.totalservice_notpaid = response.totalservice;


          this.restService.disableloading();


        },
        error => {

          console.log('Error in data load.');
          this.restService.disableloading();

        }
      );
    }
    this.selectedorders = [];
    this.mapid = [];
  }

  datesearchbypaid() {
    this.customdate = null;
    this.current_check = true;

    this.gettodaysdate();
    setTimeout(() => {
      this.searchbydate_paid_currmonth();
    }, 500);
  }

  datesearchbynotpaid() {
    this.customdate1 = null;
    this.current_check = true;


    this.gettodaysdate();

    setTimeout(() => {
      this.searchbydate_notpaid_currmonth();
    }, 500);
  }

  private searchbydate_paid_currmonth() {
    this.gettodaysdate();

    this.restService.enableloading();

    if (this.fromDatee === '' || this.toDatee === '') {
      Swal.fire('From date or To date is NULL', 'please fill the data', 'error')
    }
    else {



      const fdate = this.fromDatee;
      const todate = this.toDatee;

      var api = 'fromdate=' + fdate + '&todate=' + todate;
      var url = this.restService.firmRestURL('invoice_paid', api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {

          this.restService.getJSONFromURL(response);

          console.log(response);
          this.paidorders = response.amtobj;
          this.totalamount_paid = response.totalamount;
          this.totalservice_paid = response.totalservice;


          this.restService.disableloading();


        },
        error => {

          console.log('Error in data load.');
          this.restService.disableloading();

        }
      );
    }
    this.selectedorders = [];
    this.mapid = [];
  }

  private searchbydate_notpaid_currmonth() {


    this.gettodaysdate();

    this.restService.enableloading();

    if (this.fromDatee === '' || this.toDatee === '') {
      Swal.fire('From date or To date is NULL', 'please fill the data', 'error')
    }
    else {

      const fdate = this.fromDatee;
      const todate = this.toDatee;

      var api = 'fromdate=' + fdate + '&todate=' + todate;
      var url = this.restService.firmRestURL('invoice_not_paid', api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {

          this.restService.getJSONFromURL(response);

          console.log(response);
          this.notpaidorders = response.amtobj;
          this.totalamount_notpaid = response.totalamount;
          this.totalservice_notpaid = response.totalservice;


          this.restService.disableloading();


        },
        error => {

          console.log('Error in data load.');
          this.restService.disableloading();

        }
      );
    }
    this.selectedorders = [];
    this.mapid = [];
  }

  public checkmethod(data: any) {

    if (this.mapid.indexOf(data.id) > -1) {

      this.mapid.splice(this.mapid.indexOf(data.id), 1);


      let i = 0, j = 0;
      for (let dataa of this.selectedorders) {
        if (dataa.id == data.id) {
          j = i;
        }
        i = i + 1;
      }

      this.selectedorders.splice(j, 1);




    } else {
      this.selectedorders.push({ 'id': data.id, 'servicecharge': data.scharge, 'type': 'VENDOR' });
      this.mapid.push(data.id);



    }

    console.log(this.selectedorders);
    console.log(this.mapid);


  }

  SendInvoice() {
    this.restService.enableloading();

    if (this.customdate1 === true || this.customdate === true || this.current_check === true) {
      // alert('true');
      for (let data of this.selectedorders) {
        data.fromdate = this.fromDatee;
        data.todate = this.toDatee;

      }
      // this.selectedorders['fromdate']=this.fromDatee;
      // this.selectedorders['todate']=this.toDatee;

    }
    var url = this.restService.firmRestURL('monthly_invoice', '');
    this.restService.postFormData(url, this.selectedorders).subscribe(
      (response: any) => {
        Swal.fire({ title: "Invoice Sent!", icon: "success", timer: 800 });

        // Swal.fire('Invoice Sent','Invoice has been sent to you mail','success');
        console.log(response);
        this.selectedorders = [];
        this.mapid = [];

        this.getlastmonthorders();
        this.getlastmonthorders_notpaid();
        // document.getElementById("myCheck").checked = true;
        this.checked = true;
        // const ele = document.getElementById("myCheck") as HTMLInputElement;
        // ele.checked = false;
        //   this.abcde.nativeElement.checked;

      },
      error => {
        console.log('Error in data load.');
        //  this.restService.disableloading();

      }
    );
  }
}
