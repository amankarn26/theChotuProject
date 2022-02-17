import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var Swal: any;

@Component({
  selector: 'app-systemconfig',
  templateUrl: './systemconfig.component.html',
  styleUrls: ['./systemconfig.component.css']
})
export class SystemconfigComponent implements OnInit {


  constructor(
    private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  public sameadd = false;
  public title;
  public subtitle;
  public flag = false;
  public updatetab = false;

  public tempvalue;
  public detailFlag = false;
  public userType=sessionStorage.getItem('type');
  public userRole=sessionStorage.getItem('role');
  public docServer = this.restService.docServer;


  private config = {
    branch: sessionStorage.getItem('branch'),
    name: '',
    value: ''
  };

  private configlist = [];
  private configlist1 = [];

  private branchId;

  ngOnInit() {
    this.config.branch = this.routprms.snapshot.params['id'];
    this.getsysconfig(this.config.branch);
  }


  push() {
    let flagger = true;

    for(let data of this.configlist)
    {
      if (this.config.name == data.name && this.config.value == data.value) {
        Swal.fire('Cannot Add Duplicate Entry','','error');

        flagger = false;
      }
    }
    if(flagger)
    {
      this.configlist.push(JSON.parse(JSON.stringify(this.config)));
      this.configlist1.push(JSON.parse(JSON.stringify(this.config)));

    }
  
    this.config.name=null;
    this.config.value=null;
  }
  
  delproperty(i,dbid) {

console.log(i);
console.log(dbid);

if(dbid === undefined)
{
  this.configlist.splice(i, 1);
  this.configlist1.splice(i, 1);

  
  Swal.fire('Deleted!', '', 'success');
}
else
{
  this.delproperty1(dbid);
}

    
  
  }

  private getsysconfig(fid: any) {
  const url = this.restService.branchRestURL('config', fid);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      console.log(response);
      this.configlist = response;

    },
    error => {
      console.log('Error in data load.');
    }
  );
}



delproperty1(id: any) {


  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      // delete code
      const url = this.restService.branchRestURL('configdelete', id);
      console.log('Delete using this id:' + id);
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
          this.getsysconfig(this.config.branch);
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

submitConfig(id: any) {

  // for(let data of this.configlist)
  // {
  //   delete data.id;
  //   delete data.reqstatus;
  //   delete data.errCode;
  // }
  const url = this.restService.branchRestURL('configadd', '');

  this.restService.postFormData(url, this.configlist1).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
this.route.navigate(['/managebranch'])

      Swal.fire(
        'Data Submited!',
        '',
        'success'
      );
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
}


}
