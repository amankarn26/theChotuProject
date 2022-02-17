import { error } from "util";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./../../services/rest.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { title } from "process";
// import {productstock} from '../.././Inventory-Management/productstock/productstock.component';
declare var Swal: any;
@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
})
export class BookingComponent implements OnInit {
  // private alertify = require('alertify.js');
  public sameadd = false;
  public title;
  public subtitle;
  public flag = false;
  private rolelist;
  private statelist;
  private citylist;
  private citylist1;
  private deptList;
  private sdeptList;
  private pincodelist;
  private employeeid;
  private deplist;
  public detailFlag = false;
  public prodquantity = 1;
  public isduplicatebranch = true;
  public productdata;
  public brand;

  public vendorCategorySearch;

  public pincode = sessionStorage.getItem("pincode");

  public rateunit;

  public freqdata = [];

  public productCategorySearch = [];

  public slider = [];

  public stockavailable;

  public variantname;
  public pstockdata = [];
  public stockdata;
  public varientnamefromresponse;
  public prodouctid;

  public isduplicate = false;
  public colour;
  public colourlist = [];
  public proplist = [];

  // for update employee
  // public docServer = this.restService.docServer;
  public branchlist = [];
  public propertyname;
  public propertyvalue;
  public properties = [];
  public propvalues = [];
  public dept;
  public isUpdate = false;
  private id;
  private gradeList;
  public url;
  private file;
  private fileName;
  public docServer = this.restService.docServer;
  private generatepassword;
  private emp = {
    branch: sessionStorage.getItem("branch"),
    name: "",
    fname: "",
    mname: "",
    lname: "",
    department: "",
    designation: "",
    phone: "",
    role: { role: "" },
    login: {
      email: "",
      password: "",
      type: "EMPLOYEE",
      role: "",
    },
    salary: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      pincode: "",
      states: "",
      country: "India",
    },

