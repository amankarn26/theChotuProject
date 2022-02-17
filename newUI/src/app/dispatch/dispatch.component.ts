import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from './../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {


  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  public id;
  private depList;
  public detailFlag = false;
  private retlList;
  private emplList;
  private prodlList;
  private prodlableList;
  private stateId;
  private clientdata;
  private citylist1;
  private citylist2;
  private prodpercentList;
  private ratelabel;
  private travelType;
  //  private travelType = 'Preffered';
  private dispatchData; // get dispatch by id
  private retailerEmail;
  private empList;
  private transvendList;
  private qid;
  private nmail = sessionStorage.getItem('email');
  private pref;
  private retllist;
  public isUpdate = false;

  private payslipdate;
  private packingList = [];

  public dispatchno;

  // pnkj start:

  // transport json for transport details
  // private qtransport = {
  //   deliverydays: '',
  //   deliverytime: '',
  //   delvalidtime: '',
  //   totalweight: 0,
  //   numbundles: 0,
  //   preftravel: {
  //     name: '',
  //     city: '',

  //     parcelamt: 0
  //   },
  //   temptravel: {
  //     name: '',
  //     city: '',

  //     parcelamt: 0
  //   }
  // };

  // quotation cost
  // private qcost = {
  //   ordercost: 0.0,
  //   parcel: 0.0,
  //   subtotal: 0.0,
  //   profit: 0.0,
  //   loss: 0.0,
  //   bargain: 0.0,
  //   GST: 0.0,
  //   finalamt: 0.0
  // };


  // private qdetail = {
  //   Paper: 0.0,
  //   Printing: 0.0,
  //   Lamination: 0.0,
  //   PostPress: 0.0,
  //   Cutting: 0.0
  // };


  // public dyelem = {
  //   name: '',
  //   value: ''
  // };
  // public dyElemObjData = [];
  // private dynamo;
  // pnkj end:

  // private quotation = {
  //   requestortype: '',
  //   custstate: '',
  //   custcity: '',
  //   retailer: '',
  //   retailername: '',
  //   primhandler: '',
  //   primhandlername: '',
  //   sechandler: '',
  //   sechandlername: '',
  //   qtransport: {

  //     deliverydays: '',
  //     deliverytime: '',
  //     delvalidtime: '',
  //     totalweight: '',
  //     numbundles: '',
  //     preftravel: {
  //       name: '',
  //       address: {
  //         line1: '',
  //         line2: '',
  //         city: '',
  //         states: '',
  //         pincode: '',
  //         country: 'India'
  //       },
  //       city: '',
  //       parcelamt: '1',
  //     },
  //     temptravel: {
  //       name: '',
  //       city: '',
  //       parcelamt: '1',
  //       address: {
  //         line1: '',
  //         line2: '',
  //         city: '',
  //         states: '',
  //         pincode: '',
  //         country: 'India'
  //       }
  //     }
  //   },
  //   qcost: {

  //     ordercost: 1.0,
  //     parcel: 1.0,
  //     subtotal: 10,
  //     profit: 10,
  //     loss: 10,
  //     bargain: 10,
  //     GST: 10,
  //     finalamt: 10,
  //   },
  //   qcalcs: [{

  //     head: 0,
  //     amount: 0,
  //     detail: 0
  //   }],
  //   data: {},

  //   comments: '',
  //   status: 'ADDED',
  //   validtill: '',


  //   details: [],


  // }


  // private product = {
  //   product: '',
  //   pname: '',
  //   prodcode: '',
  //   totalqty: '',
  //   totalpacks: '',
  //   unitsperpack: '',
  //   wastage: '',
  //   rateunit: '',
  //   rateperunit: '',
  //   amount: '',
  //   ratelabelperc: '',
  //   finalamt: '',
  // };

  private dentryArr = [];
  private dentryArr1 = [];


  private packing = {

    dispatchno: '',
    dispatchedon:'',
    transport:
    {
      transtype: '',
      vehicleno: '',
      vehicletype: '',
      drivername: '',
      helpername: ''
    },
    //  lastupdatedon: '',
    // dispatchedon: '',
    fromplace: '',
    toplace: '',
    estdtime: '',
    supervisedby: sessionStorage.getItem('name'),

    disentry: [],


  };

  private disentry1 = {

    dispatchno: '',                                 //retailer id

    orderdate: '',                            //date

    qtraveldetail: {                                 // preftravel
      name: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        states: '',
        pincode: '',
        country: 'India'
      },
      city: '',
      parcelamt: 0
    },

    quotesale: '',
    invoicenum: '',
    packing: '',
    customer: '',
    custname: '',

    status: 'DISPATCHED',         // not null DISPATCHED/NOT_DISPATCHED/DELIVERED
    paystatus: 'RELEASE',          // STOP/RELEASE
    retailorder: '',               // retailorder id (dropdown)
    totalpkts: 0,
    estdweight: '',
    actualweight: '',
    diffweight: '',
    packedbyname: '',
    packedon: '',
    deliveryincharge: '', // employee
    dispatchedon: '',
    dispatch_scheduledon: '',
    dispatch_scheduledate: '',
    // deliveredto: '',
    //  deliveredon: '',  removed on 4/26/2019




    // retailer: '',
    // retailername: '',                          //retailer name
    // packingincharge: '',           //employee id
    // deliveryincharge: '',
  };



  private disentry = {

    dispatchno: '',                                 //retailer id

    orderdate: '',                            //date

    qtraveldetail: {                                 // preftravel
      name: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        states: '',
        pincode: '',
        country: 'India'
      },
      city: '',
      parcelamt: 0
    },

    quotesale: '',
    invoicenum: '',
    packing: '',
    customer: '',
    custname: '',

    status: 'DISPATCHED',         // not null DISPATCHED/NOT_DISPATCHED/DELIVERED
    paystatus: 'RELEASE',          // STOP/RELEASE
    //  retailorder: '',               // retailorder id (dropdown)
    totalpkts: 0,
    // estdweight: '',
    // actualweight: '',
    // diffweight: '',
    packedbyname: '',
    packedon: '',
    deliveryincharge: '', // employee
    dispatchedon: '',
    dispatch_scheduledon: '',
    dispatch_scheduledate: '',
    // deliveredto: '',
    //  deliveredon: '',  removed on 4/26/2019




    // retailer: '',
    // retailername: '',                          //retailer name
    // packingincharge: '',           //employee id
    // deliveryincharge: '',
  };

  // private pdetails = {
  //   packetno: '',
  //   packedby: '',
  //   packedbyname: '',
  //   pktweight: ''
  // }

  private dispatchArary = [];

  public custData;
  public firmData;

  private datalist;
  private catList;
  public userType;
  public userrole = sessionStorage.getItem('role');
  public statelist = [];
  public citylist = [];
  private obj;


  // for datatable
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


  ngOnInit() {

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }

    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/adddispatch') {
      this.title = 'Add Dispatch';
      this.subtitle = 'Fill Dispatch Entry';
      this.isManageState = false;
      // this.getemp();
      // this.getproduct();
      // this.getStateList();
      // this.getEmpList1();
      // this.getVenderList();
      // this.getretaileorder();
      // this.getretailer();
      this.isUpdate = false;
      this.getdisptacheno();
      this.getPacking();
      this.getFirmbyID();
      this.getEmpList();
      //   this.getlastLotno();

    } else if (this.route.url === '/editpacking/' + this.id) {
      this.title = 'Update Packing';
      this.isManageState = false;
      // this.getStateList();
      // this.getEmpList1();
      // this.getVenderList();
      // this.getproduct();
      this.isUpdate = true;

    } else if (this.route.url === '/detaildispatch/' + this.id) {
      this.title = 'Dispatch Details';
      this.isManageState = false;
      this.detailFlag = true;
      //  this.getByid(this.id);

    } else {
      this.title = 'Manage Dispatch';
      this.subtitle = 'Manage Dispatch information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');


    }


  }


  //   private getdays() {
  //     // alert('getting days');
  //     console.log('Getting days');
  //     console.log(this.payslipdate);
  //     // alert(this.payslipdate);


  //     var foo = this.payslipdate;
  //    // alert(foo);
  //     var arr = foo.split('-');
  //      const year = Number(arr[0]);
  //      const month = Number(arr[1]) - 1;
  // this.getData(month, year);
  //    }

  //   // Start: dynamic data
  //   // onAddDyelem() {

  //   //   if (this.dyelem.name !== '' && this.dyelem.value !== '') {
  //   //     this.dyElemObjData.push({
  //   //       'name': this.dyelem.name,
  //   //       'value': this.dyelem.value
  //   //     });

  //   //     this.dyelem.name = '';
  //   //     this.dyelem.value = '';
  //   //   } else {
  //   //     alert('Information not complited yet');
  //   //   }
  //   // }

  //   // onDeleteDyelem(i) {
  //   //   this.dyElemObjData.splice(i, 1);
  //   //   Swal.fire('Deleted!', '', 'success');
  //   // }
  //   // end: dynamic data


  //   // Start: get data**************************************************************
  //   private getData(month:any, year:any) {
  //     // Get Information from JSON REST api
  //   //  const url = this.restService.empRestURL('generatepayslip', 'empid=' + this.empId+ '&month=' + month + '&year=' + year);
  //     var url = this.restService.dispatchRestURL('dispatchmonthly', 'date?' +'&month=' + month + '&year=' + year);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         this.data = response;
  //         console.log(response);

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  //   // http://localhost:8090/SuppChainManager/rest/dispatch/date?month=1&year=2019









  //   // private getprodData(id: any) {
  //   //   // Get Information from JSON REST api
  //   //   var url = this.restService.quotaionRestURL('proddetails', id);
  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       this.quotation.details = response;
  //   //       //   console.log(response);
  //   //       for (const entry of response) {
  //   //         delete entry['id'];
  //   //       }
  //   //     },
  //   //     error => {
  //   //       console.log('Error product in data load.');
  //   //     }
  //   //   );
  //   // }

  //   //  updateData() {
  //   //    console.log('submiti function');
  //   //    var url = this.restService.quotaionRestURL('edit', '');
  //   //    console.log(url);
  //   //    this.restService.postFormData(url, this.vendor).subscribe(
  //   //      (response:any) => {
  //   //        // Responce data.
  //   //        console.log('Status on Post API');
  //   //        console.log(response);
  //   //        // Now do your stuff here
  //   //        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
  //   //        Swal.fire('', '', 'success');
  //   //        window.scrollTo(0, 0);
  //   //        this.route.navigate(['/managepacking']);
  //   //      },
  //   //      error => {
  //   //        // Error Message
  //   //        Swal.fire(
  //   //          error.statusText,
  //   //          error._body,
  //   //          'error'
  //   //        );
  //   //        console.log('Error in data load.');
  //   //        // Doyour stuff here
  //   //      }
  //   //    );
  //   //    return 0;
  //   //  }


  //   private getByid(id: any) {
  //     // Get Information from JSON REST api
  //     let url = this.restService.dispatchRestURL('details', id);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         console.log('Done fatching data!');
  //         this.dispatchData = response;

  //         // this.quotation.requestortype = response.requestortype;
  //         // this.quotation.custstate = response.custstate;
  //         // this.getCityList(response.custstate);
  //         // this.quotation.custcity = response.custcity;
  //         // this.getClienList();
  //         // this.quotation.retailer = response.retailer;
  //         // this.quotation.retailername = response.retailername;
  //         // this.quotation.primhandler = response.primhandler;
  //         // this.quotation.primhandlername = response.primhandlername;
  //         // this.quotation.sechandler = response.sechandler;
  //         // this.quotation.sechandlername = response.sechandlername;

  //         // this.quotation.qtransport.deliverydays = response.qtransport.deliverydays;
  //         // this.quotation.qtransport.deliverytime = this.unixTimeConverterDate(response.qtransport.deliverytime);
  //         // this.quotation.qtransport.delvalidtime = this.unixTimeConverterDate(response.qtransport.delvalidtime);
  //         // this.quotation.qtransport.totalweight = response.qtransport.totalweight;
  //         // this.quotation.qtransport.numbundles = response.qtransport.numbundles;
  //         // this.quotation.qtransport.temptravel.name = response.qtransport.temptravel.name;
  //         // // this.getvendor();
  //         // this.quotation.qtransport.temptravel.city = response.qtransport.temptravel.city;
  //         // this.quotation.qtransport.temptravel.parcelamt = response.qtransport.temptravel.parcelamt;
  //         // this.quotation.qcost.ordercost = response.qcost.ordercost;
  //         // this.quotation.qcost.parcel = response.qcost.parcel;
  //         // this.quotation.qcost.subtotal = response.qcost.subtotal;
  //         // this.quotation.qcost.profit = response.qcost.profit;
  //         // this.quotation.qcost.loss = response.qcost.loss;
  //         // this.quotation.qcost.bargain = response.qcost.bargain;
  //         // this.quotation.qcost.GST = response.qcost.GST;
  //         // this.quotation.qcost.finalamt = response.qcost.finalamt;
  //         // this.quotation.comments = response.comments;
  //         // this.quotation.status = response.status;
  //         // this.quotation.validtill = this.unixTimeConverterDate(response.validtill);
  //         // // this.quotation.totalproducts=response.totalproducts;
  //         // // if(response.data){

  //         // //   this.dyElemObjData=response.data;
  //         // // }
  //         // // this.quotation.qtransport.preftravel.address.states=response.custstate;

  //         // //   this.quotation.qtransport.preftravel.city=response.custcity;




  //         // for (var key in response.data) {
  //         //   console.log('Key: ' + key);
  //         //   console.log('Value: ' + response.data[key]);
  //         //   this.dyElemObjData.push({ 'name': key, 'value': response.data[key] });
  //         // }
  //         // console.log('dynamic elem.');
  //         // console.log(this.dyElemObjData);


  //         // this.getprodData(this.id);

  //         // console.log(response);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  //   private getRetailById(id: any) {

  //     // Get Information from JSON REST api
  //     const url = this.restService.RetailerRestURL('details', id);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         // this.datalist = response;
  //         // this.data=response;
  //         console.log('Getting retailer by id');
  //         console.log(response);
  //         //  this.retailerEmail = response.login.email;

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );

  //   }

  //   private getStateList() {
  //     // Get Information from JSON REST api
  //     var url = this.restService.stateRestURL('', 'India');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         // this.restService.getJSONFromURL(response);
  //         this.statelist = response;
  //         console.log('State data available');
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   //  private getState() {
  //   //   // Get Information from JSON REST api
  //   //   var url = this.restService.PincodeRestURL('',this.vendor.address.pincode);
  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       // this.restService.getJSONFromURL(response);
  //   //       this.statelist = response;
  //   //       this.quotation.custstate=response.state_name;
  //   //       this.quotation.custcity=response.city_name;


  //   //       console.log('State data available');
  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }
  //   //   );
  //   // }


  //   private getCatList() {
  //     // Get Information from JSON REST api
  //     var url = this.restService.catRestURL('', '');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         // this.restService.getJSONFromURL(response);
  //         this.catList = response;
  //         console.log('State data available');
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   private getVenderList() {
  //     this.transvendList = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.vendorRestURL('', '');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         // this.restService.getJSONFromURL(response);
  //         this.transvendList = response;
  //         console.log('vendor data available');
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  //   private getretaileorder() {
  //     this.retllist = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.reteailorderRestURL('', '');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         // this.restService.getJSONFromURL(response);
  //         this.retllist = response;
  //         console.log('retialer data available');
  //         console.log( this.retllist );
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   private onChangeState(obj) {
  //     let stateId = obj.srcElement.value;
  //     // Call city data method
  //     this.getCityList(stateId);
  //   }
  //   private onChangeState1(obj) {
  //     const stateId = obj.srcElement.value;
  //     // Call city data method
  //     this.getCityList1(stateId);
  //   }
  //   private onChangeState2(obj) {
  //     const stateId = obj.srcElement.value;
  //     // Call city data method
  //     this.getCityList2(stateId);
  //   }

  //   private getCityList(stateId) {
  //     this.citylist = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.cityRestURL('', stateId);
  //     console.log(stateId);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.citylist = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   private getCityList1(stateId) {
  //     this.citylist1 = [];
  //     // Get Information from JSON REST api
  //     const url = this.restService.cityRestURL('', stateId);
  //     console.log(stateId);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.citylist1 = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  //   private getCityList2(stateId) {
  //     this.citylist2 = [];
  //     // Get Information from JSON REST api
  //     const url = this.restService.cityRestURL('', stateId);
  //     console.log(stateId);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.citylist2 = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  //   private getretailer() {

  //     this.retlList = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.RetailerRestURL('', '');

  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.retlList = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   // private getClienList() {

  //   //   // Get Information from JSON REST api
  //   //   const url = this.restService.RetailerRestURL('city', this.quotation.custcity);
  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       this.restService.getJSONFromURL(response);
  //   //       // this.datalist = response;
  //   //       // this.data=response;
  //   //       console.log(response);
  //   //       this.clientdata = response;
  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }
  //   //   );
  //   // }

  //   private getEmpList1() {
  //     // Get Information from JSON REST api
  //     const url = this.restService.empRestURL('', '');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         // this.datalist = response;
  //         // this.data=response;
  //         console.log(response);
  //         // this.data = response;
  //         this.empList = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   private onChangeCustomer(obj) {
  //     const stateId = obj.srcElement.value;
  //     this.getRetailById(stateId);
  //     console.log(obj);
  //     // Call city data method
  //     console.log('onChangeCustomer');
  //     console.log(obj.target.value);
  //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //     // this.quotation.retailername = obj.target.options[obj.target.selectedIndex].text;
  //   }

  //   private onChangeHandler1(obj) {
  //     const stateId = obj.srcElement.value;
  //     // console.log(obj);
  //     // Call city data method
  //     console.log('primhandre...');
  //     console.log(obj.target.value);
  //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //     // this.quotation.primhandlername = obj.target.options[obj.target.selectedIndex].text;
  //   }
  //   private onChangeHandler2(obj) {
  //     const stateId = obj.srcElement.value;
  //     // console.log(obj);
  //     // Call city data method
  //     console.log('sechandler...');
  //     console.log(obj.target.value);
  //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //     // this.quotation.sechandlername = obj.target.options[obj.target.selectedIndex].text;
  //   }


  //   private getemp() {
  //     this.emplList = [];
  //     // Get Information from JSON REST apiz
  //     var url = this.restService.empRestURL('', '');

  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.emplList = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }

  //   private getproduct() {
  //     this.prodlList = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.productRestURL('', '');

  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.prodlList = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  //   private getproductlabel() {
  //     this.prodlableList = [];
  //     // Get Information from JSON REST api
  //     var url = this.restService.productlabelRestURL('', '');

  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.prodlableList = response;
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  //   // private getproductpercentage() {

  //   //   var url = this.restService.productlabelRestURL('percentage', this.product.prodcode);

  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {

  //   //       this.product.ratelabelperc = response.ratelabelperc;
  //   //       this.ratelabel = response.ratelabel;
  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }
  //   //   );
  //   // }

  //   clonequotation(id: any) {



  //     var url = this.restService.quotaionRestURL('clone', '');
  //     console.log(id);
  //     let json = '{\"id\":\"' + id + '\"}';
  //     this.restService.postFormData(url, json).subscribe(
  //       (response:any) => {
  //         // Responce data.
  //         console.log('Status on Post API');
  //         console.log(response);
  //         this.getByid(response.id);

  //       },
  //       error => {
  //         // Error Message
  //         // this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
  //         //   + error._body);
  //         console.log('Error in data load.');
  //         // Doyour stuff here
  //       }
  //     );
  //     return 0;


  //   }


  //   private getclone(id: any) {

  //     // Get Information from JSON REST api
  //     let url = this.restService.quotaionRestURL('clone', id);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         console.log('Done fatching data!');
  //         // this.data = response;

  //         this.getByid(this.id);

  //         // this.getrorderData(this.id);



  //         console.log(response);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );



  //   }
  //   private confirm(data: any) {

  //     // this.getprodData(data.id);

  //     var url = this.restService.quotaionRestURL('update', '');
  //     const id = data.id;
  //     const json = {
  //       "id": id,
  //       "status": "ORDER_CONFIRM"
  //     }

  //     this.restService.postFormData(url, json).subscribe(
  //       (response:any) => {
  //         console.log('Done fatching data!');

  //         console.log(id);
  //         alert(id);

  //         // this.approvemail(data);

  //         console.log(response);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );



  //   }

  //   public unixTimeConverterDate(ts) {
  //     let datetime = '';
  //     const dattime1 = '';
  //     let dd: string;
  //     let mm: string;
  //     let temp: string;
  //     let temp1: string = '0';



  //     // Create a new JavaScript Date object based on the timestamp
  //     // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  //     const dtt = new Date(ts * 1000);
  //     // Hours part from the timestamp
  //     const hours = dtt.getHours();
  //     // Minutes part from the timestamp
  //     const minutes = '0' + dtt.getMinutes();
  //     // Seconds part from the timestamp
  //     const seconds = '0' + dtt.getSeconds();

  //     // Will display time in 10:30:23 format
  //     const formattedTime = hours + ':' + minutes.substr(-2);
  //     // alert(formattedTime);


  //     try {
  //       const dateVal = '/Date(' + ts + ')/';
  //       const date = new Date(parseFloat(dateVal.substr(6)));

  //       // for month only
  //       temp = (date.getMonth() + 1).toString();
  //       if (temp.length < 2) {
  //         temp1 = '0';
  //         temp1 = temp1 + temp;
  //         // alert(temp);
  //         mm = temp1;
  //       } else { mm = (date.getMonth() + 1).toString(); }

  //       // for date only
  //       temp = date.getDate().toString();
  //       if (temp.length < 2) {
  //         temp1 = '0';
  //         temp1 = temp1 + temp;

  //         dd = temp1;
  //       } else { dd = date.getDate().toString(); }

  //       //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
  //       datetime = date.getFullYear() + '-' + mm + '-' + dd;


  //     } catch (err) {
  //       console.log('Unable to parse date data in unixTimeConverter');
  //       datetime = ts;
  //     }

  //     // this.tm=formattedTime;
  //     return datetime;

  //   }




  //   // private getproductgst() {

  //   //   console.log('Product changed');


  //   //   for (let data of this.prodlList) {

  //   //     console.log(data.name);
  //   //     if (Number(data.id) === Number(this.product.product)) {

  //   //       this.product.prodcode = data.prodcode;
  //   //       this.product.rateperunit = data.rateperunit;
  //   //       this.product.rateunit = data.rateunit;
  //   //       this.product.pname = data.name;

  //   //       this.getproductpercentage();


  //   //     }




  //   //   }


  //   // }
  //   onDeleteproduct(i) {



  //     console.log('Deleting*********************');




  //     // this.quotation.details.splice(i, 1);

  //     // this.alertify.alert('Item Deleted successfully.');
  //     Swal.fire(
  //       'Deleted!',
  //       '',
  //       'success'
  //     );
  //     // console.log(this.dyElemObjData);
  //   }

  //   onDeleteDispatch(i) {
  //     console.log('Deleting*********************');
  //     this.dispatchArary.splice(i, 1);
  //     Swal.fire(
  //       'Deleted!',
  //       '',
  //       'success'
  //     );
  //     // console.log(this.dyElemObjData);
  //   }


  //   // private getvendor() {
  //   //   // alert('alor re bhau..');
  //   //   // alert(this.quotation.product);
  //   //   console.log('vender changed');
  //   //   for (let data of this.transvendList) {

  //   //     console.log(data.name);
  //   //     if (data.name === this.quotation.qtransport.temptravel.name) {

  //   //       this.quotation.qtransport.temptravel.name = data.name;
  //   //       this.quotation.qtransport.temptravel.address.states = data.address.states;
  //   //       this.getCityList2(this.quotation.qtransport.temptravel.address.states);
  //   //       this.quotation.qtransport.temptravel.address.city = data.address.city;
  //   //       this.quotation.qtransport.temptravel.address.line1 = data.address.line1;
  //   //       this.quotation.qtransport.temptravel.address.line2 = data.address.line2;
  //   //       this.quotation.qtransport.temptravel.address.pincode = data.address.pincode;
  //   //       //  this.quotation.qtransport.temptravel.city=data.city;
  //   //       //  this.quotation.qtransport.temptravel.parcelamt=data.p


  //   //       // this.quotation.qtransport.temptravel.address.states = data.address.states;


  //   //     }

  //   //   }

  //   // }

  //   // private getptravelvendor(id: any) {

  //   //   //this.prodpercentList = [];
  //   //   // Get Information from JSON REST api
  //   //   var url = this.restService.level2detailRestURL('prefred', this.quotation.retailer);

  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       // this.pref = response;
  //   //       // for(let data of this.pref){
  //   //       //   // console.log("in preferrd travel");
  //   //       //   // this.qtransport.preftravel.name=data.name;
  //   //       //   // console.log('in name');
  //   //       //   // this.quotation.custcity=response.city;
  //   //       // }
  //   //       console.log("in preferrd travel");
  //   //       // this.qtransport.preftravel.name=response.name;

  //   //       this.quotation.qtransport.preftravel.name = response[0].vendor;

  //   //       this.quotation.qtransport.preftravel.address.states = this.quotation.custstate;

  //   //       this.quotation.qtransport.preftravel.city = this.quotation.custcity;





  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }
  //   //   );




  //   // }



  //   private getwtofparcel() {
  //     console.log('Get wt of parcel');

  //     // (this.quotation.paperqty > 0) &&  this.paper[0].size
  //     // if (this.quotation.type !== 'CLUBBING_JOB') {
  //     //   if ((this.quotation.psize !== '')) {
  //     //     // Get Information from JSON REST api

  //     //   //  console.log('getting print run');
  //     //     console.log('this.quotation.paperqty : ' + this.quotation.paperqty);

  //     //     let urlString =
  //     //       'weight?size=' +
  //     //       this.quotation.psize +
  //     //       //   this.quotation.paperqty +
  //     //       '&gsm=' +
  //     //       this.travelGsm +
  //     //       '&qty=' +
  //     //       this.quotation.prodqty +  // updated on 11-14-2018
  //     //       '&namune=' +
  //     //       this.namune;

  //     //     //  rate/paper/weight?size=18X23&gsm=150&qty=1000      quotation.prodqty

  //     //     const url = this.restService.papersizeRestURL('wt', urlString);
  //     //     this.restService.getJSONFromURL(url).subscribe(
  //     //       (response:any) => {
  //     //         this.restService.getJSONFromURL(response);
  //     //         console.log('wt of parcel');
  //     //         console.log(response);


  //     //         if (this.quotation.type !== 'BOOKWORK' && this.quotation.type !== 'MULTIPLE_SHEET') {
  //     //           this.qtransport.totalweight = response;
  //     //           this.getTravelrate();
  //     //         } else {
  //     //           this.totalBookwt += response;
  //     //           console.log('wt of parcel for subproduct : ' + this.totalBookwt);
  //     //           this.qtransport.totalweight += response;
  //     //           console.log('wt of parcel for transport : ' + this.qtransport.totalweight);
  //     //         }
  //     //         // this.printrunData = response.plist;

  //     //      //    this.quotation.paperqty = response.paperqty;  updated on 11/19/2018

  //     //         // this.qpaper.sheetcnt = response.sheetcnt;
  //     //         // this.qprint.impressions = response.impresssions;
  //     //      //   this.getTravelrate();
  //     //       },
  //     //       error => {
  //     //         console.log('Error in data load.');
  //     //       }
  //     //     );
  //     //   }
  //     // } else {

  //     let clbsize;


  //     // if (this.route.url === '/generatequotation/' + encodeURIComponent(this.id)
  //     //       ) {
  //     //         clbsize = this.quotation.psize;
  //     //         this.travelGsm = Number(this.qpaper.gsm);
  //     //       }else{
  //     //         clbsize = this.paper[0].size;
  //     //       }

  //     //     if ((clbsize !== '' && this.quotation.prodqty > 0)) {
  //     //       // Get Information from JSON REST api

  //     //       console.log('getting print run');
  //     //       console.log('this.quotation.prodqty : ' + this.quotation.prodqty);

  //     //       let urlString =
  //     //         'weight?size=' +
  //     //         clbsize +
  //     //         //   this.quotation.paperqty +
  //     //         '&gsm=' +
  //     //         this.travelGsm +
  //     //         '&qty=' +
  //     //         this.quotation.prodqty +
  //     //         '&namune=' +
  //     //         this.namune;


  //     //         console.log(urlString);

  //     //       //  rate/paper/weight?size=18X23&gsm=150&qty=1000

  //     //       const url = this.restService.papersizeRestURL('wt', urlString);
  //     //       this.restService.getJSONFromURL(url).subscribe(
  //     //         (response:any) => {
  //     //           this.restService.getJSONFromURL(response);
  //     //           console.log('wt of parcel');
  //     //           console.log(response);

  //     //           this.qtransport.totalweight = response;
  //     //           // this.printrunData = response.plist;

  //     //           // this.quotation.paperqty = response.paperqty;

  //     //           // this.qpaper.sheetcnt = response.sheetcnt;
  //     //           // this.qprint.impressions = response.impresssions;
  //     //           this.getTravelrate();
  //     //         },
  //     //         error => {
  //     //           console.log('Error in data load.');
  //     //         }
  //     //       );
  //     //     }
  //     //   }
  //   }


  //   // private getTravelrate() {
  //   //   console.log('Getting travel rate');

  //     // remove it when travel rate api working : start
  //     // if (
  //     //   this.qtransport.preftravel.parcelamt >
  //     //   this.qtransport.temptravel.parcelamt
  //     // ) {
  //     //   this.qcost.parcel = this.qtransport.preftravel.parcelamt;
  //     // } else {
  //     //   this.qcost.parcel = this.qtransport.temptravel.parcelamt;
  //     // }

  //     // console.log('Parcel amount :' + this.qcost.parcel);
  //     // this.qcost.subtotal =
  //     //   Number(this.qcost.ordercost) + Number(this.qcost.parcel);
  //     // remove it when travel rate api working : end
  //     // console.log('ingettravel');
  //     // let strurl;
  //     // if (this.travelType === 'Preffered') {
  //     //   strurl = 'travel?vendor=' + this.qtransport.preftravel.name +
  //     //     '&dest=' + this.qtransport.preftravel.city +
  //     //     '&weight=' + this.qtransport.totalweight;
  //     // } else {
  //     //   strurl = 'travel?vendor=' + this.qtransport.temptravel.name +
  //     //     '&dest=' + this.qtransport.temptravel.city +
  //     //     '&weight=' + this.qtransport.totalweight;
  //     // }

  //     // const url = this.restService.travelrateRestURL('rate', strurl);
  //     // this.restService.getJSONFromURL(url).subscribe(
  //     //    (response:any) => {
  //     //     this.restService.getJSONFromURL(response);
  //     //     // this.datalist = response;
  //     //     // this.data=response;
  //     //     console.log(response);
  //     //     this.qtransport.numbundles = response.numbundles;

  //     //     if (this.travelType === 'Preffered') {

  //     //       if (this.qtransport.temptravel.parcelamt > 0) {
  //     //       //  this.qcost.ordercost -= this.qtransport.temptravel.parcelamt; // removed on 12/1/2018
  //     //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //     //         this.qtransport.temptravel.parcelamt = 0;
  //     //         // this.qcost.parcel = 0;

  //     //       }
  //     //       this.qtransport.preftravel.parcelamt = response.amount;

  //     //     } else {
  //     //       if (this.qtransport.preftravel.parcelamt > 0) {
  //     //        // this.qcost.ordercost -= this.qtransport.preftravel.parcelamt; // removed on 12/1/2018
  //     //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //     //         this.qtransport.preftravel.parcelamt = 0;
  //     //         // this.qcost.parcel = 0;
  //     //       }
  //     //       this.qtransport.temptravel.parcelamt = response.amount;
  //     //       this.qcost.parcel = response.amount; // added on 12/1/2018
  //     //     }

  //     //     this.qcost.parcel = response.amount;
  //     //     this.qcost.subtotal = Number(this.qcost.ordercost) + Number(this.qcost.parcel);


  //     //     // this.qcost.ordercost -= this.plate_amount;
  //     //     //this.qcost.subtotal -= this.plate_amount;
  //     //     // this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //     //     this.qcost.subtotal = Math.round(this.qcost.subtotal * 100) / 100;



  //     //     //this.profitlosscount(); // calling profit or loss  Added on 11/14/2018
  //     //   },
  //     //   error => {
  //     //     console.log('Error in data load.');
  //     //   }
  //     // );


  //   // }

  //   private wtofParcel() {
  //     console.log('Calculating wt of sheets for Parcel Wt');
  //     // wt of 500 sheet

  //     // const wof500sh = (Number(this.quotation.plength) * Number(this.quotation.pbreadth) * Number(this.travelGsm)) / 3100;


  //     // console.log('prod length :' + this.quotation.plength);
  //     // console.log('prod breadth :' + this.quotation.pbreadth);
  //     // console.log('travel gsm :' + this.travelGsm);
  //     // console.log('wof500sh');
  //     // console.log(wof500sh);


  //     // const wof1sh = wof500sh / 500;          // weight of one sheet
  //     // console.log('wof1sh ' + wof1sh);

  //     // const totWt = wof1sh * this.qpaper.quantity;



  //     // console.log('Paper Quantity ' + this.quotation.paperqty);
  //     // console.log('Total weight ' + totWt);

  //     // this.qtransport.totalweight = Math.round(totWt);

  //     // if (this.quotation.type !== 'BOOKWORK' && this.quotation.type !== 'MULTIPLE_SHEET') {
  //     //   this.getwtofparcel();
  //     // }else{
  //     //   this.getTravelrate();
  //     // }
  //     // paper rate for 500
  //     // let PRfor500sh = wof500sh * this.prate;

  //   }

    pushDispatch() {

      this.packing.disentry.push(JSON.parse(JSON.stringify(this.disentry)));
      console.log('dispatch');
      console.log(this.disentry);
      //   this.holidaym.push(JSON.parse(JSON.stringify(this.holiday)));


    }


  //   //     pushPaper() {


  //   // if ((this.pdetails.packetno !== '')  && (this.pdetails.packedbyname !== '')
  //   //         && (this.pdetails.pktweight !== '')  ) {




  //   //      const cloneProduct = JSON.parse(JSON.stringify(this.pdetails));
  //   //      this.packing.pdetails.push(cloneProduct);
  //   //      console.log(this.packing.pdetails);
  //   //      this.pdetails.packetno = '';

  //   //      this.pdetails.packedbyname = '';
  //   //      this.pdetails.pktweight = '';

  //   //     }

  //   //     }

  //   // private getavialabel() {
  //   //   const strurl = 'prodcode=' + this.product.prodcode + '&quantity=' + this.product.totalqty;
  //   //   var url = this.restService.productstockRestURL('available', strurl);
  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       this.restService.getJSONFromURL(response);
  //   //       console.log(response);
  //   //       if (response.available === 'NO') {
  //   //         Swal.fire(
  //   //           'Not available in staock',
  //   //           '',
  //   //           'error'
  //   //         );
  //   //       }
  //   //       this.getrate();

  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }

  //   //   );
  //   // }

  //   // private getrate() {

  //   //   const str = 'prodcode=' + this.product.prodcode + '&ratelabel=' + this.ratelabel + '&quantity=' + this.product.totalqty;
  //   //   var url = this.restService.productstockRestURL('rate', str);
  //   //   this.restService.getJSONFromURL(url).subscribe(
  //   //     (response:any) => {
  //   //       this.restService.getJSONFromURL(response);
  //   //       //  this.data = response;
  //   //       this.product.amount = response.amount;
  //   //       console.log(response);
  //   //       // if(response.available==='NO'){
  //   //       //   Swal.fire(
  //   //       //     'Not available in staock',
  //   //       //   '',
  //   //       //     'error'
  //   //       //   );
  //   //       // }

  //   //     },
  //   //     error => {
  //   //       console.log('Error in data load.');
  //   //     }
  //   //   );
  //   // }



    submitData() {

       if (this.packing.disentry.length > 0) {

      this.packing.estdtime = this.packing.estdtime +':00';

      console.log('submiti function');
      var url = this.restService.dispatchRestURL('add', '');
      console.log(url);

      console.log('Quotation Json data for post:');
      console.log(this.packing);


      // this.restService.postFormData(url, this.packing).subscribe(
      //   (response:any) => {
      //     // Responce data.

      //     console.log('Status on Post API');
      //     console.log(response);
      //     // this.qid = response.id;
      //     // if (this.userrole == 'ADMIN') {
      //     //   this.customermail();
      //     //   //      this.approvemail()
      //     // } else {
      //     //   this.managermail();
      //     //   this.customermail();
      //     // }

      //     // Now do your stuff here
      //     Swal.fire('', '', 'success');
      //     window.scrollTo(0, 0);
      //    // this.route.navigate(['/managedispatch']);
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
      return 0;

      } else {
        Swal.fire(
          'Please, Add Dispatch First',
          '',
          'error'
        );
      }
    }
  //   private managermail() {
  //     const email = {
  //       role: { role: 'ADMIN' },
  //       to: '',
  //       cc: 'inouvellesolutions@gmail.com',
  //       templateId: 'custmail',
  //       contentData: {
  //         content: {
  //           // message: 'Dear Sir,\n \n' +
  //           //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //           //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //           message: 'Dear Sir, ' +
  //             'New quotation generated with id ' + this.qid + ' by ' +
  //             // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //             // this.leave.todate + ' with status Pending ',
  //             sessionStorage.getItem('name'),
  //         },
  //         table: [],
  //         //   costtable: [],
  //         subject: 'New Qutation Add'
  //       }
  //     };


  //     console.log('submiti function');
  //     console.log(email);
  //     const url = this.restService.MailRestURL('group', '');
  //     this.restService.postFormData(url, email).subscribe(
  //       (response:any) => {
  //         // Responce data.
  //         console.log('Status on Post API');
  //         console.log(response);
  //       },
  //       error => {
  //         // Error Message
  //         console.log('Failed to send email message to admin');
  //       }
  //     );
  //     return 0;
  //   }

  //   private customermail() {
  //     const email = {
  //       // role: { role: 'ADMIN' },
  //       to: sessionStorage.getItem('email'),
  //       cc: 'inouvellesolutions@gmail.com',
  //       templateId: 'custmail',
  //       contentData: {
  //         content: {
  //           // message: 'Dear Sir,\n \n' +
  //           //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //           //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //           message: 'Dear Sir,\n ' +
  //             'New quotation generated with id ' + this.qid + ' by ' +
  //             // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //             // this.leave.todate + ' with status Pending ',
  //             sessionStorage.getItem('name') + 'with thw customer quitation add',
  //         },
  //         table: [],
  //         //   costtable: [],
  //         subject: 'New Qutation Added by Customer'
  //       }
  //     };

  //     console.log('submiti function');
  //     console.log(email);
  //     const url = this.restService.MailRestURL('send', '');
  //     this.restService.postFormData(url, email).subscribe(
  //       (response:any) => {
  //         // Responce data.

  //         console.log('Status on Post API customer mail');
  //         console.log(response);
  //       },
  //       error => {
  //         // Error Message
  //         console.log('Failed to send email message to admin');
  //       }
  //     );
  //     return 0;
  //   }
  //   // private approvemail(data: any) {
  //   //   const id = data.id;
  //   //   alert('mail:' + id);
  //   //   alert(this.quotation.details)
  //   //   const email = {
  //   //     // role: { role: 'ADMIN' },
  //   //     to: sessionStorage.getItem('email'),
  //   //     cc: 'inouvellesolutions@gmail.com',
  //   //     templateId: 'qspecialclub',
  //   //     contentData: {
  //   //       content: {
  //   //         // message: 'Dear Sir,\n \n' +
  //   //         //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //   //         //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //   //         message: 'Dear Sir,\n ' +
  //   //           'Your Quotation Order confirm  with id ' + id + ' by ' +
  //   //           // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //   //           // this.leave.todate + ' with status Pending ',
  //   //           sessionStorage.getItem('name') + ' details are as follow',
  //   //       },
  //   //       table: this.quotation.details,
  //   //       //   costtable: [],
  //   //       subject: 'Quotation aaproved'
  //   //     }
  //   //   };

  //   //   console.log('submiti function');
  //   //   console.log(email);
  //   //   const url = this.restService.MailRestURL('send', '');
  //   //   this.restService.postFormData(url, email).subscribe(
  //   //     (response:any) => {
  //   //       // Responce data.

  //   //       console.log('Status on Post API customer mail');
  //   //       console.log(response);
  //   //     },
  //   //     error => {
  //   //       // Error Message
  //   //       console.log('Failed to send email message to admin');
  //   //     }
  //   //   );
  //   //   return 0;
  //   // }
  //   deleteRole(id: any) {

  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You will not be able to recover this data!',
  //       type: 'Warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, delete it!',
  //       cancelButtonText: 'No, keep it'
  //     }).then((result) => {
  //       if (result.value) {
  //         // delete code
  //         const url = this.restService.quotaionRestURL('delete', '');
  //         console.log('Delete using this id:' + id);
  //         const json = '{\"id\":\"' + id + '\"}';
  //         this.restService.postFormData(url, json).subscribe(
  //           (response:any) => {
  //             // Responce data.
  //             console.log('Status on Post API');
  //             console.log(response);
  //             Swal.fire(
  //               'Deleted!',
  //               'Your data has been deleted.',
  //               'success'
  //             )
  //           //  this.getData();
  //             // Now do your stuff here
  //           },
  //           error => {
  //             // Error Message
  //             Swal.fire(
  //               error.statusText,
  //               error._body,
  //               'error'
  //             );
  //             console.log('Error in data load.');
  //             // Doyour stuff here
  //           }
  //         );

  //         // delete code end
  //         // For more information about handling dismissals please visit
  //         // https://sweetalert2.github.io/#handling-dismissals
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         Swal.fire(
  //           'Cancelled',
  //           'Your data is safe :)',
  //           'error'
  //         );
  //       }
  //     })
  //   }



  //   private getretaillist() {

  //     for (let data of this.retllist) {
  //       console.log(data.name);
  //       if (Number(data.id) === Number(this.disentry1.retailorder)) {
  //     //   alert(data.retailer);
  //         console.log(data.retailer);
  //         console.log(data.retailername);
  //         this.disentry1.retailer = data.retailer;
  //         this.disentry1.retailername = data.retailername;

  //         if (data.qtransport.preftravel.parcelamt > 0) {
  //           console.log('Preftravel details found');
  //           console.log(data.qtransport.preftravel);
  //           this.disentry1.qtraveldetail.address.line1 = data.qtransport.preftravel.address.line1;
  //           this.disentry1.qtraveldetail.address.states = data.qtransport.preftravel.address.states;
  //           this.disentry1.qtraveldetail.address.city = data.qtransport.preftravel.address.city;
  //           this.disentry1.qtraveldetail.address.pincode = data.qtransport.preftravel.address.pincode;
  //           this.disentry1.qtraveldetail.city = data.qtransport.preftravel.city;
  //           this.disentry1.qtraveldetail.name = data.qtransport.preftravel.name;
  //           this.disentry1.qtraveldetail.parcelamt = data.qtransport.preftravel.parcelamt;

  //           this.disentry1.qtraveldetail.address.line2 = data.qtransport.temptravel.address.line2;

  //         }else{

  //           console.log('Temptravel details found');
  //           console.log(data.qtransport.temptravel);
  //                 this.disentry1.qtraveldetail.address.line1 = data.qtransport.temptravel.address.line1;
  //                 this.disentry1.qtraveldetail.address.line2 = data.qtransport.temptravel.address.line2;
  //                 this.disentry1.qtraveldetail.address.pincode = data.qtransport.temptravel.address.pincode;
  //                 this.disentry1.qtraveldetail.address.states = data.qtransport.temptravel.address.states;
  //                 this.disentry1.qtraveldetail.address.city = data.qtransport.temptravel.address.city;
  //                 this.disentry1.qtraveldetail.city = data.qtransport.temptravel.city;
  //                 this.disentry1.qtraveldetail.name = data.qtransport.temptravel.name;
  //                 this.disentry1.qtraveldetail.parcelamt = data.qtransport.temptravel.parcelamt;
  //         }

  //    //  alert(data.orderedon);
  //         this.disentry1.orderdate = data.orderedon;
  //         this.disentry1.dispatchno = this.packing.dispatchno;
  //         this.getByorderid(data.orderno);
  //       }
  //     }

  //   }



  //  cancel() {
  //     // goBack code fro cancel button
  //     window.history.back();
  //   }




  //   private getByorderid(id:any) {
  //     // Get Information from JSON REST api
  //     // http://localhost:8090/SuppChainManager/rest/packentry/orderno/RO-005
  //     let url = this.restService.packingRestURL('detailsbyRO', id);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         console.log('Done fatching data for packing details!');
  //         // this.packing.qtraveldetail = response.qtraveldetail;
  //         // this.packing= response;
  //         // console.log(this.packing.qtraveldetail );
  //         console.log(response);

  //             this.disentry1.totalpkts = response.totalpkts;
  //             this.disentry1.estdweight = response.estdweight;
  //             this.disentry1.actualweight = response.actualweight;
  //             this.disentry1.diffweight = response.diffweight;
  //             this.disentry1.packingincharge = response.packingincharge;
  //          //   alert(response.packingincharge);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  //   // get Porder No**********************************************************************************
  //   private getlastLotno() {
  //     // Get Information from JSON REST api
  //     // http://localhost:8090/SuppChainManager/rest/common/lastorderno?otype=PURCHASEORDER
  //     var url = this.restService.commonRestURL('lastorderno', 'DISPATCH');
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         console.log(response);
  //         this.generateNewLotNo(response.lastlotno);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  //   // purchase.porderno
  //   private generateNewLotNo(lastlotno: any) {
  //     //  alert('generating');
  //     console.log('generating new lot no from previous:' + lastlotno);
  //     if(lastlotno!==null){

  //     let strarry = lastlotno.split("-"); // 001
  //     let newnostr = '';
  //     const lot1 = strarry[1];

  //     // if (lot1 === '000') {
  //     //   newnostr = lastlotno;
  //     // }else{

  //     let lot2 = Number(strarry[1]);
  //     // alert(lot2);
  //     lot2 = lot2 + 1;

  //     if (lot2 > 0 && lot2 < 10) { // alert('1');
  //       newnostr = strarry[0] + "-00" + lot2;
  //       console.log(newnostr);

  //     }
  //     else if (lot2 >= 10 && lot2 <= 99) {
  //       // alert('2');
  //       newnostr = strarry[0] + "-0" + lot2;
  //       console.log(newnostr);
  //     } else {
  //       newnostr = strarry[0] + "-" + lot2;
  //     }


  //     // }
  //     //  alert(newnostr);
  //     this.packing.dispatchno = newnostr;
  //   }else{

  //     console.log('last lot no found null');
  //     this.packing.dispatchno ='RO-001' ;
  //   }

  //   }
  // // end last lot no************************************************************

  public getdisptacheno() {
    // http://localhost:8090/SmartSupplyManager/rest/packentry/newpkgno?firm=1
    const url = this.restService.dispatchRestURL('newdispatchno', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.dispatchno = response.generatednum;
        this.packing.dispatchno = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getPacking() {
    //// this.isLoader = true;
    // Get Information from JSON REST api
    var url = this.restService.packingRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.isLoader = false;
        this.restService.getJSONFromURL(response);
        this.packingList = response;
        console.log(response);
      },
      error => {
        //   this.isLoader = false;
        console.log('Error in data load.');
      }
    );
  }

  private pushtoDispatch(data: any, id: any) {
    // Get Information from JSON REST api
    this.getcustByid(data.customer);

    console.log('Creating Dispatch Entry JSON Object');
    // console.log(data);
    this.disentry.dispatchedon = this.packing.dispatchedon;
alert(this.disentry.dispatchedon);
    this.disentry.customer = data.customer;
    this.disentry.custname = data.custname;
    this.disentry.quotesale = data.quotesale;
    this.disentry.quotesale = data.quotesale;


    this.disentry.quotesale = data.quotesale;


    // this.disentry.dispatchedon = this.packing.dispatchno;

    this.disentry.orderdate = this.restService.unixTimeConverterDate(data.orderdate);

    // this.disentry.qtraveldetail: {                                 // preftravel
    //   name: '',
    //   address: {
    //     line1: '',
    //     line2: '',
    //     city: '',
    //     states: '',
    //     pincode: '',
    //     country: 'India'
    //   },
    //   city: '',
    //   parcelamt: 0
    // },


    this.disentry.invoicenum = data.invoicenum;
    this.disentry.packing = data.id;
    this.disentry.customer = data.customer;
    this.disentry.custname = data.custname;

    this.disentry.status = 'DISPATCHED';
    this.disentry.paystatus = 'RELEASE';
    this.disentry.totalpkts = data.totalpkts;
    // this.disentry.estdweight: '',
    // this.disentry.actualweight: '',
    // this.disentry.diffweight: '',
    this.disentry.packedbyname = data.packedbyname;
    this.disentry.packedon = this.restService.unixTimeConverterDate(data.packedon);
    // this.disentry.deliveryincharge = this.packing.d
    // this.disentry.dispatchedon: '',
    // this.disentry.dispatch_scheduledon: '',
    // this.disentry.dispatch_scheduledate: '',
    console.log(this.disentry);



  }


  private getcustByid(id: any) {
    // Get Information from JSON REST api quteRestURL
    //  var url = this.restService.reteailorderRestURL('details', id);
    var url = this.restService.customerRestURL('details', id);
    //   alert(url);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.custData = response;
        console.log('Customer by id :');
        console.log(response);

        this.disentry.qtraveldetail.name = this.custData.name;
        this.disentry.qtraveldetail.address = this.custData.address;



        //  {                                 // preftravel
        //     name: '',
        //     address: {
        //       line1: '',
        //       line2: '',
        //       city: '',
        //       states: '',
        //       pincode: '',
        //       country: 'India'
        //     },
        //     city: '',
        //     parcelamt: 0
        //   },

      },
      error => {
        console.log('Error product in data load.');
      }
    );
  }



  private getFirmbyID() {
    // Get Information from JSON REST api
    let url = this.restService.firmRestURL('details', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        this.firmData = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  // print(): void {
  //   let printContents;
  //   let popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=600px,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Print tab</title>
  //         <style>
  //         //........Customized style.......

  //         </style>
  //         <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
  //       </head>
  //   <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();

  //   // window.print();


  //   // var printContents = document.getElementById('print-section').innerHTML;
  //   // var originalContents = document.body.innerHTML;
  //   // document.body.innerHTML = printContents;

  //   // window.print();

  //   // document.body.innerHTML = originalContents;

  // }


  private getEmpList() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('employee', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

}
