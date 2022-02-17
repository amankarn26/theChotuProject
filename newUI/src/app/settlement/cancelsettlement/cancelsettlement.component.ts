import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-cancelsettlement',
  templateUrl: './cancelsettlement.component.html',
  styleUrls: ['./cancelsettlement.component.css']
})

export class CancelsettlementComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

    public tab1 = false;
    public title = '';
    public subtitle = '';
    //public alertify = require('alertify.js');
    public flag = false;
    public activepage=false;
    public docServer = this.restService.docServer;
  
   // for datatable
   public filterQuery = '';
   public rowsOnPage = 5;
   public sortBy = 'role';
   public sortOrder = 'asc';
   public data=[];

   public statusdelivery;

   public statusresponse;
  
   public fromDatee='';
   public toDatee='';
   
   public deliveredorders=[];
   public placedorders=[];
   public packedorders=[];
   public pickuporders=[];
  
   public refundedorders=[];
  
   public customdate;
   public customdate1;


  //  public orders;

  public orderids=[19241,19214,14781,1245];

  
  public userType = sessionStorage.getItem('type');
  public userRole = sessionStorage.getItem('role');
  
  public employees = [];
  
  public selectedorders=[];
  selectstatus ='REFUNDED'
  
  public firm;
  public firmlist=[];
  
  
   public id;
     public isUpdate = false;

     public todayspayableorders= [];
     public todaysreceivedorders= [];


  ngOnInit() {

    this.gettodayspayable();
    this.gettodaysreceived();

  }


  public gettodayspayable()
  {
    this.customdate=undefined;
    this.restService.enableloading();
  var url = this.restService.delivertypoolRestURL('todayspayableCustomer', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todayspayableorders = response.order;
    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }
  
  public gettodaysreceived()
  {
    this.customdate1=undefined;

    this.restService.enableloading();

  var url = this.restService.delivertypoolRestURL('todaysreceivedCustomer', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todaysreceivedorders = response.order;
    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }



  private searchdayspayable() {
    this.restService.enableloading();

    if(this.fromDatee ==='' || this.toDatee ==='')
    {
Swal.fire('From date or To date is NULL','please fill the data','error')
    }
    else{


   
    const fdate = this.fromDatee;
    const todate = this.toDatee;
//http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20 

    var api = '/payable?fromdate=' + fdate + '&todate=' + todate;
    var url = this.restService.delivertypoolRestURL('cancelbydate',api);
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
      
        this.restService.getJSONFromURL(response);
      
        console.log(response);
        this.todayspayableorders=response.order;
    this.restService.disableloading();

       
      },
      error => {

        console.log('Error in data load.');
    this.restService.disableloading();

       // this.isLoader = false;
        // this.isLoader = false;
        // alert('false2='+this.isLoader);
      }
    );
  }
}

private searchdaysreceived() {
  this.restService.enableloading();

  if(this.fromDatee ==='' || this.toDatee ==='')
  {
Swal.fire('From date or To date is NULL','please fill the data','error')
  }
  else{


 
  const fdate = this.fromDatee;
  const todate = this.toDatee;
//http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20 

  var api = '/received?fromdate=' + fdate + '&todate=' + todate;
  var url = this.restService.delivertypoolRestURL('cancelbydate',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);
      this.todaysreceivedorders=response.order;
    this.restService.disableloading();

     
    },
    error => {

      console.log('Error in data load.');
    this.restService.disableloading();
      
     // this.isLoader = false;
      // this.isLoader = false;
      // alert('false2='+this.isLoader);
    }
  );
}
}
examp()
{
  var json = {

    isvendorpaid :'YES',
    orderids:this.orderids
  }

  console.log(json);
}


getvendororders(data: any)
{

  console.log(data);
const json = {
  order:data
}
//get orders
 // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL('getvendororders', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.data=response;
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
      //  Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.tab1= true;
        //this.route.navigate(['/vendor_settlement_orders']);
       
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
  this.tab1=false;
}


cancelledpaidorders(data: any)
{

  console.log(data);
const json = {
  id:data,
  status:'REFUNDED'
}
//get orders
 // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL('update', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        Swal.fire('Order Refunded', '', 'success');
        window.scrollTo(0, 0);
      this.gettodayspayable();
      this.gettodaysreceived();
     // document.getElementById("myCheck").checked = true;
     // document.getElementById("myCheck1").checked = true;


       
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

changestatus(data:any)
{
  console.log(data);
const json = {
  status:'PAID',
  order:data
}
//get orders
 // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL('bulkstatus', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
      //  Swal.fire(' Paid', '', 'success');
        window.scrollTo(0, 0);
    //  this.gettodayspayable();
    //  this.gettodaysreceived();
this.statusdelivery=response[0].dperson;
this.statusresponse=response;
      document.getElementById('id01').style.display='block'
       
      },
      error => {
        // Error Message
        // Swal.fire(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        document.getElementById('id01').style.display='block'

        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;

}
getyestspayable()
{
  this.customdate=undefined;

  this.restService.enableloading();

  var url = this.restService.delivertypoolRestURL('yestpayableCustomer', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todayspayableorders = response.order;
    //    this.totalpayamount =response.totalamount;

    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
}
getyestreceieved()
{
  this.customdate1=undefined;

  this.restService.enableloading();

  var url = this.restService.delivertypoolRestURL('yestreceivedCustomer', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todaysreceivedorders = response.order;
     //   this.totalrecamount =response.totalamount;

    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
}

public gettodaysdate()
{
  var url = this.restService.docsRestURL('todaysdate', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      const res =response;
      
      this.fromDatee =response.firstdate.substring(10,0);
      this.toDatee =response.currentdate.substring(10,0);
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}

}