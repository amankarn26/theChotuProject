import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-branchdetails',
  templateUrl: './branchdetails.component.html',
  styleUrls: ['./branchdetails.component.css']
})
export class BranchdetailsComponent implements OnInit {
  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public statelist = [];
  public citylist = [];
  public file;
  public id;
  private member = {
    role: '',
  };

  vendorname=[];

  message ={
    toMobile:'',
    message:'',
    DCS:0

  }

  vendlistname;

  public checkthis;

  public notadddeddata = [];
  public routecategory;
  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public branchcatgeory = sessionStorage.getItem('category');
  public prodtypeselect;
  public prodtypeselectt;

  public prodtlist= [] ;

  public categoryList=[];
  public categorytype;
   public prodtype;

  public emp;

  public document;
  public branchid;

  public branch = {
    name: '',
    firm: sessionStorage.getItem('firm'),
    // dob: '',
    // regno: '',
    phone: '',
    email: '',
    branchtype: '',
    // code: '',
    // empcount: '',
    // pannum: '',
    // gstin: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };


  public docServer = this.restService.docServer;

  private photo = { docname: '', docpath: '', docdesc: '', doctype: '' };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public urls;
  public isUpdate = false;

  public custdetails;
  public cust_datalist;
  public doclist;
  public customerId;

  public notdataprodtype;
  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  public empmails = [];
  public employees = [];

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
      this.customerId = this.id;
    }

    if (this.routprms.snapshot.params['category']) {
      this.routecategory = this.routprms.snapshot.params['category'];
      this.routecategory =encodeURIComponent(this.routecategory)

    }

    console.log(this.routecategory)
    console.log(encodeURIComponent(this.routecategory));

