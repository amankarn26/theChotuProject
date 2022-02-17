import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-deliverypool-orders',
  templateUrl: './deliverypool-orders.page.html',
  styleUrls: ['./deliverypool-orders.page.scss'],
})
export class DeliverypoolOrdersPage implements OnInit {

  status: string;
  title: string;
  orders: any[] = [];
  detailFlag = false;


  orderItems: any;
  userotp = '';
  otp = '';

  custMobile='0000000000';

  invoicenum = '';

  custname='';

  amount = 0 ;  // for amount payble and received in vendor

  segment = 'all';


  public docServer = this.restService.docServer;
  constructor(private router: Router,
    private restService: RestService,
    public toastController: ToastController,
    public routprms: ActivatedRoute,
    public alertController: AlertController,) {
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
    if (this.status === 'PACKED') {
      this.title = 'Packed Orders';
      this.getOrders();
    } else if (this.status === 'PICKED_UP') {
      this.title = 'Pickuped Orders';
      this.getOrders();
    } else if (this.status === 'DELIVERED') {
      this.title = 'Delivered Orders';
      this.getOrders();
    }  else if (this.status === 'AMOUNTPAYBLE') {
      this.title = 'Amount Payable';
      this.segment = 'TODAY';
      this.getOrders1();
    }else if (this.status === 'AMOUNTRECEIVED') {
      this.title = 'Amount Received';
      this.segment = 'TODAY';
      this.getOrders1();
    }else{
      this.title = 'Inactive Orders';

      if(this.status === 'PLACED'){
        this.title = 'Placed Orders';
      }
      this.getOrders();

      if (this.status === 'ALL') {
        this.title = 'All Orders';
      }
    }
  }


