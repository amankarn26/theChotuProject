// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-variant',
//   templateUrl: './variant.component.html',
//   styleUrls: ['./variant.component.css']
// })
// export class VariantComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../services/rest.service";

declare var Swal: any;

@Component({
  selector: "app-variant",
  templateUrl: "./variant.component.html",
  styleUrls: ["./variant.component.css"],
})
export class VariantComponent implements OnInit {
  // private alertify = require('alertify.js');
  private title = "";
  private subtitle = "";
  private isManageState = true;
  private datalist;
  //  public userType;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate = false;

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem("role");
  public userType = sessionStorage.getItem("type");
  // public prod_stock = sessionStorage.getItem('prod_stock');
  public firmcatgeory = sessionStorage.getItem("category");

  p;

  public id;
  private member = {
    role: "",
    description: "",
  };

  public docurll;

  public file;
  private photo = {
    id: "",
    photo: {
      docname: "",
      docpath: "",
      docdesc: "",
      doctype: "",
      isprimary: "YES",
      updatedon: "",
    },
  };

  // public variant_multiple=[];
  public variant_multiple = [];

  private variant = {
    // dish: sessionStorage.getItem('dish'),
    dish: "",
    variant: "",
    rateperunit: " ",
    priority: "1",
    serves: "1",
  };

  public prodtypeid;

