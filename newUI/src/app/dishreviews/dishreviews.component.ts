import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';

declare var Swal: any;


@Component({
  selector: 'app-dishreviews',
  templateUrl: './dishreviews.component.html',
  styleUrls: ['./dishreviews.component.css']
})
export class DishreviewsComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate = false;

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public firmcatgeory = sessionStorage.getItem('category');

  public id;
  private member = {
    role: '',
    description: ''
  };

  public docurll;

  public file;
  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES', updatedon: '' },
  };

  private dishreviews = {

    dish: '',
    addedby: '',
    addedbyname: " ",
    review: " ",
    addedon: "",
    status: "APPROVED",
    rating: '0.0'
  };

  public prodtypeid;

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  pname: any;
  public animal
  rateunit: any;
  // prod_stock: any;
  pstock: any;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  ngOnInit() {


    if (this.routprms.snapshot.params['id']) {
      // this.hotdeals.prod_stock=this.id;
      this.id = this.routprms.snapshot.params['id'];

    }

    // verry verry important
    this.dishreviews.dish = this.id;
    this.dishreviews.addedby = this.id;

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/adddishreviews/' + this.id) {
      this.title = 'Add Dish/Drink Reviews';
      this.subtitle = 'Fill new Dishreviews information and submit.';
      this.isManageState = false;

      this.getDishDetails("add")

      this.getToday();

      //  this.getdeploymentacct();

    } else if (this.route.url === '/editdishreviews/' + this.id) {
      console.log("this.id",this.id);
      this.title = 'Update Dish/Drink Reviews';
      this.subtitle = 'Update Dishreviews information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getDishDetails("edit")
      this.getByid();
      //  this.getdeploymentacct();
    }else if (this.route.url === '/managedishreviews/' + this.id) {
      this.title = 'Manage Dish/Drink Reviews';
      this.subtitle = 'Manage Dishreviews information including view, add, update and delete';
      this.getDishDetails("manage")
      this.getData();
    } else {
      this.title = 'Manage Dish/Drink Reviews';
      this.subtitle = 'Manage Dishreviews information including view, add, update and delete';
      this.getDishDetails("manage")
      this.getData();
    }

  }

  private getDishDetails(module) {
    let url = this.restService.dishRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        switch (module) {
          case 'add':
            this.title = "Add Dish/Drink Reviews for " + response.name;
            break;
          case 'edit':
            this.title = "Update Dish/Drink Reviews for " + response.name;
            break;
          case 'manage':
            this.title = "Manage Dish/Drink Reviews for " + response.name;
            break;
        
          default:
            this.title = "Manage Dish/Drink Reviews for " + response.name;
            break;
        }
        
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getData() {
   

    var stockid= sessionStorage.getItem('StockID');
    // var url = this.restService.variantRestURL('', stockid);
    var url = this.restService.dishreviewsRestURL('dealbystockid', stockid);
    console.log("Manoj Sir");

    console.log(url);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {

        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // edit rest service... /offer/update api called

  updateData() {

    this.prodtypeid = this.id;
    if (this.file) {

      this.uploadfile();
      this.photo.id = this.id;
      // delete this.category['id'];
      this.dishreviews['photo'] = this.photo.photo;
    } else {
      delete this.dishreviews['photo'];
    }

    console.log('submiti function');
    var url = this.restService.dishreviewsRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.dishreviews).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managedishreviews']);
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

  private getByid() {
    

    let url = this.restService.dishreviewsRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
       
        this.dishreviews = response;

        this.dishreviews.addedon = this.unixTimeConverter(response.addedon);

        console.log(response);
        if (response.photo) {
          this.docurll = this.docServer + '/' + response.photo.docpath;
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
    //   (response : any) => {
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
    //   (response : any) => {
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

    let date1 = this.getToday();
    // let date2 = this.event.todate
    let date2 = this.dishreviews.addedon;

    console.log(date1);
    console.log(date2);

    let compare = date1 > date2;

    console.log(compare);
    if (compare == true) {
      Swal.fire(
        "Dates are Incorrect",
        // "Date Should Be Greater Than Today",
        "warning"
      );
    } else {

    console.log('submiti function');
    var url = this.restService.dishreviewsRestURL('add', '');
    // console.log(url);
    // Insert Data in sessionStorage 
    sessionStorage.setItem("StockID", this.dishreviews.dish);
    this.restService.postFormData(url, this.dishreviews).subscribe(
      (response: any) => {
        // Responce data.
        // prod_stock:sessionStorage.getItem('id'),

        console.log('Status on Post API');
        console.log(response);
        this.prodtypeid = response.id;

        if (this.file) {
          this.photo.id = response.id;
          this.photoAdd();
        } else {
          Swal.fire('Submited', '', 'success');
          window.scrollTo(0, 0);
          console.log(response);
          this.route.navigate(['/managedishreviews/' + this.id]);
          // this.route.navigate(['/managehotdeals/',this.data.id]);
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
    }
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
        const url = this.restService.dishreviewsRestURL('delete', id);
        console.log('Delete using this id:' + id);
        // const json = '{\"id\":\"' + id + '\"}';
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
            this.getData();
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
      this.photo.photo.docpath = 'Offer/' + this.prodtypeid + '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      // docFormData.append('name', 'Category');
      docFormData.append('width', '400');
      docFormData.append('height', '400');
      docFormData.append('name', 'Offer' + '/' + this.prodtypeid);
      var docurl = this.restService.customUpload('upload', '');
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
        (response: any) => {
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

  // edit rest service... /offer/update api called

  private photoAdd() {

    this.uploadfile();
    // if (this.uploadfile()){
    console.log('submitData function');
    console.log(this.photo);
    const url = this.restService.dishreviewsRestURL('edit', '');
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managedishreviews']);
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

  private setDateAsToday() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    this.dishreviews.addedon =
      today.getFullYear() +
      "-" +
      this.stringfyToday(month) +
      "-" +
      this.stringfyToday(date);

    console.log("Manoj Date::", this.dishreviews.addedon);
  }

  private stringfyToday(no: number) {
    if (no < 10) {
      return "0" + no;
    } else {
      return no;
    }
  }

  public updateDate(event: any) {
    let convertedDate = new Date(event.target.valueAsDate);

    let selectedDate =
      convertedDate.getFullYear() +
      "-" +
      this.stringfyToday(convertedDate.getMonth() + 1) +
      "-" +
      this.stringfyToday(convertedDate.getDate());

    this.dishreviews.addedon = selectedDate;
    console.log("manog::", convertedDate.toUTCString());
  }

  private unixTimeConverter(ts) {
    let datetime = "";
    const dattime1 = "";
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = "0";

    /******************* */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dtt = new Date(ts * 1000);
    // Hours part from the timestamp
    const hours = dtt.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + dtt.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + dtt.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ":" + minutes.substr(-2);
    // alert(formattedTime);
    /*********************************************************** */

    try {
      const dateVal = "/Date(" + ts + ")/";
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else {
        mm = (date.getMonth() + 1).toString();
      }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;

        dd = temp1;
      } else {
        dd = date.getDate().toString();
      }

      //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
      datetime = date.getFullYear() + "-" + mm + "-" + dd;
    } catch (err) {
      console.log("Unable to parse date data in unixTimeConverter");
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;
  }

  getToday() {
    var datee = new Date();
    var d = new String();

    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = "0";

    // for month only
    temp = (datee.getMonth() + 1).toString();
    if (temp.length < 2) {
      temp1 = "0";
      temp1 = temp1 + temp;
      // alert(temp);
      mm = temp1;
    } else {
      mm = (datee.getMonth() + 1).toString();
    }

    // for date only
    temp = datee.getDate().toString();
    if (temp.length < 2) {
      temp1 = "0";
      temp1 = temp1 + temp;

      dd = temp1;
    } else {
      dd = datee.getDate().toString();
    }

    d = datee.getFullYear() + "-" + mm + "-" + dd;
    
    return d.toString();
  }

}

