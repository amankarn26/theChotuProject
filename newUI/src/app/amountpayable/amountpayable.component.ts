import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-amountpayable',
  templateUrl: './amountpayable.component.html',
  styleUrls: ['./amountpayable.component.css']
})
export class AmountpayableComponent implements OnInit {
  // branch: string;

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

    public firm = sessionStorage.getItem('firm')
    public branch = sessionStorage.getItem('branch')
    public title = '';
    public subtitle = '';

    public docServer = this.restService.docServer;

    public userType = sessionStorage.getItem('type');
    public userRole = sessionStorage.getItem('role');
    
    // for datatable
    public filterQuery = '';
    public rowsOnPage = 10;
    public sortBy = 'role';
    public sortOrder = 'asc';
    public data=[];
    public totalamount;
    public fromDatee='';
    public toDatee='';
    public customdate;
    public selectbranch;
    public branchlist=[];

    

   

  ngOnInit() {

    if (this.route.url === '/manage_amountpayable') {
    this.title = 'Manage Amount Payable Orders';
    this.subtitle = 'Fill New Rate Label Information And Submit.';
   



   if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
   {
     this.getallbranch();
   }
else{
   this.getamountpayablemonth();
}

     }
      else {
      this.title = 'Manage Amount Recieved Orders ';
      this.subtitle = 'Manage  Rate Label information including view, add, update and delete';

      if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
      {
        this.getallbranch();
      }
   else{
      this.getamountpayablemonth();
   }
  }
  }

  changemonth(str: string) {
    if (str === 'c') {
      console.log('current month');
      this.getamountpayablemonth();
     this.customdate=null;
    }

  if (str === 'w') {
      console.log('WEEK');
     
      this.getamountpayableweek();
     this.customdate=null;

      


    }
    if (str === 't') {

      console.log('today');
      this.getamountpayabletoday()
     this.customdate=null;

    }
    if (str === 'l') {

      console.log('last month');
      this.getamountpayablelastmonth();
     this.customdate=null;

    }
  }


  public getamountpayablemonth() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?firm=19341&type=TODAY
    this.restService.enableloading();

    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
     // alert(this.selectfirm);
      var api = '?branch='+this.selectbranch+'&type=THISMONTH'
    }
    else
    {
      var api = '?branch='+this.firm+'&type=THISMONTH'
    }
  

    if(this.route.url === '/manage_amountpayable')
    {
      var url = this.restService.OrdersRestURL('accountspayable',api);
    }
    else{
      var url = this.restService.OrdersRestURL('accountsreceived',api);
    }
    
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.totalamount=response.amount
        this.data = response.order;
    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }

  public getamountpayablelastmonth() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?firm=19341&type=TODAY
    this.restService.enableloading();


    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
      var api = '?branch='+this.selectbranch+'&type=LASTMONTH'
    }
    else
    {
      var api = '?branch='+this.firm+'&type=LASTMONTH'
    }

  

    if(this.route.url === '/manage_amountpayable')
    {
      var url = this.restService.OrdersRestURL('accountspayable',api);
    }
    else{
      var url = this.restService.OrdersRestURL('accountsreceived',api);
    }
    
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.totalamount=response.amount
        this.data = response.order;
    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }


  public getamountpayableweek() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?firm=19341&type=TODAY
    this.restService.enableloading();

   
    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
      var api = '?branch='+this.selectbranch+'&type=THISWEEK'
    }
    else
    {
      var api = '?branch='+this.firm+'&type=THISWEEK'
    }


    if(this.route.url === '/manage_amountpayable')
    {
      var url = this.restService.OrdersRestURL('accountspayable',api);
    }
    else{
      var url = this.restService.OrdersRestURL('accountsreceived',api);
    }
    
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.totalamount=response.amount
        this.data = response.order;
    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }

  public getamountpayabletoday() {

    //http://localhost:8090/SmartSupplyManager/rest/order/payable?firm=19341&type=TODAY

    this.restService.enableloading();

    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
      var api = '?branch='+this.selectbranch+'&type=TODAY'

    }
    else
    {
      var api = '?branch='+this.firm+'&type=TODAY'

    }

    if(this.route.url === '/manage_amountpayable')
    {
      var url = this.restService.OrdersRestURL('accountspayable',api);
    }
    else{
      var url = this.restService.OrdersRestURL('accountsreceived',api);
    }
    
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.totalamount=response.amount
        this.data = response.order;
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
    //http://localhost:8090/SmartSupplyManager/rest/order/payable?firm=20&fromdate=2020-06-01&todate=2020-05-30
    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
      var api = '?branch=' + this.selectbranch + '&fromdate=' + fdate + '&todate=' + todate;


    }
    else
    {
      var api = '?branch=' + this.branch + '&fromdate=' + fdate + '&todate=' + todate;


    }

    
    if(this.route.url === '/manage_amountpayable')
    {
      var url = this.restService.OrdersRestURL('accountspayable',api);
    }
    else{
      var url = this.restService.OrdersRestURL('accountsreceived',api);
    }
    
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
      
        this.restService.getJSONFromURL(response);
      
        console.log(response);
        this.totalamount=response.amount
        this.data = response.order;
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



getallbranch(){

  var url = this.restService.branchRestURL('', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.branchlist = response;
    
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}

refreshincall()
{
  
 
    this.selectbranch = undefined;
  
    
    //this.getCallList();
  
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
