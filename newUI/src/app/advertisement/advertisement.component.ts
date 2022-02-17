// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-advertisement',
//   templateUrl: './advertisement.component.html',
//   styleUrls: ['./advertisement.component.css']
// })
// export class AdvertisementComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

declare var Swal: any;

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  //  public userType;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate = false;

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public firmcatgeory = sessionStorage.getItem('offer');

  public id;
  private member = {
    role: '',
    description: ''
  };

  public docurll;

  public firm = {
    name: '',
    regno: '',
    phone: '',
    email: '',
    empcount: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };

  private offer = {
    // deployacct:'',
    name: '',
    
    // photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' },
    
    // photo: '',
    // description: '',
    // firm:sessionStorage.getItem('firm')
  };

  private advertisement = {
    // deployacct:'',
    // name: '',
    // validtill: ''
    // photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' },
    
    // photo: '',
    // description: '',
    // firm:sessionStorage.getItem('firm')
  };

  public file;
  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' },
  };

  public prodtypeid;


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


  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
        function onOk() {alert("Ok");},
        function onCancel() { alert("Cancel");}
    );*/
    // alert(this.userRole);
    //  alert(this.userType);

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }


    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addadvertisement') {
      this.title = 'Add Advertisement';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;
      //  this.getdeploymentacct();

    } else if (this.route.url === '/editadvertisement/' + this.id) {
      this.title = 'Update Advertisement';
      this.subtitle = 'Update Ca information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid();
      //  this.getdeploymentacct();
    } else {
      this.title = 'Manage Advertisement';
      this.subtitle = 'Manage Advertisement information including view, add, update and delete';
      //   this.userType = sessionStorage.getItem('role');
      this.getData();
    }


  }
  
  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.advertisementRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
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

    this.prodtypeid = this.id;
    if (this.file) {

      this.uploadfile();
      this.photo.id = this.id;
      // delete this.category['id'];
      this.advertisement['photo'] = this.photo.photo;
    } else {
      delete this.advertisement['photo'];
    }


    console.log('submiti function');
    var url = this.restService.advertisementRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.advertisement).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageadvertisement']);
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

  // private getdeploymentacct() {
  //   this.depList = [];
  //   // Get Information from JSON REST api
  //   var url = this.restService.deploymentRestURL('', '');

  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any) => {
  //       this.depList = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.advertisementRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        this.advertisement = response;
        console.log(response);
        if (response.photo) {
          this.docurll = this.docServer + '/' + response.photo.docpath;
        }
        console.log(response);


      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

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
    // let stateId = obj.srcElement.value;
    // // Call city data method
    // this.getCityList(stateId);
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
    this.uploadfile();

    console.log('submiti function');
    var url = this.restService.advertisementRestURL('add', '');
  this.offer['photo'] = this.photo.photo;
    console.log(url);
    this.restService.postFormData(url, this.advertisement).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.prodtypeid = response.id;

        if (this.file) {
          this.photo.id = response.id;
          // this.photoAdd();
          // this.uploadfile();
          Swal.fire('Submited', '', 'success');
          window.scrollTo(0, 0);
          console.log(response);
          this.route.navigate(['/manageadvertisement']);

        } 
        // else {
        //   Swal.fire('Submited', '', 'success');
        //   window.scrollTo(0, 0);
        //   console.log(response);
        //   this.route.navigate(['/manageoffer']);
        // }
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
        const url = this.restService.advertisementRestURL('delete', id);
        console.log('Delete using this id:' + id);
        // const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
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



  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }


  uploadfile() {
    if (this.file) {

      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.photo.docname = this.file.name;
      this.photo.photo.doctype = 'OFFER';
      // this.photo.photo.docpath = 'Offer/' + this.prodtypeid + '/' + rname + this.file.name;
      this.photo.photo.docpath = 'OFFER/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      // docFormData.append('name', 'Category');
      docFormData.append('width', '400');
      docFormData.append('height', '400');
      docFormData.append('name', 'OFFER');
      var docurl = this.restService.customUpload('upload', '');
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Upload API');
          console.log(response);
          // Now do your stuff here

          return 1;
        },
        error => {
          // Error Message
          console.log('Error in doc upload .');
          return 0;
          // Do your stuff here
        }
      );


    } else {

      return 0;
    }

  }

  private photoAdd() {

    this.uploadfile();
    // if (this.uploadfile()){
    console.log('submitData function');
    console.log(this.photo.id);
    const url = this.restService.advertisementRestURL('edit', '');
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageadvertisement']);
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
    // }
  }

  fileEvent(fileInput: any) {
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (advertisement: any) => {
        this.docurll = advertisement.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log('Inside multiple file select');
    }
  }

}


