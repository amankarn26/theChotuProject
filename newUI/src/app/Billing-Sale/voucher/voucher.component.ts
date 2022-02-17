import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from '../../services/rest.service';
//import { Cookie } from 'ng2-cookies';
declare var Swal: any;
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

//  private alertify = require('alertify.js');
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

  private isUpdate = false;
  // public url;
  private file;
  private fileName;
  public docServer = this.restService.docServer;
  public cleanup = false;
  public uploadFlag = false;
  private fileArray = [];
  private docArray = [];
  public delList = [];
  private voucherDetails = [];

  public comment;

  public vouchernumber;
  public accountlist;
  // pnkj start:

  // transport json for transport details
  private qtransport = {
    deliverydays: '',
    deliverytime: '',
    delvalidtime: '',
    totalweight: 0,
    numbundles: 0,
    preftravel: {
      name: '',
      city: '',
      // totalweight: 0,
      // numbundles: 0,
      parcelamt: 0
    },
    temptravel: {
      name: '',
      city: '',
      // totalweight: 0,
      // numbundles: 0,
      parcelamt: 0
    }
  };


  private photo = {
    id: '',
    photo: { docname: '', docpath: '', docdesc: '', doctype: '' },
  };
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

  // qdetail cost calculation for multiple products
  // private qdetail = {
  //   Paper: 0.0,
  //   Printing: 0.0,
  //   Lamination: 0.0,
  //   PostPress: 0.0,
  //   Cutting: 0.0
  // };


  // For dynomic JSON element
  public dyelem = {
    name: '',
    value: ''
  };
  public dyElemObjData = [];
  private dynamo;
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
  //   // totalproducts:'1',

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


  private packing = {
    //  dispatchno: '',              // to be generated when adding entry.
    retailorder: '',               //retailorder id (dropdown)
    retailer: '',                 //retailer id
    retailername: '',       //retailer name
    orderdate: '',          //date
    status: 'NOT_DISPATCHED',                //enum type -> UNPACKED/PACKED/PACKING_REMOVED
    paystatus: 'STOP',            //enum type -> STOP, RELEASE
    qtransport: {
      deliverydays: 1,
      deliverytime: '',      //Timestamp
      delvalidtime: '',      //Timestamp
      totalweight: '',
      numbundles: '',
      preftravel: {
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
        parcelamt: 100
      },
      temptravel: {
        name: '',
        city: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          states: '',
          pincode: '',
          country: "India"
        },
        parcelamt: '1'
      }
    },

    totalpkts: 1,
    estdweight: '',
    actualweight: '',
    diffweight: '',
    packingincharge: '',           //employee id
    deliveryincharge: '',          //employee id
    // pdetails: []
  };

  private pdetails = {
    packetno: '',
    packedby: '',
    packedbyname: '',
    pktweight: ''
  };

  // voucher json data******************************************************
  private voucher = {
    firm:sessionStorage.getItem('firm'),
    vno: '',
    vdate: new Date(),
    invoicenum: '',
    debitacct: '',
    creditacct: '',
    amount: 0,
    narration: '',
    authby: sessionStorage.getItem('id'),
    prepby: sessionStorage.getItem('id'),
    details: '',
    head:''
  };




  // voucher json data******************************************************

  private dispatchArary = [];



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
  public sortBy = 'vno';
  public sortOrder = 'asc';
  public data;
  public url;

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

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }

    if (this.routprms.snapshot.params['supp']) {
      this.voucher.creditacct = this.routprms.snapshot.params['supp'];

    }

    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addvoucher/' + this.id + '/' + encodeURIComponent(this.routprms.snapshot.params['supp'])) {
      this.title = 'Add Voucher';
      this.subtitle = 'Fill voucher Entry';
      this.isManageState = false;
      //  this.getretailer();
      this.getlastLotno();

      // this.getemp();
      // this.getproduct();
      //  this.getStateList();
      // this.getEmpList1();
      // this.getVenderList();
      // this.getretaileorder();
      // this.getretailer();
    } else if (this.route.url === '/addvoucher') {
      this.title = 'Add Voucher';
      this.subtitle = 'Fill voucher Entry';
      this.isManageState = false;
      //  this.getretailer();
      this.voucher.narration ='This voucher is added by'+ ' '+ sessionStorage.getItem('name');
      this.getnewinvoiceno();
      this.getvoucherno();
      this.getemp();
      this.getEmpList1();
      this.getallaccount();

    } else if (this.route.url === '/editpacking/' + this.id) {
      this.title = 'Update Packing';
      // this.subtitle = 'QutationClone Id '+ this.id;
      this.isUpdate = true;
      this.isManageState = false;
      this.getStateList();
      this.getEmpList1();
      this.getproduct();

    }

    else if (this.route.url === '/detailvoucher/' + this.id) {
      this.title = 'Voucher Detail';
      // this.subtitle = 'Quotation ID: '+ this.id;
      // this.flag = true;
      // this.isUpdate = true;
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid(this.id);
      this.getVouchers(this.id);

    }
    else {
      this.title = 'Manage Voucher';
      this.subtitle = 'Manage voucher information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
      // this.data = [{ "id": 22972, "dispatchno": 22973, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1550601000000, "qtransport": { "id": 22969, "deliverydays": 12, "deliverytime": 1550016000000, "delvalidtime": 1551139200000, "totalweight": 120.0, "numbundles": 5, "preftravel": { "id": 22968, "name": "", "city": "", "address": { "id": 22967, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 22970, "name": "rupesh", "city": "", "address": { "id": 22971, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 1200.0 } }, "status": "NOT_DISPATCHED", "paystatus": "STOP", "totalpkts": 1, "estdweight": 25.0, "actualweight": 120.0, "diffweight": 25.0, "packingincharge": 19654, "packedon": 1550833730758, "deliveryincharge": 22595, "deliverytime": 1550833730758 }, { "id": 22979, "dispatchno": 22980, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1549477800000, "qtransport": { "id": 22976, "deliverydays": 1, "deliverytime": 1550793600000, "delvalidtime": 1550793600000, "totalweight": 125.0, "preftravel": { "id": 22975, "name": "", "city": "", "address": { "id": 22974, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 22977, "name": "rupesh", "city": "", "address": { "id": 22978, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 150.0 } }, "status": "NOT_DISPATCHED", "paystatus": "STOP", "totalpkts": 1, "estdweight": 125.0, "actualweight": 150.0, "diffweight": 25.0, "packingincharge": 22595, "packedon": 1550835040451, "deliveryincharge": 22595, "deliverytime": 1550835040451 }, { "id": 22991, "dispatchno": 22992, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1550773800000, "qtransport": { "id": 22983, "deliverydays": 1, "deliverytime": 1550793600000, "delvalidtime": 1551052800000, "totalweight": 125.0, "numbundles": 125, "preftravel": { "id": 22982, "name": "", "city": "", "address": { "id": 22981, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 22984, "name": "rupesh", "city": "", "address": { "id": 22985, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 125.0 } }, "status": "NOT_DISPATCHED", "paystatus": "STOP", "totalpkts": 1, "estdweight": 150.0, "actualweight": 250.0, "diffweight": 100.0, "packingincharge": 22595, "packedon": 1550836304311, "deliveryincharge": 22595, "deliverytime": 1550836304311 }, { "id": 22993, "dispatchno": 22994, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1550773800000, "qtransport": { "id": 22988, "deliverydays": 1, "deliverytime": 1550793600000, "delvalidtime": 1551052800000, "totalweight": 125.0, "numbundles": 125, "preftravel": { "id": 22987, "name": "", "city": "", "address": { "id": 22986, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 22989, "name": "rupesh", "city": "", "address": { "id": 22990, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 125.0 } }, "status": "NOT_DISPATCHED", "paystatus": "STOP", "totalpkts": 1, "estdweight": 150.0, "actualweight": 250.0, "diffweight": 100.0, "packingincharge": 22595, "packedon": 1550836304314, "deliveryincharge": 22595, "deliverytime": 1550836304314 }, { "id": 23000, "dispatchno": 23001, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1550601000000, "qtransport": { "id": 22997, "deliverydays": 1, "deliverytime": 1550880000000, "delvalidtime": 1550880000000, "totalweight": 120.0, "numbundles": 10, "preftravel": { "id": 22996, "name": "", "city": "", "address": { "id": 22995, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 22998, "name": "rupesh", "city": "", "address": { "id": 22999, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 120.0 } }, "status": "NOT_DISPATCHED", "paystatus": "STOP", "totalpkts": 1, "estdweight": 120.0, "actualweight": 150.0, "diffweight": 30.0, "packingincharge": 22595, "packedon": 1550898534872, "deliveryincharge": 22595, "deliverytime": 1550898534872 }, { "id": 23007, "dispatchno": 23008, "retailorder": 22956, "retailer": 19287, "retailername": "rahul", "orderdate": 1550601000000, "qtransport": { "id": 23004, "deliverydays": 1, "deliverytime": 1550880000000, "delvalidtime": 1550880000000, "totalweight": 120.0, "numbundles": 10, "preftravel": { "id": 23003, "name": "", "city": "", "address": { "id": 23002, "line1": "", "line2": "", "city": "", "pincode": "", "states": "", "country": "India" }, "parcelamt": 100.0 }, "temptravel": { "id": 23005, "name": "rupesh", "city": "", "address": { "id": 23006, "line1": "", "line2": "", "city": "", "pincode": "", "states": "Maharashtra", "country": "India" }, "parcelamt": 120.0 } }, "status": "NOT_DISPATCHED", "paystatus": "RELEASE", "totalpkts": 1, "estdweight": 120.0, "actualweight": 150.0, "diffweight": 30.0, "packingincharge": 22595, "packedon": 1550898572730, "deliveryincharge": 22595, "deliverytime": 1550898572730 }];

    }


  }


  // Start: dynamic data
  onAddDyelem() {
    //   this.quotation.data.push(this.dyelem);
    if (this.dyelem.name !== '' && this.dyelem.value !== '') {
      this.dyElemObjData.push({
        'name': this.dyelem.name,
        'value': this.dyelem.value
      });

      this.dyelem.name = '';
      this.dyelem.value = '';
    } else {
      alert('Information not complited yet');
    }
  }

  onDeleteDyelem(i) {
    this.dyElemObjData.splice(i, 1);
    Swal.fire('Deleted!', '', 'success');
  }
  // end: dynamic data


  // Start: get data**************************************************************
  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.vouherRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);


        // let startdt;


        // let mdata=[];

        //         for (let data of this.data) {
        //           // if (data.id) {
        //           // }
        //              startdt = data.deliverytime;

        //               const json = {
        //                 deliverytime: startdt
        //               };

        //               let array=[];

        //               for (let datab of this.data) {
        //                   if(datab.deliverytime === startdt ){
        //                     array.push(datab);
        //                     this.data.splice(i, 1);
        //                   }

        //               }

        //         }


        // deliverytime


      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getprodData(id: any) {
  //   // Get Information from JSON REST api
  //   var url = this.restService.quotaionRestURL('proddetails', id);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       this.quotation.details = response;
  //       //   console.log(response);
  //       for (const entry of response) {
  //         delete entry['id'];
  //       }
  //     },
  //     error => {
  //       console.log('Error product in data load.');
  //     }
  //   );
  // }

  //  updateData() {
  //    console.log('submiti function');
  //    var url = this.restService.quotaionRestURL('edit', '');
  //    console.log(url);
  //    this.restService.postFormData(url, this.vendor).subscribe(
  //     ( response : any) => {
  //        // Responce data.
  //        console.log('Status on Post API');
  //        console.log(response);
  //        // Now do your stuff here
  //        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
  //        Swal.fire('', '', 'success');
  //        window.scrollTo(0, 0);
  //        this.route.navigate(['/managepacking']);
  //      },
  //      error => {
  //        // Error Message
  //        Swal.fire(
  //          error.statusText,
  //          error._body,
  //          'error'
  //        );
  //        console.log('Error in data load.');
  //        // Doyour stuff here
  //      }
  //    );
  //    return 0;
  //  }


  private getByid(id: any) {
    // Get Information from JSON REST api
    let url = this.restService.vouherRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        console.log('Done fatching data!');
        this.dispatchData = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getVouchers(id: any) {
    // Get Information from JSON REST api
    let url = this.restService.vouherRestURL('vouchers', id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        console.log('Done fatching data!');
        this.voucherDetails = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getEmpList() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        // this.data = response;
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getRetailById(id: any) {

  //   // Get Information from JSON REST api
  //   const url = this.restService.RetailerRestURL('details', id);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log('Getting retailer by id');
  //       console.log(response);
  //       //  this.retailerEmail = response.login.email;

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );

  // }

  private getStateList() {
    // Get Information from JSON REST api
    var url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  //  private getState() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.PincodeRestURL('',this.vendor.address.pincode);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       // this.restService.getJSONFromURL(response);
  //       this.statelist = response;
  //       this.quotation.custstate=response.state_name;
  //       this.quotation.custcity=response.city_name;


  //       console.log('State data available');
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  // private getCatList() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.catRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       // this.restService.getJSONFromURL(response);
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
  private onChangeState1(obj) {
    const stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList1(stateId);
  }
  private onChangeState2(obj) {
    const stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList2(stateId);
  }

  private getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    var url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getCityList1(stateId) {
    this.citylist1 = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.citylist1 = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  private getCityList2(stateId) {
    this.citylist2 = [];
    // Get Information from JSON REST api
    const url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.citylist2 = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }



  // private getClienList() {

  //   // Get Information from JSON REST api
  //   const url = this.restService.RetailerRestURL('city', this.quotation.custcity);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log(response);
  //       this.clientdata = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private getEmpList1() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        // this.data = response;
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private onChangeCustomer(obj) {
  //   const stateId = obj.srcElement.value;
  //   this.getRetailById(stateId);
  //   console.log(obj);
  //   // Call city data method
  //   console.log('onChangeCustomer');
  //   console.log(obj.target.value);
  //   console.log(obj.target.options[obj.target.selectedIndex].text);
  //   this.quotation.retailername = obj.target.options[obj.target.selectedIndex].text;
  // }

  // private onChangeHandler1(obj) {
  //   const stateId = obj.srcElement.value;
  //   // console.log(obj);
  //   // Call city data method
  //   console.log('primhandre...');
  //   console.log(obj.target.value);
  //   console.log(obj.target.options[obj.target.selectedIndex].text);
  //   this.quotation.primhandlername = obj.target.options[obj.target.selectedIndex].text;
  // }
  // private onChangeHandler2(obj) {
  //   const stateId = obj.srcElement.value;
  //   // console.log(obj);
  //   // Call city data method
  //   console.log('sechandler...');
  //   console.log(obj.target.value);
  //   console.log(obj.target.options[obj.target.selectedIndex].text);
  //   this.quotation.sechandlername = obj.target.options[obj.target.selectedIndex].text;
  // }


  private getemp() {
    this.emplList = [];
    // Get Information from JSON REST apiz
    var url = this.restService.empRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.emplList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getproduct() {
    this.prodlList = [];
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.prodlList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getproductpercentage() {
  //   //this.prodpercentList = [];
  //   // Get Information from JSON REST api
  //   var url = this.restService.productlabelRestURL('percentage', this.product.prodcode);

  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       // this.prodpercentList = response;
  //       // [{"id":21763,"product":19666,"prodcode":"p4","ratelabel":"rate2","ratelabelperc":54.0}]
  //       this.product.ratelabelperc = response.ratelabelperc;
  //       this.ratelabel = response.ratelabel;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  public unixTimeConverterDate(ts) {
    let datetime = '';
    const dattime1 = '';
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';



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




  // private getproductgst() {
  //   // alert('alor re bhau..');
  //   // alert(this.quotation.product);
  //   console.log('Product changed');

  //   // this.subdept.depname =
  //   // obj.target.options[obj.target.selectedIndex].text;
  //   for (let data of this.prodlList) {

  //     console.log(data.name);
  //     if (Number(data.id) === Number(this.product.product)) {

  //       this.product.prodcode = data.prodcode;
  //       this.product.rateperunit = data.rateperunit;
  //       this.product.rateunit = data.rateunit;
  //       this.product.pname = data.name;

  //       this.getproductpercentage();
  //       // this.product.ratelabelperc=data.ratelabelperc;

  //     }




  //   }


  // }
  // onDeleteproduct(i) {



  //   console.log('Deleting*********************');




  //   this.quotation.details.splice(i, 1);

  //   // this.alertify.alert('Item Deleted successfully.');
  //   Swal.fire(
  //     'Deleted!',
  //     '',
  //     'success'
  //   );
  //   // console.log(this.dyElemObjData);
  // }

  onDeleteDispatch(i) {
    console.log('Deleting*********************');
    this.dispatchArary.splice(i, 1);
    Swal.fire(
      'Deleted!',
      '',
      'success'
    );
    // console.log(this.dyElemObjData);
  }


  // private getvendor() {
  //   // alert('alor re bhau..');
  //   // alert(this.quotation.product);
  //   console.log('vender changed');
  //   for (let data of this.transvendList) {

  //     console.log(data.name);
  //     if (data.name === this.quotation.qtransport.temptravel.name) {

  //       this.quotation.qtransport.temptravel.name = data.name;
  //       this.quotation.qtransport.temptravel.address.states = data.address.states;
  //       this.getCityList2(this.quotation.qtransport.temptravel.address.states);
  //       this.quotation.qtransport.temptravel.address.city = data.address.city;
  //       this.quotation.qtransport.temptravel.address.line1 = data.address.line1;
  //       this.quotation.qtransport.temptravel.address.line2 = data.address.line2;
  //       this.quotation.qtransport.temptravel.address.pincode = data.address.pincode;
  //       //  this.quotation.qtransport.temptravel.city=data.city;
  //       //  this.quotation.qtransport.temptravel.parcelamt=data.p


  //       // this.quotation.qtransport.temptravel.address.states = data.address.states;


  //     }

  //   }

  // }

  // private getptravelvendor(id: any) {

  //   //this.prodpercentList = [];
  //   // Get Information from JSON REST api
  //   var url = this.restService.level2detailRestURL('prefred', this.quotation.retailer);

  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       // this.pref = response;
  //       // for(let data of this.pref){
  //       //   // console.log("in preferrd travel");
  //       //   // this.qtransport.preftravel.name=data.name;
  //       //   // console.log('in name');
  //       //   // this.quotation.custcity=response.city;
  //       // }
  //       console.log("in preferrd travel");
  //       // this.qtransport.preftravel.name=response.name;

  //       this.quotation.qtransport.preftravel.name = response[0].vendor;

  //       this.quotation.qtransport.preftravel.address.states = this.quotation.custstate;

  //       this.quotation.qtransport.preftravel.city = this.quotation.custcity;





  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );




  // }



  private getwtofparcel() {
    console.log('Get wt of parcel');

    // (this.quotation.paperqty > 0) &&  this.paper[0].size
    // if (this.quotation.type !== 'CLUBBING_JOB') {
    //   if ((this.quotation.psize !== '')) {
    //     // Get Information from JSON REST api

    //   //  console.log('getting print run');
    //     console.log('this.quotation.paperqty : ' + this.quotation.paperqty);

    //     let urlString =
    //       'weight?size=' +
    //       this.quotation.psize +
    //       //   this.quotation.paperqty +
    //       '&gsm=' +
    //       this.travelGsm +
    //       '&qty=' +
    //       this.quotation.prodqty +  // updated on 11-14-2018
    //       '&namune=' +
    //       this.namune;

    //     //  rate/paper/weight?size=18X23&gsm=150&qty=1000      quotation.prodqty

    //     const url = this.restService.papersizeRestURL('wt', urlString);
    //     this.restService.getJSONFromURL(url).subscribe(
    //      ( response : any) => {
    //         this.restService.getJSONFromURL(response);
    //         console.log('wt of parcel');
    //         console.log(response);


    //         if (this.quotation.type !== 'BOOKWORK' && this.quotation.type !== 'MULTIPLE_SHEET') {
    //           this.qtransport.totalweight = response;
    //           this.getTravelrate();
    //         } else {
    //           this.totalBookwt += response;
    //           console.log('wt of parcel for subproduct : ' + this.totalBookwt);
    //           this.qtransport.totalweight += response;
    //           console.log('wt of parcel for transport : ' + this.qtransport.totalweight);
    //         }
    //         // this.printrunData = response.plist;

    //      //    this.quotation.paperqty = response.paperqty;  updated on 11/19/2018

    //         // this.qpaper.sheetcnt = response.sheetcnt;
    //         // this.qprint.impressions = response.impresssions;
    //      //   this.getTravelrate();
    //       },
    //       error => {
    //         console.log('Error in data load.');
    //       }
    //     );
    //   }
    // } else {

    let clbsize;


    // if (this.route.url === '/generatequotation/' + encodeURIComponent(this.id)
    //       ) {
    //         clbsize = this.quotation.psize;
    //         this.travelGsm = Number(this.qpaper.gsm);
    //       }else{
    //         clbsize = this.paper[0].size;
    //       }

    //     if ((clbsize !== '' && this.quotation.prodqty > 0)) {
    //       // Get Information from JSON REST api

    //       console.log('getting print run');
    //       console.log('this.quotation.prodqty : ' + this.quotation.prodqty);

    //       let urlString =
    //         'weight?size=' +
    //         clbsize +
    //         //   this.quotation.paperqty +
    //         '&gsm=' +
    //         this.travelGsm +
    //         '&qty=' +
    //         this.quotation.prodqty +
    //         '&namune=' +
    //         this.namune;


    //         console.log(urlString);

    //       //  rate/paper/weight?size=18X23&gsm=150&qty=1000

    //       const url = this.restService.papersizeRestURL('wt', urlString);
    //       this.restService.getJSONFromURL(url).subscribe(
    //        ( response : any) => {
    //           this.restService.getJSONFromURL(response);
    //           console.log('wt of parcel');
    //           console.log(response);

    //           this.qtransport.totalweight = response;
    //           // this.printrunData = response.plist;

    //           // this.quotation.paperqty = response.paperqty;

    //           // this.qpaper.sheetcnt = response.sheetcnt;
    //           // this.qprint.impressions = response.impresssions;
    //           this.getTravelrate();
    //         },
    //         error => {
    //           console.log('Error in data load.');
    //         }
    //       );
    //     }
    //   }
  }


  private getTravelrate() {
    console.log('Getting travel rate');

    // remove it when travel rate api working : start
    // if (
    //   this.qtransport.preftravel.parcelamt >
    //   this.qtransport.temptravel.parcelamt
    // ) {
    //   this.qcost.parcel = this.qtransport.preftravel.parcelamt;
    // } else {
    //   this.qcost.parcel = this.qtransport.temptravel.parcelamt;
    // }

    // console.log('Parcel amount :' + this.qcost.parcel);
    // this.qcost.subtotal =
    //   Number(this.qcost.ordercost) + Number(this.qcost.parcel);
    // remove it when travel rate api working : end
    console.log('ingettravel');
    let strurl;
    if (this.travelType === 'Preffered') {
      strurl = 'travel?vendor=' + this.qtransport.preftravel.name +
        '&dest=' + this.qtransport.preftravel.city +
        '&weight=' + this.qtransport.totalweight;
    } else {
      strurl = 'travel?vendor=' + this.qtransport.temptravel.name +
        '&dest=' + this.qtransport.temptravel.city +
        '&weight=' + this.qtransport.totalweight;
    }

    // const url = this.restService.travelrateRestURL('rate', strurl);
    // this.restService.getJSONFromURL(url).subscribe(
    //   ( response : any) => {
    //     this.restService.getJSONFromURL(response);
    //     // this.datalist = response;
    //     // this.data=response;
    //     console.log(response);
    //     this.qtransport.numbundles = response.numbundles;

    //     if (this.travelType === 'Preffered') {

    //       if (this.qtransport.temptravel.parcelamt > 0) {
    //       //  this.qcost.ordercost -= this.qtransport.temptravel.parcelamt; // removed on 12/1/2018
    //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
    //         this.qtransport.temptravel.parcelamt = 0;
    //         // this.qcost.parcel = 0;

    //       }
    //       this.qtransport.preftravel.parcelamt = response.amount;

    //     } else {
    //       if (this.qtransport.preftravel.parcelamt > 0) {
    //        // this.qcost.ordercost -= this.qtransport.preftravel.parcelamt; // removed on 12/1/2018
    //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
    //         this.qtransport.preftravel.parcelamt = 0;
    //         // this.qcost.parcel = 0;
    //       }
    //       this.qtransport.temptravel.parcelamt = response.amount;
    //       this.qcost.parcel = response.amount; // added on 12/1/2018
    //     }

    //     this.qcost.parcel = response.amount;
    //     this.qcost.subtotal = Number(this.qcost.ordercost) + Number(this.qcost.parcel);


    //     // this.qcost.ordercost -= this.plate_amount;
    //     //this.qcost.subtotal -= this.plate_amount;
    //     // this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
    //     this.qcost.subtotal = Math.round(this.qcost.subtotal * 100) / 100;



    //     //this.profitlosscount(); // calling profit or loss  Added on 11/14/2018
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );


  }

  private wtofParcel() {
    console.log('Calculating wt of sheets for Parcel Wt');
    // wt of 500 sheet

    // const wof500sh = (Number(this.quotation.plength) * Number(this.quotation.pbreadth) * Number(this.travelGsm)) / 3100;


    // console.log('prod length :' + this.quotation.plength);
    // console.log('prod breadth :' + this.quotation.pbreadth);
    // console.log('travel gsm :' + this.travelGsm);
    // console.log('wof500sh');
    // console.log(wof500sh);


    // const wof1sh = wof500sh / 500;          // weight of one sheet
    // console.log('wof1sh ' + wof1sh);

    // const totWt = wof1sh * this.qpaper.quantity;



    // console.log('Paper Quantity ' + this.quotation.paperqty);
    // console.log('Total weight ' + totWt);

    // this.qtransport.totalweight = Math.round(totWt);

    // if (this.quotation.type !== 'BOOKWORK' && this.quotation.type !== 'MULTIPLE_SHEET') {
    //   this.getwtofparcel();
    // }else{
    //   this.getTravelrate();
    // }
    // paper rate for 500
    // let PRfor500sh = wof500sh * this.prate;

  }

  pushDispatch() {

    this.dispatchArary.push(JSON.parse(JSON.stringify(this.packing)));
    console.log('dispatch');
    console.log(this.dispatchArary);
    //   this.holidaym.push(JSON.parse(JSON.stringify(this.holiday)));


  }
  // pushVoucher() {

  //   // this.voucher.vdetail = this.docArray;
  //   // if (this.file) {
  //   //   this.uploadfile();
  //   // }


  //   //  this.voucher.vdetail = this.vdetail;

  //   this.dispatchArary.push(JSON.parse(JSON.stringify(this.voucher)));
  //   console.log('dispatch');
  //   console.log(this.dispatchArary);
  // }

  //     pushPaper() {


  // if ((this.pdetails.packetno !== '')  && (this.pdetails.packedbyname !== '')
  //         && (this.pdetails.pktweight !== '')  ) {




  //      const cloneProduct = JSON.parse(JSON.stringify(this.pdetails));
  //      this.packing.pdetails.push(cloneProduct);
  //      console.log(this.packing.pdetails);
  //      this.pdetails.packetno = '';

  //      this.pdetails.packedbyname = '';
  //      this.pdetails.pktweight = '';

  //     }

  //     }

  // private getavialabel() {
  //   const strurl = 'prodcode=' + this.product.prodcode + '&quantity=' + this.product.totalqty;
  //   var url = this.restService.productstockRestURL('available', strurl);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       this.restService.getJSONFromURL(response);
  //       console.log(response);
  //       if (response.available === 'NO') {
  //         Swal.fire(
  //           'Not available in staock',
  //           '',
  //           'error'
  //         );
  //       }
  //       this.getrate();

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }

  //   );
  // }

  // private getrate() {

  //   const str = 'prodcode=' + this.product.prodcode + '&ratelabel=' + this.ratelabel + '&quantity=' + this.product.totalqty;
  //   var url = this.restService.productstockRestURL('rate', str);
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response : any) => {
  //       this.restService.getJSONFromURL(response);
  //       //  this.data = response;
  //       this.product.amount = response.amount;
  //       console.log(response);
  //       // if(response.available==='NO'){
  //       //   Swal.fire(
  //       //     'Not available in staock',
  //       //   '',
  //       //     'error'
  //       //   );
  //       // }

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  submitData() {

this.voucher.details='voucher added by'+' '+ sessionStorage.getItem('name') +' '+this.voucher.amount;
this.voucher.narration ='This voucher is added by'+' '+ sessionStorage.getItem('name');

         console.log('submiti function');
         var url = this.restService.vouherRestURL('addvoucher', '');
         console.log(url);

         console.log('Quotation Json data for post:');
         console.log(this.dispatchArary);
         this.restService.postFormData(url, this.voucher).subscribe(
          ( response : any) => {
             // Responce data.

             console.log('Status on Post API');
             console.log(response);
             this.qid = response.id;
             if (this.userrole == 'ADMIN') {
               this.customermail();
               //      this.approvemail()
             } else {
               this.managermail();
               this.customermail();
             }


             // Now do your stuff here
             Swal.fire('', '', 'success');

             this.route.navigate(['/managevoucher']);
             window.scrollTo(0, 0);
             //  this.route.navigate(['/managequotation']);
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

       // } else {
       //   Swal.fire(
       //     'Please, Add Voucher First',
       //     '',
       //     'error'
       //   );
       // }
     }





  private managermail() {
    const email = {
      role: { role: 'ADMIN' },
      to: '',
      cc: 'amankarn26@gmail.com',
      templateId: 'custmail',
      contentData: {
        content: {
          // message: 'Dear Sir,\n \n' +
          //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
          //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
          message: 'Dear Sir, ' +
            'New quotation generated with id ' + this.qid + ' by ' +
            // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
            // this.leave.todate + ' with status Pending ',
            sessionStorage.getItem('name'),
        },
        table: [],
        //   costtable: [],
        subject: 'New Qutation Add'
      }
    };


    console.log('submiti function');
    console.log(email);
    const url = this.restService.MailRestURL('group', '');
    this.restService.postFormData(url, email).subscribe(
     ( response : any) => {
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

  private customermail() {
    const email = {
      // role: { role: 'ADMIN' },
      to: sessionStorage.getItem('email'),
      cc: 'amankarn26@gmail.com',
      templateId: 'custmail',
      contentData: {
        content: {
          // message: 'Dear Sir,\n \n' +
          //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
          //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
          message: 'Dear Sir,\n ' +
            'New quotation generated with id ' + this.qid + ' by ' +
            // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
            // this.leave.todate + ' with status Pending ',
            sessionStorage.getItem('name') + 'with thw customer quitation add',
        },
        table: [],
        //   costtable: [],
        subject: 'New Qutation Added by Customer'
      }
    };

    console.log('submiti function');
    console.log(email);
    const url = this.restService.MailRestURL('send', '');
    this.restService.postFormData(url, email).subscribe(
     ( response : any) => {
        // Responce data.

        console.log('Status on Post API customer mail');
        console.log(response);
      },
      error => {
        // Error Message
        console.log('Failed to send email message to admin');
      }
    );
    return 0;
  }
  // private approvemail(data: any) {
  //   const id = data.id;
  //   alert('mail:' + id);
  //   alert(this.quotation.details)
  //   const email = {
  //     // role: { role: 'ADMIN' },
  //     to: sessionStorage.getItem('email'),
  //     cc: 'inouvellesolutions@gmail.com',
  //     templateId: 'qspecialclub',
  //     contentData: {
  //       content: {
  //         // message: 'Dear Sir,\n \n' +
  //         //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //         //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //         message: 'Dear Sir,\n ' +
  //           'Your Quotation Order confirm  with id ' + id + ' by ' +
  //           // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //           // this.leave.todate + ' with status Pending ',
  //           sessionStorage.getItem('name') + ' details are as follow',
  //       },
  //       table: this.quotation.details,
  //       //   costtable: [],
  //       subject: 'Quotation aaproved'
  //     }
  //   };

  //   console.log('submiti function');
  //   console.log(email);
  //   const url = this.restService.MailRestURL('send', '');
  //   this.restService.postFormData(url, email).subscribe(
  //    ( response : any) => {
  //       // Responce data.

  //       console.log('Status on Post API customer mail');
  //       console.log(response);
  //     },
  //     error => {
  //       // Error Message
  //       console.log('Failed to send email message to admin');
  //     }
  //   );
  //   return 0;
  // }
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
        const url = this.restService.vouherRestURL('delete', id);
        console.log('Delete using this id:' + id);
     //   const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
         ( response : any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );

            this.route.navigate(['/managevoucher']);
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
    })
  }





  private getretaillist() {
    for (let data of this.retllist) {
      console.log(data.name);
      if (Number(data.id) === Number(this.packing.retailorder)) {
        console.log(data.retailer)
        console.log(data.retailername)
        this.packing.retailer = data.retailer;
        this.packing.retailername = data.retailername;
      }
    }

  }



  /*****upload image********************************************************** */

  // fileEvent(fileInput: any) {
  //   // alert('file event begin');
  //   if (fileInput.target.files[0] != '') {
  //     this.file = fileInput.target.files[0];
  //     // this.fileName = this.user.category;
  //     var reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //     }
  //     reader.readAsDataURL(fileInput.target.files[0]);
  //     console.log('Inside multiple file select');
  //   }
  // }

  fileEvent(fileInput: any) {
    this.fileArray = [];
    if (fileInput.target.files && fileInput.target.files.length < 4) {
      this.file = fileInput.target.files[0];
      // this.fileName = this.event.category;
      const reader = new FileReader();
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





  // uploadfile() {
  //   alert('Inside upload file');
  //       if (this.file) {


  //   alert('Inside  file');
  //         const fileExtension = '.' + this.file.name.split('.').pop();
  //         const rname = Math.random().toString(36).substring(7) + new Date().getTime();
  //         let objDoc = new Object();
  //         this.vdetail.invoice.docname = this.file.name;
  //         this.vdetail.invoice.doctype = 'Voucher';
  //         this.vdetail.invoice.docpath =  'voucher/' + rname + this.file.name;
  //         // this.vdetail.invoice.doctype = 'PROFILE';
  //         // this.vdetail.invoice.docpath =  'employee/'+this.employeeid+ '/' + rname + this.file.name;
  //         var docFormData = new FormData();
  //         // docFormData.append('doc', this.file, this.fileName);
  //         docFormData.append('doc', this.file, rname + this.file.name);
  //         docFormData.append('name', 'voucher');
  //     //    docFormData.append('name', 'employee'+'/'+this.employeeid);
  //         var docurl = this.restService.docsRestURL('upload', '');
  //         console.log(docurl);
  //         this.restService.uploadFormData(docurl, docFormData).subscribe(
  //          ( response : any) => {
  //             // Responce data.
  //             console.log('Status on Upload API');
  //             console.log(response);
  //             // Now do your stuff here
  //             return 1;
  //           },
  //           error => {
  //             // Error Message
  //             console.log('Error in doc upload .');
  //             return 0;
  //             // Do your stuff here
  //           }
  //         );
  //       } else {
  //         return 0;
  //       }
  //     }



  /*****End  upload image********************************************************** */
  uploadfile() {

    //  if (this.news.category != '') {
    let flag = true;
    // if (this.file) {

    this.docArray = []; // clearing previous docarray
    console.log('uploadfile function');
    //   alert("have a file");
    // console.log(this.proceeding);


    for (let file of this.fileArray) {

      console.log('reading file from file array');
      console.log(file);


      const fileExtension = '.' + file.name.split('.').pop();
      const rname = Math.random().toString(36).substring(7) + new Date().getTime();

      const objDoc = new Object();
      // objDoc['docname'] = file.name;
      // objDoc['docpath'] = 'events' + '/' + this.id + '/' + rname + file.name;
      // objDoc['doctype'] = 'EVENTS';


      // this.vdetail.invoice.docname = file.name;
      // this.vdetail.invoice.doctype = 'Voucher';
      // this.vdetail.invoice.docpath = 'Voucher/' + rname + file.name;
      // this.vdetail.invoice.docdesc = '';
    //  this.vdetail.vdate = this.voucher.vdate;
      //    alert(this.vdetail.invoice.docname);

      // this.docArray.push(JSON.parse(JSON.stringify(this.vdetail)));
      // JSON.parse(JSON.stringify(this.packing))
      // console.log(this.vdetail);

      const docFormData = new FormData();

      //    docFormData.append('doc', this.file, this.fileName);
      docFormData.append('doc', file, rname + file.name);
      docFormData.append('name', 'Voucher');
      //  docFormData.append('name', 'events' + '/' + this.id);
      const docurl = this.restService.customUpload('upload', '');
      console.log(docurl);

      this.restService.uploadFormData(docurl, docFormData).subscribe(
       ( response : any) => {
          // Responce data.
          console.log('Status on Upload API');
          console.log(response);
          // Now do your stuff here
        },
        error => {
          // Error Message
          flag = false;
          console.log('Error in doc upload .');


          // Do your stuff here
        }
      );

    }

    // if (flag) {
    //   this.pushVoucher();
    // }
    //  this.submitDocarray(); // postint doc array
    return 0;
    // } else {

    //   Swal.fire(
    //     'Check the number of images',
    //     '',
    //     'error'
    //   );
    //   // return 0;
    // }
    //  } else {
    //  alert('Category  Name can not be empty');
    //    return 1;
    // }
  }




  private getlastLotno() {
    // Get Information from JSON REST api
    // GET Last Lot No purcahse order

    // http://localhost:8090/IMBAManager/rest/account/newvoucher/no?firm=7
    var url = this.restService.lastlotRestURL('voucher', 'newvoucher');
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
        this.voucher.vno = response.generatednum;
        this.voucher.narration = 'Payment added for voucher no ' + this.voucher.vno;
        //  this.generateNewLotNo(response.lastlotno);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  /*****End  upload image********************************************************** */

  private getvoucherno() {

    var url = this.restService.lastlotRestURL('newvoucherno', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
       this.voucher.vno  = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getnewinvoiceno() {

    var url = this.restService.lastlotRestURL('newinvoiceno', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response : any) => {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
       this.voucher.invoicenum  = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

private getallaccount(){
  const url = this.restService.accountRestURL('', sessionStorage.getItem('firm'));
       this.restService.getJSONFromURL(url).subscribe(
        ( response : any) => {
           this.restService.getJSONFromURL(response);
           // this.datalist = response;
           // this.data=response;
           console.log(response);
           this.accountlist = response;
         },
         error => {
          console.log('Error in data load.');
        }
       );
}


}
