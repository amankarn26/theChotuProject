import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';

declare var Swal: any;
@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {
  public title = '';
  public subtitle = '';
 // private alertify = require('alertify.js');
  public flag= false;

  private user = {
    role: '',
    description: ''
  };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;

  constructor(private route: Router,
    private restService: RestService

    ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  ngOnInit() {

    this.flag = false;
    if (this.route.url === '/addrole') {
      this.title = 'Add Role';
      this.subtitle = 'Fill new Role information and submit.';
      this.flag = true;
    } else {
      this.title = 'Manage Role';
      this.subtitle = 'Manage Rol information including view, add, update and delete';
      this.flag = false;
      this.getRoleList();
    }

}

  /****************************** submit data************************************ */
  private submitData() {

    // console.log('submitData function');
    // console.log(this.user);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.roleRestURL('add', '');
    // this.restService.postFormData(url, this.user).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //       window.scrollTo(0, 0);
    //     this.route.navigate(['/managerole']);

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

 // delete Role
 deleteRole(id: any) {


  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: 'You will not be able to recover this data!',
  //    type: 'Warning',
  //    showCancelButton: true,
  //    confirmButtonText: 'Yes, delete it!',
  //    cancelButtonText: 'No, keep it'
  //  }).then((result) => {
  //    if (result.value) {
  //      // delete code
  //      const url = this.restService.roleRestURL('delete', '');
  //      console.log('Delete using this id:' + id);
  //      const json = '{\"role\":\"' + id + '\"}';
  //      this.restService.postFormData(url, json).subscribe(
  //        (response:any) => {
  //          // Responce data.
  //          console.log('Status on Post API');
  //          console.log(response);
  //          Swal.fire(
  //            'Deleted!',
  //            'Your data has been deleted.',
  //            'success'
  //          )
  //          this.getRoleList();
  //          // Now do your stuff here
  //        },
  //        error => {
  //          // Error Message
  //          Swal.fire(
  //            error.statusText,
  //            error._body,
  //            'error'
  //          );
  //          console.log('Error in data load.');
  //          // Doyour stuff here
  //        }
  //      );

  //      // delete code end
  //      // For more information about handling dismissals please visit
  //      // https://sweetalert2.github.io/#handling-dismissals
  //    } else if (result.dismiss === Swal.DismissReason.cancel) {
  //      Swal.fire(
  //        'Cancelled',
  //        'Your data is safe :)',
  //        'error'
  //      );
  //    }
  //  })
}
/******************************End submit data************************************ */
/******************************get data ********************************************/
    private getRoleList() {
  //    Get Information from JSON REST api
  this.data=[];
      const url = this.restService.roleRestURL('', '');
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
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
/******************************End Get Data*************************************** */
}
