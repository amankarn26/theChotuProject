import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import { RestService } from './../../services/rest.service';
declare var Swal: any;


declare var Swal: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //  private alertify = require('alertify.js');

  src: string = "";
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 200,
    resizeMaxWidth: 200,
    resizeQuality: 200000

  };

  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  private custList;
  // public userType;
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
  public docServer = this.restService.docServer;
  public delList = [];
  public id;
  public productidfromresponse;
  public detailFlag = false;
  private csv = false;
  private impFlag = false;
  private showImport = false;
  private index = 0;
  private csvName;
  private name = [];
  private status = [];
  private error = [];
  private photos1;
  public role;
  public csvFile;
  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public firmcatgeory = sessionStorage.getItem('category');

  public urls = [];
  public tp = 0;
  private member = {
    role: '',
    description: ''
  };

  public prodtypeselect;

  public properties = [];

  public prodlist;
  public prodtlist;
  public prodtlistt: any;

  public product = {
    //  firm: sessionStorage.getItem('firm'),
    //   makername: '',
    name: '',
    dishtype: 'VEG',
    menutype: '',
    hsncode: '',
    rateunit: 'RATEPERPLATE',
    rateperunit: '0.0',
    description: '',
    priority: 1,
    serves: 1,
    hasvariant: 'NO',
    bestseller: 'YES'

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

  public categoryList = [];
  public categorytype;

  public colourlist = [];
  public colourlistdb = [];
  public priority = 1;
  public details;
  public colour;
  public primaryImg;
  branchcatgeory: string;
  // photo: any;


  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '', isprimary: 'YES' },
  };
  dishlistt: any;
  menulist: any;
  maxlength: any;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.userRole);
    console.log(this.userType);

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
    }
    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);
    if (this.route.url === '/addproduct') {
      this.title = 'Add Dish/Drink';
      this.subtitle = 'Fill new Dish/Drink information and submit.';
      this.isManageState = false;
      this.tab1 = true;
      this.getProdlist();
    } else if (this.route.url === '/editproduct/' + this.id) {
      this.title = 'Update Dish/Drink';
      this.subtitle = 'Update Dish/Drink information and submit.';
      this.isManageState = false;
      this.getByid();
      this.tab1 = true;
      this.tab2 = true;
      this.isUpdate = true;
      this.getProdlist();
    } else if (this.route.url === '/detailproduct/' + encodeURIComponent(this.id)) {
      this.title = 'Dish/Drink Details';
      this.subtitle = '';
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid();
      this.getprodpropByid();
    } else {
      this.title = 'Manage Dish/Drink';
      this.subtitle = 'Manage Dish/Drink information including view, add, update and delete';
      // this.userType = sessionStorage.getItem('role');
      this.getCatlist();
      this.getprodtype();
      this.getData();

    }
  }

  selected(imageResult: ImageResult, event: any) {
    //console.log(event);
    console.log(imageResult);
    console.log(event);

    this.src = imageResult.resized && imageResult.resized.dataURL;
    console.log(this.src);
    console.log(imageResult.resized);

    if (this.fileArray.length < 5) {
      this.fileArray.push(imageResult.file);
      this.urls.push(this.src);
      console.log(this.fileArray);
    } else {
      //'not allowed greater than 5 photos
      Swal.fire(
        'Please Add Atleast One Image',
        'You can upload upto 5 images only',
        'error'
      );

    }
    console.log(this.fileArray.length);
  }

  deletephotofromarry(i: number) {
    console.log(i);
    this.urls.splice(i, 1);
    this.fileArray.splice(i, 1);

    Swal.fire('Deleted!', '', 'success');
    console.log(this.fileArray);
    if (this.fileArray.length === 0 || this.urls.length === 0) {
      this.document = '';
    }
  }

  addnewfile() {
    this.src = '';

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
    // Get Information from JSON REST api
    this.restService.enableloading();

    // if(this.userRole==='SUPERADMIN' && this.userType==='FIRM ')
    // {
    //   var url = this.restService.dishRestURL('', '');
    // }
    // else
    // {
    //     var api = '?category='+this.branchcatgeory+'&branch='+sessionStorage.getItem('branch');
    //     var url = this.restService.dishRestURL('bycategory', api);
    // }

    var url = this.restService.dishRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        this.tp = this.data.length;
        console.log(response);
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();
      }
    );
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

    //    delete this.product['photos'];


    if (this.getPhots[0] || this.fileArray[0]) {
      this.product['id'] = this.id;
      if (this.fileArray)
        console.log('submiti function');
      var url = this.restService.dishRestURL('edit', '');
      console.log(url);
      this.restService.postFormData(url, this.product).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          //alert('Updated');
          Swal.fire('Updated', '', 'success');
          if (this.fileArray.length > 0) {
            this.uploadfile();
          } else {
            //  this.route.navigate(['/addproperty/' + this.id + '/' + this.product.name]);
            window.scrollTo(0, 0);
          }
          window.scrollTo(0, 0);
          // this.tab1 = false;
          // this.tab2 = true;
          this.route.navigate(['/manageproduct']);
        },
        error => {
          // Error Message
          alert('Failed to update');
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
      // Swal.fire(
      //   'Please, Select Minimum One Photo',
      //   '',
      //   'error'
      // );
    }
  }

  private getByid() {
    // // Get Information from JSON REST api
    let url = this.restService.dishRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');

        const res: any = response;
        this.product = res;
        //   alert(res.gsttype);
        this.getPhots = res.photos;
        this.product.name = res.name;
        // this.product.unitsinstock = res.unitsinstock;
        //  this.product.videolink = res.videolink;
        //   this.product.unitsonorder = res.unitsonorder;
        //  this.product.reorderlevel = res.reorderlevel;
        //  this.product.gsttype = res.gsttype;
        //   this.product.gst = res.gst;
        this.product.menutype = res.menutype;
        this.product.hsncode = res.hsncode;
        //  this.product.videolink = res.videolink;
        //this.colourlistdb = res.colours;
        this.product.description = res.description;
        //     this.product.totalstockvalue = res.totalstockvalue;
        this.product.priority = res.priority;
        // this.product.brand = res.brand;

        this.calculatelength = res.photos.length;
        console.log(this.calculatelength);
        if (res.photos) {
          this.photos1 = res.photos;
        }
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
    let doc = {
      id: this.id,
      photos: this.docArray
    };
    console.log('submitDocarray function');
    console.log(doc);
    const url = this.restService.dishRestURL('docarray', '');
    this.restService.postFormData(url, doc).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //  Swal.fire('', '', 'success');
        //     this.route.navigate(['/manageproduct']);
        // this.route.navigate(['/addproperty/' + this.id + '/' + this.product.name]);
        window.scrollTo(0, 0);
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

    // alert('Inside multiple photos delete');
    if (this.delList.length > 0) {
      const delPhots = {
        'container': this.id,
        'ids': this.delList
      };

      const url = this.restService.dishRestURL('MPdelete', '');
      console.log('Delete using this id:' + delPhots);
      const json = delPhots;
      this.restService.postFormData(url, json).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          Swal.fire('Deleted Successfully', '', 'success');
          this.getByid();
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
      // start detlete
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
      //     const url = this.restService.productRestURL('MPdelete', '');
      //     console.log('Delete using this id:' + delPhots);
      //     const json = delPhots;
      //     this.restService.postFormData(url, json).subscribe(
      //       (response:any) => {
      //         // Responce data.
      //         console.log('Status on Post API');
      //         console.log(response);
      //         Swal.fire('Deleted Successfully', '', 'success');
      //         this.getByid();
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
    } else {
      // Swal.fire(
      //   'Please, Select Atleast One Image',
      //   '',
      //   'error'
      // );
    }
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

    // if (this.maxlength === '127') {
    //   Swal.fire('You Must Select Primary Image', 'Mandotary', 'warning');
    // }

    this.primaryImg = 0;
    if (this.primaryImg === '' || this.primaryImg === null || this.primaryImg === undefined) {
      Swal.fire('You Must Select Primary Image', 'Mandotary', 'warning');
    }
    else {

      console.log('submiti function');
      const url = this.restService.dishRestURL('add', '');
      console.log(url);
      this.restService.postFormData(url, this.product).subscribe(
        (response: any) => {

          const dataobj: any = response;
          console.log('Status on Post API');
          console.log(response);
          this.id = response.id;
          this.uploadfile();
          Swal.fire('Dish/Drink Added', '', 'success');

          this.route.navigate(['/manageproduct']);
          window.scrollTo(0, 0);

        },
        error => {
          Swal.fire(
            'Error:' + error.error,
            error.status,
            'error'
          );
          console.log('Error in data load.');
        }
      );
      return 0;
    }
  }


  // submitData() {

  //   this.uploadfile();



  //   console.log('submiti function');
  //   var url = this.restService.dishRestURL('add', '');
  //   this.product['photo']=this.photo.photo;
  //   console.log(url);
  //   this.restService.postFormData(url, this.category).subscribe(
  //     (response : any) => {
  //       console.log('Status on Post API');
  //       console.log(response);
  //       this.id = response.id;

  //       if (this.file) {
  //         this.photo.id = response.id;
  //         this.photoAdd();
  //       }  else {
  //         Swal.fire('Submited', '', 'success');
  //         window.scrollTo(0, 0);
  //         console.log(response);
  //         this.route.navigate(['/manageproduct']);
  //       }
  //     },
  //     error => {
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
  // }

  //   private photoAdd() {

  //     this.uploadfile();

  //     console.log('submitData function');
  //     console.log(this.photo);
  //     const url = this.restService.dishRestURL('edit', '');
  //     this.restService.postFormData(url, this.photo).subscribe(
  //      ( response:any) => {

  //         console.log('Status on Post API');
  //         console.log(response);

  //         Swal.fire('Added', '', 'success');
  //         window.scrollTo(0, 0);
  //         this.route.navigate(['/manageproduct']);
  //       },
  //       error => {

  //         Swal.fire(
  //           error.statusText,
  //           error._body,
  //           'error'
  //         );
  //         console.log('Error in data load.');
  //       }
  //     );

  //     return 0;
  // }
  /*****upload image********************************************************** */
  fileEvent(event: any) {
    console.log(event);
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
          console.log('targe . result');
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

    let index = 0;
    this.primaryImg = 0;
    if (this.fileArray.length > 0) {
      console.log('uploadfile function');
      for (const file of this.fileArray) {
        const fileExtension = '.' + file.name.split('.').pop();
        const rname = Math.random().toString(36).substring(7) + new Date().getTime();
        let objDoc = new Object();
        objDoc['docname'] = file.name;

        // sessionStorage.getItem('firm')
        objDoc['docpath'] = '11' + '/Product/' + this.id + '/' + rname + file.name;
        objDoc['doctype'] = 'PRODUCT';
        objDoc['isprimary'] = 'NO';

        if (index === this.primaryImg) {
          objDoc['isprimary'] = 'YES';
        }

        this.docArray.push(objDoc);
        const docFormData = new FormData();
        docFormData.append('doc', file, rname + file.name);
        // sessionStorage.getItem('firm')
        docFormData.append('name', '11' + '/Product/' + this.id);

        docFormData.append('width', '400');
        docFormData.append('height', '400');

        const docurl = this.restService.customUpload('upload', '');
        console.log(docurl);
        this.restService.uploadFormData(docurl, docFormData).subscribe(
          (response: any) => {
            // Responce data.
            console.log('Status on Upload API');
            console.log(response);

          },
          error => {
            // Error Message
            console.log(error);
            console.log('Error in doc upload .');
          }
        );

        index = index + 1;
      }


      this.submitDocarray(); // postint doc array
      return 0;
    } else {
      Swal.fire(
        'Atleast One Image Is Mandotary',
        'Maximum 5 Images can be uploaded',
        'error'
      );
    }
  }

  /*****End  upload image********************************************************** */
  deleteRole(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.dishRestURL('delete', id);
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
            this.route.navigate[('/manageproduct')];
            this.getData();

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

  private onChangetotalstockvalue() {
    // this.product.totalstockvalue = Number(this.product.ongoingrate) * Number(this.product.unitsinstock);
  }

  public onchangegst() {

    // if (Number(this.product.gst) > 50) {
    //   Swal.fire(
    //     'GST (%) can not be greater than 50%',
    //     '',
    //     'error'
    //   );
    //   //  this.product.gst = '';
    //   //  this.product.rate
    // }
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
    //   type: 'Warning',
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

  public getprodtype() {

    if (this.userRole === 'SUPERADMIN') {
      this.getProdlist();
      this.getProdlistt();
    }
    if (this.userRole === 'FIRM') {
      this.getprodlistbybranch();
    }
  }

  private getProdlist() {
    // Get Information from JSON REST api
    const url = this.restService.menutypeRestURL('add', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.prodtlist = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getProdlistt() {
    // Get Information from JSON REST api
    const url = this.restService.menutypeRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.prodtlistt = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getprodlistbybranch() {
    // Get Information from JSON REST api
    this.restService.enableloading();


    const url = this.restService.menutypeRestURL('bycategory', sessionStorage.getItem('category'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.prodtlistt = response;

        console.log(this.prodtlist);
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  setPrimary(index: any) {
    console.log('index :' + index);
    this.primaryImg = index;
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

  private getprodpropByid() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    let url = this.restService.prodpropRestURL('', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.properties = res;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getprodbyprodtype() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    this.restService.enableloading();

    // alert('123456');
    // let url = this.restService.dishRestURL('byprodtype', this.id);
    let url = this.restService.dishRestURL('byprodtype', this.product.name);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.data = res;
        console.log(response);
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  refreshincall() {


    this.product.menutype = undefined;
    this.categorytype = undefined;
    this.prodtypeselect = undefined;
    this.getData();




  }

  getprodtypelistbycatgory() {
    // http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.menutypeRestURL('bycategory', this.categorytype);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.menulist = res;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
}
