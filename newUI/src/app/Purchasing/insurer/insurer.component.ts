import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from './../../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.css']
})
export class InsurerComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  public userType;
  public statelist = [];
  public citylist = [];

  public id;



  private insurer = {
    // category: [this.getCatList()],
    gstno: '',
    firm: sessionStorage.getItem('firm'),
    name: '',
    description: '',
    fax: '',
    phone: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '',
      city: '',
      country: 'India'
    }
  };

  // private category = {
  //   firm: sessionStorage.getItem('firm'),
  //   name: '',
  //   description: '',
  // };

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

    if (this.route.url === '/addinsurer') {
      this.title = 'Add Insurer';
      this.subtitle = 'Fill new S information and submit.';
      this.isManageState = false;
      // this.getStateList();
      // this.getCityList('Maharashtra');

    } else if (this.route.url === '/editinsurer/' + this.id) {
      this.title = 'Update Insurer';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      // this.getStateList();
      // this.getCityList('Maharashtra');
      this.getByid();

    } else {
      this.title = 'Manage Insurer';
      this.subtitle = 'Manage insurer information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }


  }
  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.insurerRestURL('', '');
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
    console.log('submiti function');
    var url = this.restService.insurerRestURL('edit', this.id);
    console.log(url);
    this.restService.postFormData(url, this.insurer).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageinsurer']);
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
    let url = this.restService.insurerRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        this.insurer = response;
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
      (response: any) => {
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
  //     (response: any) => {
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
      (response: any) => {
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
    var url = this.restService.insurerRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.insurer).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageinsurer']);
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
           ( response :any) => {
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
        const url = this.restService.insurerRestURL('delete', id);
        // console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
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
      } else if (result.dismiss === Swal.fire.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    })
  }

  private getState() {
    // Get Information from JSON REST api
    this.insurer.address.states = '';
    this.insurer.address.city = '';
    var url = this.restService.PincodeRestURL('', this.insurer.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.insurer.address.states = response.state_name;
        this.insurer.address.city = response.city_name;


        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');

        Swal.fire('Pincode Not Found', 'Please Add State And City For This Pincode', 'error');
        // this.insurer.address.states = '';
        // this.insurer.address.city = '';
        //  Swal.fire({
        //   title: 'Add Pincode',
        //   subtitle: 'Pincode',

        //   input: 'text',
        //   inputAttributes: {
        //     autocapitalize: 'off'
        //   },
        //   showCancelButton: true,
        //   confirmButtonText: 'Add Pincode',
        //   showLoaderOnConfirm: true,
        //   // preConfirm: (login) => {
        //   //   return fetch(`//api.github.com/users/${login}`)
        //   //     .then((response:any) => {
        //   //       if (!response.ok) {
        //   //         throw new Error(response.statusText)
        //   //       }
        //   //       return response.json()
        //   //     })
        //   //     .catch(error => {
        //   //        Swal.fire.showValidationMessage(
        //   //         `Request failed: ${error}`
        //   //       )
        //   //     })
        //   // },
        //   allowOutsideClick: () => ! Swal.fire.isLoading()
        // }).then((result) => {
        //   if (result.value) {
        //      Swal.fire({
        //       title: `${result.value.login}'s avatar`,
        //       imageUrl: result.value.avatar_url
        //     })
        //   }
        // })
      }
    );
  }
}
