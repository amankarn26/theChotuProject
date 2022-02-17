import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
import {  Color } from 'ng2-charts';

import {
  // Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: 'rgba(173, 33, 33, 0.57)'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#1D976C',
    secondary: '#93f9b982'
  },
  orange: {
    primary: '#f9a036',
    secondary: '#f9a03652'
  },
  grey: {
    primary: 'grey',
    secondary: '#80808054'
  },
  MATERNITY:
  {
    primary: '#aaf7aa',
    secondary: '#aaf7aa75'
  },
  PATERNITY:
  {
    primary: '#aaf7aa',
    secondary: '#aaf7aa75'
  }

};
declare var Swal: any; 
declare var require: any;


@Component({
  selector: 'app-deliverypoolpage',
  templateUrl: './deliverypoolpage.component.html',
  styleUrls: ['./deliverypoolpage.component.css']
})

export class DeliverypoolpageComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute,
    private modal: NgbModal ) { }

    public docServer = this.restService.docServer;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;
  
    viewDate: Date = new Date();
  
    modalData: {
      action: string;
      event: CalendarEvent;
    };
  
    actions: CalendarEventAction[] = [
      {
        label: '<i class="fa fa-fw fa-pencil"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        }
      },
      {
        label: '<i class="fa fa-fw fa-times"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          this.handleEvent('Deleted', event);
        }
      }
    ];
  
    refresh: Subject<any> = new Subject();
  
    events: CalendarEvent[] = [
  
  //     {
  //       start: new Date(),
  //       end: new Date(),
  //       title: 'A 3 day event',
  // //       color: colors.red,
  // //  //     actions: this.actions,
  // //       allDay: true,
  // //       resizable: {
  // //         beforeStart: true,
  // //         afterEnd: true
  // //       },
  //    //   draggable: true
  //     }
      
      // {
      //   start: startOfDay(new Date()),
      //   title: 'An event with no end date',
      //   color: colors.yellow,
      //   actions: this.actions
      // },
      // {
      //   start: subDays(endOfMonth(new Date()), 3),
      //   end: addDays(endOfMonth(new Date()), 3),
      //   title: 'A long event that spans 2 months',
      //   color: colors.blue,
      //   allDay: true
      // },
      // {
      //   start: addHours(startOfDay(new Date()), 2),
      //   end: new Date(),
      //   title: 'A draggable and resizable event',
      //   color: colors.yellow,
      //   actions: this.actions,
      //   resizable: {
      //     beforeStart: true,
      //     afterEnd: true
      //   },
      //   draggable: true
      // }
    ];
  
    activeDayIsOpen: boolean = false;
  
    //constructor(private modal: NgbModal) {}
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
  
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }
  
    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map(iEvent => {
        if (iEvent === event) {
          return {
            ...event,
            start: newStart,
            end: newEnd
          };
        }
        return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
    }
  
    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  
  public filterQuery1;

  public filterQuery2;


  
  public vendorstatsdata;
public vendorstats;

piedata=[];


  public custData;
  public custMob;

  public dt = new Date();
  public email = {
    to: '',
    cc: 'amankarn26@gmail.com',
    templateId: 'qdefault',

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
      subject: 'New quotation generated'
    }
  };


  public email_table = {
    No: '1',
    Product: '',
    Detail: '',
    Qty: '',
    Amount: '',
  };

public  costdata ={
    amount:'',
    gst:'',
    delivery_charges:'',
    finalamt:''
  }

  public filterQuery = '';
  public rowsOnPage = 5;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data=[];

public id = sessionStorage.getItem('id');
  
 public deliveredorders=[];
 public placedorders=[];
 public packedorders=[];
