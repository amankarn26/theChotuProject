import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
// import swal from 'sweetalert2';
// import * as jsPDF from 'jspdf';
// import * as html2canvas from 'html2canvas';
declare var Swal: any;

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent implements OnInit {
 // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private isdetails = true;
  public custList;
  public firmdata;
  public id;
  public servicingg;
  public servicingid;
  public customerdata;
  public customerid;
  public isUpdate = false;
  public empList;
  public checked;
  public custlist;
  public customer;
  public custname;
  public jobdata;
  public jdata;
  public dyelem = {
    name: '',
    value: '',
  };
  public dyElemObjData = [];
  private dynamo;
  public todaydate = this.todatDate();

  public pdfpath = this.restService.docServer + '/' + sessionStorage.getItem('firm') + '/invoice/servicing_';



  public docServer = this.restService.docServer;

  private jobcard = {
    servicing: this.routprms.snapshot.params['id'],
    firm: sessionStorage.getItem('firm'),
    jobcardno: '',
    custname: '',
    servicetype: '',  // enum
    prodname: '',
    supervisor: '',
    supervisorname: '',
    details: '',
    addedon: this.todatDate(),
    status: '',
  };
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    window.history.back();
  }
  ngOnInit() {
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
      console.log('adaded');
      this.url = this.route.url;
      console.log(this.route.url);
      if (this.route.url === '/addjobcard/' + this.id) {
        this.title = 'Add Job Card';
        this.subtitle = 'Fill new S information and submit.';
        this.isManageState = false;
        this.isdetails = false;
        this.isUpdate = false;
        this.getallcustomer();
        this.getempList();
        this.getservicingByid();

      } else if (this.route.url === '/updatejobcard/' + this.id) {
        this.title = 'Update Job Card';
        this.subtitle = 'Update firm information and submit.';
        this.isManageState = false;
        this.isUpdate = true;
        this.isdetails = false;
        this.getallcustomer();
        this.getempList();
        this.getByid();
      } else if (this.route.url === '/detailjobcard/' + this.id) {
        this.title = 'Job Card Detail';
        this.subtitle = 'Update firm information and submit.';
        this.isManageState = false;
        this.isdetails = true;
        this.isUpdate = true;
        this.getByid();
        this.getallcustomer();
      } else {
        this.title = ''
        this.subtitle = 'Manage jobcard information including view, add, update and delete';
        this.getData();
        this.isdetails = false;
        this.getFirm();
        this.getservicingByid();
      }
    }
  }

  private getData() {
    var url = this.restService.servicingjobRestURL('jobcardbysid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
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
    console.log('submiti function');
    this.dynamicdatagen();
    const jdata = {
      id: this.id,
      details: this.jobcard.details,
      jdata: {
        jdata1: this.jobdata
      }
    };

    var url = this.restService.jobcardRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, jdata).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        for (var key in response.jdata) {
          console.log('Key: ' + key);
          console.log('Value: ' + response.jdata[key]);
          this.dyElemObjData.push({ 'name': key, 'value': response.jdata[key] });
        }
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        // this.route.navigate(['/managejobcard/'] + this.servicingid);
        this.cancel();
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


  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.jobcardRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        this.jobcard = response;
        this.jobcard.custname = response.custname;
        this.jdata = response.jdata;
        // this.jobdata = response.jobdata;
        // this.servicingid=response.servicing;

        for (var key in response.jdata) {
          console.log('Key: ' + key);
          console.log('Value: ' + response.jdata[key]);
          this.dyElemObjData.push({ 'name': key, 'value': response.jdata[key] });
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  submitData() {
    this.dynamicdatagen();
    this.jobcard['isinsurinvoicegen'] = 'NO';
    this.jobcard['isinsured'] = 'NO';
    this.jobcard['iscustinvoicegen'] = 'NO';

    const url = this.restService.jobcardRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.jobcard).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managejobcard/' + this.id]);
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
        const url = this.restService.jobcardRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
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

  passupervisorname(obj) {
    this.jobcard.supervisorname = obj.target.options[obj.target.selectedIndex].text;
  }

  passcustomer(obj) {
    this.jobcard.custname = obj.target.options[obj.target.selectedIndex].text;
  }

  private getFirm() {
    // Get Information from JSON REST api
    let url = this.restService.firmRestURL('details', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        this.firmdata = response;
        this.jobcard = response;
        if (response.logo) {
          //  alert(this.url);
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getallcustomer() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('customer', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.custlist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getempList() {
    var url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        let empall = [];
        for (const entry of response) {
          if (entry.role.role === 'SUPERADMIN') {
          } else {
            empall.push(entry);
          }
        }
        this.empList = empall;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getservicingByid() {
    // Get Information from JSON REST api
    {
      let url = this.restService.servicingRestURL('details', this.id);
      this.restService.getJSONFromURL(url).subscribe(
        (response : any) => {
          console.log('Done fatching data!');
          this.custname = response.custname;
          this.servicingg = response.freeservices;
          this.getCustById(response.customer); // addeon on 12/19/2019
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
  }

  private getCustById(id: any) {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getalljobcard() {
    // Get Information from JSON REST api
    const url = this.restService.jobcardRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        this.jobcard = response.jobcard;
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  onAddDyelem() {
    if ((this.dyelem.name !== '') && (this.dyelem.name !== '')) {
      this.dyElemObjData.push({ 'name': this.dyelem.name, 'value': this.dyelem.value });
      this.dyelem.name = '';
      this.dyelem.value = '';
    } else {
      alert('Information not complited yet');
    }
  }


  onDeleteDyelem(i) {
    this.dyElemObjData.splice(i, 1);
    Swal.fire(
      'Deleted!',
      '',
      'success'
    );
  }

  public dynamicdatagen() {
    // generating dynamic object
    console.log('Dynamic element object');
    // console.log(this.dyElemObjData);
    let dyObj = {};
    this.dyElemObjData.forEach(function (elem) {
      dyObj[elem.name] = elem.value;
    });
    console.log(dyObj);
    console.log('Dyanmic Elements');
    var jString = JSON.stringify(dyObj);
    if (dyObj[0] != '') {
      this.jobcard['jdata'] = dyObj;
      console.log('dynamic object:');
      console.log(dyObj);
    }
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


  generatepdf1(id: any,  billtoo: any) {
    console.log('Gnerated pdf method called');
    this.getservicingbyjobcard(id, billtoo);
  }


  private getservicingbyjobcard(jid: any, billtoo: any) {
    console.log('Getting details for servicing JOB by job card id');
    const urlstr = 'billto?jobcard=' + jid + '&billto=' + billtoo;
    console.log(urlstr);
    let url = this.restService.servicingRestURL('getservicingjobByid', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // console.log('Done fatching data!');
        this.servicingid = response.id;
        // document.getElementById('generatepdf2').click;
        // let strpath = this.pdfpath + this.servicingid + '.pdf';
        console.log(response.invoice);

        if (response.invoice) {
          const strpath = this.docServer + '/' + response.invoice.docpath;
          window.open(strpath, '_blank');
        } else {
          Swal.fire(
            'Invoice Not Found',
            '',
            'error'
          );
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );


  }

}

