import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */
 import { RestService } from './../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})


export class QuoteComponent implements OnInit {

  // private alertify = require('alertify.js');
   private title = '';
   private subtitle = '';
   private isManageState = true;
   private datalist;
   private catList;
   public userType;
   public statelist = [];
   public citylist = [];

   public enable = {
    insurance : 'NO',
    customer : 'NO',
    employee : 'NO',
    product : 'NO',
    exchange : 'NO',
    warranty : 'NO',
    servicing : 'NO',
    jobcard : 'NO',
    crm : 'NO',
    campaign : 'NO',
  };


   public id;
   public stockdata;
  public prodList;
  public custList;
  public emplist;
  public todaydate=this.todatDate();
  public insurerlist;

   private quote = {
    firm: sessionStorage.getItem('firm'),
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
          firm: sessionStorage.getItem('firm'),
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
        firm: sessionStorage.getItem('firm'),
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

public temparry ={
  lotno:'',
  stockid:''
}


   public extwarranty=0;
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

   cancel() {
     // goBack code fro cancel button
     window.history.back();
   }
   ngOnInit() {

    this.system_config();
     if (this.routprms.snapshot.params['id']) {
       this.id = this.routprms.snapshot.params['id'];

     }


     console.log('adaded');
     this.url = this.route.url;
     console.log(this.route.url);

     if (this.route.url === '/addquote') {
       this.title = 'Add quote';
       this.subtitle = 'Fill new S information and submit.';
       this.isManageState = false;
       this.getprodList();
       this.getCustomerlist();
       this.getEmplist();
       this.getinvoiceno();
       this.getallinsurer();


     } else if (this.route.url === '/editquote/' + this.id) {
       this.title = 'Update quote';
       this.subtitle = 'Update firm information and submit.';
       this.isManageState = false;
       // this.getByid();

     } else {
       this.title = 'Manage quote';
       this.subtitle = 'Manage quote information including view, add, update and delete';
       this.userType = sessionStorage.getItem('role');
         this.getData();
     }


   }
   private getData() {

     var url = this.restService.quoteRestURL('', '');
     this.restService.getJSONFromURL(url).subscribe(
       (response:any) => {
         this.restService.getJSONFromURL(response);
         this.data = response;
         console.log(response);

       },
       error => {
         console.log('Error in data load.');
       }
     );
   }

   system_config()
   {
    if (sessionStorage.getItem('enable.insurance')) {
      this.enable.insurance = sessionStorage.getItem('enable.insurance');
    }

    if (sessionStorage.getItem('enable.customer')) {
      this.enable.customer = sessionStorage.getItem('enable.customer');
    }

    if (sessionStorage.getItem('enable.employee')) {
      this.enable.employee = sessionStorage.getItem('enable.employee');
    }

    if (sessionStorage.getItem('enable.product')) {
      this.enable.product = sessionStorage.getItem('enable.product');
      // console.log(this.enable.product);
    }

    if (sessionStorage.getItem('enable.exchange')) {
      this.enable.exchange = sessionStorage.getItem('enable.exchange');
    }

    if (sessionStorage.getItem('enable.warranty')) {
      this.enable.warranty = sessionStorage.getItem('enable.warranty');
    }

    if (sessionStorage.getItem('enable.servicing')) {
      this.enable.servicing = sessionStorage.getItem('enable.servicing');
    }

    if (sessionStorage.getItem('enable.jobcard')) {
      this.enable.jobcard = sessionStorage.getItem('enable.jobcard');
    }

    if (sessionStorage.getItem('enable.crm')) {
      this.enable.crm = sessionStorage.getItem('enable.crm');
    }

    if (sessionStorage.getItem('enable.campaign')) {
      this.enable.campaign = sessionStorage.getItem('enable.campaign');
    }

    console.log('this.enable');
    console.log(this.enable);
   }

   // updateData() {
   //   console.log('submiti function');
   //   var url = this.restService.quoteRestURL('edit', '');
   //   console.log(url);
   //   this.restService.postFormData(url, this.quote).subscribe(
   //     (response:any) => {
   //       // Responce data.
   //       console.log('Status on Post API');
   //       console.log(response);
   //       // Now do your stuff here
   //       //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
   //        Swal.fire('', '', 'success');
   //       window.scrollTo(0, 0);
   //       this.route.navigate(['/managequote']);
   //     },
   //     error => {
   //       // Error Message
   //        Swal.fire(
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

   private getByid() {
     // Get Information from JSON REST api
     let url = this.restService.quoteRestURL('details', this.id);
     this.restService.getJSONFromURL(url).subscribe(
       (response:any) => {
         console.log('Done fatching data!');
         // this.datalist = response;
         // this.getCityList(this.datalist.address.states);
        // this.quote = response;
         console.log(response);
       },
       error => {
         console.log('Error in data load.');
       }
     );
   }




   // deleteRole(id: any) {
   //   /*
   //    this.alertify.confirm("confirm it", function (e: any) {
   //           if (e) {
   //              //okCallback();
   //              alert("Ok");
   //           } else {alert("Cancel");
   //           }
   //       });*/

   //   /*
   //       if (confirm('Are you sure you want to delete this?')) {
   //         var url = this.restService.firmRestURL('delete', '');
   //         console.log(id);
   //         let json = '{\"id\":\"' + id + '\"}';
   //         this.restService.postFormData(url, json).subscribe(
   //           (response:any) => {
   //             // Responce data.
   //             console.log('Status on Post API');
   //             console.log(response);
   //             // window.location.reload();
   //             this.getRoleList();
   //             this.alertify.alert('Firm deleted Successfully')

   //             // Now do your stuff here
   //           },
   //           error => {
   //             // Error Message
   //             this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
   //               + error._body);
   //             console.log('Error in data load.');
   //             // Doyour stuff here
   //           }
   //         );
   //         return 0;
   //       }*/

   //    Swal.fire({
   //     title: 'Are you sure?',
   //     text: 'You will not be able to recover this data!',
   //     type: 'Warning',
   //     showCancelButton: true,
   //     confirmButtonText: 'Yes, delete it!',
   //     cancelButtonText: 'No, keep it'
   //   }).then((result) => {
   //     if (result.value) {
   //       // delete code
   //       const url = this.restService.quoteRestURL('delete', '');
   //       console.log('Delete using this id:' + id);
   //       const json = '{\"id\":\"' + id + '\"}';
   //       this.restService.postFormData(url, json).subscribe(
   //         (response:any) => {
   //           // Responce data.
   //           console.log('Status on Post API');
   //           console.log(response);
   //            Swal.fire(
   //             'Deleted!',
   //             'Your data has been deleted.',
   //             'success'
   //           )
   //           this.getData();
   //           // Now do your stuff here
   //         },
   //         error => {
   //           // Error Message
   //            Swal.fire(
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
   //        Swal.fire(
   //         'Cancelled',
   //         'Your data is safe :)',
   //         'error'
   //       );
   //     }
   //   })
   // }


   clearvalues()
   {
    this.qsentry.product = '';
    this.qsentry.pname = '';
    this.qsentry.hsncode = '';
    this.qsentry.qty = '';
    this.qsentry.rateperunit = '';
    this.qsentry.amount = 0;
    this.qsentry.discount = 0;
    this.qsentry.taxableval = 0;
    this.qsentry.gst = '';
    this.qsentry.gstamt = 0;
    this.qsentry.finalamt = 0;
    this.qsentry.iswarranty='';
   // this.qsentry.warranty.custname='';
  //  this.qsentry.warranty.customer='';
   // this.qsentry.warranty.pname='';
    this.qsentry.warranty.startdate='';
    this.qsentry.warranty.enddate='';
    this.qsentry.warranty.duration='';
    this.qsentry.warranty.invoicenum='';
    this.qsentry.warranty.amount='';





   }

   pushqsentry()
   {
    let flagger = true;

    for (const entry of this.quote.qsentry) {

      if (this.qsentry.product == entry.product) {

        alert('Cannot Add Duplicate Entry');
        this.clearvalues();
    //     Swal.fire('Cannot Add Duplicate Entry', '', 'error');
        flagger = false;
      }
    }

    if (flagger) {

      // if(this.qsentry.iswarranty==='NO')
      // {
      //   this.qsentry.
      // }

        const cloneProduct = JSON.parse(JSON.stringify(this.qsentry));

        this.quote.qsentry.push(cloneProduct);
        console.log('After pushing product');
        console.log(this.quote.qsentry);
        console.log('total************************88 product');

        console.log(this.quote.qsentry.length);

        this.quote.totalprods=String(this.quote.qsentry.length);

        this.calculatetotalcharges1();
        this.quotationtotal();
        this.clearvalues();



    }
   // this.warrantycase();

   }


   getquantityspare() {
    let api = 'product=' + this.qsentry.product + '&qty=' + this.qsentry.qty;
    let url = this.restService.productstockRestURL('quantityprod', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        this.stockdata = response;
        // for (let entry of this.stockdata) {
        //   const temp = {
        //     stockid: entry.id,
        //     lotno: entry.lotno
        //   };
         //this.qsentry.stockids.push(temp);
          // this.stockids.stockid='';
          // this.stockids.lotno='';

          let quesArray = [];

          console.log('this.stockdata***');
          console.log(this.stockdata);
          this.stockdata.forEach(element => {
            let objOp = new Object();
            objOp['stockid'] = element.id;
            objOp['lotno'] = element.lotno;
            console.log('obj before push');
            console.log(objOp);

            quesArray.push(objOp);
           // this.qsentry.stockids.push(objOp);


          });

          this.qsentry.stockids=quesArray;

        this.sparetotal();

        if (response.length === 0) {
          Swal.fire('Quantity is Not Available','','error');
          this.qsentry.qty = '';
          this.sparetotal();

        }

      },
      error => {
        console.log('Error in data load.');
      }
    );

  }
  private deleteNewsList(id: any, data: any) {
    const index = this.stockdata.findIndex(x => x.spare_stock === id);
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
      this.stockdata.splice(index, 1);
      console.log(index);
    } else {
      // this.accessorydetails.spare_stock=data.id;
    }

  }

  onDeletespare(i) {
    this.quote.qsentry.splice(i, 1);
    // this.recal();
    // Swal.fire('Deleted!', '', 'success');
    this.calculatetotalcharges1();
    console.log(this.quote.qsentry.length);
    this.quote.totalprods=String(this.quote.qsentry.length);



  }

  private getproduct(obj) {
    this.qsentry.pname=obj.target.options[obj.target.selectedIndex].text;

    for (let data of this.prodList) {
      if (Number(data.id) === Number(this.qsentry.product)) {

        console.log('data');
        console.log(data);
        this.qsentry.hsncode = data.hsncode;
       this.qsentry.gst = data.gst;
       this.qsentry.rateperunit = data.rateperunit;
    //   this.qsentry.gstamt = data.ratewithgst;
       this.qsentry.amount = data.purchaseprice;

       this.sparetotal();
      }
    }

    this.qsentry.warranty.pname=obj.target.options[obj.target.selectedIndex].text;

   // this. getquantityspare();
  }
  private getprodList() {
    this.prodList = [];
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        // this.restService.getJSONFromURL(response);
        this.prodList = response;
        console.log('product data available');
    //    this.getproduct();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public sparetotal() {

    this.qsentry.amount = Number(this.qsentry.qty) * Number(this.qsentry.rateperunit);
    console.log('this.qsentry.amount' + this.qsentry.amount);

    this.qsentry.taxableval = Number(this.qsentry.qty) * Number(this.qsentry.rateperunit);
    console.log('this.qsentry.amount' + this.qsentry.amount);
    // this.qsentry.gstamt = (Number(this.qsentry.total) * Number(this.qsentry.gst)) / 100;
    // console.log('this.qsentry.gstamt' + this.qsentry.gstamt);
    this.qsentry.gstamt = (Number(this.qsentry.taxableval) * Number(this.qsentry.gst)) / 100;
    console.log('this.qsentry.gstamt' + this.qsentry.gstamt);
    this.qsentry.finalamt = Number(this.qsentry.taxableval) + Number(this.qsentry.gstamt);
    console.log('this.qsentry.finalamt' + this.qsentry.finalamt);



  }

  gstspare() {


    this.qsentry.gstamt = (Number(this.qsentry.taxableval) * Number(this.qsentry.gst)) / 100;
    console.log('this.qsentry.gstamt' + this.qsentry.gstamt);
    this.qsentry.finalamt = Number(this.qsentry.taxableval) + Number(this.qsentry.gstamt);
    console.log('this.qsentry.finalamt' + this.qsentry.finalamt);
    this.qsentry.finalamt = Math.round(Number(this.qsentry.finalamt) - Number(this.qsentry.discount));
    console.log('this.qsentry.finalamt' + this.qsentry.finalamt);
  }


  calculatetotalcharges1() {
    let total = 0;
    let gsttotal = 0;
    let warrantytotal=0;
    for (let data of this.quote.qsentry) {
      total = total + data.amount;
      gsttotal = gsttotal + data.gstamt;

      if(data.iswarranty==='YES')
      {
        warrantytotal=warrantytotal+data.warranty.amount;
      }

    }


    this.quote.qcost.baseprice = total;
    this.quote.qcost.gstamt= gsttotal;
    this.quote.qcost.quoteamt = total;
    this.quote.qcost.extwarranty=warrantytotal;




   this.quotationtotal();


  }

  exchangevalue()
  {
   this.quote.qcost.exchgvalue = Number(this.quote.exchange.exchgvalue) ;
  this.quotationtotal();
  }


  quotationtotal()
  {
    //this.calculatetotalcharges1();
    this.quote.qcost.finalamt=this.quote.qcost.baseprice+this.quote.qcost.insurance
    +this.quote.qcost.extwarranty+this.quote.qcost.exchgvalue+this.quote.qcost.gstamt
    +this.quote.qcost.quoteamt+this.quote.qcost.balanceamt;
  }

   submitData() {
     for (let data of this.quote.qsentry)
     {
       if (data.iswarranty==='NO')
       {
     data.warranty['firm']='';
     data.warranty.custname='';
     data.warranty.customer='';
     data.warranty.pname='';
     data.warranty.startdate='';
     data.warranty.enddate='';
     data.warranty.duration='';
     data.warranty.invoicenum='';
     data.warranty.amount='';
       }
     }

     if(this.quote.isinsured==='NO')
     {
      this.quote.insurance['firm']='';
      this.quote.insurance['customer']='';
      this.quote.insurance['custname']='';

     }
     console.log('submiti function');
     var url = this.restService.quoteRestURL('add', '');
     console.log(url);
     console.log(this.quote);

     this.restService.postFormData(url, this.quote).subscribe(
       (response:any) => {
         // Responce data.
         console.log('Status on Post API');
         console.log(response);
         // Now do your stuff here
         Swal.fire('', '', 'success');
         window.scrollTo(0, 0);
         this.route.navigate(['/managequote']);
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

   private getCustomerlist() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.custList = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getEmplist() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.emplist = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  passcustomername(obj)
  {
    this.quote.custname=obj.target.options[obj.target.selectedIndex].text;
    this.quote.insurance.customer=this.quote.customer;
    this.quote.insurance.custname=obj.target.options[obj.target.selectedIndex].text;
    this.qsentry.warranty.customer=this.quote.customer;
    this.qsentry.warranty.custname=obj.target.options[obj.target.selectedIndex].text;
  }
  passconsignename(obj)
  {
    this.quote.consigneename=obj.target.options[obj.target.selectedIndex].text;
  }
  passsalesmanname(obj)
  {
    this.quote.salesmanname=obj.target.options[obj.target.selectedIndex].text;
  }


  public getinvoiceno() {

    var url = this.restService.quoteRestURL('qinvoicenumber', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any ) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.quote.invoicenum=response.generatednum;
     //   this.generateNewLotNo(response.generatednum);



      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getquoteno() {

    var url = this.restService.quoteRestURL('quotenumber', this.quote.entrytype);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any ) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.quote.quotenum=response.generatednum;
     //   this.generateNewLotNo(response.generatednum);



      },
      error => {
        console.log('Error in data load.');
      }
    );

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

  public getallinsurer() {
    // Get Information from JSON REST api
    const url = this.restService.insurerRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.insurerlist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
 }
