import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
import { JsonPipe } from '@angular/common';
declare var Swal: any;

declare var Razorpay: any;



@Component({
  selector: 'app-dummyscreens',
  templateUrl: './dummyscreens.component.html',
  styleUrls: ['./dummyscreens.component.css']
})

export class DummyscreensComponent implements OnInit {
  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public userType=sessionStorage.getItem('type');
  public statelist = [];
  public citylist = [];
  public file;
public number;
  public categoryList=[];

  public id;
  private member = {
    role: '',
  };

  public document;
  public firmid;

  public firm = {
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
      states: this.getStateList(),
      city: this.getCityList('Maharashtra'),
      country: 'India'
    },
    account:{
      type:'',    // --enum BANK/PAYTM/GOOGLE_PAY
      acctnumber:'',
      // "branch":"Sadar",     --if type=BANK
      // "ifsccode":"MAHK001",      --if type=BANK
      // "city":"Nagpur"       --if type=BANK
    },
    login: {
      type: 'FIRM',
      username: '', // ----------User name can be phone or email
      password: '',
      role: 'FIRM'
    },
    usedeliverypool:'NO',
    servicerate:'',
    deliverdays:''
  };


  public branch;
  public ifsccode;
  public city;

  private config = {
    firm: sessionStorage.getItem('firm'),
    name: '',
    value: ''
  };

  private configlist = [];
  private configlist1 = [];

  private firmId;

  public docServer = this.restService.docServer;

  private photo = { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public urls;
  public isUpdate = false;




  // payment json
  options = {
    "key": "rzp_test_BFZPuXGalgBJ1L", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Softwiders Pvt. Ltd.",
    "description": "Test Transaction",
    "image": "http://softwiders.com/images/inouvelle_logo.png",
    "handler": function (response){
      alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature)
  },
    "prefill": {
      "name": "Pankaj Chaudhari",
      "email": "pankaj_chaudhari@example.com",
      "contact": "9999999999"
  },
  "notes": {
      "address": "Razorpay Corporate Office"
  },
  "theme": {
      "color": "#F37254"
  }
};

constructor(
  private route: Router,
  private restService: RestService,
  private routprms: ActivatedRoute
) { }

cancel() {
  // goBack code fro cancel button
  window.history.back();
}
ngOnInit() {
  /* this.alertify.confirm('Are you sure?').then(
      function onOk() {alert("Ok");},
      function onCancel() { alert("Cancel");}
  );*/
  if (this.routprms.snapshot.params['id']) {

    this.id = this.routprms.snapshot.params['id'];


  }

  this.number=this.routprms.snapshot.params['no'];


  console.log('adadad');
  this.url = this.route.url;
  console.log(this.route.url);

  console.log(this.userType);
  // http://localhost:4600/index.html#/addfirm/2458652548

  if (this.route.url === '/addfirm/' + encodeURIComponent(this.number)) {
    this.title = 'Add Firm';
    this.subtitle = 'Fill new firm information and submit.';
    this.isManageState = false;
    this.generatepass();
    this.getCatlist();
    this.firm.login.username = this.number;
    this.getStateList();
    this.getCityList('Maharashtra');

  } else if (this.route.url === '/addfirm') {
    this.title = 'Add Firm';
    this.subtitle = 'Fill new firm information and submit.';
    this.isManageState = false;
    this.firm.login.username=this.firm.phone;
    this.generatepass();
    this.getCatlist();

  } else if (this.route.url === '/editfirm/' + this.id) {
    this.title = 'Update Firm';
    this.subtitle = 'Update firm information and submit.';
    this.isManageState = false;
    this.isUpdate = true;
    this.getFirm();
    this.getCatlist();
  } else {
    this.title = 'Manage Firm';
    this.subtitle = 'Manage firm information including view, add, update and delete';
    // this.userType = Cookie.getAll()['role'];

    this.getRoleList();
  }
}
  private getRoleList() {
  // Get Information from JSON REST api
  const url = this.restService.firmRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);
      this.data = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}



