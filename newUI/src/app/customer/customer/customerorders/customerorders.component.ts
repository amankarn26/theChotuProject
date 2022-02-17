import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgFor } from '@angular/common';
// import { HttpModule, Response } from '@angular/http';
import { RestService } from './../../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;


@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


  allOrder_lmt = '?index=0&limit=200';

  public id = sessionStorage.getItem('id');
  public userType = sessionStorage.getItem('type');
  public userRole = sessionStorage.getItem('role');
  public data = [];

  public placedorders = [];
  public packedorders = [];
  public pickeduporders = [];
  public deliveredorders = [];
  public servedorders = [];
  public closedorders = [];

  public ddname;

  lmt = '&index=0&limit=25';
  // for datatable
  public filterQuery1 = '';
  public filterQuery2 = '';
  public filterQuery3 = '';
  public filterQuery4 = '';
  public filterQuery5 = '';
  public filterQuery6 = '';

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'id';
  public sortOrder = 'asc';
  public firm;
  public oentrydata = [];
  custlist = [];
  public customer;


  public docServer = this.restService.docServer;

  isDeliverypoolchange = false;

  orderdata;

  dpersonList = [];
  deliverypool;

  ngOnInit() {

    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      this.getallcustomer();
      this.allorders();
      this.getcustomerorders();
      this.getallorders();
    }
    else {
      this.getcustomerorders();
      this.getallorders();
    }
  }

  getallorders() {
    this.getplacedorders();
    this.getpackedorders();
    this.getpickuporders();
    this.getclosedorders();
    this.getservedorders();
    this.getdeliveredorders();
  }

  private getallcustomer() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.custlist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getcustomerorders() {
    this.restService.enableloading();

    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + this.lmt);

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + this.lmt);

    }
    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.getallorders();
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  ordercancellation(data: any) {

    var refundvalue = (2 / 100) * data.qcost.finalamt;
    console.log(refundvalue.toFixed(2));

    var totalrefund = data.qcost.finalamt - refundvalue;

    const order_update = {
      id: data.id,
      status: 'CANCELLED',
      qcost: {
        refundamt: totalrefund
      }

    }

    Swal.fire({
      title: 'Do you want to cancel your Order',
      // text: 'You will not be able to recover this data!',
      html: '<b style="display: block;font-weight: bold;color: red;"> 2 % will be deducted from your total amount, refund amount will be ' + totalrefund.toFixed(2) + ' /- </b>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.OrdersRestURL('update', '');
        this.restService.postFormData(url, order_update).subscribe(
          (response: any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Order is Successfully Cancelled!',
              '',
              'success'
            )
            this.sendcommonNotify(data, totalrefund);
            this.sendCusomerSMS(data, totalrefund);
            this.senddpSMS(data);
            this.getcustomerorders();
            this.getallorders();

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

  cloneorder(id: any) {
    //  http://localhost:8090/SmartSupplyManager/rest/order/clone?id=19276
    var url = this.restService.OrdersRestURL('cloneorder', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.oentrydata = response.oentry;

        this.firm = response.firm;
        console.log(response.oentry);
        this.repeatorder();
        var check = false;
        // for(let data of response.oentry)
        // {
        //   if(data.stockStatus ==='NO')
        //   {
        //     alert(data.stockStatus);
        //   //  Swal.fire('Stock not available','try after sometime' ,'error')
        //     check =true;
        //   }

        // }

        // if(check===true)
        // {
        //   Swal.fire('Stock not available','Please try after sometime or try adding another product' ,'error');
        // }
        // else
        // {
        //   this.repeatorder();
        // }

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  repeatorder() {
    // this.cloneorder(id);

    //   console.log(productdata)

    let items = this.oentrydata;
    const productdata = {

      firm: this.firm,
      gst: '',
      gstamt: '',
      image: '',
      // mfg: '',
      dname: '',
      prodtype: '',

      qty: '',
      rateperunit: '',
      rateunit: '',
      stockStatus: ''
    }

    let cartlist = [];

    for (let data of items) {

      productdata.gst = data.gst;
      productdata.gstamt = data.gstamt;
      if (data.photo) {
        productdata.image = data.photo.docpath;

      }
      else {
        productdata.image = null;
      }
      // productdata.mfg = data.mfg;

console.log("data",data);

      productdata.dname = data.dname;
      productdata.prodtype = data.prodtype;

      productdata.qty = data.qty;
      productdata.rateperunit = data.rateperunit;
      productdata.rateunit = data.rateunit;
      // productdata.stockStatus = data.stockStatus;

      console.log("data1",productdata);

      cartlist.push(JSON.parse(JSON.stringify(productdata)));

    }

    console.log(items);

    console.log(this.oentrydata);
    sessionStorage.removeItem('items');

    sessionStorage.setItem('items', JSON.stringify(cartlist));
    Swal.fire({ title: "Added to cart!", icon: "success", timer: 800 });
    this.route.navigate(['/checkout']);

  }

  getplacedorders() {

    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomerplaced', this.customer);

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomerplaced', this.id);

    }
    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
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

  getpackedorders() {

    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + '&status=PACKED');

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + '&status=PACKED');

    }
    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
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

  getpickuporders() {

    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + '&status=PICKED_UP');

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + '&status=PICKED_UP');

    }
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.pickeduporders = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getservedorders() {

    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + '&status=SERVED');

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + '&status=SERVED');

    }
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {

    
        this.servedorders = response;

        console.log("manoj",this.servedorders);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getclosedorders() {

    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + '&status=CLOSED');

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + '&status=CLOSED');

    }
    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.closedorders = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getdeliveredorders() {

    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12
    if (this.userRole === 'SUPERADMIN' && this.userType === 'FIRM') {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.customer + '&status=DELIVERED');

    }
    else {
      var url = this.restService.OrdersRestURL('orderbycustomer', this.id + '&status=DELIVERED');

    }
    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
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

  decrement() {
    this.lmt = '&index=0&limit=25'
    this.getcustomerorders();
  }

  getall() {
    this.lmt = '&index=0&limit=1000';
    this.getcustomerorders();
  }

  sendCusomerSMS(data: any, refundvalue: number) {

    const message = 'Order Number ' + data.invoicenum + ' has been cancelled successfully.Amount of Rs. ' + refundvalue + ' will be refunded within 6-7 Working days. IVPL';

    // let mobile = sessionStorage.getItem('phone');
    const smsdata = {
      toMobile: data.custmobile,
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

  senddpSMS(data: any) {

    const message = 'Order Number ' + data.invoicenum + ' has been Cancelled. IVPL';

    // let mobile = sessionStorage.getItem('phone');
    const smsdata = {
      toMobile: data.deliverymobile,
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

  allorders() {

    this.restService.enableloading();

    var url = this.restService.OrdersRestURL('allorderss', this.allOrder_lmt);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();

      },
      error => {
        console.log('Error in data load.');
        this.restService.disableloading();

      }
    );
  }

  refreshincall() {

    this.customer = undefined;
    this.allorders();

  }

  dpchange(obj) {
    this.ddname = obj.target.options[obj.target.selectedIndex].text;

  }

  changedeliveryperson(data: any) {

    console.log(data);
    this.isDeliverypoolchange = true;
    this.orderdata = data;

    this.getdeliveryperson(data);


  }

  getdeliveryperson(data: any) {

    var url = this.restService.delivertypoolRestURL('getdeliveryppol', 'dperson=' + data.deliverypool
      + '&pincode=' + data.deliveryaddress.pincode);

    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.dpersonList = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  updatedeliveryperson() {

    const json = {
      id: this.orderdata.id,
      deliverypool: this.deliverypool
    };



    const url = this.restService.OrdersRestURL('update', '');
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        Swal.fire(
          'Updated Successfully !',
          '',
          'success'
        );

        this.isDeliverypoolchange = false;
        this.getcustomerorders();
        this.getallorders();

        this.sendNotifOndeliverychange(this.orderdata);

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


  }

  cancelupdatedp() {
    this.isDeliverypoolchange = false;
  }

  top200() {
    this.allOrder_lmt = '?index=0&limit=200';
    this.allorders()

  }

  top1000() {
    this.allOrder_lmt = '?index=0&limit=1000';
    this.allorders();
  }

  sendcommonNotify(data: any, totalrefund) {

    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'MGB : Order Number ' + data.invoicenum + ' has been cancelled successfully. Amount of Rs. ' + totalrefund + ' will be refunded within 6-7 Working days';

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
    };

    bulk.push(smsdata);

    const message1 = 'MGB : Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    const mobile1 = '0000000000';
    const smsdata1 = {
      id: data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
    };

    bulk.push(smsdata1);


    const message2 = 'MGB : Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    const mobile2 = '0000000000'; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: data.deliverypool,
      toMobile: mobile2,
      message: message2,
      notificationFor: 'DELIVERY_PERSON'
    };

    bulk.push(smsdata2);
    console.log('sending notification');
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

  sendNotifOndeliverychange(data: any) {

    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);




    const message1 = '(UPDATE) MGB : Order Number ' + data.invoicenum + ' has been Assigned to Delivery Person (' + this.ddname + ')';

    const mobile1 = '0000000000';
    const smsdata1 = {
      id: data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
    };

    bulk.push(smsdata1);


    const message2 = '(UPDATE) MGB : New Order ' + data.invoicenum + ' Assigned for Delivery from  ' + data.firmname;

    const mobile2 = '0000000000'; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: this.deliverypool,
      toMobile: mobile2,
      message: message2,
      notificationFor: 'DELIVERY_PERSON'
    };

    bulk.push(smsdata2);
    console.log('sending notification');
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
