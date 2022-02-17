// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-branch',
//   templateUrl: './branch.component.html',
//   styleUrls: ['./branch.component.css']
// })
// export class BranchComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./../services/rest.service";
import { JsonPipe } from "@angular/common";
declare var Swal: any;

declare var Razorpay: any;

@Component({
  selector: "app-branch",
  templateUrl: "./branch.component.html",
  styleUrls: ["./branch.component.css"],
})
export class BranchComponent implements OnInit {
  // private alertify = require('alertify.js');
  private title = "";
  private subtitle = "";
  private isManageState = true;
  private datalist;
  public userType = sessionStorage.getItem("type");
  public userRole = sessionStorage.getItem("role");

  public statelist = [];
  public citylist = [];
  public file;
  public number;
  public categoryList = [];
  public showpassword = false;
  lat = 0;
  lng = 0;

  public messagebody;

  message = {
    toMobile: "",
    message: "",
    DCS: 0,
  };

  public categoryselect;
  public category;

  public id;
  private member = {
    role: "",
  };

  public categorydata = [];
  public document;
  public branchid;

  public branch = {
    name: "",
    firm: sessionStorage.getItem("firm"),
    // regno: '',
    // category:'',
    phone: "",
    email: "",
    branchtype: "",
    // code: '',
    // empcount: '',
    // pannum: '',
    // gstin: '',
    address: {
      line1: "",
      line2: "",
      pincode: "",
      states: this.getStateList(),
      city: this.getCityList("Maharashtra"),
      country: "India",
    },
    // account:{
    //   type:'',    // --enum BANK/PAYTM/GOOGLE_PAY
    //   acctnumber:'',
    //   branch:'',
    //  ifsccode:'',
    //  city:'',
    //  bankname:''
    // },
    login: {
      type: "BRANCH",
      username: "", // ----------User name can be phone or email
      password: "",
      role: "BRANCH",
    },
    // usedeliverypool:'YES',
    // servicerate:0,
    // deliverdays:'',
    // iscodsupported:'NO',
    // deliverytype:''
  };

  // public branch;
  public ifsccode;
  public city;

  private config = {
    branch: sessionStorage.getItem("branch"),
    name: "",
    value: "",
  };

  private configlist = [];
  private configlist1 = [];

  // private branchId;

  public docServer = this.restService.docServer;

  private photo = {
    docname: "",
    docpath: "",
    docdesc: "",
    doctype: "",
    isprimary: "YES",
  };

  // for datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  public data = [];
  public url;
  public urls;
  public isUpdate = false;

