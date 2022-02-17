import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var Swal: any;
@Component({
  selector: 'app-ratelable',
  templateUrl: './ratelable.component.html',
  styleUrls: ['./ratelable.component.css']
})
export class RatelableComponent implements OnInit {
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  private custList;
  public userType;
  public statelist = [];
  public citylist = [];
  private file;
  private fileName;
  private document;
  private fileArray = [];
  private docArray = [];
  public getPhots = [];
  public tab1 = false;
  public tab2 = false;
  public isUpdate = false;
 // public docServer = this.restService.docServer;
  public delList = [];
  public id;
  public detailFlag = false;

 // private compData;

 private csv = false;
 private showImport = false;
 private impFlag = false;
 private csvName;
 private name = [];
 private status = [];
 private error = [];

  private ratelabel={
    label:'',
    description:''
  };


  private product = {
    category: '',
    name: '',
    prodcode: '',
    rateunit:'',
    rateperunit:'',
    purchaseprice:'',
    unitsinstock:'',
    videolink:'',
    unitsonorder: '',
    reorderlevel: '',
    gst:'',
  };

  private category = {
    deployacct: '',
    name: '',
    description: '',
  };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  constructor(
    private route: Router,
   // private restService: RestService,
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


    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addratelabel') {
      this.title = 'Add Rate Lable';
      this.subtitle = 'Fill new product information and submit.';
      this.isManageState = false;
      this.tab1 = true;
      this. getCatList();


    } else if (this.route.url === '/editratelabel/' + this.id) {
      this.title = 'Edit Rate Label';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this. getCatList();
      this.getByid();
      this.tab1 = true;
      this.isUpdate = true;



    }
    else if (this.route.url === '/detailratelabel/' + encodeURIComponent(this.id)) {
      this.title = 'Rate Label Details';
      this.subtitle = '';
     // this.flag = true;
     // this.isUpdate = true;
     this.isManageState = false;
      this.detailFlag = true;
      this.getByid();
      //  this.updateEmp();
     // this.getRoleList();
     // this.getEmpById();
     // this.getGradeList();
     // this.getAllDept();
      //  this.getAllDept();
    }
    else {
      this.title = 'Manage Rate Label';
      this.subtitle = 'Manage product information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }


  }
  private getData() {
    // // Get Information from JSON REST api
    // var url = this.restService.ratelabelRestURL('', '');
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

    // this.ratelabel['id']=this.id;

    // console.log('submiti function');
    // var url = this.restService.ratelabelRestURL('edit', '');
    // console.log(url);
    // this.restService.postFormData(url, this.ratelabel).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
    //     Swal.fire('Updated', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.tab1 = false;
    //     this.tab2 = true;
    //     this.route.navigate(['/manageratelabel']);
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

  private getByid() {
            // // Get Information from JSON REST api
            // let url = this.restService.ratelabelRestURL('details', this.id);
            // this.restService.getJSONFromURL(url).subscribe(
            //   (response:any) => {
            //     console.log('Done fatching data!');
            //     // this.datalist = response;
            //     // this.getCityList(this.datalist.address.states);

            //     // this.product = response.product;
            //     // this.getPhots = response.photos;
            //     // this.product.name=response.name;
            //     // this.product.prodcode=response.prodcode;
            //     // this.product.rateunit=response.rateunit;
            //     // this.product.rateperunit=response.rateperunit;
            //     // this.product.purchaseprice=response.purchaseprice;
            //     // this.product.unitsinstock=response.unitsinstock;
            //     // this.product.videolink=response.videolink;
            //     // this.product.unitsonorder=response.unitsonorder;
            //     // this.product.reorderlevel=response.reorderlevel;
            //     // this.product.gst=response.gst;

            //     // this.product.category= response.category;
            //     this.ratelabel.label=response.label;
            //     this.ratelabel.description=response.description;




            //     console.log(response);

            //     // this.compData=JSON.parse(JSON.stringify(this.product));
            //     // console.log('error in data upload n')
            //     // console.log(this.product);
            //     // console.log(this.compData);

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

    // submit doc array
  private submitDocarray() {

    // let doc = {
    //   id: this.id,
    //   photos: this.docArray
    // }
    // console.log('submitDocarray function');
    // console.log(doc);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.productRestURL('docarray', '');
    // this.restService.postFormData(url, doc).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //    // }
    //     this.route.navigate(['/manageratelabel']);
    //     window.scrollTo(0, 0);
    //     //   this.uploadFlag = true;
    //     // this.id = response.id;

    //     //    }
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


  private getCatList() {
    // this.catList=[];
    // // Get Information from JSON REST api
    // var url = this.restService.catRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.catList = response;
    //     console.log('Category data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getCustList() {
    // // Get Information from JSON REST api
    // var url = this.restService.supplierRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.custList = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }


  private deleteNewsList(id: any) {
    if (this.delList.indexOf(id) > -1) {
      // alert('pop');
      this.delList.splice(this.delList.indexOf(id), 1);

    } else {
      this.delList.push(id);
      //  alert('push');
    }
    //   alert(id);
    console.log(this.delList);
  }

  deleteMultiplePhotos() {

    // const delPhots = {
    //   'container': this.id,
    //   'ids': this.delList
    // };
    // if (confirm('Are you sure you want to delete this?')) {
    //   const url = this.restService.productRestURL('MPdelete', '');
    //   console.log('Delete using this id:' + delPhots);
    //   const json = delPhots;
    //   this.restService.postFormData(url, json).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       console.log('Status on Post API');
    //       console.log(response);
    //       alert('Deleted Successfully');
    //       this.getByid();
    //       // Now do your stuff here
    //     },
    //     error => {
    //       // Error Message
    //       alert('<b>Failed to delete</b><br>' + error.statusText + '<br>'
    //         + error._body);
    //       console.log('Error in data load.');
    //       // Doyour stuff here
    //     }
    //   );
    //   return 0;
    // }
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
    // console.log('submiti function');
    // var url = this.restService.ratelabelRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.ratelabel).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.tab1 = false;
    //     this.tab2 = true;
    //     this.id = response.id;
    //   this.route.navigate(['/manageratelabel']);
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

  /*****upload image********************************************************** */

  fileEvent(fileInput: any) {
    // 2  alert('file event begin');
    // if (fileInput.target.files[0] != '') {
    if (fileInput.target.files && fileInput.target.files.length < 4) {
      this.file = fileInput.target.files[0];
     // this.fileName = this.event.category;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      for (let fi of fileInput.target.files) {
        this.fileArray.push(fi);
        // 3   alert(this.fileArray);
      }
      console.log('Inside multiple file select');
      console.log(this.fileArray);
    } else {
      alert('Check the number of images');
    }
  }



  // @Input() multiple: boolean = false;

  uploadfile() {

    // //  if (this.news.category != '') {
    // if (this.file) {

    //   console.log('uploadfile function');
    //   //   alert("have a file");
    //   // console.log(this.proceeding);


    //   for (let file of this.fileArray) {


    //     const fileExtension = '.' + file.name.split('.').pop();
    //     const rname = Math.random().toString(36).substring(7) + new Date().getTime();

    //     let objDoc = new Object();
    //     objDoc['docname'] = file.name;
    //     // objDoc['docpath'] = this.product.firm + '/product/' + this.id + '/' + rname + file.name;
    //     objDoc['doctype'] = 'PRODUCT';
    //     this.docArray.push(objDoc);


    //     var docFormData = new FormData();

    //     //    docFormData.append('doc', this.file, this.fileName);
    //     docFormData.append('doc', file, rname + file.name);
    //     // docFormData.append('name', this.product.firm + '/product/' + this.id );
    //     var docurl = this.restService.docsRestURL('upload', '');
    //     console.log(docurl);

    //     this.restService.uploadFormData(docurl, docFormData).subscribe(
    //       (response:any) => {
    //         // Responce data.
    //         console.log('Status on Upload API');
    //         console.log(response);
    //         // Now do your stuff here

    //       },
    //       error => {
    //         // Error Message
    //         console.log('Error in doc upload .');

    //         // Do your stuff here
    //       }
    //     );

    //   }

    //   this.submitDocarray(); // postint doc array
    //   //  this.submitAdvtData(); // posting selected advt in array


    //   return 0;
    // } else {
    //   alert('Check the number of images');
    //   // return 0;
    // }
    // //  } else {
    // //  alert('Category  Name can not be empty');
    // //    return 1;
    // // }
  }


  /*****End  upload image********************************************************** */

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
    //     const url = this.restService.ratelabelRestURL('delete', '');
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
    //         this.route.navigate(['/manageratelabel']);
    //         this.getData();
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
    // })
  }


  // for importing csv data for client
  private import_client() {
    // alert('true');
    this.csv = true;
    this.showImport = true;
  }
  private import_cancel() {
    // alert('false');
    this.csv = false;
    this.showImport = false;
    this.impFlag = false;
  }


  fileEvent1(fileInput: any) {
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      this.csvName = this.file.name;
    }
  }


  uploadfile1() {


    // if (this.file) {
    //   console.log('Import function');
    //   // console.log(this.proceeding);
    //   var docFormData = new FormData();

    //   docFormData.append('csvFile', this.file, this.csvName);
    //   // http://localhost:8090/SuppChainManager/rest/prodlabel/import
    //   var docurl = this.restService.ratelabelRestURL('import', '');
    //   console.log(docurl);
    //   this.restService.uploadFormData(docurl, docFormData).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       // console.log(response._body);
    //       console.log('Status on Upload API');
    //       this.alertify.alert('File Imported Successfully.');
    //       document.getElementById('openModalButton').click();
    //       console.log(response);
    //       response.forEach(element => {
    //         // alert(element.name);

    //         // this.name = [];
    //         // this.status = [];
    //         // this.error = [];

    //         this.name.push(element.name); // for name
    //         this.status.push(element.errCode); // for error
    //         this.error.push(element.status); // for status
    //       });
    //       this.showImport = false;
    //       this.impFlag = true;
    //       this.csv = false;

    //       console.log('Collecting data for import response*********');
    //       // console.log( this.nm);
    //       // console.log( this.st);
    //       // console.log( this.er);
    //       // this.getCourtList();
    //       /*  var headers = response.headers;
    //         console.log(headers); //<--- Check log for content disposition
    //         var contentDisposition= headers.get('content-disposition');*/
    //     },
    //     error => {
    //       // ************************************ */
    //       // let body = error.text();
    //       // console.log(body);
    //       //   var headers = error.response.headers;
    //       //   console.log(error.headers); // <--- Check log for content disposition
    //       //   var contentDisposition= error.headers.get('content-disposition');
    //       // //  if (error.status == 200) {
    //       //   Swal.fire('Error body', 'error');
    //       Swal.fire(
    //         'Failed to import CSV File',
    //         'One of the column in csv not matched',
    //         'error'
    //       );
    //       // alert('ok with error');
    //       // alert(error.status);
    //       console.log(error);
    //       console.log(error._body);

    //       // Do your stuff here
    //     }
    //   );
    //   return 0;
    // } else {
    //   return 0;
    // }
  }
}
