import { DatePipe, formatDate } from "@angular/common";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../services/rest.service";

declare var Swal: any;

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  // created by aman
  public setToDate = new Date();
  public setFromDate = new Date();

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
  public firmcatgeory = sessionStorage.getItem("offer");

  public id;
  private member = {
    role: "",
    description: "",
  };

  public docurll;

  private event = {
    name: "",
    fromdate: "",
    todate: "",
  };

  private extraInfo = {
    fromtime: "",
    totime: "",
  };

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
  document: any;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute // private datePipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.routprms.snapshot.params["id"]) {
      this.id = this.routprms.snapshot.params["id"];
    }

    this.url = this.route.url;

    if (this.route.url === "/addevent") {
      this.title = "Add Event";
      this.subtitle = "Fill new firm information and submit.";
      this.isManageState = false;
    } else if (this.route.url === "/editevent/" + this.id) {
      this.title = "Update Event";
      this.subtitle = "Update Ca information and submit.";
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid();
    } else {
      this.title = "Manage Event";
      this.subtitle =
        "Manage Event information including view, add, update and delete";
      this.getData();
    }
  }

  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.eventRestURL("getAll", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  updateData() {
    let startingDate = new Date(
      this.event.fromdate + " " + this.extraInfo.fromtime
    );
    let endingDate = new Date(this.event.todate + " " + this.extraInfo.totime);

    let compare = startingDate > endingDate;
    console.log(startingDate);
    console.log(endingDate);

    if (compare == true) {
      Swal.fire(
        "Dates are Incorrect",
        "Please check From Date and To Date!",
        "warning"
      );
    } else {
      this.event.fromdate = startingDate.toUTCString();
      this.event.todate = endingDate.toUTCString();

      this.prodtypeid = this.id;
      if (this.file) {
        this.uploadfile();
        this.photo.id = this.id;
        // delete this.category['id'];
        this.event["photo"] = this.photo.photo;
      } else {
        delete this.event["photo"];
      }

      var url = this.restService.eventRestURL("edit", "");
      this.restService.postFormData(url, this.event).subscribe(
        (response: any) => {
          // Responce data.
          // Now do your stuff here
          //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
          Swal.fire("Updated", "", "success");
          window.scrollTo(0, 0);
          this.route.navigate(["/manageevent"]);
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

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.eventRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.event = response;
        if (response.photo) {
          this.docurll = this.docServer + "/" + response.photo.docpath;
        }

        // just to customise date
        this.setToDate = new Date(response.todate);
        this.setFromDate = new Date(response.fromdate);

        this.extraInfo.fromtime = this.setFromDate.toTimeString().slice(0, 5);
        this.extraInfo.totime = this.setToDate.toTimeString().slice(0, 5);

        // set starting and end date of event
        this.event.todate =
          this.setToDate.getFullYear() +
          "-" +
          this.numberKeAageZeroLagao(this.setToDate.getMonth() + 1) +
          "-" +
          this.numberKeAageZeroLagao(this.setToDate.getDate());

        this.event.fromdate =
          this.setFromDate.getFullYear() +
          "-" +
          this.numberKeAageZeroLagao(this.setFromDate.getMonth() + 1) +
          "-" +
          this.numberKeAageZeroLagao(this.setFromDate.getDate());

      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public updateToDate(event: any) {
    let convertedDate = new Date(event.target.valueAsDate);

    // var d = new Date();
    // this.document.getElementById("demo").innerHTML = d;

    // yyyy-MM-dd'T'HH:mm:ss.SSSZ
    let selectedDate =
      convertedDate.getFullYear() +
      "-" +
      this.numberKeAageZeroLagao(convertedDate.getMonth() + 1) +
      "-" +
      this.numberKeAageZeroLagao(convertedDate.getDate());

    this.event.todate = selectedDate;
  }

  public updateFromDate(event: any) {
    let convertedDate = new Date(event.target.valueAsDate);
    // yyyy-MM-dd'T'HH:mm:ss.SSSZ
    let selectedDate =
      convertedDate.getFullYear() +
      "-" +
      this.numberKeAageZeroLagao(convertedDate.getMonth() + 1) +
      "-" +
      this.numberKeAageZeroLagao(convertedDate.getDate());

    this.event.fromdate = selectedDate;
  }

  private numberKeAageZeroLagao(numberDo: number) {
    if (numberDo < 10) {
      return "0" + numberDo;
    } else {
      return numberDo;
    }
  }

  submitData() {
    let startingDate = new Date(
      this.event.fromdate + " " + this.extraInfo.fromtime
    );
    let endingDate = new Date(this.event.todate + " " + this.extraInfo.totime);

    let compare = startingDate > endingDate;
    if (compare == true) {
      Swal.fire(
        "Dates are Incorrect",
        "Please check From Date and To Date!",
        "warning"
      );
    } else {
      this.event.fromdate = startingDate.toUTCString();
      this.event.todate = endingDate.toUTCString();

      this.uploadfile();

      var url = this.restService.eventRestURL("add", "");
      this.event["photo"] = this.photo.photo;
      this.restService.postFormData(url, this.event).subscribe(
        (response: any) => {
          // Responce data.
          this.prodtypeid = response.id;

          if (this.file) {
            this.photo.id = response.id;
            // this.photoAdd();
            // this.uploadfile();
            Swal.fire("Submited", "", "success");
            window.scrollTo(0, 0);
            this.route.navigate(["/manageevent"]);
          }
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

  private photoAdd() {
    this.uploadfile();
    // if (this.uploadfile()){
    const url = this.restService.eventRestURL("edit", "");
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        // Now do your stuff here
        Swal.fire("Added", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/manageevent"]);
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
        const url = this.restService.eventRestURL("delete", id);
        // const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
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
      this.photo.photo.doctype = "EVENT";
      // this.photo.photo.docpath = 'Offer/' + this.prodtypeid + '/' + rname + this.file.name;
      this.photo.photo.docpath = "event/" + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append("doc", this.file, rname + this.file.name);
      // docFormData.append('name', 'Category');
      docFormData.append("width", "400");
      docFormData.append("height", "400");
      docFormData.append("name", "event");
      var docurl = this.restService.customUpload("upload", "");

      this.restService.uploadFormData(docurl, docFormData).subscribe(
        (response: any) => {
          // Responce data.
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

  fileEvent(fileInput: any) {
    if (fileInput.target.files[0] != "") {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.docurll = event.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
