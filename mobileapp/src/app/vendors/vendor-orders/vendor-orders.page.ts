import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonBackButton, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.page.html',
  styleUrls: ['./vendor-orders.page.scss'],
})
export class VendorOrdersPage implements OnInit {

  status: string;
  title: string;
  orders: any[] = [];
  detailFlag = false;


  orderItems: any;

  segment = 'all';

  amount = 0 ;  // for amount payble and received in vendor

  changeexpdelivery;

  public docServer = this.restService.docServer;
  constructor(private router: Router,
              private restService: RestService,
              public toastController: ToastController,
              public routprms: ActivatedRoute,
              public alertController: AlertController) {
    // this.getOrders();
  }

  ngOnInit() {

    // Read parameter from route
    console.log(this.routprms.snapshot.params.status);
    this.status = this.routprms.snapshot.params.status;
    //  if (this.route.url === '/vendor-orders/' + encodeURIComponent(this.status)) {
    //   this.title = 'Update Customer ';
    //   this.subtitle = 'Edit customer  details.';
    //   this.flag = true;
    //   //  this.getAllDept();
    // } else if
    if (this.status === 'ACTIVE') {
      this.title = 'Active Orders';
      this.getOrders();
    } else if (this.status === 'PACKED') {
      this.title = 'Packed Orders';
      this.getOrders();
    }else if (this.status === 'CLOSED') {
      this.title = 'Closed Orders';
      this.getOrders();
    } else if (this.status === 'AMOUNTPAYBLE') {
      this.title = 'Amount Payable';
      this.segment = 'TODAY';
      this.getOrders1();
    }else if (this.status === 'AMOUNTRECEIVED') {
      this.title = 'Amount Received';
      this.segment = 'TODAY';
      this.getOrders1();
    }
    else {
      this.title = 'Inactive Orders';


      this.getOrders();

      if (this.status === 'ALL') {
        this.title = 'All Orders';
      }
    }
  }

  getOrders() {



    let qerystr;


    // if(this.segment==='all'){

    qerystr = '/status?branch=' + localStorage.getItem('firm');

    if (this.status === 'ACTIVE') {
      qerystr = qerystr + '&active=YES';
    } else if (this.status === 'CLOSED') {
      qerystr = qerystr + '&active=NO';
    } else if (this.status === 'ALL') {
      qerystr = '?branch=' + localStorage.getItem('firm') + '&index=1&limit=100';
    } else {
      qerystr = qerystr + '&status=' + this.status;
    }



    // }else{

    //  // order/this/week?status=PAID&firm=19219&thisweek=YES (thisweek=YES its gives you this week order)

    // //  qerystr = '/this/week?status='+this.status+'&firm=' + localStorage.getItem('firm');
    //   if (this.status === 'ACTIVE') {
    //     qerystr = qerystr + '&active=YES';
    //   } else if(this.status === 'CLOSED') {
    //     qerystr = qerystr + '&active=NO';
    //   }else if(this.status === 'ALL') {
    //     qerystr = '?firm=' + localStorage.getItem('firm')+ '&index=1&limit=100';
    //   }else{
    //     qerystr = qerystr + '&status=' + this.status;
    //   }

    //   if(this.segment==='Week'){
    //     qerystr = qerystr + '&thisweek=YES';
    //     //
    //   }else{
    //     qerystr = qerystr + '&thisweek=NO';
    //   }

    // }

    if (this.status === 'PACKED') {


      if (this.segment === 'Week') {
        qerystr = '?branch=' + localStorage.getItem('firm');
        qerystr = qerystr + '&status=' + this.status;
        qerystr = qerystr + '&thisweek=YES';
        //
      } else if (this.segment === 'today') {
        qerystr = '?branch=' + localStorage.getItem('firm');
        qerystr = qerystr + '&status=' + this.status;
        qerystr = qerystr + '&thisweek=NO';
      }else{
        qerystr = '/status?branch=' + localStorage.getItem('firm');

        qerystr = qerystr + '&status=' + this.status;
      }
    } else {
      if (this.segment === 'Week') {
        qerystr = qerystr + '&type=THISWEEK';
      } else if (this.segment === 'today') {
        qerystr = qerystr + '&type=TODAY';
      }
    }




    // Get Information from JSON REST api
    const url = this.restService.compactRestURL('ordersbystatus', qerystr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.orders = response;
        // return response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  getOrders1() {

    let qerystr;

    if (this.status === 'AMOUNTPAYBLE') {
      qerystr = '/payable?branch=' + localStorage.getItem('firm') + '&type=' + this.segment;
    }else{
      qerystr = '/received?branch=' + localStorage.getItem('firm') + '&type=' + this.segment;
    }

    // Get Information from JSON REST api
    const url = this.restService.compactRestURL('ordersbybranch', qerystr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.orders = response.order;
        this.amount = response.amount;
        // return response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }





  isOrders(): boolean {
    return this.orders.length == 0 ? false : true;
  }

  // ionViewWillEnter() {
  //   this.getOrders();
  //   this.detailFlag = false;
  //   console.log('ionViewWillEnter ');  // called on first time
  // }

  ordersDetails(index: any, id: any) {
    console.log('index' + index);
    console.log('id' + id);
    this.detailFlag = true;
    this.orderItems = this.orders[index];
  }

  cancel() {
    this.detailFlag = false;
    this.router.navigate(['/vendors/vendor-orders/' + this.status]);
  }

  back(){
    window.history.back();
  }


  changeStatus(STATUS: any, id: any, orderItems: any) {

    let order = {
      id: id,
    //  status: STATUS
    };




    if(STATUS === 'PACKED'){
      order['status'] = STATUS;
    }else if(STATUS === 'CANCELLED'){


      // const refundvalue = (2/100) * Number(orderItems.qcost.finalamt);
      // console.log(refundvalue.toFixed(2));
      // const totalrefund = Number(orderItems.qcost.finalamt) - Number(refundvalue);


      order['status'] = STATUS;
      order['qcost'] =     {
        refundamt: orderItems.qcost.finalamt,
      };
    }else if(STATUS === 'YES'){
      order['isvendoraccept'] = STATUS;
    }







    console.log('update function');
    console.log(order);
    const url = this.restService.compactRestURL('updateorder', '');
    this.restService.postFormData(url, order).subscribe(
      response => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Swal('Added', '', 'success');
        // this.router.navigate(['/managecustomer']);
        // window.scrollTo(0, 0);


        if(STATUS === 'PACKED'){
          this.presentToast('Order Packed');
        }else if(STATUS === 'CANCELLED'){
          this.presentToast('Order Cancelled');
        }else if(STATUS === 'YES'){
          this.presentToast('Order Accepted');
        }



        this.getOrders();


        this.sendcommonNotify(orderItems, STATUS);
        // this.router.navigate(['/vendors/vendor-orders/' + this.status]);

        // if(STATUS ==='PACKED'){
        //   this.router.navigate(['/vendors/vendor-orders/ACTIVE']);

        // }
        this.cancel();


      },
      error => {
        // Error Message
        // Swal(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        this.presentToast('Failed To Packed');
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;

  }





  changeDelivery(id: any) {


    const order = {
      id: id,
      expdelivery:this.changeexpdelivery.substring(0,10)
    };

    console.log('update function');
    console.log(order);
    const url = this.restService.compactRestURL('updateorder', '');
    this.restService.postFormData(url, order).subscribe(
      response => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.changeexpdelivery = '';
        this.presentToast('Success');
        this.getOrders();
        this.cancel();
      },
      error => {
        this.presentToast('Failed To Change');
        console.log('Error in data load.');
      }
    );
    return 0;


  }


  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      // animated: true,
      duration: 2000
    });
    toast.present();
  }


