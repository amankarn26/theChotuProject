import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ToastController } from '@ionic/angular';
// import { AlertController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation';
// import { throws } from 'assert';
// import { stat } from 'fs';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare const L: any;

// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [
    Geolocation
  ]
})
export class RegisterPage implements OnInit {


  lattitude;
  longitude;

  location;

  public passHaiye = ''

  checked: boolean = false;

  public locationSet = false

  public ismapShow = false

  user = {
    phone: '',
    name: '',
    // gender:'',
    // dob:'',
    email: '',
    city: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India',
      latitude: 0,
      longitude: 0,
    },
    login: {
      type: 'CUSTOMER',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'CUSTOMER'
    },

  };

  isotpverified = false;

  userotp = '';

  otp = '';

  segment = ''; // 'CUSTOMER';
  firmid;

  public file;
  public file1;

  public firm = {
    firm: '',
    firmname: 'Natural Pharmacy',
    branchtype: '',
    name: '',
    // regno: '',
    phone: '',
    email: '',
    code: '',
    empcount: '',
    pannum: '',
    gstin: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '', // [this.getStateList()],
      city: '', // [this.getCityList('Maharashtra')],
      country: 'India'
    },
    account: {
      type: 'BANK',    // --enum BANK/PAYTM/GOOGLE_PAY
      bankname: '',
      acctnumber: '',
      branch: '',    // --if type=BANK
      ifsccode: '',  //    --if type=BANK
      city: ''      // --if type=BANK
    },
    login: {
      type: 'BRANCH',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'BRANCH'
    },
    usedeliverypool: 'YES',
    deliverdays: '1',
    servicerate: 12
  };

  // statelist = [];
  // citylist = [];

  categoryList = [];



  private photo = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };

  document;
  public urls;
  public urls1;
  public firmlist;


  delivery = {
    // state: '',
    // city: '',
    name: '',
    phone: '',
    email: '',
    login: {
      type: 'DELIVERY_PERSON',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'DELIVERY_PERSON'
    },
    address: {
      line1: '',
      line2: '',
      city: '',
      pincode: '',
      states: '',
      country: 'India'
    },
    vehicletype: '',
    account: {
      type: '',    // --enum BANK/PAYTM/GOOGLE_PAY
      bankname: '',
      acctnumber: '',
      branch: '',    // --if type=BANK
      ifsccode: '',  //    --if type=BANK
      city: ''      // --if type=BANK
    },
    // vehiclereg: '',
    // license: '',
    status: 'PENDING',
  };

  pincode;

  gstpan = '';


  document1;
  document2;


  license = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };
  vehiclereg = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };

  deliverypoolid;


  isverified = false;

  phone;

  checknumberexists;


  showotpcontainer = false;

  shouldDisable = true;

  constructor(public route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService,
    // private toastCtrl: ToastController,
    public alertController: AlertController,
    public toastController: ToastController,
    public geolocation: Geolocation,
    //  private localNotifications: LocalNotifications


  ) { }

  ngOnInit() {


    // this.generatepass();
    this.getfirmchlist();
    //  this.getLocation();

    //  this.simpleNotif();
  }


  ionViewWillEnter() {
    // this.generatepass();
    this.getCatlist();
    // this.getLocation();
    this.findloc();
    //   this.simpleNotif();
  }


  //   ionViewDidLoad() {
  //  //  this.findUserLocation();
  //      this.findloc();
  //   }




  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      // animated: true,
      duration: 2000
    });
    toast.present();
  }


  register() {

    this.generateotp();
    // this.presentToast('OTP Send to your Mobile No=' + this.otp);
    this.sendMeberSMS();
    // this.presentPrompt(); removed popup for otp
    this.setTimer();

  }

  register1() {

    // this.generateotp();
    // // this.presentToast('OTP Send to your Mobile No=' + this.otp);
    // this.sendMeberSMS();
    // this.presentPrompt();

    if (this.segment === 'CUSTOMER') {
      this.submitData();
    } else if (this.segment === 'FIRM') {
      this.submitData1();
    } else if (this.segment === 'DELIVARY_PERSON') {
      this.submitData2();
    }

  }









  private submitData() {
    console.log('Customer json in submit');
    console.log(this.user);
    // this.getLocation();
    this.user.city = this.user.address.city;
    this.user.login.username = this.user.phone;
    this.user.address.latitude = this.lattitude;
    this.user.address.longitude = this.longitude;
    // if (this.user.pan != '' || this.user.gst != '') {
    // if (this.user.gst === '') {
    //   delete this.user.gst;
    // }
    // if (this.user.pan === '') {
    //   delete this.user.pan;
    // }
    this.user.login.password = this.passHaiye
    this.user.login.password = window.btoa(this.user.login.password);
    console.log('submitData function');
    console.log(this.user);
    const url = this.restService.customerRestURL('add', '');
    this.restService.postFormData(url, this.user).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        // this.userId = response.id;
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('type', response.login.type);
        localStorage.setItem('islogin', 'true');
        // localStorage.setItem('islogin', 'true');
        localStorage.setItem('email', response.email);
        localStorage.setItem('phone', response.phone);
        localStorage.setItem('Address', JSON.stringify(response.address));
        window.scrollTo(0, 0);
        this.presentToast('Logged In Successful');
        this.route.navigate(['/tabs']);
      },
      error => {
        // Error Message
        this.generatepass();
        this.presentToast('Failed to register');
        console.log('Error in data load.');
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

  cancel() {
    // goBack code fro cancel button
    // alert("Mai hu aman")
    window.history.back();
  }
  generatepass() {
    // this.user.login.password = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
    // this.firm.login.password = this.user.login.password;
    // this.delivery.login.password = this.user.login.password;

    this.firm.login.password = this.otp;
    this.delivery.login.password = this.otp;
    this.user.login.password = this.otp;
  }

  generateotp() {
    this.otp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
  }

  async presentPrompt() {
    const alert = await this.alertController.create({
      header: 'Verify OTP',
      inputs: [
        {
          name: 'OTP',
          placeholder: '_ _ _ _ _ _'
        }
      ],
      buttons: [
        {
          text: 'Resend OTP',
          // role: 'cancel',
          handler: data => {
            // console.log('Cancel clicked');
            this.register();
          }
        },
        {
          text: 'Verify',
          handler: data => {


            if (Number(this.otp) == Number(data.OTP)) {

              // logged in!
              this.isverified = true;
              console.log(this.otp);
              console.log(this.userotp);
              this.presentToast('OTP Verified');

              this.firm.login.password = this.otp;
              this.delivery.login.password = this.otp;
              this.user.login.password = this.otp;
              // if (this.segment === 'CUSTOMER') {
              //   this.submitData();
              // } else   if (this.segment === 'FIRM') {
              //   this.submitData1();
              // } else   if (this.segment === 'DELIVARY_PERSON') {
              //   this.submitData2();
              // }
            } else {
              // invalid login
              this.presentToast('Failed to Verify');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }


  async segmentChanged(obj) {
    console.log(obj);
    console.log(this.segment);

  }






  // private getStateList() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.stateRestURL('', 'India');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       // this.restService.getJSONFromURL(response);
  //       this.statelist = response;
  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  // private onChangeState(obj) {
  //   let stateId = obj.srcElement.value;
  //   // Call city data method
  //   this.getCityList(stateId);
  // }

  //   private getCityList(stateId) {
  //   this.citylist = [];
  //   // Get Information from JSON REST api
  //   var url = this.restService.cityRestURL('', stateId);
  //   console.log(stateId);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.citylist = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  getState(obj) {
    // Get Information from JSON REST api

    console.log(obj);

    const url = this.restService.PincodeRestURL('', obj.target.value);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        // this.statelist = response;
        this.firm.address.states = response.state_name;
        this.firm.address.city = response.city_name;

        this.delivery.address.city = response.city_name;
        this.delivery.address.states = response.state_name;


        this.user.address.states = response.state_name;
        this.user.address.city = response.city_name;

        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
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


  fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.urls = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
      console.log('Inside multiple file select');
    }
  }



  fileEvent1(fileInput: any) {
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
  }

  fileEvent2(fileInput: any) {
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



  submitData1() {

    // let flg = true;

    this.firm.code = this.firm.name.substring(0, 3).toUpperCase();
    // toUpperCase()

    //  if (this.firm.pannum != '' || this.firm.gstin != '') {
    this.firm.login.username = this.firm.phone;

    if (this.firm.gstin === '') {
      delete this.firm.gstin;
    }

    if (this.firm.pannum === '') {
      delete this.firm.pannum;
    }

    this.firm.login.password = window.btoa(this.firm.login.password);


    console.log('submit function');
    var url = this.restService.firmRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.firm).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.firmid = response.id;
        if (this.file) {
          this.uploadfile();
          this.submitdoc();
        }
        window.scrollTo(0, 0);

        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('role', response.login.role);
        localStorage.setItem('type', response.login.type);
        // localStorage.setItem('type', response.login.type);
        localStorage.setItem('islogin', 'true');
        localStorage.setItem('islogin', 'true');
        localStorage.setItem('email', response.email);
        // localStorage.setItem('role', response.login.role);
        localStorage.setItem('firm', response.id);
        localStorage.setItem('category', response.category);
        localStorage.setItem('phone', response.phone);
        //  localStorage.setItem('photo', response.logo.docpath);
        localStorage.setItem('Address', JSON.stringify(response.address));

        localStorage.setItem('Account', JSON.stringify(response.account));

        this.presentToast('Logged In Successful');
        //  this.route.navigate(['/tabs/tab1']);
        this.route.navigate(['/vendors/vendor-home']);
      },
      error => {
        this.generatepass();
        // Error Message
        // Swal.fire(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        this.presentToast('Logged In Failed');

        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
    // } else {
    // //  alert('errror2');
    // }
  }


  uploadfile() {

    if (this.file) {
      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.photo.docname = this.file.name;
      this.photo.doctype = 'LOGO';
      this.photo.docpath = this.firmid + '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      docFormData.append('name', this.firmid);
      var docurl = this.restService.docsRestURL('upload', '');
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
      id: this.firmid,
      logo: this.photo
    };

    console.log('submiti function');
    var url = this.restService.firmRestURL('logoadd', '');
    console.log(url);
    this.restService.postFormData(url, docs).subscribe(
      (response: any) => {
        // Responce data.
        this.firmid = response.id;
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




  private submitData2() {
    console.log('Delivery Pool json in submit');
    console.log(this.user);
    // this.user.city = this.user.address.city;
    this.user.phone = this.user.login.username;
    this.delivery.login.username = this.delivery.phone;
    // if (this.user.pan != '' || this.user.gst != '') {
    // if (this.user.gst === '') {
    //   delete this.user.gst;
    // }
    // if (this.user.pan === '') {
    //   delete this.user.pan;
    // }
    this.delivery.login.password = window.btoa(this.delivery.login.password);
    console.log('submitData function');
    console.log(this.user);
    const url = this.restService.delivertypoolRestURL('add', '');
    this.restService.postFormData(url, this.delivery).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);


        this.deliverypoolid = response.id;
        // file upload code start

        if (this.file) {
          this.uploadfile1();
          this.submitdoc1();
        }

        if (this.file1) {
          this.uploadfile2();
          this.submitdoc2();
        }

        // file upload code end


        // Now do your stuff here
        // this.userId = response.id;
        localStorage.setItem('id', response.id);
        localStorage.setItem('name', response.name);
        localStorage.setItem('type', response.login.type);
        localStorage.setItem('islogin', 'true');
        // localStorage.setItem('islogin', 'true');
        localStorage.setItem('email', response.email);
        localStorage.setItem('phone', response.phone);
        // localStorage.setItem('Address', JSON.stringify(response.address));
        localStorage.setItem('Address', JSON.stringify(response.address));


        window.scrollTo(0, 0);
        this.presentToast('Logged In Successful');
        // this.route.navigate(['/deliverypools']);
        this.route.navigate(['/deliverypools/deliverypool-home']);
      },
      error => {
        // Error Message
        this.generatepass();
        this.presentToast('Failed to register');
        console.log('Error in data load.');
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


  sendMeberSMS() {
    const message = 'Your OTP for verification is: ' + this.otp + '. IVPL ';

    // JGL: Your OTP for receiving Order Number

    let mobile = '0000000000';

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
      toMobile: this.phone, // mobile,
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



  uploadfile1() {

    if (this.file) {
      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.license.docname = this.file.name;
      this.license.doctype = 'LIC';
      this.license.docpath = this.deliverypoolid + '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      docFormData.append('name', this.deliverypoolid);
      var docurl = this.restService.docsRestURL('upload', '');
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



  uploadfile2() {

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
      docFormData.append('name', this.deliverypoolid);
      var docurl = this.restService.docsRestURL('upload', '');
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


  submitdoc2() {

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



  getLocation() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.showPosition);
    // } else {

    //  // x.innerHTML = "Geolocation is not supported by this browser.";
    //  alert('Geolocation is not supported by this browser');
    // }
  }

  showPosition(position: any) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;

    // var lat = position.coords.latitude;
    // var lng = position.coords.longitude;

    // console.log(position.coords.longitude);

    // this.geocodeLatLng(this);

    //  console.log('position');
    //  console.log(position);

    //  alert('latitude =' +position.coords.latitude);
    //  let respnse = position;
    // //  let respnse = new Object();
    // //  respnse = position;
    //  this.lattitude= respnse.coords.latitude;
    //  this.longitude= respnse.coords.longitude;
    //  alert(this.lattitude);

    //  this.user.address['latitude'] = this.lattitude;
    //  this.user.address['longitude'] = this.longitude;

    //  this.firm.address['latitude'] = this.lattitude;
    //  this.firm.address['longitude'] = this.longitude;

    //  this.delivery.address['latitude'] = this.lattitude;
    //  this.delivery.address['longitude'] = this.longitude;

    //  console.log('his.user.address');
    //  console.log(this.user.address);

  }

  geocodeLatLng(response: any) {

    console.log(response);
    //  this.user.address['latitude'] = this.lattitude;
    //  this.user.address['longitude'] = this.longitude;

    //  this.firm.address['latitude'] = this.lattitude;
    //  this.firm.address['longitude'] = this.longitude;

    //  this.delivery.address['latitude'] = this.lattitude;
    //  this.delivery.address['longitude'] = this.longitude;

    //  console.log('his.user.address');
    //  console.log(this.user.address);

  }



  // findUserLocation(){
  //   let options = {
  //     enableHighAccuracy: true,
  //     timeout: 25000
  //   };


  //   this.geolocation.getCurrentPosition(options).then((position) => {

  //     this.location = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     };

  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }

  // geolocation.getCurrentPosition().then((resp) => {
  //   // resp.coords.latitude
  //   // resp.coords.longitude
  // }).catch ((error) => {
  //   console.log('Error getting location', error);
  // });



  // this.geolocation.getCurrentPosition().then((resp) => {
  // // resp.coords.latitude
  // // resp.coords.longitude
  // }).catch((error) => {
  //   console.log('Error getting location', error);
  // });

  findloc(): Promise<any> {
    return new Promise((resolve, reject) => {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        //  alert(data.coords.latitude);

        this.location = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        };

        this.lattitude = data.coords.latitude;
        this.longitude = data.coords.longitude;


        this.user.address['latitude'] = this.lattitude;
        this.user.address['longitude'] = this.longitude;

        this.firm.address['latitude'] = this.lattitude;
        this.firm.address['longitude'] = this.longitude;

        this.delivery.address['latitude'] = this.lattitude;
        this.delivery.address['longitude'] = this.longitude;

        console.log(data);
        console.log(this.location);
      });

    });

  }


  // findUserLocation(){
  //   let options = {
  //     enableHighAccuracy: true,
  //     timeout: 25000
  //   };


  //   this.geolocation.getCurrentPosition(options).then((position) => {

  //     this.location = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     };

  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  // }




  private getfirmchlist() {
    // Get Information from JSON REST api
    const url = this.restService.compactRestURL('getallfirm', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.firmlist = response;

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  // public setservicerate(obj) {

  //   let cat='';




  //   const result1 = this.categoryList.find(x => x.id == this.firm.category);

  //   if (result1) {
  //     console.log('searched stock by varient');
  //     console.log(result1);
  //     cat  = result1.name;
  //     console.log('cat'+cat);

  //   }


  //   // if (cat.toUpperCase() === 'LIQUOR') {
  //   //   this.firm.servicerate = 18;
  //   // } else {
  //   //   this.firm.servicerate = 12;
  //   // }

  //   this.firm.servicerate = 12;
  // }


  addValue(e): void {
    var isChecked = e.currentTarget.checked;
    // console.log(e.currentTarget);//undefined

    console.log('isChecked' + isChecked);//undefined
    console.log(this.checked); //it is working !!!

  }


  //   addValue(): void {
  //     // this.checked = !this.checked;

  //     if(this.checked){
  //       this.checked = false;
  //     }else{
  //       this.checked = true;
  //     }
  //   	console.log("checked: " + this.checked);//it is working !!!

  // }


  checkifnumberexists() {
    const url = this.restService.loginRestURL('checknumberfromdb', this.phone);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log('Getting Emp by id');
        console.log(response);
        // this.lastlogin=response.lastlogin;
        if (response.error === 'NONE') {
          //  alert('New number');
          this.showotpcontainer = true;
          this.register();
          this.user.phone = this.phone;
          this.firm.phone = this.phone;
          this.delivery.phone = this.phone;
          this.setTimer();
        } else {
          this.Alert1();
        }

      },
      error => {
        console.log(error);
        console.log(error.error.error);
        this.checknumberexists = error.error.error;
        console.log('Error in data load.');
        this.Alert();


      }
    );
  }


  checkotp() {

    if (Number(this.otp) == Number(this.userotp)) {

      // logged in!
      this.isverified = true;
      console.log(this.otp);
      console.log(this.userotp);
      this.presentToast('OTP Verified');

      this.firm.login.password = this.otp;
      this.delivery.login.password = this.otp;
      this.user.login.password = this.otp;
      // if (this.segment === 'CUSTOMER') {
      //   this.submitData();
      // } else   if (this.segment === 'FIRM') {
      //   this.submitData1();
      // } else   if (this.segment === 'DELIVARY_PERSON') {
      //   this.submitData2();
      // }
    } else {
      // invalid login
      this.presentToast('Failed to Verify');
      return false;
    }

  }



  setTimer() {
    this.shouldDisable = true;
    setTimeout(x => {
      this.shouldDisable = false;
    }, 90000) // 30 seconds
  }

  async Alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // subHeader: 'Subtitle',
      message: 'This Phone Number Is Already Registered, Please Try Another Number.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async Alert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // subHeader: 'Subtitle',
      message: 'This Phone Number Is Already Registered, Please Try Another Number.',
      buttons: ['OK']
    });

    await alert.present();
  }


  public setLocation() {
    this.locationSet = true
    if (!navigator.geolocation) {
      console.log("location service not supported")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords
        console.log({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        let mymap = L.map('map').setView([coords.latitude, coords.longitude], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'AAI ',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoia3Jpc2huYWJoYWdhdDU1NSIsImEiOiJja3R2cGN0MjYxenRzMzJucTIweXd5bWk2In0.4DaOMGf5u6Dk-oelFgCe1Q'
        }).addTo(mymap);

        L.useEffect(() => {
          mymap.locate().on("locationfound", function (e) {
            L.setPosition(e.latlng);
            mymap.flyTo(e.latlng, mymap.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(mymap);
            L.setBbox(e.bounds.toBBoxString().split(","));
          });
        }, [mymap]);

        L.control.locate({ position: "bottomright", flyTo: true, }).addTo(mymap);
        var marker = L.marker([coords.latitude, coords.longitude], {
          draggable: true
        }).addTo(mymap);
        var popup = L.popup();
        marker.on('dragend', function (e: any) {
          console.log("lat :" + marker.getLatLng().lat);
          console.log("long :" + marker.getLatLng().lng);
          this.latitude = marker.getLatLng().lat;
          this.longitude = marker.getLatLng().lng

        });

        function onMapClick(e: any) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
        }

        mymap.on('click', onMapClick);
      })
      this.ismapShow = true;
    }
  }

  public stopMap() {
    this.ismapShow = false;
  }

}