public popularproducts=[];
public allorders=[];
public pickuporders=[];
public otpvalue;


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
  //  alert(this.tem.toLocaleDateString())
  if(this.route.url === '/delivery_dashboard')
{
  if(this.userRole === 'SUPERADMIN')
  {
    this.getalldp();
    this.id = sessionStorage.getItem('idfromadmin');
    this.username =sessionStorage.getItem('usernamefromadmin');
    this.selectdelivery =sessionStorage.getItem('idfromadmin');
    this.deliveryselect=true;
  }
  
  this.getvendororderstats();
  this.getorderStateList();
  this.getProductStats();
  this.getrevenuestats();
}

    this.getLeaveList();
    this.getplacedorders();
    this.getpackedorders();
    this.getdeliveredorders();
    this.getallorders();
    this.getpickuporders();
 //   this.getpopularproducts();.

   
  }



  public getpackedorders()
  {
    let api = '?person='+this.id+'&status=PACKED';
    const url = this.restService.OrdersRestURL('orderbyperson', api);
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

  
  public getplacedorders()
  {
    let api = '?person='+this.id+'&status=PLACED';
    const url = this.restService.OrdersRestURL('orderbyperson', api);
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

  public getdeliveredorders()
{
  let api = '?person='+this.id+'&status=DELIVERED';

  const url = this.restService.OrdersRestURL('orderbyperson', api);
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

public getpickuporders()
{
  
  let api = '?person='+this.id+'&status=PICKED_UP';

  const url = this.restService.OrdersRestURL('orderbyperson', api);
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

  // public getpopularproducts()
  // {
  //   const url = this.restService.compactRestURL('popularproducts', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.restService.getJSONFromURL(response);
  
  //       console.log(response);
  //       this.popularproducts = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  

  orderpickedup(data: any)
  {
    const order_update={
      id:data.id,
      status:'PICKED_UP'

    }

    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.OrdersRestURL('update', '');
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Order is Successfully Picked Up', '', 'success');
        this.sendcommonNotify(data);
        this.ngOnInit();
      //  this.alltypesoforders();
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
  private getLeaveList() {
    // Get Information from JSON REST api
    let api = '?person='+this.id+'&status=PACKED';
    const url = this.restService.OrdersRestURL('orderbyperson', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        this.data = response;
        console.log(this.data);
        let evt = [];
        for (const entry of response) {
       let col = colors.blue;
          const leave = {
            title: 'Order for Customer:<b>' + entry.custname + '</b><br>' + 'Pincode :' + entry.deliveryaddress.pincode,
            start:new Date(entry.expdelivery),
            end: new Date(entry.expdelivery),
            color: col,
            allDay: false,
            resizable: {
              beforeStart: false,
              afterEnd: false
            },
            draggable: false
          };
         
          evt.push(leave);
          console.log(leave);

          console.log(evt)
        }
        this.events = evt;
        console.log(evt);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
public getallorders()
{
  let api = '/date?id='+this.id;
  const url = this.restService.OrdersRestURL('orderbyperson', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.allorders = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}
setreason(data: any) {
  // alert('reject reason');
//   this.reasonid = data.id;
  console.log('set reason id');
  console.log(data);
  var generatedotp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;
console.log(generatedotp);
// alert('delivered otp ='+generatedotp);
this.sendMeberSMS(generatedotp,data.custmobile)

  Swal.fire({
    title: "Please Enter the OTP",
    text: "OTP is Mandatory",
    input: 'number',
    showCancelButton: true        
}).then((result) => {
    if (result.value) {
      
      this.otpvalue=result.value;
      if(this.otpvalue === generatedotp)
      {
        this.orderdelivered(data)
      }
     else
     {
      Swal.fire('Wrong OTP','try again','error');
     }


     // Swal.fire('Requested','','success');
    }
});

//  this.reasonid = data.id;
  // document.getElementById('openModalButton1').click();



}

orderdelivered(data: any)
{

  const order_update={
    id:data.id,
    status:'DELIVERED'

  }

  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.OrdersRestURL('update', '');
  this.restService.postFormData(url, order_update).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      this.getCustById1(data);
      Swal.fire('Order is Successfully Delivered', '', 'success');
    //  this.getCustById1(data);
    this.sendcommonNotify1(data);
      this.ngOnInit();
    //  this.alltypesoforders();
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


sendMeberSMS(generatedotp:any,mobilenumber:number) {
  const message = 'Your OTP for verification is: '+ generatedotp + '. IVPL';

  let mobile = mobilenumber;


  const smsdata = {
      toMobile: mobile,
      message: message
  };

  console.log('sending sms');
  console.log(smsdata);
  const url = this.restService.smsRestURL('send', '');

  console.log(url);
  this.restService.postFormData(url, smsdata).subscribe(
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

public getCustById1(data:any) {
 // this.isLoader = true;
  // Get Information from JSON REST api
  const url = this.restService.customerRestURL('details', data.customer);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      this.custData = response;
      this.custMob = response.phone;
    //  this.createPDF(data);
   //   this.sendCustomerSMS(data, this.custMob);

    },
    error => {
      console.log('Error in data load.');
    //  this.isLoader = false;
    }
  );

}

public createPDF(data:any) {

  console.log(data);
   console.log('Call to customer mail  : ');


      this.email.to =   this.custData.login.email; // this.custEmail;

//      this.email.contentData.content.quatationid = String(data.id); // quotation id
   

      this.email['pdfid'] =   data.id;  // quotation id
// if (data.oentry.length>1)
// {
//   this.email_table.Product_Head =   data.oentry[0].pname + '1 Other Item';
// }
// else
// {
//   this.email_table.Product_Head =   data.oentry[0].pname;
// }
     

for(let entry of data.oentry){

  this.email_table.Product =  entry.pname;
  this.email_table.Amount= entry.amount;
  this.email_table.Qty= entry.qty;
  this.email_table.Detail= entry.pname +'<br> Quantity : ' +  entry.qty ;

}

this.email.contentData.content.quatationid=data.invoicenum;
this.email.contentData.content.validtill=this.restService.unixTimeConverterDate(data.expdelivery);

    //  this.email_table.Amount =   '<p style=\'text-align:center\'>' + data.qcost.finalamt + '</p>';
     this.email.contentData.content.message = 'Hello, ' + data.custname.toUpperCase() + ', ' + data.custcity + '\n ';


      this.email.contentData.table.push(JSON.parse(JSON.stringify(this.email_table)));

      this.costdata.amount=data.qcost.baseprice;
      this.costdata.delivery_charges=data.qcost.delivery;
      this.costdata.gst=data.qcost.gstamt;
      this.costdata.finalamt=data.qcost.finalamt;



      this.email.contentData.costtable.push(JSON.parse(JSON.stringify(this.costdata)));

      // this.email_table.Detail = data.oentry[0].pname;


       this.email.templateId = 'sale';
       console.log('submiti function');
       console.log(this.email);
       const url = this.restService.mailRestURL('sendPDF', '');
       this.restService.postFormData(url, this.email).subscribe(
         (response:any) => {
           // Responce data.
           console.log('Status on Post API');
        //   this.getEmpList();
           console.log(response);
           return true;
         },
         error => {
           // Error Message
        //   this.getEmpList();
           console.log('Failed to send email message to customer');
        //   this.isLoader = false;
           return false;
         }
       );

}

sendCustomerSMS(data:any, mobile:any) {

 

 if (data.oentry.length>1)
{
   var message = 'Order Confirmed for ' +  data.oentry[0].pname + '1 Other Item';
}
else
{
   var message = 'Order Confirmed for ' +  data.oentry[0].pname;
}
     

  
   message = message +' Total Price :'+ data.qcost.finalamt;



  const smsdata = {
      toMobile: mobile,
      message: message
  };

  console.log('sending sms');
  console.log(smsdata);
  const url = this.restService.smsRestURL('send', '');

  console.log(url);
  this.restService.postFormData(url, smsdata).subscribe(
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


sendcommonNotify(data:any ) {

  let bulk = [];
  // const refundvalue = (2/100) * Number(data.qcost.finalamt);
  // console.log(refundvalue.toFixed(2));
  // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);
  
  
  
  const message = 'Order Number '+ data.invoicenum+ ' has been Pick Up by the Delivery Person';
  
  const mobile = data.custmobile; // localStorage.getItem('phone');
  const smsdata = {
  id:data.customer,
  toMobile: mobile,
  message: message,
  notificationFor: 'CUSTOMER'
  };
  
  bulk.push(smsdata);
  
  const message1 = 'Order Number '+ data.invoicenum+ ' has been Pick Up by the Delivery Person';
  
  const mobile1 = '0000000000';
  const smsdata1 = {
  id:data.firm,
  toMobile: mobile1,
  message: message1,
  notificationFor: 'FIRM'
  };
  
  bulk.push(smsdata1);
  
  
  // const message2 = 'Molecule: Order Number '+ data.invoicenum+ ' has been cancelled by Customer.';
  
  // const mobile2 = '0000000000'; // data.custmobile; // localStorage.getItem('phone');
  // const smsdata2 = {
  // id:data.deliverypool,
  // toMobile: mobile2,
  // message: message2,
  // notificationFor: 'DELIVERY_PERSON'
  // };
  
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

  
sendcommonNotify1(data:any ) {

  let bulk = [];
  // const refundvalue = (2/100) * Number(data.qcost.finalamt);
  // console.log(refundvalue.toFixed(2));
  // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);
  
  
  
  const message = 'Order Number '+ data.invoicenum+ ' has been Delivered. Thanks For Shopping with Us !';
  
  const mobile = data.custmobile; // localStorage.getItem('phone');
  const smsdata = {
  id:data.customer,
  toMobile: mobile,
  message: message,
  notificationFor: 'CUSTOMER'
  };
  
  bulk.push(smsdata);
  
  const message1 = 'Order Number '+ data.invoicenum+ ' has been Delivered';
  
  const mobile1 = '0000000000';
  const smsdata1 = {
  id:data.firm,
  toMobile: mobile1,
  message: message1,
  notificationFor: 'FIRM'
  };
  
  bulk.push(smsdata1);
  
  
  const message2 = 'Order Number '+ data.invoicenum+ ' has been Delivered, Your Earnings will be credited on Next working Day.';
  
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

  acceptOrder(id:number)
{

  const order_update={
    id:id,
    isdeliveryaccept:'YES'

  }

  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.OrdersRestURL('update', '');
  this.restService.postFormData(url, order_update).subscribe(
    (response: any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Order Accepted', '', 'success');
      this.ngOnInit();
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



  var refundvalue = (50/100) * data.qcost.delivery ;
  console.log(refundvalue.toFixed(2));

   var totalrefund = data.qcost.finalamt - refundvalue;

   const order_update={
    id:data.id,
    isdeliveryaccept:'NO',
    
  }

  Swal.fire({
    title: 'Do you want to cancel your Order',
    // text: 'You will not be able to recover this data!',
    html: '<b style="display: block;font-weight: bold;color: red;"> 50 % will be deducted from your Next order Settlement if no delivery person available, deducted amount will be ' + refundvalue.toFixed(2) + ' /- ',
   
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
          this.ngOnInit();

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

  
  /////////////////////////////////////////////////////////////Statiss starting////////////////////////////////////////////////////////////////////////////

  public getProductStats() {
    const url = this.restService.statsRestURL('product_delivery', sessionStorage.getItem('id'));
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
  var url = this.restService.statsRestURL('vendororderstats_delivery', sessionStorage.getItem('id'));
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
   
    
   
        var url = this.restService.statsRestURL('monthlyvendororders_delivery', sessionStorage.getItem('id'));
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
  var url = this.restService.statsRestURL('revenuestats_delivery', sessionStorage.getItem('id'));
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
  // this.vendorselect=true;

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
  this.deliveryselect=true;

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
  // this.adminselect=null;
  // this.vendorselect=null;

}

dpstatdataseleted(id:any, event:any)
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
