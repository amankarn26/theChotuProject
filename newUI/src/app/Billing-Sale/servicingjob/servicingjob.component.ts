import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from './../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
import swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
declare var Swal: any;




@Component({
  selector: 'app-servicingjob',
  templateUrl: './servicingjob.component.html',
  styleUrls: ['./servicingjob.component.css']
})
export class ServicingjobComponent implements OnInit {

  public todaydate = new Date();
 // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private isdetails = true;
  public isinvoice = true;
  public urls;
  private datalist;
  private catList;
  public userType;
  public statelist = [];
  public citylist = [];
  public custList;
  public firmdata;
  public id;
  public servicingg;
  public insurerid;
  public servicingid;
  public jobcardid;
  public jobcarddata;
  public insurerdata;

  public customerdata;
  public customerid;
  public insurerdetails;

  public isUpdate = false;
  public empList;
  public sparepartid;
  public sparepartstockdetails;
  public checked;
  public servicinggid;

  private servicingdetails = {

    servicing: '',
    serviceduedate: '',
    availedon: this.todatDate(),
    nextservicedueon: '',
    paid: '',
    amount: 0,


  };
  private servicingdetails1 = [];

  // private servicingjob = {

  //    servicing:'',
  //    firm:sessionStorage.getItem('firm'),
  //    invoicenum:'',
  //    invoicedate: new Date(),
  //    insurer:'',
  //    insurername:'',
  //    jobcardno:'',
  //    chassisnum:'',
  //    enginenum:'',
  //    servicetype:'',
  //    vmodel:'',
  //    supervisor:'',
  //    supervisorname:'',
  //    mechanic:'',
  //    mechanicname:'',
  //    vregno:'',
  //    kmscoverage:0,
  //    partstotal:0,
  //    labourtotal:0,
  //    othercharges:0,
  //    finalamt:0,
  //    labourdetails:[],
  //    accessorydetails:[],
  //    serviceduedate:'',
  //    nextservicedueon:'',
  //    paid:'',
  //    advname:'',
  //    billto:'CUSTOMER',
  //    paymentmode:'',
  //    isinsurinvoicegen:'NO',
  //    isinsured:'NO'

  // };


  servicingjob1 = {

    jobcardno: '',
    chassisnum: '',
    servicetype: '',
    vregno: '',
    vmodel: '',
    supervisor: '',
    supervisorname: '',
    enginenum: '',
    kmscoverage: '',

  };

  private servicingjob = {

    servicing: 0,
    firm: sessionStorage.getItem('firm'),
    invoicenum: '',
    invoicedate: new Date(),
    insurer: '',
    insurername: '',
    jobcard: this.routprms.snapshot.params['id'],
    mechanic: '',
    mechanicname: '',
    partstotal: 0,
    labourtotal: 0,
    othercharges: 0,
    finalamt: 0,
    labourdetails: [],
    //accessorydetails: [],
    serviceduedate: '',
    nextservicedueon: '',
    paid: '',
    advname: '',
    billto: 'CUSTOMER',
    paymentmode: '',
  //  invoice:''
    // isinsurinvoicegen: 'NO',
    // isinsured: 'NO',
  };

  public isinsurinvoicegen;
  public isinsured;

  private sid;
  private jid;
  private billtoo;

  private custname;
  private alltotal = {
    qty: 0,
    mrp: 0,
    taxableval: 0,
    gstamt: 0,
    amount: 0,
    discount: 0,

    pmrp: 0,
    pdiscount: 0,
    ptaxable: 0,
    ptotal: 0,
    pgst: 0,

    lmrp: 0,
    ldiscount: 0,
    ltaxable: 0,
    ltotal: 0,
    lgst: 0,

    inwords: ''
  }

  private labourdetails = {
   // sale: '',
    labourname: '',
    labourdetails: '',
    hsncode: '',
    qty: '1',
    rateperunit: '',
    total: 0,
    discount: 0,
    taxableval: 0,
    gst: '',
    gstamt: 0,
    finalamt: 0
  }
  private accessorydetails = {

    sparepart: '',
    pname: '',
    hsncode: '',
    qty: '',
    rateperunit: '',
    amount: 0,
    discount: 0,
    taxableval: 0,
    gst: '',
    gstamt: 0,
    finalamt: 0

  };

  public stockids = {
    stockid: '',
    lotno: ''
  }

  public nextservicing;
  public labourarray;
  public sparearray;
  public todaysdateandtime = this.todaysdatentime();
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public spareList;
  public docServer = this.restService.docServer;

  // public servicingid;


  private dt = new Date();
  private email = {
    to: '',
    cc: 'amankarn26@gmail.com',
    templateId: 'servicing',
    // pdfid :'',
    // fid :'',

    contentData: {
      content: {
        message: 'Thank you for giving us  chance to serve you ',
        dt: this.dt.toLocaleDateString(),
        quatationid: '',
        validtill: '',
        // "dt": "11/16/2018",
        // "quatationid": "12345678",
        // "validtill": "11/22/2018"

      },
      table: [],
      costtable: [],
      // [
      //                 {
      //                                 'a':'12',
      //                                 'b':'34'
      //                 },
      //                 {
      //                                 'a':'67',
      //                                 'b':'97'
      //                 }],
      // subject: 'Servicing Invoice For'+' '+this.servicingjob.vregno
    }
  };


  private email_table = {
    No: '1',
    Product_Head: '',
    Detail: '',
    Qty: '',
    GST: '',
    Amount: '',
  };

  public custemail;



  public insurerlist;
  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  cancel1() {

    // alert('insuerer');

    this.route.navigate(['/manageservicingjob/' + this.servicingid]);
    // window.location.href=''
    document.getElementById('b').click();





  }


  ngOnInit() {
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
      this.servicingjob.servicing = this.id;
      this.servicingdetails.servicing = this.id;
    }

    if (this.routprms.snapshot.params['sid']) {

      this.id = this.routprms.snapshot.params['id'];

      this.servicingjob.servicing = this.id;
      this.servicingdetails.servicing = this.id;

      this.sid = this.routprms.snapshot.params['sid'];

      this.jid = this.routprms.snapshot.params['jid'];
      this.billtoo = this.routprms.snapshot.params['billto'];
    }

