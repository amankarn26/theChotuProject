import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-orderbytype',
  templateUrl: './orderbytype.component.html',
  styleUrls: ['./orderbytype.component.css']
})

export class OrderbytypeComponent implements OnInit {


  public title = '';
  public subtitle = '';
  //public alertify = require('alertify.js');
  public flag = false;
  public activepage=false;
  public docServer = this.restService.docServer;

 // for datatable
 public filterQuery = '';
 public rowsOnPage = 10;
 public sortBy = 'role';
 public sortOrder = 'asc';
 public data=[];

 public fromDatee='';
 public toDatee='';

 public routeid;
 
 public deliveredorders=[];
 public placedorders=[];
 public packedorders=[];
 public pickuporders=[];

 public refundedorders=[];

 public customdate;
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

  public ratelabel={

    firm:sessionStorage.getItem('firm'),
    label:'',
    description:'',
  };

public statusselect;
public orderstatus;


  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


   

  ngOnInit() {

    this.id = this.routprms.snapshot.params['id'];
    this.routeid = this.routprms.snapshot.params['id'];

    this.flag = false;
    if (this.route.url === '/vendor_orderbyid/' + encodeURIComponent(this.routeid)) {
      this.title = 'Branch Orders';
      this.subtitle = 'Edit Rate Label';
    this.getvendororders();
    }
      else {
      this.title = 'Delivery Pool Orders';
      this.subtitle = 'Manage  Rate Label information including view, add, update and delete';
      this.flag = false;
    this.activepage=false;
    this.getdporders();


    
  
 
    
  }
  }

  cancel() {
    window.history.back();
}

getvendororders()
{
  
  var url = this.restService.OrdersRestURL('allordersbyfirm', this.routeid);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.data = response;
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}

getdporders()
{
  
  var url = this.restService.OrdersRestURL('allordersbydp', this.routeid);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
     // this.data=response;
      console.log(response);
      this.data = response;
      
    },
    error => {
      console.log('Error in data load.');
    }
  );

}


public inputValidator(event: any) {
  //console.log(event.target.value);
  const pattern = /^[a-zA-Z0-9]*$/;   
  //let inputChar = String.fromCharCode(event.charCode)
  if (!pattern.test(event.target.value)) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
    // invalid character, prevent input

  }
}

public getallorders() {

  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '?firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('', '');
    //  const url = this.restService.OrdersRestURL('','');
  }


  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.data = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


  public getclosedorders() {

    if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

    {
      var api = '/status?active=NO&firm='+this.firm;
      var url = this.restService.OrdersRestURL('orderbyperson', api);
  
    }
    else
    {
      var url = this.restService.OrdersRestURL('orderactive', 'NO');
    }

   
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getreceivedorderspaid() {

    const url = this.restService.OrdersRestURL('orderbystatus', 'PAID');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getopenorders() {

   
    if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

    {
      var api = '/status?active=YES&firm='+this.firm;
      var url = this.restService.OrdersRestURL('orderbyperson', api);
  
    }
    else
    {
      var url = this.restService.OrdersRestURL('orderactive', 'YES');
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getDataById() {
    // Get Information from JSON REST api
    const url = this.restService.OrdersRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.ratelabel.label = response.label;
        this.ratelabel.description = response.description;

        this.ratelabel['id'] = response.id;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  delete(id: any) {
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
        const url = this.restService.OrdersRestURL('delete', id);
     //   console.log('Delete using this id:' + id);
//    const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response :any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
          //  this.getEmpList();
          this.alltypesoforders();
            this.route.navigate(['/all_orders']);
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
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    });
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
        this.alltypesoforders();
        this.sendcommonNotify(data);
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
alltypesoforders()
{

// this.getallorders();
this.getcancelledorders();
this.getrefundedorders();


// this.getplacedorders();
// this.getpackedorders();
// this.getpickuporders();
// this.getdeliveredorders();
}

public getcancelledorders()
{
  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=CANCELLED&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'CANCELLED');
  }
console.log('urllllllllllll::::::::::::::::::::;;;');
console.log(url);

  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.data = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}
public getrefundedorders()
{
  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=REFUNDED&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'REFUNDED');
  }
console.log('urllllllllllll::::::::::::::::::::;;;');
console.log(url);

  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.refundedorders = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


public getplacedorders()
{
  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=PLACED&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'PLACED');
  }
