import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-rlabel',
  templateUrl: './rlabel.component.html',
  styleUrls: ['./rlabel.component.css']
})
export class RlabelComponent implements OnInit {


  public title = '';
  public subtitle = '';
  //public alertify = require('alertify.js');
  public flag = false;

 // for datatable
 public filterQuery = '';
 public rowsOnPage = 10;
 public sortBy = 'role';
 public sortOrder = 'asc';
 public data;

 public id;
   public isUpdate = false;

  public ratelabel={

    firm:sessionStorage.getItem('firm'),
    label:'',
    description:'',
  };

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


   

  ngOnInit() {

    this.id = this.routprms.snapshot.params['id'];
    this.flag = false;
    if (this.route.url === '/updaterlabel/' + encodeURIComponent(this.id)) {
      this.title = 'Update Rate Label';
      this.subtitle = 'Edit Rate Label';
      this.flag = true;
      this.isUpdate = true;
      this.getDataById();
  
     
    } else if (this.route.url === '/addrlabel') {
      this.title = 'Add Rate Label';
      this.subtitle = 'Fill new Rate Label information and submit.';
      this.flag = true;
  
    }  else {
      this.title = 'Manage Rate Label ';
      this.subtitle = 'Manage  Rate Label information including view, add, update and delete';
      this.flag = false;
      this.getData();
  }
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();

}


public inputValidator(event: any) {
  //console.log(event.target.value);
  const pattern = /^[a-zA-Z0-9]*$/;   
  //let inputChar = String.fromCharCode(event.charCode)
  if (!pattern.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    // invalid character, prevent input

  }
}

public submitData() {

//  if (this.ratelabel.label ===){




// }


  console.log('submitData function');
  console.log(this.ratelabel);
  // let finalData = this.multiJson(this.appointment);
  const url = this.restService. rlabelRestURL('add', '');
  this.restService.postFormData(url, this.ratelabel).subscribe(
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
        Swal.fire('Added', '', 'success');
        this.route.navigate(['/managerlabel']);
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

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'It will delete from all places wherever it is in used!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
  
  
        // delete code
    
        const url = this.restService.rlabelRestURL('delete', id);
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
            this.getData();
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
    public getData() {
      // Get Information from JSON REST api
      const url = this.restService.rlabelRestURL('', '');
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
  
      public getDataById() {
        // Get Information from JSON REST api
        const url = this.restService.rlabelRestURL('details', this.id);
        this.restService.getJSONFromURL(url).subscribe(
          (response:any) => {
            this.restService.getJSONFromURL(response);
            // this.datalist = response;
            // this.data=response;
            console.log(response);
            this.ratelabel.label = response.label;
            this.ratelabel.description = response.description;
           
            this.ratelabel['id'] = response.id;
        
          },
          error => {
            console.log('Error in data load.');
          }
        );
        }
  
        public updateData() {

          console.log('submitData function');
          console.log(this.ratelabel);
          
          // let finalData = this.multiJson(this.appointment);
          const url = this.restService.rlabelRestURL('edit', '');
          this.restService.postFormData(url, this.ratelabel).subscribe(
            (response:any) => {
              // Responce data.
              console.log('Status on Post API');
              console.log(response);
              // Now do your stuff here
              Swal.fire('Updated', '', 'success');
                this.route.navigate(['/managerlabel']);
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
          

}