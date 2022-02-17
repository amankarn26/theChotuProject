import { RestService } from "./../../services/rest.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { ToastController } from '@ionic/angular';
// import { AlertController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  otp;

  login = {
    username: "",
    password: "",
  };

  isLoggedin = false;

  public docServer = this.restService.docServer;

  loginwithOTP = false;

  newpassword = false;

  showotpcontainer = false;

  userotp = "";

  shouldDisable = true;
  password;

  constructor(
    public route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService,
    // private toastCtrl: ToastController,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    if (
      localStorage.getItem("islogin") === "true" &&
      localStorage.getItem("type") === "CUSTOMER"
    ) {
      this.route.navigate(["/tabs/tab1"]);
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("ionViewWillEnter "); // called on first time
  }

  submitData() {
    //  alert('login click');
    // this.route.navigate(['/home']);
    // localStorage.setItem('isLoggedin', 'YES');
    //  this.presentToast();
    this.loginFunc();
  }

  submitData1() {
    //  alert('login click');
    this.newpassword = true;
    // localStorage.setItem('isLoggedin', 'YES');
    //  this.presentToast();
    // this.loginFunc1();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      subHeader: "Subtitle",
      message: "This is an alert message.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      // animated: true,
      duration: 2000,
    });
    toast.present();
  }

  loginFunc() {
    if (this.login.username != "" && this.login.password != "") {
      // login code start**************************************************************************************
      console.log("submitData function");
      console.log(this.login);
      const url = this.restService.userRestURL("login", "");
      this.login.password = window.btoa(this.login.password); // added on 5/1/2019
      this.restService.postFormData(url, this.login).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
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
          if (response.login.role !== "NO_ACCESS") {
            localStorage.setItem("id", response.id);
            localStorage.setItem("name", response.name);
            localStorage.setItem("role", response.login.role);
            localStorage.setItem("type", response.login.type);
            localStorage.setItem("islogin", "true");
            localStorage.setItem("islogin", "true");
            localStorage.setItem("email", response.email);
            localStorage.setItem("phone", response.phone);
            localStorage.setItem("Address", JSON.stringify(response.address));

            if (response.photo) {
              sessionStorage.setItem("photo", response.photo.docpath);
            }
            if (response.phone) {
              sessionStorage.setItem("phone", response.phone);
            }

            this.isLoggedin = true;
            // location.reload();
            this.presentToast("Logged In Successful");
            if (response.login.type === "BRANCH") {
              firm = response.id;
              localStorage.setItem("firm", firm);
              localStorage.setItem("category", response.category);
              localStorage.setItem("Account", JSON.stringify(response.account));
              // this.getsysconfig(firm);
              if (response.logo) {
                localStorage.setItem("photo", response.logo.docpath);
              }

              // this.route.navigate(['/vendors']);
              this.route.navigate(["/vendors/vendor-home"]);
            } else if (response.login.type === "CUSTOMER") {
              this.route.navigate(["/tabs"]);
              // location.reload();
            } else if (response.login.type === "DELIVERY_PERSON") {
              this.route.navigate(["/deliverypools/deliverypool-home"]);
              // location.reload();
            }
          }
        },
        (error) => {
          // Error Message

          console.log("Error in data load.");
          this.presentToast("User Name Or Password Does Not Match");

          this.Alert();

          // alert('User Name or password does not match');
          // Swal.fire(
          //    'Invalid user ID or Password',
          //   '',
          //    'error'
          //  );
        }
      );
      return 0;

      // login code end***************************************************************************************
      //  location.reload();
    } else {
      this.presentToast("Please provide user ID and Password.");
      // Swal.fire(
      //   'Please provide user ID and Password.',
      //   '',
      //   'error'
      // );
    }
  }

  async Alert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: "Incorrect Username Or Password",
      buttons: ["OK"],
    });

    await alert.present();
  }

  loginFunc1() {
    delete this.login.password;

    if (this.login.username !== "") {
      // login code start**************************************************************************************
      console.log("submitData function");
      console.log(this.login);
      const url = this.restService.userRestURL("login", "");
      //  this.login.password = window.btoa(this.login.password); // added on 5/1/2019
      this.restService.postFormData(url, this.login).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
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
          if (response.login.role !== "NO_ACCESS") {
            localStorage.setItem("id", response.id);
            localStorage.setItem("name", response.name);
            localStorage.setItem("role", response.login.role);
            localStorage.setItem("type", response.login.type);
            localStorage.setItem("islogin", "true");
            localStorage.setItem("islogin", "true");
            localStorage.setItem("email", response.email);
            localStorage.setItem("phone", response.phone);
            localStorage.setItem("Address", JSON.stringify(response.address));

            if (response.photo) {
              sessionStorage.setItem("photo", response.photo.docpath);
            }
            if (response.phone) {
              sessionStorage.setItem("phone", response.phone);
            }

            this.isLoggedin = true;
            // location.reload();
            this.presentToast("Logged In Successful");
            if (response.login.type === "BRANCH") {
              // alert('1');
              firm = response.id;
              localStorage.setItem("firm", firm);
              localStorage.setItem("category", response.category);
              // this.getsysconfig(firm);
              localStorage.setItem("photo", response.logo.docpath);
              // this.route.navigate(['/vendors']);
              this.route.navigate(["/vendors/vendor-home"]);
            } else if (response.login.type === "CUSTOMER") {
              this.route.navigate(["/tabs"]);
              // location.reload();
            } else if (response.login.type === "DELIVERY_PERSON") {
              this.route.navigate(["/deliverypools/deliverypool-home"]);
              // location.reload();
            }
          }
        },
        (error) => {
          // Error Message

          console.log("Error in data load.");
          this.presentToast("You are not registered");

          // Swal.fire(
          //   'Invalid user ID or Password',
          //   '',
          //   'error'
          // );
        }
      );
      return 0;

      // login code end***************************************************************************************
      //  location.reload();
    } else {
      // Swal.fire(
      //   'Please provide user ID and Password.',
      //   '',
      //   'error'
      // );
    }
  }

  loginwith() {
    if (this.loginwithOTP) {
      this.loginwithOTP = false;
    } else {
      this.loginwithOTP = true;
    }
  }

  sendotp() {
    this.generateotp();
    // this.presentToast('OTP Send to your Mobile No=' + this.otp);
    this.sendMeberSMS();
    //   this.presentPrompt(); removed popup
    this.showotpcontainer = true;
    this.setTimer();
  }

  generateotp() {
    this.otp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
  }
  sendMeberSMS() {
    const message = "Your OTP for verification is: " + this.otp + ". IVPL ";

    const mobile = this.login.username;
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

  async presentPrompt() {
    const alert = await this.alertController.create({
      header: "Verify OTP",
      inputs: [
        {
          name: "OTP",
          placeholder: "_ _ _ _ _ _",
        },
      ],
      buttons: [
        {
          text: "Resend OTP",
          // role: 'cancel',
          handler: (data) => {
            // console.log('Cancel clicked');
            this.sendotp();
          },
        },
        {
          text: "Verify",
          handler: (data) => {
            if (Number(this.otp) == Number(data.OTP)) {
              // logged in!
              console.log(this.otp);
              // console.log(this.userotp);
              this.presentToast("OTP Verified");
              // if (this.segment === 'CUSTOMER') {
              this.submitData1();
              // } else   if (this.segment === 'FIRM') {
              //   this.submitData1();
              // } else   if (this.segment === 'DELIVARY_PERSON') {
              //   this.submitData2();
              // }
            } else {
              // invalid login
              this.presentToast("Failed to Verify");
              return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  checkotp() {
    if (Number(this.otp) == Number(this.userotp)) {
      // logged in!
      console.log(this.otp);
      // console.log(this.userotp);
      this.presentToast("OTP Verified");
      // if (this.segment === 'CUSTOMER') {
      this.submitData1();
      // } else   if (this.segment === 'FIRM') {
      //   this.submitData1();
      // } else   if (this.segment === 'DELIVARY_PERSON') {
      //   this.submitData2();
      // }
    } else {
      // invalid login
      this.presentToast("Incorrect OTP");
      return false;
    }
  }

  setTimer() {
    this.shouldDisable = true;
    setTimeout((x) => {
      this.shouldDisable = false;
    }, 90000); // 30 seconds 30000
  }

  // validusername(){

  //   if(String(this.login.username).length != 10){
  //     document.getElementById("usernameWaliId").style.borderColor = "red";
  //   }
  //   else {
  //     document.getElementById("usernameWaliId").style.borderColor = "#40BFFF";
  //   }

  // }

  // validpassword(){

  //   if(String(this.login.password).length != 6){
  //     document.getElementById("passwordvalid").style.borderColor = "red";
  //   }
  //   else {
  //     document.getElementById("passwordvalid").style.borderColor = "#40BFFF";
  //   }

  // }

  back() {
    window.history.back();
  }

  getStringLenth(data: string) {
    return data.length;
  }

  public updatepass() {
    // alert('order add call');

    this.back();
    // this.loginwith()

    const jsono = {
      username: this.login.username,
      password: window.btoa(this.login.password),
    };

    console.log("submitData function");
    console.log(jsono);
    const url = this.restService.loginRestURL("updatepass", "");
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // alert('Password Updated');

        // this.password = "";
      },
      (error) => {
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  public onClickForgotPassword() {
    
  }
}
