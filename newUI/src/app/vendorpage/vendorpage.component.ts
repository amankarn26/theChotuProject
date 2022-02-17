import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
import {  Color } from 'ng2-charts';
declare var Swal: any;

//import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';


@Component({
  selector: 'app-vendorpage',
  templateUrl: './vendorpage.component.html',
  styleUrls: ['./vendorpage.component.css']
})
export class VendorpageComponent implements OnInit {



  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

    public docServer = this.restService.docServer;

    piedata=[];

    public freqdata = [];

  public filterQuery = '';
  public filterQuery1 = '';

  public rowsOnPage = 5;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data=[];

  public vendorstatsdata;
public vendorstats;

 public deliveredorders=[];
 public placedorders=[];
 public packedorders=[];
public popularproducts=[];
public pickuporders=[];
public id =sessionStorage.getItem('id');

  username=sessionStorage.getItem('name');


  private quoteStat=[];

  public barChartColors: Color[] = [
    { backgroundColor: 'lightblue' },
    
  ]

  public barChartLabels: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    /*   { data: [65, 59, 80, 81, 56, 55, 40, 50, 100, 80, 50, 90], label: 'Revenue' },
       { data: [28, 1, 10, 19, 12, 20, 0, 2, 20, 30, 0, 5], label: 'Maintenance' }*/
    { data: [65, 59, 80, 81], label: 'Sale' },
     { data: [28, 1, 10, 19], label: 'Bookings' },
    // { data: [65, 140, 100, 120], label: 'Employee' }
  ];


  public barChartLabels1: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartData1: any[] = [
    { data: [65, 59, 80, 81], label: 'Orders' },
   //  { data: [28, 1, 10, 19], label: 'Booking' },
  ];

  public barChartLabels2: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartData2: any[] = [
    { data: [65, 59, 80, 81], label: 'Sales' },
    //  { data: [28, 1, 10, 19], label: 'Value' },
  ];



  public barChartLabels3: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartData3: any[] = [
    { data: [65, 59, 80, 81], label: 'Servicing' },
     { data: [28, 1, 10, 19], label: 'Value' },
  ];

  // public barChartData: any[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'CASES' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'PORTFOLIO' }
  // ];

  private caseData = []; // getting case counts for bar chart
  private portfolioData = []; // getting portfolio counts for bar chart
  private joiningData = [];
  private leavingData = [];
  private employeeData = [];


  // lineChart
  public lineChartData: Array<any> = [
    { data: [28, 1, 10, 19, 28, 1, 10], label: 'Expense' },
    { data: [65, 59, 80, 81, 65, 59, 80], label: 'Income' }

  ];
  // income and expense
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';
public orderstats=[];

private qValue1=[];

private qValue=[];


//public quoteStat=[]

public saledata=[];

private mcaseState;