console.log('urllllllllllll::::::::::::::::::::;;;');
console.log(url);

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

  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=PACKED&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'PACKED');

  }
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
public getpickuporders()
{
  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=PICKED_UP&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'PICKED_UP');

  }
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
  if(this.userRole==='SUPERADMIN' && this.userType==='FIRM')

  {
    var api = '/status?status=DELIVERED&firm='+this.firm;
    var url = this.restService.OrdersRestURL('orderbyperson', api);

  }
  else
  {
    var url = this.restService.OrdersRestURL('orderbystatus', 'DELIVERED');

  }
 // const url = this.restService.OrdersRestURL('orderbystatus', 'DELIVERED');
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


getallfirm(){

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

}

refreshincall()
{
  
 
    this.statusselect = undefined;
    this.orderstatus=undefined;

    if(this.route.url==='/vendor_orderbyid/' + encodeURIComponent(this.routeid))
    {
      this.getvendororders();
    }
    else
    {
      this.getdporders();
    }
  
}

private searchdayspayable() {
  if(this.fromDatee ==='' || this.toDatee ==='')
  {
Swal.fire('From date or To date is NULL','please fill the data','error')
  }
  else{


 
  const fdate = this.fromDatee;
  const todate = this.toDatee;

  var api = '?firm=' + this.firm + '&from=' + fdate + '&to=' + todate;

  var url = this.restService.OrdersRestURL('orderbyperson',api);
  this.restService.getJSONFromURL(url).subscribe(
   ( response:any) => {
    
      this.restService.getJSONFromURL(response);
    
      console.log(response);

      this.data = response;
    },
    error => {

      console.log('Error in data load.');
     // this.isLoader = false;
      // this.isLoader = false;
      // alert('false2='+this.isLoader);
    }
  );
}
}

public deleteNewsList(id: any) {
  if (this.selectedorders.indexOf(id) > -1) {
    // alert('pop');
    this.selectedorders.splice(this.selectedorders.indexOf(id), 1);

  } else {
    this.selectedorders.push(id);
    
  }
  //   alert(id);
  console.log(this.selectedorders);
}
  



deletemultipleorder(id: any) {
  if(this.selectedorders.length > 0){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this data!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      // delete code
      const url = this.restService.OrdersRestURL('multipledel', '');
      
      this.restService.postFormData(url, this.selectedorders).subscribe(
        (response :any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          Swal.fire(
            'Deleted!',
            'Your data has been deleted.',
            'success'
          );
          this.selectedorders=[];
         this.alltypesoforders();
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
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your data is safe :)',
        'error'
      );
    }
  });
}
else{
  Swal.fire(
    'Select atleast one Order to Delete',
     '',
     'error'
   );
}
}

changestatus()
{
  if(this.selectedorders.length > 0){
  
    const order_update={
      order:this.selectedorders,
      status:'REFUNDED'

    }

    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.OrdersRestURL('bulkstatus', '');
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Status Updated', '', 'success');
        this.selectedorders=[];
        this.alltypesoforders();

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
else{
  Swal.fire(
    'Select atleast one Order to Delete',
     '',
     'error'
   );
}
}


getorderbystatus()
{
  if(this.route.url==='/vendor_orderbyid/' + encodeURIComponent(this.routeid))
  {
    var api = '/status?status='+this.orderstatus+'&firm='+this.routeid;
  }
  else
  {
    var api ='?person='+this.routeid+'&status='+this.orderstatus;
  }

 var url = this.restService.OrdersRestURL('orderbyperson', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);

      console.log(response);
      this.data = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
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
}