    //this.routecategory =encodeURIComponent(this.routecategory);

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addbranch') {
      this.title = 'Add Branch';
      this.subtitle = 'Fill new branch information and submit.';
      this.isManageState = false;

    } else if (this.route.url === '/branch_stock/' + this.id+'/'+ this.routecategory) {

    console.log(this.route.url);

    //  this.getFirm();

    //  this.getCatlist();
    this.getprodtypelistbycatgory();
    this.getdata();
    this.getnotadded();

    } 
    else if (this.route.url === '/branch_broadcast') {

      console.log(this.route.url);
  
      this.Branchbroadcastlist();
  
      } else {
      this.title = 'Branch Details';
      this.subtitle = 'Manage branch information including view, add, update and delete';

      this.getEmpById();
      // this.getcustDatabyId();
      // this.getcustDocsbyId();
    }


  }

  // checkall()
  // {
  //   this.checkthis = true;
  // }
  private getRoleList() {
    // // Get Information from JSON REST api
    // var url = this.restService.firmRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.data = response;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  updateData() {
    // console.log('submiti function');
    // // alert('inside update');







    // if (this.file) {
    //   // if( this.firm['logo']){
    //   this.uploadfile();
    //   this.firm['logo'] = this.photo;
    //   // }else{
    //   //   this.uploadfile();
    //   //   this.submitdoc();
    //   // }
    // } else {
    //   //  alert('No File selected');
    // }

    // //    delete this.firm['logo'];


    // var url = this.restService.firmRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.firm).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managefirm']);
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

  private getFirm() {
    // // Get Information from JSON REST api
    // let url = this.restService.firmRestURL('details', this.id);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log('Done fatching data!');

    //     //  this.firm.address.states = [this.getStateList()];
    //     this.datalist = response;
    //     this.getCityList(this.datalist.address.states);
    //     this.firm = response;
    //     console.log(response);
    //     // this.firm.address.states = this.datalist.address.states;
    //     // this.firm.address.states = this.datalist.address.states;




    //     this.datalist = response;
    //     this.getCityList(this.datalist.address.states);
    //     this.firm = response;
    //     console.log(response);
    //     // this.firm.address.states = this.datalist.address.states;
    //     // this.firm.address.city = this.datalist.address.states;
    //     if (response.logo) {
    //       this.urls = this.docServer + '/' + response.logo.docpath;
    //     }
    //     this.firmid = response.id;

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
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

  /*
  multiJson(data){


      let objMember = new Object();
      let objAddress =new Object();
      objCourt["name"]=this.court.name;

      objCourt["judge"]=this.court.judge;
      objCourt["contact"]=this.court.contact;
      objCourt["location"]=this.court.city;
      objCourt["url"]=this.court.url;

      objAddress["line1"]=this.court.line1;
      objAddress["line2"]=this.court.line2;
      objAddress["pincode"]=this.court.pincode;
      objAddress["states"]=this.court.states;
      objAddress["city"]=this.court.city;
      objAddress["country"]=this.court.country;

      objCourt["address"]=objAddress;

      console.log("Builded Object");
      console.log(objCourt);
      return objCourt;

    }*/

  submitData() {

    // let flg = true;

    // if (this.firm.pannum != '' || this.firm.gstin != '') {
    // console.log('submiti function');
    // var url = this.restService.firmRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.firm).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     this.firmid = response.id;
    //     if (this.file) {

    //       this.uploadfile();
    //       this.submitdoc();
    //     }

    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managefirm']);
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

    // }else{
    //   Swal.fire(
    //     'Please add PAN no. Or GST no.',
    //      '',
    //      'error'
    //    );
    // }
  }

  deleteRole(id: any) {
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
    // // Get Information from JSON REST api
    // const url = this.restService.PincodeRestURL('', this.firm.address.pincode);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.statelist = response;
    //     this.firm.address.states = response.state_name;
    //     this.firm.address.city = response.city_name;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  fileEvent(fileInput: any) {
    // // alert('file event begin');
    // if (fileInput.target.files[0] != '') {
    //   this.file = fileInput.target.files[0];
    //   var reader = new FileReader();
    //   reader.onload = (event: any) => {
    //     this.urls = event.target.result;
    //   }
    //   reader.readAsDataURL(fileInput.target.files[0]);
    //   console.log('Inside multiple file select');
    // }
  }

  uploadfile() {

    // if (this.file) {
    //   const fileExtension = '.' + this.file.name.split('.').pop();
    //   const rname = Math.random().toString(36).substring(7) + new Date().getTime();

    //   let objDoc = new Object();
    //   this.photo.docname = this.file.name;
    //   this.photo.doctype = 'LOGO';
    //   this.photo.docpath = this.firmid + '/' + rname + this.file.name;

    //   var docFormData = new FormData();
    //   // docFormData.append('doc', this.file, this.fileName);
    //   docFormData.append('doc', this.file, rname + this.file.name);
    //   docFormData.append('name', this.firmid);
    //   var docurl = this.restService.docsRestURL('upload', '');
    //   console.log(docurl);

    //   this.restService.uploadFormData(docurl, docFormData).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       console.log('Status on Upload API');
    //       console.log(response);
    //       // Now do your stuff here
    //       return 1;
    //     },
    //     error => {
    //       // Error Message
    //       console.log('Error in doc upload .');
    //       return 0;
    //       // Do your stuff here
    //     }
    //   );
    // } else {
    //   return 0;
    // }

  }

  submitdoc() {

    // let docs = {
    //   id: this.firmid,
    //   logo: this.photo
    // };

    // console.log('submiti function');
    // var url = this.restService.firmRestURL('logoadd', '');
    // console.log(url);
    // this.restService.postFormData(url, docs).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     this.firmid = response.id;
    //     console.log('Status on Post API');
    //     console.log(response);
    //   },
    //   error => {
    //     // Error Message
    //     this.alertify.alert('<b>Failed to add Firm Logo</b><br>' + error.statusText + '<br>'
    //       + error._body);
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;
  }

  // customer details
  private getEmpById() {

    // Get Information from JSON REST api
    const url = this.restService.branchRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Emp by id');
        console.log(response);
        this.emp = response;
        if (response.photo) {
          this.url = this.docServer + '/' + response.photo.docpath;
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  private getcustDatabyId() {
    // Get Information from JSON REST api
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

  private getcustDocsbyId() {
    // // Get Information from JSON REST api
    // const url = this.restService.customerRestURL('getcustDocsbyId', this.customerId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     this.doclist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  dwld(data: any) {
  //  window.open(this.docServer + '/' + data.docpath);

  }

  public getprodbyprodtype() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
  //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.productRestURL('byprodtype', this.prodtype);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.data = res;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  refreshincall()
  {
    this.prodtype = undefined;
    this.categorytype=undefined;
    this.prodtypeselect=undefined;
    this.getdata();
  }

  getprodtypelistbycatgory()
{
 // http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
  let url = this.restService.prodtypeRestURL('bycategory', this.routecategory);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      console.log('Done fatching data from prod property!');
      const res: any = response;
      this.prodtlist = res;
      console.log(response);
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

  private getProdlist() {
  // Get Information from JSON REST api
  const url = this.restService.prodtypeRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      this.prodtlist = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
  }

  getdata()
{
// http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

  var api = '?firm='+this.id;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      this.data=response;
     // this.proplist = response;
      // this.productdata=response;
      // this.productdata['rateperunit']=0;
      // this.productdata['available']='NO';


      // this.stockavailable=response.status;

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

  getnotadded()
{
// http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

  var api = '/notstock?branch='+this.id;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      this.notadddeddata=response;
    

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

  getdatabyprodtype()
  {
// http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

//http://localhost:8090/SmartSupplyManager/rest/product?firm=19341&ptype=JUICE

  var api = '?ptype='+this.prodtype+'&branch='+this.id;
  let url = this.restService.productRestURL('product', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');
     // this.proplist = response;
     this.data=response;

      if(!this.data.length)
      {
        Swal.fire('No Products are available For this Product Type','Please try after sometime or try adding different product','warning');
        this.prodtype='';
        this.getdata();
      }

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

  getnotaddedbyprodtype()
  {
///notstock/search?firm=19341&ptype=Dry fruits


  var api = '/notstock/search?branch='+this.id+'&ptype='+this.notdataprodtype;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');
     // this.proplist = response;
     this.notadddeddata=response;

      if(!this.notadddeddata.length)
      {
        Swal.fire('No Products are available For this Product Type','Please try after sometime or try adding different product','warning');
        this.notdataprodtype='';
        this.getnotadded();
      }

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

  refreshincallnot()
  {
    this.notdataprodtype = undefined;
    this.categorytype=undefined;
    this.prodtypeselectt=undefined;
    this.getnotadded();
  }

  public deleteNewsList(id: any , mobile : any , name: any) {
  if (this.employees.indexOf(id) > -1) {
    // alert('pop');
    this.employees.splice(this.employees.indexOf(id), 1);
    this.empmails.splice(this.employees.indexOf(mobile), 1);
    this.vendorname.splice(this.employees.indexOf(name), 1);



  } else {
    this.employees.push(id);
    this.empmails.push(mobile);
    this.vendorname.push(name);
    //  alert('push');
  }
  //   alert(id);
//  console.log(this.employees);
   console.log(this.empmails);
  // console.log(this.vendorname);

  let smslist =[];

    const json={
      toMobile:'',
      message:this.message.message
    }
  
  for(let data of this.empmails)
  {
  
    json.toMobile=data;
    smslist.push(JSON.parse(JSON.stringify(json)));
  }
  
  console.log(smslist);
  }

  public sendmail() {

  let smslist =[];

  const json={
    toMobile:'',
    message:this.message.message,
    DCS:this.message.DCS
  }

for(let data of this.empmails)
{

  json.toMobile=data;
  smslist.push(JSON.parse(JSON.stringify(json)));
}

console.log(smslist);


  let custEmail ='';
  for(let data of this.empmails)
  {


      if(custEmail ===''){
        custEmail = data;
      }else{
        custEmail = custEmail +','+data;
      }

  }


  console.log(custEmail);

  this.message.toMobile = custEmail;
  




  if(this.message.message === null || this.message.message === '' )
  {
Swal.fire('Message cannot be full','Please fill the message body','info')
  }

  else
  {
    
  Swal.fire({
    title: 'Are you sure you want to send SMS?',
    //   text: this.email_table,  updated on 10/23/2018
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Sent it!',
    cancelButtonText: 'No, Cancel it'
  }).then((result) => {
    if (result.value) {
      // email code
      console.log('submiti function');
       console.log(this.message);
       const url = this.restService.smsRestURL('bulk_send', '');
      this.restService.postFormData(url, smslist).subscribe(
        (response:any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          this.message.message=null;
          this.message.toMobile =null;
          this.empmails=[];
          this.vendorname=[];
          document.getElementById('id01').style.display='none';
     

          Swal.fire('SMS Sent','','success');
          this.route.navigate(['/managebranch']);
          // Swal.fire('SMS and email sent to your registered Mobile no. and email id', email.body, 'success');
          // this.route.navigate(['/authentication']);
          return true;
        },
        error => {
          // Error Message
          console.log('Failed to send email message to customer');
          return false;
          // Doyour stuff here
        }
      );
      return 0;
      // email code end
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your Message Cancelled :)',
        'error'
      );
    }
  });
}
  }

  Branchbroadcastlist()
  {
 
  let url = this.restService.branchRestURL('branch_braodcast', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      this.data=response;
    

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

  showpopup(){
  document.getElementById('id01').style.display='block';
  let vendname ='';
  for(let data of this.vendorname)
  {

      if(vendname ===''){
        vendname = data;
      }else{
        vendname = vendname +','+data;
      }

  }


  console.log(vendname);

  this.vendlistname = vendname;

  }

  showpopup1(){
  document.getElementById('id02').style.display='block';
  let vendname ='';
  for(let data of this.vendorname)
  {

      if(vendname ===''){
        vendname = data;
      }else{
        vendname = vendname +','+data;
      }

  }


  console.log(vendname);

  this.vendlistname = vendname;

  }

  sendsmstoall()
  {

  var name;
  var number;
  for(let data of this.data)
  {
    name=data.name;
    number=data.mobile
    this.vendorname.push(name);
    this.empmails.push(number);
  }
 
  console.log(this.vendorname);
  console.log(this.empmails);

  this.showpopup1();

  }

  crossbutton()
  {

    this.vendorname=[];
    this.empmails=[];

    document.getElementById('id02').style.display='none';

  }
}
