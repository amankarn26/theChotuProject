import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
// import { RestService } from '../../../services/rest.service';
// import { Cookie } from 'ng2-cookies';

declare var Swal: any;

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {

  // public docServer = this.restService.docServer;


  public username = sessionStorage.getItem('name');

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');

  public datalist=[];

  public userid = sessionStorage.getItem('id');
  public flag = false;
  public islogin = sessionStorage.getItem('islogin');
  public isLoader = false;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  private cdata;
  public id;
  private data;
  private fdata;
  private followupdata;
  public isUpdate = true;
  public tp;
  public url;
  public detailFlag = false;
  private qid;
  private condata;
  private ncondata;
  private lastlogin;
  public today = new Date();
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private isnotset = true;

  private timestring = this.today.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  private index = 1;  // phase3 added on 5/14/2019
  private limit = 100;  // phase3 added on 5/14/2019
  private counter = 100;  // phase3 added on 5/14/2019


  private followup = {
    sale_lead:this.routprms.snapshot.params['id'],
    // quotation: '',
    calledby: this.userid,
    callnotes: '',
    calledbyname: this.username,
    updatedon: this.todatDate() + " " + this.timestring,
    nextcallremark: '',
    nextcalltime: '',
    qconvtype: '',

  };
  

  constructor(private route: Router,
    private router: Router,

    // private restService: RestService,
    private routprms: ActivatedRoute) {


  }

  ngOnInit() {

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
    }

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url == '/addfollowup/' + this.id ){
      //this.title = 'Add Follow Up';
      // this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
     this.getByid();
     
  }
}
  cancel() {
    // goBack code fro cancel button
    window.history.back();

  }

  private getByid() {
    // // Get Information from JSON REST api
    // let url = this.restService.saleleadRestURL('followup', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');
    //     console.log(response);
       
    //     this.followup.sale_lead = response;
    //     // this.followup.nextcalltime =   this.unixTimeConverter(response.nextcalltime);
    //     // this.followup.updatedon =   this.unixTimeConverter(response.updatedon);
    //     this.datalist =response;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getfollowuplist() {
    // // Get Information from JSON REST api
    // const url = this.restService.followupRestURL('followuplist', this.qid);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);


    //     this.followupdata = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  deletef(id: any) {

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
    //     const url = this.restService.followupRestURL('delete', '');
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
    //         this.getByid();
    //         this.route.navigate(['/addfollowup']);
    //         // this.isnotset = true;
    //         this.getfollowuplist();
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
    //         )
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
    private submitData() {
    this.followup.nextcalltime = new Date(this.followup.nextcalltime).toISOString();
    this.followup.updatedon = new Date(this.followup.updatedon).toISOString();
    this.followup.sale_lead=this.id;
      console.log('submitData function');
      console.log(this.followup);
      // let finalData = this.multiJson(this.appointment);
      // const url = this.restService.followupRestURL('add', '');
      // this.restService.postFormData(url, this.followup).subscribe(
      //   (response:any) => {
      //     // Responce data.
      //     console.log('Status on Post API');
      //     console.log(response);
      //     // Now do your stuff here
      //     Swal.fire('Added', '', 'success');
      //     window.scrollTo(0, 0);
      //     this.clearfollowup();
      //     this.getByid();
      //     this.route.navigate(['/addfollowup']);
      //    // this.getfollowuplist();
      //    },
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

  private todatDate() {
    var datee = new Date();
    var d = new String();

    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';

    // for month only
    temp = (datee.getMonth() + 1).toString();
    if (temp.length < 2) {
      temp1 = '0';
      temp1 = temp1 + temp;
      // alert(temp);
      mm = temp1;
    } else { mm = (datee.getMonth() + 1).toString(); }

    // for date only
    temp = datee.getDate().toString();
    if (temp.length < 2) {
      temp1 = '0';
      temp1 = temp1 + temp;
      dd = temp1;
    } else { dd = datee.getDate().toString(); }
    d = datee.getFullYear() + '-' + mm + '-' + dd;
    // this.news.published = d.toString();
    // Next hearing end
    return d.toString();
  }

  private clearfollowup() {
    this.followup.callnotes = '';
    this.followup.updatedon = this.todatDate() + " " + this.timestring;
    this.followup.nextcallremark = '';
    this.followup.nextcalltime = '';
    this.followup.qconvtype = '';

  }

}