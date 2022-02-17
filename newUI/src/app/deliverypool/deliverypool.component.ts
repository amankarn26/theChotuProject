import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
import { throws } from 'assert';
import { stat } from 'fs';
declare var Swal: any;

@Component({
  selector: 'app-deliverypool',
  templateUrl: './deliverypool.component.html',
  styleUrls: ['./deliverypool.component.css']
})
export class DeliverypoolComponent implements OnInit {
  // private alertify = require('alertify.js');
  public sameadd = false;
  public title;
  public subtitle;
  public flag = false;
  public updatetab = false;

  public tempvalue;
  public detailFlag = false;
  public userType = sessionStorage.getItem('type');
  public userRole = sessionStorage.getItem('role');


  public deliverypoolid;

  public stockval = {
    area: '',
    pincode: ''
  }


  public area = {
    id: '',
    dvryarea: []
  }

  public areadata = [];

  private rolelist;
  private statelist;
  private citylist;
  private citylist1;
  private deptList;
  private sdeptList;
  // for update customer
  public custlist;
  public dept;
  public isUpdate = false;
  private id;
  private gradeList;
  public url;
  public urls1;
  private file;

  private file1;

  private fileName;
  public generatepassword;
  public docname;
  public docServer = this.restService.docServer;
  private customer = {
    // firm: sessionStorage.getItem('firm'),
    //   deployacct: sessionStorage.getItem('deployacct'),


    name: '',
    // dob: '',
    //gender: '',
    phone: '',
    email: '',
    // role: {
    //   role: 'USER',
    //   description: ''
    // },
    login: {
      type: 'DELIVERY_PERSON',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'DELIVERY_PERSON'
    },

    vehicletype: '',
    // vehiclereg: '',
    // license: '',
    status: 'PENDING',
    // profession: '',
    // gst: '',
    // pan: '',
    // state:'PENDING',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India'
    },

