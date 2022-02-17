import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

declare var Swal: any;



@Component({
  selector: 'app-targetcall',
  templateUrl: './targetcall.component.html',
  styleUrls: ['./targetcall.component.css']
})


export class TargetcallComponent implements OnInit {

  public title = '';
  public subtitle = '';
  // public alertify = require('alertify.js');
  public flag = false;


public rmList;


  public targetcall = {
    employee: '',
    empname: '',
    duration:'',
    salestarget:'',
    callt:[]

   //  firm: sessionStorage.getItem('firm')
  };

public callt =
{
  clienttype : '',
  calltarget: ''
}

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
    if (this.route.url === '/updatetargetcall/' + encodeURIComponent(this.id)) {
      this.title = 'Update Targeted Calls';
      this.subtitle = 'Edit Targeted Calls details';
      this.flag = true;
      this.isUpdate = true;
      this.gettargetcallById();
    } else if (this.route.url === '/addtargetcall') {
      this.title = 'Add Targeted Calls';
      this.subtitle = 'Fill new Targeted Calls information and submit.';
      this.flag = true;
      this.getempbymarketing();
    }  else {
      this.title = 'Manage Targeted Calls';
      this.subtitle = 'Manage Targeted Calls information including view, add, update and delete';
      this.flag = false;
      this.getalltargetcall();
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

    console.log('submitData function');
    console.log(this.targetcall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('addtargetcall', '');
    this.restService.postFormData(url, this.targetcall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
          Swal.fire('Added', '', 'success');
          this.route.navigate(['/managetargetcall']);
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
    console.log(this.targetcall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('edit', '');
    this.restService.postFormData(url, this.targetcall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
          this.route.navigate(['/managetargetcall']);
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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.crmRestURL('deletetargetcall', id);
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
            this.getalltargetcall();
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
  public getalltargetcall() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('targetcallall', '');
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
  public gettargetcallById() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('targetcallbyid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.getempbymarketing()
        this.targetcall = response;

       // this.targetcall=
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  /******************************End Get Data*************************************** */

  public onChangeRM(obj) {
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.targetcall.empname = obj.target.options[obj.target.selectedIndex].text;
  //  this.getallcustomerbyrm();
  };

  
  public getempbymarketing() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('empbyrole', 'MARKETING');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.rmList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  push()
  {

    let flagger = true;

    for (const entry of this.targetcall.callt) {

      if (this.callt.clienttype == entry.clienttype) {

        Swal.fire('Cannot Add Duplicate Entry', '', 'error');
        flagger = false;
       

      }
    }

    if (flagger) {

    const cloneProduct = JSON.parse(JSON.stringify(this.callt));

    this.targetcall.callt.push(cloneProduct);
    console.log('After pushing product');
    console.log(this.targetcall.callt);
    this.callt.calltarget='';
    this.callt.clienttype='';
    }

  }



  onDeleteproduct(i) {
    this.targetcall.callt.splice(i, 1);
    // this.recal();
    Swal.fire('Deleted!', '', 'success');
 //   this.calculatetotalcharges();
  }

  
  public onDeletefromdb(id: number) {


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
        const url = this.restService.crmRestURL('calltdelete', id);
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
            this.gettargetcallById();

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
    });

  }

}
