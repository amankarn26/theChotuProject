
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public username = '';
  public password = '';
  public cookies = Object;
  public flag = true;
  public islogin = false;
  public loginStatus = false;

  public verifyotp = false;

  public regFlag = false;
  public verifyFlag = false;
  public matchstring;
  public otp;
  public otpp;
  public checknumberexists;
  newpassword = false;

  public showotpcontainer = false;
  public reg = {
    type: 'CUSTOMER',
    phone: '',
  };

  public userotp;

  public loginwithOTP = false;

  public role;
  private user = { 'username': '', 'password': '' };

  public otpResendButton = "Resend OTP"

  constructor(private restService: RestService,
    private route: Router,
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  ngOnInit() {
    if (sessionStorage.getItem('islogin')) {
      this.loginStatus = true;
      this.loginRedirect();
    }

    // this.cookies = Cookie.getAll();
    if (this.cookies['openapplogin'] !== undefined) {
      this.flag = false;
    }
  }

  //  logindelay() {
  //   setTimeout(function() { this.loginFunc(); }, 3000);
  // }

  logindelay() {
    setTimeout(() => {
      this.loginFunc();
      // console.log("Hello from setTimeout");
    }, 1000);
  }

  public loginFunc() {

    if ((this.user.username !== '') && (this.user.password !== '')) {
      // login code start**************************************************************************************
      console.log('submitData function');
      console.log(this.user);
      const url = this.restService.userRestURL('login', '');
      this.user.password = window.btoa(this.user.password); // added on 5/1/2019
      this.restService.postFormData(url, this.user).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          // licensed expiry code
          let firm;
          // let expiredon = new Date(this.unixTimeConverter(response.expiredon));
          // let todaydate = this.todatDate(); // new Date();
          // let d1 = new Date(todaydate);
          // let d2 = new Date(expiredon);
          // if (d1 < d2) {
          // } else {
          //  Swal.fire('Your Demo Expired', 'Please, Contact Invouelle Ventrues Pvt. Ltd. For Reneual', 'error');
          // }
          // // end licenses expiry code
          // if (response.role.role !== 'NO_ACCESS' && d1 < d2) {
          if (response.login.role !== 'NO_ACCESS') {

            sessionStorage.setItem('id', response.id);
            sessionStorage.setItem('name', response.name);
            localStorage.setItem('id', response.id);
            localStorage.setItem('name', response.name);
            // sessionStorage.setItem('firm', response.firm);
            // sessionStorage.setItem('deployacct', response.deployacct);
            // sessionStorage.setItem('fname', response.fname);
            sessionStorage.setItem('role', response.login.role);
            sessionStorage.setItem('type', response.login.type);
            sessionStorage.setItem('category', response.category);

            localStorage.setItem('role', response.login.role);
            localStorage.setItem('type', response.login.type);
            localStorage.setItem('category', response.category);

            sessionStorage.setItem('islogin', 'true');
            localStorage.setItem('islogin', 'true');
            sessionStorage.setItem('email', response.login.email);
            sessionStorage.setItem('pincode', response.address.pincode);

            localStorage.setItem('email', response.login.email);
            localStorage.setItem('pincode', response.address.pincode);

            if (response.photo) {
              sessionStorage.setItem('photo', response.photo.docpath);
              localStorage.setItem('photo', response.photo.docpath);

            }
            if (response.phone) {
              sessionStorage.setItem('phone', response.phone);
              localStorage.setItem('phone', response.phone);

            }

            this.islogin = true;
            // location.reload();

            if (response.login.type === 'BRANCH') {

              sessionStorage.setItem('branch', response.id);
              localStorage.setItem('branch', response.id);

            }



            if (response.login.type === 'FIRM') {
              firm = response.id;
              sessionStorage.setItem('firm', firm);
              localStorage.setItem('firm', firm);

              this.getsysconfig(firm);
              sessionStorage.setItem('photo', response.logo.docpath);
              localStorage.setItem('photo', response.logo.docpath);


            } else {
              location.reload();
            }
          }
        },
        error => {
          // Error Message
          console.log('Error in data load.');
          Swal.fire(
            'Invalid user ID or Password',
            '',
            'error'
          );
          this.user.password = '';
        }
      );
      return 0;

      // login code end***************************************************************************************
      //  location.reload();

    } else {
      Swal.fire(
        'Please provide user ID and Password.',
        '',
        'error'
      );
    }
  }

  private getsysconfig(fid: any) {
    // Get Information from JSON REST api
    //  alert('get sys config');

    const url = this.restService.branchRestURL('config', fid);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        const datalist = response;
        for (let etnry of datalist) {
          sessionStorage.setItem(etnry.name, etnry.value);
        }
        location.reload();
      },
      error => {
        console.log('Error in data load.');
      }
    );

    //  alert('sfas');
  }

  private verifyMail() {
    // sending mail with random generated password
    const randomstring = Math.random().toString(36).slice(-8);
    this.matchstring = randomstring;

    //  this.otp = this.matchstring; // added bcoz email send not working:
    // Swal.fire('Check to your email account for Verificatin code', randomstring, 'success');
    this.verifyFlag = true;

    // const email = {
    //   to: this.customer.login.email,
    //  // from: 'inouvelleventures@gmail.com',
    //   subject: 'New User Registration ',
    // body: 'Dear User,' + '\n \n' + 'Your verification code is:'
    //   + ' ' + randomstring + '\n\n' + ' Regards \n Gandhi Offset Printing Pvt. Ltd.'
    // };

    const email = {
      to: this.user.username,
      cc: 'amankarn26@gmail.com',
      templateId: 'custmail',

      contentData: {
        content: {
          message: 'Dear User,' + '\n \n' + 'Your verification code is:'
            + ' ' + randomstring
        },
        table: [],
        costtable: [],

        subject: 'New User Registration'
      }
    };

    console.log('submiti function');
    console.log(email);
    // console.log(this.model.username);

    const url = this.restService.mailRestURL('send', '');
    console.log(url);
    //  console.log(this.request);
    this.restService.postFormData(url, email).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // sessionStorage.setItem('tempPass', randomstring);
        // Now do your stuff here
        //  Swal.fire('Verification code is Sent to your email account', '', 'success');
        this.regFlag = false;
        this.verifyFlag = true;
        console.log('aftere mail send ....fag regFlag and verifyFlag');
        console.log(this.regFlag);
        console.log(this.verifyFlag);
        Swal.fire('Verification code sent to your registered email', '', 'success');
        // this.route.navigate(['/authentication']);
      },
      error => {
        // Error Message

        //  this.alertify.alert('<b>Failed to send new password</b><br>' + error.statusText + '<br>'
        //   + error._body);
        console.log('Failed to send new password');
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }

  updatePassword() {

    if (this.matchstring === this.otp) {
      console.log('submiti function');

      const url = this.restService.loginRestURL('edit', '');

      console.log(url);
      console.log(this.matchstring);

      let login = {
        email: this.user.username,
        password: this.matchstring

      };

      login.password = window.btoa(login.password);
      console.log('update encrypted password is :' + login.password);

      //  this.user.password = window.atob(login.password);

      this.restService.postFormData(url, login).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);

          this.user.username = login.email;
          this.user.password = this.matchstring;

          this.loginFunc();
          // Now do your stuff here

          //   Swal.fire('Your password is updated successfully..!', '', 'success');

          /*     if (  this.alertify.alert('Your password is updated successfully..!')) {
               this.route.navigate(['/home']);
               window.scrollTo(0, 0);
              } */
        },
        error => {
          // Error Message

          // Swal.fire(
          //   error.statusText,
          //   error._body,
          //   'error'
          // );
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    } else {
      Swal.fire(
        'Password match failed',
        '',
        'error'
      );

    }
  }

  regFun() {


    this.verifyMail();
    // if (this.customer.login.password === this.rpassword) {
    //   this.verifyMail();
    // } else {
    //   Swal.fire('Password Match Failed', '', 'error');
    // }
  }

  backtoForm() {
    this.regFlag = true;
    this.verifyFlag = false;
  }

  regFlager() {

    console.log('changing log');
    // redirecting to register page
    //  this.route.navigate(['/verifywithotp']);

    this.regFlag = true;
    this.user.username = '';
    this.user.password = '';
    //  this.route.navigate(['/custregisteration']);

    // if (this.regFlag) {
    //   this.regFlag = false;
    //   // alert('true condition');
    //   // alert(this.regFlag);
    // } else {
    //   // alert('false condition');
    //   // alert(this.regFlag);
    //   this.regFlag = true;
    //   this.user.username = '';
    //   this.user.password = '';
    // }
  }

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
    return d.toString();
  }

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
      datetime = date.getFullYear() + '-' + mm + '-' + dd;
    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }
    return datetime;

  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      // alert('you just clicked enter');
      this.logindelay();
      // rest of your code
    }
  }

  sendOtop() {
    // this.checkifnumberexists()
    // if(this.)
    console.log(this.checknumberexists);
    if (this.checknumberexists === 'NONE') {


      if (this.reg.phone === '' || this.reg.phone === null || this.reg.phone === undefined) {
        Swal.fire('Please Fill the Mobile number', '', 'error')


      }
      else {

        console.log('send otp code to customers mobile');

        this.otpp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;

        //   alert('customer otp = ' + this.otpp);
        // this.tab1 = false;
        this.sendMeberSMS();
        this.verifyFlag = true;
        // this.userotp=this.otpp;
      }
    }
    else {
      Swal.fire('This phone is already Registered', 'please try another number', 'error')
    }

  }

  vefifyotp() {
    console.log('OTP VERIFICATION CODE');
    console.log('this.otp' + this.otp);
    console.log('this.userotp' + this.userotp);
    if (Number(this.otpp) == Number(this.userotp)) {


      //  alert('verified goto ' + this.reg.type);

      if (this.reg.type === 'CUSTOMER') {
        this.route.navigate(['/custregisteration', this.reg.phone]);
      } else if (this.reg.type === 'BRANCH') {
        this.route.navigate(['/addfirm', this.reg.phone]);
      } else {
        this.route.navigate(['/adddeliverypool', this.reg.phone]);
      }


    } else {
      Swal.fire(
        'OTP NOT MATCHED',
        '',
        'error'
      );
    }

  }

  public phonenumber() {
    // const phoneno = /^\d{10}$/;
    // if(this.reg.phone.value.match(phoneno))
    //       {
    //     return true;
    //       }
    //     else
    //       {
    //       alert("invalid");
    //       return false;
    //       }
  }

  sendMeberSMS() {
    const message = 'Your OTP for verification is: ' + this.otpp + '. IVPL';

    let mobile = this.reg.phone;

    // switch (this.segment) {
    //   case 'CUSTOMER':
    //     mobile = this.user.phone;
    //     break;
    //   case 'FIRM':
    //     mobile = this.firm.phone;
    //     break;
    //   default:
    //     mobile = this.delivery.phone;
    //     break;
    // }

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

  checkifnumberexists() {

    const url = this.restService.loginRestURL('checknumberfromdb', this.reg.phone);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log('Getting Emp by id');
        console.log(response);
        // this.lastlogin=response.lastlogin;
        this.checknumberexists = response.error;
        if (this.checknumberexists === 'NONE') {
          this.sendOtop();
        }


      },
      error => {
        console.log(error);
        console.log(error.error.error);
        this.checknumberexists = error.error.error;
        console.log('Error in data load.');
        this.sendOtop();
      }
    );



  }

  loginRedirect() {
    // console.log("Indu"+this.router.url);

    // console.log(this.router.url);
    // alert(this.router.url);
    //  alert(window.location.pathname);
    // if (this.router.url === '/authentication') { if (this.router.url === '/login') {
    //   if (this.router.url === '/') {
    // this.router.navigate(['/adminhome']);
    // }
    if (sessionStorage.getItem('type') === 'CUSTOMER') {
      alert('1');
      this.route.navigate(['/custhomepage']);
    }
    else if (sessionStorage.getItem('type') === 'BRANCH' && sessionStorage.getItem('role') === 'BRANCH') {
      alert('2');
      this.route.navigate(['/vendorhomepage']);
    }
    else if (sessionStorage.getItem('type') === 'FIRM' && sessionStorage.getItem('role') === 'SUPERADMIN') {
      alert('3');
      this.route.navigate(['/adminhome']);
    }

    else if (sessionStorage.getItem('type') === 'DELIVERY_PERSON' && sessionStorage.getItem('role') === 'DELIVERY_PERSON') {
      alert('4');
      this.route.navigate(['/delivery_dashboard']);
    }


  }

  generateotp() {
    this.otpp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
  }

  sendotp() {
    this.generateotp();
    // this.presentToast('OTP Send to your Mobile No=' + this.otp);
    this.reg.phone = this.user.username;
    this.sendMeberSMS();

    //   this.presentPrompt(); removed popup
    this.showotpcontainer = true;
    this.verifyotp = true;

    this.startTimmer()
  }

  private startTimmer() {
    this.otpResendButton = "90 sec"

    let time = 90;
    let interval = setInterval(() => {
      time--;
      this.otpResendButton = time + " sec"
      if(time == 0) {
        this.otpResendButton = "Resend OTP"
        clearInterval(interval);
      }
    },1000)

  }

  loginwith() {
    if (this.loginwithOTP) {
      this.loginwithOTP = false;
    } else {
      this.loginwithOTP = true;
    }
  }

  checkotp() {

    if (Number(this.otpp) == Number(this.userotp)) {
      // logged in!
      console.log(this.otpp);
      // console.log(this.userotp);
      Swal.fire('OTP Verified', 'redirecting ... ', 'success');
      // if (this.segment === 'CUSTOMER') {
      // this.loginFunc1();
      this.newpassword = true;
      
      // } else   if (this.segment === 'FIRM') {
      //   this.submitData1();
      // } else   if (this.segment === 'DELIVARY_PERSON') {
      //   this.submitData2();
      // }
    } else {
      // invalid login
      Swal.fire('Invalid OTP', 'try again', 'error');

      return false;
    }

  }

  public loginFunc1() {

    // alert('in ligu')
    console.log(this.user.username);
    console.log(this.user.password);

    delete this.user.password;

    console.log(this.user);
    if ((this.user.username !== '')) {
      // login code start**************************************************************************************
      console.log('submitData function');
      console.log(this.user);
      const url = this.restService.userRestURL('login', '');
      // this.user.password = window.btoa(this.user.password); // added on 5/1/2019
      this.restService.postFormData(url, this.user).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          // licensed expiry code
          let firm;
          // let expiredon = new Date(this.unixTimeConverter(response.expiredon));
          // let todaydate = this.todatDate(); // new Date();
          // let d1 = new Date(todaydate);
          // let d2 = new Date(expiredon);
          // if (d1 < d2) {
          // } else {
          //  Swal.fire('Your Demo Expired', 'Please, Contact Invouelle Ventrues Pvt. Ltd. For Reneual', 'error');
          // }
          // // end licenses expiry code
          // if (response.role.role !== 'NO_ACCESS' && d1 < d2) {
          if (response.login.role !== 'NO_ACCESS') {


            sessionStorage.setItem('id', response.id);
            sessionStorage.setItem('name', response.name);
            localStorage.setItem('id', response.id);
            localStorage.setItem('name', response.name);
            // sessionStorage.setItem('firm', response.firm);
            // sessionStorage.setItem('deployacct', response.deployacct);
            // sessionStorage.setItem('fname', response.fname);
            sessionStorage.setItem('role', response.login.role);
            sessionStorage.setItem('type', response.login.type);
            sessionStorage.setItem('category', response.category);

            localStorage.setItem('role', response.login.role);
            localStorage.setItem('type', response.login.type);
            localStorage.setItem('category', response.category);

            sessionStorage.setItem('islogin', 'true');
            localStorage.setItem('islogin', 'true');
            sessionStorage.setItem('email', response.login.email);
            sessionStorage.setItem('pincode', response.address.pincode);

            localStorage.setItem('email', response.login.email);
            localStorage.setItem('pincode', response.address.pincode);

            if (response.photo) {
              sessionStorage.setItem('photo', response.photo.docpath);
              localStorage.setItem('photo', response.photo.docpath);
            }
            if (response.phone) {
              sessionStorage.setItem('phone', response.phone);
              localStorage.setItem('phone', response.phone);
            }

            this.islogin = true;
            // location.reload();

            if (response.login.type === 'FIRM') {
              firm = response.id;
              sessionStorage.setItem('firm', firm);
              localStorage.setItem('firm', firm);

              this.getsysconfig(firm);
              sessionStorage.setItem('photo', response.logo.docpath);
              localStorage.setItem('photo', response.logo.docpath);

            } else {
              location.reload();
            }
          }
        },
        error => {
          // Error Message
          console.log('Error in data load.');
          Swal.fire(
            'Invalid user ID or Password',
            '',
            'error'
          );
          this.user.password = '';
        }
      );
      return 0;

      // login code end***************************************************************************************
      //  location.reload();

    } else {
      Swal.fire(
        'Please provide user ID and Password.',
        '',
        'error'
      );
    }
  }

  back(){
    window.history.back();
  }



  public updatepass() {
    // alert('order add call');
    this.back();
    const jsono = {
      username:this.user.username,
      password: window.btoa(this.user.password)
    };

    console.log("submitData function");
    console.log(jsono);
    const url = this.restService.loginRestURL("edit", "");
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
       
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // alert('Password Updated');
       
        this.user.username = this.user.username;
          this.user.password = this.user.password;

          this.loginFunc();
       
       
      },
      (error) => {
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }


}
