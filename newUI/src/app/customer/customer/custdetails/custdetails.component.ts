import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgFor } from '@angular/common';
// import { HttpModule, Response } from '@angular/http';
import { RestService } from './../../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;
@Component({
  selector: 'app-custdetails',
  templateUrl: './custdetails.component.html',
  styleUrls: ['./custdetails.component.css']
})
export class CustdetailsComponent implements OnInit {
  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public userType;
  public statelist = [];
  public citylist = [];
  public file;
  public id;
  private member = {
    role: '',
  };

  public document;
  public firmid;

  public firm = {
    name: '',
    dob: '',
    // regno: '',
    phone: '',
    email: '',
    code: '',
    empcount: '',
    pannum: '',
    gstin: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };


  public docServer = this.restService.docServer;

  private photo = { docname: '', docpath: '', docdesc: '', doctype: '' };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public urls;
  public isUpdate = false;

  public custdetails;
  public cust_datalist;
  public doclist;
  public customerId;

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
    if (this.routprms.snapshot.params['eid']) {
      this.id = this.routprms.snapshot.params['eid'];
      this.customerId = this.id;
    }


    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addfirm') {
      this.title = 'Add Firm';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;

    } else if (this.route.url === '/editfirm/' + this.id) {
      this.title = 'Edit Firm';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getFirm();
    } else {
      this.title = 'Customer Details';
      this.subtitle = 'Manage firm information including view, add, update and delete';

      this.getEmpById();
      // this.getcustDatabyId();
      // this.getcustDocsbyId();
    }


  }
  private getRoleList() {
    // // Get Information from JSON REST api
    // var url = this.restService.firmRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.data = response;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }



  updateData() {
    // console.log('submiti function');
    // // alert('inside update');







    // if (this.file) {
    //   // if( this.firm['logo']){
    //   this.uploadfile();
    //   this.firm['logo'] = this.photo;
    //   // }else{
    //   //   this.uploadfile();
    //   //   this.submitdoc();
    //   // }
    // } else {
    //   //  alert('No File selected');
    // }

    // //    delete this.firm['logo'];


    // var url = this.restService.firmRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.firm).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managefirm']);
    //   },
    //   error => {
    //     // Error Message
    //     Swal.fire(
    //       error.statusText,
    //       error._body,
    //       'error'
    //     );
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;
  }

  private getFirm() {
    // // Get Information from JSON REST api
    // let url = this.restService.firmRestURL('details', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');

    //     //  this.firm.address.states = [this.getStateList()];
    //     this.datalist = response;
    //     this.getCityList(this.datalist.address.states);
    //     this.firm = response;
    //     console.log(response);
    //     // this.firm.address.states = this.datalist.address.states;
    //     // this.firm.address.states = this.datalist.address.states;




    //     this.datalist = response;
    //     this.getCityList(this.datalist.address.states);
    //     this.firm = response;
    //     console.log(response);
    //     // this.firm.address.states = this.datalist.address.states;
    //     // this.firm.address.city = this.datalist.address.states;
    //     if (response.logo) {
    //       this.urls = this.docServer + '/' + response.logo.docpath;
    //     }
    //     this.firmid = response.id;

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getStateList() {
    // // Get Information from JSON REST api
    // var url = this.restService.stateRestURL('', 'India');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
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
    //   (response:any) => {
    //     this.citylist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
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

    // let flg = true;

    // if (this.firm.pannum != '' || this.firm.gstin != '') {
    // console.log('submiti function');
    // var url = this.restService.firmRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.firm).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     this.firmid = response.id;
    //     if (this.file) {

    //       this.uploadfile();
    //       this.submitdoc();
    //     }

    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managefirm']);
    //   },
    //   error => {
    //     // Error Message
    //     Swal.fire(
    //       error.statusText,
    //       error._body,
    //       'error'
    //     );
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;

    // }else{
    //   Swal.fire(
    //     'Please add PAN no. Or GST no.',
    //      '',
    //      'error'
    //    );
    // }
  }

  deleteRole(id: any) {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this data!',
    //   type: 'Warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code
    //     const url = this.restService.firmRestURL('delete', '');
    //     console.log('Delete using this id:' + id);
    //     const json = '{\"id\":\"' + id + '\"}';
    //     this.restService.postFormData(url, json).subscribe(
    //       (response:any) => {
    //         // Responce data.
    //         console.log('Status on Post API');
    //         console.log(response);
    //         Swal.fire(
    //           'Deleted!',
    //           'Your data has been deleted.',
    //           'success'
    //         );
    //         this.getRoleList();
    //         // Now do your stuff here
    //       },
    //       error => {
    //         // Error Message
    //         Swal.fire(
    //           error.statusText,
    //           error._body,
    //           'error'
    //         );
    //         console.log('Error in data load.');
    //         // Doyour stuff here
    //       }
    //     );

    //     // delete code end
    //     // For more information about handling dismissals please visit
    //     // https://sweetalert2.github.io/#handling-dismissals
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelled',
    //       'Your data is safe :)',
    //       'error'
    //     );
    //   }
    // });
  }



  private getState() {
    // // Get Information from JSON REST api
    // const url = this.restService.PincodeRestURL('', this.firm.address.pincode);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.statelist = response;
    //     this.firm.address.states = response.state_name;
    //     this.firm.address.city = response.city_name;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  fileEvent(fileInput: any) {
    // // alert('file event begin');
    // if (fileInput.target.files[0] != '') {
    //   this.file = fileInput.target.files[0];
    //   var reader = new FileReader();
    //   reader.onload = (event: any) => {
    //     this.urls = event.target.result;
    //   }
    //   reader.readAsDataURL(fileInput.target.files[0]);
    //   console.log('Inside multiple file select');
    // }
  }



  uploadfile() {

    // if (this.file) {
    //   const fileExtension = '.' + this.file.name.split('.').pop();
    //   const rname = Math.random().toString(36).substring(7) + new Date().getTime();

    //   let objDoc = new Object();
    //   this.photo.docname = this.file.name;
    //   this.photo.doctype = 'LOGO';
    //   this.photo.docpath = this.firmid + '/' + rname + this.file.name;

    //   var docFormData = new FormData();
    //   // docFormData.append('doc', this.file, this.fileName);
    //   docFormData.append('doc', this.file, rname + this.file.name);
    //   docFormData.append('name', this.firmid);
    //   var docurl = this.restService.docsRestURL('upload', '');
    //   console.log(docurl);

    //   this.restService.uploadFormData(docurl, docFormData).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       console.log('Status on Upload API');
    //       console.log(response);
    //       // Now do your stuff here
    //       return 1;
    //     },
    //     error => {
    //       // Error Message
    //       console.log('Error in doc upload .');
    //       return 0;
    //       // Do your stuff here
    //     }
    //   );
    // } else {
    //   return 0;
    // }

  }


  submitdoc() {

    // let docs = {
    //   id: this.firmid,
    //   logo: this.photo
    // };

    // console.log('submiti function');
    // var url = this.restService.firmRestURL('logoadd', '');
    // console.log(url);
    // this.restService.postFormData(url, docs).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     this.firmid = response.id;
    //     console.log('Status on Post API');
    //     console.log(response);
    //   },
    //   error => {
    //     // Error Message
    //     this.alertify.alert('<b>Failed to add Firm Logo</b><br>' + error.statusText + '<br>'
    //       + error._body);
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;
  }



  // customer details
  private getEmpById() {

    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        this.custdetails = response;
        if (response.photo) {
          this.url = this.docServer + '/' + response.photo.docpath;
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  private getcustDatabyId() {
    // Get Information from JSON REST api
    // const url = this.restService.customerRestURL('getcustDatabyId', this.customerId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     this.cust_datalist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }


  private getcustDocsbyId() {
    // // Get Information from JSON REST api
    // const url = this.restService.customerRestURL('getcustDocsbyId', this.customerId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     this.doclist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  dwld(data: any) {
  //  window.open(this.docServer + '/' + data.docpath);

  }
}
