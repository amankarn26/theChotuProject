import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';

// import { DatePipe } from '@angular/common';
declare var Swal: any;

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.css']
})
export class AccountingComponent implements OnInit {

  public title = '';
  public subtitle = '';
  // private alertify = require('alertify.js');
  private statelist;
  private citylist;
  public firmlist;

  private firmid = sessionStorage.getItem('firm');

  public flag= false;
  private account = {
    name: "",
    firm: sessionStorage.getItem('firm'),
    code: '',
    basetype: '',
    atype: 'OTHEREXPENSES',
  };

  private isUpdate= false;

    // for datatable
    public filterQuery = '';
    public rowsOnPage = 10;
    public sortBy = 'id';
    public sortOrder = 'asc';
    private data= [];
    private empId;
    private id;
    constructor(private route: Router,
      private routprms : ActivatedRoute,
     private restService: RestService,
      ) { }


  ngOnInit() {
      this.flag = false;
      this.id = this.empId = this.routprms.snapshot.params['eid'];

      if (this.route.url === '/updateaccount/' + encodeURIComponent(this.id)) {

        this.title = 'Update Account';
        this.subtitle = 'Update Employee Account information .';
        this.flag = true;
        this.isUpdate = true;
        this.getAccountById();
      } else if (this.route.url === '/addacount') {
        this.title = 'Add Account';
        this.subtitle = 'Fill new Employee Account information and submit.';
        // this.account.firm = this.empId = this.routprms.snapshot.params['eid'];
        this.flag = true;
        this.getallfirm();
      }



       else {
        this.title = 'Manage Account';
        this.subtitle = 'Manage Employee Account information including view, add, update and delete';
        this.flag = false;
     //   this.getData();
        this.getallaccounts();
      }
}

private submitData(){
  console.log('submitData function');
  console.log(this.account);
 // let finalData = this.multiJson(this.appointment);
  var url = this.restService.accountRestURL('add', '');
  this.restService.postFormData(url, this.account).subscribe(
    (response : any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageaccount']);

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

  updateData() {

    console.log('Update function');
    const url = this.restService.accountRestURL('edit', '');
    console.log(this.account);
    this.restService.postFormData(url, this.account).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
      //  this.route.navigate(['/manageemployee']);
        window.scrollTo(0, 0);

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

// GET  EMPLOYEE ATTENDANCE LIST
/******************************get data ********************************************/
private getData() {

  var url = this.restService.accountRestURL('accountByid', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.data = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

  private getAccountById() {
    // Get Information from JSON REST api
    const url = this.restService.accountRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        console.log('Getting Account by id');
        console.log(response);
        // this.account.acct.acctno = response.acct.acctno;

      this.account = response;

        this.account.atype = this.unixTimeConverter(response.atype);
        this.account.basetype = this.unixTimeConverter(response.basetype);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

// Get State List

private getStateList() {
  // // Get Information from JSON REST api
  // var url = this.restService.stateRestURL('', 'India');
  // this.restService.getJSONFromURL(url).subscribe(
  //   (response : any) => {
  //     // this.restService.getJSONFromURL(response);
  //     this.statelist = response;
  //     console.log('State data available');
  //   },
  //   error => {
  //     console.log('Error in data load.');
  //   }
  // );
}

private onChangeState(obj) {
  let stateId = obj.srcElement.value;
  // Call city data method
  this.getCityList(stateId);
}

private getCityList(stateId) {
  // this.citylist = [];
  // // Get Information from JSON REST api
  // var url = this.restService.cityRestURL('', stateId);
  // console.log(stateId);
  // this.restService.getJSONFromURL(url).subscribe(
  //   (response : any) => {
  //     this.citylist = response;
  //   },
  //   error => {
  //     console.log('Error in data load.');
  //   }
  // );
}
  /******************************END GET DATA*************************************** */

  private unixTimeConverter(ts) {
    let datetime = '';
    const dattime1 = '';
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';


    /******************* */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dtt = new Date(ts * 1000);
    // Hours part from the timestamp
    const hours = dtt.getHours();
    // Minutes part from the timestamp
    const minutes = '0' + dtt.getMinutes();
    // Seconds part from the timestamp
    const seconds = '0' + dtt.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ':' + minutes.substr(-2);
    // alert(formattedTime);
    /*********************************************************** */

    try {
      const dateVal = '/Date(' + ts + ')/';
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else { mm = (date.getMonth() + 1).toString(); }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;

        dd = temp1;
      } else { dd = date.getDate().toString(); }

      //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
      datetime = date.getFullYear() + '-' + mm + '-' + dd;


    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

  }


 cancel() {
    // goBack code fro cancel button
    window.history.back();
  }



  getallaccounts(){

    var url = this.restService.accountRestURL('accountByid', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
       // this.data=response;
        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
  getallfirm(){

    var url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
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
}
