import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '.././../services/rest.service';

declare var Swal: any;
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

 // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  public id;
 private depList;
 public detailFlag = false;
 public lastbook;
 public securetime;

  private vendor={
    firm:sessionStorage.getItem('firm'),
    type:'',
    name:'',
    contactperson:'',
  description:'',
  address: {
    line1: '',
    line2: '',
    city: '',
    pincode: '',
    states: '',
    country: ''},
  fax:'',
  phone:'',
  email:'',
  remark:'',

  category:'',
  service:'',
  weeklyoff:'',
  weekoffday:'',
  securetime:'',
  lastbooktime:'',
 // defaultvend:''
};


    private deployment={
                      name:'',
                      description:'',
                      totalusers:'',
                      totalwholesaler:'',
                      totalretailer:'',
                      totalcustomers:''
                      };




                      private isUpdate = false;

    //  private alertify = require('alertify.js');
    //  private title = '';
    //  private subtitle = '';
    //  private isManageState = true;
     private datalist;
     private catList;
     public userType;
     public statelist = [];
     public citylist = [];


     // for datatable
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

       }


       console.log('adaded');
       this.url = this.route.url;
       console.log(this.route.url);

       if (this.route.url === '/addvendor') {
         this.title = 'Add Vendor';
         this.subtitle = 'Fill new vendor information and submit.';
         this.isManageState = false;
         this.getdeploymentacct();
       } else if (this.route.url === '/editvendor/' + this.id) {
         this.title = 'Edit Vendor';
         this.subtitle = 'Update vendor information and submit.';
         this.isManageState = false;
         this.isUpdate = true;
         this.getByid();

       } else if (this.route.url === '/detailvendor/' + encodeURIComponent(this.id)) {
        this.title = 'Vendor Details';
        this.subtitle = '';
       // this.flag = true;
       // this.isUpdate = true;
       this.isManageState = false;
        this.detailFlag = true;
        this.getByid();
        //  this.updateEmp();
       // this.getRoleList();
       // this.getEmpById();
       // this.getGradeList();
       // this.getAllDept();
        //  this.getAllDept();
      }  else {
         this.title = 'Manage Vendor';
         this.subtitle = 'Manage Vendor information including view, add, update and delete';
         this.userType = sessionStorage.getItem('role');
         this.getData();
       }

     }
     private getData() {
       // Get Information from JSON REST api


       var url = this.restService.vendorRestURL('', '');
       this.restService.getJSONFromURL(url).subscribe(
         (response:any) => {
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
    if( this.securetime > this.vendor.securetime ||  this.securetime <  this.vendor.securetime )
    {
      // console.log( this.vendor.securetime > this.vendor.securetime ||  this.vendor.securetime <  this.vendor.securetime);
      // alert('added secure time: ' + this.vendor.securetime );
      this.vendor.securetime +=':00';
    }

    if( this.lastbook > this.vendor.lastbooktime ||  this.lastbook <  this.vendor.lastbooktime )
    {
      // alert('added lastbooktime time: ' + this.vendor.lastbooktime );
      this.vendor.lastbooktime +=':00';
    }

    console.log('submiti function');
    this.vendor['id'] = this.id;
    if (this.vendor.category === 'SUPPLIER') {
      delete this.vendor['service'];
      delete this.vendor['weeklyoff'];
      delete this.vendor['weekoffday'];
      delete this.vendor['securetime'];
      delete this.vendor['lastbooktime'];
      delete this.vendor['defaultvend'];
    }
       var url = this.restService.vendorRestURL('edit', '');
       console.log(url);
       this.restService.postFormData(url, this.vendor).subscribe(
         (response:any) => {
           // Responce data.
           console.log('Status on Post API');
           console.log(response);
           // Now do your stuff here
           //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
           Swal.fire('', '', 'success');
           window.scrollTo(0, 0);
           this.route.navigate(['/managevendor']);
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
       let url = this.restService.vendorRestURL('details', this.id);
       this.restService.getJSONFromURL(url).subscribe(
         (response:any) => {
           console.log('Done fatching data!');
           // this.datalist = response;
           // this.getCityList(this.datalist.address.states);
          // this.deploymentacct = response;
          this.vendor.type=response.type;
          this.vendor.category=response.category;
          this.vendor.name=response.name;
          this.vendor.contactperson=response.contactperson;
          this.vendor.description=response.description;
          this.vendor.fax=response.fax;
          this.vendor.phone=response.phone;
          this.vendor.email=response.email;
          this.vendor.remark=response.remark;
          this.vendor.service=response.service;
          this.vendor.weeklyoff=response.weeklyoff;
          this.vendor.weekoffday=response.weekoffday;
          this.vendor.securetime=response.securetime;
          this.vendor.lastbooktime=response.lastbooktime;
          this.lastbook=response.lastbooktime;
          this.securetime=response.securetime;
          // this.vendor.defaultvend=response.defaultvend;
          this.vendor.address.city=response.address.city;
          this.vendor.address.country=response.address.country;
          this.vendor.address.line1=response.address.line1;
          this.vendor.address.line2=response.address.line2;
          this.vendor.address.pincode=response.address.pincode;
          this.vendor.address.states=response.address.states;
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
         (response:any) => {
           // this.restService.getJSONFromURL(response);
           this.statelist = response;
           console.log('State data available');
         },
         error => {
           console.log('Error in data load.');
         }
       );
     }

     private getState() {
      // Get Information from JSON REST api
      var url = this.restService.PincodeRestURL('',this.vendor.address.pincode);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          // this.restService.getJSONFromURL(response);
          this.statelist = response;
          this.vendor.address.states=response.state_name;
          this.vendor.address.city=response.city_name;


          console.log('State data available');
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }


     private getCatList() {
       // Get Information from JSON REST api
       var url = this.restService.catRestURL('', '');
       this.restService.getJSONFromURL(url).subscribe(
         (response:any) => {
           // this.restService.getJSONFromURL(response);
           this.catList = response;
           console.log('State data available');
         },
         error => {
           console.log('Error in data load.');
         }
       );
     }

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
         (response:any) => {
           this.citylist = response;
         },
         error => {
           console.log('Error in data load.');
         }
       );
     }

     private getdeploymentacct() {
      // this.depList = [];
      // // Get Information from JSON REST api
      // var url = this.restService.deploymentRestURL('', '');

      // this.restService.getJSONFromURL(url).subscribe(
      //   (response:any) => {
      //     this.depList = response;
      //   },
      //   error => {
      //     console.log('Error in data load.');
      //   }
      // );
    }





     submitData() {

      if(this.vendor.weeklyoff==="false"){
        delete this.vendor['weekoffday'];
      }

       console.log('submiti function');
       this.vendor.securetime +=':00';
       this.vendor.lastbooktime +=':00';
       var url = this.restService.vendorRestURL('add', '');
       console.log(url);


       if (this.vendor.category === 'SUPPLIER') {
         delete this.vendor['service'];
         delete this.vendor['weeklyoff'];
         delete this.vendor['weekoffday'];
         delete this.vendor['securetime'];
         delete this.vendor['lastbooktime'];
         delete this.vendor['defaultvend'];
       }

       console.log('vendor Json data for post:');
       console.log(this.vendor);
       this.restService.postFormData(url, this.vendor).subscribe(
         (response:any) => {
           // Responce data.
           console.log('Status on Post API');
           console.log(response);
           // Now do your stuff here
           Swal.fire('Submitted', '', 'success');
           window.scrollTo(0, 0);
           this.route.navigate(['/managevendor']);
         },
         error => {
           // Error Message
           Swal.fire(
             error.statusText,
             error._body,
             'error'
           );
           console.log('Error in data load.');
           this.vendor.securetime ='';
       this.vendor.lastbooktime ='';
           // Doyour stuff here
         }
       );
       return 0;
     }

     deleteRole(id: any) {


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
           const url = this.restService.vendorRestURL('delete', id);
           console.log('Delete using this id:' + id);
           const json = '{\"id\":\"' + id + '\"}';
           this.restService.deleteFormData(url).subscribe(
             (response:any) => {
               // Responce data.
               console.log('Status on Post API');
               console.log(response);
               Swal.fire(
                 'Deleted!',
                 'Your data has been deleted.',
                 'success'
               );
               this.route.navigate(['/managevendor']);
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
   }
