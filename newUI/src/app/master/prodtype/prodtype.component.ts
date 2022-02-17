import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-prodtype',
  templateUrl: './prodtype.component.html',
  styleUrls: ['./prodtype.component.css']
})
export class ProdtypeComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  //  public userType;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate = false;
  public docServer = this.restService.docServer;
  public categorydata=[];

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public branchcatgeory = sessionStorage.getItem('category');

  public docurll;
  public document;

  public categoryselect;

  public id;
  private member = {
    role: '',
    description: ''
  };

  public branch = {
    name: '',
    regno: '',
    phone: '',
    email: '',
    empcount: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };

  private category = {
    // deployacct:'',
    //  firm: sessionStorage.getItem('firm'),
    name: '',
    category:'',
    // prodtype: '',
    priority: '',
    description: '',
    // forsale: 'YES',
  };

  public file;
  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary:'NO' },
  };

  public prodtypeid;

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
        function onOk() {alert("Ok");},
        function onCancel() { alert("Cancel");}
    );*/
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
    }

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addprodtype') {
      this.title = 'Add Menu';
      this.subtitle = 'Fill new branch information and submit.';
      this.isManageState = false;
      this.getdeploymentacct();
      this.getallcategory();

    } else if (this.route.url === '/editprodtype/' + this.id) {
      this.title = 'Update Menu';
      this.subtitle = 'Update Ca information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid();
      this.getdeploymentacct();
    } else {
      this.title = 'Manage Menu';
      this.subtitle = 'Manage Category information including view, add, update and delete';
      // this.userType = sessionStorage.getItem('role');
      this.getprodtype();
      this.getallcategory();
    }

  }

  public getprodtype()
  {
    if(this.userRole==='BRANCH')
    {
      this.getProdlist();
    }

    if(this.userRole==='SUPERADMIN')
    {
      this.getProdlist();
    }

    if(this.userRole==='FIRM')
    {
      this.getprodlistbybranch();
    }
  }

  private getProdlist() {
    // Get Information from JSON REST api
    this.restService.enableloading();
    const url = this.restService.menutypeRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);

        response.sort((a,b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        })

        this.data = response;
        console.log(response);
        this.restService.disableloading();
      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();
      }
    );
  }

  private getprodlistbybranch() {
    // Get Information from JSON REST api
    this.restService.enableloading();

    const url = this.restService.menutypeRestURL('bycategory', sessionStorage.getItem('category'));
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);
        this.restService.disableloading();
      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();
      }
    );
  }

  private getData() {
    // Get Information from JSON REST api
    const url = this.restService.menutypeRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  updateData() {
    this.prodtypeid=this.id;

    if (this.file) {

      this.uploadfile();
      this.photo.id = this.id;
      // delete this.category['id'];
      this.category['photo'] = this.photo.photo;
    } else {
      delete this.category['photo'];
    }

    console.log('submiti function');
    var url = this.restService.menutypeRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.category).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageprodtype']);
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

  private getdeploymentacct() {
    // this.depList = [];
    // // Get Information from JSON REST api
    // var url = this.restService.deploymentRestURL('', '');

    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.depList = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.menutypeRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        console.log('Done fatching data!');
       // this.datalist = response;
       // this.getCityList(this.datalist.address.states);
        this.category = response;
        if(response.photo)
        {
          this.docurll=this.docServer + '/' + response.photo.docpath;
        }
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getStateList() {
    // // Get Information from JSON REST api
    // var url = this.restService.stateRestURL('', 'India');
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

  private onChangeState(obj) {
    // let stateId = obj.srcElement.value;
    // // Call city data method
    // this.getCityList(stateId);
  }

  private getCityList(stateId) {
    // this.citylist = [];
    // // Get Information from JSON REST api
    // var url = this.restService.cityRestURL('', stateId);
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

  /*
  multiJson(data){


      let objMember = new Object();
      let objAddress =new Object();
      objCourt["name"]=this.court.name;

      objCourt["judge"]=this.court.judge;
      objCourt["contact"]=this.court.contact;
      objCourt["location"]=this.court.city;
      objCourt["url"]=this.court.url;

      objAddress["line1"]=this.court.line1;
      objAddress["line2"]=this.court.line2;
      objAddress["pincode"]=this.court.pincode;
      objAddress["states"]=this.court.states;
      objAddress["city"]=this.court.city;
      objAddress["country"]=this.court.country;

      objCourt["address"]=objAddress;

      console.log("Builded Object");
      console.log(objCourt);
      return objCourt;
    }*/

  submitData() {

    console.log('submiti function');
    const url = this.restService.menutypeRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.category).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.prodtypeid = response.id;

        if (this.file) {
          this.photo.id = response.id;
          this.photoAdd();
        }  else {
          Swal.fire('Submited', '', 'success');
          window.scrollTo(0, 0);
          console.log(response);
          this.route.navigate(['/manageprodtype']);
        }

      },
      error => {
        // Error Message
        if (error.error==="DUPLICATE_MENUTYPE") {
          Swal.fire(
            "Duplicate Entry Found",
            error._body,
            'error'
          );
        } else {
          Swal.fire(
            error.error,
            error._body,
            'error'
          );
        }
        
        console.log('Error in data load::',error);
        // Doyour stuff here
      }
    );
    return 0;
  }

  deleteRole(id: any) {

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
        const url = this.restService.menutypeRestURL('delete', id);
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
            this.getData();
            // Now do your stuff here
          },
          error => {
            // Error Message
            Swal.fire(
              error.statusText,
              // error._body,
              'MENUTYPE IN USE',
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
    })
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  uploadfile() {
    if (this.file) {

      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.photo.docname = this.file.name;
      this.photo.photo.doctype = 'IMAGE';
      this.photo.photo.docpath =  'ProductType/'+this.prodtypeid+ '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      docFormData.append('name', 'ProductType'+'/'+this.prodtypeid);


      docFormData.append('width', '400');
      docFormData.append('height', '400');


      var docurl = this.restService.customUpload('upload', '');
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
       ( response:any) => {
          // Responce data.
          console.log('Status on Upload API');
          console.log(response);
          // Now do your stuff here

          return 1;
        },
        error => {
          // Error Message
          console.log('Error in doc upload .');
          return 0;
          // Do your stuff here
        }
      );


    } else {

      return 0;
    }

  }

  private photoAdd() {

    this.uploadfile();
    // if (this.uploadfile()){
    console.log('submitData function');
    console.log(this.photo);
    const url = this.restService.menutypeRestURL('photoadd', '');
    this.restService.postFormData(url, this.photo).subscribe(
     ( response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/manageprodtype']);
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
 // }
  }

  fileEvent(fileInput: any) {
  if (fileInput.target.files[0] != '') {
    this.file = fileInput.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.docurll = event.target.result;
    }
    reader.readAsDataURL(fileInput.target.files[0]);
    console.log('Inside multiple file select');
  }
  }

  private getallcategory() {
  // Get Information from JSON REST api
  var url = this.restService.catRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      this.categorydata = response;
      console.log(response);

    },
    error => {
      console.log('Error in data load.');
    }
  );
  }

  public getprodtypebycat() {
  // // Get Information from JSON REST api
  // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
  //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
  let url = this.restService.menutypeRestURL('bycategory', this.category.category);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      console.log('Done fatching data from prod property!');
      const res: any = response;
      this.data = res;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
  }

  refreshincall()
  {
    this.category.category = undefined;
    this.getData();
  }

}