  // for datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  public data;
  public url;
  pname: any;
  public animal;
  rateunit: any;
  // prod_stock: any;
  pstock: any;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.routprms.snapshot.params["id"]) {
      this.id = this.routprms.snapshot.params["id"];
    }

    // verry verry important
    this.variant.dish = this.id;
    // this.variant.addedby = this.id;

    console.log("adadad");
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === "/addvariant/" + this.id) {
      this.title = "Add Dish/Drink Variant ";
      this.subtitle = "Fill new Dish Variant information and submit.";
      this.isManageState = false;
      this.getDishDetails("add")
      //  this.getdeploymentacct();
    } else if (this.route.url === "/editvariant/" + this.id) {
      console.log("this.id", this.id);
      this.title = "Update Dish/Drink Variant";
      this.subtitle = "Update variant information and submit.";
      this.isManageState = false;
      this.isUpdate = true;
      this.getDishDetails("edit")
      this.variant;
      this.getByid();
    } else if (this.route.url === "/managevariant/" + this.id) {
      this.title = "Manage Dish/Drink Variant";
      this.subtitle =
        "Manage variant information including view, add, update and delete";
      this.getDishDetails("manage")
      this.getData();
    } else {
      this.title = "Manage Dish/Drink Variant";
      this.subtitle =
        "Manage variant information including view, add, update and delete";
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
            this.title = "Add Dish/Drink Variant for " + response.name;
            break;
          case 'edit':
            this.title = "Update Dish/Drink Variant for " + response.name;
            break;
          case 'manage':
            this.title = "Manage Dish/Drink Variant for " + response.name;
            break;
        
          default:
            this.title = "Manage Dish/Drink Variant for " + response.name;
            break;
        }
        // this.title = "Update Dish/Drink Variant for " + response.name;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getData() {
  //   // Get Information from JSON REST api
  //   // this.hotdeals.prod_stock = this.id;
  //       // this.prod_stock = sessionStorage.getItem('prod_stock');
  //       // this.prod_stock= Response;
  //   // this.hotdeals.prod_stock = this.id;
  //   alert('123456');
  //       // this.hotdeals.prod_stock = sessionStorage.getItem('hotdeals.prod_stock');

  //   var url = this.restService.hotdealsRestURL('dealbystockid', this.id);
  //   // var url = this.restService.hotdealsRestURL('dealbystockid', 'this.id');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       // this.restService.getJSONFromURL(response);
  //       // this.restService.getJSONFromURL(response);
  //       this.restService.hotdealsRestURL('dealbystockid', this.id);
  //       this.photo=response.id;
  //       // this.pname=response.pname;
  //       // this.rateunit=response.rateunit;
  //       // this.pstock = response;

  //       var url = this.restService.catRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.data = response;
  //       console.log(response);

  //     },
  //       // this.pstock.pname = response.pname;

  //       // this.pstock.rateunit = response.rateunit;

  //       this.data = response;
  //       console.log(response);

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private getData() {
    // Get Information from JSON REST api
    // var url = this.restService.hotdealsRestURL('dealbystockid', sessionStorage.getItem(this.hotdeals.prod_stock));
    // this.hotdeals.prod_stock = sessionStorage.getItem(this.hotdeals.prod_stock);

    // alert('hello123456');
    // this.id = sessionStorage.getItem("StockID");
    // var url = this.restService.dishreviewsRestURL('dealbystockid', this.id);

    if (this.id) {
      var url = this.restService.variantRestURL("", this.id);
    } else {
      var url = this.restService.variantRestURL("", "");
    }
    console.log("Manoj Sir");

    console.log(url);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.photo=response.id;
        // this.hotdeals.pname = response.pname;
        // this.pstock.rateunit = response.rateunit;
        this.data = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  //  book(data: any) {

  //   // alert(this.variantname);

  //   // blank json called
  //   let productdata = {};
  //   // Swal.fire({ title: "Added to cart!", icon:"success", timer: 800});
  //   Swal.fire({ title: "Added to cart!", icon: "success" });

  //   console.log(data)
  //   // alert(this.variantname);

  //   let items = [];

  //   if (sessionStorage.getItem('items')) {
  //     console.log('in IF condition');

  //     items = JSON.parse(sessionStorage.getItem('items'));
  //     // productdata['variant']=this.variantname;
  //     // productdata['variant']=data.pstock[0].variant;
  //     productdata['variant'] = data.pstock[0].variant;
  //     productdata['qty'] = this.prodquantity;
  //     productdata['stockStatus'] = 'YES';
  //     productdata['rateperunit'] = data.pstock[0].rateperunit;
  //     productdata['looserateperunit'] = data.pstock[0].looserateperunit;
  //     productdata['name'] = data.name;
  //     productdata['soldas'] = this.soldas;
  //     productdata['ratewithgst'] = data.pstock[0].ratewithgst;
  //     // productdata['gstamt']=data.pstock[0].gstamt;
  //     productdata['gst'] = data.pstock[0].gst;
  //     productdata['gstamt'] = (data.pstock[0].gst / 100) * data.pstock[0].gst;
  //     productdata['image'] = data.image;

  //     productdata['brand'] = data.brand;
  //     productdata['rateunit'] = data.rateunit;
  //     productdata['amount'] = data.pstock[0].ratewithgst;
  //     // productdata['entrytotal']=data.pstock[0].entrytotal;

  //     // productdata['image']= sessionStorage.getItem('image');
  //     // product: sessionStorage.getItem('product');
  //     // image: sessionStorage.getItem('image');

  //     // productdata['ptotal']=data.ptotal;
  //     // productdata['productdata']=data.productdata;
  //     // productdata['gsttotal']=data.gsttotal;
  //     // productdata['grandtotal']=data.grandtotal;

  //     productdata['branch'] = Number(this.branchname);
  //     items.push(productdata);
  //     this.prodquantity = 1;
  //   }
  //   else {
  //     console.log('in else condition');
  //     // productdata['firm']=this.routeid;
  //     productdata['variant'] = data.pstock[0].variant;
  //     productdata['qty'] = this.prodquantity;
  //     productdata['stockStatus'] = 'YES';
  //     productdata['rateperunit'] = data.pstock[0].rateperunit;
  //     productdata['looserateperunit'] = data.pstock[0].looserateperunit;
  //     productdata['name'] = data.name;
  //     productdata['soldas'] = this.soldas;
  //     productdata['ratewithgst'] = data.pstock[0].ratewithgst;
  //     productdata['gst'] = data.pstock[0].gst;
  //     productdata['gstamt'] = (data.pstock[0].gst / 100) * data.pstock[0].gst;
  //     productdata['image'] = data.image;

  //     productdata['brand'] = data.brand;
  //     productdata['rateunit'] = data.rateunit;
  //     productdata['amount'] = data.pstock[0].ratewithgst;
  //     //  image: sessionStorage.getItem('image');

  //     // product: sessionStorage.getItem('product');
  //     // product: sessionStorage.getItem('image');

  //     //  productdata['ptotal']=data.ptotal;
  //     //  productdata['productdata']=data.productdata;
  //     //  productdata['gsttotal']=data.gsttotal;
  //     //  productdata['grandtotal']=data.grandtotal;

  //     //  productdata.branch=Number(this.branchname);
  //     items.push(productdata);
  //     this.prodquantity = 1;

  //   }

  //   console.log(items);
  //   sessionStorage.setItem('items', JSON.stringify(items));
  //   this.countcart();
  //   this.prodouctid = '';
  //   this.varientname = null;
  //   this.varientnamefromresponse = null;
  //   this.soldas = '';
  //   //  this.isduplicatefirm=undefined;

  // }

  // edit rest service... /offer/update api called

  updateData() {
    this.prodtypeid = this.id;
    if (this.file) {
      this.uploadfile();
      this.photo.id = this.id;
      // delete this.category['id'];
      this.variant["photo"] = this.photo.photo;
    } else {
      delete this.variant["photo"];
    }

    console.log("submiti function");
    var url = this.restService.variantRestURL("edit", "");
    console.log(url);
    this.restService.postFormData(url, this.variant).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire("Updated", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/managevariant"]);
      },
      (error) => {
        // Error Message
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  private getByid() {
    // Get Information from JSON REST api
    // alert('55555');

    let url = this.restService.variantRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data!");
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        this.variant = response;
        console.log(response);
        if (response.photo) {
          this.docurll = this.docServer + "/" + response.photo.docpath;
        }
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
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
    // if(this.data.dishtype==)

    console.log("submiti function");

    // const url = this.restService.delivertypoolRestURL('delivery_chargesM', '');
    // console.log(url);
    // this.restService.postFormData(url, this.variant_multiple).subscribe(

    var url = this.restService.variantRestURL("add", "");
    // console.log(url);
    // Insert Data in sessionStorage
    sessionStorage.setItem("StockID", this.variant.dish);
    this.restService.postFormData(url, this.variant_multiple).subscribe(
      (response: any) => {
        // Responce data.
        // prod_stock:sessionStorage.getItem('id'),

        console.log("Status on Post API");
        console.log(response);
        this.prodtypeid = response.id;

        if (this.file) {
          this.photo.id = response.id;
          this.photoAdd();
        } else {
          Swal.fire("Submited", "", "success");
          window.scrollTo(0, 0);
          console.log(response);
          this.route.navigate(["/managevariant/" + this.id]);
          // this.route.navigate(['/managehotdeals/',this.data.id]);
        }
      },
      (error) => {
        // Error Message
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  deleteRole(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      type: "Warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.variantRestURL("delete", id);
        console.log("Delete using this id:" + id);
        // const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            this.getData();
            // Now do your stuff here
          },
          (error) => {
            // Error Message
            Swal.fire(error.statusText, error._body, "error");
            console.log("Error in data load.");
            // Doyour stuff here
          }
        );

        // delete code end
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  uploadfile() {
    if (this.file) {
      const fileExtension = "." + this.file.name.split(".").pop();
      const rname =
        Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.photo.docname = this.file.name;
      this.photo.photo.doctype = "IMAGE";
      this.photo.photo.docpath =
        "Offer/" + this.prodtypeid + "/" + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append("doc", this.file, rname + this.file.name);
      // docFormData.append('name', 'Category');
      docFormData.append("width", "400");
      docFormData.append("height", "400");
      docFormData.append("name", "Offer" + "/" + this.prodtypeid);
      var docurl = this.restService.customUpload("upload", "");
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Upload API");
          console.log(response);
          // Now do your stuff here

          return 1;
        },
        (error) => {
          // Error Message
          console.log("Error in doc upload .");
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
    console.log("submitData function");
    console.log(this.photo);
    const url = this.restService.variantRestURL("edit", "");
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        Swal.fire("Added", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/managedishreviews"]);
      },
      (error) => {
        // Error Message
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
    // }
  }

  fileEvent(fileInput: any) {
    if (fileInput.target.files[0] != "") {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.docurll = event.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log("Inside multiple file select");
    }
  }

  pushstockvalue() {
    this.variant_multiple.push(JSON.parse(JSON.stringify(this.variant)));

    console.log(this.variant_multiple);
    this.clearvalues();
  }

  clearvalues() {
    this.variant.variant = "";
    this.variant.rateperunit = "";
    this.variant.priority = "";
    this.variant.serves = "";
  }
}