updateData() {
  // console.log('submiti function');






  if (this.file) {
    this.uploadfile();
    this.firm['logo'] = this.photo;

  } else {

    delete this.firm['logo'];

  }



  if (this.firm.gstin === '') {
    delete this.firm.gstin;
  }

  if (this.firm.pannum === '') {
    delete this.firm.pannum;
  }


  var url = this.restService.firmRestURL('edit', '');
  console.log(url);
  this.restService.postFormData(url, this.firm).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
      Swal.fire('', '', 'success');
      this.submitConfig(this.firmid);
      window.scrollTo(0, 0);
      this.route.navigate(['/managefirm']);
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

  private getFirm() {
  // Get Information from JSON REST api
  let url = this.restService.firmRestURL('details', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      console.log('Done fatching data!');

      //  this.firm.address.states = [this.getStateList()];
      this.datalist = response;
      this.getCityList(this.datalist.address.states);
      this.firm = response;
      console.log(response);

      this.datalist = response;
      this.getCityList(this.datalist.address.states);
      this.firm = response;
      console.log(response);
      if (response.logo) {
        this.urls = this.docServer + '/' + response.logo.docpath;
      }
      this.firmid = response.id;

    },
    error => {
      console.log('Error in data load.');
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



submitData() {

  let flg = true;



    if (this.firm.gstin === '') {
      delete this.firm.gstin;
    }

    if (this.firm.pannum === '') {
      delete this.firm.pannum;
    }

    this.firm.login.password = window.btoa(this.firm.login.password);


    console.log('submiti function');
    var url = this.restService.firmRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.firm).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);

        //   alert('success');
        // Now do your stuff here
        this.firmid = response.id;
        this.employeemail();
        if (this.file) {
          this.uploadfile();
          this.submitdoc();
        }
        this.submitConfig(this.firmid);

        Swal.fire('', '', 'success');

        if(this.userType===null)
        {
        Swal.fire('Account Created', 'Please Login From Portal', 'success');
         this.route.navigate(['/login']);

        }

        window.scrollTo(0, 0);


        sessionStorage.setItem('id', response.id);
        sessionStorage.setItem('name', response.name);
        sessionStorage.setItem('type', response.login.type);
        sessionStorage.setItem('islogin', 'true');
        localStorage.setItem('islogin', 'true');
        sessionStorage.setItem('email', response.login.email);
        sessionStorage.setItem('role', response.login.role);

        sessionStorage.setItem('firm', response.id);
        this.getsysconfig( response.id);
        sessionStorage.setItem('photo', response.logo.docpath);



       // location.reload();
        // this.route.navigate(['/managefirm']);
      },
      error => {
        this.generatepass();
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

deleteRole(id: any) {

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
        const url = this.restService.firmRestURL('delete', id);
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
      this.getRoleList();
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
  const url = this.restService.PincodeRestURL('', this.firm.address.pincode);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      // this.restService.getJSONFromURL(response);
      this.statelist = response;
      this.firm.address.states = response.state_name;
      this.firm.address.city = response.city_name;
      console.log('State data available');
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
    this.photo.docname = this.file.name;
    this.photo.doctype = 'LOGO';
    this.photo.docpath = this.firmid + '/' + rname + this.file.name;

    var docFormData = new FormData();
    // docFormData.append('doc', this.file, this.fileName);
    docFormData.append('doc', this.file, rname + this.file.name);
    docFormData.append('name', this.firmid);
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


push() {


  this.configlist.push(JSON.parse(JSON.stringify(this.config)));

}

delproperty(i) {
  this.configlist.splice(i, 1);
  // this.recal();
  Swal.fire('Deleted!', '', 'success');

}


delproperty1(id: any) {


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
      const url = this.restService.firmRestURL('configdelete', id);
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
          this.getsysconfig(this.id);
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

submitConfig(id: any) {


  for (let entry of this.configlist) {
    entry.firm = id;
  }


  // delete code
  const url = this.restService.firmRestURL('configadd', '');
  console.log('Delete using this id:' + id);

  this.restService.postFormData(url, this.configlist).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Swal.fire(
      //   'Deleted!',
      //   'Your data has been deleted.',
      //   'success'
      // );

      // Now do your stuff here
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
}



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



private getsysconfig(fid:any){
  // Get Information from JSON REST api
 //  alert('get sys config');

    const url = this.restService.firmRestURL('config', fid);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        const datalist=response;
        for(let etnry of datalist){
            sessionStorage.setItem(etnry.name ,etnry.value);
         }

        this.configlist1 = response;
        location.reload();
      },
      error => {
        console.log('Error in data load.');
      }
    );

  //  alert('sfas');
}


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
  this.firm.login.password = String( Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
}
private employeemail() {
  const email = {
    // role: { role: 'ADMIN' },
    to:this.firm.email,
    cc: "inouvellesolutions@gmail.com",
    templateId: 'simplemail',
    contentData: {
      content: {
        message: 'Dear Sir,\n \n' +
         this.firm.name + ' your account is generated \n' +
          ' Account Details:\n '
          + 'Login Id : ' +this.firm.login.username + '\n'
          + 'Password : ' + atob(this.firm.login.password) + '\n'
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
   ( response:any) => {
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


private getCatlist() {
  // Get Information from JSON REST api
  const url = this.restService.catRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      this.categoryList = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

Setphone()
{
  this.firm.login.username=this.firm.phone;
}
}