  // payment json
  options = {
    key: "rzp_test_BFZPuXGalgBJ1L", // Enter the Key ID generated from the Dashboard
    amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Softwiders Pvt. Ltd.",
    description: "Test Transaction",
    image: "http://softwiders.com/images/inouvelle_logo.png",
    handler: function (response) {
      alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature)
    },
    prefill: {
      name: "Pankaj Chaudhari",
      email: "pankaj_chaudhari@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#F37254",
    },
  };
  // branchid: any;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) {}

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
      function onOk() {alert("Ok");},
      function onCancel() { alert("Cancel");}
  );*/
    if (this.routprms.snapshot.params["id"]) {
      this.id = this.routprms.snapshot.params["id"];
    }

    this.number = this.routprms.snapshot.params["no"];

    console.log("adadad");
    this.url = this.route.url;
    console.log(this.route.url);

    console.log(this.userType);
    // http://localhost:4600/index.html#/addfirm/2458652548

    if (this.route.url === "/addbranch/" + encodeURIComponent(this.number)) {
      // this.getLocation();
      this.getPosition();
      this.title = "Add Branch";
      this.subtitle = "Fill new branch information and submit.";
      this.isManageState = false;
      this.generatepass();
      this.getCatlist();
      this.branch.login.username = this.number;
      this.getStateList();
      this.getCityList("Maharashtra");
    } else if (this.route.url === "/addbranch") {
      // this.getLocation();
      // this.getPosition();

      this.title = "Add Branch";
      this.subtitle = "Fill new branch information and submit.";
      this.isManageState = false;
      this.branch.login.username = this.branch.phone;
      this.generatepass();
      this.getCatlist();
    } else if (this.route.url === "/editbranch/" + this.id) {
      this.title = "Update Branch";
      this.subtitle = "Update Branch information and submit.";
      this.isManageState = false;
      this.isUpdate = true;

      // if(this.userRole=='superadmin'){
      //   this.getBranch();
      // };

      this.getBranch(); //get branch detail
      this.getCatlist();
    } else {
      this.title = "Manage Branch";
      this.subtitle =
        "Manage Branch information including view, add, update and delete";
      // this.userType = Cookie.getAll()['role'];

      // if(this.userRole=='superadmin'){
      //   //   this.getBranch();
      // this.getRoleList();

      //   };

      this.getRoleList();
      this.getallcategory();
    }
  }

  private getRoleList() {
    // Get Information from JSON REST api
    this.restService.enableloading();
    const url = this.restService.branchRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  // edit
  updateData() {
    // console.log('submiti function');

    if (this.file) {
      this.uploadfile();
      this.branch["photo"] = this.photo;
    } else {
      delete this.branch["photo"];
    }

    // if (this.branch.gstin === '') {
    //   delete this.branch.gstin;
    // }

    // if (this.branch.pannum === '') {
    //   delete this.branch.pannum;
    // }

    var url = this.restService.branchRestURL("edit", "");
    console.log(url);
    this.restService.postFormData(url, this.branch).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire("Updated", "", "success");
        // this.submitConfig(this.firmid);
        window.scrollTo(0, 0);

        if (this.userRole == "BRANCH") {
          //  this.title = 'Update Customer Data';
          this.route.navigate(["/managebranch"]);
        } else if (this.userRole == "SUPERADMIN") {
          this.route.navigate(["/managebranch"]);
        } else {
          this.route.navigate(["/myprofile"]);
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

  // detail
  private getBranch() {
    // Get Information from JSON REST api
    this.restService.enableloading();
    let url = this.restService.branchRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data!");

        //  this.firm.address.states = [this.getStateList()];
        this.datalist = response;
        this.getCityList(this.datalist.address.states);
        this.branch = response;
        console.log(response);

        this.datalist = response;
        this.getCityList(this.datalist.address.states);
        this.branch = response;
        console.log(response);
        if (response.photo) {
          this.urls = this.docServer + "/" + response.photo.docpath;
        }
        this.branchid = response.id;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );

    //this.getsysconfig(this.id);
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
    let stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
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

  // add branch
  submitData() {
    let flg = true;

    // if (this.branch.gstin === '') {
    //   delete this.branch.gstin;
    // }

    // if (this.branch.pannum === '') {
    //   delete this.branch.pannum;
    // }

    this.branch.login.password = window.btoa(this.branch.login.password);
    this.branch.address.line2 = this.branch.address.line2.toUpperCase();

    console.log("submiti function");
    var url = this.restService.branchRestURL("add", "");
    console.log(url);
    this.restService.postFormData(url, this.branch).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);

        //   alert('success');
        // Now do your stuff here
        this.branchid = response.id;
        this.employeemail();
        this.sendBranchSMS();
        if (this.file) {
          this.uploadfile();
          this.submitdoc();
        }
        //  this.submitConfig(this.firmid);

        Swal.fire("Added", "", "success");
        this.route.navigate(["/managebranch"]);
        if (this.userType === null) {
          Swal.fire("Account Created", "Please Login From Portal", "success");
          this.route.navigate(["/login"]);
        }

        window.scrollTo(0, 0);

        //   sessionStorage.setItem('id', response.id);
        //   sessionStorage.setItem('name', response.name);
        //   sessionStorage.setItem('type', response.login.type);
        //   sessionStorage.setItem('islogin', 'true');
        //   localStorage.setItem('islogin', 'true');
        //   sessionStorage.setItem('email', response.login.email);
        //   sessionStorage.setItem('role', response.login.role);

        //   sessionStorage.setItem('firm', response.id);
        //  // this.getsysconfig( response.id);
        //   sessionStorage.setItem('photo', response.logo.docpath);

        // location.reload();
        // this.route.navigate(['/managefirm']);
      },
      (error) => {
        this.generatepass();
        // Error Message
        Swal.fire(error.statusText, error._body, "error");

        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  // delete branch
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
        const url = this.restService.branchRestURL("delete", id);
        console.log("Delete using this id:" + id);
        const json = '{"id":"' + id + '"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            this.getRoleList();
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
    // delete code

    // delete code end
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
    //     const url = this.restService.firmRestURL('delete', '');
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
    //         );
    //         this.getRoleList();
    //         // Now do your stuff here
    //       },
    //       error => {
    //         // Error Message
    //         Swal.fire(
    //           error.statusText,
    //           error._body,
    //           'error'
    //         );
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

  private getState() {
    // Get Information from JSON REST api
    const url = this.restService.PincodeRestURL(
      "",
      this.branch.address.pincode
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.branch.address.states = response.state_name;
        this.branch.address.city = response.city_name;
        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != "") {
      this.file = fileInput.target.files[0];
      // this.fileName = this.user.category;

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls = event.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      console.log("Inside multiple file select");
    }
    // alert(this.fileName);
    // alert('file event end');
    // preview
  }

  // upload photo
  uploadfile() {
    if (this.file) {
      const fileExtension = "." + this.file.name.split(".").pop();
      const rname =
        Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.docname = this.file.name;
      this.photo.doctype = "PROFILE";
      this.photo.docpath = this.branchid + "/" + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append("doc", this.file, rname + this.file.name);
      docFormData.append("name", this.branchid);

      docFormData.append("width", "400");
      docFormData.append("height", "400");

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

  //add photo
  submitdoc() {
    let docs = {
      id: this.branchid,
      photo: this.photo,
    };

    console.log("submiti function");
    var url = this.restService.branchRestURL("logoadd", "");
    console.log(url);
    this.restService.postFormData(url, docs).subscribe(
      (response: any) => {
        // Responce data.
        this.branchid = response.id;
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        // Error Message
        // this.alertify.alert('<b>Failed to add Vendor Logo</b><br>' + error.statusText + '<br>'
        //   + error._body);
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  push() {
    this.configlist.push(JSON.parse(JSON.stringify(this.config)));
  }

  delproperty(i) {
    this.configlist.splice(i, 1);
    // this.recal();
    Swal.fire("Deleted!", "", "success");
  }

  delproperty1(id: any) {
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
        const url = this.restService.branchRestURL("configdelete", id);
        console.log("Delete using this id:" + id);
        const json = '{"id":"' + id + '"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            //   this.getsysconfig(this.id);
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

  // submitConfig(id: any) {

  //   for (let entry of this.configlist) {
  //     entry.firm = id;
  //   }

  //   // delete code
  //   const url = this.restService.firmRestURL('configadd', '');
  //   console.log('Delete using this id:' + id);

  //   this.restService.postFormData(url, this.configlist).subscribe(
  //     (response: any) => {
  //       // Responce data.
  //       console.log('Status on Post API');
  //       console.log(response);
  //       // Swal.fire(
  //       //   'Deleted!',
  //       //   'Your data has been deleted.',
  //       //   'success'
  //       // );

  //       // Now do your stuff here
  //     },
  //     error => {
  //       // Error Message
  //       // Swal.fire(
  //       //   error.statusText,
  //       //   error._body,
  //       //   'error'
  //       // );
  //       console.log('Error in data load.');
  //       // Doyour stuff here
  //     }
  //   );
  // }

  //   private getsysconfig(fid: any) {
  //   // Get Information from JSON REST api
  //   //  alert('get sys config');
  //   const url = this.restService.firmRestURL('config', fid);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       // this.restService.getJSONFromURL(response);
  //       console.log(response);
  //       this.configlist1 = response;

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  // private getsysconfig(fid:any){
  //   // Get Information from JSON REST api
  //  //  alert('get sys config');

  //     const url = this.restService.firmRestURL('config', fid);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         console.log(response);
  //         const datalist=response;
  //         for(let etnry of datalist){
  //             sessionStorage.setItem(etnry.name ,etnry.value);
  //          }

  //         this.configlist1 = response;
  //         location.reload();
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );

  //   //  alert('sfas');
  // }

  // pay() {
  //   alert('Payment');

  //   var options = {
  //     'key': 'rzp_test_BFZPuXGalgBJ1L', // Enter the Key ID generated from the Dashboard
  //     'amount': '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     'currency': 'INR',
  //     'name': 'Softwiders Pvt. Ltd.',
  //     'description': 'Test Transaction',
  //     'image': 'http://inouvelle.com/images/inouvelle_logo.png',
  //     // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     'handler': function (response) {
  //       alert(response.razorpay_payment_id);
  //       alert(response.razorpay_order_id);
  //       alert(response.razorpay_signature)
  //     },
  //     'prefill': {
  //       'name': 'Gaurav Kumar',
  //       'email': 'gaurav.kumar@example.com',
  //       'contact': '9999999999'
  //     },
  //     'notes': {
  //       'address': 'Razorpay Corporate Office'
  //     },
  //     'theme': {
  //       'color': '#F37254'
  //     }
  //   };
  //   var rzp1 = new Razorpay(options);
  //   document.getElementById('rzp-button1').onclick = function (e) {
  //     rzp1.open();
  //     e.preventDefault();
  //   }
  // }

  initPay() {
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    console.log("works");
  }

  generatepass() {
    this.branch.login.password = String(
      Math.floor(100000 + Math.random() * 900000)
    ); // this.generatepassword;
  }

  private employeemail() {
    const email = {
      // role: { role: 'ADMIN' },
      to: this.branch.email,
      cc: "amankarn26@gmail.com",
      templateId: "simplemail",
      contentData: {
        content: {
          message:
            "Dear Sir,\n \n" +
            this.branch.name +
            " your account is generated \n" +
            " Account Details:\n " +
            "Login Id : " +
            this.branch.login.username +
            "\n" +
            "Password : " +
            atob(this.branch.login.password) +
            "\n",
        },
        table: [],
        // costtable: [],
        subject: "New Account Created",
      },
    };

    console.log("submiti function");
    console.log(email);
    const url = this.restService.MailRestURL("send", "");
    this.restService.postFormData(url, email).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        // Error Message
        console.log("Failed to send email message to admin");
      }
    );
    return 0;
  }

  private getCatlist() {
    // Get Information from JSON REST api
    const url = this.restService.catRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.categoryList = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  Setphone() {
    this.branch.login.username = this.branch.phone;
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
          console.log(resp.coords.longitude);
          console.log(resp.coords.latitude);
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          this.branch.address["latitude"] = this.lat;
          this.branch.address["longitude"] = this.lng;
        },
        (err) => {
          reject(err);
          alert(
            "This page has been blocked from tracking your location, You will be charged higher Delivery Charges"
          );
        }
      );
    });
  }

  // public setservicerate() {
  //   if (this.branch.category.toUpperCase() === 'LIQUOR') {
  //     this.branch.servicerate = 18;
  //   } else {
  //     this.branch.servicerate = 12;
  //   }
  // }

  showpass() {
    this.showpassword = true;
  }

  hidepass() {
    this.showpassword = false;
  }

  // all branch in dropdown
  private getallcategory() {
    // Get Information from JSON REST api
    var url = this.restService.branchRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.categorydata = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // after click on each branch dropdown
  public getprodtypebycat() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.branchRestURL("branchosearch", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data from prod property!");
        const res: any = response;
        this.data = res;
        // this.categorydata = response;

        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  refreshincall() {
    this.category = undefined;
    this.categoryselect = "";
    this.getRoleList();
  }

  sendBranchSMS() {
    const message =
      "Your Account is Generated :" +
      "\r\nUser Name: " +
      this.branch.login.username +
      "  Password: " +
      atob(this.branch.login.password);

    let mobile = this.branch.login.username;

    const smsdata = {
      toMobile: mobile,
      message: message,
    };

    console.log("sending sms");
    console.log(smsdata);
    const url = this.restService.smsRestURL("send", "");

    console.log(url);
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  //   setcode()
  // {
  //   this.firm.code = this.firm.name.substring(0, 3).toUpperCase();
  //   }

  //called block
  showpopup(data: any) {
    document.getElementById("id01").style.display = "block";
    this.message.toMobile = data.phone;
  }

  submitmsg(data: any) {
    // const message = 'JGL: Your Account is Generated :' + '\r\nUser Name: ' + this.firm.login.username + '  Password: ' + atob(this.firm.login.password);

    // let mobile =  data.phone;

    // const smsdata = {
    //     toMobile: mobile,
    //     message: this.messagebody
    // };

    // console.log("sending sms");
    // // console.log(smsdata);
    // const url = this.restService.smsRestURL("send", "");

    // console.log(url);
    // this.restService.postFormData(url, this.message).subscribe(
    //   (response) => {
    //     // Responce data.
    //     console.log("Status on Post API");
    //     console.log(response);
    //     this.message.message = null;
    //     document.getElementById("id01").style.display = "none";
    //     Swal.fire("SMS Sent", "", "success");
    //   },
    //   (error) => {
    //     console.log("Error in SMS.");
    //   }
    // );
    return 0;
  }

  gettrue() {
    return false;
  }
}