    if (this.routprms.snapshot.params['billto']) {
      this.jid = this.routprms.snapshot.params['jid'];
      this.billtoo = this.routprms.snapshot.params['billto'];
    }

    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addservicingjob/' + this.id) {
      this.title = 'Add Servicing Job For Customer';
      this.subtitle = 'Fill new S information and submit.';
      this.isManageState = false;
      this.isdetails = false;
      this.isinvoice = false;
      //   alert(this.title)
      //   alert('addservicingjob by id');
      this.isUpdate = false;
      this.getjobcardByid();
    //  this.getspareList();
      this.getlastLotno();
      this.getempList();
      this.getinsurer();
      // this.getservicingByid();
      // this.getStateList();
      // this.getCityList('Maharashtra');

    } else if (this.route.url === '/updateservicingjob/' + this.id) {
      this.title = 'Add Servicing Job For Insurer';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.isinvoice = false;
      this.isdetails = false;
      this.servicingjob.billto = 'INSURER';
    //  this.getByid(); // removed by pnkj
      this.getempList();
      // this.getspareList();
      // this.getspareList();
      this.getlastLotno();
      this.getempList();
      this.getinsurer();
      this.getservicingjobByid();
      this.getjobcardByid();

    } else if (this.route.url === '/detailservicingjob/' + this.id) {
      this.title = 'Details Servicing Job';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isdetails = true;
      this.isinvoice = false;
      this.isUpdate = true;
      this.getByid();
      this.getalllabourdetails();
      this.getallsparedetails();

      // this.getempList();
      // this.getspareList();
      // this.getCustList();

    }

    else if (this.route.url === '/viewinvoiceservicing/' + this.id) {
      this.title = 'Invoice Servicing Job';
      this.isManageState = false;
      this.isdetails = false;
      this.isUpdate = true;
      this.isinvoice = true;
      this.getByid();
      this.getalllabourdetails();
      this.getFirm();

      // this.getempList();
      // this.getspareList();
      // this.getCustList();

    }

    else if (this.route.url === '/viewinvoiceservicing/' + encodeURIComponent(this.sid) + '/' + encodeURIComponent(this.jid)
      + '/' + encodeURIComponent(this.billtoo)) {
      this.title = 'Invoice Servicing Job';
      this.isManageState = false;
      this.isdetails = false;
      this.isUpdate = true;
      this.isinvoice = true;
      this.getByid();
      this.getByjobcardnum();
      this.getFirm();
      //  this.getJobcardData();

      // this.getempList();
      // this.getspareList();
      // this.getCustList();

    } else if (this.route.url === '/invoice/' + encodeURIComponent(this.jid) + '/' + encodeURIComponent(this.billtoo)) {
      this.title = 'Invoice Servicing Job';
      this.isManageState = false;
      this.isdetails = false;
      this.isUpdate = true;
      this.isinvoice = true;
      //  this.getByid();
      //   this.getByjobcardnum();
      this.getFirm();
      this.getservicingbyjobcard();



      this.getJobcardData(this.jid);





      //  this.getJobcardData();

      // this.jid = this.routprms.snapshot.params['jid'];
      // this.billtoo = this.routprms.snapshot.params['billto'];

      // this.getempList();
      // this.getspareList();
      // this.getCustList();

    }


    else {
      this.title = ''
      this.subtitle = 'Manage servicingjob information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');

      this.getDatabyinsurer();
      this.isdetails = false;
      this.isinvoice = false;
      this.getData();
      this.getFirm();
      // this.getservicingByid();

    }
  }

  todaysdatentime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    let dattime = document.getElementById('invoicedate');

    return dateTime;
  }

  private getempList() {
    var url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        // this.empList = response;
        let empall = [];
        for (const entry of response) {
          // alert(entry.role.role);
          if (entry.role.role === 'SUPERADMIN') {
            // ||entry.role.role==='MARKETING'||entry.role.role==='MARKETING'
            //  items.slice(0, 2);
            //  this.servicingjob.labourdetails.splice(i, 1);
          } else {
            empall.push(entry);
          }
          // empall.push(entry);
        }
        this.empList = empall;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getServicingdetails() {
    // Get Information from JSON REST api
    var url = this.restService.servicingdetailsRestURL('servicingdetailsbysid', this.servicingid);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        //   this.restService.getJSONFromURL(response);
        //  this.servicingdetails = response;
        // this.servicingdetails.serviceduedate=this.unixTimeConverter(response.serviceduedate);
        // this.servicingdetails.availedon=this.unixTimeConverter(response.availedon);
        // this.servicingdetails.nextservicedueon=this.unixTimeConverter(response.nextservicedueon);
        // this.servicingdetails.paid=response.paid;

        this.servicingdetails1 = response;
        const len = response.length;
        this.nextservicing = response[len - 1].nextservicedueon;
        console.log(response);
        //  alert(response[len-1].nextservicedueon);
        //  alert(response[len].nextservicedueon);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getspareList() {
  //   var url = this.restService.sparepartRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any )=> {
  //       this.restService.getJSONFromURL(response);
  //       this.spareList = response;
  //       console.log(response);

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  private getData() {
    var url = this.restService.servicingjobRestURL('servicingjobbysid', this.servicinggid + '&billedto=CUSTOMER');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        this.data = response;
        // this.servicingid=response.servicing;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getDatabyinsurer() {
    var url = this.restService.servicingjobRestURL('servicingjobbysid', this.id + '&billedto=INSURER');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        this.insurerdata = response;
        // this.servicingid=response.servicing;
        console.log(response);


      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getinsurer() {
    var url = this.restService.insurerRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        this.insurerlist = response;
        // this.servicingid=response.servicing;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  updateinsinvoice() {

    var json = {
      id: this.id,
      isinsurinvoicegen: 'YES'
    }
    console.log('submiti function');
    var url = this.restService.servicingjobRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);

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


  updateData() {

    delete this.servicingjob['lastservicing'];
    delete this.servicingjob['id'];
    delete this.servicingjob['nextservicedueon'];
    delete this.servicingjob['paid'];
    delete this.servicingjob['serviceduedate'];
    delete this.servicingjob['servicing'];



    console.log(this.servicingjob);

    // for (let data of this.servicingjob.accessorydetails) {
    //   delete data.id;
    //   delete data.servicing_job;
    //   if (data.stockids) {
    //     for (let stockids of data.stockids) {
    //       delete stockids.id;
    //     }
    //   }
    // }
    for (let data of this.servicingjob.labourdetails) {
      delete data.id;
      delete data.servicing_job;
    }

    if (this.servicingjob.mechanic === 'OTHER') {
      this.servicingjob.mechanic = '';
    }
    // this.servicingjob.serviceduedate=this.servicingdetails.serviceduedate;
    // this.servicingjob.nextservicedueon=this.servicingdetails.nextservicedueon;
    // this.servicingjob.paid=this.servicingdetails.paid;
    console.log('submiti function');
    var url = this.restService.servicingjobRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingjob).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.servicingid = response.id;
        //    this.customerMail();
        // Now do your stuff here
        //     this.submitservicingdetails();
        //  this.updateinsinvoice();
        this.createPDF1();
        this.updateJobcardData('INSURER');
        Swal.fire('Generated', '', 'success');
        window.scrollTo(0, 0);
     //   this.route.navigate(['/viewinvoiceservicing/' + response.id]);
        this.route.navigate(['/invoice/' + this.id + '/INSURER']);
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
    let url = this.restService.servicingjobRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.servicingjob = response;
        this.alltotal.inwords = this.convertNumberToWords(this.servicingjob.finalamt) + ' only';
        this.insurerid = response.insurer;
        this.servicingid = response.servicing;
        // this.jobcardid = response.jobcard;
        this.getJobcardData(response.jobcard);
        this.getServicingdetails();
        this.getservicingByidinvoice();
        this.getinsurerbyid();
        //    this.servdata(response.lastservicing);
        // this.getserdetailsByid();
        // alert(this.servicingid);
        // this.servicingdetails.availedon=this.unixTimeConverter(response.lastservicing.availedon);
        // this.servicingdetails.nextservicedueon=this.unixTimeConverter(response.lastservicing.nextservicedueon);
        // this.servicingdetails.paid=response.lastservicing.paid;
        // this.servicingdetails.serviceduedate=this.unixTimeConverter(response.lastservicing.serviceduedate);
        if (this.route.url === '/updateservicingjob/' + this.id) {
          this.servicingjob.billto = 'INSURER';
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getByjobcardnum() {
    // alert('in jobcard api')
    // Get Information from JSON REST api
    var str = 'servicing=' + this.sid + '&jobcardno=' + this.jid + '&billedto=INSURER';

    let url = this.restService.servicingjobRestURL('jobcardnum', str);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data! in getByjobcardnumgetByjobcardnum getByjobcardnum getByjobcardnum getByjobcardnum');
        this.servicingjob = response;
        this.alltotal.inwords = this.convertNumberToWords(this.servicingjob.finalamt) + ' only';
        this.insurerid = response.insurer;
        this.servicingid = response.servicing;
        this.id = response.id;
        this.nextservicing=response.nextservicedueon;
        this.getalllabourdetails();
        this.getServicingdetails();
        this.getservicingByidinvoice();
        this.getinsurerbyid();
        if (this.route.url === '/updateservicingjob/' + this.id) {
          this.servicingjob.billto = 'INSURER';
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getservicingbyjobcard() {

    console.log('Getting details for servicing JOB by job card id');
    // alert('getting servicing job');

    const urlstr = 'billto?jobcard=' + this.jid + '&billto=' + this.billtoo;
    console.log(urlstr);
    let url = this.restService.servicingRestURL('getservicingjobByid', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        // console.log('Done fatching data!');

        this.labourarray = response.labourdetails;
        console.log(this.labourarray);

      //  this.sparearray = response.accessorydetails;
        this.sparearray = [];

        console.log(this.sparearray);

        this.servicingjob = response;
        this.nextservicing=response.lastservicing.nextservicedueon;


        this.alltotal.inwords = this.convertNumberToWords(this.servicingjob.finalamt) + ' only';
        this.total();
        this.total1();

        this.insurerid = response.insurer;
        this.getinsurerbyid()
        //     this.servicingjob.labourdetails = response.labourdetails;;
        //     this.servicingjob.accessorydetails = response.accessorydetails;
        //     this.servicingjob.partstotal = response.partstotal;
        //     this.servicingjob.labourtotal = response.labourtotal;
        //     this.servicingjob.othercharges = response.othercharges;
        //     this.servicingjob.finalamt = response.finalamt;

        //     this.labourarray = response;
        // this.servicingjob.labourdetails = response.labourdetails;

      },
      error => {
        console.log('Error in data load.');
      }
    );


  }



  servdata(response: any) {
    this.servicingdetails.availedon = this.unixTimeConverter(response.availedon);
    this.servicingdetails.nextservicedueon = this.unixTimeConverter(response.nextservicedueon);
    this.servicingdetails.paid = response.paid;
    this.servicingdetails.serviceduedate = this.unixTimeConverter(response.serviceduedate);
  }


  private getalllabourdetails() {
    // Get Information from JSON REST api
    let url = this.restService.servicingjobRestURL('labourdetails', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.labourarray = response;
        this.servicingjob.labourdetails = response;
        console.log(response);
        this.getallsparedetails();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getallsparedetails() {
    // Get Information from JSON REST api
    let url = this.restService.servicingjobRestURL('sparedetails', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
    //    this.sparearray = response;
        this.sparearray = [];

     //   this.servicingjob.accessorydetails = response;
        console.log(response);
        this.total();
        this.total1();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getStateList() {
    // Get Information from JSON REST api
    var url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.statelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getCatList() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.catRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any )=> {
  //       this.catList = response;
  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private onChangeState(obj) {
    let stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  private getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    var url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
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


    if (this.servicingjob.mechanic === 'OTHER') {
      this.servicingjob.mechanic = '';
    }
    this.servicingjob.servicing = this.servicinggid;
    this.servicingjob.serviceduedate = this.servicingdetails.serviceduedate;
    this.servicingjob.nextservicedueon = this.servicingdetails.nextservicedueon;
    this.servicingjob.paid = this.servicingdetails.paid;

    delete this.servicingjob['servicing'];
    console.log('submiti function');
    var url = this.restService.servicingjobRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingjob).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.servicingid = response.id;
        this.customerMail();
        this.createPDF();
        this.updateJobcardData('CUSTOMER');
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/invoice/' + this.id + '/CUSTOMER']);
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
    /*
     this.alertify.confirm("confirm it", function (e: any) {
            if (e) {
               //okCallback();
               alert("Ok");
            } else {alert("Cancel");
            }
        });*/

    /*
        if (confirm('Are you sure you want to delete this?')) {
          var url = this.restService.firmRestURL('delete', '');
          console.log(id);
          let json = '{\"id\":\"' + id + '\"}';
          this.restService.postFormData(url, json).subscribe(
            (response : any )=> {
              // Responce data.
              console.log('Status on Post API');
              console.log(response);
              // window.location.reload();
              this.getRoleList();
              this.alertify.alert('Firm deleted Successfully')

              // Now do your stuff here
            },
            error => {
              // Error Message
              this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
                + error._body);
              console.log('Error in data load.');
              // Doyour stuff here
            }
          );
          return 0;
        }*/

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
        const url = this.restService.servicingjobRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any )=> {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            this.getData();
            this.getDatabyinsurer()
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
    })
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
    // this.news.published = d.toString();
    // Next hearing end
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

  pasmechanicname(obj) {
    if (this.servicingjob.mechanic !== 'OTHER') {
      this.servicingjob.mechanicname = obj.target.options[obj.target.selectedIndex].text;
    }
  }

  // passupervisorname(obj)
  // {
  //   this.servicingjob.supervisorname=obj.target.options[obj.target.selectedIndex].text;
  // }

  passparepart(obj) {
    this.accessorydetails.pname = obj.target.options[obj.target.selectedIndex].text;
  }

  passinsurername(obj) {
    this.servicingjob.insurername = obj.target.options[obj.target.selectedIndex].text;
  }

  push() {

    if ((this.labourdetails.qty !== '0') && (this.labourdetails.qty !== '') && (this.labourdetails.rateperunit !== '')
      && (this.labourdetails.labourdetails !== '') && (this.labourdetails.labourdetails !== '')
      && (this.labourdetails.taxableval !== 0) && (this.labourdetails.gst !== '')
      && (this.labourdetails.gstamt !== 0) && (this.labourdetails.finalamt !== 0)) {
      console.log('pushing labourdetails order details');


      const cloneProduct = JSON.parse(JSON.stringify(this.labourdetails));

      this.servicingjob.labourdetails.push(cloneProduct);
      console.log('After pushing product');
      console.log(this.servicingjob.labourdetails);
      this.calculatetotalcharges();
      // this.recal();

      this.labourdetails.labourname = '';
      this.labourdetails.labourdetails = '';
      this.labourdetails.hsncode = '';
      this.labourdetails.qty = '';
      this.labourdetails.rateperunit = '';
      this.labourdetails.total = 0;
      this.labourdetails.discount = 0;
      this.labourdetails.taxableval = 0;
      this.labourdetails.gst = '';
      this.labourdetails.gstamt = 0;
      this.labourdetails.finalamt = 0;



    }
    else {
      Swal.fire('Please Fill The Mandotary Data', '', 'error');
    }
  }

  pushspare() {
    // this.onAddDyelem();

    let flagger = true;

    // for (const entry of this.servicingjob.accessorydetails) {

    //   if (this.accessorydetails.sparepart == entry.sparepart) {

    //     Swal.fire('Cannot Add Duplicate Entry', '', 'error');
    //     flagger = false;
    //   }
    // }

    if (flagger) {

      if ((this.accessorydetails.qty !== '0') && (this.accessorydetails.qty !== '') && (this.accessorydetails.rateperunit !== '')
        && (this.accessorydetails.pname !== '') && (this.accessorydetails.taxableval !== 0) && (this.accessorydetails.gst !== '')
        && (this.accessorydetails.gstamt !== 0) && (this.accessorydetails.finalamt !== 0)) {
        console.log('pushing accessorydetails order details');


        const cloneProduct = JSON.parse(JSON.stringify(this.accessorydetails));

       // this.servicingjob.accessorydetails.push(cloneProduct);
        console.log('After pushing product');
   //     console.log(this.servicingjob.accessorydetails);

        // this.recal();
        this.accessorydetails.sparepart = '';
        this.accessorydetails.pname = '';
        this.accessorydetails.hsncode = '';
        this.accessorydetails.qty = '';
        this.accessorydetails.rateperunit = '';
        this.accessorydetails.amount = 0;
        this.accessorydetails.discount = 0;
        this.accessorydetails.taxableval = 0;
        this.accessorydetails.gst = '';
        this.accessorydetails.gstamt = 0;
        this.accessorydetails.finalamt = 0;


        this.calculatetotalcharges1();

        // this.accessorydetails.stockids=[];

      }
      else {
        Swal.fire('Please Fill The Mandotary Data and select stock also', '', 'error');
      }
    }
  }

  pushservdetails() {


    console.log('pushing servicingdetails order details');


    const cloneProduct = JSON.parse(JSON.stringify(this.servicingdetails));

    this.servicingdetails1.push(cloneProduct);
    console.log('After pushing servicingdetails');
    console.log(this.servicingdetails1);
    this.servicingdetails.serviceduedate = '';
    this.servicingdetails.amount = 0;
    this.servicingdetails.availedon = '';
    this.servicingdetails.nextservicedueon = '';
    this.servicingdetails.paid = '';


  }

  onDeleteservdetails(i) {
    this.servicingdetails1.splice(i, 1);
    // this.recal();
    Swal.fire('Deleted!', '', 'success');
    this.calculatetotalcharges();
  }

  onDeleteproduct(i) {
    this.servicingjob.labourdetails.splice(i, 1);
    // this.recal();
    Swal.fire('Deleted!', '', 'success');
    this.calculatetotalcharges();
  }

  // onDeletespare(i) {
  //   this.servicingjob.accessorydetails.splice(i, 1);
  //   // this.recal();
  //   Swal.fire('Deleted!', '', 'success');
  //   this.calculatetotalcharges1();

  // }



  private getlastLotno() {
    // Get Information from JSON REST api
    // GET Last Lot No purcahse order
    // http://localhost:8090/IMBAManager/rest/porder/neworder/no?firm=7
    var url = this.restService.lastlotRestURL('invoice', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
        this.servicingjob.invoicenum = response.generatednum;
        //  this.generateNewLotNo(response.lastlotno);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getsparedetails() {
    console.log('Sparepart changed');
    for (let data of this.spareList) {
      console.log(data.name);
      console.log(data.id);
      this.sparepartid = data.id;
      // alert(this.details.sparepart);
      if (Number(data.id) === Number(this.accessorydetails.sparepart)) {

        this.accessorydetails.qty = '1';
        this.accessorydetails.gst = data.GST;
        this.accessorydetails.taxableval = data.ongoingrate;
        this.accessorydetails.pname = data.name;
        this.accessorydetails.rateperunit = data.ongoingrate;
        this.accessorydetails.amount = data.ongoingrate;
        // this.accessorydetails.rateunit = data.rateunit;
        this.accessorydetails.hsncode = data.hsncode;

        this.sparetotal();
        console.log('hsncode' + data.hsncode);
        console.log('rateperunit' + data.ongoingrate);
        console.log('rateunit' + data.rateunit);
        console.log('name' + data.name);
        console.log(this.data);

        // unitsonorder
      }
    }
    this.getsparestockbyspareid();
    this.getquantityspare();
  }


  public sparetotal() {

    this.accessorydetails.amount = Number(this.accessorydetails.qty) * Number(this.accessorydetails.rateperunit);
    console.log('this.accessorydetails.amount' + this.accessorydetails.amount);

    this.accessorydetails.taxableval = Number(this.accessorydetails.qty) * Number(this.accessorydetails.rateperunit);
    console.log('this.accessorydetails.amount' + this.accessorydetails.amount);
    // this.accessorydetails.gstamt = (Number(this.accessorydetails.total) * Number(this.accessorydetails.gst)) / 100;
    // console.log('this.accessorydetails.gstamt' + this.accessorydetails.gstamt);
    this.accessorydetails.gstamt = (Number(this.accessorydetails.taxableval) * Number(this.accessorydetails.gst)) / 100;
    console.log('this.accessorydetails.gstamt' + this.accessorydetails.gstamt);
    this.accessorydetails.finalamt = Number(this.accessorydetails.taxableval) + Number(this.accessorydetails.gstamt);
    console.log('this.accessorydetails.finalamt' + this.accessorydetails.finalamt);



  }

  gstspare() {


    this.accessorydetails.gstamt = (Number(this.accessorydetails.taxableval) * Number(this.accessorydetails.gst)) / 100;
    console.log('this.accessorydetails.gstamt' + this.accessorydetails.gstamt);
    this.accessorydetails.finalamt = Number(this.accessorydetails.taxableval) + Number(this.accessorydetails.gstamt);
    console.log('this.accessorydetails.finalamt' + this.accessorydetails.finalamt);
    this.accessorydetails.finalamt = Math.round(Number(this.accessorydetails.finalamt) - Number(this.accessorydetails.discount));
    console.log('this.accessorydetails.finalamt' + this.accessorydetails.finalamt);
  }

  public labourtotal() {

    this.labourdetails.total = Number(this.labourdetails.qty) * Number(this.labourdetails.rateperunit);
    console.log('this.labourdetails.total' + this.labourdetails.total);

    this.labourdetails.taxableval = Number(this.labourdetails.qty) * Number(this.labourdetails.rateperunit);
    console.log('this.labourdetails.total' + this.labourdetails.total);
    // this.labourdetails.gstamt = (Number(this.labourdetails.total) * Number(this.labourdetails.gst)) / 100;
    // console.log('this.labourdetails.gstamt' + this.labourdetails.gstamt);
    this.labourdetails.gstamt = (Number(this.labourdetails.taxableval) * Number(this.labourdetails.gst)) / 100;
    console.log('this.labourdetails.gstamt' + this.labourdetails.gstamt);
    this.labourdetails.finalamt = Number(this.labourdetails.taxableval) + Number(this.labourdetails.gstamt);
    console.log('this.labourdetails.finalamt' + this.labourdetails.finalamt);



  }

  gstlabour() {


    this.labourdetails.gstamt = (Number(this.labourdetails.taxableval) * Number(this.labourdetails.gst)) / 100;
    console.log('this.labourdetails.gstamt' + this.labourdetails.gstamt);
    this.labourdetails.finalamt = Number(this.labourdetails.taxableval) + Number(this.labourdetails.gstamt);
    console.log('this.labourdetails.finalamt' + this.labourdetails.finalamt);
    this.labourdetails.finalamt = Math.round(Number(this.labourdetails.finalamt) - Number(this.labourdetails.discount));
    console.log('this.labourdetails.finalamt' + this.labourdetails.finalamt);
  }

  public onDeletelabourfromdb(id: number) {


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
        const url = this.restService.servicingjobRestURL('labourdelete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any )=> {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getalllabourdetails();

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

  public onDeletesparefromdb(id: number) {


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
        const url = this.restService.servicingjobRestURL('sparedelete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any )=> {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getallsparedetails();

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

  public onDeleteservdetailsfromdb(id: number) {


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
        const url = this.restService.servicingdetailsRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any )=> {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getServicingdetails();

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

  calculatetotalcharges() {
    let total = 0;
    for (let data of this.servicingjob.labourdetails) {
      total = total + data.finalamt;
    }
    this.servicingjob.labourtotal = total;

    this.totalcharge();
  }


  calculatetotalcharges1() {
    // let total = 0;
    // for (let data of this.servicingjob.accessorydetails) {
    //   total = total + data.finalamt;
    // }
    // this.servicingjob.partstotal = total;
    this.totalcharge();
  }

  totalcharge() {
    this.servicingjob.finalamt = this.servicingjob.partstotal + this.servicingjob.labourtotal;
    this.servicingdetails.amount = this.servicingjob.finalamt;
  }

  othercharges() {

    this.servicingjob.finalamt = this.servicingjob.othercharges + this.servicingjob.partstotal + this.servicingjob.labourtotal;
    this.servicingdetails.amount = this.servicingjob.finalamt;
  }




  generatePdf() {

    // const div = document.getElementById('content');
    // const options = {background: 'white', height: div.clientHeight, width: div.clientWidth};

    // html2canvas(div, options).then((canvas) => {

    //  // onrendered: function(canvas) {}
    //     //Initialize JSPDF
    //     let doc = new jsPDF('p', 'mm', [750, 750]);
    //     var width = doc.internal.pageSize.getWidth();
    //     var height = doc.internal.pageSize.getHeight();
    //     //Converting canvas to Image
    //     let imgData = canvas.toDataURL('image/PNG');
    //     //Add image Canvas to PDF
    //     console.log(imgData);
    //     doc.addImage(imgData, 'PNG', 0, 0);
    //     let pdfOutput = doc.output();
    //     // using ArrayBuffer will allow you to put image inside PDF
    //     let buffer = new ArrayBuffer(pdfOutput.length);
    //     let array = new Uint8Array(buffer);
    //     for (let i = 0; i < pdfOutput.length; i++) {
    //         array[i] = pdfOutput.charCodeAt(i);
    //     }
    //     //Name of pdf
    //  //   const fileName = 'example.pdf';
    //     const fileName = 'servicingjob.pdf';
    //     // Make file
    //     doc.save(fileName);

    // }

    // );
    var data = document.getElementById('content');

    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      // enter code here
      const imgData = canvas.toDataURL('image/png')

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
        heightLeft -= pageHeight;
      }
      doc.save('Servicing' + '_' + this.servicingjob.invoicenum + '.pdf')

    });
  }

  private getFirm() {
    // Get Information from JSON REST api
    let url = this.restService.firmRestURL('details', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.firmdata = response;
        if (response.logo) {
          this.urls = this.docServer + '/' + response.logo.docpath;
          //  alert(this.url);
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  total() {
    console.log('In Total Function.');
    let totalqty = 0;
    let mrp = 0;
    let taxableval = 0;
    let gstamt = 0;
    let amount = 0;
    let discount = 0;


    for (let data of this.sparearray) {
      totalqty = totalqty + data.qty;
      mrp = mrp + data.rateperunit;
      taxableval = taxableval + data.taxableval;
      gstamt = gstamt + data.gstamt;
      amount = amount + data.finalamt;
      discount = discount + data.discount;

    }

    this.alltotal.pmrp = this.intToFloat(mrp, 2);
    this.alltotal.pdiscount = this.intToFloat(discount, 2);
    this.alltotal.ptaxable = this.intToFloat(taxableval, 2);
    this.alltotal.ptotal = this.intToFloat(amount, 2);
    this.alltotal.pgst = this.intToFloat(gstamt, 2);

    console.log('this.alltotal.taxableval=' + taxableval)


    for (let data of this.labourarray) {
      totalqty = totalqty + data.qty;
      mrp = mrp + data.rateperunit;
      taxableval = taxableval + data.taxableval;
      gstamt = gstamt + data.gstamt;
      amount = amount + data.finalamt;
      discount = discount + data.discount;

    }
    this.alltotal.qty = this.intToFloat(totalqty, 2);
    this.alltotal.mrp = this.intToFloat(mrp, 2);
    this.alltotal.taxableval = this.intToFloat(taxableval, 2);
    this.alltotal.gstamt = this.intToFloat(gstamt, 2);
    this.alltotal.amount = this.intToFloat(amount, 2);
    this.alltotal.discount = this.intToFloat(discount, 2);


    console.log('this.alltotal.qty=' + totalqty);
    console.log('this.alltotal.qty=' + mrp);
    console.log('this.alltotal.qty=' + taxableval);
    console.log('this.alltotal.qty=' + gstamt);
    console.log('this.alltotal.qty=' + discount);



  }

  total1() {
    console.log('In Total Functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.');
    let totalqty = 0;
    let mrp = 0;
    let taxableval = 0;
    let gstamt = 0;
    let amount = 0;
    let discount = 0;

    for (let data of this.labourarray) {

      console.log('**********************************in data.qty'+data.qty);
      console.log('**********************************in data.qty'+data.taxableval);
      console.log('**********************************in data.qty'+data.gstamt);
      console.log('**********************************in data.qty'+data.finalamt);
      console.log('**********************************in data.qty'+data.discount);




      totalqty = totalqty + data.qty;
      mrp = mrp + data.rateperunit;
      taxableval = taxableval + data.taxableval;
      gstamt = gstamt + data.gstamt;
      amount = amount + data.finalamt;
      discount = discount + data.discount;
    }


    this.alltotal.lmrp = this.intToFloat(mrp, 2);
    this.alltotal.ldiscount = this.intToFloat(discount, 2);
    this.alltotal.ltaxable = this.intToFloat(taxableval, 2);
    this.alltotal.ltotal = this.intToFloat(amount, 2);
    this.alltotal.lgst = this.intToFloat(gstamt, 2);
  }

  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split('.');
    var number = atemp[0].split(',').join('');
    var n_length = number.length;
    var words_string = '';
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + Number(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      var value = 0;
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + ' ';
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += 'Crores ';
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += 'Lakhs ';
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += 'Thousand ';
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += 'Hundred and ';
        } else if (i == 6 && value != 0) {
          words_string += 'Hundred ';
        }
      }
      words_string = words_string.split('  ').join(' ');
    }
    return words_string;
  }

  submitservicingdetails() {
    console.log('submiti function');
    var url = this.restService.servicingdetailsRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingdetails).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        window.scrollTo(0, 0);
        //  this.route.navigate(['/manageservicingdetails/'+ this.id]);
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

  updateservicingdetails() {
    console.log('submiti function');
    var url = this.restService.servicingdetailsRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.servicingdetails).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        window.scrollTo(0, 0);
        // this.route.navigate(['/manageservicingdetails/'+ this.id]);
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

  private getserdetailsByid() {
    // Get Information from JSON REST api
    let url = this.restService.servicingdetailsRestURL('servicingdetailsbysid', this.servicingid);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.servicingdetails = response;
        this.servicingdetails.serviceduedate = this.unixTimeConverter(response.serviceduedate);
        this.servicingdetails.availedon = this.unixTimeConverter(response.availedon);
        this.servicingdetails.nextservicedueon = this.unixTimeConverter(response.nextservicedueon);
        this.servicingdetails.paid = response.paid;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getservicingByidinvoice() {
    // Get Information from JSON REST api
    let url = this.restService.servicingRestURL('details', this.servicingid);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.customerid = response.customer;
        this.getcustomerbyid();
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  private getcustomerbyid() {
    // Get Information from JSON REST api
    let url = this.restService.customerRestURL('details', this.customerid);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.customerdata = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  private getcustomerbyName(name: string) {
    // Get Information from JSON REST api
    // Get All Customer By Name
    // http://localhost:8090/IMBAManager/rest/customer/getByName/Neha a Meshram old
    // localhost:8090/IMBAManager/rest/customer/cust?firm=11&name=shreya Ravindra Nandurkar  current

   // let url = this.restService.customerRestURL('detailsbyname', name);

    let url = this.restService.customerRestURL('detailsbycustname', name);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        console.log('Done fatching data!in customerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

        this.customerdata = response;
        console.log(this.customerdata)
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getservicingjobByid() {
    // Get Information from JSON REST api
    // http://localhost:8090/IMBAManager/rest/servicing/job/card/billto?jobcard=38536&billto=CUSTOMER

    const urlstr = 'billto?jobcard=' + this.id + '&billto=CUSTOMER';
    let url = this.restService.servicingRestURL('getservicingjobByid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.servicingjob.labourdetails = response.labourdetails;
     //   this.servicingjob.accessorydetails = response.accessorydetails;
        this.servicingjob.partstotal = response.partstotal;
        this.servicingjob.labourtotal = response.labourtotal;
        this.servicingjob.othercharges = response.othercharges;
        this.servicingjob.finalamt = response.finalamt;
        this.servicingjob.advname = response.advname;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }








  private getservicingByid() {
    // Get Information from JSON REST api
    {
      let url = this.restService.servicingRestURL('details', this.servicinggid);
      this.restService.getJSONFromURL(url).subscribe(
        (response : any )=> {
          console.log('Done fatching data!');
          this.servicingg=response.freeservices;
          this.ispaid()
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
  }

  ispaid() {

    if (this.servicingdetails.paid === 'YES') {
      if (Number(this.servicingg) > 0) {
        // alert('in');
        Swal.fire('You Have Left ' + this.servicingg + ' servicing Free Servicing', '', 'info');
        this.servicingdetails.paid = 'NO';
      }
    }

    if (this.servicingdetails.paid === 'NO') {
      if (Number(this.servicingg) === 0) {
        //  alert('in');
        Swal.fire('You Do not have Left Any Free Servicing', '', 'info');
        this.servicingdetails.paid = 'YES';
      }
    }
  }

  getinsurerbyid() {
    let url = this.restService.insurerRestURL('details', this.insurerid);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.insurerdetails = response;
        this.ispaid();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getsparestockbyspareid() {
    let url = this.restService.sparepartstockRestURL('byprodid', this.accessorydetails.sparepart);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private deleteNewsList(id: any, data: any) {
    const index = this.sparepartstockdetails.findIndex(x => x.spare_stock === id);
    console.log('id= ' + id);
    console.log('index= ' + index);
    if (index > -1) {
      // alert('pop');
      //    this.delList.splice(this.delList.indexOf(id), 1);
      // a = [
      //   {prop1:"abc",prop2:"qwe"},
      //   {prop1:"bnmb",prop2:"yutu"},
      //   {prop1:"zxvz",prop2:"qwrq"}];
      // index = a.findIndex(x => x.prop2 ==="yutu");
      this.sparepartstockdetails.splice(index, 1);
      console.log(index);
    } else {
      // this.accessorydetails.spare_stock=data.id;
    }

  }


  intToFloat(num, decPlaces) {

    return num.toFixed(decPlaces);

  }

  getquantityspare() {
    let api = 'sparepart=' + this.accessorydetails.sparepart + '&qty=' + this.accessorydetails.qty;
    let url = this.restService.sparepartstockRestURL('quantityspare', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.sparepartstockdetails = response;
        for (let entry of this.sparepartstockdetails) {
          const temp = {
            stockid: entry.id,
            lotno: entry.lotno
          };
        }
        this.sparetotal();

        if (response.length === 0) {
          Swal.fire('Quantity is Not Available', 'Please Add Stock First', 'error');
          this.accessorydetails.qty = '';
        }

      },
      error => {
        console.log('Error in data load.');
      }
    );

  }



  // onAddDyelem() {


  //   let flagger =true;

  //   for (const entry of this.servicingjob.accessorydetails) {

  //       if(this.accessorydetails.sparepart == entry.sparepart ){

  //         Swal.fire( 'Cannot Add Duplicate Entry',    '','error'  );
  //         flagger=false;
  //       }
  //     }
  //   //   if (flagger){
  //   //   if ((this.pside !== '') && (this.ctype !== '')) {
  //   //     this.sidecolarr.push({ 'pside': this.pside, 'ctype': this.ctype });
  //   //     // this.dyElemObjData.push({ 'this.dyelem.name' : this.dyelem.value });
  //   //     // this.dynamo['this.dyelem.name']=this.dyelem.value;

  //   //     this.ctype = '';

  //   //     console.log(this.sidecolarr);


  //   //     // if ((this.pside !== '')) {
  //   //     // this.psidearr.push({ 'pside': this.pside});
  //   //     // console.log('pside arrrraayyy');
  //   //     //  console.log(this.psidearr);

  //   //     // }
  //   //   } else {
  //   //     alert('Information not complited yet');
  //   //   }
  //   //    this.pside = '';
  //   // }


  //   }



  // customer mail code

  private customerMail() {
    console.log('Call to customer mail  : ');
    // for email data start
    let tableData = [];
    let ic = 1;
    for (const pdata of this.servicingjob.labourdetails) {
      this.email_table.No = String(ic);
      this.email_table.Product_Head = pdata.labourname;
      this.email_table.Qty = pdata.qty;
      this.email_table.GST = pdata.gstamt;
      this.email_table.Amount = pdata.finalamt;
      this.email_table.Detail = pdata.labourdetails;
      ic = ic + 1;
      tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    }


    // for (const sdata of this.servicingjob.accessorydetails) {
    //   this.email_table.No = String(ic);
    //   this.email_table.Product_Head = sdata.pname;
    //   this.email_table.Qty = sdata.qty;
    //   this.email_table.GST = sdata.gstamt;
    //   this.email_table.Amount = sdata.finalamt;
    //   this.email_table.Detail = '';
    //   ic = ic + 1;
    //   console.log(this.email_table);
    //   tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    // }

    this.email.contentData.table = JSON.parse(JSON.stringify(tableData));

    const costtable = {
      Parts_total: this.servicingjob.partstotal,
      labour_total: this.servicingjob.labourtotal,
      other_charges: this.servicingjob.othercharges,
      FINAL_AMOUNT: this.servicingjob.finalamt,
    };

    this.email.contentData.costtable.push(costtable);
    console.log('generating email content data table ');
    console.log(this.email.contentData.table);
    console.log(this.email.contentData.costtable);
    // for email data end
    this.email.to =   this.customerdata.email;  //    this.custemail; // this.custEmail;
    console.log(this.email.to);
    this.email.contentData.content.quatationid = String(this.servicingjob.invoicenum); // quotation id
    this.email_table.Amount = '<p style=\'text-align:center\'>' + this.servicingjob.finalamt + '</p>';
    this.email.contentData.content.message = 'To, ' + this.custname.toUpperCase() + '\n ';

    console.log(this.email);
    this.email.templateId = 'servicing';

    // this.email.pdfid =   this.servicingid;  // booking id

    // this.email.fid = sessionStorage.getItem('firm');

    const totprod = Number(this.servicingjob.partstotal) + Number(this.servicingjob.labourtotal);
    this.email_table.Qty = '<p style=\'text-align:center\'>' + String(totprod) + '</p>';
    console.log('submiti function');
    console.log(this.email);
    const url = this.restService.mailRestURL('send', '');
    this.restService.postFormData(url, this.email).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        return true;
      },
      error => {
        // Error Message
        console.log('Failed to send email message to customer');
        return false;
        // Doyour stuff here
      }
    );
  }


  public createPDF(){
    // generate pdf on server
    let tableData = [];
    let ic = 1;
    for (const pdata of this.servicingjob.labourdetails) {
      this.email_table.No = String(ic);
      this.email_table.Product_Head = pdata.labourname;
      this.email_table.Qty = pdata.qty;
      this.email_table.GST = pdata.gstamt;
      this.email_table.Amount = pdata.finalamt;
      this.email_table.Detail = pdata.labourdetails;
      ic = ic + 1;
      tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    }


    // for (const sdata of this.servicingjob.accessorydetails) {
    //   this.email_table.No = String(ic);
    //   this.email_table.Product_Head = sdata.pname;
    //   this.email_table.Qty = sdata.qty;
    //   this.email_table.GST = sdata.gstamt;
    //   this.email_table.Amount = sdata.finalamt;
    //   this.email_table.Detail = '';
    //   ic = ic + 1;
    //   console.log(this.email_table);
    //   tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    // }

    this.email.contentData.table = JSON.parse(JSON.stringify(tableData));

    const costtable = {
      Parts_total: this.servicingjob.partstotal,
      labour_total: this.servicingjob.labourtotal,
      other_charges: this.servicingjob.othercharges,
      FINAL_AMOUNT: this.servicingjob.finalamt,
    };

   // this.email.contentData.costtable.push(costtable);
    console.log('generating email content data table ');
    console.log(this.email.contentData.table);
    console.log(this.email.contentData.costtable);
    // for email data end
    this.email.to =   this.customerdata.email;  //    this.custemail; // this.custEmail;
    console.log(this.email.to);
    this.email.contentData.content.quatationid = String(this.servicingjob.invoicenum); // quotation id
    this.email_table.Amount = '<p style=\'text-align:center\'>' + this.servicingjob.finalamt + '</p>';
    this.email.contentData.content.message = 'To, ' + this.custname.toUpperCase() + '\n ';

    console.log(this.email);
    this.email.templateId = 'servicing';
    this.email['pdfid'] =   this.servicingid;  // booking id
    this.email['fid'] = sessionStorage.getItem('firm');
    this.email['invoicetype'] = 'SERVICING';
    // this.email['entrytype'] = 'CUSTOMER';
    this.email['billedto'] = 'CUSTOMER';



    const totprod = Number(this.servicingjob.partstotal) + Number(this.servicingjob.labourtotal);
    this.email_table.Qty = '<p style=\'text-align:center\'>' + String(totprod) + '</p>';
    console.log('submiti function');
    console.log(this.email);
    const url = this.restService.mailRestURL('sendPDF', '');
    this.restService.postFormData(url, this.email).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        return true;
      },
      error => {
        // Error Message
        console.log('Failed to send email message to customer');
        return false;
        // Doyour stuff here
      }
    );

  }



  public createPDF1(){
    // generate pdf on server
    let tableData = [];
    let ic = 1;
    for (const pdata of this.servicingjob.labourdetails) {
      this.email_table.No = String(ic);
      this.email_table.Product_Head = pdata.labourname;
      this.email_table.Qty = pdata.qty;
      this.email_table.GST = pdata.gstamt;
      this.email_table.Amount = pdata.finalamt;
      this.email_table.Detail = pdata.labourdetails;
      ic = ic + 1;
      tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    }


    // for (const sdata of this.servicingjob.accessorydetails) {
    //   this.email_table.No = String(ic);
    //   this.email_table.Product_Head = sdata.pname;
    //   this.email_table.Qty = sdata.qty;
    //   this.email_table.GST = sdata.gstamt;
    //   this.email_table.Amount = sdata.finalamt;
    //   this.email_table.Detail = '';
    //   ic = ic + 1;
    //   console.log(this.email_table);
    //   tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    // }

    this.email.contentData.table = JSON.parse(JSON.stringify(tableData));

    const costtable = {
      Parts_total: this.servicingjob.partstotal,
      labour_total: this.servicingjob.labourtotal,
      other_charges: this.servicingjob.othercharges,
      FINAL_AMOUNT: this.servicingjob.finalamt,
    };

    this.email.contentData.costtable.push(costtable); /// if mail send then comment this
    console.log('generating email content data table ');
    console.log(this.email.contentData.table);
    console.log(this.email.contentData.costtable);
    // for email data end
    this.email.to =   this.customerdata.email;  //    this.custemail; // this.custEmail;
    console.log(this.email.to);
    this.email.contentData.content.quatationid = String(this.servicingjob.invoicenum); // quotation id
    this.email_table.Amount = '<p style=\'text-align:center\'>' + this.servicingjob.finalamt + '</p>';
    this.email.contentData.content.message = 'To, ' + this.servicingjob.insurername.toUpperCase() + '\n ';

    console.log(this.email);
    this.email.templateId = 'servicing';
    this.email['pdfid'] =   this.servicingid;  // booking id
    this.email['fid'] = sessionStorage.getItem('firm');
    this.email['invoicetype'] = 'SERVICING';
    // this.email['entrytype'] = 'CUSTOMER';
    this.email['billedto'] = 'INSURER';



    const totprod = Number(this.servicingjob.partstotal) + Number(this.servicingjob.labourtotal);
    this.email_table.Qty = '<p style=\'text-align:center\'>' + String(totprod) + '</p>';
    console.log('submiti function');
    console.log(this.email);
    const url = this.restService.mailRestURL('sendPDF', '');
    this.restService.postFormData(url, this.email).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        return true;
      },
      error => {
        // Error Message
        console.log('Failed to send email message to customer');
        return false;
        // Doyour stuff here
      }
    );

  }

  private getCustById(id: any) {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        this.restService.getJSONFromURL(response);
        this.custemail = response.email;
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  private getjobcardByid() {
    let url = this.restService.servicingRestURL('jobcardByid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        this.servicingjob1.jobcardno = response.jobcardno;
        this.servicingjob1.chassisnum = response.chassisnum;
        this.servicingjob1.servicetype = response.servicetype;
        this.servicingjob1.vregno = response.vregno;
        this.servicingjob1.vmodel = response.vmodel;
        this.servicingjob1.supervisor = response.supervisor;
        this.servicingjob1.supervisorname = response.supervisorname;
        this.servicingjob1.enginenum = response.enginenum;
        this.servicingjob1.kmscoverage = response.kmscoverage;
        this.servicinggid = response.servicing;
        this.custname = response.custname;
        this.getcustomerbyName(response.custname); // aded on 3/12/2020

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getJobcardData(id: any) {
    // Get Information from JSON REST api
    const url = this.restService.jobcardRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data!');
        console.log('Done fatching data! in jpbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb card');

        this.jobcarddata = response;
        this.getcustomerbyName(response.custname);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  updateJobcardData(billt2: string) {
    console.log('Update function');
    let jsondata = {

    };

    if (billt2 === 'CUSTOMER') {
      jsondata['id'] = this.id;
      jsondata['isinsured'] = this.isinsured;
      jsondata['iscustinvoicegen'] = 'YES';
    } else {
      jsondata['id'] = this.id;
      jsondata['isinsurinvoicegen'] = 'YES';
    }

    var url = this.restService.jobcardRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, jsondata).subscribe(
      (response : any )=> {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
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

}
