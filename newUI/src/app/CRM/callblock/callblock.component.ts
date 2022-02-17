import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

declare var Swal: any;


@Component({
  selector: 'app-callblock',
  templateUrl: './callblock.component.html',
  styleUrls: ['./callblock.component.css']
})

export class CallblockComponent implements OnInit {

  public title = '';
  public subtitle = '';
  // public alertify = require('alertify.js');
  public flag = false;


  public rmList;
  public custListbyrm;
  public reasonid;

  public blockcall = {

    customer: '',
    custname: '',
    requestedby: '',              
    reqbyname:'', 			
    head:  '',
    rejectreason:'' ,
    state: '',
    blockreason:   ''
  }

 public rejectreason;

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
    if (this.route.url === '/updatecallblock/' + encodeURIComponent(this.id)) {
      this.title = 'Update  Customer Call Blocking';
      this.subtitle = 'Edit  Customer Call Blocking details';
      this.flag = true;
      this.isUpdate = true;
      this.blockcall['id']=this.routprms.snapshot.params['id'];
      this.getcallblockById();
    } else if (this.route.url === '/addcallblock') {
      this.title = 'Add  Customer Call Blocking';
      this.subtitle = 'Fill new  Customer Call Blocking information and submit.';
      this.flag = true;
      this.getempbymarketing();
    }  else {
      this.title = 'Manage Customer Call Blocking';
      this.subtitle = 'Manage Customer Call Blocking information including view, add, update and delete';
      this.flag = false;
      this.getallcallblock();
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
    console.log(this.blockcall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('addblockcall', '');
    this.restService.postFormData(url, this.blockcall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
          Swal.fire('Added', '', 'success');
          this.route.navigate(['/managecallblock']);
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
    console.log(this.blockcall);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('updateblockcall', '');
    this.restService.postFormData(url, this.blockcall).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
          this.route.navigate(['/managecallblock']);
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

  public delete(id:any) {

    console.log('Updatedata function');
    console.log(id);
    // let finalData = this.multiJson(this.appointment);
    const json = '{\"id\":\"' + id + '\"}';
    const url = this.restService.crmRestURL('deleteblockreqbyid', id);
    this.restService.deleteFormData(url).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        // Swal.fire('Updated', '', 'success');
          // this.route.navigate(['/managecallblock']);
          // window.scrollTo(0, 0);
          this.getallcallblock();
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
  deletecustomer(id: any) {
 
    console.log(id.customer);
    Swal.fire({
      title: 'Are you sure?, Accepting Request Will Delete Customer Data',
    // text: 'You will not be able to recover this data!',
      text: ' It will delete from all places wherever it is in used!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.customerRestURL('delete', id);
        console.log('Delete using this customer id:' + id.customer);
        const json = '{\"id\":\"' + id.customer + '\"}';
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
            this.delete(id.id);
           // this.getallcallblock();
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
  public getallcallblock() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('allblockreq', '');
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
  public getcallblockById() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('callblockbyid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.blockcall = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
 

  public onChangeRM(obj) {
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.blockcall.reqbyname = obj.target.options[obj.target.selectedIndex].text;
    this.getallcustomerbyrm();
  };

  public onChangecustomer(obj) {
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.blockcall.custname = obj.target.options[obj.target.selectedIndex].text;
  };

  public getallcustomerbyrm() {
    // Get Information from JSON REST api
 
      const url = this.restService.customerRestURL('cbyrm', this.blockcall.requestedby );
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
       
            this.custListbyrm = response;
      
        
        },
        error => {
          console.log('Error in data load.');
        }
      );

    }
  
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


    setreason(data: any) {
      // alert('reject reason');
      this.reasonid = data.id;
      console.log('set reason id');
      console.log(data);
      Swal.fire({
        title: "Please Give Reason For Rejection",
        text: "Reason is Mandatory",
        input: 'textarea',
        showCancelButton: true        
    }).then((result) => {
        if (result.value) {
          this.rejectreason=result.value
          console.log(this.rejectreason)
  this.approveReimburse1();
         // Swal.fire('Requested','','success');
        }
    });
  
    //  this.reasonid = data.id;
      // document.getElementById('openModalButton1').click();
  
  
  
    }


    // setreason(data:any){
    //     console.log('set reason id');
    //     console.log(data);
    //     this.reasonid=data.id;
    //      document.getElementById('openModalButton1').click();
       
        
        
    //   }

    approveReimburse(data: any) {
      // this.getemployee(data.empid);
      const rateappro = {
       
        id : data.id,
        state: 'APPROVED',
        
      };
  
      // this.reimburse.state = 'APPROVED';
      console.log(rateappro);
      const url = this.restService.crmRestURL('updateblockcall', '');
      console.log(url);
      console.log(rateappro);
      this.restService.postFormData(url, rateappro).subscribe(
        (response:any) => {
          
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          Swal.fire('', '', 'success');
          window.scrollTo(0, 0);
          this.getallcallblock();
        },
        error => {
          // Error Message
          Swal.fire(error.statusText, error._body, 'error');
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      //      return 0;
    }
  
    approveReimburse1() {
      // this.getemployee(data.empid);
  
      const rateappro = {
        id: this.reasonid,
        state: 'REJECTED',
        rejectreason:this.rejectreason,
        // leavetype: data.leavetype
      };
  
  
      // this.reimburse.state = 'APPROVED';
      console.log(rateappro);
      const url = this.restService.crmRestURL('updateblockcall', '');
      console.log(url);
      console.log(rateappro);
      this.restService.postFormData(url, rateappro).subscribe(
        (response:any) => {
          // Responce data.
          // this.getDaterange();
          // this.getLeaveList();
          // this.mailtoemployee();
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          Swal.fire('Rejected', '', 'success');
          window.scrollTo(0, 0);
          this.getallcallblock();
          this.rejectreason='';
        },
        error => {
          // Error Message
          Swal.fire(error.statusText, error._body, 'error');
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      //      return 0;
    }
  
  }

