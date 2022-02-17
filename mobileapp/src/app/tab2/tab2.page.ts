import { RestService } from './../services/rest.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  orders: any[] = [];

  orderItems: any;

  custName = localStorage.getItem('name');
  address = JSON.parse(localStorage.getItem('Address'));


  public docServer = this.restService.docServer;

  segment = 'All';

  RATEPERPLATE;
  RATEPERBOTTLE;
  RATEPERDRINK;


  constructor(private router: Router, private restService: RestService, public toastController: ToastController,
    private CartService: CartService, public alertController: AlertController) {
    this.getOrders();
  }

  detailFlag = false;

  public getGST = 5;


  product = {
    id: 19174,
    name: '',
    rateunit: "RATEPERPLATE",
    // description: '',
    // priority: 1,
    // photos: [],
    img: '',
    price:0,
    serves: 1,
    amount: 0,
    hasvariant: '',
    variantid:'',
    entrytotal: 0,
    ordertype: '',
    qcost: [],
    totalitem: 0,
    baseprice: 0,
    gstamt: 0,
    delivery: 0,
    finalamt: 0,
    discountrate: 0,
    discountvalue: 0,
    servicecharge: 0,
    mfg:'',
    dishtype:'',
    menutype:'',
    transferamt: 0,
    rateperunit:0,
    refundamt: 0,
    tip: 0,
    status:''



  };

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }


  ionViewWillEnter() {
    // this.getOrders();
    this.detailFlag = false;
    console.log('ionViewWillEnter ');  // called on first time
    this.getOrders();
  }

  cancel() {
  
    this.detailFlag = false;
  }


  isOrders(): boolean {
    return this.orders?.length == 0 ? false : true;
  }


  getOrders() {
    // Get Information from JSON REST api


    // http://localhost:8090/SmartSupplyManager/rest/order?cust=12&fav=YES

    let qstr = localStorage.getItem('id');

    let cmd;


    if (this.segment === 'favourite') {
      qstr = qstr + '&fav=YES';
    }


    const url = this.restService.compactRestURL('ordersbycustomer', qstr);
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

  notshowdeliverycharge = false

  ordersDetails(index: any, id: any) {
    console.log('index' + index);
    console.log('id' + id);
    this.detailFlag = true;

    this.orderItems = this.orders[index];
    console.log("OrderItem::",this.orderItems);
    

  }

  showorderlist() {
    this.detailFlag = false;
  }


  back(){
    if (localStorage.getItem('islogin')) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/index/home']);
    }
  }

  like(like: string, id: any) {


    let order = {
      id: id,
      favourite: like
    };


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
        // this.presentToast('Added To Favourite');
        this.getOrders();
      },
      error => {
        // Error Message
        // Swal(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        console.log('Error in data load.');
        // Doyour stuff here
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


  repeatorder(id: number) {

    // alert('getting list');
    console.log('Getting productlist by prodtype and firm');
    // http://localhost:8090/SmartSupplyManager/rest/order/clone?id=19276
    // const urlstr = this.restService.ip + '/order/clone?id=' + id;
    // const url = urlstr;  
    const url = this.restService.compactRestURL('dishdetailsbyid_firm', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {

        
        localStorage.removeItem('cartData');
        localStorage.setItem('selectedFirm', response.firm);
        this.CartService.makecartEmpty();

        for (const data of response.oentry) {
          this.product.id = data.id;
          this.product.img = this.docServer + '/' + data.photo.docpath;
          this.product.menutype = data.menutype;
        
          this.product.dishtype = data.dishtype;
          this.product.name = data.dname,
            this.product.price = Number(data.rateperunit),
            this.product.rateperunit = Number(data.rateperunit),
            this.product.rateunit = data.rateunit,
            this.product.serves = data.qty,
            this.product.amount = Number(data.amount) * Number(data.qty),
            this.product.entrytotal = Number(data.amount) * Number(data.qty)
            this.product.qcost = data;
            this.product.hasvariant = data.hasvariant,
            this.product.ordertype = data.ordertype,
            this.product.gstamt = data.gstamt,
            this.product.totalitem = data.totalitem,
            this.product.finalamt = data.finalamt,
            this.product.refundamt = data.refundamt;
            this.product.status = data.status
          

          this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));
          console.log("getOrder::",response);
          console.log("this.product",this.product);
          // this.getDishDetail(data.dname,data.amount,data.qty)

        }

        // this.presentAlert();
        this.openCart();

        // Asmita alert lagana.... your order is added to cart.... to proceed go to cart

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getDishDetail(name,amount,qty) {
    const url = this.restService.dishByParam('byname', name);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {


        let addCartData = {
          "id": response.id,
          "name": response.name,
          "dishtype": response.dishtype,
          "rateunit": response.rateunit,
          "menutype": response.menutype,
          "description": response.description,
          "priority": response.priority,
          "photos": response.photos,
          "img": this.docServer + "/" +response.photos[0].docpath,
          "price": amount,
          "serves": qty,
          "bestseller": response.bestseller,
          "amount": amount,
          "rateperunit": response.rateperunit,
          "variantid": '',
          "hasvariant": response.hasvariant,
          "cstock": []
        }

        console.log("repeatOrder::",response);
          

        this.CartService.addProduct(JSON.parse(JSON.stringify(addCartData)));

        this.router.navigate(['/cart'])
        
        
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  openCart() {
    this.router.navigate(['/cart']);
  }



  cancelorder(data: any) {

    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    let order = {
      id: data.id,
      status: 'CANCELLED',
      qcost: {
        refundamt: totalrefund
      }
    };





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
        // this.presentToast('Added To Favourite');
        this.sendCusomerSMS(data);
        this.getOrders();
      },
      error => {
        // Error Message
        // Swal(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;




  }



  //// for yes not confirmation
  async presentAlertConfirm(data: any) {

    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      // message : '2 % will be deducted from your total amount, Do you wish to proceed?',
      message: '2 % will be deducted from your total amount, refund amount will be ' + totalrefund.toFixed(2) + ' /- ',
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
            this.cancelorder(data);
          }
        }
      ]
    });

    await alert.present();



  }


  sendCusomerSMS(data: any) {




    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'Order Number ' + data.invoicenum + ' has been cancelled successfully. Amount of Rs. ' + totalrefund + ' will be refunded within 6-7 Working days. IVPL';

    let mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      toMobile: mobile,
      message: message
    };
    console.log('sending sms');
    console.log(smsdata);
    const url = this.restService.smsRestURL('send', '');
    console.log(url);
    // this.sendCusomerNotify(data);
    // this.sendVendorNotify(data);
    // this.sendDeliveryNotify(data);
    this.sendcommonNotify(data);
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


  sendCusomerNotify(data: any) {

    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled successfully. Amount of Rs. ' + totalrefund + ' will be refunded within 6-7 Working days';

    let mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
    };

    console.log('sending sms');
    console.log(smsdata);
    const url = this.restService.notifyRestURL('send', '');
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




  sendVendorNotify(data: any) {

    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    let mobile = '0000000000';  //data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: data.firm,
      toMobile: mobile,
      message: message,
      notificationFor: 'FIRM'
    };
    console.log('sending sms');
    console.log(smsdata);
    const url = this.restService.notifyRestURL('send', '');
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



  sendDeliveryNotify(data: any) {

    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    let mobile = '0000000000';  //data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: data.deliverypool,
      toMobile: mobile,
      message: message,
      notificationFor: 'DELIVERY_PERSON'
    };
    console.log('sending sms');
    console.log(smsdata);
    const url = this.restService.notifyRestURL('send', '');
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



  sendcommonNotify(data: any) {

    let bulk = [];
    const refundvalue = (2 / 100) * Number(data.qcost.finalamt);
    console.log(refundvalue.toFixed(2));
    const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);



    const message = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled successfully. Amount of Rs. ' + totalrefund + ' will be refunded within 6-7 Working days';

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: localStorage.getItem('id'),
      toMobile: mobile,
      message: message,
      notificationFor: 'CUSTOMER'
    };

    bulk.push(smsdata);

    const message1 = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    const mobile1 = '0000000000';
    const smsdata1 = {
      id: data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: 'FIRM'
    };

    bulk.push(smsdata1);


    const message2 = 'JGL: Order Number ' + data.invoicenum + ' has been cancelled by Customer.';

    const mobile2 = '0000000000';  // data.custmobile; // localStorage.getItem('phone');
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


  // http://localhost:7094/dish/variant?dish=19216

  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'ashmita',
      // subHeader: 'Subtitle',
      message: 'your order is added to cart',
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