    account: {
      type: '',    // --enum BANK/PAYTM/GOOGLE_PAY
      acctnumber: '',
      branch: '',
      ifsccode: '',
      city: '',
      bankname: ''
    }

  };
  public cust_datalist = [];
  public cust_data = {
    customer: '',
    other2v: '',
    name: '',
    yrofmfg: '',
    regno: ''
  };



  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'id';
  public sortOrder = 'asc';
  public data = [];
  private empId;
  public doctype;
  public doclist = [];

  // upload file
  private document;
  private document1;

  private fileArray = [];
  private docArray = [];
  public getPhots = [];
  public urls;
  public docdetails = 'Customer Documents';

  public tab1 = true;
  public tab2 = false;
  public tab3 = false;
  public customerId;
  public name;

  private license = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };
  private vehiclereg = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };

  public firmlist = [];

  constructor(
    private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  ngOnInit() {

    // Read parameter from route


    console.log(this.userType);
    this.empId = this.routprms.snapshot.params['id'];
    this.id = this.routprms.snapshot.params['id'];

    if (this.route.url === '/editdeliverypool/' + encodeURIComponent(this.empId)) {
      this.title = 'Update Delivery Pool ';
      this.subtitle = 'Edit Delivery Pool  details.';
      this.flag = true;
      this.isUpdate = true;
      this.customerId = this.id;
      //  this.updateEmp();
      this.getRoleList();
      this.getEmpById();
      this.getGradeList();
      // this.getcustDatabyId();
      this.getcustDocsbyId();
      this.getareadata();
      this.getallfirm();

      //  this.getAllDept();
    } else if (this.route.url == '/adddeliverypool') {
      this.title = 'Add Delivery Pool ';
      this.subtitle = 'Enter employe details.';
      this.flag = true;
      this.getPosition();
      this.getRoleList();
      this.getGradeList();
      this.generatepass();
      // this.getStateList();
      // alert('add customer');
      //   this.getAllDept();
    } else if (this.route.url == '/adddeliverypool/' + encodeURIComponent(this.id)) {
      this.getPosition();

      this.title = 'Add Delivery Pool ';
      this.subtitle = 'Enter employe details.';
      this.flag = true;
      this.customer.login.username = this.id;
      this.customer.phone = this.id;

      //   this.id=this.customer.name;
      this.getRoleList();
      this.getGradeList();
      this.generatepass();
      //  this.getStateList();
      // alert('add customer');
      //   this.getAllDept();


    }
    else if (this.route.url == '/update_areadeliverypool/' + encodeURIComponent(this.id)) {
      // alert('in')
      this.title = 'Assign Area For Delivery Pool ';
      this.subtitle = 'Enter employe details.';
      this.flag = true;
      this.updatetab = true;
      this.getareadata();

    }
    else {
      this.title = 'Manage Delivery Pool';
      this.subtitle = 'Manage Employe information including view, add, update and delete';
      this.flag = false;
      this.getCustList();
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        console.log(resp.coords.longitude);
        console.log(resp.coords.latitude);

        this.customer.address['latitude'] = resp.coords.longitude;
        this.customer.address['longitude'] = resp.coords.latitude;
      },
        err => {
          reject(err);
          alert('This page has been blocked from tracking your location, You will be charged higher Delivery Charges');
        });
    });

  }
  /******************************POST DATA ********************************************/

  // tab1 start
  private submitData() {



    this.customer.login.username = this.customer.phone;
    this.customer.login.password = window.btoa(this.customer.login.password);
    console.log('submitData function');
    console.log(this.customer);
    const url = this.restService.delivertypoolRestURL('add', '');
    this.restService.postFormData(url, this.customer).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);

        this.employeemail();
        // Now do your stuff here
        this.deliverypoolid = response.id;
        // this.tab1 = false;
        // // this.tab2 = true;
        // this.tab3 = true;
        if (this.file) {
          this.uploadfile();
          this.submitdoc();
        }

        if (this.file1) {
          this.uploadfile1();
          this.submitdoc1();
        }

        if (this.isUpdate) {
          this.title = 'Update Customer Data';
        } else {
          this.title = 'Add Customer Data';
        }

        if (this.userType === null) {
          Swal.fire('Account Created', 'Please Login From Portal', 'success');
          this.sendVendorSMS();
          this.route.navigate(['/login']);

        }
        else {
          Swal.fire('', '', 'success');
          this.sendVendorSMS();

          window.scrollTo(0, 0);
          this.route.navigate(['/managedeliverypool']);
        }



      },
      error => {
        // Error Message
        this.generatepass();
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
    // } else {
    //   Swal.fire(
    //     'Please add PAN no. Or GST no.',
    //      '',
    //      'error'
    //    );
    // }
  }


  updateData() {
    //  this.customer.city = this.customer.address.city;

    this.customer['id'] = this.id;


    this.deliverypoolid = this.id;
    if (this.file) {
      this.uploadfile();
      this.customer['license'] = this.license;

    } else {

      delete this.customer['license'];

    }

    if (this.file1) {
      this.uploadfile1();
      this.customer['vehiclereg'] = this.vehiclereg;

    } else {

      delete this.customer['vehiclereg'];

    }



    console.log('submiti function');
    const url = this.restService.delivertypoolRestURL('edit', '');
    console.log(this.customer);
    this.restService.postFormData(url, this.customer).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
        // this.tab1 = false;
        // //  this.tab2 = true;
        // this.tab3 = true;
        if (this.isUpdate) {
          this.title = 'Update Customer Data';
        } else {
          this.title = 'Add Customer Data';
        }

        if (this.userType === 'SUPERADMIN') {
          this.route.navigate(['/managedeliverypool']);

        }
        else {
          this.cancel();
        }
        window.scrollTo(0, 0);

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


  // tab end

  // tab2 start
  private submitData1(data: any) {
    // console.log('submitData1 function');
    // console.log(this.customer);
    // const arjson=[data];

    // const url = this.restService.delivertypoolRestURL('addcustdata', '');
    // this.restService.postFormData(url, arjson).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     // this.tab1=false;
    //     // this.tab2=false;
    //     // this.tab3=true;
    //     // this.title = 'Upload Customer Document';
    //     Swal.fire('', '', 'success');
    //     this.getcustDatabyId();
    //     window.scrollTo(0, 0);
    //     // this.route.navigate(['/managecustomer']);
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
    // return 0;
  }

  // tab2 end

  // }

  /******************************END POST DATA ********************************************/


  /******************************GET DATA ********************************************/
  // Get role list
  private getRoleList() {
    // // Get Information from JSON REST api
    // const url = this.restService.roleRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.rolelist = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }
  // Get State List

  // private getStateList() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.stateRestURL('', 'India');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       // this.restService.getJSONFromURL(response);
  //       this.statelist = response;
  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  toggleEditable(event) {

    /*

        if (event.target.checked) {

         // alert(this.sameadd);
          let obj = new Object();
          obj['line1'] = this.customer.address.line1;
          obj['line2'] = this.customer.address.line2;
          obj['pincode'] = this.customer.address.pincode;
          obj['states'] = this.customer.address.states;
          obj['city'] = this.customer.address.city;


          this.getCityList1(this.customer.address.states);

          this.customer.permAddress.line1 = obj['line1'];
          this.customer.permaddress.line2 = obj['line2'];
          this.customer.permAddress.pincode = obj['pincode'];
          this.customer.permAddress.states = obj['states'];
          this.customer.permAddress.city = obj['city'];

          console.log(obj);
        }else{



        }*/

  }

  chekAddress() {
    alert(this.sameadd);
  }
  // GET USER customer LIST
  /******************************get data ********************************************/
  private getCustList() {
    // Get Information from JSON REST api
    this.restService.enableloading();
    const url = this.restService.delivertypoolRestURL('customer', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.data = response;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

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
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  private getCityList1(stateId) {
    // this.citylist1 = [];
    // // Get Information from JSON REST api
    // const url = this.restService.cityRestURL('', stateId);
    // console.log(stateId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.citylist1 = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getAllsubDept(dept) {
    // Get Information from JSON REST api
    /*  const url = this.restService.subdepartmentRestURL('byname', dept);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
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
  /******************************End Get Data*************************************** */

  /******************************Get Eplpyee By Id *********************************/

  private getEmpById() {

    // // Get Information from JSON REST api
    const url = this.restService.delivertypoolRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        // this.data=response;

        // this.customer.dob = this.unixTimeConverter(response.dob);
        this.customer = response;
        this.customer.name = response.name;
        this.customer.address.states = response.address.states;
        this.customer.vehicletype = response.vehicletype;
        //   this.customer.vehiclereg = response.vehiclereg;
        this.customer.phone = response.phone;
        this.customer.email = response.email;
        //     this.customer.license = response.license;
        // this.customer.pan = response.pan;
        // this.customer.gst = response.gst;
        this.customer.address.city = response.address.city;
        //   this.customer.address.states = response.address.city;

        // this.customer.address.line1 = response.address.line1;
        // this.customer.address.line2 = response.address.line2;
        // this.customer.address.states = response.address.states;
        // this.customer.address.city = response.address.city;
        // this.customer.address.pincode = response.address.pincode;
        // this.customer.shopname= response.shopname;

        /*  this.customer.password = response.password;

         this.customer.designation = response.designation; */
        // this.customer.gender = response.gender;

        this.customer.login.username = response.login.username;
        //    this.customer.panno = response.panno;
        //    this.customer.etype = response.etype;
        // this.area=response.area;
        //   this.customer.address.line1 = response.address.line1;
        //    this.customer.address.line2 = response.address.line2;
        //    this.customer.address.pincode = response.address.pincode;
        //    this.customer.address.states = response.address.states;
        //    this.customer.address.city = response.address.city;
        //    this.customer.address.country = response.address.country;

        //  this.customer.permAddress.line1 = response.permAddress.line1;
        //   this.customer.permaddress.line2 = response.permaddress.line2;
        //    this.customer.permAddress.pincode = response.permAddress.pincode;
        //   this.customer.permAddress.states = response.permAddress.states;
        //    this.getCityList1(this.customer.permAddress.states);
        //    this.customer.permAddress.city = response.permAddress.city;
        //    this.customer.permAddress.country = response.permAddress.country;

        // this.customer.role.role = response.role.role;
        //    this.customer.grade = response.grade;
        /*        this.customer.department = response.department;
               this.getAllsubDept(this.customer.department); */
        //     this.customer.subDepart = response.subDepart;
        if (response.license) {
          this.urls = this.docServer + '/' + response.license.docpath;
        }
        if (response.vehiclereg) {
          this.urls1 = this.docServer + '/' + response.vehiclereg.docpath;
        }
        // this.getAllDept();
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
  /******************************End Get Eplpyee By Id *********************************/
  /****************************** Get Grade list *********************************/

  private getGradeList() {
    /*// Get Information from JSON REST api
    // const url = this.restService.gradeRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
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
         (response:any) => {
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
    let datetime = '';
    const dattime1 = '';
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';


    /******************* */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dtt = new Date(ts * 1000);
    // Hours part from the timestamp
    const hours = dtt.getHours();
    // Minutes part from the timestamp
    const minutes = '0' + dtt.getMinutes();
    // Seconds part from the timestamp
    const seconds = '0' + dtt.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ':' + minutes.substr(-2);
    // alert(formattedTime);
    /*********************************************************** */

    try {
      const dateVal = '/Date(' + ts + ')/';
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else { mm = (date.getMonth() + 1).toString(); }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;

        dd = temp1;
      } else { dd = date.getDate().toString(); }

      //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
      datetime = date.getFullYear() + '-' + mm + '-' + dd;


    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

  }


  // delete Event

  deletecustomer(id: any) {
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
        const url = this.restService.delivertypoolRestURL('delete', id);
        console.log('Delete using this id:' + id);
        //  const json = '{\"id\":\"' + id + '\"}';
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
            this.getCustList();
            // Now do your stuff here
          },
          error => {
            // Error Message
            /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
               + error._body); */
            Swal.fire(
              error.statusText,
              error._body,
              'error'
            )
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

  /*****upload image********************************************************** */




  // @Input() multiple: boolean = false;



  /*****End  upload image********************************************************** */
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

  push() {
    this.cust_data.customer = this.customerId;
    console.log('pushing customer Data');
    console.log(this.cust_data);
    const cloneProduct = JSON.parse(JSON.stringify(this.cust_data));
    //  this.cust_datalist.push(cloneProduct);
    console.log('After pushing Customer Data');
    console.log(this.cust_data);
    this.cust_data.yrofmfg = '';
    this.cust_data.name = '';
    this.cust_data.regno = '';
    this.cust_data.other2v = '';
    this.submitData1(cloneProduct);

  }

  cancel1() {
    // alert('change to tab3');
    this.tab2 = false;
    this.tab3 = true;
    this.title = 'Upload/Remove Customer Document';
  }


  /*****upload image********************************************************** */


  cancel2() {
    this.route.navigate(['/managecustomer']);

  }


  // http://localhost:8090/IMBAManager/rest/customer/doc/getById/19184

  private getcustDocsbyId() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('getcustDocsbyId', this.customerId);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        this.doclist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }



  generatepass() {
    this.customer.login.password = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
  }


  // private sendmailtocust() {
  //   const email = {
  //     // role: { role: 'ADMIN' },
  //     to: this.customer.email,
  //     cc: "inouvellesolutions@gmail.com",
  //     templateId: 'custmail',
  //     contentData: {
  //       content: {
  //         message: 'Dear, ' +
  //           this.emp.fname + ' ' + this.emp.lname + '<br> Your VMBA Account is generated with following credentials:<br>'
  //         //  + ' Account Details:\n '
  //           + 'LINK : http://inouvelleapps.com/imba/  <br>'
  //           + 'Username : ' + this.emp.login.email + '<br>'
  //           + 'Password : ' + atob(this.emp.login.password) + '<br>'
  //         ,
  //       },
  //       table: [],
  //       // costtable: [],
  //       subject: 'New Account Created'
  //     }
  //   };

  //   console.log('submiti function');
  //   console.log(email);
  //   const url = this.restService.MailRestURL('send', '');
  //   this.restService.postFormData(url, email).subscribe(
  //     (response:any) => {
  //       // Responce data.
  //       console.log('Status on Post API');
  //       console.log(response);
  //     },
  //     error => {
  //       // Error Message
  //       console.log('Failed to send email message to admin');
  //     }
  //   );
  //   return 0;
  // }

  private employeemail() {
    const email = {
      // role: { role: 'ADMIN' },
      to: this.customer.email,
      cc: "amankarn26@gmail.com",
      templateId: 'simplemail',
      contentData: {
        content: {
          message: 'Dear Sir,\n \n' +
            this.customer.name + ' your account is generated \n' +
            ' Account Details:\n '
            + 'Login Id : ' + this.customer.login.username + '\n'
            + 'Password : ' + atob(this.customer.login.password) + '\n'
          ,
        },
        table: [],
        // costtable: [],
        subject: 'New Account Created'
      }
    };

    console.log('submiti function');
    console.log(email);
    const url = this.restService.MailRestURL('send', '');
    this.restService.postFormData(url, email).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
      },
      error => {
        // Error Message
        console.log('Failed to send email message to admin');
      }
    );
    return 0;
  }


  updateStatus(data: any, status: any) {

    if (status === 'APPROVED') {

    }
    const jsonobj = {
      id: data.id,
      status
    };

    console.log('Update status');
    const url = this.restService.delivertypoolRestURL('edit', '');
    console.log(jsonobj);
    this.restService.postFormData(url, jsonobj).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        this.getCustList();

        Swal.fire('', '', 'success');

        if (status === 'APPROVED') {
          this.route.navigate(['/update_areadeliverypool/' + data.id]);

        }
        window.scrollTo(0, 0);
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


  pushstockvalue() {
    this.stockval.area = this.tempvalue;

    let flagger = true;

    if (this.route.url == '/update_areadeliverypool/' + encodeURIComponent(this.id)) {
      for (const entry of this.area.dvryarea) {

        if (this.stockval.area == entry.area) {

          Swal.fire('Cannot Add Duplicate Entry', '', 'error');

          flagger = false;
        }
      }
    }
    else {
      for (const entry of this.customer['dvryarea']) {

        if (this.stockval.area == entry.area && this.stockval.pincode == entry.pincode) {

          Swal.fire('Cannot Add Duplicate Entry', '', 'error');

          flagger = false;
        }
      }
    }


    if (flagger) {
      if (this.route.url == '/update_areadeliverypool/' + encodeURIComponent(this.id)) {
        this.area.dvryarea.push(JSON.parse(JSON.stringify(this.stockval)));
      }
      else {

        this.customer['dvryarea'].push(JSON.parse(JSON.stringify(this.stockval)));

      }
      console.log(this.stockval);
      console.log(this.customer['dvryarea']);
    }
    this.stockval.area = '';
    this.stockval.pincode = '';
  }

  onDeletestockval(i, responseid: any) {
    console.log('Deleting*********************');
    // console.log(this.customer['dvryarea']);

    console.log(responseid);


    //  var areasids =[];


    //  areasids.push(JSON.parse(JSON.stringify(responseid)));
    //   const json =
    //   {
    //     container:this.id,
    //     ids :areasids
    //   }

    // console.log(json);

    // this.pstock.lotno=this.pstockArary[i].lotno;
    if (this.route.url == '/update_areadeliverypool/' + encodeURIComponent(this.id)) {
      this.area.dvryarea.splice(i, 1);

      Swal.fire(
        'Deleted!',
        '',
        'success'
      );

    }
    else {
      if (responseid === undefined) {
        this.customer['dvryarea'].splice(i, 1);

        Swal.fire('Deleted!', '', 'success');

      }
      else {


        //  this.customer['dvryarea'].splice(i, 1);
        var areasids = [];

        areasids.push(JSON.parse(JSON.stringify(responseid)));
        const json =
        {
          container: this.id,
          ids: areasids
        }

        console.log(json);
        this.deleteareasfromupdate(json);
      }
    }

  }


  private getareadata() {
    // Get Information from JSON REST api
    // http://localhost:8090/SuppChainManager/rest/employee/incharge
    var url = this.restService.delivertypoolRestURL('addarea', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.areadata = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  deleteareasfromupdate(json) {
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
        const url = this.restService.delivertypoolRestURL('areadeletefromupdate', '');
        // console.log('Delete using this id:' + id);
        //    const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response: any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getEmpById();

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



  private passdata(obj) {

    //  let stateId = obj.srcElement.value;
    // this.stockval.pincode=this.stockval.area;

    //this.getareadatabyid();
    console.log(obj);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    console.log(obj.srcElement.value);


    this.tempvalue = obj.target.options[obj.target.selectedIndex].text;
    this.stockval.pincode = obj.srcElement.value;
    // this.stockval.area=obj.target.options[obj.target.selectedIndex].text;
    // console.log('after'+this.stockval.area);
    // Call city data method
    // this.getCityList(stateId);
  }

  //   private getareadatabyid() {
  //     // Get Information from JSON REST api
  // // http://localhost:8090/SuppChainManager/rest/employee/incharge
  //     var url = this.restService.delivertypoolRestURL('getareabyid', this.stockval.area);

  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         //this.areadata = response;
  //       //  this.stockval.area=response.area;
  //         this.stockval.pincode=response.pincode;

  //         console.log(response);

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  updateareadata() {
    this.area['id'] = this.id;

    console.log('submiti function');
    const url = this.restService.delivertypoolRestURL('edit', '');
    console.log(this.area);
    this.restService.postFormData(url, this.area).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated for the Delivery Person', '', 'success');
        // this.tab1 = false;
        // //  this.tab2 = true;
        // this.tab3 = true;


        this.route.navigate(['/managedeliverypool']);
        window.scrollTo(0, 0);

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




  fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      // this.fileName = this.user.category;


      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);


      console.log('Inside multiple file select');

    }
    // alert(this.fileName);
    // alert('file event end');
    // preview
  }



  uploadfile() {

    if (this.file) {
      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.license.docname = this.file.name;
      this.license.doctype = 'LIC';
      this.license.docpath = this.deliverypoolid + '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);

      // docFormData.append('doc', this.file, rname + this.file.name);
      // // docFormData.append('name', 'Category');
      // docFormData.append('width', '400');
      // docFormData.append('height', '400');
      // docFormData.append('name', 'discount');
      // var docurl = this.restService.docsRestURL('upload', '');


      docFormData.append('doc', this.file, rname + this.file.name);

      docFormData.append('width', '400');
      docFormData.append('height', '400');
      docFormData.append('name', this.deliverypoolid);
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


  submitdoc() {

    let docs = {
      id: this.deliverypoolid,
      license: this.license
    };

    console.log('submiti function');
    var url = this.restService.delivertypoolRestURL('photoadd', '');
    console.log(url);
    this.restService.postFormData(url, docs).subscribe(
      (response: any) => {
        // Responce data.
        this.deliverypoolid = response.id;
        console.log('Status on Post API');
        console.log(response);
      },
      error => {
        // Error Message
        // this.alertify.alert('<b>Failed to add Firm Logo</b><br>' + error.statusText + '<br>'
        //   + error._body);
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }

  fileEvent1(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != '') {
      this.file1 = fileInput.target.files[0];
      // this.fileName = this.user.category;


      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls1 = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);


      console.log('Inside multiple file select');

    }
    // alert(this.fileName);
    // alert('file event end');
    // preview
  }



  uploadfile1() {

    if (this.file1) {
      const fileExtension = '.' + this.file1.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.vehiclereg.docname = this.file1.name;
      this.vehiclereg.doctype = 'REG_NUM';
      this.vehiclereg.docpath = this.deliverypoolid + '/' + rname + this.file1.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file1, this.file1Name);
      docFormData.append('doc', this.file1, rname + this.file1.name);


      docFormData.append('width', '400');
      docFormData.append('height', '400');
      
      docFormData.append('name', this.deliverypoolid);
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


  submitdoc1() {

    let docs = {
      id: this.deliverypoolid,
      vehiclereg: this.vehiclereg
    };

    console.log('submiti function');
    var url = this.restService.delivertypoolRestURL('photoadd', '');
    console.log(url);
    this.restService.postFormData(url, docs).subscribe(
      (response: any) => {
        // Responce data.
        this.deliverypoolid = response.id;
        console.log('Status on Post API');
        console.log(response);
      },
      error => {
        // Error Message
        // this.alertify.alert('<b>Failed to add Firm Logo</b><br>' + error.statusText + '<br>'
        //   + error._body);
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }


  public onDeletefromdb(id: number) {


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
        const url = this.restService.delivertypoolRestURL('areadelete', id);
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
            this.getEmpById();

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


  sendVendorSMS() {
    const message = 'Your Account is Generated :' + '\r\nUser Name: ' + this.customer.login.username + '  Password: ' + atob(this.customer.login.password);

    let mobile = this.customer.login.username;

    const smsdata = {
      toMobile: mobile,
      message: message
    };

    console.log('sending sms');
    console.log(smsdata);
    const url = this.restService.smsRestURL('send', '');

    console.log(url);
    this.restService.postFormData(url, smsdata).subscribe(
      response => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
      },
      error => {
        console.log('Error in SMS.');
      }
    );
    return 0;
  }


  private getState() {
    // Get Information from JSON REST api
    var url = this.restService.PincodeRestURL('', this.customer.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.customer.address.states = response.state_name;
        this.customer.address.city = response.city_name;


        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getallfirm() {

    var url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.firmlist = response;

        // let arry

        //   for(let data of response)
        //   {
        //     if(data.)
        //   }


      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  passdeliverypool(obj) {
    this.customer['vendor'] = obj.target.options[obj.target.selectedIndex].text;
  }
}