public toprevenue=[];


 // Doughnut Chart
 public doughnutChartLabels: string[] = [];
 // ['Temporary', 'Trainee', 'Permanent', 'Internship'];  'Leaflet', 'Brochure','Visiting Cards','Doctor File'
 public doughnutChartData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
 // [100000, 40000, 60000, 10000]; // [];//[1, 2, 0,3];
 public doughnutChartType: string = 'doughnut';


 public doughnutChartOptions: any = {
   scaleShowVerticalLines: false,
   responsive: true
 };

 public userType=sessionStorage.getItem('type');
 public userRole=sessionStorage.getItem('role');
 idfromadmin;


 public adminselect;
 public vendorselect;
 public deliveryselect;

 firmlist=[];

 public selectdelivery;
 public selectfirm;


  ngOnInit() {

if(this.route.url === '/vendorhomepage')
{
  if(this.userRole === 'SUPERADMIN')
  {
    this.getallfirm();
    this.id = sessionStorage.getItem('idfromadmin');
    this.username =sessionStorage.getItem('usernamefromadmin');
    this.selectfirm =sessionStorage.getItem('idfromadmin');
    this.vendorselect=true;
  }
  this.getvendororderstats();
  this.getorderStateList();
  this.getProductStats();
  this.getrevenuestats();
}

    this.getplacedorders();
    this.getpackedorders();
    this.getpickuporders();
    this.getdeliveredorders();
    this.getpopularproducts();
    this.getorderstats();
    this.getfreqorders() ;


  }

  public chartClicked(e: any): void {
    console.log('Cart click');
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public getplacedorders()
  {
    const url = this.restService.OrdersRestURL('orderbystatus', 'PLACED');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.placedorders = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getpackedorders()
  {
    const url = this.restService.OrdersRestURL('orderbystatus', 'PACKED');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.packedorders = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getpopularproducts()
  {
    const url = this.restService.compactRestURL('popularproductsbyfirm', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.popularproducts = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getorderstats()
  {
    const url = this.restService.compactRestURL('vendorstats', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.vendorstats = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getpickuporders()
{
  const url = this.restService.OrdersRestURL('orderbystatus', 'PICKED_UP');
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.pickuporders = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

public getdeliveredorders()
{
  const url = this.restService.OrdersRestURL('orderbystatus', 'DELIVERED');
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.deliveredorders = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}
orderpacked(data: any)
{
  const order_update={
    id:data.id,
    status:'PACKED'

  }
  

  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.OrdersRestURL('update', '');
  this.restService.postFormData(url, order_update).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Order is Successfully Packed', '', 'success');
      this.sendcommonNotify(data);
      this.alltypesoforders();
     // this.route.navigate(['/all_orders']);
      window.scrollTo(0, 0);

    },
    error => {
      // Error Message
      Swal.fire(
        error.statusText,
        error._body,
        'error'
      )
      console.log('Error in data load.');
      // Doyour stuff here
    }
  );
  return 0;
}

private getfreqorders() {
  // Get Information from JSON REST api

  var url = this.restService.OrdersRestURL('freqorderbyfirm', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response :any) => {
      this.restService.getJSONFromURL(response);
      this.freqdata = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

alltypesoforders()
{
  this.getplacedorders();
  this.getpackedorders();
  this.getpickuporders();
  this.getdeliveredorders();
  this.getpopularproducts();
  this.getfreqorders() ;
  this.getorderstats();
}






    sendcommonNotify(data:any ) {

      let bulk = [];
      // const refundvalue = (2/100) * Number(data.qcost.finalamt);
      // console.log(refundvalue.toFixed(2));
      // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);
      
      
      
      const message = 'Order Number '+ data.invoicenum+ ' has been Packed by the Branch';
      
      const mobile = data.custmobile; // localStorage.getItem('phone');
      const smsdata = {
      id:data.customer,
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
      };
      
      bulk.push(smsdata);
      
      // const message1 = 'Molecule: Order Number '+ data.invoicenum+ '  has been Packed by the Vendor';
      
      // const mobile1 = '0000000000';
      // const smsdata1 = {
      // id:data.firm,
      // toMobile: mobile1,
      // message: message1,
      // notificationFor: 'FIRM'
      // };
      
      // bulk.push(smsdata1);
      
      
      const message2 = 'Order Number '+ data.invoicenum+ '  has been Packed by the Branch. Please Collect the Parcel';

      
      const mobile2 = '0000000000'; // data.custmobile; // localStorage.getItem('phone');
      const smsdata2 = {
      id:data.deliverypool,
      toMobile: mobile2,
      message: message2,
      notificationFor: 'DELIVERY_PERSON'
      };
      
      // bulk.push(smsdata2);
      // console.log('sending notification');
      console.log(bulk);
      const url = this.restService.notifyRestURL('sendM', '');
      console.log(url);
      this.restService.postFormData(url, bulk).subscribe(
      response => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      },
      error => {
      console.log('Error in SMS.');
      }
      );
      return 0;
      }


      acceptOrder(id:number)
{

  const order_update={
    id:id,
    isvendoraccept:'YES'

  }

  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.OrdersRestURL('update', '');
  this.restService.postFormData(url, order_update).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Order is Successfully Packed', '', 'success');
     this.alltypesoforders();
      this.route.navigate(['/all_orders']);
      window.scrollTo(0, 0);

    },
    error => {
      // Error Message
      Swal.fire(
        error.statusText,
        error._body,
        'error'
      )
      console.log('Error in data load.');
      // Doyour stuff here
    }
  );
  return 0;
}

RejectOrder(data: any) {



  var refundvalue = (2/100) * data.qcost.finalamt ;
  console.log(refundvalue.toFixed(2));

   var totalrefund = data.qcost.finalamt - refundvalue;

   const order_update={
    id:data.id,
    status:'CANCELLED',
    qcost: {
      refundamt:data.qcost.finalamt
    }


  }

  Swal.fire({
    title: 'Do you want to cancel your Order',
    // text: 'You will not be able to recover this data!',
    html: '<b style="display: block;font-weight: bold;color: red;"> 2 % will be deducted from your Next order Settelment, deducted amount will be '+refundvalue.toFixed(2)+' /- </b>' ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Cancel it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      // delete code

      const url = this.restService.OrdersRestURL('update', '');
      this.restService.postFormData(url,order_update).subscribe(
        (response:any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          Swal.fire(
            'Order is Successfully Cancelled!',
            '',
            'success'
          )
          this.alltypesoforders();
    this.sendcancelnotify(data);

        },
        error => {
          // Error Message
          /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
             + error._body); */
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
      // Swal.fire(
      //   'Cancelled',
      //   'Your data is safe :)',
      //   'error'
      // );
    }
  });
  }

  
  sendcancelnotify(data:any ) {

    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);
    
    
    
    const message = 'Order Number '+ data.invoicenum+ ' has been Cancelled by the Branch, Sorry for the inconvenience. Your amount will be refunded shortly.';
    
    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
    id:data.customer,
    toMobile: mobile,
    message: message,
    notificationFor: 'CUSTOMER'
    };
    
    bulk.push(smsdata);
    
    // const message1 = 'Molecule: Order Number '+ data.invoicenum+ '  has been Packed by the Vendor';
    
    // const mobile1 = '0000000000';
    // const smsdata1 = {
    // id:data.firm,
    // toMobile: mobile1,
    // message: message1,
    // notificationFor: 'FIRM'
    // };
    
    // bulk.push(smsdata1);
    
    
    const message2 = 'Order Number '+ data.invoicenum+ '  has been Cancelled by the Branch.';
  
    
    const mobile2 = '0000000000'; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
    id:data.deliverypool,
    toMobile: mobile2,
    message: message2,
    notificationFor: 'DELIVERY_PERSON'
    };
    
    bulk.push(smsdata2);
    // console.log('sending notification');
    console.log(bulk);
    const url = this.restService.notifyRestURL('sendM', '');
    console.log(url);
    this.restService.postFormData(url, bulk).subscribe(
    response => {
    // Responce data.
    console.log('Status on Post API');
    console.log(response);
    },
    error => {
    console.log('Error in SMS.');
    }
    );
    return 0;
    }

  /////////////////////////////////////////////////////////////Statiss starting////////////////////////////////////////////////////////////////////////////

  public getProductStats() {
    const url = this.restService.statsRestURL('product', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        console.log('Getting all product');
        for (let entry of response) {
          console.log(entry); // 1, "string", false
          this.doughnutChartLabels.push(entry.name);
       // this.doughnutChartData.push(entry.qCount);
         this.piedata.push(entry.count);
         // this.piedata.push(100);
        }

        console.log('Getting Data For Pie Cahrt');

     
        this.randomize();

      
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
    
  getvendororderstats()
{
  var url = this.restService.statsRestURL('vendororderstats', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response :any) => {
      this.restService.getJSONFromURL(response);
      this.vendorstatsdata = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

public randomize(): void {

      let clone1 = JSON.parse(JSON.stringify(this.barChartData1));
      clone1[0].data = this.orderstats;
 //     clone1[1].data = this.qValue1;
  
      this.barChartData1 = clone1;
      console.log('clonedf rom quotation stat and quotation value:');
      console.log(clone1);

      let clone2 = JSON.parse(JSON.stringify(this.barChartData2));
      clone2[0].data = this.qValue1;
 //     clone1[1].data = this.qValue1;
  
      this.barChartData2 = clone2;
      console.log('clonedf rom quotation stat and quotation value:');
      console.log(clone1);

      const clon = JSON.parse(JSON.stringify(this.barChartData));
      clon[0].data = this.piedata;
      this.doughnutChartData = clon;

    }

  public getorderStateList() {
   
    
   
        var url = this.restService.statsRestURL('monthlyvendororders', sessionStorage.getItem('firm'));
        this.restService.getJSONFromURL(url).subscribe(
          (response : any) => {
            this.restService.getJSONFromURL(response);
              this.mcaseState = response;
            let joingingDataa;
            joingingDataa = response;
            console.log('barcjart 222222222222222222222222222222222222222222222222222222222222');
            console.log(response);
    

            const data = response;
    
            this.saledata = response;
    
        this.generatbooksalecount();
        this.generatbooksalevalue();
          },
          error => {
            console.log('Error in data load.');
          }
        );
      }
    
    
     generatbooksalecount(){
    
    
            this.barChartLabels1.push(this.saledata[0].month.substring(0, 3) + ' ' + this.saledata[0].year);
         //   this.orderstats.push(10);
             this.orderstats.push(this.saledata[0].count);
    
            this.qValue1.push(this.mcaseState[0].qvalue);
    
    
    
    
            this.barChartLabels1.push(this.saledata[1].month.substring(0, 3) + ' ' + this.saledata[1].year);
            this.orderstats.push(this.saledata[1].count);
            this.qValue1.push(this.mcaseState[1].qvalue);
            this.barChartLabels1.push(this.saledata[2].month.substring(0, 3) + ' ' + this.saledata[2].year);
            this.orderstats.push(this.saledata[2].count);
            this.qValue1.push(this.mcaseState[2].qvalue);
    
            this.barChartLabels1.push(this.saledata[3].month.substring(0, 3) + ' ' + this.saledata[3].year);
            this.orderstats.push(this.saledata[3].count);
            this.qValue1.push(this.mcaseState[3].qvalue);
    
            this.barChartLabels1.push(this.saledata[4].month.substring(0, 3) + ' ' + this.saledata[4].year);
            this.orderstats.push(this.saledata[4].count);
            this.qValue1.push(this.mcaseState[4].qvalue);
    
            this.barChartLabels1.push(this.saledata[5].month.substring(0, 3) + ' ' + this.saledata[5].year);
            this.orderstats.push(this.saledata[5].count);
            this.qValue1.push(this.mcaseState[5].qvalue);
    
            this.barChartLabels1.push(this.saledata[6].month.substring(0, 3) + ' ' + this.saledata[6].year);
            this.orderstats.push(this.saledata[6].count);
            this.qValue1.push(this.mcaseState[6].qvalue);
    
            this.barChartLabels1.push(this.saledata[7].month.substring(0, 3) + ' ' + this.saledata[7].year);
            this.orderstats.push(this.saledata[7].count);
            this.qValue1.push(this.mcaseState[7].qvalue);
    
            this.barChartLabels1.push(this.saledata[8].month.substring(0, 3) + ' ' + this.saledata[8].year);
            this.orderstats.push(this.saledata[8].count);
            this.qValue1.push(this.mcaseState[8].qvalue);
    
            this.barChartLabels1.push(this.saledata[9].month.substring(0, 3) + ' ' + this.saledata[9].year);
            this.orderstats.push(this.saledata[9].count);
            this.qValue1.push(this.mcaseState[9].qvalue);
    
            this.barChartLabels1.push(this.saledata[10].month.substring(0, 3) + ' ' + this.saledata[10].year);
            this.orderstats.push(this.saledata[10].count);
            this.qValue1.push(this.mcaseState[10].qvalue);
    
            console.log('barcjartxyz lables');
            console.log( this.barChartLabels1);
    
            console.log('barcjart lables q value');
            console.log( this.qValue1);
    
            this.randomize();
     }
    
     generatbooksalevalue(){
    
    
          this.barChartLabels.push(this.mcaseState[0].month.substring(0, 3) + ' ' + this.mcaseState[0].year);
          //this.quoteStat.push(6000);
          this.quoteStat.push(this.saledata[0].qvalue);
           this.qValue.push(this.mcaseState[0].qvalue);
    
          this.barChartLabels.push(this.mcaseState[1].month.substring(0, 3) + ' ' + this.mcaseState[1].year);
          this.quoteStat.push(this.saledata[1].qvalue);
         this.qValue.push(this.mcaseState[1].qvalue);
          this.barChartLabels.push(this.mcaseState[2].month.substring(0, 3) + ' ' + this.mcaseState[2].year);
          this.quoteStat.push(this.saledata[2].qvalue);
         this.qValue.push(this.mcaseState[2].qvalue);
    
    
          this.barChartLabels.push(this.mcaseState[3].month.substring(0, 3) + ' ' + this.mcaseState[3].year);
          this.quoteStat.push(this.saledata[3].qvalue);
           this.qValue.push(this.mcaseState[3].qvalue);
    
          this.barChartLabels.push(this.mcaseState[4].month.substring(0, 3) + ' ' + this.mcaseState[4].year);
          this.quoteStat.push(this.saledata[4].qvalue);
          this.qValue.push(this.mcaseState[4].qvalue);
    
          this.barChartLabels.push(this.mcaseState[5].month.substring(0, 3) + ' ' + this.mcaseState[5].year);
          this.quoteStat.push(this.saledata[5].qvalue);
          this.qValue.push(this.mcaseState[5].qvalue);
    
          this.barChartLabels.push(this.mcaseState[6].month.substring(0, 3) + ' ' + this.mcaseState[6].year);
          this.quoteStat.push(this.saledata[6].qvalue);
          this.qValue.push(this.mcaseState[6].qvalue);
    
          this.barChartLabels.push(this.mcaseState[7].month.substring(0, 3) + ' ' + this.mcaseState[7].year);
          this.quoteStat.push(this.saledata[7].qvalue);
          this.qValue.push(this.mcaseState[7].qvalue);
    
          this.barChartLabels.push(this.mcaseState[8].month.substring(0, 3) + ' ' + this.mcaseState[8].year);
          this.quoteStat.push(this.saledata[8].qvalue);
          this.qValue.push(this.mcaseState[8].qvalue);
    
          this.barChartLabels.push(this.mcaseState[9].month.substring(0, 3) + ' ' + this.mcaseState[9].year);
          this.quoteStat.push(this.saledata[9].qvalue);
          this.qValue.push(this.mcaseState[9].qvalue);
    
          this.barChartLabels.push(this.mcaseState[10].month.substring(0, 3) + ' ' + this.mcaseState[10].year);
          this.quoteStat.push(this.saledata[10].qvalue);
          this.qValue.push(this.mcaseState[10].qvalue);
          this.randomize();
    }



  getrevenuestats()
{
  var url = this.restService.statsRestURL('revenuestats', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response :any) => {
      this.restService.getJSONFromURL(response);
      this.toprevenue = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


getallfirm(){
  this.vendorselect=true;

  var url = this.restService.firmRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.firmlist = response;
    
      
    },
    error => {
      console.log('Error in data load.');
    }
  );
this.adminselect=null;
this.deliveryselect=null;

}

getalldp(){
  this.vendorselect=false;

  var url = this.restService.delivertypoolRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.firmlist = response;
    
      
    },
    error => {
      console.log('Error in data load.');
    }
  );
  this.adminselect=null;
  this.vendorselect=null;

}

vendorstatdataseleted(id:any, event:any)
{

console.log(id);
console.log(event.target.options[event.target.selectedIndex].text);
var name = event.target.options[event.target.selectedIndex].text;
sessionStorage.setItem('idfromadmin',id);
sessionStorage.setItem('usernamefromadmin',name);

this.ngOnInit();
}

adminstats()
{
this.route.navigate(['/adminhome']);
}
}
