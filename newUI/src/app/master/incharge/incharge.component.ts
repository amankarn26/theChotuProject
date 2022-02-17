import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';

declare var Swal: any;
@Component({
  selector: 'app-incharge',
  templateUrl: './incharge.component.html',
  styleUrls: ['./incharge.component.css']
})
export class InchargeComponent implements OnInit {
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public userType;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate= false;
  private empList;

  public id;

  private inc = {
	employee:'',
	empname:'',
	role:''
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
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }


  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
        function onOk() {alert("Ok");},
        function onCancel() { alert("Cancel");}
    );*/
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }


    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addincharge') {
      this.title = 'Add Incharge';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;
      this.getinchargeEmployee();


    } else if (this.route.url === '/updateincharge/' + this.id) {
      this.title = 'Edit Incharge';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate=true;
      this.getByid();
    } else {
      this.title = 'Manage Incharge';
      this.subtitle = 'Manage Incharge information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
       this.getData();
    }


  }
  private getData() {
//     // Get Information from JSON REST api
// // http://localhost:8090/SuppChainManager/rest/employee/incharge
//     var url = this.restService.inchargeRestURL('', '');
//     this.restService.getJSONFromURL(url).subscribe(
//       (response:any) => {
//         this.restService.getJSONFromURL(response);
//         this.data = response;
//         console.log(response);

//       },
//       error => {
//         console.log('Error in data load.');
//       }
//     );
  }


  private byrole() {
    // // Get Information from JSON REST api

    // const url = this.restService.empRestURL('incharge', this.inc.role);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
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
    // var url = this.restService.referenceRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.inc).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/manageincharge']);
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



  private getinchargeEmployee() {
    this.empList = [];

    // Get Information from JSON REST api
    var url = this.restService.empRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );


  }
  private onChangeHandler2(obj) {
    const stateId = obj.srcElement.value;
    // console.log(obj);
    // Call city data method
    console.log('sechandler...');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.inc.empname = obj.target.options[obj.target.selectedIndex].text;
  }


  private getByid() {
    // // Get Information from JSON REST api
    // let url = this.restService.actcatRestURL('details', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');
    //    // this.datalist = response;
    //    // this.getCityList(this.datalist.address.states);
    //     this.inc = response;


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

    var url = this.restService.inchargeRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.inc).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageincharge']);
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
    //     const url = this.restService.inchargeRestURL('delete', '');
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
    // })
  }

 cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
}


