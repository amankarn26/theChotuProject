import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { RestService } from './../../services/rest.service';
declare var Swal: any;


@Component({
  selector: 'app-salelead',
  templateUrl: './salelead.component.html',
  styleUrls: ['./salelead.component.css']
})
export class SaleleadComponent implements OnInit {
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private statelist;
  private citylist;
  public id;
  public data;
  public tp;
  public prodlist;
  public isUpdate = false;
  private fileArray = [];
  public tab1 = false;
  public tab2 = false;
  public userType;
  public detailFlag = false;
  public salelead = {
  sale_lead: this.routprms.snapshot.params['id'],
  firm: sessionStorage.getItem('firm'),
  prodname:'',
  numofprods:'',
  companyname:'',
  contactperson:'',
  designation:'',
  email:'',
  mobile: '',
  remark:'',
  status:'',  // enum
  address: {
    line1: '',
    line2: '',
    city: '',
    pincode: '',
    states: '',
    country: 'India'
  },
};

// for datatable
public filterQuery = '';
public rowsOnPage = 10;
public sortBy = 'id';
public sortOrder = 'asc';

  constructor(
    private route: Router,
 //   private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
    }
    if (this.route.url === '/addsalelead') {
      this.title = 'Add Inquiry';
      this.subtitle = 'Fill new sale lead information and submit.';
      this.isManageState = false;
      this.tab1 = true;
      this.getallproduct();

    }else if (this.route.url == '/addfollowup/' + this.id + '/' + encodeURIComponent(this.routprms.snapshot.params['id'])){
        this.title = 'Add Follow Up';
        // this.subtitle = 'Update firm information and submit.';
        this.isManageState = false;
        // this.getCatList();
        this.getByid();
        this.tab1 = true;
        this.tab2 = true;
        this.isUpdate = true;
      }
     else if (this.route.url === '/editsalelead/' + this.id) {
      this.title = 'Update Inquiry';
      this.subtitle = 'Update Inquiry information and submit.';
      this.isManageState = false;
      // this.getCatList();
      this.getByid();
      this.tab1 = true;
      this.tab2 = true;
      this.isUpdate = true;
    }
    else if (this.route.url === '/detailsalelead/' + encodeURIComponent(this.id)) {
      this.title = 'Inquiry Details';
      // this.flag = true;
      // this.isUpdate = true;
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid();
      
    }else {
      this.title = 'Manage Inquiry';
      this.subtitle = 'Manage Inquiry information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }

    

  }
  private getByid() {
        // // Get Information from JSON REST api
        // let url = this.restService.saleleadRestURL('details', this.id);
        // this.restService.getJSONFromURL(url).subscribe(
        //   (response:any) => {
        //     console.log('Done fatching data!');
        //     console.log(response);
          
        //     this.salelead = response;
          
        //     this.salelead.prodname = response.prodname;
        //     this.salelead.companyname = response.companyname;
        //     this.salelead.designation = response.designation;
        //     this.salelead.contactperson = response.contactperson;
        //     this.salelead.address.line1 = response.address.line1;
        //     this.salelead.address.line2 = response.address.line2;
        //     this.salelead.address.pincode = response.address.pincode;
        //     this.salelead.address.states = response.address.states;
        //     this.salelead.address.city = response.address.city;
        //     this.salelead.mobile = response.mobile;
        //     this.salelead.remark = response.remark;
            
        //     this.salelead.status = response.status;
        //     console.log(response);

        //   },
        //   error => {
        //     console.log('Error in data load.');
        //   }
        // );
  }

  private getsale() {
    // // Get Information from JSON REST api
    // let url = this.restService.saleleadRestURL('convert', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');
    //     console.log(response);
       
    //     this.salelead.sale_lead = response;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getData() {
    // // Get Information from JSON REST api
    // var url = this.restService.saleleadRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.data = response;

    //     this.tp = this.data.length;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  submitData() {
    console.log('submiti function');

    if(this.salelead.numofprods ===''){
      delete  this.salelead.numofprods;
    }
    if(this.salelead.contactperson ===''){
      delete  this.salelead.contactperson;
    }
    if(this.salelead.designation ===''){
      delete  this.salelead.designation;
    }
    if(this.salelead.email ===''){
      delete  this.salelead.email;
    }
    if(this.salelead.mobile ===''){
      delete  this.salelead.mobile;
     }
    if(this.salelead.address.line2 ===''){
      delete  this.salelead.address.line2;
    }
    if(this.salelead.status ===''){
      delete  this.salelead.status;
    }
    if(this.salelead.remark ===''){
      delete  this.salelead.remark;
     }
    // var url = this.restService.saleleadRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.salelead).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     this.salelead = response;
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
     
    //     window.scrollTo(0, 0);
    //     this.tab1 = false;
    //     this.tab2 = true;
    //     this.id = response.id;
       
    //     Swal.fire('Submited', '', 'success');
    //     this.route.navigate(['/managesalelead']);
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
    return 0;
  }

  updateData() {

    this.salelead['id'] = this.id;

    // if (this.fileArray)
    //   console.log('submiti function');
    // var url = this.restService.saleleadRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.salelead).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('', '', 'success');
    //     // if (this.fileArray.length > 0) {
    //     //   this.uploadfile();
    //     // }

    //     window.scrollTo(0, 0);
    //     this.tab1 = false;
    //     this.tab2 = true;
    //     this.route.navigate(['/managesalelead']);
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
    return 0;
  }

  deleteslead(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      //   // delete code
      //   const url = this.restService.saleleadRestURL('delete', '');
      //   console.log('Delete using this id:' + id);
      //   const json = '{\"id\":\"' + id + '\"}';
      //   this.restService.postFormData(url, json).subscribe(
      //     (response:any) => {
      //       // Responce data.
      //       console.log('Status on Post API');
      //       console.log(response);
      //       Swal.fire(
      //         'Deleted!',
      //         'Your data has been deleted.',
      //         'success'
      //       );
      //       this.getData();
      //       // Now do your stuff here
      //     },
      //     error => {
      //       // Error Message
      //       Swal.fire(
      //         error.statusText,
      //         error._body,
      //         'error'
      //       );
      //       console.log('Error in data load.');
      //       // Doyour stuff here
      //     }
      //   );

      //   // delete code end
      //   // For more information about handling dismissals please visit
      //   // https://sweetalert2.github.io/#handling-dismissals
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Your data is safe :)',
      //     'error'
      //   );
      }
    });
  }

  private getCityList(stateId) {
    this.citylist = [];
    // // Get Information from JSON REST api
    // const url = this.restService.cityRestURL('', stateId);
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

  private getStateList() {
    // // Get Information from JSON REST api
    // const url = this.restService.stateRestURL('', 'India');
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

  private getallproduct() {
    // // Get Information from JSON REST api
    // const url = this.restService.productRestURL('product', sessionStorage.getItem('firm'));
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     console.log(response);
    //     this.prodlist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  
  pasprodname(obj)
  {
    this.salelead.prodname=obj.target.options[obj.target.selectedIndex].text;
  }

}
