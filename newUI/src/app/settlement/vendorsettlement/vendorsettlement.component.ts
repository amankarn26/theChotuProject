import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;


@Component({
  selector: 'app-vendorsettlement',
  templateUrl: './vendorsettlement.component.html',
  styleUrls: ['./vendorsettlement.component.css']
})
export class VendorsettlementComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


    public totalpayamount=0;
    public totalrecamount=0;
    public totalearnamount=0;

    Cashtotalpayamount=0;
    Cashtotalrecamount=0;

    public statusfirm;
    public statusresponse=[];
    public title = '';
    public subtitle = '';
    //public alertify = require('alertify.js');
    public flag = false;
    public activepage=false;
    public docServer = this.restService.docServer;
  public tab1 = false;
   // for datatable
   public filterQuery = '';
   public rowsOnPage = 5;
   public sortBy = 'role';
   public sortOrder = 'asc';
   public data=[];


   public filterQuery1 = '';
   public filterQuery2 = '';
   public filterQuery3 = '';
   public filterQuery4 = '';
   public filterQuery5 = '';
   public filterQuery6 = '';


  
   public fromDatee='';
   public toDatee='';
  //  public orderids=[19241,19214,14781,1245];
   public deliveredorders=[];
   public placedorders=[];
   public packedorders=[];
   public pickuporders=[];
  
   public refundedorders=[];
  
   public customdate;

   public customdate1=false;
   public customdate2=false;
   public customdate4=false;
   public customdate5=false;
  //  public orders;
  
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
     public todaysearningorders =[];
     public cashreceivedorders=[];
     public cashpayableorders=[];


  ngOnInit() {


      // alert('in else');

      this.gettodayspayable();
      this.gettodaysreceived();
      this.gettodaysreceivedearnings();
      this.getcashpayableDay('THURSDAY');
      this.getcashreceivedDay('THURSDAY');
  
  

  }


  public gettodayspayable()
  {
     this.customdate=null;
    this.customdate1=null;
    this.customdate2=null;
    this.customdate4=null;
    this.customdate5=null;

    this.restService.enableloading();
  var url = this.restService.firmRestURL('todayspayableV', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todayspayableorders = response.amtobj;
        this.totalpayamount =response.totalamount;
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
    this.customdate=null;
    this.customdate1=null;
    this.customdate2=null;
    this.customdate4=null;
    this.customdate5=null;

    this.restService.enableloading();

  var url = this.restService.firmRestURL('todaysreceivedV', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todaysreceivedorders = response.amtobj;
        this.totalrecamount =response.totalamount;

    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
  }



  private searchdayspayable() {
    this.customdate=true;

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
    var url = this.restService.firmRestURL('firmosearch',api);
    this.restService.getJSONFromURL(url).subscribe(
     ( response:any) => {
      
        this.restService.getJSONFromURL(response);
      
        console.log(response);
        this.todayspayableorders=response.amtobj;
        this.totalpayamount =response.totalamount;

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
  this.customdate=true;

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
  var url = this.restService.firmRestURL('firmosearch',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);
      this.todaysreceivedorders=response.amtobj;
      this.totalrecamount =response.totalamount;

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


vendorpaidorders(data: any)
{

  console.log(data);
const json = {
  isvendorpaid:'YES',
  order:data
}
//get orders
 // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL('vendorpaid', '');
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        Swal.fire('Vendor Paid', '', 'success');
        window.scrollTo(0, 0);
        this.gettodayspayable();
        this.gettodaysreceived();
        this.gettodaysreceivedearnings();
        this.getcashpayableDay('THURSDAY');
        this.getcashreceivedDay('THURSDAY');

       
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
  //    this.gettodaysreceived();
  console.log(response.ordelist);
this.statusfirm=response[0].vendor;

      this.statusresponse=response;
      document.getElementById('id01').style.display='block'
      console.log(this.statusresponse);
       
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
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;

  this.restService.enableloading();

  var url = this.restService.firmRestURL('yestpayableV', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todayspayableorders = response.amtobj;
        this.totalpayamount =response.totalamount;

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
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;

  this.restService.enableloading();

  var url = this.restService.firmRestURL('yestreceivedV', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todaysreceivedorders = response.amtobj;
        this.totalrecamount =response.totalamount;

    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
}

getyestreceievedearnings()
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;

  this.restService.enableloading();
  var api = '?type=YESTERDAY'
  var url = this.restService.firmRestURL('firmearnings', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
  
        console.log(response);
        this.todaysearningorders = response.amtobj;
        this.totalearnamount =response.totalamount;

    this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
    this.restService.disableloading();

      }
    );
}

public gettodaysreceivedearnings()
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;
  this.restService.enableloading();
var api = '?type=TODAY'
var url = this.restService.firmRestURL('firmearnings', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.todaysearningorders = response.amtobj;
      this.totalearnamount =response.totalamount;

  this.restService.disableloading();

    },
    error => {
      console.log('Error in data load.');
  this.restService.disableloading();

    }
  );
}

public searchdaysreceivedeanings() {
  this.customdate=true;

  this.restService.enableloading();

  if(this.fromDatee ==='' || this.toDatee ==='')
  {
Swal.fire('From date or To date is NULL','please fill the data','error')
  }
  else{


 
  const fdate = this.fromDatee;
  const todate = this.toDatee;

  var api = '?fromdate=' + fdate + '&todate=' + todate;
  var url = this.restService.firmRestURL('firmearnings',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);
      this.todaysearningorders=response.amtobj;
      this.totalearnamount =response.totalamount;

    this.restService.disableloading();

     
    },
    error => {

      console.log('Error in data load.');
    this.restService.disableloading();

    }
  );
}

}

public gettodaysdate()
{
  //  this.customdate=null;
    // this.customdate1=null;
    // this.customdate2=null;

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

public getcashorderreceived()
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;
  var url = this.restService.firmRestURL('cashorderR', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      this.cashreceivedorders = response.amtobj;
      this.Cashtotalrecamount=response.totalamount;
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}
public getcashorderpayable()
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;
  var url = this.restService.firmRestURL('cashorderP', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      this.cashpayableorders = response.amtobj;
      this.Cashtotalpayamount=response.totalamount

      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}


DownloadExcel()
{
  var url = this.restService.docsRestURL('dowExcel', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);

      window.open(this.docServer+'/'+response.path, '_blank');
      
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

getcashpayableDay(day:any)
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;
var url = this.restService.firmRestURL('cashorderP', day);
this.restService.getJSONFromURL(url).subscribe(
  (response : any) => {
    this.restService.getJSONFromURL(response);
    console.log(response);
    this.cashpayableorders = response.amtobj;
    this.Cashtotalpayamount=response.totalamount

    
  },
  error => {
    console.log('Error in data load.');
  }
);
}

public getcashreceivedDay(day:any)
{
  this.customdate=null;
  this.customdate1=null;
  this.customdate2=null;
  this.customdate4=null;
  this.customdate5=null;

  var url = this.restService.firmRestURL('cashorderR', day);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      this.cashreceivedorders = response.amtobj;
      this.Cashtotalrecamount=response.totalamount;
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}


private getcashpayablebydate() {
  this.customdate4=true;

  this.restService.enableloading();

  if(this.fromDatee ==='' || this.toDatee ==='')
  {
Swal.fire('From date or To date is NULL','please fill the data','error')
  }
  else{


 
  const fdate = this.fromDatee;
  const todate = this.toDatee;
//http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20 

  var api = '/payable/cash?type=CASH&fromdate=' + fdate + '&todate=' + todate;
  var url = this.restService.firmRestURL('firmosearch',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);
      this.cashpayableorders=response.amtobj;
      this.Cashtotalpayamount =response.totalamount;

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
private getcashreceivebydate() {
  this.customdate5=true;

  this.restService.enableloading();

  if(this.fromDatee ==='' || this.toDatee ==='')
  {
Swal.fire('From date or To date is NULL','please fill the data','error')
  }
  else{


 
  const fdate = this.fromDatee;
  const todate = this.toDatee;
//http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20 

  var api = '/received/cash?type=CASH&fromdate=' + fdate + '&todate=' + todate;
  var url = this.restService.firmRestURL('firmosearch',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);
      this.cashreceivedorders=response.amtobj;
      this.Cashtotalrecamount =response.totalamount;

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


public searchFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }


}

}