  getOrders() {
    let qerystr = '?person=' + localStorage.getItem('id')+'&status=' + this.status;
    // if (this.status === 'ACTIVE') {
    //   qerystr = qerystr + '&active=YES';
    // } else if(this.status === 'CLOSED') {
    //   qerystr = qerystr + '&active=NO';
    // }else if(this.status === 'ALL') {
    //   qerystr = '?firm=' + localStorage.getItem('firm') + '&index=1&limit=100';
    // }else{
    //   qerystr = qerystr + '&status=' + this.status;
    // }

    // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/order?person=67&status=PACKED  -- pool id


    if(this.status === 'ALL') {
      qerystr = '?person=' + localStorage.getItem('id');
      }

    const url = this.restService.compactRestURL('ordersbydeliverypool', qerystr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.orders = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  isOrders(): boolean {
    return this.orders.length == 0 ? false : true;
  }

  ordersDetails(index: any, id: any) {
    console.log('index' + index);
    console.log('id' + id);
    this.detailFlag = true;
    this.orderItems = this.orders[index];
  }

  cancel() {
    this.detailFlag = false;
    this.router.navigate(['/deliverypools/deliverypool-orders/' + this.status]);
  }

  back(){
    window.history.back();
  }


  changeStatus(STATUS: any, id: any, orderItems: any) {

    this.custMobile = orderItems.custmobile;
    this.invoicenum = orderItems.invoicenum;
    this.custname = orderItems.custname;



    if(STATUS ==='PICKED_UP'){
      this.updatingStatus(STATUS, id, orderItems);
    }else  if(STATUS ==='YES'){
      this.updatingStatus(STATUS, id, orderItems);
    } else  if(STATUS ==='NO'){
      this.updatingStatus(STATUS, id, orderItems);
    } else if(STATUS ==='CANCELLED'){
      this.updatingStatus(STATUS, id, orderItems);
    } else {

      this.generateotp();
      // this.presentToast('OTP Send=' + this.otp);
      this.sendMeberSMS();
      this.presentPrompt(STATUS, id, orderItems);

    }
  }

  updatingStatus(STATUS: any, id: any, orderItems: any){
    // this.presentToast('OTP Send=' + this.otp);


    let order = {
      id: id,
      // status: STATUS
    };

    if(STATUS ==='YES' || STATUS ==='NO'){
      order['isdeliveryaccept'] = STATUS;
    } else {
      order['status'] = STATUS;
    }


    console.log('update function');
    console.log(order);
    const url = this.restService.compactRestURL('updateorder', '');
    this.restService.postFormData(url, order).subscribe(
      response => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.presentToast('Order Picked Up');

        if(STATUS ==='PICKED_UP'){

          this.sendcommonNotify1(orderItems);

        }else if(STATUS ==='YES'){

          this.sendcommonNotify3(orderItems);

        }else if(STATUS ==='NO'){

          this.sendcommonNotify4(orderItems);

        }else{
          this.sendcommonNotify2(orderItems);
        }


    //    sendcommonNotify3



        this.getOrders();
        this.cancel();
      },
      error => {
        // Error Message
        this.presentToast('Failed To Picked Up');
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }


  generateotp() {
    this.otp = String(Math.floor(100000 + Math.random() * 900000)); // this.generatepassword;

    console.log('OTP='+this.otp);

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


  async presentPrompt(STATUS: any, id: any, orderItems: any) {
    // console.log('Inside Prompt');
    const alert = await this.alertController.create({
      header: 'Verify OTP',
      inputs: [
        {
          name: 'OTP',
          placeholder: '_ _ _ _ _ _'
        }
      ],
      buttons: [
        {
          text: 'Resend OTP',
          // role: 'cancel',
          handler: data => {
          this.resend();
          }
        },
        {
          text: 'Verify',
          handler: data => {


            console.log('verfifying otp');
            console.log('this.otp '+this.otp);
            console.log('data.otp'+data.otp);
            console.log(data);

            if (Number(this.otp) == Number(data.OTP)) {
              // logged in!
              console.log(this.otp);
              // console.log(this.userotp);
              this.presentToast('OTP Verified');
              this.updatingStatus(STATUS, id, orderItems);
              // if (this.segment === 'CUSTOMER') {
              //   this.submitData();
              // } else   if (this.segment === 'FIRM') {
              //   this.submitData1();
              // } else   if (this.segment === 'DELIVARY_PERSON') {
              //   this.submitData2();
              // }
            } else {
              // invalid login
              this.presentToast('Failed to Verify');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }


  resend(){
    this.generateotp();
  //  this.presentToast('OTP Send=' + this.otp);
    this.sendMeberSMS();
  }


  sendMeberSMS() {

    // this.custMobile = orderItems.custmobile;
    // this.invoicenum = orderItems.invoicenum;
    // this.custname = orderItems.custname;

    const message = 'Your OTP for receiving Order Number ' + this.invoicenum + ' is ' + this.otp +".IVPL";

    let mobile = this.custMobile;

    // switch (this.segment) {
    //   case 'CUSTOMER':
    //     mobile = this.user.phone;
    //     break;
    //   case 'FIRM':
    //     mobile = this.firm.phone;
    //     break;
    //   default:
    //     mobile = this.delivery.phone;
    //     break;
    // }

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



  getOrders1() {



    let qerystr;

    if (this.status === 'AMOUNTPAYBLE') {
      qerystr = '/payable?dperson=' + localStorage.getItem('id') + '&type=' + this.segment;
    }else{
      qerystr = '/received?dperson=' + localStorage.getItem('id') + '&type=' + this.segment;
    }

    // Get Information from JSON REST api
    const url = this.restService.compactRestURL('amountpayabledelivery', qerystr);
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

  async segmentChanged1(obj) {
    console.log(obj);
    console.log(this.segment);
    this.getOrders1();

  }


  sendcommonNotify1(data:any ) {

    let  bulk =  [];
    const refundvalue = (2/100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'JGL: Order Number '+ data.invoicenum + ' has been pickup and ready for delivery.';

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
        id:localStorage.getItem('id'),
        toMobile: mobile,
        message: message,
        notificationFor: 'CUSTOMER'
    };

    bulk.push(smsdata);

    const message1 = 'JGL: Order Number '+ data.invoicenum+ ' has been pickup and ready for delivery.';

    const mobile1 = '0000000000';
    const smsdata1 = {
        id:data.firm,
        toMobile: mobile1,
        message: message1,
        notificationFor: 'FIRM'
    };

    bulk.push(smsdata1);


    const message2 = 'JGL: Order Number '+ data.invoicenum+ ' has been pickup and ready for delivery.';

    const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone'); Your order is ready for pickukp
    const smsdata2 = {
        id:data.deliverypool,
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



sendcommonNotify2(data:any ) {

  let  bulk =  [];
  const refundvalue = (2/100) * Number(data.qcost.finalamt);
  console.log(refundvalue.toFixed(2));
  const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



  const message = 'JGL: Order Number '+ data.invoicenum+ ' has been delivered.';

  const mobile = data.custmobile; // localStorage.getItem('phone');
  const smsdata = {
      id:localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
  };

  bulk.push(smsdata);

  const message1 = 'JGL: Order Number '+ data.invoicenum+ ' has been delivered.';

  const mobile1 = '0000000000';
  const smsdata1 = {
      id:data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
  };

  bulk.push(smsdata1);


  const message2 = 'JGL: Order Number '+ data.invoicenum+ ' has been delivered.';

  const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone'); Your order is ready for pickukp
  const smsdata2 = {
      id:data.deliverypool,
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


sendcommonNotify3(data:any ) {

  let  bulk =  [];
  const refundvalue = (2/100) * Number(data.qcost.finalamt);
  console.log(refundvalue.toFixed(2));
  const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



  const message = 'JGL: Order Number '+ data.invoicenum+ ' has been accepted by Delivery Person.';

  const mobile = data.custmobile; // localStorage.getItem('phone');
  const smsdata = {
      id:localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
  };

  bulk.push(smsdata);

  const message1 = 'JGL: Order Number '+ data.invoicenum+ ' has been accepted by Delivery Person';

  const mobile1 = '0000000000';
  const smsdata1 = {
      id:data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
  };

  bulk.push(smsdata1);


  const message2 = 'JGL: Order Number '+ data.invoicenum+ ' has been accepted by Delivery Person';

  const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone'); Your order is ready for pickukp
  const smsdata2 = {
      id:data.deliverypool,
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
sendcommonNotify4(data:any ) {

  let  bulk =  [];
  const refundvalue = (2/100) * Number(data.qcost.finalamt);
  console.log(refundvalue.toFixed(2));
  const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



  const message = 'JGL: Order Number '+ data.invoicenum+ ' has been rejected by Delivery Person.';

  const mobile = data.custmobile; // localStorage.getItem('phone');
  const smsdata = {
      id:localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
  };

  bulk.push(smsdata);

  const message1 = 'JGL: Order Number '+ data.invoicenum+ ' has been rejected by Delivery Person';

  const mobile1 = '0000000000';
  const smsdata1 = {
      id:data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
  };

  bulk.push(smsdata1);


  const message2 = 'JGL: Order Number '+ data.invoicenum+ ' has been rejected by Delivery Person';

  const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone'); Your order is ready for pickukp
  const smsdata2 = {
      id:data.deliverypool,
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


async presentAlertConfirm(data:any) {

  const refundvalue = (2/100) * Number(data.qcost.finalamt);
  console.log(refundvalue.toFixed(2));
  const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);


  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Confirm!',
    // message : '2 % will be deducted from your total amount, Do you wish to proceed?',
   //  message: '2 % will be deducted from your Next order Settlement
   // if no delivery person available, deducted amount will be ' + refundvalue.toFixed(2) + ' /- ',
    message: '50% of delivery charges will be deducted from your Next order Settlement. deducted amount will be '
    +(Number(data.qcost.delivery)/2) + ' /- ',
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
        this.changeStatus('NO', data.id, data);
        console.log('order cancelled');
        }
      }
    ]
  });

  await alert.present();



}


}
