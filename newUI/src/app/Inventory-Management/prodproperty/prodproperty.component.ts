import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestService } from './../../services/rest.service';
declare var Swal: any;


declare var Swal: any;
@Component({
  selector: 'app-prodproperty',
  templateUrl: './prodproperty.component.html',
  styleUrls: ['./prodproperty.component.css']
})
export class ProdpropertyComponent implements OnInit {

  //  private alertify = require('alertify.js');
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
  private csv = false;
  private impFlag = false;
  private showImport = false;
  private index = 0;
  private csvName;
  private name;
  private status = [];
  private error = [];
  private photos1;
  public userRole = sessionStorage.getItem('role');
  public urls;
  public tp = 0;
  private member = {
    role: '',
    description: ''
  };
  public product = {
    firm: sessionStorage.getItem('firm'),
    makername: '',
    name: '',
    prodtype: '',
    hsncode: '',
    ongoingrate: '',
    unitsinstock: 0,
    videolink: '',
    unitsonorder: '',
    reorderlevel: '',
    gsttype: 'EXCLUSIVE',
    gst: '',
    totalstockvalue: 0,
    vmodel: '',
    vtype: '',
    voption: '',
    // vcolour: '',
    isavail: 'NO',
    enginecc: '',
    mileage: '',
    description: '',
    priority: ''
  };

  public property = {
    product: '',
    pname: '',
    name: '', //  --- property name-- colour
    details: '', // --multiple colours available
    priority: '', // --
    startrange: '', // --1 L
    endrange: '', //  --9 L
    mandatory: 'YES'
  };


  // Product Properties

  public dyelem = {
    name: '',
    description: ''
  };

  public dyElemObjData = [];
  private dynamo;

  private category = {
    deployacct: '',
    name: '',
    description: '',
  };

