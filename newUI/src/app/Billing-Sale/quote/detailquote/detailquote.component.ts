import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RestService } from '../../../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-detailquote',
  templateUrl: './detailquote.component.html',
  styleUrls: ['./detailquote.component.css']
})

export class DetailquoteComponent implements OnInit {
  // private alertify = require('alertify.js');
   private title = '';
   private subtitle = '';
   private isManageState = true;
   private datalist;
   public userType;
   public statelist = [];
   public citylist = [];
   public file;
   public quoteid;
   public id;
   private member = {
     role: '',
     };

   public document;
   public firmid;

   private quote = {
    firm:sessionStorage.getItem('firm'),
    quotenum:'',
    quotedate:new Date(),
    invoicedate:new Date(),
    saletype:'',
    entrytype:'',
    customer:'',
    custname:'',
    financename:'',
    pricetype:'',
    expdelivery:'',
    custmobile:'',
    isinsured:'YES',
    insurance : {
          firm:sessionStorage.getItem('firm'),
          customer:'',
          custname:'',
          insurername:'',
          policynum:'',
          startdate:'',
          enddate:''},

    salesman:'',
    salesmanname:'',
    qcost:{
      baseprice:0,
      insurance:0,
      yearsinsured:0,
      extwarranty:0,
      exchgvalue:0,
      gstamt:0,
      balanceamt:0,
      quoteamt:0,
      finalamt:0
      },
    hypothecation:'',
    isexchg:'NO',
    exchange :
        {
        model:'',
        yrofmfg:'',
        regno:'',
        exchgvalue:''
      },
    totalprods:'',
    comments:'',
    status:'',
    isstockselected:'NO',
    paystatus:'',
    paymentmode:'',
    invoicenum:'',
    consignee:'',
    consigneename:'',

    qsentry:[]

    };

  public  qsentry={
      servicing_job:'',
      product:'',
      pname:'',
      hsncode:'',
      qty:'',
      gst:'',
      gstamt:0,
      amount:0,
      iswarranty:'',
      warranty:{
        firm:sessionStorage.getItem('firm'),
        invoicenum :'',
        customer:'',
          custname:'',
        pname:'',
        startdate:'',
        enddate:'',
        duration:'',
        amount:''
    },
      rateperunit:'',
      discount:0,
      taxableval:0,
      finalamt:0,
      stockids:[]
        }

public stockids={
  lotno:'',
  stockid:''
}


   // public docServer = this.restService.docServer;

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

   constructor(
     private route: Router,
     private restService: RestService,
     private routprms: ActivatedRoute
   ) { }

   cancel() {
     // goBack code fro cancel button
     window.history.back();
   }
  //  ngOnInit() {
  //    /* this.alertify.confirm('Are you sure?').then(
  //        function onOk() {alert("Ok");},
  //        function onCancel() { alert("Cancel");}
  //    );*/
  //    if (this.routprms.snapshot.params['id']) {
  //      this.id = this.routprms.snapshot.params['id'];

  //    }


  //    console.log('adadad');
  //    this.url = this.route.url;
  //    console.log(this.route.url);

  //    if (this.route.url === '/addfirm') {
  //      this.title = 'Add Firm';
  //      this.subtitle = 'Fill new firm information and submit.';
  //      this.isManageState = false;

  //    } else if (this.route.url === '/editfirm/' + this.id) {
  //      this.title = 'Edit Firm';
  //      this.subtitle = 'Update firm information and submit.';
  //      this.isManageState = false;
  //      this.isUpdate = true;
  //      this.getFirm();
  //    } else {
  //      this.title = 'Manage Firm';
  //      this.subtitle = 'Manage firm information including view, add, update and delete';
  //     // this.userType = Cookie.getAll()['role'];
  //      this.getRoleList();
  //    }
  //  }
   ngOnInit() {

    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }


    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);


      this.title = 'Quotation Details';
      this.subtitle = 'Manage firm information including view, add, update and delete';
     // this.userType = Cookie.getAll()['role'];
      this.getquotationbyid();

  }
   private getquotationbyid() {
   // Get Information from JSON REST api
   var url = this.restService.quoteRestURL('details', this.id);
     this.restService.getJSONFromURL(url).subscribe(
       (response : any) => {
         this.restService.getJSONFromURL(response);
         this.quote = response;
         this.quoteid=response.id;
         this.getqsentrybyquoteid();
         console.log(response);
       },
       error => {
         console.log('Error in data load.');
       }
     );
   }

 public getqsentrybyquoteid()
   {
   // http://localhost:8090/SmartSupplyManager/rest/quote/entry?quote=113
   var url = this.restService.quoteRestURL('qsentrybyquoteid', this.quoteid);
   this.restService.getJSONFromURL(url).subscribe(
     (response : any) => {
       this.restService.getJSONFromURL(response);
       this.quote.qsentry = response;

       console.log(response);
     },
     error => {
       console.log('Error in data load.');
     }
   );
 }



 }