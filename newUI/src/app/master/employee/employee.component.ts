import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
  // for update employee

  public docServer =this.restService.docServer;

  public dept;
  public isUpdate = false;
  private id;
  private gradeList;
  public url;
  private file;
  private fileName;
  // public docServer = this.restService.docServer;
  private generatepassword;
  private emp = {
    firm:sessionStorage.getItem('firm'),
    erpid: '12',
    fname: '',
    mname: '',
    lname: '',
    name: '',
    department: '',
    designation: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India'
    },
    phone: '',
    role: { role: '' },
    login: {
      username: '',
      password: '',
      type: 'EMPLOYEE',
      role: ''
    },
    salary: '',
    gender:'',
    email:'',


  };

  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary:'NO' },
  };
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'id';
  public sortOrder = 'asc';
  public data;
  private empId;

  constructor(
    private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }



  ngOnInit() {

    // Read parameter from route
    console.log(this.routprms.snapshot.params['eid']);
    this.empId = this.routprms.snapshot.params['eid'];
    this.id = this.routprms.snapshot.params['eid'];





    if (this.route.url === '/updateemployee/' + encodeURIComponent(this.empId)) {
      this.title = 'Update Employee ';
      this.subtitle = 'Edit Employee  details.';
      this.flag = true;
      this.isUpdate = true;
      //  this.updateEmp();
      this.getRoleList();
      this.getEmpById();
      this.getGradeList();
      this.getDepList();

      //  this.getAllDept();
    } else if (this.route.url == '/addemployee') {
      this.title = 'Add Employee ';
      this.subtitle = 'Enter employe details.';
      this.flag = true;
      this.getRoleList();
      this.getGradeList();
      this.getDepList();
      //   this.getAllDept();

    }
    else if (this.route.url === '/detailemployee/' + encodeURIComponent(this.empId)) {
      this.title = 'Employee Details';
      this.subtitle = '';
      this.flag = true;
      this.isUpdate = true;
      this.detailFlag = true;
      //  this.updateEmp();
      // this.getRoleList();
      this.getEmpById();
      // this.getGradeList();
      // this.getAllDept();
      //  this.getAllDept();
    }
    else {
      this.title = 'Manage Employee';
      this.subtitle = 'Manage Employe information including view, add, update and delete';
      this.flag = false;
      this.getEmpList();
    }
  }


  /******************************POST DATA ********************************************/
  private submitData() {

    this.emp.login.role =this.emp.role.role;
    this.emp.email =this.emp.login.username;
    this.emp.name = this.emp.fname + ' ' + this.emp.mname + ' ' + this.emp.lname;


            // if (this.emp.role.role === 'ADMIN' || this.emp.role.role === 'SUPERADMIN') {

            //   this.emp.login.type ='EMPLOYEE';
            // }else{

            //   this.emp.login.type = this.emp.role.role;
            // };

    this.emp.login.password = window.btoa(this.emp.login.password);
    // alert('login time encrypted password is :' + this.emp.login.password);

    console.log('submitData function');
    console.log(this.emp);
    const url = this.restService.empRestURL('add', '');
    this.restService.postFormData(url, this.emp).subscribe(
     ( response:any) => {
        this.employeemail();
        this.employeeid=response.id;
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        if (this.file) {
          this.photo.id = response.id;
          this.photoAdd();
        }  else {
          Swal.fire('Added', '', 'success');
          window.scrollTo(0, 0);
          this.route.navigate(['/manageemployee']);
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
    return 0;
  }


  generatepass() {
    this.generatepassword = this.emp.fname.charAt(0).toUpperCase() + this.emp.fname.slice(1) + '@' + Math.random().toString(36).slice(-8);

    this.emp.login.password = this.generatepassword;

  }


  private photoAdd() {

        this.uploadfile();
        // if (this.uploadfile()){
        console.log('submitData function');
        console.log(this.photo);
        const url = this.restService.empRestURL('photoadd', '');
        this.restService.postFormData(url, this.photo).subscribe(
         ( response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            // Now do your stuff here
            Swal.fire('Added', '', 'success');
            window.scrollTo(0, 0);
            this.route.navigate(['/manageemployee']);
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





  updateData() {
    //  if (this.dtCompare) {
    //  this.emp.push({ 'id': this.id});

    this.emp['id'] = this.id;
    // alert(this.id);

    if (this.file) {

      this.uploadfile();
      this.photo.id = this.id;
      delete this.emp['id'];
      this.emp['photo']=this.photo.photo;
    } else {
      delete this.emp['photo'];
    }



    console.log('submiti function');
    // console.log(this.model.username);


    const url = this.restService.empRestURL('edit', '');
    this.emp['id'] = this.id;
    console.log(this.emp);
    this.restService.postFormData(url, this.emp).subscribe(
     ( response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('', '', 'success');
          this.route.navigate(['/manageemployee']);
          window.scrollTo(0, 0);
        // this.route.navigate(['/manageemployee']);

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
  // }

  /******************************END POST DATA ********************************************/


  /******************************GET DATA ********************************************/
  // Get role list
  private getRoleList() {
    // // Get Information from JSON REST api
    // //this.rolelist=[];
    // const url = this.restService.roleRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //  ( response:any) => {
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
  private getDepList() {
    // // Get Information from JSON REST api
    // //this.rolelist=[];
    // const url = this.restService.departmentRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //  ( response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.deplist = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }
  // Get State List

  private getStateList() {
    // // Get Information from JSON REST api
    // const url = this.restService.stateRestURL('', 'India');
    // this.restService.getJSONFromURL(url).subscribe(
    //  ( response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.statelist = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }


  // private getPinList() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.PincodeRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response:any) => {
  //       // this.restService.getJSONFromURL(response);
  //       this.pincodelist = response;
  //       console.log('pincode data available');
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
    const url = this.restService.empRestURL('employee', sessionStorage.getItem('deployacct'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
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
    this.citylist = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  private getCityList1(stateId) {
    this.citylist1 = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
        this.citylist1 = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getAllsubDept(dept) {
    // Get Information from JSON REST api
    /*  const url = this.restService.subdepartmentRestURL('byname', dept);
      this.restService.getJSONFromURL(url).subscribe(
       ( response:any) => {
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
    var url = this.restService.PincodeRestURL('',this.emp.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.emp.address.states=response.state_name;
        this.emp.address.city=response.city_name;


        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  /******************************End Get Data*************************************** */

  /******************************Get Eplpyee By Id *********************************/

  private getEmpById() {

      // Get Information from JSON REST api
      const url = this.restService.empRestURL('details', this.id);
      this.restService.getJSONFromURL(url).subscribe(
       ( response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log('Getting Emp by id');
          console.log(response);
          // this.data=response;
          this.employeeid =this.id;
       //   this.emp.dob = this.unixTimeConverter(response.dob);
          this.emp.fname = response.fname;
          this.emp.mname = response.mname;
          this.emp.lname = response.lname;
          this.emp.phone = response.phone;
         this.emp.login.username = response.email;
         this.emp.department=response.department;
         this.emp.designation=response.designation;
         this.emp.role.role=response.role.role;
         this.emp.login.username=response.login.username;
         this.emp.login.password=response.login.password;
         this.emp.login.role=response.login.role;
         this.emp.login.type=response.login.type;
         this.emp.salary=response.salary;
         this.emp.address.city=response.address.city;
         this.emp.address.pincode=response.address.pincode;
         this.emp.address.line1=response.address.line1;
         this.emp.address.line2=response.address.line2;
         this.emp.address.states=response.address.states;
         this.emp.address.country=response.address.country;


         // this.emp.guardian = response.guardian;
        //  this.emp.mstate = response.mstate;
          this.emp.login.password = response.password;

          this.emp.designation = response.designation;
          this.emp.gender = response.gender;
      //    this.emp.panno = response.panno;
      //    this.emp.etype = response.etype;

       //   this.emp.address.line1 = response.address.line1;
      //    this.emp.address.line2 = response.address.line2;
      //    this.emp.address.pincode = response.address.pincode;
      //    this.emp.address.states = response.address.states;
      //    this.emp.address.city = response.address.city;
      //    this.emp.address.country = response.address.country;

       //  this.emp.permAddress.line1 = response.permAddress.line1;
       //   this.emp.permaddress.line2 = response.permaddress.line2;
      //    this.emp.permAddress.pincode = response.permAddress.pincode;
       //   this.emp.permAddress.states = response.permAddress.states;
      //    this.getCityList1(this.emp.permAddress.states);
      //    this.emp.permAddress.city = response.permAddress.city;
      //    this.emp.permAddress.country = response.permAddress.country;

        //  this.emp.login.role = response.login.role;
      //    this.emp.grade = response.grade;
          this.emp.department = response.department;
        //  this.getAllsubDept(this.emp.department);
     //     this.emp.subDepart = response.subDepart;
          if (response.photo) {
            this.url = this.docServer + '/' + response.photo.docpath;
           // alert(this.url);
          }
          // this.getAllDept();
        },
        error => {
          console.log('Error in data load.');
        }
      );

  }
  private employeemail() {
    // const email = {
    //   // role: { role: 'ADMIN' },
    //   to: this.emp.login.username,
    //   cc: "inouvellesolutions@gmail.com",
    //   templateId: 'simplemail',
    //   contentData: {
    //     content: {
    //       message: 'Dear Sir,\n \n' +
    //         this.emp.fname + ' ' + this.emp.lname + ' your account is generated \n' +
    //         ' Account Details:\n '
    //         + 'Login Id : ' + this.emp.login.username + '\n'
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
    //  ( response:any) => {
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
     ( response:any) => {
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
        ( response:any) => {
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

  deleteEmployee(id: any) {

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
        const url = this.restService.empRestURL('delete', id);
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
         ( response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )

            this.getEmpList();
            this.route.navigate(['/manageemployee']);
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

  fileEvent(fileInput: any) {
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log('Inside multiple file select');
    }
  }



  // @Input() multiple: boolean = false;



  uploadfile() {
    if (this.file) {

      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.photo.docname = this.file.name;
      this.photo.photo.doctype = 'PROFILE';
      this.photo.photo.docpath =  'Employee/'+this.employeeid+ '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      docFormData.append('name', 'Employee'+'/'+this.employeeid);
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

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
}
