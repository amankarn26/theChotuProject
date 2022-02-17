import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var Swal: any;
@Component({
  selector: 'app-travelrate',
  templateUrl: './travelrate.component.html',
  styleUrls: ['./travelrate.component.css']
})
export class TravelrateComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  public userType;
  public citylist1;
  public citylist2;


  public statelist = [];
  public citylist = [];
  private vendorList;
  private isUpdate = false;
  public id;
  private member = {
    role: '',
    description: ''
  };


  private custstate;
  private trate = {

    vendor: '',
    vname : '',
    // custstate:'',
    destcity:'',
    minwt: '',
    maxwt: '',
    rateunit: '',
    rateperunit: ''

  };

  private category = {
    firm: sessionStorage.getItem('firm'),
    name: '',
    description: '',
  };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;


  constructor(
    private route: Router,
  //  private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  ngOnInit() {


    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }

    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addtravelrate') {
      this.title = 'Add Travel Rate';
      this.subtitle = 'Add Travel Rate';
      this.isManageState = false;
      this.getvendorList();
      this.getStateList();



    } else if (this.route.url === '/edittravelrate/' + this.id) {
      this.title = 'Edit Travel Rate';
      this.subtitle = 'Update  travel rate';
      this.isManageState = false;
      this.isUpdate=true;
      this.getByid();
      this.getvendorList();
      this.getStateList();
    } else {
      this.title = 'Manage Travel Rate';
      this.subtitle = 'Manage Travel Rate';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }

  }



  private getData() {
    // // Get Information from JSON REST api
    // var url = this.restService.travelrateRestURL('', '');
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
    // this.trate['id'] = this.id;
    // console.log('update function');
    // var url = this.restService.travelrateRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.trate).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('Updated', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managetravelrate']);
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


  private getByid() {
    // // Get Information from JSON REST api
    // let url = this.restService.travelrateRestURL('details', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');
    //     // this.datalist = response;
    //     // this.getCityList(this.datalist.address.states);

    //     this.trate.vendor = response.vendor;
    //     this.trate.vname = response.vname;
    //     this.custstate=response.custstate;
    //     this.getCityList(response.custstate);
    //     this.trate.destcity = response.destcity;
    //     this.trate.minwt = response.minwt;
    //     this.trate.maxwt = response.maxwt;
    //     this.trate.rateunit = response.rateunit;
    //     this.trate.rateperunit = response.rateperunit;


    //     console.log(response);
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
  private onChangeState1(obj) {
   const stateId = obj.srcElement.value;
   // Call city data method
   this.getCityList1(stateId);
 }
 private onChangeState2(obj) {
   const stateId = obj.srcElement.value;
   // Call city data method
   this.getCityList2(stateId);
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

  private getCityList1(stateId) {
  //  this.citylist1 = [];
  //  // Get Information from JSON REST api
  //  const url = this.restService.cityRestURL('', stateId);
  //  console.log(stateId);
  //  this.restService.getJSONFromURL(url).subscribe(
  //    (response:any) => {
  //      this.citylist1 = response;
  //    },
  //    error => {
  //      console.log('Error in data load.');
  //    }
  //  );
 }
 private getCityList2(stateId) {
  //  this.citylist2 = [];
  //  // Get Information from JSON REST api
  //  const url = this.restService.cityRestURL('', stateId);
  //  console.log(stateId);
  //  this.restService.getJSONFromURL(url).subscribe(
  //    (response:any) => {
  //      this.citylist2 = response;
  //    },
  //    error => {
  //      console.log('Error in data load.');
  //    }
  //  );
 }

  private getvendorList() {
    // this.vendorList = [];
    // // Get Information from JSON REST api
    // var url = this.restService.vendorRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     console.log(response);
    //     this.vendorList = response;

    //     console.log('Category data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }




  private getCatList() {
    // // Get Information from JSON REST api
    // var url = this.restService.catRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.catList = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  submitData() {
    // console.log('submiti function');
    // var url = this.restService.travelrateRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.trate).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managetravelrate']);
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


  private onChangeVendor(obj) {
    const stateId = obj.srcElement.value;
    // console.log(obj);
    // Call city data method
    console.log('getting name of secondary handler');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.trate.vname =
      obj.target.options[obj.target.selectedIndex].text;
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
    //     const url = this.restService.travelrateRestURL('delete', '');
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
    //         )
    //         this.getData();
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



}