    erpid: 12,
  };

  public producttype;
  public branchname: Number;

  private photo = {
    id: "",
    photo: { docname: "", docpath: "", docdesc: "", doctype: "" },
  };
  // for datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "id";
  public sortOrder = "asc";

  public data;
  public searchData;
  public isSearch = false;

  private empId;

  public pstock; // product stock

  public delList = [];

  public clientdata;
  public empList;
  public branch;
  public bookingnum;
  public bookingdate;
  public saletype;

  public custstate;
  public custcity;
  public customer;
  public custname;
  public financename;
  public pricetype;
  public expdelivery;
  public salesman;
  public salesmanname;

  public cartcout = 0;

  public booingqty;

  public qcost: {
    exshowroom: "";
    insurance: "";
    yearsinsured: "";
    roadtax: "";
    accessorycost: "";
    extwarranty: "";
    rcbookcost: "";
    exchgvalue: "";
    gstamt: "";
    bookingamt: "";
    finalamt: "";
  };

  public isexchg = "NO";
  public exchange = {
    model: "",
    yrofmfg: "",
    regno: "",
    exchgvalue: "",
  };

  public prodlList;
  // public bookvehicles = {
  //   product: '',
  //   pname: '',
  //   hsncode: '',
  //   prod_stock: '',
  //   vmodel: '',
  //   vtype: '',
  //   voption: '',
  //   vcolour: '',
  //   chassisnum: '',
  //   enginenum: '',
  //   gst: '',
  //   gstamt: '',
  //   amount: '',
  //   finalamt: '',
  //   qty: 1
  // };

  prodtypedata = [];

  public branchdata = [];
  public nearbyfirmdata = [];

  public userType = sessionStorage.getItem("type");
  public userRole = sessionStorage.getItem("role");

  public hypothecation;
  // public exchange;
  public totalprods;
  public comments;
  public status;
  public paystatus;
  public total;

  public isinsured;
  public insurance: {
    customer: "";
    companyname: "";
    policynum: "";
    startdate: "";
    enddate: "";
  };

  public product;
  public items = [];
  nearbybranchdata: any;
  prodList: any;
  branchList: any;
  showrateunit: any;
  getallbranch: any;
  variant: any;
  // {{data?.pstock[0]?.variant}}
  varientname: "";
  soldas = "FULL";
  // varientname= {{dataa.variant}};
  fullloose: string;
  prodid: string;
  selectbranch: string;
  variantlist: any[];
  firm: any;


  // Added by aman


  public categoryList = [];
  public categorytype;

  public menulist: any;
  public selectedCat:any;

  public productResponse: any;

  public isFilterOn = false;

  constructor(
    private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) {}

  ngOnInit() {
    this.empId = this.routprms.snapshot.params["eid"];
    this.id = this.routprms.snapshot.params["id"];

    this.countcart();

    this.title = "Order Dish ";
      this.subtitle = "Select Your dish.";
      this.isSearch = false;

      this.getpopularproduct();
      this.getCatlist();
  }

  // Used Code

  // Get All Product
  private getpopularproduct() {
    // Get Information from JSON REST api
    // var url = this.restService.dishRestURL('productByid', sessionStorage.getItem('firm'));
    var url = this.restService.dishRestURL(
      "productByid",
      sessionStorage.getItem("firm")
    );

    // var url = this.restService.compactRestURL('popularproducts', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.data = response.map((entry) => {
          return {
            cartSelected: false,
            selectedVarient : {},
            ...entry,
          };
        });

        // for backup
        this.productResponse = this.data;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // Search From Product
  searchProduct() {
    if (this.productCategorySearch.length != 0) {
      this.searchData = this.data.filter((x) => {
        let var1 = this.productCategorySearch.toString().toUpperCase();
        let var2 = x.name.toUpperCase();
        let var3 = x.menutype.toUpperCase();
        return var2.includes(var1) || var3.includes(var1);
      });
      this.isSearch = true;

      console.log("munna", this.searchData);
    } else {
      this.isSearch = false;
    }
  }

  // Open varient box
  openVarient(index) {
    this.data[index].cartSelected = true;
    console.log(this.data[index]);
  }

  // add to cart
  setquantity(data: any, index: any) {
    console.log(data);
    console.log(index);

    if (index === null) {
      this.book(data);
    } else {
      data.cartSelected = false
      data.selectedVarient = data.variants.find(variant => variant.id === Number(this.variant))
      this.book(data);
    }
    this.route.navigate(["/custhomepage"]);
  }

  book(data: any) {
    let productdata = {};

    let items = [];

    if (data.variants[0]) {

      // Adding to cart..

      if (sessionStorage.getItem("items") != null)
        items = JSON.parse(sessionStorage.getItem("items"));

      productdata["dname"] = data.name;
      productdata["variant"] = data.selectedVarient;
      productdata["hasvariant"] = data.hasvariant;
      productdata["qty"] = 1;
      productdata["amount"] = data.selectedVarient.rateperunit ;
      productdata["rateunit"] = data.rateunit;
      productdata["rateperunit"] = data.selectedVarient.rateperunit;
      productdata["entrytotal"] = data.selectedVarient.rateperunit ;
      productdata["image"] = data.photos[0].docpath;
    } else {
      // Adding to cart..

      if (sessionStorage.getItem("items") != null)
        items = JSON.parse(sessionStorage.getItem("items"));

      productdata["dname"] = data.name;
      productdata["variant"] = null;
      productdata["qty"] = 1;
      productdata["hasvariant"] = data.hasvariant;
      productdata["amount"] = data.rateperunit;
      productdata["rateunit"] = data.rateunit;
      productdata["rateperunit"] = data.rateperunit;
      productdata["entrytotal"] = data.rateperunit ;
      productdata["image"] = data.photos[0].docpath;
    }

    items.push(productdata);

    sessionStorage.setItem("items", JSON.stringify(items));
    Swal.fire({ title: "Added to cart!", icon: "success", timer: 800 });
    this.countcart();
    this.prodouctid = "";
    this.varientname = null;
    this.varientnamefromresponse = null;
    this.soldas = "FULL";
  }

  // Old Code

  public getbranchlist() {
    this.branchlist = [];
    const url = this.restService.branchRestURL("branches", this.id);
    alert("le bhai=" + this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.branchlist = response;
        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  /******************************POST DATA ********************************************/
  private submitData() {
    this.emp.login.role = this.emp.role.role;

    this.emp.login.password = window.btoa(this.emp.login.password);

    this.emp.name = this.emp.fname + " " + this.emp.lname;
    // alert('login time encrypted password is :' + this.emp.login.password);

    console.log("submitData function");
    console.log(this.emp);
    const url = this.restService.empRestURL("add", "");
    this.restService.postFormData(url, this.emp).subscribe(
      (response: any) => {
        this.employeemail();
        this.employeeid = response.id;

        console.log("Status on Post API");
        console.log(response);
        if (this.file) {
          this.photo.id = response.id;
          this.photoAdd();
        } else {
          Swal.fire("Added", "", "success");
          window.scrollTo(0, 0);
          this.route.navigate(["/manageemployee"]);
        }
      },
      (error) => {
        // Error Message

        this.generatepass();
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  generatepass() {
    this.generatepassword =
      this.emp.fname.charAt(0).toUpperCase() +
      this.emp.fname.slice(1) +
      "@" +
      Math.random().toString(36).slice(-8);
    this.emp.login.password = this.generatepassword;
  }

  private photoAdd() {
    // alert('inside photo add');

    this.uploadfile();
    // if (this.uploadfile()){
    console.log("submitData function");
    console.log(this.photo);
    const url = this.restService.empRestURL("photoadd", "");
    this.restService.postFormData(url, this.photo).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        Swal.fire("Added", "", "success");
        window.scrollTo(0, 0);
        this.route.navigate(["/manageemployee"]);
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

  updateData() {
    //  if (this.dtCompare) {
    //  this.emp.push({ 'id': this.id});

    this.emp["id"] = this.id;
    // alert(this.id);

    if (this.file) {
      this.uploadfile();
      this.photo.id = this.id;
      delete this.emp["id"];
      this.emp["photo"] = this.photo.photo;
    } else {
      delete this.emp["photo"];
    }

    console.log("submiti function");
    // console.log(this.model.username);

    const url = this.restService.empRestURL("edit", "");
    this.emp["id"] = this.id;
    console.log(this.emp);
    this.restService.postFormData(url, this.emp).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        Swal.fire("", "", "success");
        this.route.navigate(["/manageemployee"]);
        window.scrollTo(0, 0);
        // this.route.navigate(['/manageemployee']);
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
  private getRoleList() {
    // Get Information from JSON REST api
    // this.rolelist=[];
    const url = this.restService.roleRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);

        this.rolelist = response;
        let index = 0;
        let loc;
        let setfl = false;

        for (const role of this.rolelist) {
          // alert('searching=    '+role.role);
          if (role.role == "SUPER") {
            // alert('searched');
            setfl = true;
            loc = index;
          }
          index = index + 1;
        }

        if (setfl) {
          this.rolelist.splice(loc, 1);
          console.log(this.rolelist);
        }

        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // private getDepList() {
  //   // Get Information from JSON REST api
  //   //this.rolelist=[];
  //   const url = this.restService.departmentRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response :any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log(response);
  //       this.deplist = response;
  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }
  // Get State List

  private getStateList() {
    // Get Information from JSON REST api
    const url = this.restService.stateRestURL("", "India");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  toggleEditable(event) {
    /*

        if (event.target.checked) {

         // alert(this.sameadd);
          let obj = new Object();
          obj['line1'] = this.emp.address.line1;
          obj['line2'] = this.emp.address.line2;
          obj['pincode'] = this.emp.address.pincode;
          obj['states'] = this.emp.address.states;
          obj['city'] = this.emp.address.city;


          this.getCityList1(this.emp.address.states);

          this.emp.permAddress.line1 = obj['line1'];
          this.emp.permaddress.line2 = obj['line2'];
          this.emp.permAddress.pincode = obj['pincode'];
          this.emp.permAddress.states = obj['states'];
          this.emp.permAddress.city = obj['city'];

          console.log(obj);
        }else{



        }*/
  }

  chekAddress() {
    alert(this.sameadd);
  }

  // GET USER EMPLOYEE LIST
  /******************************get data ********************************************/
  private getEmpList() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.empList = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private onChangeState(obj) {
    const stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  private onChangeState1(obj) {
    const stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList1(stateId);
  }

  private onChangeDept(obj) {
    const dept = obj.srcElement.value;
    // Call city data method
    this.getAllsubDept(dept);
  }

  private getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL("", stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.citylist = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getCityList1(stateId) {
    this.citylist1 = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL("", stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.citylist1 = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getAllsubDept(dept) {
    // Get Information from JSON REST api
    /*  const url = this.restService.subdepartmentRestURL('byname', dept);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.sdeptList = response;
          console.log('State data available');
        },
        error => {
          console.log('Error in data load.');
        }
      );*/
  }

  private getState() {
    // Get Information from JSON REST api
    this.emp.address.states = "";
    this.emp.address.city = "";
    var url = this.restService.PincodeRestURL("", this.emp.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.statelist = response;
        this.emp.address.states = response.state_name;
        this.emp.address.city = response.city_name;
        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  /******************************End Get Data*************************************** */

  /******************************Get Eplpyee By Id *********************************/

  private getEmpById() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log("Getting Emp by id");
        console.log(response);
        this.employeeid = this.id;
        this.emp.fname = response.fname;
        this.emp.mname = response.mname;
        this.emp.lname = response.lname;
        this.emp.phone = response.phone;
        this.emp.login.email = response.email;
        this.emp.department = response.department;
        this.emp.designation = response.designation;
        this.emp.role.role = response.role.role;
        this.emp.login.email = response.login.email;
        this.emp.login.password = response.login.password;
        this.emp.login.role = response.login.role;
        this.emp.login.type = response.login.type;
        this.emp.salary = response.salary;
        this.emp.address.city = response.address.city;
        this.emp.address.pincode = response.address.pincode;
        this.emp.address.line1 = response.address.line1;
        this.emp.address.line2 = response.address.line2;
        this.emp.address.states = response.address.states;
        this.emp.address.country = response.address.country;
        this.emp.login.password = response.password;
        this.emp.designation = response.designation;
        this.emp.department = response.department;
        if (response.photo) {
          this.url = this.docServer + "/" + response.photo.docpath;
        }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private employeemail() {
    // const email = {
    //   // role: { role: 'ADMIN' },
    //   to: this.emp.login.email,
    //   cc: 'inouvellesolutions@gmail.com',
    //   templateId: 'simplemail',
    //   contentData: {
    //     content: {
    //       message: 'Dear Sir,\n \n' +
    //         this.emp.fname + ' ' + this.emp.lname + ' your account is generated \n' +
    //         ' Account Details:\n '
    //         + 'Login Id : ' + this.emp.login.email + '\n'
    //         + 'Password : ' + atob(this.emp.login.password) + '\n'
    //       ,
    //     },
    //     table: [],
    //     // costtable: [],
    //     subject: 'New Account Created'
    //   }
    // };
    // console.log('submiti function');
    // console.log(email);
    // const url = this.restService.MailRestURL('send', '');
    // this.restService.postFormData(url, email).subscribe(
    //   (response :any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //   },
    //   error => {
    //     // Error Message
    //     console.log('Failed to send email message to admin');
    //   }
    // );
    // return 0;
  }

  /******************************End Get Eplpyee By Id *********************************/
  /****************************** Get Grade list *********************************/

  private getGradeList() {
    /*// Get Information from JSON REST api
    // const url = this.restService.gradeRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.gradeList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );*/
  }

  private getAllDept() {
    // Get Information from JSON REST api
    /* //  const url = this.restService.departmentRestURL('', '');
       this.restService.getJSONFromURL(url).subscribe(
         (response :any) => {
           this.restService.getJSONFromURL(response);
           // this.datalist = response;
           // this.data=response;
           console.log(response);
           this.deptList = response;
           console.log('State data available');
         },
         error => {
           console.log('Error in data load.');
         }
       );*/
  }

  /****************************** End Grade list *********************************/
  /******************************END GET DATA*************************************** */

  private unixTimeConverter(ts) {
    let datetime = "";
    const dattime1 = "";
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = "0";
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
      datetime = date.getFullYear() + "-" + mm + "-" + dd;
    } catch (err) {
      console.log("Unable to parse date data in unixTimeConverter");
      datetime = ts;
    }
    return datetime;
  }

  // delete Event
  deleteEmployee(id: any) {
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
        const url = this.restService.empRestURL("delete", "");
        console.log("Delete using this id:" + id);
        const json = '{"id":"' + id + '"}';
        this.restService.postFormData(url, json).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            this.getEmpList();
            this.route.navigate(["/manageemployee"]);
            // Now do your stuff here
          },
          (error) => {
            // Error Message
            Swal.fire(error.statusText, error._body, "error");
            console.log("Error in data load.");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  }

  /*****upload image********************************************************** */

  fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != "") {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log("Inside multiple file select");
    }
  }

  // @Input() multiple: boolean = false;
  uploadfile() {
    if (this.file) {
      const fileExtension = "." + this.file.name.split(".").pop();
      const rname =
        Math.random().toString(36).substring(7) + new Date().getTime();
      let objDoc = new Object();
      this.photo.photo.docname = this.file.name;
      this.photo.photo.doctype = "PROFILE";
      this.photo.photo.docpath =
        "Employee/" + this.employeeid + "/" + rname + this.file.name;
      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append("doc", this.file, rname + this.file.name);
      docFormData.append("name", "Employee" + "/" + this.employeeid);

      docFormData.append("width", "200");
      docFormData.append("height", "200");

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

  /*****End  upload image********************************************************** */
  private todatDate() {
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

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  private getlastLotno() {
    // Get Information from JSON REST api
    // GET Last Lot No purcahse order
    var url = this.restService.lastlotRestURL("booking", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.bookingnum = response.generatednum;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getClienList() {
    // // Get Information from JSON REST api
    // const url = this.restService.RetailerRestURL('city', this.custcity);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response :any) => {
    //     this.restService.getJSONFromURL(response);
    //     console.log(response);
    //     this.clientdata = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private onChangeHandler1(obj) {
    const stateId = obj.srcElement.value;
    console.log("primhandre...");
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.salesman = obj.target.options[obj.target.selectedIndex].text;
  }

  private getproduct() {
    // Get Information from JSON REST api
    var url = this.restService.dishRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.prodlList = response;
        console.log(this.prodlList);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // booking code

  private getfreqorders() {
    // Get Information from JSON REST api

    var url = this.restService.OrdersRestURL(
      "freqorder",
      sessionStorage.getItem("id")
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.freqdata = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getProddetails() {
    // Get Information from JSON REST api
    let url = this.restService.dishRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.product = response;
        this.colourlist = response.colours;

        console.log(response);
        this.producttype = response.prodtype;
        this.getbranchlist();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
  // getbranchlist() {
  //   throw new Error('Method not implemented.');
  // }

  // public myFunction(imgs) {
  //   var expandImg = document.getElementById('expandedImg');
  //   var imgText = document.getElementById('imgtext');
  //   expandImg.src = imgs.src;
  //   imgText.innerHTML = imgs.alt;
  //   expandImg.parentElement.style.display = 'block';
  // }

  private getByid() {
    // Get Information from JSON REST api
    // alert("000000");
    let url = this.restService.productstockRestURL("byprodid", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data!");
        this.pstock = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getByidcolour() {
    if (this.booingqty !== 0 && this.propertyvalue !== "") {
      const str =
        this.id +
        "&name=" +
        this.propertyname +
        "&pvalue=" +
        this.propertyvalue +
        "&qty=" +
        this.booingqty;
      let url = this.restService.productstockRestURL("byprodidcolor", str);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          console.log("Done fatching data!");
          this.pstock = response;
        },
        (error) => {
          console.log("Error in data load.");
        }
      );
    } else {
      console.log("Please select qty or colour");
      // Swal.fire(
      //   'Please, check Product Quantity and stock selected Quantity',
      //   '',
      //   'error'
      // );
    }
  }

  private deleteNewsList(id: any, data: any) {
    const index = this.delList.findIndex((x) => x.prod_stock === id);
    console.log("id= " + id);
    console.log("index= " + index);
    if (index > -1) {
      // WITHOUT SOCK SELECTION
      //    this.delList.splice(this.delList.indexOf(id), 1);
      // a = [
      //   {prop1:"abc",prop2:"qwe"},
      //   {prop1:"bnmb",prop2:"yutu"},
      //   {prop1:"zxvz",prop2:"qwrq"}];
      // index = a.findIndex(x => x.prop2 ==="yutu");
      this.delList.splice(index, 1);
    } else {
      // WITH STOCK SELECION
      const gstamt = (Number(data.rateperunit) * this.product.gst) / 100;
      console.log(gstamt);
      const finalamt = Number(data.rateperunit) + Number(gstamt);
      console.log(finalamt);

      const temp = {
        product: this.id,
        photo: this.product.photos["0"].docpath,
        pname: this.product.name,
        hsncode: this.product.hsncode,
        makername: this.product.makername,
        prod_stock: id,
        vmodel: this.product.vmodel,
        vtype: this.product.vtype,
        voption: this.product.voption,
        vcolour: data.vcolour, // this.product.vcolour, updated on 30 JAN 2020
        chassisnum: data.chassisnum,
        enginenum: data.enginenum,
        gst: this.product.gst,
        gstamt: gstamt,
        amount: data.rateperunit,
        finalamt: finalamt,
        qty: 1,
        lotno: data.lotno,
        batteryname: data.batteryname,
        batternum: data.batternum,
        mfgdate: data.mfgdate,
        properties: data.stockval,
      };

      this.delList.push(temp);
    }
    //   alert(id);
    console.log(this.delList);
  }

  // checkduplication() {
  //   let items=[];
  //   if (sessionStorage.getItem('items')) {
  //     items = JSON.parse(sessionStorage.getItem('items'));
  //     console.log(items);
  //     for (const product of items) {
  //       if (product.id == this.id) {
  //         this.isduplicate = true;
  //    //     Swal.fire('Already Exist in Cart', '', 'error');

  //       }
  //     }
  //   }
  // }

  checkduplication() {
    let items = [];
    if (sessionStorage.getItem("items")) {
      items = JSON.parse(sessionStorage.getItem("items"));
      console.log(items);
      for (const product of items) {
        if (product.id == this.id && product.variant === this.variantname) {
          this.isduplicate = true;
        }
      }
    }
  }

  checkbranchduplicate() {
    let items = [];
    if (sessionStorage.getItem("items")) {
      items = JSON.parse(sessionStorage.getItem("items"));
      console.log(items);
      for (const product of items) {
        if (product.firm != this.branchname) {
          this.isduplicatebranch = false;
          //     Swal.fire('Already Exist in Cart', '', 'error');
        }
      }
    }
  }

  public bookWithoutstk() {
    // json creation start on stock
    const gstamt = (Number(this.product.rateperunit) * this.product.gst) / 100;
    console.log(gstamt);
    const finalamt = Number(this.product.rateperunit) + Number(gstamt);
    console.log(finalamt);
    for (let i = 0; i < this.booingqty; i++) {
      const prod_withoutst = {
        product: this.id,
        photo: this.product.photos["0"].docpath,
        pname: this.product.name,
        hsncode: this.product.hsncode,
        vmodel: this.product.vmodel,
        vtype: this.product.vtype,
        voption: this.product.voption,
        vcolour: this.colour, // this.product.vcolour,
        gst: this.product.gst,
        gstamt: gstamt,
        amount: this.product.rateperunit,
        finalamt: finalamt,
        qty: 1,
      };
      this.delList.push(prod_withoutst);
    }
    // end json creation
    console.log("Book without sock");
    this.product["qty"] = this.booingqty;
    let pstocklist = [];
    let cartcout = 0;
    if (sessionStorage.getItem("mycartcount")) {
      cartcout = Number(sessionStorage.getItem("mycartcount"));
    }
    if (sessionStorage.getItem("pstocklist")) {
      pstocklist = JSON.parse(sessionStorage.getItem("pstocklist"));
    }
    pstocklist.push(...this.delList);
    sessionStorage.setItem("pstocklist", JSON.stringify(pstocklist));
    cartcout = cartcout + this.booingqty;
    sessionStorage.setItem("mycartcount", JSON.stringify(cartcout));
    sessionStorage.setItem("istockselected", "NO");
    Swal.fire("Added to cart", "", "success");
    this.route.navigate(["/custhomepage"]);
  }

  countcart() {
    console.log(this.items.length);
    console.log(this.items);

    if (sessionStorage.getItem("items")) {
      this.items = JSON.parse(sessionStorage.getItem("items"));
    }
  }

  addProduct(product) {
    const result1 = this.items.find((x) => x.id == product.id);

    if (result1) {
      console.log("Existing Item added to cart");
      for (let obj of this.items) {
        if (obj.id == product.id) {
          obj.qty = Number(obj.qty) + Number(this.prodquantity);

          console.log(obj.qty);
        }
      }
    }

    sessionStorage.setItem("items", JSON.stringify(this.items));
  }

  // private getByProdpropid() {
  //   // // Get Information from JSON REST api
  //   // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
  //   let url = this.restService.prodpropRestURL('', this.id);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any )=> {
  //       console.log('Done fatching data from prod property!');
  //       this.proplist = response;
  //       console.log(response);
  //     }, error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private getProperties() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    let url = this.restService.prodpropRestURL("", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data from prod property!");
        this.properties = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  getvalues() {
    const result = this.properties.find((x) => x.name === this.propertyname);
    console.log(result);
    if (result) {
      this.propvalues = result.possibelvalues;
    }
  }

  getstockdetailsbyid(id: any, status) {
    // http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

    if (status === "CLOSED") {
    }

    this.branchname = id;
    var api = "?prod=" + this.id + "&branch=" + this.branchname;
    let url = this.restService.dishRestURL("compact", api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data from prod property!");
        // this.proplist = response;
        this.productdata = response;
        this.stockavailable = response.status;
        this.pstockdata = response.pstock;
        console.log(response);
        this.rateunit = response.rateunit;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );

    this.variantname = null;
  }

  // change method on select option
  getstockdetails() {
    // http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

    const result1 = this.branchlist.find((x) => x.id == this.branchname);

    if (result1.status === "CLOSED") {
      Swal.fire("This Shop is currently Closed", "", "info");
      this.branchname = null;
    } else {
      var api = "?prod=" + this.id + "&branch=" + this.branchname;
      let url = this.restService.dishRestURL("compact", api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          console.log("Done fatching data from prod property!");
          // this.proplist = response;
          this.productdata = response;
          this.stockavailable = response.status;
          this.pstockdata = response.pstock;
          console.log(response);
          this.variant = response.variant;

          this.rateunit = response.rateunit;
        },
        (error) => {
          console.log("Error in data load.");
        }
      );

      this.variantname = null;
    }
  }

  getstockdetails1() {
    alert("012012");
    this.id = sessionStorage.getItem("branchname");
    var url = this.restService.dishRestURL("productByid", this.id);

    // var url = this.restService.compactRestURL('popularproducts', '');
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

  cartclick() {
    if (this.productdata["status"] === "AVAILABLE") {
      Swal.fire("Added to cart", "", "success");
    } else {
      Swal.fire("Not Available", "", "error");
    }
  }

  changepstock() {
    console.log(this.variantname);
    console.log(this.pstockdata);

    for (let data of this.pstockdata) {
      if (this.variantname === data.variant) {
        console.log("without round off");
        console.log(
          data.gstamt +
            "............" +
            data.rateperunit +
            "..........." +
            data.gst +
            "............" +
            data.available
        );

        this.productdata["rateperunit"] = Math.round(data.rateperunit);
        this.productdata["looserateperunit"] = Math.round(
          data.looserateperunit
        );
        this.productdata["gstamt"] = Math.round(data.gstamt);
        this.productdata["gst"] = Math.round(data.gst);
      }
    }

    console.log(this.productdata);
  }

  public getcompactbranch() {
    this.branchlist = [];
    const url = this.restService.compactRestURL("getcompactbranch", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.branchlist = response;
        console.log(response);
        this.branchdata = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getcompactnearbybranch() {
    //  alert(this.pincode);
    const url = this.restService.compactRestURL(
      "getcompactbranchnearby",
      this.pincode
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.nearbybranchdata = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getEvents() {
    // Get Information from JSON REST api
    const url = this.restService.docsRestURL("sliderimg", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.slider = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getpopularproducttype() {
    // Get Information from JSON REST api

    var url = this.restService.categoryRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.prodtypedata = response;
        console.log(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  searchVendor() {
    // Get Information from JSON REST api
    const url = this.restService.compactRestURL(
      "searchvendor",
      this.vendorCategorySearch
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.branchdata = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  clickmodal() {
    document.getElementById("id01").style.display = "block";
  }

  closemodal() {
    document.getElementById("id01").style.display = "none";
  }

  private getbranch() {
    for (let data of this.branchList) {
      if (Number(data.id) === Number(this.product.branch)) {
        console.log("data");
        console.log(data);
        //this.pstock.hsncode = data.hsncode;
        this.product.branch = data.branch;

        this.product.rateperunit = data.rateperunit;
        // this.pstock.purchaseprice = data.purchaseprice;
        this.showrateunit = data.rateunit;
        this.producttype = data.prodtype;

        //    alert(data.mfg);
        // this.getlastLotno();
        this.getallbranch();
      }
    }
  }

  getstockbyid(i: any) {
    for (let stock of this.data[i].pstock) {
      // alert('1');

      if (stock.variant === this.varientname) {
        // alert('2');
        // alert(stock.rateperunit);

        this.data[i].rateperunit = stock.rateperunit;

        // ratewithgst: 36.75
      }
    }
  }

  getstockdetailsbystock(i: any, data: any) {
    //  http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

    var api =
      "?prod=" + data.product + "&branch=" + sessionStorage.getItem("branch");
    let url = this.restService.dishRestURL("compact", api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data from prod property!");

        console.log(response);
        data = response;
        this.stockavailable = response.status;
        this.pstockdata = response.pstock;
        // this.changepstock(i)
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getamountpayablemonth() {
    this.restService.enableloading();

    if (this.route.url === "/custhomepage") {
      var url = this.restService.dishRestURL("productByid", this.id);
    } else {
      var url = this.restService.dishRestURL("productByid", this.id);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        // this.totalamount = response.amount
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getstock(i: any) {
    let currentPrice = this.data[i].variants.find(
      (entry) => Number(entry.id) === Number(this.variant)
    );
    this.data[i].rateperunit = currentPrice.rateperunit;
  }

  public applyFilter() {
    this.isFilterOn = !this.isFilterOn;
  }

  private getCatlist() {
    // Get Information from JSON REST api
    const url = this.restService.catRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.categoryList = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getprodtypelistbycatgory() {
    // http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.menutypeRestURL('bycategory', this.categorytype);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.menulist = res;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getprodbyprodtype() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    this.restService.enableloading();

    // alert('123456');
    // let url = this.restService.dishRestURL('byprodtype', this.id);
    let url = this.restService.dishRestURL('byprodtype', this.selectedCat);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.data = res;
        console.log(response);
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  refreshincall() {

    this.categorytype = undefined;
    this.selectedCat = undefined;
    this.data = this.productResponse




  }
}
