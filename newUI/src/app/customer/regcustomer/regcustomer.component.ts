import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-regcustomer',
  templateUrl: './regcustomer.component.html',
  styleUrls: ['./regcustomer.component.css']
})
export class RegcustomerComponent implements OnInit {
  public sameadd = false;
  public title;
  public subtitle;
  public flag = false;
  public detailFlag = false;
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
  private file;
  private fileName;
  public generatepassword;
  public docname;

  showpassword=false;
   public docServer = this.restService.docServer;
  private customer = {
    // firm: sessionStorage.getItem('firm'),
    //   deployacct: sessionStorage.getItem('deployacct'),
    // shopname:'',
    // fname: '',
    // mname: '',
    // lname: '',
    name:'',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    // role: {
    //   role: 'USER',
    //   description: ''
    // },
    login: {
      type: 'CUSTOMER',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'CUSTOMER'
    },
   // profession: '',
   // gst: '',
   // pan: '',
    city: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India'
    },

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
  public data;
  private empId;
  public doctype;
  public doclist = [];

  // upload file
  private document;
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

  private otp;
  private userotp;

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

 //   console.log(this.routprms.snapshot.params['eid']);
    this.empId = this.routprms.snapshot.params['id'];
    this.id = this.routprms.snapshot.params['id'];
   // alert('custpge');
    if (this.route.url === '/updatecustomer/' + encodeURIComponent(this.empId)) {
      this.title = 'Update Customer ';
      this.subtitle = 'Edit customer  details.';
      this.flag = true;
      this.isUpdate = true;
      this.customerId = this.id;
      //  this.updateEmp();
      this.getRoleList();
      this.getEmpById();
      this.getGradeList();
      this.getcustDatabyId();
      this.getcustDocsbyId();

      //  this.getAllDept();
    } else if (this.route.url == '/custregisteration/'+ encodeURIComponent(this.empId)) {
      this.getPosition();
      this.title = 'Registeration Form ';
      this.subtitle = 'Enter employe details.';
      this.flag = true;
      this.getRoleList();
      this.getGradeList();
      this.generatepass();

      this.customer.login.username = this.id;
      this.customer.phone=this.id;
      // alert('add customer');
      //   this.getAllDept();
      // this.tab1 = false;
      // this.tab2 = true;
    } else {
      this.title = 'Manage Customer';
      this.subtitle = 'Manage Employe information including view, add, update and delete';
      this.flag = false;
      this.getCustList();
    }
  }

  /******************************POST DATA ********************************************/
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          console.log(resp.coords.longitude);
          console.log(resp.coords.latitude);

  this.customer.address['latitude'] =resp.coords.longitude;
  this.customer.address['longitude'] = resp.coords.latitude;
        },
        err => {
          reject(err);
          alert('This page has been blocked from tracking your location, You will be charged higher Delivery Charges');

        });
    });

  }
  // tab1 start
  private submitData() {

    this.customer.address.line2=this.customer.address.line2.toUpperCase();


    console.log('Customer json in submit');
    console.log(this.customer);

    this.customer.city = this.customer.address.city;
   // if (this.customer.pan != '' || this.customer.gst != '') {

    // if (this.customer.pan === '') {
    //   delete this.customer.pan;
    // }

    this.customer.login.password = window.btoa(this.customer.login.password);
    console.log('submitData function');
    console.log(this.customer);
    const url = this.restService.customerRestURL('add', '');
    this.restService.postFormData(url, this.customer).subscribe(
     (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);

        // Now do your stuff here
        this.customerId = response.id;


        // sessionStorage.setItem('id', response.id);
        // sessionStorage.setItem('name', response.name);
        // sessionStorage.setItem('type', response.login.type);
        // sessionStorage.setItem('islogin', 'true');
        // localStorage.setItem('islogin', 'true');
        // sessionStorage.setItem('email', response.login.email);
        // this.route.navigate(['/custhomepage']);
        // location.reload();
     //   this.tab1 = false;
      //  // this.tab3 = true;
      //  this.tab2 = true;
        // if (this.isUpdate) {
        //   this.title = 'Update Customer Data';
        // } else {
        //   this.title = 'Add Customer Data';
        // }

       // Swal.fire('', '', 'success');
       
     
        Swal.fire('Account Created', 'Please Login From Portal', 'success');
        this.sendVendorSMS();
        this.route.navigate(['/login']);
        window.scrollTo(0, 0);
       
      },
      error => {
        // Error Message
        this.generatepass();
        Swal.fire(
          'Error:'+ error.status,
          error.error,
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
    this.customer.city = this.customer.address.city;
    this.customer['id'] = this.id;

    if (this.file) {

      this.uploadfile();
    } else {
      delete this.customer['photo'];
    }
    console.log('submiti function');
    const url = this.restService.customerRestURL('edit', '');
    console.log(this.customer);
    this.restService.postFormData(url, this.customer).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('', '', 'success');
        this.tab1 = false;
      //  this.tab2 = true;
        this.tab3 = true;
        if (this.isUpdate) {
          this.title = 'Update Customer Data';
        } else {
          this.title = 'Add Customer Data';
        }

        // this.route.navigate(['/managecustomer']);
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

    // const url = this.restService.customerRestURL('addcustdata', '');
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

  private getStateList() {
    // Get Information from JSON REST api
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
   // alert(this.sameadd);
  }
  // GET USER customer LIST
  /******************************get data ********************************************/
  private getCustList() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('customer', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
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
    // this.citylist = [];
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
    const url = this.restService.customerRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
     (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        // this.data=response;

    //    this.customer.dob = this.unixTimeConverter(response.dob);
      //  this.customer.fname = response.fname;
       // this.customer.mname = response.mname;
       // this.customer.lname = response.lname;
        this.customer.phone = response.phone;
        this.customer.email = response.email;
       // this.customer.profession = response.profession;
   //     this.customer.pan = response.pan;
     //   this.customer.gst = response.gst;
        this.customer.city = response.city;
        this.customer.address.line1 = response.address.line1;
        this.customer.address.line2 = response.address.line2;
        this.customer.address.states = response.address.states;
        this.customer.address.city = response.address.city;
        this.customer.address.pincode = response.address.pincode;
       // this.customer.shopname= response.shopname;

        /*  this.customer.password = response.password;

         this.customer.designation = response.designation; */
        this.customer.gender = response.gender;

        this.customer.login.username=response.login.username;
        //    this.customer.panno = response.panno;
        //    this.customer.etype = response.etype;

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
        if (response.photo) {
          this.url = this.docServer + '/' + response.photo.docpath;
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
    //     const url = this.restService.customerRestURL('delete', '');
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
    //         this.getCustList();
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

  /*****upload image********************************************************** */

  fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      // this.fileName = this.user.category;


      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);


      console.log('Inside multiple file select');

    }
    // alert(this.fileName);
    // alert('file event end');
    // preview
  }



  // @Input() multiple: boolean = false;

  uploadfile() {
    /*
        if (this.file) {
          const fileExtension = '.' + this.file.name.split('.').pop();
          const rname = Math.random().toString(36).substring(7) + new Date().getTime();

          let objDoc = new Object();
          this.customer.photo.docname = this.file.name;
          this.customer.photo.doctype = 'Scanning';
          this.customer.photo.docpath = 'customer' + '/' + rname + this.file.name;

          var docFormData = new FormData();
          // docFormData.append('doc', this.file, this.fileName);
          docFormData.append('doc', this.file, rname + this.file.name);
          docFormData.append('name', 'customer');
          var docurl = this.restService.docsRestURL('upload', '');
          console.log(docurl);

          this.restService.uploadFormData(docurl, docFormData).subscribe(
            (response:any) => {
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
    */
  }



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

  private getState() {
    // Get Information from JSON REST api
    var url = this.restService.PincodeRestURL('', this.customer.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
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
  fileEvent1(event: any) {
    this.urls = [];
    this.fileArray = [];
    this.urls = [];
    this.fileArray = [];
    // const filesAmount = event.target.files.length + this.calculatelength;
    const files = event.target.files;
    // if (files && filesAmount < 6) {
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.fileArray.push(file);
          console.log(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Swal.fire(
      //   'Please Add Atleast One Image',
      //   'You can upload upto 5 images only',
      //   'error'
      // );
    }
  }



  uploadcustdocs() {
    if (this.fileArray.length > 0) {
      console.log('uploadfile function');
      for (const file of this.fileArray) {
        const fileExtension = '.' + file.name.split('.').pop();
        const rname = Math.random().toString(36).substring(7) + new Date().getTime();
        let objDoc = new Object();
        objDoc['docname'] = file.name;
        objDoc['docpath'] = sessionStorage.getItem('firm') + '/Customer/' + this.customerId + '/' + rname + file.name;
        objDoc['doctype'] = 'PROFILE';
        objDoc['isprimary'] = 'YES';

        this.docArray.push(objDoc);
        const docFormData = new FormData();
        docFormData.append('doc', file, rname + file.name);
        docFormData.append('name', sessionStorage.getItem('firm') + '/Customer/' + this.customerId);
        const docurl = this.restService.customUpload('upload', '');
        console.log(docurl);
        this.restService.uploadFormData(docurl, docFormData).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Upload API');
            console.log(response);
          },
          error => {
            // Error Message
            console.log('Error in doc upload .');
          }
        );
      }
      this.submitDocarray(); // postint doc array
      return 0;
    } else {
      Swal.fire(
        'Please Select Minimum One Image',
        '',
        'error'
      );
      // Swal.fire(
      //   'Atleast One Image Is Mandotary',
      //   'Maximum 5 Images can be uploaded',
      //   'error'
      // );
    }
  }

  private submitDocarray() {


    let doc = {
      customer: this.customerId,
      doctype: this.doctype,
      name: this.docname,
      details: this.docdetails,
      document: this.docArray['0']
    };
    console.log('submitDocarray function');
    console.log(doc);
    const url = this.restService.customerRestURL('docarray', '');
    this.restService.postFormData(url, doc).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('', '', 'success');
        this.doctype = '';
        this.docname = '';
        this.docdetails = '';
        this.docArray = [];
        this.urls = [];

        this.file = null;
        this.document = '';
        this.getcustDocsbyId();
        this.getcustDatabyId();
        // this.route.navigate(['/managecustomer']);
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


  cancel2() {
    this.route.navigate(['/managecustomer']);

  }


  // http://localhost:8090/IMBAManager/rest/customer/doc/getById/19184

  private getcustDocsbyId() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('getcustDocsbyId', this.customerId);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        this.doclist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getcustDatabyId() {
    // // Get Information from JSON REST api
    // const url = this.restService.customerRestURL('getcustDatabyId', this.customerId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     this.cust_datalist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  delcustdoc(delid: any) {
    // // http://localhost:8090/IMBAManager/rest/customer/doc/delete
    // console.log('Deleting doc by id =' + delid);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'It will delete from all places wherever it is in used!',
    //   type: 'Warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code
    //     const url = this.restService.customerRestURL('delcustdoc', '');
    //     console.log('Delete using this id:' + delid);
    //     // const json = '{\"id\":\"' + id + '\"}';
    //     const json = {

    //       id: delid
    //       // container: this.customerId,
    //       // ids: [delid]
    //     };
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
    //         this.getcustDocsbyId()
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
    //       });
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


  delcustdata(delid: any) {
    // // http://localhost:8090/IMBAManager/rest/customer/doc/delete
    // console.log('Deleting doc by id =' + delid);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'It will delete from all places wherever it is in used!',
    //   type: 'Warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code
    //     const url = this.restService.customerRestURL('delcustdata', '');
    //     console.log('Delete using this id:' + delid);
    //     // const json = '{\"id\":\"' + id + '\"}';
    //     const json = {

    //       id: delid
    //       // container: this.customerId,
    //       // ids: [delid]
    //     };
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
    //         this.getcustDatabyId();
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
    //       });
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


  generatepass() {
    this.customer.login.password = String( Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
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


  vefifyotp() {
    console.log('OTP VERIFICATION CODE');
    console.log('this.otp' + this.otp);
    console.log('this.userotp' + this.userotp);
    if (Number(this.otp) == Number(this.userotp)) {
      this.submitData();
    } else {
      Swal.fire(
        'OTP NOT MATCHED',
        '',
        'error'
      );
    }

  }

  sendOtop(){

    this.submitData();
    // console.log('send otp code to customers mobile');

    // this.otp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
    // alert('customer otp = ' + this.otp);
    // this.tab1 = false;
    // this.tab2 = true;
  }

  showpass()
  {
    this.showpassword= true;
  }

  hidepass()
  {
    this.showpassword= false;
  }

  sendVendorSMS() {
    const message = 'Your Account is Generated :' + '\r\nUser Name: ' + this.customer.login.username + '  Password: ' + atob(this.customer.login.password);
  
    let mobile =  this.customer.login.username;
  
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
  
}

