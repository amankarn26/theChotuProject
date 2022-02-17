import { RestService } from "./../services/rest.service";
import { CartService } from "./../cart.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  AnimationController,
  Animation,
  ToastController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
// import { clear } from 'console';

declare var RazorpayCheckout: any;
declare var Razorpay: any;

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit, AfterViewInit {
  //  created by asmita
  // islogout = localStorage.getItem('islogout');
  notshowdine = false;
  public allAddress = []
  public selectedAddress = {}

  public addresssId: any;

  public isAddressSelect = false

  RATEPERPLATE;
  RATEPERBOTTLE;
  RATEPERDRINK;

  // Final GST over all order
  // replace it with firm account
  public getGST = 5;

  // For discount availablity
  public discountFlag = false;

  // Is login
  public islogin = localStorage.getItem("islogin");

  // For deleivery
  public isDelEnable = false;

  selectedItems = [];
  total = 0;
  deliverycharges = 0;
  grandtotal = 0;
  grandtotalCopy = 0;
  public ordertype = "PICK_UP";
  validtill;

  price = 0;

  private transcationid;
  count;

  custName = localStorage.getItem("name");
  address = JSON.parse(localStorage.getItem("Address"));

  public expdeliverytime;
  public day;

  isStock = true;

  public selectSchedule = false

  public selectedDate: any
  public selectedTime: any

  invoicenum = "";

  custname = "";

  discount: 0;
  name = "";

  notavailable = false;

  deliveryperson = "";
  deliveryphone = "";

  vendorName = "";
  firm;

  isDeliveryperson = false;
  coupan;

  public offerlist;

  order = {
    firm: localStorage.getItem("selectedFirm"),
    customer: localStorage.getItem("id"),
    ordertype: "DINE_IN",
    comments: "",
    adddelivery: "NO",
    qcost: {
      totalitem: 0,
      baseprice: 0,
      gstamt: 0,
      delivery: 0,
      finalamt: 0,
      discountrate: 0,
      discountvalue: 0,
      servicecharge: 0,
      transferamt: 0,
      refundamt: 0,
      tip: 0,
    },

    status: "PLACED", // -- enum PLACED/ACCEPTED/IN_PROCESS / PACKED / DELIVERED
    expdelivery: "2020-05-28", // how to calculate
    expdeliverytime: "00:45:00", // how

    //   firm delivery days : 0 +6

    paymentmode: "BANK", //  --- always BANK (because we don't have cash on delivery provision)
    favourite: "NO", //  -- YES/NO default NO.
    //  'deliverypool': '67', // -- if usedeliverypool = YES, assign person for delivery.
    transactionid: "",
    oentry: [],
  };

  oentry = [];

  spinner = true;

  deliverypool;

  bulk = [];

  vendorid;
  deliverypersonid;

  // created on 25 mar 21
  isDiscountAvailable = false;
  discountAmount = 0;
  saved = 0;
  product: any;
  valid: Object;

  public discountInfo = {
    name: "",
    price: "",
    code: "",
  };

  anim: Animation;
  @ViewChild("upperBox", { static: false }) upperBox: ElementRef;

  constructor(
    private CartService: CartService,
    private restService: RestService,
    public toastController: ToastController,
    public route: Router,
    public alertController: AlertController,
    private animationCtrl: AnimationController
  ) { }
  ngAfterViewInit(): void {
    this.anim = this.animationCtrl.create("frameAnim");
    this.anim
      .addElement(this.upperBox.nativeElement)
      .duration(1000)
      .easing("ease")
      .fromTo("height", "0", "85px")
      .fromTo("opacity", "0", "1");
  }

  ngOnInit() {
    console.clear();
    this.getFirmStoreIt();
    this.getoffer();
    if (this.CartService.getCart().length > 0) {
      // this.getDeliverycharges();
      this.recal();
    } else {
      this.spinner = false;
    }
  }

  ionViewDidEnter() {
    // Play Animation
    this.getAllLocation();
    setTimeout(() => {
      if (this.selectedItems.length > 0) {
        this.anim.play();
      }
    }, 500);
    setTimeout(() => {
      this.order.ordertype = "HOME_DELIVERY";
      this.setOrderType()
    }, 1000);
  }

  public loginNow() {
    this.route.navigate(["/index/login"]);
  }

  public setOrderType() {
    if (this.order.ordertype === "HOME_DELIVERY") {
      this.order.adddelivery = "YES";
      this.isDelEnable = true;
      this.notshowdine = true;
      this.getDeliverycharges();
    }
    else if (this.order.ordertype === "DINE_IN") {
      this.order.adddelivery = "NO";
      this.notshowdine = false;
      this.isDelEnable = false;
    }
    else if (this.order.ordertype === "PICK_UP") {
      this.order.adddelivery = "NO";
      this.notshowdine = true;
      this.isDelEnable = false;
    } else {
      this.order.adddelivery = "NO";
      this.notshowdine = false;
      this.isDelEnable = false;
    }
  }

  ionViewWillEnter() {
    this.bulk = [];
  }

  recal() {
    // alert('1');
    this.isStock = true;

    let items = [];
    items = this.CartService.getCart(); //  JSON.parse(localStorage.getItem('cartData')); //
    // alert('2');

    let selected = this.CartService.getCart();

    // for (let obj of items) {
    //   if (selected[obj.id]) {
    //     selected[obj.id].count = parseFloat(selected[obj.id].count) + parseFloat(obj.quantity);
    //   } else {
    //     selected[obj.id] = { ...obj, count: obj.quantity };
    //   }

    //   if (obj.stockStatus) {
    //     if (obj.stockStatus === 'NO') {
    //       this.isStock = false;
    //     }
    //   }
    //   // alert('3'+obj.gst);
    // }
    this.selectedItems = Object.keys(selected).map((key) => selected[key]);

    this.populateorder();
  }

  initPay() {
    this.updatecustomer()

    if (this.isDiscountAvailable) {
      this.grandtotal = this.grandtotalCopy;
    }

    // payment json
    this.grandtotal = Math.ceil(this.grandtotal);
    let options: any = {
      key: "rzp_test_ln3H1ThXqJC3Dp", // Enter the Key ID generated from the Dashboard 
      amount: this.grandtotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Softwiders Pvt. Ltd.",
      description: "Mobile Payment",
      image: "https://aaitheantiquebake.com/admin/assets/img/logo.png",
      handler: this.submitData.bind(this),
      // handler: function (response) {
      //   //  alert(response.razorpay_payment_id);
      //   // this.submitData(response.razorpay_payment_id);
      //   // console.log('response.razorpay_payment_id '+response.razorpay_payment_id);
      //   // this.transcationid = response.razorpay_payment_id;
      //   // this.submitData(this.transcationid);
      // },
      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        contact: localStorage.getItem("phone"), // "9999999999"
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();

    // this.submitData(this.transcationid);
  }

  payWithRazor() {

    this.updatecustomer()

    if (this.isDiscountAvailable) {
      this.grandtotal = this.grandtotalCopy;
    }

    this.grandtotal = Math.ceil(this.grandtotal);
    var options = {
      description: "Credits towards Food",
      image: "https://aaitheantiquebake.com/assets/img/logo.png",
      currency: "INR", // your 3 letter currency code
      // key: 'rzp_live_DVIUD4H4FZ13mS', // 'rzp_live_6J1uAPqa98eXVJ', // your Key Id from Razorpay dashboard
      key: "rzp_live_6J1uAPqa98eXVJ", // your Key Id from Razorpay dashboard
      amount: this.grandtotal * 100, // Payment amount in smallest denomiation e.g. cents for USD
      name: "AAI The Antique Bake",
      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        contact: localStorage.getItem("phone"), // "9999999999"
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          alert("dismissed");
        },
      },
    };

    //  RazorpayCheckout.open(options, successCallback, cancelCallback);

    var successCallback = (success) => {
      var orderId = success.razorpay_order_id;
      var signature = success.razorpay_signature;
      this.transcationid = orderId;
      this.order.transactionid = this.transcationid;
      this.addOrder();
    };

    var cancelCallback = (error) => {
      this.Alert();
    };
    RazorpayCheckout.on("payment.success", successCallback);
    RazorpayCheckout.on("payment.cancel", cancelCallback);
    RazorpayCheckout.open(options);
  }

  async Alert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: "Payment Failed",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async AlertDelevry() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: "We dont have delivery person to serve you. Kindly contact us.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  cancel() {
    window.history.back();
  }

  submitData(response) {
    // alert('payemnt Success');
    this.transcationid = response.razorpay_payment_id;
    // alert('calling to add order' + response.razorpay_payment_id);
    // if(this.options.handler){
    // this.populateorder();
    // }
    this.order.transactionid = this.transcationid;
    this.addOrder();
  }

  public addOrder() {
    if (this.isDiscountAvailable) {
      this.order.qcost.finalamt = this.grandtotalCopy;
    }
    else {
      this.order.qcost.finalamt = this.grandtotal;
    }
    
    let AajKaDate = new Date(Date.now() + 45 * 60000);
    if (this.selectSchedule) {
      console.log(this.selectedDate)
      console.log(this.selectedTime)

      let tempData = new Date(this.selectedDate)

      this.order.expdelivery =
      this.nutilizeDate(tempData.getFullYear()) +
      "-" +
      this.nutilizeDate(tempData.getMonth() + 1) +
      "-" +
      this.nutilizeDate(tempData.getDate());


      tempData = new Date(this.selectedTime)

      this.order.expdeliverytime =
        this.nutilizeDate(tempData.getHours()) +
        ":" +
        this.nutilizeDate(tempData.getMinutes()) +
        ":" +
        this.nutilizeDate(tempData.getSeconds());
    }
    else {
      this.order.expdelivery =
        this.nutilizeDate(AajKaDate.getFullYear()) +
        "-" +
        this.nutilizeDate(AajKaDate.getMonth() + 1) +
        "-" +
        this.nutilizeDate(AajKaDate.getDate());
  
      this.order.expdeliverytime =
        this.nutilizeDate(AajKaDate.getHours()) +
        ":" +
        this.nutilizeDate(AajKaDate.getMinutes()) +
        ":" +
        this.nutilizeDate(AajKaDate.getSeconds());
    }

    this.order.firm = localStorage.getItem("selectedFirm");

    // alert('order add call');

    console.log(this.order)

    this.spinner = true;
    const url = this.restService.compactRestURL("addorder", "");
    this.restService.postFormData(url, this.order).subscribe(
      (response: any) => {
        // Responce data.

        if (response === "DELIVERY_PERSON_NOT_AVAILABLE") {
          this.AlertDelevry();
        } else {
          this.order.comments = response.comments;
          this.order.ordertype = response.ordertype;
          this.invoicenum = response.invoice;
          this.presentToast("Order Placed");

          // this.sendCusomerSMS();
          // this.sendVendorSMS(response.number);

          if (this.isDelEnable == true && this.notshowdine == true) {
            this.sendDpersonSMS(response.dpnumber, response.vendor);
          }

          this.sendcommonNotify();
          this.spinner = false;

          this.CartService.makecartEmpty();

          this.route.navigate(["/tabs/tab2"]);
        }

        // location.reload();
      },
      (error) => {
        this.spinner = false;
        this.presentToast("Order Failed");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  populateorder() {
    this.oentry = [];

    this.order.transactionid = this.transcationid;

    for (let data of this.selectedItems) {
      let gstamtInner = data.ratewithgst - data.price;
      const obj = {
        dname: data.name,
        rateperunit: data.price,
        rateunit: data.rateunit,
        qty: data.serves,
        hasvariant: data.hasvariant,
        variant: data.variantid.variant,
        amount: Number(data.price) * Number(data.serves),
        entrytotal: Number(data.price) * Number(data.serves),
      };

      this.oentry.push(JSON.parse(JSON.stringify(obj)));
      console.log('this.oentry', this.oentry);
      // console.log(this.oentry);
    }

    this.order.qcost.totalitem = Number(this.selectedItems.length);
    this.order.qcost.baseprice = this.selectedItems.reduce(
      (a, b) => a + b.serves * b.price,
      0
    );
    // this.order.qcost.gstamt = this.selectedItems.reduce((a, b) => {
    //   let getAmount = b.serves * b.price
    //   let finalGst = (getAmount * 5)/100
    //   let finalGstamt = a + finalGst
    //   return finalGstamt
    // }, 0);
    this.order.qcost.gstamt = (this.order.qcost.baseprice * this.getGST) / 100;
    this.order.qcost.delivery = this.deliverycharges;
    this.order.qcost.finalamt = this.grandtotal;

    this.total = this.selectedItems.reduce((a, b) => a + b.serves * b.price, 0);
    this.grandtotal =
      this.total + this.deliverycharges;

    this.order.oentry = this.oentry;
    this.spinner = false;

  }

  getDeliverydetails() {
    // alert('getting list');
    const urlstr = localStorage.getItem("selectedFirm");
    const url = this.restService.compactRestURL("deliverydate", urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.expdeliverytime = response.expdeliverytime;
        this.day = response.day;
        this.order.expdelivery = this.unixTimeConverter(this.day);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  public unixTimeConverter(ts) {
    let datetime = "";
    const dattime1 = "";
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = "0";

    /******************* */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dtt = new Date(ts * 1000);
    // Hours part from the timestamp
    const hours = dtt.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + dtt.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + dtt.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ":" + minutes.substr(-2);
    // alert(formattedTime);
    /*********************************************************** */

    try {
      const dateVal = "/Date(" + ts + ")/";
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else {
        mm = (date.getMonth() + 1).toString();
      }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;

        dd = temp1;
      } else {
        dd = date.getDate().toString();
      }

      //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
      datetime = date.getFullYear() + "-" + mm + "-" + dd;
    } catch (err) {
      console.log("Unable to parse date data in unixTimeConverter");
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;
  }

  removefromcart(item: any) {
    this.CartService.removeProduct(item.id);
    this.recal();
  }

  makecartEmpty() {
    this.CartService.makecartEmpty();
    this.recal();
  }

  getDeliverycharges() {
    // alert('getting list');
    // http://localhost:8090/SmartSupplyManager/rest/order/Dcharge?firm=20&customer=12
    // http://localhost:8090/NaturalHomeoManager/dcharge?branch=19338&customer=19293
    //http://localhost:8090/NaturalHomeoManager/dcharge?branch=19334&customer=19126
    // const urlstr = 'dcharge/' + localStorage.getItem('id');

    const urlstr =
      "dcharge?firm=" +
      localStorage.getItem("selectedFirm") +
      "&customer=" +
      localStorage.getItem("id") +
      "&item=" +
      this.selectedItems?.length +
      "&duration=WITHIN_4_HRS&specialitem=NO";
    const url = this.restService.compactRestURL("deliveryCharges", urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.deliverycharges = Number(response.charge);
        if (response.status === "Success") {
          this.deliveryperson = response.dperson;
          this.deliveryphone = response.number;
          this.isDeliveryperson = true;
          this.deliverypool = response.deliverypool;
        } else {
          // alert('Delivery Person Not Available');
        }
        this.recal();
      },
      (error) => {
        console.log("Error in data load.");
        this.recal();
      }
    );
  }

  sendCusomerSMS() {
    this.sendCusomerNotify();
    let message =
      "Order Number  " + this.invoicenum + "  placed successfully. IVPL";

    let mobile = localStorage.getItem("phone");
    const smsdata = {
      toMobile: mobile,
      message: message,
    };
    const url = this.restService.smsRestURL("send", "");
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  sendCusomerNotify() {
    let message =
      "Order Number " + this.invoicenum + " placed successfully.";

    if (this.isDelEnable == true && this.notshowdine == true) {
      message =
        "Order Number " +
        this.invoicenum +
        " placed successfully. Expected Delivery time is :" +
        this.order.expdeliverytime;
    }

    if (this.isDelEnable == false && this.notshowdine == true) {
      message =
        "Order Number " +
        this.invoicenum +
        " placed successfully. Expected Pickup time is :" +
        this.order.expdeliverytime;
    }

    let mobile = localStorage.getItem("phone");
    const smsdata = {
      id: localStorage.getItem("id"),
      toMobile: mobile,
      message: message,
      notificationFor: "CUSTOMER",
    };
    this.bulk.push(smsdata);
  }

  sendVendorSMS(mobile: any) {
    this.sendVendorNotify(mobile);

    const message =
      "New Order Placed " +
      this.invoicenum +
      " by " +
      localStorage.getItem("name")
    " .IVPL";

    const smsdata = {
      id: localStorage.getItem("selectedFirm"),
      toMobile: mobile,
      message: message,
    };
    const url = this.restService.smsRestURL("send", "");
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  sendVendorNotify(mobile: any) {
    const message =
      "New Order Placed " +
      this.invoicenum +
      " by " +
      localStorage.getItem("name");
    const smsdata = {
      toMobile: mobile,
      message: message,
      notificationFor: "FIRM",
      id: localStorage.getItem("selectedFirm"),
    };

    this.bulk.push(smsdata);
  }

  sendDpersonSMS(mobile: any, vendor: any) {
    this.sendDpersonNotify(mobile, vendor);

    const message =
      "New Order " +
      this.invoicenum +
      " Assigned for Delivery from  " +
      vendor +
      " .IVPL";
    const smsdata = {
      id: this.deliverypool,
      toMobile: mobile,
      message: message,
    };
    const url = this.restService.smsRestURL("send", "");
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }
  sendDpersonNotify(mobile: any, vendor: any) {
    const message =
      "New Order " +
      this.invoicenum +
      " Assigned for Delivery from  " +
      vendor;
    const smsdata = {
      toMobile: mobile,
      message: message,
      notificationFor: "DELIVERY_PERSON",
      id: this.deliverypool,
    };
    this.bulk.push(smsdata);
  }

  //// for yes not confirmation
  async clearCart() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Confirm!",
      message: "Are you sure you would like to clear cart?",
      // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Clearing Cart Cancelled");
          },
        },
        {
          text: "Okay",
          handler: () => {
            console.log("Clearing Cart");
            localStorage.removeItem("cartData");
            localStorage.removeItem("selectedFirm");
            this.CartService.makecartEmpty();
            this.recal();

            this.route
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => {
                this.route.navigate(["/"]);
              });

            location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  sendcommonNotify() {
    const url = this.restService.notifyRestURL("sendM", "");
    this.restService.postFormData(url, this.bulk).subscribe(
      (response) => {
        // Responce data.
        localStorage.removeItem("cartData");
        localStorage.removeItem("selectedFirm");
        this.CartService.makecartEmpty();
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  continueshopping() {
    this.route.navigate(["/tabs/tab1"]);
  }

  public getoffer() {
    // Get Information from JSON REST api
    const url = this.restService.compactRestURL("getcoupan", this.coupan);
    this.restService.getJSONFromURL(url).subscribe(
      (response) => {
        this.restService.getJSONFromURL(response);
        this.offerlist = response;
        if (this.offerlist.length != 0) {
          this.discountFlag = true;
        }
        //this.data = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
  getofferbyid(firmId) {
    // Get Information from JSON REST api
    const url = this.restService.compactRestURL("getcoupanbyid", firmId);
    this.restService.getJSONFromURL(url).subscribe(
      (response) => {
        this.restService.getJSONFromURL(response);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  getcoupon() {
    // Get Information from JSON REST api
    // http://localhost:7094/discount?coupon=OFFER20&cartvalue=2200
    const strurl = this.coupan + "&cartvalue=" + this.grandtotal;
    const url = this.restService.compactRestURL("getcoupanbyname", strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.name = response.name;
        // this.offerlist = response;

        // set on UI

        if (response.valid === "YES") {
          console.log("Asmita", response);

          this.isDiscountAvailable = true;
          this.discountAmount = response.cartvalue - response.disvalue;
          this.saved = Number(response.cartvalue) - Number(response.disvalue);
          this.grandtotalCopy = response.disvalue;

          this.order.qcost.discountvalue = this.saved;
          this.order.qcost.discountrate = response.discount;

          this.discountInfo.name = response.name;
          this.discountInfo.code = response.couponcode;
          this.discountInfo.price = response.disvalue;
        }

        if (response.valid === "NO") {
          this.notavailable = true;
          this.isDiscountAvailable = false;
          this.AlertCoupanCodeInvalid(
            this.offerlist.find((offer) => offer.couponcode === this.coupan)
              .minvalue
          );
          this.coupan = "";
        }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  getFirmStoreIt() {
    const url = this.restService.compactRestURL("getallfirm", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // Responce data.
        localStorage.setItem("selectedFirm", response[0].id);
        // this.order.comments = response.comments;
      },
      (error) => {
        this.spinner = false;
        this.presentToast("Order Failed");
        // Doyour stuff here
      }
    );
  }

  add(index) {
    if (this.selectedItems[index].serves < 10) {
      // this.selectedItems[index].serves++;
      // this.selectedItems[index].amount = this.selectedItems[index].rateperunit * this.selectedItems[index].serves

      // Delete if Cart is in problem...
      this.notavailable = true;
      this.isDiscountAvailable = false;
      this.coupan = "";
      this.CartService.addProductItemInCart(index);

      this.populateorder();
    }
  }

  remove(index) {
    if (this.selectedItems[index].serves > 1) {
      // this.selectedItems[index].serves--;
      // this.selectedItems[index].amount = this.selectedItems[index].rateperunit * this.selectedItems[index].serves

      // Delete if Cart is in problem...
      this.notavailable = true;
      this.isDiscountAvailable = false;
      this.coupan = "";
      this.CartService.subProductItemInCart(index);

      this.populateorder();
    }
  }

  public openOrderType() {
    document.getElementById("ordertype").click();
  }

  public openCouponType() {
    document.getElementById("couponCodeBox").click();
  }

  public openScheduleTime() {
    this.selectSchedule = true
  }

  public openAddressSelect() {
    document.getElementById("addressCodeBox").click();
  }

  public changeAddressNow() {
    let selected = this.allAddress.filter(entry => entry.id == this.addresssId)
    this.selectedAddress = selected[0]
    this.isAddressSelect = true
    console.log(this.selectedAddress);

    localStorage.setItem("multiAddress", JSON.stringify(this.selectedAddress));
    this.getDeliverycharges();
  }

  async AlertCoupanCodeInvalid(minvalue) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: "Your order price must be greater then Rs." + minvalue,
      buttons: ["OK"],
    });

    await alert.present();
  }

  private nutilizeDate(date) {
    if (date < 10) {
      return "0" + date;
    } else {
      return date.toString();
    }
  }

  // For Updarting the password
  private updatecustomer() {

    let getAddress = JSON.parse(localStorage.getItem('multiAddress'))

    let setAddress = {
      line1: getAddress.line1,
      line2: getAddress.line2,
      city: getAddress.city,
      pincode: getAddress.pincode,
      states: getAddress.states,
      lattitude: getAddress.latitude,
      longitude: getAddress.longitude,
      country: getAddress.country,
    }

    const jsono = {
      id: localStorage.getItem("id"),
      address: setAddress,
    };

    const url = this.restService.customerRestURL("edit", "");
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        console.log(response)
      },
      (error) => {
        console.log("Error in data load.");

        // Doyour stuff here
      }
    );
  }


  private getAllLocation() {
    let custId = localStorage.getItem('id')

    let url = this.restService.custAddres('getByCust', custId);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        if (response.results.length > 0) {
          this.allAddress = response.results
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
}
