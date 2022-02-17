import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

declare var Swal: any;



@Component({
  selector: 'app-referancecall',
  templateUrl: './referancecall.component.html',
  styleUrls: ['./referancecall.component.css']
})



export class ReferancecallComponent implements OnInit {

  public title = '';
  public subtitle = '';
  // public alertify = require('alertify.js');
  public flag = false;


public rmList;
public custList;
public empList;

public refbyname1;
public refbyname2;


  public referancecall = {
    firm:sessionStorage.getItem('firm'),
    etype: '',
    refname: '',
    city:'',
    mobile:'',
    email:'',
    refbytype:'',
    refbyname:'',

    


   //  firm: sessionStorage.getItem('firm')
  };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;

  public id;
  public isUpdate = false;

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.routprms.snapshot.params['id'];
    this.flag = false;
    if (this.route.url === '/updatereferancecall/' + encodeURIComponent(this.id)) {
      this.title = 'Update Reference Call';
      this.subtitle = 'Edit Reference Call details';
      this.flag = true;
      this.isUpdate = true;
      this.getreferancecallById();
      this.getemplist();
      this.getcustlist();
    } else if (this.route.url === '/addreferancecall') {
      this.title = 'Add Reference Call';
      this.subtitle = 'Fill new Reference Call information and submit.';
      this.flag = true;
   //   this.getempbymarketing();
  //  this.getemplist();
  //  this.getcustlist();
    }  else {
      this.title = 'Manage Reference Calls';
      this.subtitle = 'Manage Reference Call information including view, add, update and delete';
      this.flag = false;
      this.getallreferancecall();
    }

  }


  omit_special_char(event)
{
   var k;
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}


cancel() {
  // goBack code fro cancel button
  window.history.back();
}










  /****************************** submit data************************************ */
  public submitData() {
    if(this.referancecall.refbytype==='CUSTOMER')
    {
      this.referancecall.refbyname=this.refbyname1;
    }
    if(this.referancecall.refbytype==='OTHER')
    {
      this.referancecall.refbyname=this.refbyname2;
    }

    if(this.referancecall.etype==='COLDCALL')
    {
       delete this.referancecall.refbytype;
       delete this.referancecall.refbyname;

    }
    console.log('submitData function');
    console.log(this.referancecall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('addreferancecall', '');
    this.restService.postFormData(url, this.referancecall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
          Swal.fire('Added', '', 'success');
          this.route.navigate(['/managereferancecall']);
          window.scrollTo(0, 0);

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

  public updateData() {

    console.log('Updatedata function');
    console.log(this.referancecall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('edit', '');
    this.restService.postFormData(url, this.referancecall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
          this.route.navigate(['/managereferancecall']);
          window.scrollTo(0, 0);

      },
      error => {
        // Error Message
        Swal.fire(
          error.statusText,
          error._body,
          'error'
        )
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }

  // delete Role
  delete(id: any) {
 
    Swal.fire({
      title: 'Are you sure?',
    // text: 'You will not be able to recover this data!',
      text: ' It will delete from all places wherever it is in used!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.crmRestURL('referencecalldelete', id);
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
            )
            this.getallreferancecall();
            // Now do your stuff here
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
  /******************************End submit data************************************ */
  /******************************get data ********************************************/
  public getallreferancecall() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('referancecallall', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
       
        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getreferancecallById() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('referancecallbyid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.referancecall = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  /******************************End Get Data*************************************** */

  // public onChangeRM(obj) {
  //   console.log(obj.target.options[obj.target.selectedIndex].text);
  //   this.referancecall.empname = obj.target.options[obj.target.selectedIndex].text;
  // //  this.getallcustomerbyrm();
  // };

  


  public passtype()
  {



    console.log(this.referancecall.refname);
    if( this.referancecall.refbytype==='CUSTOMER')

    {
    console.log(this.referancecall.refname);

      this.getcustlist();

    }
    if( this.referancecall.refbytype==='EMPLOYEE')
    {
    console.log(this.referancecall.refname);

this.getemplist();
    }
    
  }
//   public getempbymarketing() {
//     // Get Information from JSON REST api
//     const url = this.restService.empRestURL('empbyrole', 'MARKETING');
//     this.restService.getJSONFromURL(url).subscribe(
//       (response:any) => {
//         this.restService.getJSONFromURL(response);
//         // this.datalist = response;
//         // this.data=response;
//         console.log(response);
//         this.rmList = response;
//       },
//       error => {
//         console.log('Error in data load.');
//       }
//     );
//   }

  public getemplist() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getcustlist() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.custList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
}