  public calculatelength = 0;
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  public colourlist = [];
  public colourlistdb = [];
  public priority = 1;
  public details;
  public colour;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }


  ngOnInit() {
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
    }

    if (this.routprms.snapshot.params['name']) {
      this.name = this.routprms.snapshot.params['name'];
    }
    console.log('adadad');
    this.url = this.route.url;
    console.log( 'url' + decodeURIComponent(this.route.url));
    console.log( 'myurl' +  '/addproperty/' + this.id + '/' + (this.name));



    if (this.route.url === '/addproperty') {
      this.title = 'Add Product Property';
      this.subtitle = 'Fill new product information and submit.';
      this.isManageState = false;
      this.tab1 = true;
    } else if (decodeURIComponent(this.route.url) === '/addproperty/' + this.id + '/' + this.name) {
      this.title = 'Add Property For ' + this.name;
      this.subtitle = 'Fill new product information and submit.';
      this.isManageState = false;
      this.tab1 = true;

      this.property.product = this.id;
      this.property.pname = this.name;
      this.getByid();

    } else if (this.route.url === '/editproperty/' + this.id) {
      this.title = 'Update Product Property';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.getByid();
      this.tab1 = true;
      this.tab2 = true;
      this.isUpdate = true;
    } else if (this.route.url === '/detailproperty/' + encodeURIComponent(this.id)) {
      this.title = 'Product Property Details';
      this.subtitle = '';
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid();
    } else {
      this.title = 'Manage Product Property';
      this.subtitle = 'Manage product information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }
  }
  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  // for importing csv data for client
  private import_client() {
    this.csv = true;
    this.showImport = true;
  }

  private import_cancel() {
    this.csv = false;
    this.showImport = false;
    this.impFlag = false;
  }
  private getData() {
    // // Get Information from JSON REST api
    // var url = this.restService.productRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.data = response;

    //     this.tp = this.data.length;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  // Start: dynamic data
  onAddDyelem() {
    // if (this.dyelem.name !== '' && this.dyelem.description !== '') {
    //   this.dyElemObjData.push({
    //     'name': this.dyelem.name,
    //     'description': this.dyelem.description
    //   });
    //   this.dyelem.name = '';
    //   this.dyelem.description = '';
    // } else {
    //   alert('Information not complited yet');
    // }
  }
  onDeleteDyelem(i) {
    this.dyElemObjData.splice(i, 1);
    Swal.fire('Deleted!', '', 'success');
  }


  updateData() {
    // if (this.getPhots[0] || this.fileArray[0]) {
    //   this.product['id'] = this.id;
    //   if (this.fileArray)
    //     console.log('submiti function');
    //   var url = this.restService.productRestURL('edit', '');
    //   console.log(url);
    //   this.restService.postFormData(url, this.product).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       console.log('Status on Post API');
    //       console.log(response);
    //       // Now do your stuff here
    //       Swal.fire('', '', 'success');
    //       if (this.fileArray.length > 0) {
    //         this.uploadfile();
    //       }
    //       window.scrollTo(0, 0);
    //       this.tab1 = false;
    //       this.tab2 = true;
    //       this.route.navigate(['/manageproduct']);
    //     },
    //     error => {
    //       // Error Message
    //       Swal.fire(
    //         error.statusText,
    //         error._body,
    //         'error'
    //       );
    //       console.log('Error in data load.');
    //       // Doyour stuff here
    //     }
    //   );
    //   return 0;
    // } else {
    //   Swal.fire(
    //     'Please, Select Minimum One Photo',
    //     '',
    //     'error'
    //   );
    // }
  }

  private getByid() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    let url = this.restService.prodpropRestURL('', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        console.log('Done fatching data from prod property!');
        this.datalist = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
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
    // };
    // console.log('submitDocarray function');
    // console.log(doc);
    // const url = this.restService.productRestURL('docarray', '');
    // this.restService.postFormData(url, doc).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //     this.route.navigate(['/manageproduct']);
    //     window.scrollTo(0, 0);
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
    // this.catList = [];
    // // Get Information from JSON REST api
    // var url = this.restService.catRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response:any) => {
    //     console.log(response);
    //     this.catList = response;
    //     console.log('Category data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }
  private deleteNewsList(id: any) {
    if (this.delList.indexOf(id) > -1) {
      this.delList.splice(this.delList.indexOf(id), 1);
    } else {
      this.delList.push(id);
    }
    console.log(this.delList);
  }

  deleteMultiplePhotos(ID: any) {
    // if (this.delList.length > 0) {
    //   const delPhots = {
    //     'container': this.id,
    //     'ids': this.delList
    //   };
    //   // start detlete
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: 'You will not be able to recover this data!',
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'No, keep it'
    //   }).then((result) => {
    //     if (result.value) {
    //       // delete code
    //       const url = this.restService.productRestURL('MPdelete', '');
    //       console.log('Delete using this id:' + delPhots);
    //       const json = delPhots;
    //       this.restService.postFormData(url, json).subscribe(
    //         (response:any) => {
    //           // Responce data.
    //           console.log('Status on Post API');
    //           console.log(response);
    //           Swal.fire('Deleted Successfully', '', 'success');
    //           this.getByid();
    //         },
    //         error => {
    //           // Error Message
    //           Swal.fire(
    //             error.statusText,
    //             error._body,
    //             'error'
    //           );
    //           console.log('Error in data load.');
    //           // Doyour stuff here
    //         }
    //       );
    //       // delete code end
    //       // For more information about handling dismissals please visit
    //       // https://sweetalert2.github.io/#handling-dismissals
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       Swal.fire(
    //         'Cancelled',
    //         'Your data is safe :)',
    //         'error'
    //       );
    //     }
    //   });
    // } else {
    //   Swal.fire(
    //     'Please, Select Atleast One Image',
    //     '',
    //     'error'
    //   );
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

  // submitData() {
  //   // console.log('submiti function');
  //   // this.product['colours'] = this.colourlist;
  //   // var url = this.restService.productRestURL('add', '');
  //   // console.log(url);
  //   // this.restService.postFormData(url, this.product).subscribe(
  //   //   (response:any) => {
  //   //     // Responce data.
  //   //     console.log('Status on Post API');
  //   //     console.log(response);
  //   //     Swal.fire('', '', 'success');
  //   //     window.scrollTo(0, 0);
  //   //     this.tab1 = false;
  //   //     this.tab2 = true;
  //   //     this.id = response.id;
  //   //     this.uploadfile();
  //   //   },
  //   //   error => {
  //   //     // Error Message
  //   //     Swal.fire(
  //   //       error.statusText,
  //   //       error._body,
  //   //       'error'
  //   //     );
  //   //     console.log('Error in data load.');
  //   //   }
  //   // );
  //   // return 0;
  // }
  /*****upload image********************************************************** */
  fileEvent(event: any) {
    this.urls = [];
    this.fileArray = [];
    this.urls = [];
    this.fileArray = [];
    const filesAmount = event.target.files.length + this.calculatelength;
    const files = event.target.files;
    if (files && filesAmount < 6) {
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
      Swal.fire(
        'Please Add Atleast One Image',
        'You can upload upto 5 images only',
        'error'
      );
    }
  }
  fileEvent1(fileInput: any) {
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      this.csvName = this.file.name;
    }
  }
  private onChangeCategoy(obj) {
    const stateId = obj.srcElement.value;
    console.log('getting name of secondary handler');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
  }
  uploadfile1() {
    // if (this.fileArray.length > 0) {
    //   console.log('Import function');
    //   const docFormData = new FormData();
    //   docFormData.append('csvFile', this.file, this.csvName);
    //   const docurl = this.restService.productRestURL('import', '');
    //   console.log(docurl);
    //   this.restService.uploadFormData(docurl, docFormData).subscribe(
    //     (response:any) => {
    //       // Responce data.
    //       console.log('Status on Upload API');
    //       this.alertify.alert('File Imported Successfully.');
    //       document.getElementById('openModalButton').click();
    //       console.log(response);
    //       response.forEach(element => {
    //         this.name.push(element.name); // for name
    //         this.status.push(element.errCode); // for error
    //         this.error.push(element.status); // for status
    //       });
    //       this.showImport = false;
    //       this.impFlag = true;
    //       this.csv = false;
    //       console.log('Collecting data for import response*********');
    //     },
    //     error => {
    //       Swal.fire(
    //         'Failed to import CSV File',
    //         'One of the column in csv not matched',
    //         'error'
    //       );
    //       console.log(error);
    //       console.log(error._body);
    //     }
    //   );
    //   return 0;
    // } else {
    //   return 0;
    // }
  }

  uploadfile() {
    // if (this.fileArray.length > 0) {
    //   console.log('uploadfile function');
    //   for (const file of this.fileArray) {
    //     const fileExtension = '.' + file.name.split('.').pop();
    //     const rname = Math.random().toString(36).substring(7) + new Date().getTime();
    //     let objDoc = new Object();
    //     objDoc['docname'] = file.name;
    //     objDoc['docpath'] = sessionStorage.getItem('firm') + '/Product/' + this.id + '/' + rname + file.name;
    //     objDoc['doctype'] = 'PRODUCT';
    //     this.docArray.push(objDoc);
    //     const docFormData = new FormData();
    //     docFormData.append('doc', file, rname + file.name);
    //     docFormData.append('name', sessionStorage.getItem('firm') + '/Product/' + this.id);
    //     const docurl = this.restService.docsRestURL('upload', '');
    //     console.log(docurl);
    //     this.restService.uploadFormData(docurl, docFormData).subscribe(
    //       (response:any) => {
    //         // Responce data.
    //         console.log('Status on Upload API');
    //         console.log(response);
    //       },
    //       error => {
    //         // Error Message
    //         console.log('Error in doc upload .');
    //       }
    //     );
    //   }
    //   this.submitDocarray(); // postint doc array
    //   return 0;
    // } else {
    //   Swal.fire(
    //     'Atleast One Image Is Mandotary',
    //     'Maximum 5 Images can be uploaded',
    //     'error'
    //   );
    // }
  }

  /*****End  upload image********************************************************** */
  deleteRole(id: any) {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this data!',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code
    //     const url = this.restService.productRestURL('delete', '');
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
    //         this.getData();
    //         if (this.detailFlag) {
    //           this.cancel();
    //         }
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

  private onChangetotalstockvalue() {
    this.product.totalstockvalue = Number(this.product.ongoingrate) * Number(this.product.unitsinstock);
  }

  public onchangegst() {

    if (Number(this.product.gst) > 50) {
      Swal.fire(
        'GST (%) can not be greater than 50%',
        '',
        'error'
      );
      this.product.gst = '';
    }
  }


  pushproperty() {

    const result1 =  this.datalist.find(x => x.name === this.property.name);

    if (!result1) {

      console.log('Property :');
      console.log(this.property);
      this.submitData();
    } else {

      Swal.fire('Duplicate Entry', '', 'error');
    }
  }


  submitData() {
    console.log('submiti function');
    // this.product['colours'] = this.colourlist;
    const url = this.restService.prodpropRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.property).subscribe(
      (response:any) => {
        // Responce data.
        console.log(response);

        this.getByid();
        this.property.name = '';
        this.property.priority = '';
        this.property.startrange = '';
        this.property.endrange = '';
        this.property.details = '';
        this.property.mandatory = 'YES';

      },
      error => {
        // Error Message
        // Swal.fire(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        console.log('Error in data load.');
      }
    );
    return 0;
  }



  pushcolor() {
    let flagger = true;
    for (const entry of this.colourlist) {
      if (this.colour == entry.size) {
        Swal.fire('Cannot Add Duplicate Colour', '', 'error');
        flagger = false;
      }
    }
    if (flagger) {
      if ((this.colour !== '')) {
        let obj = {
          colour: this.colour,
          priority: this.priority,
          details: this.details
        };
        this.colourlist.push(obj);

        if (this.isUpdate) {
          this.updateColour();
        }
        this.details = '';
        this.colour = '';
        this.priority = 1;
      } else {
        Swal.fire('Information not complited yet', '', 'error');
      }
    }
  }

  onDeleteDypostpresselem(i) {
    console.log('Deleting From colourlist array');
    this.colourlist.splice(i, 1);
    Swal.fire(
      'Deleted!',
      '',
      'success'
    );
  }

  onDeleteDypostpresselem1(id: any) {
    // console.log('Deleting size by id =' + id);
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'It will delete from all places wherever it is in used!',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.value) {
    //     // delete code
    //     const url = this.restService.productRestURL('deletecolour', '');
    //     console.log('Delete using this id:' + id);
    //     // const json = '{\"id\":\"' + id + '\"}';
    //     const json = {
    //       container: this.id,
    //       ids: [id]
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
    //         this.getByid();
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
  // editcolour
  private updateColour() {
    // const pcolor = {
    //   id: this.id,
    //   colours: this.colourlist
    // };
    // console.log('submitData function');
    // console.log(this.product);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.productRestURL('editcolour', '');
    // this.restService.postFormData(url, pcolor).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     this.getByid();
    //     this.colourlist = [];
    //     this.colourlistdb = [];
    //   },
    //   error => {
    //     // Error Message
    //     Swal.fire(error.statusText, error._body, 'error');
    //     console.log('Error in data load.');
    //   }
    // );
    // return 0;
  }
  next() {
    this.route.navigate(['/addpropertyvalue/' + this.id + '/' + this.name]);

  }

  delproperty(id: any) {
    console.log('Delete Property Called:' + id);

    // delete code
    const url = this.restService.prodpropRestURL('delete', id);
    this.restService.deleteFormData(url).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Swal.fire(
        //   'Deleted!',
        //   'Your data has been deleted.',
        //   'success'
        // );
        this.getByid();
        // Now do your stuff here
       // alert('deleted');
        Swal.fire('Deleted', '', 'success');
      },
      error => {
        // Error Message
        // Swal.fire(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        this.getByid();
        alert('error');
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );

  }
}
