import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var Swal: any;
@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  public title = '';
  public subtitle = '';
//  private alertify = require('alertify.js');
  public flag = false;
public otp;
  public isOtpsend=false;

  public reg = {
    type: '',
    phone: '',
  };

  public userotp;

  private dept = {
    name: '',
    description: '',
    //  firm: sessionStorage.getItem('firm')
  };
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;
public departmentlist;
  private id;
  public isUpdate = false;
  constructor(private route: Router,
   // private restService: RestService,
    private routprms: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.routprms.snapshot.params['id'];
    this.flag = false;
    if (this.route.url === '/updatedept/' + encodeURIComponent(this.id)) {
      this.title = 'Update Department';
      this.subtitle = 'Edit Department details';
      this.flag = true;
      this.isUpdate = true;
      this.getDepById();
    } else if (this.route.url === '/verifywithotp') {
      this.title = 'Verify Your Number';
      this.subtitle = 'Fill new Department information and submit.';
      this.flag = true;
    } else {
      this.title = 'Manage Departments';
      this.subtitle = 'Manage Department information including view, add, update and delete';
      this.flag = false;
      this.getRoleList();
    }
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }


  private submitData() {

  this.isOtpsend = true;
 // alert()
    // console.log('submitData function');
    // console.log(this.dept);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.departmentRestURL('add', '');
    // this.restService.postFormData(url, this.dept).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('Added', '', 'success');
    //     this.route.navigate(['/managedept']);
    //     window.scrollTo(0, 0);

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

  sendOtop(){
    console.log('send otp code to customers mobile');

    this.otp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
    alert('customer otp = ' + this.otp);
   // this.tab1 = false;
    this.isOtpsend = true;
  }


  private updateData() {

    // console.log('submitData function');
    // console.log(this.dept);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.departmentRestURL('edit', '');
    // this.restService.postFormData(url, this.dept).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('Updated', '', 'success');
    //     this.route.navigate(['/managedept']);
    //     window.scrollTo(0, 0);

    //   },
    //   error => {
    //     // Error Message
    //     Swal.fire(
    //       error.statusText,
    //       error._body,
    //       'error'
    //     )
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;
  }

  delete(id: any) {


    // Swal.fire({
    //   title: 'Are you sure?',
    //   // text: 'You will not be able to recover this data!',
    //   text: ' It will delete from all places wherever it is in used!',
    //   type: 'Warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code

    //     const url = this.restService.departmentRestURL('delete', '');
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
    //         this.getRoleList();
    //         // Now do your stuff here
    //       },
    //       error => {
    //         // Error Message
    //         /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
    //            + error._body); */
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

  private getRoleList() {
    // // Get Information from JSON REST api
    // const url = this.restService.departmentRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.departmentlist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getDepById() {
    // // Get Information from JSON REST api
    // const url = this.restService.departmentRestURL('details', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.dept = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }




}