  async segmentChanged(obj) {
    console.log(obj);
    console.log(this.segment);
    this.getOrders();

  }

  async segmentChanged1(obj) {
    console.log(obj);
    console.log(this.segment);
    this.getOrders1();

  }



  sendcommonNotify(data: any, STATUS: any) {

    let bulk = [];
    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    let message;

    if (status === 'PACKED') {
      message = 'JGL: Order Number ' + data.invoicenum + ' has been Packed and ready for pickup.';
    } else if (status === 'CANCELLED') {
      message = 'JGL: Order Number ' + data.invoicenum + ' has been Cancelled.';
    }else if(STATUS === 'YES'){
      message = 'JGL: Order Number ' + data.invoicenum + ' has been Accepted by vendor.';
    }





    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: data.customer, // localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
    };

    bulk.push(smsdata);

    let message1; //  = 'JGL: Order Number '+ data.invoicenum+ ' has been Packed and ready for pickup.';

    if (status === 'PACKED') {
      message1 = 'JGL: Order Number ' + data.invoicenum + ' has been Packed and ready for pickup.';
    } else if (status === 'CANCELLED') {
      message1 = 'JGL: Order Number ' + data.invoicenum + ' has been Cancelled.';
    }else if(STATUS === 'YES'){
      message = 'JGL: Order Number ' + data.invoicenum + ' has been Accepted by vendor.';
    }

    const mobile1 = '0000000000';
    const smsdata1 = {
      id: data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
    };

    bulk.push(smsdata1);


    let message2; //  = 'JGL: Order Number '+ data.invoicenum+ ' has been Packed and ready for pickup.';


    if (status === 'PACKED') {
      message2 = 'JGL: Order Number ' + data.invoicenum + ' has been Packed and ready for pickup.';
    } else if (status === 'CANCELLED') {
      message2 = 'JGL: Order Number ' + data.invoicenum + ' has been Cancelled.';
    }else if(STATUS === 'YES'){
      message = 'JGL: Order Number ' + data.invoicenum + ' has been Accepted by vendor.';
    }



    const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone'); Your order is ready for pickukp
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





// cancelorder(data: any){

//   const refundvalue = (2/100) * Number(data.qcost.finalamt);
//   console.log(refundvalue.toFixed(2));
//   const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



//   let order =   {
//   id: data.id,
//   status: 'CANCELLED',
//   qcost: {
//     refundamt: totalrefund
//   }
//   };





//   console.log('update function');
//   console.log(order);
//   const url = this.restService.compactRestURL('updateorder', '');
//   this.restService.postFormData(url, order).subscribe(
//     response => {
//       // Responce data.
//       console.log('Status on Post API');
//       console.log(response);
//       this.sendCusomerSMS(data);
//       this.getOrders();
//     },
//     error => {
//       console.log('Error in data load.');
//     }
//   );
//   return 0;
// }

 //// for yes not confirmation
 async presentAlertConfirm(data:any) {

  const refundvalue = (2/100) * Number(data.qcost.finalamt);
  console.log(refundvalue.toFixed(2));
  const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    // message : '2 % will be deducted from your total amount, Do you wish to proceed?',
    message: '2 % will be deducted from your Next order Settelment, deducted amount will be ' + refundvalue.toFixed(2) + ' /- ',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.cancel();
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
        //  this.cancelorder(data);
        this.changeStatus('CANCELLED', data.id, data);
        console.log('order cancelled');
        }
      }
    ]
  });

  await alert.present();



}




}
