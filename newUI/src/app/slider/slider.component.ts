import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {
 // public alertify = require('alertify.js');

  public title;
  public subtitle;
  public getPhots;
  public flag = false;
  public rolelist;
  public statelist;
  public citylist;
  // for update employee
  public isUpdate = false;
  public isDetails = false;
  public cleanup = false;
  public id;
  public uploadFlag = false; // false
  public fileArray = [];
  public docArray = [];
  public delList = [];
  public gradeList;
  public url;
  public urls;
  public file;
  public fileName;
  public docServer = this.restService.docServer;
  public emp = {

    fname: '', mname: '', lname: '', phone: '', email: '', guardian: '', dob: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    },
    designation: '',
    password: '',
    role: { role: '' },
    gender: '',
    panno: '',
    etype: '',
    mstate: '',
    grade: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '' }
  };

  public event = {
    title : '',
    description: '' ,
    place: '',
    addedby: sessionStorage.getItem('id'),
    addedbyname:  sessionStorage.getItem('name'),
    url: '',
    published: '',
    tags: '',
    firm: sessionStorage.getItem('firm')
  };

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'id';
  public sortOrder = 'asc';
  public data;
  public empId;

  constructor(public restService: RestService,
    public route: Router,
    public routprms: ActivatedRoute
  ) { }

  ngOnInit() {

    // Read parameter from route
    // console.log(this.routprms.snapshot.params['id']);
    // this.empId = this.routprms.snapshot.params['id'];
    this.id = this.routprms.snapshot.params['id'];

    if (this.route.url === '/updateslider/' + encodeURIComponent(this.id)) {
      this.title = 'Update Slider ';
      this.subtitle = 'Edit Slider  details.';
      this.flag = true;
      this.isUpdate = true;
      //  this.updateEmp();
     // this.getRoleList();
      this.getById();
    //  this.getGradeList();
    } else if (this.route.url === '/detailslider/' + encodeURIComponent(this.id)) {
      this.title = 'Slider Details ';
      this.subtitle = ' Slider with details Information';
      this.flag = false;
      this.isDetails = true;
      this.getById();
    }else if (this.route.url === '/addslider') {
      this.title = 'Add Restaurant Images ';
      this.subtitle = 'Enter Offer details.';
      this.flag = true;
      this.getRoleList();

   //   this.getGradeList();
    } else {
      this.title = 'Manage Restaurant Images';
      this.subtitle = 'Manage Offer information including view, add, update and delete';
      this.flag = false;
      this.getEvents();

    }
  }

  /******************************POST DATA ********************************************/
  public submitData() {
    /*if (this.file) {

      this.uploadfile();
    } else {
      delete this.emp['photo'];
    }*/

    console.log('submitData function');
    console.log(this.event);
    const url = this.restService.docsRestURL('slider', '');
    this.restService.postFormData(url, this.event).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        this.uploadFlag = true;
        this.id = response.id;
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
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
  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  updateData() {
    this.event['id'] = this.id;
    console.log('submiti function');
    const url = this.restService.docsRestURL('edit', '');
    console.log(this.event);
    this.restService.postFormData(url, this.event).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
        this.uploadFlag = true;
          window.scrollTo(0, 0);
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
  public getRoleList() {
    // Get Information from JSON REST api
    const url = this.restService.roleRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.rolelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  // Get State List

  public getStateList() {
    // Get Information from JSON REST api
    const url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public onChangeState(obj) {
    const stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  public getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // GET USER EMPLOYEE LIST
  /******************************get data ********************************************/
  public getEmpList() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
      //  this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  /******************************End Get Data*************************************** */

  /******************************Get Eplpyee By Id *********************************/

  public getById() {

    // Get Information from JSON REST api
    const url = this.restService.docsRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('Getting Event by id');
        console.log(response);
        this.data = response;

        this.event.title = response.title;
        this.event.description = response.description;
        this.event.place = response.place;
        this.event.addedby = response.addedby;
        this.event.url = response.url;
        this.event.published = this.unixTimeConverter(response.published);
        this.event.tags = response.tags;

        this.getPhots= response.photos;
        // this.data=response;

    /*    this.emp.dob = this.unixTimeConverter(response.dob);
        this.emp.fname = response.fname;
        this.emp.mname = response.mname;
        this.emp.lname = response.lname;
        this.emp.phone = response.phone;
        this.emp.email = response.email;
        this.emp.guardian = response.guardian;
        this.emp.mstate = response.mstate;
        this.emp.password = response.password;

        this.emp.designation = response.designation;
        this.emp.gender = response.gender;
        this.emp.panno = response.panno;
        this.emp.etype = response.etype;

        this.emp.address.line1 = response.address.line1;
        this.emp.address.line2 = response.address.line2;
        this.emp.address.pincode = response.address.pincode;
        this.emp.address.states = response.address.states;
        this.emp.address.city = response.address.city;
        this.emp.address.country = response.address.country;

        this.emp.role.role = response.role.role;
        this.emp.grade = response.grade;
        if (response.photo.docpath) {
          this.url = this.docServer + '/' + response.photo.docpath;
        }*/
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
  /******************************End Get Eplpyee By Id *********************************/
  /****************************** Get Grade list *********************************/

  // public getGradeList() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.gradeRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log(response);
  //       this.gradeList = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  public getEvents(){
    // Get Information from JSON REST api
    const url = this.restService.docsRestURL('sliderimg', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
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
  /****************************** End Grade list *********************************/
  /******************************END GET DATA*************************************** */

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


  // delete Event

  deleteEmployee(id: any) {
    if (confirm('Are you sure you want to delete this?')) {
      const url = this.restService.empRestURL('delete', '');
      console.log('Delete using this id:' + id);
      const json = '{\"id\":\"' + id + '\"}';
      this.restService.postFormData(url, json).subscribe(
        (response:any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          alert('Emloyee  deleted Successfully');
          this.getEmpList();
          // Now do your stuff here
        },
        error => {
          // Error Message
          Swal.fire(
            'Failed to delete',
            '',
            'error'
          );
          // alert('<b>Failed to delete </b><br>' + error.statusText + '<br>'
          //   + error._body);
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    }
  }

  public detail(id: any ) {
    this.isDetails = true;
  }

  /*****upload image********************************************************** */

 /* fileEvent(fileInput: any) {
    // alert('file event begin');
    if (fileInput.target.files[0] != '') {
      this.file = fileInput.target.files[0];
      // this.fileName = this.user.category;


      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);


      console.log('Inside multiple file select');

    }
    // alert(this.fileName);
    // alert('file event end');
    // preview
  }*/

  /*****upload image********************************************************** */

  // fileEvent(fileInput: any) {
  //   this.fileArray = [];
  //   this.urls=[];
  //   if (fileInput.target.files && fileInput.target.files.length < 4) {
  //     this.file = fileInput.target.files[0];
  //    // this.fileName = this.event.category;
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       // this.url = event.target.result;
  //    //   this.urls = event.target.result;
  //       console.log('event.target.result');
  //       console.log(event.target.result);
  //               //   this.urls.push(event.target.result);
  //     };

  //     reader.readAsDataURL(fileInput.target.files[0]);

  //     for (let fi of fileInput.target.files) {
  //       this.fileArray.push(fi);

  //       // 3   alert(this.fileArray);
  //     }
  //     console.log('Inside multiple file select');
  //     console.log(this.fileArray);

  //   } else {
  //     alert('Check the number of images');
  //   }
  // }
fileEvent(event) {
    this.urls = [];
    this.fileArray = [];
    const filesAmount = event.target.files.length;
    const files = event.target.files;
    if (files && filesAmount<4) {

      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.fileArray.push(file);
          console.log(e.target.result);

        };
        reader.readAsDataURL(file);
      }
    }else {
      Swal.fire(
        'Check the number of images',
        '',
        'error'
      );
    }
}

// fileEvent(event) {
//   this.urls = [];
//   const files = event.target.files;
//   if (files) {

//     for (const file of files) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.urls.push(e.target.result);
//         this.fileArray.push(e.target.result);
//         console.log(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   }
// }

  // @Input() multiple: boolean = false;
/*
  uploadfile() {

    if (this.file) {
      const fileExtension = '.' + this.file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      let objDoc = new Object();
      this.emp.photo.docname = this.file.name;
      this.emp.photo.doctype = 'Scanning';
      this.emp.photo.docpath = 'employee' + '/' + rname + this.file.name;

      var docFormData = new FormData();
      // docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', this.file, rname + this.file.name);
      docFormData.append('name', 'employee');
      var docurl = this.restService.docsRestURL('upload', '');
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
        (response:any) => {
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

  }*/


  /*****End  upload image********************************************************** */
  uploadfile() {

    //  if (this.news.category != '') {
    if (this.fileArray.length) {

      console.log('uploadfile function');
      //   alert("have a file");
      // console.log(this.proceeding);


      for (let file of this.fileArray) {


        const fileExtension = '.' + file.name.split('.').pop();
        const rname = Math.random().toString(36).substring(7) + new Date().getTime();

        const objDoc = new Object();
        objDoc['docname'] = file.name;
      //  objDoc['docpath'] = 'events' + '/' + this.id + '/' + rname + file.name;
        objDoc['docpath'] = 'OFFER' + '/' + rname + file.name;
        objDoc['doctype'] = 'OFFER';
        objDoc['isprimary'] = 'NO';
        this.docArray.push(objDoc);

        const docFormData = new FormData();

        //    docFormData.append('doc', this.file, this.fileName);
        docFormData.append('doc', file, rname + file.name);
        docFormData.append('name', 'OFFER');
        docFormData.append('width', '1340');
        docFormData.append('height', '720');
        const docurl = this.restService.customUpload('upload', '');
        console.log(docurl);

        this.restService.uploadFormData(docurl, docFormData).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Upload API');
            console.log(response);
            // Now do your stuff here

          },
          error => {
            // Error Message
            console.log('Error in doc upload .');

            // Do your stuff here
          }
        );

      }

      this.submitDocarray(); // postint doc array
      return 0;
    } else {

      Swal.fire(
        'Check the number of images',
        '',
        'error'
      );
      // return 0;
    }
    //  } else {
    //  alert('Category  Name can not be empty');
    //    return 1;
    // }
  }


  /*****End  upload image********************************************************** */


  // submit doc array
  public submitDocarray() {

    const doc = {
      id: this.id,
      photos: this.docArray
    }
    console.log('submitDocarray function');
    console.log(doc);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.docsRestURL('slider', '');
    this.restService.postFormData(url, this.docArray[0]).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        Swal.fire('', '', 'success');
        this.docArray=[];
        this.route.navigate(['/manageslider']);
        window.scrollTo(0, 0);
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


  chageFlag() {
    if (this.cleanup) {
      this.cleanup = false;
    } else {
      this.cleanup = true;
    }
  }

  public deleteNewsList(id: any) {
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

  // deleteMultiplePhotos() {

  //   const delPhots = {
  //     'container': this.id,
  //     'ids': this.delList
  //   }
  //   if (confirm('Are you sure you want to delete this?')) {
  //     const url = this.restService.docsRestURL('MPdelete', '');
  //     console.log('Delete using this id:' + delPhots);
  //     const json = delPhots;
  //     this.restService.postFormData(url, json).subscribe(
  //       (response:any) => {
  //         // Responce data.
  //         console.log('Status on Post API');
  //         console.log(response);
  //         Swal.fire('', '', 'success');
  //         this.getById();
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
  //     return 0;
  //   }
  // }


  deleteMultiplePhotos() {
    // const delPhots = {
    //   'container': this.id,
    //   'ids': this.delList
    // }

    const delPhots = {
      //'container': this.id,
      'id': this.delList
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Data will be deleted!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.docsRestURL('delslider', '');
      console.log('Delete using this id:' + delPhots);
      const json = this.delList;
        this.restService.postFormData(url, json).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);

            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
          //  this.getById();
            // Now do your stuff here
            this.getEvents();

            this.delList=[];


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












  deleteMultipleEvents() {
    const delPhots = {
      'container': this.id,
      'ids': this.delList
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Data will be deleted!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.docsRestURL('delslider', '');
        console.log('Delete using this id:' + this.delList);
        const json = this.delList;
        this.restService.postFormData(url, json).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);

            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getEvents();
            this.delList=[];
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





  // deleteMultipleEvents() {
  //   if (confirm('Are you sure you want to delete this?')) {
  //     const url = this.restService.docsRestURL('Mdelete', '');
  //     console.log('Delete using this id:' + this.delList);
  //     const json = this.delList;
  //     this.restService.postFormData(url, json).subscribe(
  //       (response:any) => {
  //         // Responce data.
  //         console.log('Status on Post API');
  //         console.log(response);
  //         Swal.fire('', '', 'success');
  //         this.getEvents();
  //         this.delList=[];
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
  //     return 0;
  //   }
  // }


}