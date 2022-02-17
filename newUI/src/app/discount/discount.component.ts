import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../services/rest.service";

declare var Swal: any;

@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.css"],
})
export class DiscountComponent implements OnInit {
  private title = "";
  private subtitle = "";
  private isManageState = true;
  private datalist;
  public statelist = [];
  public citylist = [];
  private depList;
  public isUpdate = false;

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem("role");
  public userType = sessionStorage.getItem("type");
  public firmcatgeory = sessionStorage.getItem("offer");

  public id;
  private member = {
    role: "",
    description: "",
  };

  public docurll;

  public firm = {
    name: "",
    regno: "",
    phone: "",
    email: "",
    empcount: "",
    address: {
      line1: "",
      line2: "",
      pincode: "",
      states: [this.getStateList()],
      city: [this.getCityList("Maharashtra")],
      country: "India",
    },
  };

  private discount = {
    name: "",
    validtill: "",
    
  };

  setDate = new Date();

  public file;
  private photo = {
    id: "",
    photo: {
      docname: "",
      docpath: "",
      docdesc: "",
      doctype: "",
      isprimary: "YES",
    },
  };

  public prodtypeid;

  // for datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  public data;
  public url;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) {}

  ngOnInit() {

    if (this.routprms.snapshot.params["id"]) {
      this.id = this.routprms.snapshot.params["id"];
    }

    console.log("adadad");
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === "/adddiscount") {
      this.title = "Add Discount";
      this.subtitle = "Fill new firm information and submit.";
      this.isManageState = false;
      

      this.getToday();

      // this.discount.validtill = this.commonService.getToday();
    } else if (this.route.url === "/editdiscount/" + this.id) {
      this.title = "Update Discount";
      this.subtitle = "Update Ca information and submit.";
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid();
      //  this.getdeploymentacct();
    } else {
      this.title = "Manage Discount";
      this.subtitle =
        "Manage Discount information including view, add, update and delete";
      //   this.userType = sessionStorage.getItem('role');
      this.getData();
    }
  }

  private setDateAsToday() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    this.discount.validtill =
      today.getFullYear() +
      "-" +
      this.stringfyToday(month) +
      "-" +
      this.stringfyToday(date);

    console.log("Manoj Date::", this.discount.validtill);
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
    // yyyy-MM-dd'T'HH:mm:ss.SSSZ
    let selectedDate =
      convertedDate.getFullYear() +
      "-" +
      this.stringfyToday(convertedDate.getMonth() + 1) +
      "-" +
      this.stringfyToday(convertedDate.getDate());

    this.discount.validtill = selectedDate;
    console.log("manog::", convertedDate.toUTCString());
  }

  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.discountRestURL("all", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  updateData() {
    this.prodtypeid = this.id;
    if (this.file) {
      this.uploadfile();
      this.photo.id = this.id;
      // delete this.category['id'];
      this.discount["photo"] = this.photo.photo;
    } else {
      delete this.discount["photo"];
    }

    console.log("submiti function");
    var url = this.restService.discountRestURL("edit", "");
    console.log(url);
    this.restService.postFormData(url, this.discount).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire("Updated", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/managediscount"]);
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

    let url = this.restService.discountRestURL("details", this.id);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data!");
        
        this.discount = response;
        console.log(response);

        this.discount.validtill = this.unixTimeConverter(response.validtill);

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
    let date1 = this.getToday();
    // let date2 = this.event.todate
    let date2 = this.discount.validtill;

    console.log(date1);
    console.log(date2);

    let compare = date1 > date2;

    console.log(compare);
    if (compare == true) {
      Swal.fire(
        "Dates are Incorrect",
        "Date Should Be Greater Than Today",
        "warning"
      );
    } else {
      this.uploadfile();

      console.log("submiti function");
      var url = this.restService.discountRestURL("add", "");
      this.discount["photo"] = this.photo.photo;
      console.log(url);
      this.restService.postFormData(url, this.discount).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
          console.log(response);
          this.prodtypeid = response.id;

          if (this.file) {
            this.photo.id = response.id;
            // this.photoAdd();
            // this.uploadfile();
            Swal.fire("Submited", "", "success");
            window.scrollTo(0, 0);
            console.log(response);
            this.route.navigate(["/managediscount"]);
          }
          // else {
          //   Swal.fire('Submited', '', 'success');
          //   window.scrollTo(0, 0);
          //   console.log(response);
          //   this.route.navigate(['/manageoffer']);
          // }
        },
        (error) => {
          // Error Message
          Swal.fire(error.statusText, error._body, "error");
          console.log("Error in data load.");
          // Doyour stuff here
        }
      );
    }
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
        const url = this.restService.discountRestURL("delete", id);
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
      this.photo.photo.doctype = "DISCOUNT";
      // this.photo.photo.docpath = 'Offer/' + this.prodtypeid + '/' + rname + this.file.name;
      this.photo.photo.docpath = "discount/" + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append("doc", this.file, rname + this.file.name);
      // docFormData.append('name', 'Category');
      docFormData.append("width", "400");
      docFormData.append("height", "400");
      docFormData.append("name", "discount");
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

  private photoAdd() {
    this.uploadfile();
    // if (this.uploadfile()){
    console.log("submitData function");
    console.log(this.photo.id);
    const url = this.restService.discountRestURL("edit", "");
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        Swal.fire("Added", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/managediscount"]);
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
