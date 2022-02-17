import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
import { RestService } from './../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {


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
  private travelType = '';
  //  private travelType = 'Preffered';

  public packageno;

  public isLoader = false;

  private retailerEmail;
  private empList;
  private transvendList;
  private qid;
  private nmail = sessionStorage.getItem('email');
  private pref;
  private retllist;

  private rorder;
  private rorderdetails;
  private rorderdetails1 = [];
  private stockdetails = [];
  private stationarydata;
  private statQty = 0;
  private stockdetails1 = {
    prod_stock: '',
    prodcode: '',
    lotno: '',
    packedqty: 0,
    packedwt: 0,
    mfg: '',
    expiry: '',
    mfgdate: '',
  };


  public stationaryStock = [];
  private staionary = '';

  private packedqty;
  private totalpackedqty = 0;
  private counterpackedqty = 0;
  private counterpackedqty1 = 0;
  private packedwt;
  private packedbyname;
  private pstock = [];// pstock for package
  private sstock = [];// stationary stock for package
  private stockQty = {

  };
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

  // quotation cost
  private qcost = {
    ordercost: 0.0,
    parcel: 0.0,
    subtotal: 0.0,
    profit: 0.0,
    loss: 0.0,
    bargain: 0.0,
    GST: 0.0,
    finalamt: 0.0
  };

  // qdetail cost calculation for multiple products
  private qdetail = {
    Paper: 0.0,
    Printing: 0.0,
    Lamination: 0.0,
    PostPress: 0.0,
    Cutting: 0.0
  };


  // For dynomic JSON element
  public dyelem = {
    name: '',
    value: ''
  };
  public dyElemObjData = [];
  private dynamo;
  // pnkj end:


  private product = {
    product: '',
    pname: '',
    prodcode: '',
    totalqty: '',
    totalpacks: '',
    unitsperpack: '',
    wastage: '',
    rateunit: '',
    rateperunit: '',
    amount: '',
    ratelabelperc: '',
    finalamt: '',
  };

  public quotenum;
  public consignee;
  public custData;

  private packing = {
    // dispatchno: '',              // to be generated when adding entry.
    firm: sessionStorage.getItem('firm'),
    invoicenum: '',
    quotesale: '',
    customer: '', // customer
    custname: '',  // custname
    orderdate: '2019-03-28',          // date

    status: 'PACKED',                // enum type -> UNPACKED/PACKED/PACKING_REMOVED
    paystatus: 'STOP',            // enum type -> STOP, RELEASE



    totalpkts: 0,
    // estdweight: 0,
    // actualweight: 0,
    // diffweight: 0,




    // retailorder: '',               // retailorder id (dropdown)
    // orderno: '', // order no added on 4/17/2019 from retaio lorder
    // retailer: '',                 // retailer id
    // retailername: '',       // retailer name

    packingincharge: sessionStorage.getItem('id'),           // employee id

    packedbyname: sessionStorage.getItem('name'),

    // deliveryincharge: sessionStorage.getItem('name'),          // employee id

    // deliveredbyname: sessionStorage.getItem('name'),
    deliverytime: '',


    pdetails: []

    // qtransport: {
    //   deliverydays: 1,
    //   deliverytime:'',      //Timestamp
    //   delvalidtime: '',      //Timestamp
    //   totalweight: '',
    //   numbundles: '',
    //   preftravel: {
    //     name: '',
    //   address: {
    //       line1: '',
    //       line2: '',
    //       city: '',
    //       states: '',
    //       pincode: '',
    //       country: 'India'
    //     },
    //     city: '',
    //     parcelamt: 100
    //   },
    //   temptravel: {
    //     name: '',
    //     city: '',
    //     address: {
    //       line1: '',
    //       line2: '',
    //       city: '',
    //       states: '',
    //       pincode: '',
    //       country: "India"
    //     },
    //     parcelamt:'1'
    //   }
    // },


    // qtraveldetail: {
    //   name: '',
    //   city: '',
    //   address: {
    //     line1: '',
    //     line2: '',
    //     city: '',
    //     states: '',
    //     pincode: '',
    //     country: 'India'
    //   },
    //   parcelamt: 0,
    // },


    // "totalpkts": 400,
    //   "estdweight":1.9,
    //   "actualweight":2.8,
    //   "diffweight":3.4,
    //   "packingincharge": 21,
    //   "deliveryincharge": 21,
    //   "deliveredbyname":"name",
    //   "deliverytime":"2019-01-09",



  };

  public todaydate = new Date();


  private qtraveldetail: {
    name: '',
    city: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      states: '',
      pincode: '',
      country: ''
    },
    parcelamt: 0
  };


  private wdata;
  // private pdetails={
  //   packetno: '',
  //   packedby: '',
  //   packedbyname: '',
  //   pktweight: ''
  // };
  private pdetails = []; // pdetail collection of package with package no. and multiple stock
  private packetno = '';

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

  public qsentry = [];


  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }


  ngOnInit() {

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];
      //  this.packing.retailorder = this.id;
      this.packing.quotesale = this.id;
    }

    console.log('adaded');
    this.url = this.route.url;
    console.log(this.route.url);


    if (this.route.url === '/addpacking/' + this.id) {
      this.title = 'Packing Entry';
      this.subtitle = 'Fill Packing';
      this.isManageState = false;
      //  this. getemp() ;
      //  this.getproduct() ;
      //  this.getStateList();
      //  this.getEmpList1();
      //  this.getVenderList();
      this.getquoteByid(this.id); // get saleid/quotationid
      this.getpackageeno();
      //  this.getrdetailById(this.id);
      //  this.getStationary();
      //  this.getwholeseller();

    } else if (this.route.url === '/editpacking/' + this.id) {
      this.title = 'Update Packing';
      this.isManageState = false;
      //  this.getStateList();
      //  this.getEmpList1();
      //  this.getVenderList();
      //  this.getproduct() ;
    } else if (this.route.url === '/detailpackingbyorderno/' + this.id) {
      this.title = 'Packing Details';
      this.isManageState = false;
      this.detailFlag = true;
      // this.getByorderid(this.id);

    } else if (this.route.url === '/detailpacking/' + this.id) {
      this.title = 'Packing Details';
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid(this.id);

    } else {
      this.title = 'Manage Packing';
      this.subtitle = 'Manage qoutation information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
    }
  }


  //   // Start: dynamic data
  //   onAddDyelem() {
  //  //   this.quotation.data.push(this.dyelem);
  //     if (this.dyelem.name !== '' && this.dyelem.value !== '') {
  //       this.dyElemObjData.push({
  //         'name': this.dyelem.name,
  //         'value': this.dyelem.value
  //       });

  //       this.dyelem.name = '';
  //       this.dyelem.value = '';
  //     } else {
  //       alert('Information not complited yet');
  //     }
  //   }

  //   onDeleteDyelem(i) {
  //     this.dyElemObjData.splice(i, 1);
  //     Swal.fire('Deleted!', '', 'success');
  //   }
  //     // end: dynamic data


  //      // Start: get data**************************************************************
  private getData() {
    this.isLoader = true;
    // Get Information from JSON REST api
    var url = this.restService.packingRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.isLoader = false;
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);
      },
      error => {
        this.isLoader = false;
        console.log('Error in data load.');
      }
    );
  }

  //     //  private getprodData(id:any) {
  //     //   // Get Information from JSON REST api

  //     //   var url = this.restService.quotaionRestURL('proddetails',id);
  //     //   this.restService.getJSONFromURL(url).subscribe(
  //     //     (response:any) => {


  //     //      this.quotation.details=response;
  //     //     //   console.log(response);
  //     //     for (const entry of response) {
  //     //       delete entry['id'];
  //     //     }

  //     //     },
  //     //     error => {
  //     //       console.log('Error product in data load.');
  //     //     }
  //     //   );
  //     // }


  private getquoteByid(id: any) {
    // Get Information from JSON REST api quteRestURL
    //  var url = this.restService.reteailorderRestURL('details', id);
    var url = this.restService.quoteRestURL('details', id);
    //   alert(url);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.rorder = response;
        console.log('Retailer order  by id :');
        console.log(response);

        this.packing.quotesale = response.id;
        this.packing.invoicenum = response.invoicenum;
        //  this.packing.orderno = response.orderno;
        this.packing.orderdate = this.unixTimeConverterDate(response.quotedate);

        this.packing.paystatus = response.paystatus;
        this.packing.deliverytime = this.unixTimeConverterDate(response.expdelivery);



        this.packing.customer = this.rorder.customer;
        this.getcustByid(this.packing.customer);
        this.packing.custname = response.custname;

        this.quotenum = response.quotenum;
        this.consignee = response.consigneename;

        this.qsentry = response.qsentry;

        // this.packing.retailer = this.rorder.retailer;
        // this.packing.retailername = this.rorder.retailername;

        // this.rorderdetails =

        // this.packing.deliverytime = this.unixTimeConverterDate(response.qtransport.deliverytime);




        // if (response.qtransport.preftravel.parcelamt > 0) {
        //   this.travelType = 'Preffered';


        //   this.packing.qtraveldetail.name = response.qtransport.preftravel.name;
        //   this.packing.qtraveldetail.city = response.qtransport.preftravel.city;
        //   this.packing.qtraveldetail.address.city = response.qtransport.preftravel.city;
        //   this.packing.qtraveldetail.address.states = response.qtransport.preftravel.address.states;
        //   this.packing.qtraveldetail.parcelamt = response.qtransport.preftravel.parcelamt;

        //   this.packing.qtraveldetail.address.line1 = response.qtransport.preftravel.address.line1;
        //   this.packing.qtraveldetail.address.city = response.qtransport.preftravel.address.city;
        //   this.packing.qtraveldetail.address.line2 = response.qtransport.preftravel.address.line2;




        // } else {
        //   this.travelType = 'Temporary';


        //   this.packing.qtraveldetail.name = response.qtransport.temptravel.name;
        //   this.packing.qtraveldetail.city = response.qtransport.temptravel.city;
        //   this.packing.qtraveldetail.address.city = response.qtransport.temptravel.city;
        //   this.packing.qtraveldetail.address.states = response.qtransport.temptravel.address.states;
        //   this.packing.qtraveldetail.parcelamt = response.qtransport.temptravel.parcelamt;



        //   this.packing.qtraveldetail.address.line1 = response.qtransport.temptravel.address.line1;
        //   this.packing.qtraveldetail.address.city = response.qtransport.temptravel.address.city;
        //   this.packing.qtraveldetail.address.line2 = response.qtransport.temptravel.address.line2;
        // }



        // this.packing.packingincharge = response.deliveryincharge;
        // this.packing.deliveryincharge = response.deliveryincharge;
        // this.packing.packedbyname = sessionStorage.getItem('id'); // response.deliveryincharge; // login person in packaging


        //   this.packing.actualweight = response.qtransport.totalweight;



        // this.getLastusedAddress(this.packing.retailer);

      },
      error => {
        console.log('Error product in data load.');
      }
    );
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



      },
      error => {
        console.log('Error product in data load.');
      }
    );
  }

  //   private getrdetailById(id: any) {

  //     // Get Information from JSON REST api
  //     console.log('retail order detail getting');
  //     const url = this.restService.reteailorderRestURL('rorderdetails', id);
  //     console.log(url);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //          this.rorderdetails = response;
  //         // this.data=response;
  //         console.log('Retailer order details  by id :');
  //         console.log(response);
  //         // this.retailerEmail = response.login.email;

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );

  //   }


  //   private getLastusedAddress(id: any) {

  //     // Get Information from JSON REST api
  //     console.log('Last used address ');
  //     const url = this.restService.RetailerRestURL('lastusedadd', id);
  //     console.log(url);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);


  //       //   {
  //       //     "id": 19558,
  //       //     "line1": "ravi nagar",
  //       //     "city": "Nagpur",
  //       //     "pincode": "440012",
  //       //     "states": "Maharashtra",
  //       //     "country": "India",
  //       //     "lastused": "YES"
  //       // }
  // this.packing.qtraveldetail.address.line1 = response.line1;
  // if(response.line2){
  //   this.packing.qtraveldetail.address.line2 = response.line2;
  // }
  // this.packing.qtraveldetail.address.states = response.states;
  // this.packing.qtraveldetail.address.city = response.city;
  // this.packing.qtraveldetail.address.country = response.country;

  //         // qtraveldetail: {
  //         //   name: '',
  //         //   city: '',
  //         //   address: {
  //         //     line1: '',
  //         //     line2: '',
  //         //     city: '',
  //         //     states: '',
  //         //     pincode: '',
  //         //     country: 'India'
  //         //   },
  //         //  this.rorderdetails = response;
  //         // // this.data=response;
  //         // console.log('Retailer order details  by id :');
  //         // console.log(response);
  //         // this.retailerEmail = response.login.email;

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );

  //   }

  //   // http://localhost:8090/SuppChainManager/rest/retailer/lastused?retailer=19559



  // http://localhost:8090/SmartSupplyManager/rest/product/stock/41

  private getstockbyProduct(data: any, id: any) {
    // Get Information from JSON REST api
    this.stockdetails = [];
    this.pstock = [];
    this.totalpackedqty = 0;
    this.packedwt = 0;

    this.packedqty = data.totalqty;
    this.packedwt = data.weight;

    console.log(' totalqty=' + data.totalqty);
    console.log(' packedqty=' + data.weight);










    // this.packetno = this.id + '-' + data.prodcode;
    console.log('private getstockbyProduct(data: any, id: any) ');

    console.log('Getting product stock by product code');
    const url = this.restService.productstockRestURL('prodstockbyprodid', data.product);
    console.log(url);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.stockdetails = response;

        console.log('stoackd details : ');
        console.log(this.stockdetails);
        console.log(response);

        for (let entry of data.stockids) {

          for (let sentry of this.stockdetails) {
            if (entry.stockid === sentry.id) {

              const stk = {
                prod_stock: entry.stockid,
                pname: data.pname,

                lotno: entry.lotno,

                packedqty: 1,  // ??

                //  packedwt: 'dummy',   //   ???

                mfg: sentry.mfg,           // mfg by

                expiry: this.unixTimeConverterDate(sentry.expiry),   // not in qsentry

                mfgdate: this.unixTimeConverterDate(sentry.mfgdate)  // not in qsentry
              };

              this.pstock.push(stk);
              this.packing.totalpkts = this.packing.totalpkts + 1;
            }

          }
        }

        this.qsentry.splice(id, 1);

        console.log('this.pstock');
        console.log(this.pstock);

        const json = {
          packageno: this.packageno,
          pstock: this.pstock
        };

        this.packing.pdetails.push(json);


      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  //   private getstockbyStationary() {
  //     // Get Information from JSON REST api
  //     this.stationaryStock = [];
  //     // this.totalpackedqty = 0;
  //     // this.packedwt = 0;
  //     // this.packedqty = data.totalqty;
  //     // this.packedwt = data.weight;
  //     // console.log(' totalqty=' + data.totalqty);
  //     // console.log(' packedqty=' + data.weight);
  //     // console.log( this.id );
  //     // console.log( data.prodcode);

  //     // this.packetno = this.id + '-' + data.prodcode;
  //     // http://localhost:8090/SuppChainManager/rest/stationery/stock?prodcode=st1&qty=600
  //     console.log('Getting stationary stock for prodcode =' + this.staionary + 'And quantity =' + this.statQty);
  //     console.log('Getting product stock by product code');


  //   //  const url = this.restService.stationaryRestURL('bystatprodcode', this.staionary + '&qty=' + this.statQty);
  //     const url1 = this.restService.productstockRestURL('bystatprodcode', this.staionary + '&qty=' + this.statQty);


  //     console.log(url1);
  //     this.restService.getJSONFromURL(url1).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //         this.stationaryStock = response;
  //         console.log('response stationary stockd details : ');
  //         console.log( this.stationaryStock);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  //   private pushpacking(data: any, i: any) {

  //     console.log('total Qty: ' + this.packedqty);
  //     console.log('this.counterpackedqty: ' + this.counterpackedqty);

  //     const lastQty = this.packedqty - this.counterpackedqty;
  //     console.log('Remaining Qty to be packed: ' + lastQty);


  //     if (this.stockdetails.length >1) {
  //       this.stockdetails1.prod_stock = data.id;
  //       this.stockdetails1.prodcode = data.prodcode;
  //       this.stockdetails1.packedwt = 0;

  //       this.stockdetails1.mfgdate = data.mfgdate;
  //       this.stockdetails1.mfg = data.mfg;
  //       this.stockdetails1.lotno = data.lotno;
  //       this.stockdetails1.expiry = data.expiry;
  //       this.stockdetails1.packedqty = data.balanceunits;
  //       this.counterpackedqty += data.balanceunits;
  //       console.log(this.stockdetails1);
  //       const stock = JSON.parse(JSON.stringify(this.stockdetails1));
  //       this.pstock.push(stock);
  //       console.log('this.pstock:' + this.pstock);
  //       this.clearstockdetails1();

  //       this.stockdetails.splice(i, 1);
  //       console.log('this.stockdetails after splice:' + this.stockdetails);
  //      } else {
  //       this.stockdetails1.prod_stock = data.id;
  //       this.stockdetails1.prodcode = data.prodcode;
  //       this.stockdetails1.packedwt = 0;

  //       this.stockdetails1.mfgdate = data.mfgdate;
  //       this.stockdetails1.mfg = data.mfg;
  //       this.stockdetails1.lotno = data.lotno;
  //       this.stockdetails1.expiry = data.expiry;
  //       this.stockdetails1.packedqty = lastQty;
  //      // this.counterpackedqty += data.balanceunits;
  //       console.log(this.stockdetails1);
  //       const stock = JSON.parse(JSON.stringify(this.stockdetails1));
  //       this.pstock.push(stock);
  //       console.log('this.pstock:' + this.pstock);
  //       this.clearstockdetails1();

  //       this.stockdetails.splice(i, 1);
  //       console.log('this.stockdetails after splice:' + this.stockdetails);
  //      }

  //   }

  //   private pushstationary(data: any, i: any) {
  //   //  this.counterpackedqty =0;
  //     console.log('total Qty: ' + this.statQty);
  //     console.log('this.counterpackedqty1: ' + this.counterpackedqty1);

  //     const lastQty = this.statQty - this.counterpackedqty1;
  //     console.log('Remaining Qty to be packed: ' + lastQty);


  //     let stok = {
  //       stationery_stock: data.id,
  //       prodcode: data.prodcode,
  //       lotno: data.lotno,
  //       usedqty: data.usedqty,
  //       usedwt: 0
  //     };


  //     if (this.stationaryStock.length > 1) {

  //       stok.usedqty = data.balanceunits;
  //       stok.usedwt = data.balweight;

  //       this.counterpackedqty1 += data.balanceunits;
  //       console.log(stok);
  //       const stock = JSON.parse(JSON.stringify(stok));
  //       this.sstock.push(stok);

  //       console.log('this.pstock:' + this.pstock);
  //      // this.clearstockdetails1();

  //       this.stationaryStock.splice(i, 1);
  //       console.log('this.stockdetails after splice:' + this.stockdetails);
  //     } else {
  //       // this.stockdetails1.prod_stock = data.id;
  //       // this.stockdetails1.prodcode = data.prodcode;
  //       // this.stockdetails1.packedwt = 0;

  //       // this.stockdetails1.mfgdate = data.mfgdate;
  //       // this.stockdetails1.mfg = data.mfg;
  //       // this.stockdetails1.lotno = data.lotno;
  //       // this.stockdetails1.expiry = data.expiry;
  //       //  this.stockdetails1.packedqty = lastQty;
  //       stok.usedqty = lastQty;
  //       stok.usedwt = data.balweight;
  //       // this.counterpackedqty += data.balanceunits;
  //       console.log(stok);
  //      // const stock = JSON.parse(JSON.stringify(this.stockdetails1));
  //       const stock = JSON.parse(JSON.stringify(stok));
  //       this.sstock.push(stock);
  //       console.log('this.pstock:' + this.pstock);
  //    //   this.clearstockdetails1();

  //       this.stationaryStock.splice(i, 1);
  //       console.log('this.stockdetails after splice:' + this.stockdetails);

  //       this.staionary='';
  //       this.statQty=0;
  //     }

  //   }

  //   clearstockdetails1() {
  //     this.stockdetails1.prod_stock = '';
  //     this.stockdetails1.prodcode = '';
  //     this.stockdetails1.packedwt = 0;
  //     this.stockdetails1.mfgdate = '';
  //     this.stockdetails1.mfg = '';
  //     this.stockdetails1.lotno = '';
  //     this.stockdetails1.expiry = '';
  //     this.stockdetails1.packedqty = 0;
  //   }




  //   pushPstock() {
  //     if(this.pstock.length>0){



  //     const packageStock = {
  //       packageno: this.packetno,
  //       pstock: this.pstock,
  //       statpstock:this.sstock
  //     };

  //     const counter = this.pstock.length;
  //     this.packing.totalpkts += counter;

  //   //  this.pdetails.push(JSON.parse(JSON.stringify(packageStock)));
  //       this.packing.pdetails.push(JSON.parse(JSON.stringify(packageStock)));

  //     this.pstock = [];
  //     this.sstock = [];
  //     console.log('Package added for product');
  //     console.log(this.pdetails);

  //   }
  //   else{
  //      Swal.fire(
  //       'Product/Stationary Should Not be Null',
  //       '',
  //       'error'
  //     );
  //   }


  //     }

  //     //  updateData() {
  //     //    console.log('submiti function');
  //     //    var url = this.restService.quotaionRestURL('edit', '');
  //     //    console.log(url);
  //     //    this.restService.postFormData(url, this.vendor).subscribe(
  //     //      (response:any) => {
  //     //        // Responce data.
  //     //        console.log('Status on Post API');
  //     //        console.log(response);
  //     //        // Now do your stuff here
  //     //        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
  //     //        Swal.fire('', '', 'success');
  //     //        window.scrollTo(0, 0);
  //     //        this.route.navigate(['/managepacking']);
  //     //      },
  //     //      error => {
  //     //        // Error Message
  //     //        Swal.fire(
  //     //          error.statusText,
  //     //          error._body,
  //     //          'error'
  //     //        );
  //     //        console.log('Error in data load.');
  //     //        // Doyour stuff here
  //     //      }
  //     //    );
  //     //    return 0;
  //     //  }


  private getByid(id: any) {
    // Get Information from JSON REST api
    let url = this.restService.packingRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        this.packing = response;

        //  this.getcustByid(this.packing.customer);
        this.getquoteByid(this.packing.quotesale);

        // this.data = response;
        //   console.log(this.data);

        //  this.packing.qtraveldetail = response.qtraveldetail;
        // // this.packing.qtraveldetail = response.qtraveldetail;
        //  this.packing= response;
        //  console.log(this.packing.qtraveldetail );


        //  private packing={
        //   dispatchno: '',              // to be generated when adding entry.
        //   retailorder:'',               //retailorder id (dropdown)
        //   retailer: '',                 //retailer id
        //   retailername: '',       //retailer name
        //   orderdate:'3.12.2019',          //date
        //   status: 'PACKED',                //enum type -> UNPACKED/PACKED/PACKING_REMOVED
        //   paystatus: 'STOP',            //enum type -> STOP, RELEASE


        //   qtraveldetail: {
        //     name: '',
        //     city: '',
        //     address: {
        //       line1: '',
        //       line2: '',
        //       city: '',
        //       states: '',
        //       pincode: '',
        //       country: 'India'
        //     },
        //     parcelamt: 0,
        // },
        //   totalpkts: 0,
        //   estdweight:0,
        //   actualweight:0,
        //   diffweight:0,
        //   packingincharge:sessionStorage.getItem('id'),           //employee id
        //   deliveryincharge: sessionStorage.getItem('name'),          //employee id
        //      deliveredbyname:sessionStorage.getItem('name'),
        //    deliverytime:'',
        //   pdetails: []
        // };
        // this.getpdetailByid(id);

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  //      private getByorderid(id:any) {
  //       // Get Information from JSON REST api
  //       // http://localhost:8090/SuppChainManager/rest/packentry/orderno/RO-005
  //       let url = this.restService.packingRestURL('detailsbyRO', id);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           console.log('Done fatching data!');
  //           this.packing.qtraveldetail = response.qtraveldetail;
  //           this.packing= response;
  //           console.log(this.packing.qtraveldetail );
  //           console.log(response);
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }

  //      private getpdetailByid(id:any) {
  //       // Get Information from JSON REST api
  //       let url = this.restService.packingRestURL('pdetails', id);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           console.log('Done fatching data!');

  //      //     this.data = response;

  //           this.packing.pdetails=response;
  //         // this.data['pdetails'] = response;

  // // this.packing = this.data;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }

  //      print(): void {
  //       let printContents, popupWin;
  //       printContents = document.getElementById('print-section').innerHTML;
  //       popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //       popupWin.document.open();
  //       popupWin.document.write(`
  //         <html>
  //           <head>
  //             <title>Print tab</title>
  //             <style>
  //             //........Customized style.......
  //             </style>
  //           </head>
  //       <body onload="window.print();window.close()">${printContents}</body>
  //         </html>`
  //       );
  //       popupWin.document.close();
  //   }
  //      private getRetailById(id: any) {

  //       // Get Information from JSON REST api
  //       const url = this.restService.RetailerRestURL('details', id);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.restService.getJSONFromURL(response);
  //           // this.datalist = response;
  //           // this.data=response;
  //           console.log('Getting retailer by id');
  //           console.log(response);
  //           //  this.retailerEmail = response.login.email;

  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );

  //     }


  //     calwt(){

  //       this.packing.diffweight= this.packing.estdweight - this.packing.actualweight;

  //     }




  //      private getStateList() {
  //        // Get Information from JSON REST api
  //        var url = this.restService.stateRestURL('', 'India');
  //        this.restService.getJSONFromURL(url).subscribe(
  //          (response:any) => {
  //            // this.restService.getJSONFromURL(response);
  //            this.statelist = response;
  //            console.log('State data available');
  //          },
  //          error => {
  //            console.log('Error in data load.');
  //          }
  //        );
  //      }

  //     //  private getState() {
  //     //   // Get Information from JSON REST api
  //     //   var url = this.restService.PincodeRestURL('',this.vendor.address.pincode);
  //     //   this.restService.getJSONFromURL(url).subscribe(
  //     //     (response:any) => {
  //     //       // this.restService.getJSONFromURL(response);
  //     //       this.statelist = response;
  //     //       this.quotation.custstate=response.state_name;
  //     //       this.quotation.custcity=response.city_name;


  //     //       console.log('State data available');
  //     //     },
  //     //     error => {
  //     //       console.log('Error in data load.');
  //     //     }
  //     //   );
  //     // }


  //      private getCatList() {
  //        // Get Information from JSON REST api
  //        var url = this.restService.catRestURL('', '');
  //        this.restService.getJSONFromURL(url).subscribe(
  //          (response:any) => {
  //            // this.restService.getJSONFromURL(response);
  //            this.catList = response;
  //            console.log('State data available');
  //          },
  //          error => {
  //            console.log('Error in data load.');
  //          }
  //        );
  //      }

  //      private getVenderList() {
  //        this.transvendList=[];
  //       // Get Information from JSON REST api
  //       var url = this.restService.vendorRestURL('', '');
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           // this.restService.getJSONFromURL(response);
  //           this.transvendList = response;
  //           console.log('vendor data available');
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }
  //     private getretaileorder() {
  //       this.retllist=[];
  //      // Get Information from JSON REST api
  //      var url = this.restService.reteailorderRestURL('', '');
  //      this.restService.getJSONFromURL(url).subscribe(
  //        (response:any) => {
  //          // this.restService.getJSONFromURL(response);
  //          this.retllist = response;
  //          console.log('vendor data available');
  //        },
  //        error => {
  //          console.log('Error in data load.');
  //        }
  //      );
  //    }
  //    private getretaillist() {

  //     for (let data of this.retllist) {

  //       console.log(data.name);
  //       if (Number(data.id) === Number(this.packing.retailorder)) {
  //        console.log(data.retailer)
  //        console.log(data.retailername)
  //           this.packing.retailer = data.retailer;
  //           this.packing.retailername = data.retailername;

  //         }
  //        }

  //     }

  //      private onChangeState(obj) {
  //        let stateId = obj.srcElement.value;
  //        // Call city data method
  //        this.getCityList(stateId);
  //      }
  //      private onChangeState1(obj) {
  //       const stateId = obj.srcElement.value;
  //       // Call city data method
  //       this.getCityList1(stateId);
  //     }
  //     private onChangeState2(obj) {
  //       const stateId = obj.srcElement.value;
  //       // Call city data method
  //       this.getCityList2(stateId);
  //     }

  //      private getCityList(stateId) {
  //        this.citylist = [];
  //        // Get Information from JSON REST api
  //        var url = this.restService.cityRestURL('', stateId);
  //        console.log(stateId);
  //        this.restService.getJSONFromURL(url).subscribe(
  //          (response:any) => {
  //            this.citylist = response;
  //          },
  //          error => {
  //            console.log('Error in data load.');
  //          }
  //        );
  //      }

  //      private getCityList1(stateId) {
  //       this.citylist1 = [];
  //       // Get Information from JSON REST api
  //       const url = this.restService.cityRestURL('', stateId);
  //       console.log(stateId);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.citylist1 = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }
  //     private getCityList2(stateId) {
  //       this.citylist2 = [];
  //       // Get Information from JSON REST api
  //       const url = this.restService.cityRestURL('', stateId);
  //       console.log(stateId);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.citylist2 = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }


  //     //  private getretailer() {

  //     //   this.retlList = [];
  //     //   // Get Information from JSON REST api
  //     //   var url = this.restService.RetailerRestURL('', '');

  //     //   this.restService.getJSONFromURL(url).subscribe(
  //     //     (response:any) => {
  //     //       this.retlList = response;
  //     //     },
  //     //     error => {
  //     //       console.log('Error in data load.');
  //     //     }
  //     //   );
  //     // }

  //     // private getClienList() {

  //     //   // Get Information from JSON REST api
  //     //   const url = this.restService.RetailerRestURL('city', this.quotation.custcity);
  //     //   this.restService.getJSONFromURL(url).subscribe(
  //     //     (response:any) => {
  //     //       this.restService.getJSONFromURL(response);
  //     //       // this.datalist = response;
  //     //       // this.data=response;
  //     //       console.log(response);
  //     //       this.clientdata = response;
  //     //     },
  //     //     error => {
  //     //       console.log('Error in data load.');
  //     //     }
  //     //   );
  //     // }

  //     private getEmpList1() {
  //       // Get Information from JSON REST api
  //       const url = this.restService.empRestURL('', '');
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.restService.getJSONFromURL(response);
  //           // this.datalist = response;
  //           // this.data=response;
  //           console.log(response);
  //           // this.data = response;
  //           this.empList = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }
  //     private getemployeelist() {
  //   //     console.log('Product changed');
  //   //    console.log(this.empList);
  //   //     for (let data of this.empList) {

  //   //       console.log(data.name);
  //   //       if (Number(data.id) === Number(this.pdetails.packedby)) {

  //   //           this.pdetails.packedbyname = data.name;

  //   //         }
  //   // }
  //      }


  //   //   private onChangeCustomer(obj) {
  //   //     const stateId = obj.srcElement.value;
  //   //     this.getRetailById(stateId);
  //   //      console.log(obj);
  //   //     // Call city data method
  //   //     console.log('onChangeCustomer');
  //   //     console.log(obj.target.value);
  //   //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //   //     this.quotation.retailername = obj.target.options[obj.target.selectedIndex].text;
  //   //   }

  //   //   private onChangeHandler1(obj) {
  //   //     const stateId = obj.srcElement.value;
  //   //     // console.log(obj);
  //   //     // Call city data method
  //   //     console.log('primhandre...');
  //   //     console.log(obj.target.value);
  //   //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //   //     this.quotation.primhandlername = obj.target.options[obj.target.selectedIndex].text;
  //   //   }
  //   //   private onChangeHandler2(obj) {
  //   //     const stateId = obj.srcElement.value;
  //   //     // console.log(obj);
  //   //     // Call city data method
  //   //     console.log('sechandler...');
  //   //     console.log(obj.target.value);
  //   //     console.log(obj.target.options[obj.target.selectedIndex].text);
  //   //  //   this.quotation.sechandlername = obj.target.options[obj.target.selectedIndex].text;
  //   //   }


  //     private getemp() {
  //       this.emplList = [];
  //       // Get Information from JSON REST apiz
  //       var url = this.restService.empRestURL('', '');

  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.emplList = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }

  //     private getproduct() {
  //       this.prodlList = [];
  //       // Get Information from JSON REST api
  //       var url = this.restService.productRestURL('', '');

  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.prodlList = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }
  //     private getproductlabel() {
  //       this.prodlableList = [];
  //       // Get Information from JSON REST api
  //       var url = this.restService.productlabelRestURL('', '');

  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.prodlableList = response;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }
  //     private getproductpercentage() {
  //       //this.prodpercentList = [];
  //       // Get Information from JSON REST api
  //       var url = this.restService.productlabelRestURL('percentage',this.product.prodcode);

  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //          // this.prodpercentList = response;
  //           // [{"id":21763,"product":19666,"prodcode":"p4","ratelabel":"rate2","ratelabelperc":54.0}]
  //           this.product.ratelabelperc=response.ratelabelperc;
  //           this.ratelabel=response.ratelabel;
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }

  //     clonequotation(id: any) {



  //             var url = this.restService.quotaionRestURL('clone', '');
  //             console.log(id);
  //             let json = '{\"id\":\"' + id + '\"}';
  //             this.restService.postFormData(url, json).subscribe(
  //               (response:any) => {
  //                 // Responce data.
  //                 console.log('Status on Post API');
  //                 console.log(response);
  //                 this.getByid(response.id);

  //               },
  //               error => {
  //                 // Error Message
  //                 // this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
  //                 //   + error._body);
  //                 console.log('Error in data load.');
  //                 // Doyour stuff here
  //               }
  //             );
  //             return 0;


  //     }


  //     private getclone(id:any){

  //       // Get Information from JSON REST api
  //       let url = this.restService.quotaionRestURL('clone',id);
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           console.log('Done fatching data!');
  //          // this.data = response;

  //          this.getByid(this.id);

  //         // this.getrorderData(this.id);



  //           console.log(response);
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );



  //    }
  //    private confirm(data:any){

  // // this.getprodData(data.id);

  //     var url = this.restService.quotaionRestURL('update','');
  //      const id= data.id;
  //    const json= {
  //       "id":id,
  //       "status":"ORDER_CONFIRM"
  //       }

  //      this.restService.postFormData(url, json).subscribe(
  //       (response:any) => {
  //         console.log('Done fatching data!');

  //        console.log(id);
  //       //  alert(id);

  //     //   this.approvemail(data);

  //         console.log(response);
  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );



  //  }

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




  //     private getproductgst() {
  //       // alert('alor re bhau..');
  //       // alert(this.quotation.product);
  //       console.log('Product changed');

  //       // this.subdept.depname =
  //       // obj.target.options[obj.target.selectedIndex].text;
  //       for (let data of this.prodlList) {

  //         console.log(data.name);
  //         if (Number(data.id) === Number(this.product.product)) {

  //             this.product.prodcode = data.prodcode;
  //             this.product.rateperunit = data.rateperunit;
  //             this.product.rateunit = data.rateunit;
  //             this.product.pname=data.name;

  //             this.getproductpercentage();
  //           // this.product.ratelabelperc=data.ratelabelperc;

  //           }




  //          }


  //       }
  //       // onDeleteproduct(i) {



  //       //   console.log('Deleting*********************');




  //       //    this.quotation.details.splice(i, 1);

  //       //   // this.alertify.alert('Item Deleted successfully.');
  //       //   Swal.fire(
  //       //     'Deleted!',
  //       //     '',
  //       //     'success'
  //       //   );
  //       //   // console.log(this.dyElemObjData);
  //       // }


  //       private getvendor() {
  //         // alert('alor re bhau..');
  //         // alert(this.quotation.product);
  //         console.log('vender changed');
  //         for (let data of this.transvendList) {

  //           console.log(data.name);
  //           // if (data.name === this.quotation.qtransport.temptravel.name) {

  //           //     this.quotation.qtransport.temptravel.name = data.name;
  //           //     this.quotation.qtransport.temptravel.address.states = data.address.states;
  //           //    this.getCityList2( this.quotation.qtransport.temptravel.address.states);
  //           //      this.quotation.qtransport.temptravel.address.city = data.address.city;
  //           //      this.quotation.qtransport.temptravel.address.line1 = data.address.line1;
  //           //      this.quotation.qtransport.temptravel.address.line2 = data.address.line2;
  //           //      this.quotation.qtransport.temptravel.address.pincode=data.address.pincode;

  //           // }

  //            }

  //         }


  //     //  private getptravelvendor(id:any){

  //     //   //this.prodpercentList = [];
  //     //   // Get Information from JSON REST api
  //     //   var url = this.restService.level2detailRestURL('prefred',this.quotation.retailer);

  //     //   this.restService.getJSONFromURL(url).subscribe(
  //     //     (response:any) => {
  //     //       // this.pref = response;
  //     //       // for(let data of this.pref){
  //     //       //   // console.log("in preferrd travel");
  //     //       //   // this.qtransport.preftravel.name=data.name;
  //     //       //   // console.log('in name');
  //     //       //   // this.quotation.custcity=response.city;
  //     //       // }
  //     //       console.log("in preferrd travel");
  //     //        // this.qtransport.preftravel.name=response.name;

  //     //       //  this.quotation.qtransport.preftravel.name=response[0].vendor;

  //     //       //  this.quotation.qtransport.preftravel.address.states=this.quotation.custstate;

  //     //       //  this.quotation.qtransport.preftravel.city=this.quotation.custcity;





  //     //     },
  //     //     error => {
  //     //       console.log('Error in data load.');
  //     //     }
  //     //   );




  //     //     }



  //          private getwtofparcel() {
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

  //       let clbsize;


  //   // if (this.route.url === '/generatequotation/' + encodeURIComponent(this.id)
  //   //       ) {
  //   //         clbsize = this.quotation.psize;
  //   //         this.travelGsm = Number(this.qpaper.gsm);
  //   //       }else{
  //   //         clbsize = this.paper[0].size;
  //   //       }

  //   //     if ((clbsize !== '' && this.quotation.prodqty > 0)) {
  //   //       // Get Information from JSON REST api

  //   //       console.log('getting print run');
  //   //       console.log('this.quotation.prodqty : ' + this.quotation.prodqty);

  //   //       let urlString =
  //   //         'weight?size=' +
  //   //         clbsize +
  //   //         //   this.quotation.paperqty +
  //   //         '&gsm=' +
  //   //         this.travelGsm +
  //   //         '&qty=' +
  //   //         this.quotation.prodqty +
  //   //         '&namune=' +
  //   //         this.namune;


  //   //         console.log(urlString);

  //   //       //  rate/paper/weight?size=18X23&gsm=150&qty=1000

  //   //       const url = this.restService.papersizeRestURL('wt', urlString);
  //   //       this.restService.getJSONFromURL(url).subscribe(
  //   //         (response:any) => {
  //   //           this.restService.getJSONFromURL(response);
  //   //           console.log('wt of parcel');
  //   //           console.log(response);

  //   //           this.qtransport.totalweight = response;
  //   //           // this.printrunData = response.plist;

  //   //           // this.quotation.paperqty = response.paperqty;

  //   //           // this.qpaper.sheetcnt = response.sheetcnt;
  //   //           // this.qprint.impressions = response.impresssions;
  //   //           this.getTravelrate();
  //   //         },
  //   //         error => {
  //   //           console.log('Error in data load.');
  //   //         }
  //   //       );
  //   //     }
  //   //   }
  //   }


  //       private getTravelrate() {
  //         console.log('Getting travel rate');

  //         // remove it when travel rate api working : start
  //         // if (
  //         //   this.qtransport.preftravel.parcelamt >
  //         //   this.qtransport.temptravel.parcelamt
  //         // ) {
  //         //   this.qcost.parcel = this.qtransport.preftravel.parcelamt;
  //         // } else {
  //         //   this.qcost.parcel = this.qtransport.temptravel.parcelamt;
  //         // }

  //         // console.log('Parcel amount :' + this.qcost.parcel);
  //         // this.qcost.subtotal =
  //         //   Number(this.qcost.ordercost) + Number(this.qcost.parcel);
  //         // remove it when travel rate api working : end
  //      console.log('ingettravel');
  //         let strurl;
  //         if (this.travelType === 'Preffered') {
  //           strurl = 'travel?vendor=' + this.qtransport.preftravel.name +
  //             '&dest=' + this.qtransport.preftravel.city +
  //             '&weight=' + this.qtransport.totalweight;
  //         } else {
  //           strurl = 'travel?vendor=' + this.qtransport.temptravel.name +
  //             '&dest=' + this.qtransport.temptravel.city +
  //             '&weight=' + this.qtransport.totalweight;
  //         }

  //         // const url = this.restService.travelrateRestURL('rate', strurl);
  //         // this.restService.getJSONFromURL(url).subscribe(
  //         //    (response:any) => {
  //         //     this.restService.getJSONFromURL(response);
  //         //     // this.datalist = response;
  //         //     // this.data=response;
  //         //     console.log(response);
  //         //     this.qtransport.numbundles = response.numbundles;

  //         //     if (this.travelType === 'Preffered') {

  //         //       if (this.qtransport.temptravel.parcelamt > 0) {
  //         //       //  this.qcost.ordercost -= this.qtransport.temptravel.parcelamt; // removed on 12/1/2018
  //         //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //         //         this.qtransport.temptravel.parcelamt = 0;
  //         //         // this.qcost.parcel = 0;

  //         //       }
  //         //       this.qtransport.preftravel.parcelamt = response.amount;

  //         //     } else {
  //         //       if (this.qtransport.preftravel.parcelamt > 0) {
  //         //        // this.qcost.ordercost -= this.qtransport.preftravel.parcelamt; // removed on 12/1/2018
  //         //         this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //         //         this.qtransport.preftravel.parcelamt = 0;
  //         //         // this.qcost.parcel = 0;
  //         //       }
  //         //       this.qtransport.temptravel.parcelamt = response.amount;
  //         //       this.qcost.parcel = response.amount; // added on 12/1/2018
  //         //     }

  //         //     this.qcost.parcel = response.amount;
  //         //     this.qcost.subtotal = Number(this.qcost.ordercost) + Number(this.qcost.parcel);


  //         //     // this.qcost.ordercost -= this.plate_amount;
  //         //     //this.qcost.subtotal -= this.plate_amount;
  //         //     // this.qcost.ordercost = Math.round(this.qcost.ordercost * 100) / 100;
  //         //     this.qcost.subtotal = Math.round(this.qcost.subtotal * 100) / 100;



  //         //     //this.profitlosscount(); // calling profit or loss  Added on 11/14/2018
  //         //   },
  //         //   error => {
  //         //     console.log('Error in data load.');
  //         //   }
  //         // );


  //       }

  //       private wtofParcel() {
  //         console.log('Calculating wt of sheets for Parcel Wt');
  //         // wt of 500 sheet

  //         // const wof500sh = (Number(this.quotation.plength) * Number(this.quotation.pbreadth) * Number(this.travelGsm)) / 3100;


  //         // console.log('prod length :' + this.quotation.plength);
  //         // console.log('prod breadth :' + this.quotation.pbreadth);
  //         // console.log('travel gsm :' + this.travelGsm);
  //         // console.log('wof500sh');
  //         // console.log(wof500sh);


  //         // const wof1sh = wof500sh / 500;          // weight of one sheet
  //         // console.log('wof1sh ' + wof1sh);

  //         // const totWt = wof1sh * this.qpaper.quantity;



  //         // console.log('Paper Quantity ' + this.quotation.paperqty);
  //         // console.log('Total weight ' + totWt);

  //         // this.qtransport.totalweight = Math.round(totWt);

  //             // if (this.quotation.type !== 'BOOKWORK' && this.quotation.type !== 'MULTIPLE_SHEET') {
  //             //   this.getwtofparcel();
  //             // }else{
  //             //   this.getTravelrate();
  //             // }
  //         // paper rate for 500
  //         // let PRfor500sh = wof500sh * this.prate;

  //       }






  //   private getavialabel() {
  //     const strurl = 'prodcode=' + this.product.prodcode + '&quantity=' + this.product.totalqty;
  //     var url = this.restService.productstockRestURL('available', strurl);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //       //  this.data = response;
  //         console.log(response);
  //         if(response.available==='NO'){
  //           Swal.fire(
  //             'Not available in staock',
  //           '',
  //             'error'
  //           );
  //         }
  //         this.getrate();

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }

  //     );
  //   }

  //   private getrate() {

  //     const str = 'prodcode=' + this.product.prodcode + '&ratelabel=' + this.ratelabel + '&quantity=' + this.product.totalqty;
  //     var url = this.restService.productstockRestURL('rate', str);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response:any) => {
  //         this.restService.getJSONFromURL(response);
  //       //  this.data = response;
  //       this.product.amount=response.amount;
  //         console.log(response);
  //         // if(response.available==='NO'){
  //         //   Swal.fire(
  //         //     'Not available in staock',
  //         //   '',
  //         //     'error'
  //         //   );
  //         // }

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }


  submitData() {
    console.log('Submit Funciton Called');
    console.log(this.packing);
    if (this.packing.pdetails.length > 0) {
      console.log('submiti function');
      const url = this.restService.packingRestURL('add', '');
      console.log(url);
      this.restService.postFormData(url, this.packing).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          //   alert('success');
          // Now do your stuff here
          // this.firmid = response.id;
          Swal.fire('', '', 'success');
          window.scrollTo(0, 0);
          this.route.navigate(['/managepacking']);
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

    } else {
      Swal.fire(
        'Please Add Packing Details',
        '',
        'error'
      );
    }
  }
  //      submitData() {
  //      if  (this.rorderdetails.length==0) {




  //       this.isLoader = true;





  // // if (this.travelType = 'Preffered') {


  // // qtraveldetail.name = this.packing.qtransport.preftravel.name;
  // // qtraveldetail.name  =  this.packing.qtransport.preftravel.name;
  // // qtraveldetail.city = response.qtransport.preftravel.city;
  // // qtraveldetail.address.city = response.qtransport.preftravel.city;
  // // qtraveldetail.address.states = response.qtransport.preftravel.address.states;
  // // qtraveldetail.parcelamt = response.qtransport.preftravel.parcelamt;



  // // } else {


  // // qtraveldetail.name = response.qtransport.temptravel.name;
  // // qtraveldetail.city = response.qtransport.temptravel.city;
  // // qtraveldetail.address.city = response.qtransport.temptravel.city;
  // // qtraveldetail.address.states = response.qtransport.temptravel.address.states;
  // // qtraveldetail.parcelamt = response.qtransport.temptravel.parcelamt;
  // // }
  // //    this.packing['qtraveldetail'] = qtraveldetail;









  //       // if(this.vendor.weeklyoff==="false"){
  //       //   delete this.vendor['weekoffday'];
  //       // }

  //       // this.quotation.data = this.dyElemObjData;
  //     //   let dyObj = {};
  //     // this.dyElemObjData.forEach(function (elem) {
  //     //   dyObj[elem.name] = elem.value;
  //     // });
  //     // console.log(dyObj);
  //     // this.quotation['data']=dyObj;

  //    //    this.packing.pdetails = this.pdetails;
  //        console.log('submiti function');
  //       //  this.packing.qtransport.deliverytime += ':00';
  //       //  this.packing.qtransport.delvalidtime += ':00';

  //        console.log(this.packing);

  //        var url = this.restService.packingRestURL('add', '');
  //        console.log(url);

  //        console.log('Packing Json data for post:');
  //        console.log(this.packing);
  //        this.restService.postFormData(url, this.packing).subscribe(
  //          (response:any) => {
  //            // Responce data.

  //            console.log('Status on Post API');
  //            console.log(response);
  //            this.qid=response.id;
  //            if(this.userrole=='ADMIN'){
  //             this. customermail();
  // //      this.approvemail()
  //            }else{
  //             this. managermail();
  //            this. customermail();
  //            }

  //            this.isLoader = false;
  //            // Now do your stuff here
  //            Swal.fire('', '', 'success');
  //            window.scrollTo(0, 0);
  //            this.route.navigate(['/managepacking']);
  //          },
  //          error => {
  //            // Error Message
  //            this.isLoader = false;
  //            Swal.fire(
  //              error.statusText,
  //              error._body,
  //              'error'
  //            );
  //            console.log('Error in data load.');
  //            // Doyour stuff here
  //          }
  //        );
  //        return 0;
  //      }
  //      else{
  //       Swal.fire(
  //        'Make Sure All Products are Added',
  //        '',
  //        'error'
  //      );
  //       }
  //     }



  //      private managermail() {
  //       const email = {
  //         role: { role: 'ADMIN' },
  //        to:  '',
  //        cc:'inouvellesolutions@gmail.com',
  //         templateId: 'custmail',
  //         contentData: {
  //           content: {
  //             // message: 'Dear Sir,\n \n' +
  //             //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //             //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //             message: 'Dear Sir, ' +
  //             'New quotation generated with id '+this.qid+' by '+
  //             // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //             // this.leave.todate + ' with status Pending ',
  //             sessionStorage.getItem('name') ,
  //           },
  //           table: [],
  //        //   costtable: [],
  //           subject: 'New Qutation Add'
  //         }
  //       };


  //       console.log('submiti function');
  //       console.log(email);
  //       const url = this.restService.MailRestURL('group', '');
  //       this.restService.postFormData(url, email).subscribe(
  //         (response:any) => {
  //           // Responce data.
  //           console.log('Status on Post API');
  //           console.log(response);
  //         },
  //         error => {
  //           // Error Message
  //           console.log('Failed to send email message to admin');
  //         }
  //       );
  //       return 0;
  //     }

  //     private customermail() {
  //       const email = {
  //         // role: { role: 'ADMIN' },
  //         to:  sessionStorage.getItem('email'),
  //        cc:'inouvellesolutions@gmail.com',
  //         templateId: 'custmail',
  //         contentData: {
  //           content: {
  //             // message: 'Dear Sir,\n \n' +
  //             //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //             //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //             message: 'Dear Sir,\n ' +
  //             'New quotation generated with id '+this.qid+' by '+
  //             // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //             // this.leave.todate + ' with status Pending ',
  //             sessionStorage.getItem('name')+'with thw customer quitation add' ,
  //           },
  //           table:[],
  //        //   costtable: [],
  //           subject: 'New Qutation Added by Customer'
  //         }
  //       };

  //       console.log('submiti function');
  //       console.log(email);
  //       const url = this.restService.MailRestURL('send', '');
  //       this.restService.postFormData(url, email).subscribe(
  //         (response:any) => {
  //           // Responce data.

  //           console.log('Status on Post API customer mail');
  //           console.log(response);
  //         },
  //         error => {
  //           // Error Message
  //           console.log('Failed to send email message to admin');
  //         }
  //       );
  //       return 0;
  //     }
  //     // private approvemail(data:any) {
  //     //   const id= data.id;
  //     //   alert('mail:'+id);
  //     //  alert(this.quotation.details)
  //     //   const email = {
  //     //     // role: { role: 'ADMIN' },
  //     //     to:  sessionStorage.getItem('email'),
  //     //    cc:'inouvellesolutions@gmail.com',
  //     //     templateId: 'qspecialclub',
  //     //     contentData: {
  //     //       content: {
  //     //         // message: 'Dear Sir,\n \n' +
  //     //         //   sessionStorage.getItem('name') + ' created enquiry with id :' + this.postedEnqId + ' for product -' +
  //     //         //   this.qenquiry.product + '  ' + cost + ' \nPlease Login to Printing App for Details',
  //     //         message: 'Dear Sir,\n ' +
  //     //         'Your Quotation Order confirm  with id '+id+' by '+
  //     //         // sessionStorage.getItem('name') + ' apply leave from :' + this.leave.fromdate + ' to ' +
  //     //         // this.leave.todate + ' with status Pending ',
  //     //         sessionStorage.getItem('name')+' details are as follow' ,
  //     //       },
  //     //       table:this.quotation.details,
  //     //    //   costtable: [],
  //     //       subject: 'Quotation aaproved'
  //     //     }
  //     //   };

  //     //   console.log('submiti function');
  //     //   console.log(email);
  //     //   const url = this.restService.MailRestURL('send', '');
  //     //   this.restService.postFormData(url, email).subscribe(
  //     //     (response:any) => {
  //     //       // Responce data.

  //     //       console.log('Status on Post API customer mail');
  //     //       console.log(response);
  //     //     },
  //     //     error => {
  //     //       // Error Message
  //     //       console.log('Failed to send email message to admin');
  //     //     }
  //     //   );
  //     //   return 0;
  //     // }
  //      deleteRole(id: any) {
  //        /*
  //         this.alertify.confirm("confirm it", function (e: any) {
  //                if (e) {
  //                   //okCallback();
  //                   alert("Ok");
  //                } else {alert("Cancel");
  //                }
  //            });*/

  //        /*
  //            if (confirm('Are you sure you want to delete this?')) {
  //              var url = this.restService.firmRestURL('delete', '');
  //              console.log(id);
  //              let json = '{\"id\":\"' + id + '\"}';
  //              this.restService.postFormData(url, json).subscribe(
  //                (response:any) => {
  //                  // Responce data.
  //                  console.log('Status on Post API');
  //                  console.log(response);
  //                  // window.location.reload();
  //                  this.getRoleList();
  //                  this.alertify.alert('Firm deleted Successfully')

  //                  // Now do your stuff here
  //                },
  //                error => {
  //                  // Error Message
  //                  this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
  //                    + error._body);
  //                  console.log('Error in data load.');
  //                  // Doyour stuff here
  //                }
  //              );
  //              return 0;
  //            }*/

  //        Swal.fire({
  //          title: 'Are you sure?',
  //          text: 'You will not be able to recover this data!',
  //          type: 'Warning',
  //          showCancelButton: true,
  //          confirmButtonText: 'Yes, delete it!',
  //          cancelButtonText: 'No, keep it'
  //        }).then((result) => {
  //          if (result.value) {
  //            // delete code
  //            const url = this.restService.quotaionRestURL('delete', '');
  //            console.log('Delete using this id:' + id);
  //            const json = '{\"id\":\"' + id + '\"}';
  //            this.restService.postFormData(url, json).subscribe(
  //              (response:any) => {
  //                // Responce data.
  //                console.log('Status on Post API');
  //                console.log(response);
  //                Swal.fire(
  //                  'Deleted!',
  //                  'Your data has been deleted.',
  //                  'success'
  //                )
  //                this.getData();
  //                // Now do your stuff here
  //              },
  //              error => {
  //                // Error Message
  //                Swal.fire(
  //                  error.statusText,
  //                  error._body,
  //                  'error'
  //                );
  //                console.log('Error in data load.');
  //                // Doyour stuff here
  //              }
  //            );

  //            // delete code end
  //            // For more information about handling dismissals please visit
  //            // https://sweetalert2.github.io/#handling-dismissals
  //          } else if (result.dismiss === Swal.DismissReason.cancel) {
  //            Swal.fire(
  //              'Cancelled',
  //              'Your data is safe :)',
  //              'error'
  //            );
  //          }
  //        })
  //      }

  //      private getStationary() {
  //       // Get Information from JSON REST api
  //       var url = this.restService.stationaryRestURL('', '');
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.restService.getJSONFromURL(response);
  //           this.stationarydata = response;
  //           console.log(response);

  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }


  //     private getwholeseller() {
  //       // Get Information from JSON REST api
  //       var url = this.restService.wholesalerRestURL('', '');
  //       this.restService.getJSONFromURL(url).subscribe(
  //         (response:any) => {
  //           this.restService.getJSONFromURL(response);
  //           this.wdata = response;
  //           console.log(response);
  //         },
  //         error => {
  //           console.log('Error in data load.');
  //         }
  //       );
  //     }


  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }



  public getpackageeno() {
    // http://localhost:8090/SmartSupplyManager/rest/packentry/newpkgno?firm=1
    const url = this.restService.packingRestURL('newpackageno', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.packageno = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  delete(id: any) {


   // const url = this.restService.packingRestURL('delete', id);
    // console.log('Delete using this id:' + id);
    // const json = '{\"id\":\"' + id + '\"}';
    // this.restService.deleteFormData(url).subscribe(
    //   (response:any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Swal.fire(
    //     //   'Deleted!',
    //     //   'Your data has been deleted.',
    //     //   'success'
    //     // );
    //     alert('deleted');
    //     this.getData();
    //     // if (this.detailFlag) {
    //     //   this.cancel();
    //     // }
    //     // Now do your stuff here
    //   },
    //   error => {
    //     // Error Message
    //     // Swal.fire(
    //     //   error.statusText,
    //     //   error._body,
    //     //   'error'
    //     // );
    //     alert('error');
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
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
        const url = this.restService.packingRestURL('delete', id);
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getData();
            if (this.detailFlag) {
              this.cancel();
            }
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

}
