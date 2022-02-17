import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';

declare var Swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public docServer = this.restService.docServer;
  public url = sessionStorage.getItem('photo');

  public userRole = sessionStorage.getItem('role');
  public username = sessionStorage.getItem('name');

  public userType = sessionStorage.getItem('type');
  public id = sessionStorage.getItem('id');

  public islogin = sessionStorage.getItem('islogin');
  public lastlogin;
  // branch;

  public usernamefromresponse;
  public newpassword;
  public confirmpassword;
  public title = 'Profile Details';

  public licphoto;
  public emp = {
    fname: '',
    mname: '',
    lname: '',
    name: '',
    designation: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '',
      city:'',
      country: 'India'
    },
    etype: '',
    phone: '',
    login: {
      email: '',
      password: '',
      type: 'EMPLOYEE'
    },
    dob: '',
    depname: '',
    dateOfJoin: '',
    grade: '',
    role: { role: '' },
    gender: '',
    salary: '',
  };

  public branch = {
    firm: sessionStorage.getItem('firm'),

    name: '',
    phone: '',
    email: '',
    branchtype: '',
    
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '',
      city:'',
      latitude:'',
      longitude:'',
      country: 'India'
    },
    // etype: '',
   
    login: {
      // email: '',
      username: '',
      password: '',
      type: 'BRANCH',
      role: 'BRANCH'

    },
    // dob: '',
    // depname: '',
    // dateOfJoin: '',
    // grade: '',
    // role: { role: '' },
    // gender: '',
    // salary: '',
  };

  public photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '' },
  };

  public customer = {
    fname: '',
    mname: '',
    lname: '',
    name: '',
    designation: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '',
      city: '',
      country: 'India'
    },
    phone: '',
    login: {
      email: '',
      password: '',
      type: 'CUSTOMER',
    },
    role: { role: '' },
    appIndOr: '',
    priority: '',
    shopname:'',
  };

  constructor(public restService: RestService,
  public router: Router,) { }

  ngOnInit() {

//     if(this.islogin){
//       this.router.navigate(['/profile']);
//     }
// else{

//   this.router.navigate(['/authentication']);
// }

    if (this.userType ==='FIRM'){
      this.getEmpById();
    } else if (this.userType =='BRANCH') {
      this.getBranchById();
    } 
    else if (this.userType ==='DELIVERY_PERSON') {
      this.getDeliverypoolbyid();
    } 
    else {
      this.getCustById();
    }
  }

  public getEmpById() {

    // Get Information from JSON REST api
    const url = this.restService.firmRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        // this.data=response;
    //  this.lastlogin=response.lastlogin;

      //  this.getCityList(response.address.states);

        // this.emp.dob = this.unixTimeConverter(response.dob);
        // this.emp.fname = response.fname;
        // this.emp.mname = response.mname;
        // this.emp.lname = response.lname;
        // this.emp.phone = response.phone;
        // this.emp.login.email = response.login.email;

        // // this.emp.guardian = response.guardian;
        // // this.emp.mstate = response.mstate;
        // this.emp.login.password = response.login.password;

        // this.emp.designation = response.designation;
        // this.emp.gender = response.gender;
        // // this.emp.panno = response.panno;
        // this.emp.etype = response.etype;

        // this.emp.address.line1 = response.address.line1;
        // this.emp.address.line2 = response.address.line2;
        // this.emp.address.pincode = response.address.pincode;
        // this.emp.address.states = response.address.states;
        // this.emp.address.city = response.address.city;
        // this.emp.address.country = response.address.country;


        // this.emp.role.role = response.login.role;
        // this.emp.grade = response.grade;
        // this.emp.depname = response.depname;
        // this.emp.salary = response.salary;
        // this.emp.dateOfJoin = response.dateOfJoin;
        //  this.getAllsubDept(this.emp.department);
        //  this.emp.subDepart = response.subDepart;
        this.emp=response;
        this.usernamefromresponse=response.login.username;

        if (response.logo ) {

          this.url = this.docServer + '/' + response.logo.docpath;
        }


        console.log(this.emp);
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
  
  public getBranchById() {

    // Get Information from JSON REST api
    const url = this.restService.branchRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Branch by id');
        console.log(response);
        // this.data=response;
        //  this.lastlogin=response.lastlogin;

        //  this.getCityList(response.address.states);

        // this.emp.dob = this.unixTimeConverter(response.dob);
        // this.emp.fname = response.fname;
        // this.emp.mname = response.mname;
        // this.emp.lname = response.lname;
        // this.emp.phone = response.phone;
        // this.emp.login.email = response.login.email;

        // // this.emp.guardian = response.guardian;
        // // this.emp.mstate = response.mstate;
        // this.emp.login.password = response.login.password;

        // this.emp.designation = response.designation;
        // this.emp.gender = response.gender;
        // // this.emp.panno = response.panno;
        // this.emp.etype = response.etype;

        // this.emp.address.line1 = response.address.line1;
        // this.emp.address.line2 = response.address.line2;
        // this.emp.address.pincode = response.address.pincode;
        // this.emp.address.states = response.address.states;
        // this.emp.address.city = response.address.city;
        // this.emp.address.country = response.address.country;


        // this.emp.role.role = response.login.role;
        // this.emp.grade = response.grade;
        // this.emp.depname = response.depname;
        // this.emp.salary = response.salary;
        // this.emp.dateOfJoin = response.dateOfJoin;
        //  this.getAllsubDept(this.emp.department);
        //  this.emp.subDepart = response.subDepart;
        this.branch=response;
        this.usernamefromresponse=response.login.username;

        if (response.photo ) {

          this.url = this.docServer + '/' + response.photo.docpath;
        }

        console.log(this.branch);
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  public getCustById() {

    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        // this.data=response;
      this.customer=response;
      this.usernamefromresponse=response.login.username;
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  public getDeliverypoolbyid() {

    // Get Information from JSON REST api
    const url = this.restService.delivertypoolRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
      
        console.log('Getting Emp by id');
        console.log(response);
        // this.data=response;
      this.customer=response;
      this.usernamefromresponse=response.login.username;
      
      if (response.vehiclereg ) {

        this.url = this.docServer + '/' + response.vehiclereg.docpath;
      }

      if (response.license ) {

        this.licphoto = this.docServer + '/' + response.license.docpath;
      }



      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  public unixTimeConverter(ts) {
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

  public todatDate() {

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

    d = datee.getFullYear() + '-' + mm + '-' + dd +' '+ datee.getHours() + ":" + datee.getMinutes() + ":" + datee.getSeconds();
    // this.news.published = d.toString();
    // Next hearing end
    return d.toString();

  }

  changepassowrd()
  {
    if(this.newpassword === this.confirmpassword)
    {



   var changepass=
    {
      username:this.usernamefromresponse,
      password:this.confirmpassword
    }
    changepass.password = window.btoa(changepass.password);
console.log(changepass);
      const url = this.restService.loginRestURL('edit', '');
      this.restService.postFormData(url, changepass).subscribe(
        (response:any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          document.getElementById('id01').style.display='none';
          Swal.fire('Password Changed','','success');

        },
        error => {
          // Error Message
          console.log('Failed to send email message to admin');
        }
      );
      return 0;
  }
  else
  {
    Swal.fire('Password not matched','','info');
  }
  }
}
