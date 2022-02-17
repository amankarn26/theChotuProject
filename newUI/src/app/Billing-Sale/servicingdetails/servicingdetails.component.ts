import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from './../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;

@Component({
  selector: 'app-servicingdetails',
  templateUrl: './servicingdetails.component.html',
  styleUrls: ['./servicingdetails.component.css']
})
export class ServicingdetailsComponent implements OnInit {


 // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  public userType;
  public statelist = [];
  public citylist = [];
  public custList;

  public id;

  public isUpdate = false;

  private servicingdetails = {

    servicing: "",
    serviceduedate:"",
    availedon:"",
    nextservicedueon:"",
    paid:"",
    amount:"",

   
  };

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
        function onOk() {alert("Ok");},
        function onCancel() { alert("Cancel");}
    );*/
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

      this.servicingdetails.servicing=this.id;

    }


    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addservicingdetails/'+ this.id) {
      this.title = 'Add Servicing Details';
      this.subtitle = 'Fill new S information and submit.';
      this.isManageState = false;
    //  this.getCustList();
      // this.getStateList();
      // this.getCityList('Maharashtra');

    } else if (this.route.url === '/updateservicingdetails/' + this.id) {
      this.title = 'Update Servicing Details';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      // this.getStateList();
      // this.getCityList('Maharashtra');
      this.getByid();
     // this.getCustList();

    } else(this.route.url === '/manageservicingdetails/' + this.id) 
     {
      this.title = 'Servicing History';
      this.subtitle = 'Manage servicingdetails information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }


  }
  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.servicingdetailsRestURL('servicingdetailsbysid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  updateData() {
    console.log('submiti function');
    var url = this.restService.servicingdetailsRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingdetails).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageservicingdetails/'+ this.id]);
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


  

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.servicingdetailsRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        this.servicingdetails = response;
        this.servicingdetails.serviceduedate=this.unixTimeConverter(response.serviceduedate);
        this.servicingdetails.availedon=this.unixTimeConverter(response.availedon);
        this.servicingdetails.nextservicedueon=this.unixTimeConverter(response.nextservicedueon);
        this.servicingdetails.paid=response.paid;
       // this.servicingdetails.availedon=this.unixTimeConverter(response.availedon);

      //  this.servicingdetails.custname=response.custname;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getStateList() {
    // Get Information from JSON REST api
    var url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getCatList() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.catRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any) => {
  //       // this.restService.getJSONFromURL(response);
  //       this.catList = response;
  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private onChangeState(obj) {
    let stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  private getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    var url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  /*
  multiJson(data){


      let objMember = new Object();
      let objAddress =new Object();
      objCourt["name"]=this.court.name;

      objCourt["judge"]=this.court.judge;
      objCourt["contact"]=this.court.contact;
      objCourt["location"]=this.court.city;
      objCourt["url"]=this.court.url;

      objAddress["line1"]=this.court.line1;
      objAddress["line2"]=this.court.line2;
      objAddress["pincode"]=this.court.pincode;
      objAddress["states"]=this.court.states;
      objAddress["city"]=this.court.city;
      objAddress["country"]=this.court.country;

      objCourt["address"]=objAddress;

      console.log("Builded Object");
      console.log(objCourt);
      return objCourt;

    }*/


  submitData() {
    console.log('submiti function');
    var url = this.restService.servicingdetailsRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingdetails).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageservicingdetails/'+ this.id]);
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

  deleteRole(id: any) {
    /*
     this.alertify.confirm("confirm it", function (e: any) {
            if (e) {
               //okCallback();
               alert("Ok");
            } else {alert("Cancel");
            }
        });*/

    /*
        if (confirm('Are you sure you want to delete this?')) {
          var url = this.restService.firmRestURL('delete', '');
          console.log(id);
          let json = '{\"id\":\"' + id + '\"}';
          this.restService.postFormData(url, json).subscribe(
            (response : any) => {
              // Responce data.
              console.log('Status on Post API');
              console.log(response);
              // window.location.reload();
              this.getRoleList();
              this.alertify.alert('Firm deleted Successfully')

              // Now do your stuff here
            },
            error => {
              // Error Message
              this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
                + error._body);
              console.log('Error in data load.');
              // Doyour stuff here
            }
          );
          return 0;
        }*/

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.servicingdetailsRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            this.getData();
            // Now do your stuff here
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

        // delete code end
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    })
  }


 
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
}
