import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-recentorder',
  templateUrl: './recentorder.component.html',
  styleUrls: ['./recentorder.component.css']
})

export class RecentorderComponent implements OnInit {

  public title = '';
  public subtitle = '';
  // public alertify = require('alertify.js');
  public flag = false;


  public isLoader = false;

 public custname;

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;

  public id;
  public isUpdate = false;
  public recentorderlink = this.route.url === '/recentcustorder/' + encodeURIComponent(this.id);

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.routprms.snapshot.params['id'];
    this.flag = false;
    if (this.route.url === '/recentcustorder/' + encodeURIComponent(this.id)) {
   //   this.title = 'Recent Customer ';
   //   this.subtitle = 'Edit Department details';

     // this.getDepById();
     this.getrecentorders();
    } 
      else {
      // this.title = 'Approve Quotations';
      // this.subtitle = 'Manage Department information including view, add, update and delete';
      // this.flag = false;
      this.getquotehistory();
  
    }
  }

  public getrecentorders() {

    this.isLoader = true;


 //   const lmt = 'limit=' + this.limit + '&index=' + Number((this.index - 1) * this.counter);



 let url = this.restService.quoteRestURL('recentcustorders',this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.data = response;
        this.custname=response[0].custname
        this.isLoader = false;
     //   this.custname=response[0].custname;
        //  this.empList = response;
      },
      error => {
        this.isLoader = false;
        console.log('Error in data load.');
      }
    );
  }

  public getquotehistory() {

    this.isLoader = true;


 //   const lmt = 'limit=' + this.limit + '&index=' + Number((this.index - 1) * this.counter);



 let url = this.restService.quoteRestURL('quotehistory',this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.data = response;
        this.custname=response[0].custname;
        this.isLoader = false;
       
        //  this.empList = response;
      },
      error => {
        this.isLoader = false;
        console.log('Error in data load.');
      }
    );
  }


cancel() {
  // goBack code fro cancel button
  window.history.back();
}


  // delete Role
  delete(id: any) {
//   /*  if (confirm('Are you sure you want to delete this?')) {
//       const url = this.restService.departmentRestURL('delete', '');
//       console.log('Delete using this id:' + id);
//       const json = '{\"id\":\"' + id + '\"}';
//       this.restService.postFormData(url, json).subscribe(
//         (response:any) => {
//           // Responce data.
//           console.log('Status on Post API');
//           console.log(response);
//           this.alertify.alert('Deleted Successfully');
//           this.getRoleList();
//           // Now do your stuff here
//         },
//         error => {
//           // Error Message
//           this.alertify.alert('<b>Failed to delete </b><br>' + error.statusText + '<br>'
//             + error._body);
//           console.log('Error in data load.');
//           // Doyour stuff here
//         }
//       );
//       return 0;
//     }
// */
//     /////////////////////////////
//     Swal.fire({
//       title: 'Are you sure?',
//     // text: 'You will not be able to recover this data!',
//       text: ' It will delete from all places wherever it is in used!',
//       type: 'Warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, keep it'
//     }).then((result) => {
//       if (result.value) {
//         // delete code

//         const url = this.restService.departmentRestURL('delete', '');
//         console.log('Delete using this id:' + id);
//         const json = '{\"id\":\"' + id + '\"}';
//         this.restService.postFormData(url, json).subscribe(
//           (response:any) => {
//             // Responce data.
//             console.log('Status on Post API');
//             console.log(response);
//             Swal.fire(
//               'Deleted!',
//               'Your data has been deleted.',
//               'success'
//             )
//             this.getRoleList();
//             // Now do your stuff here
//           },
//           error => {
//             // Error Message
//             /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
//                + error._body); */
//             Swal.fire(
//               error.statusText,
//               error._body,
//               'error'
//             );
//             console.log('Error in data load.');
//             // Doyour stuff here
//           }
//         );

//         // delete code end
//         // For more information about handling dismissals please visit
//         // https://sweetalert2.github.io/#handling-dismissals
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire(
//           'Cancelled',
//           'Your data is safe :)',
//           'error'
//         );
//       }
//     });
  }
  /******************************End submit data************************************ */
  /******************************get data ********************************************/
  public getRoleList() {
    // // Get Information from JSON REST api
    // const url = this.restService.departmentRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.data = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }


  approvequote(data:any)
  {
    console.log('Order Confirmed');
    console.log(data);
const Json = {
  id: data.id,
  status:'ORDER_CONFIRM',
  paymentstatus:'ADMIN_APPROVED'

    };

 const url = this.restService.quoteRestURL('edit', '');
    this.restService.postFormData(url, Json).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Order Confirmed', '', 'success');
       // this.route.navigate(['/manageenquiry']);
        window.scrollTo(0, 0);
      // this.getquotationsbystatus();
      },
      error => {
     //   Error Message
        Swal.fire(
          'Please Update Customer&#39s Credit Limit Or Account Balance',
          error._body,
          'error'
        );


        console.log('Error in data load.');
        // Doyour stuff here
      }
      
      
    );
    return 0;

  }
 
  rejectquote(data:any)
  {
    console.log('Order Confirmed');
    console.log(data);
const Json = {
  id: data.id,
  status:'REJECTED',
  paymentstatus:'UNPAID'

    };

 const url = this.restService.quoteRestURL('edit', '');
    this.restService.postFormData(url, Json).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Order Confirmed', '', 'success');
       // this.route.navigate(['/manageenquiry']);
        window.scrollTo(0, 0);
   //    this.getquotationsbystatus();
      },
      error => {
     //   Error Message
        Swal.fire(
          'Please Update Customer&#39s Credit Limit Or Account Balance',
          error._body,
          'error'
        );


        console.log('Error in data load.');
        // Doyour stuff here
      }
      
      
    );
    return 0;

  }
  /******************************End Get Data*************************************** */

  deletequotation(id: any) {
  


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
        const url = this.restService.quoteRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );

            if (this.route.url === '/recentcustorder/' + encodeURIComponent(this.id)) {
             
              this.getrecentorders();
            } else {
              this.getquotehistory();
            }
            
          },
          error => {
            // Error Message
            /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
               + error._body); */
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
    });
  }
  confirmorder(data: any)
  {
    console.log('Order Confirmed');
    console.log(data);
const Json = {
  id: data.id,
  status:'ORDER_CONFIRM'
    };

 const url = this.restService.quoteRestURL('edit', '');
    this.restService.postFormData(url, Json).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Order Confirmed', '', 'success');
       // this.route.navigate(['/manageenquiry']);
        window.scrollTo(0, 0);
        if (this.route.url === '/recentcustorder/' + encodeURIComponent(this.id)) {
             
          this.getrecentorders();
        } else {
          this.getquotehistory();
        }
        
      
      },
      error => {
        Swal.fire({
          title: error._body,
          text: 'Do you want to Sent this Quotation to Admin for Approval',
          type: 'Warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Send it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          this.quotationapproval(data);
        })
        console.log('Error in data load.');
        // Doyour stuff here
      }
      
      
    );
    return 0;
  }

  quotationapproval(data:any)
{

  console.log(data);
  const Json = {
    id: data.id,
    status:'REQUEST_UNPAID_APPROVAL'
      };
      const url = this.restService.quoteRestURL('edit', '');
  this.restService.postFormData(url, Json).subscribe(
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Requested', '', 'success');
      window.scrollTo(0, 0);
      this.route.navigate(['/managequotation']);
      if (this.route.url === '/recentcustorder/' + encodeURIComponent(this.id)) {
             
        this.getrecentorders();
      } else {
        this.getquotehistory();
      }

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
}
