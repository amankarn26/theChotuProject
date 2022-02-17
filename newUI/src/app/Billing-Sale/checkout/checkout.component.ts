import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./../../services/rest.service";
import { window } from "rxjs/operators";
import { Session } from "inspector";
import { Console } from "console";
import { throws } from "assert";
declare var Razorpay: any;

declare var Swal: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  public getGST = Number(localStorage.getItem("universalGST"));

  // customerlist: any[];
  public customerlist = [];
  // custid='Select Language';
  id: any;
  pstock: [];
  // oentry: any[];
  deliveryaddress: any;
  variant: any;
  value: any;
  data: any;
  adddelivery: "NO";
  selectbranch: string;
  branch: string;
  firmid: string;
  oentry: any[];
  document: any;
  selectedItems: any;
  CartService: any;
  qty: number;
  pdata: any;
  amount: number;

  public isDelivery = false;

  public offerlist;
  public discountFlag = false;
  public coupan;
  public isDiscountAvailable = false;
  public saved = 0;
  public grandtotalCopy = 0;
  // var: x=0;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) {}

  customerid;
  public dpid;
  public deliverypersonname;
  public deliverypersonnumber;

  public invoicenum = "";
  //  total = 0;
  deliverycharges = 0;
  grandtotal = 0;
  gsttotal = 0;

  public expdeliverytime;
  public day;

  public branchid;
  private transcationid;

  private deliveryerror;
  // custid='select';

  public userType = sessionStorage.getItem("type");
  public userRole = sessionStorage.getItem("role");

  public order = {
    customer: sessionStorage.getItem("customer"),
    firm: sessionStorage.getItem("firm"),
    ordertype: "DINE_IN",
    invoicenum: "IN-001",
    tablenumber: "",
    pannum: "",
    invoicedate: "",
    custname: "Neha",
    custmobile: "6666666666",
    custcity: "Nagpur",

    deliveryaddress: {
      line1: "Fsdf",
      line2: "TARASA ROAD",
      city: "city",
      pincode: "441401",
      states: "maharashtra",
      country: "India",
      latitude: 21.241327,
      longitude: 79.245493,
    },

    qcost: {
      totalitem: 0,
      baseprice: 0,
      gstamt: 0.0,
      delivery: 0.0,
      finalamt: 0.0,
      discountrate: 0,
      discountvalue: 0.0,
      servicecharge: 0.0,
      transferamt: 0.0,
      refundamt: 0.0,
      // tip: 0.0
    },

    comments: "Comment",
    status: "PLACED",
    expdelivery: "",
    expdeliverytime: "05:30:00",
    paymentmode: "BANK",
    favourite: "NO",
    deliverypool: "",
    deliveryperson: "",
    deliverymobile: " ",
    transactionid: " ",
    dpoolemail: "",

    isvendorpaid: "NO",
    isdeliverypaid: "NO",
    addedon: 1611041966321,
    isvendoraccept: "NO",
    isdeliveryaccept: "NO",

    adddelivery: "NO",

    oentry: [],
  };

  //  oentry = [];

  public items = JSON.parse(sessionStorage.getItem("items"));
  public ptotal = 0;
  public stotal = 0;
  public total = 0;
  public docServer = this.restService.docServer;
  public custid = "";
  public customerdata = [];

  public productdata = [];




  // NG On init
  ngOnInit() {
    this.getcartdata();
    this.getcustlist();

    // this.getcustomerbyid();

    this.getoffer();
    console.log("productdata::", this.productdata);
  }

  // CUSTOMER dropdown list
  public getcustlist() {
    this.customerlist = [];
    const url = this.restService.customerRestURL("getcustomer", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.customerlist = response;

        // if(this.customerlist.length != 0) {
        //   this.custid = response[0].id;
        //   this.getcustomerbyid()
        // }
        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // custmer get by id after click on customer
  private getcustomerbyid() {
    // Get Information from JSON REST api
    this.customerdata = [];

    let url = this.restService.customerRestURL("details", this.custid);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log("Done fatching data!");
        this.customerdata = response;
        this.order.customer = response.id;
        this.order.custname = response.name;
        this.order.custmobile = response.phone;
        this.order.custcity = response.city;

        this.order.deliveryaddress.line1 = response.address.line1;
        this.order.deliveryaddress.line2 = response.address.line2;
        this.order.deliveryaddress.city = response.address.city;
        this.order.deliveryaddress.pincode = response.address.pincode;
        this.order.deliveryaddress.states = response.address.states;
        this.order.deliveryaddress.country = response.address.country;
        this.order.deliveryaddress.latitude = response.address.latitude;
        this.order.deliveryaddress.longitude = response.address.longitude;

        console.log(this.customerdata["name"]);

        this.customerid = response.id;
        console.log(this.productdata);

        if (this.order.ordertype == 'HOME_DELIVERY') {
          this.getDeliverycharges()
        }

        // this.recalSparepart();
        // this.recalProduct();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getcartdata() {
    // let sparepart = [];
    let product = [];
    let cartcount = 0;

    if (sessionStorage.getItem("items")) {
      this.productdata = JSON.parse(sessionStorage.getItem("items"));

      // this.getDeliverycharges();

      this.populateorder();

      // this.plus();
      this.recalProduct();
    }
  }

  onDeletePstock(i) {
    console.log("Deleting*********************");
    if (this.productdata.length == 0) {
      this.deliverycharges = 0;
    }
    this.productdata.splice(i, 1);
    Swal.fire({ title: "Deleted!", icon: "success", timer: 800 });

    sessionStorage.setItem("items", JSON.stringify(this.productdata));
    this.getcartdata();
    //  this.recalcartcount();
    this.recalProduct();
  }

  recalProduct() {
    //    console.clear();
    if (this.productdata.length === 0) this.deliverycharges = 0;
    // else this.deliverycharges = 0;

    let total = 0;
    let gsttotal = 0;
    for (let data of this.productdata)
      total = total + Number(data.qty) * Number(data.rateperunit);
    gsttotal = (total * this.getGST) / 100;

    // alert(gsttotal);
    this.gsttotal = gsttotal;
    this.ptotal = total;
    this.finaltotal();
  }

  finaltotal() {
    if (this.order.adddelivery === "NO") {
      this.total = this.stotal + this.ptotal;
      this.grandtotal = this.gsttotal + this.total;
      console.log(this.grandtotal);
    } else {
      // this.getDeliverycharges();

      // this.recalProduct();

      // this.plus();

      this.total = this.stotal + this.ptotal;
      this.grandtotal = this.gsttotal + this.deliverycharges + this.total;
      console.log(this.deliverycharges);
    }
  }

  populateorder() {
    this.order.firm = this.firmid;

    console.log("productdata items");
    console.log(this.productdata);
    this.oentry = [];

    this.order.transactionid = this.transcationid;

    console.log("transaction id=" + this.transcationid);

    for (let data of this.productdata) {
      const obj = {
        dname: data.name,

        rateunit: data.rateunit,

        rateperunit: data.rateperunit,

        qty: data.qty,
        amount: Number(data.rateperunit) * Number(data.qty),

        entrytotal: "1",
      };
      this.oentry.push(JSON.parse(JSON.stringify(obj)));
      console.log("this.oentry");
      console.log(this.oentry);
    }

    this.order.qcost.totalitem = Number(this.productdata.length);
    this.order.qcost.baseprice = this.productdata.reduce(
      (a, b) => a + b.qty * b.rateperunit,
      0
    );

    this.order.qcost.gstamt = this.productdata.reduce(
      (a, b) => a + b.qty * b.gstamt,
      0
    );

    this.order.qcost.delivery = this.deliverycharges;
    this.order.qcost.finalamt = Math.round(this.grandtotal);

    this.order.oentry = this.oentry;

    console.log("order details");
    console.log(this.order);
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

  

  initPay() {
    // payment json
    let options: any = {
      ///real time key
      // key: 'rzp_live_DVIUD4H4FZ13mS',

      key: "rzp_test_BFZPuXGalgBJ1L", // Enter the Key ID generated from the Dashboard
      //amount: 1 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise

      amount: Math.round(this.grandtotal) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Softwiders Pvt. Ltd.",
      description: "MGB Transaction",
      image: "http://softwiders.com/images/inouvelle_logo.png",
      handler: this.submitData.bind(this),
      // handler: function (response) {
      //   //  alert(response.razorpay_payment_id);
      //   // this.submitData(response.razorpay_payment_id);
      //   // console.log('response.razorpay_payment_id '+response.razorpay_payment_id);
      //   // this.transcationid = response.razorpay_payment_id;
      //   // this.submitData(this.transcationid);
      // },
      prefill: {
        name: this.customerdata["name"],
        email: this.customerdata["email"],
        contact: this.customerdata["phone"],
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
    console.log("works");
    // this.submitData(this.transcationid);
  }

  submitData(response) {
    // alert('payemnt Success');
    console.log("logic to add order");
    this.transcationid = response.razorpay_payment_id;
    console.log("response.razorpay_payment_id");
    console.log(response.razorpay_payment_id);
    this.order.transactionid = this.transcationid;
    this.addOrder();
  }

  public addOrder() {
    if (this.order.tablenumber === "" && this.order.ordertype == "DINE_IN") {
      // if (this.order.tablenumber === ''){

      Swal.fire("Please select Table number!", "", "question");
    } else {
      this.oentry = [];

      this.order.transactionid = this.transcationid;
      console.log("transaction id=" + this.transcationid);

      // oenrty
      for (let data of this.productdata) {
        let obj;
        if (data.hasvariant === "NO") {
          obj = {
            dname: data.dname,
            rateperunit: data.rateperunit,
            rateunit: data.rateunit,
            qty: data.qty,
            hasvariant: data.hasvariant,
            variant: null,
            amount: Number(data.rateperunit) * Number(data.qty),
            entrytotal: Number(data.rateperunit) * Number(data.qty),
          };
        } else {
          obj = {
            dname: data.dname,
            rateperunit: data.rateperunit,
            rateunit: data.rateunit,
            qty: data.qty,
            hasvariant: data.hasvariant,
            variant: data.variant.id,
            amount: Number(data.rateperunit) * Number(data.qty),
            entrytotal: Number(data.rateperunit) * Number(data.qty),
          };
        }

        this.oentry.push(JSON.parse(JSON.stringify(obj)));
        console.log("this.oentry");
        console.log(this.oentry);
      }

      // qcost
      this.order.oentry = this.oentry;
      console.log("Manooj");

      console.log(this.productdata);

      this.order.qcost.totalitem = Number(this.productdata.length);
      this.order.qcost.baseprice = this.ptotal;

      this.order.qcost.gstamt = this.gsttotal;

      this.order.qcost.delivery = this.deliverycharges;

      if (this.isDiscountAvailable) {
        this.order.qcost.finalamt = Math.round(this.grandtotalCopy);
      } else {
        this.order.qcost.finalamt = Math.round(this.grandtotal);
        this.order.qcost.discountvalue = 0;
        this.order.qcost.discountrate = 0;
      }

      let AajKaDate = new Date(Date.now() + 45 * 60000);
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

      this.order.firm = localStorage.getItem("firm");

      if (this.order.ordertype == "HOME_DELIVERY") {
        this.order.adddelivery = "YES";
      }

      console.log("submitData function");
      console.log(this.order);
      const url = this.restService.compactRestURL("addorder", "");
      console.log(url);
      this.restService.postFormData(url, this.order).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
          console.log(response);

          this.invoicenum = response.invoice;

          this.sendCusomerSMS();
          this.sendcommonNotify(response, response.vendor);
          this.sendVendorSMS(response.number);
          this.sendDpersonSMS(this.deliverypersonnumber, response.vendor);

          sessionStorage.removeItem("items");

          let timerInterval;
          Swal.fire({
            title: "Thank You For Shopping!",
            //  text: 'Your Order has been PLACED for order no.'+' '+response.invoice+''+' '+'and delivered by you till'+' '+this.restService.unixTimeConverterDate(this.day),
            //  timer: 8000,
            icon: "success",

            timerProgressBar: true,

            onClose: () => {
              clearInterval(timerInterval);
              this.route.navigateByUrl("/custhomepage");
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              location.replace("/index.html#/custhomepage");
            }
          });
        },
        (error) => {
          // Error Message
          sessionStorage.removeItem("items");
          console.log(error);

          Swal.fire("Error:" + error.select, error.error, "error");

          console.log("Error in data load.");
        }
      );

      return 0;
    }
  }

  getDeliverycharges() {
    // alert('getting  delivery charges');
    console.log("Getting delivery details");

    this.branchid = sessionStorage.getItem("branch");

    this.id = sessionStorage.getItem("branchid1");

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var api = "?firm=" + localStorage.getItem('id') + "&customer=" + this.customerid + "&item="+ this.productdata.length +"&duration=WITHIN_4_HRS&specialitem=NO";
    } else {
      var api =
        "dcharge?branch=" + this.branchid + "&customer=" + this.customerid;
    }

    const url = this.restService.delivertypoolRestURL("delivery_charges_param", api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.deliverycharges = Number(response.charge);
        this.deliveryerror = response.error;
        this.deliverypersonname = response.dperson;
        this.deliverypersonnumber = response.number;
        this.dpid = response.deliverypool;

        if (response.error == "NONE") {
          this.isDelivery = true
        } else {
          Swal.fire("Delivery Person not available for that area","", "worning")
          this.order.ordertype = "DINE_IN"
        }
        

        this.populateorder();
        this.recalProduct();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // book order
  checkoouttopayment() {
    if (this.deliveryerror === "DELIVERY_PERSON_NOT_AVAILABLE") {
      Swal.fire(
        "Delivery Person not available for that area",
        "please try after sometime",
        "info"
      );
    } else {
      //  this.initPay();
      this.addOrder();
    }
  }

  sendCusomerSMS() {
    // this.custMobile = orderItems.custmobile;
    // this.invoicenum = orderItems.invoicenum;
    // this.custname = orderItems.custname;
    // const message = 'JGL: New Order Placed '+ this.invoicenum+ ' by '+ localStorage.getItem('name');
    const message =
      "Order Number " + this.invoicenum + " placed successfully. IVPL";

    let mobile = sessionStorage.getItem("phone");
    const smsdata = {
      toMobile: mobile,
      message: message,
    };
    console.log("sending sms");
    console.log(smsdata);
    const url = this.restService.smsRestURL("send", "");
    console.log(url);
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  sendVendorSMS(mobile: any) {
    // this.custMobile = orderItems.custmobile;
    // this.invoicenum = orderItems.invoicenum;
    // this.custname = orderItems.custname;
    const message =
      "New Order Placed " +
      this.invoicenum +
      " by " +
      localStorage.getItem("name") +
      ". IVPL";
    // const message = 'JGL: Order Number '+ this.invoicenum+ ' placed successfully. Expected Delivery:'+ this.order.expdelivery;

    // let mobile = localStorage.getItem('phone');
    const smsdata = {
      toMobile: mobile,
      message: message,
    };
    console.log("sending sms");
    console.log(smsdata);
    const url = this.restService.smsRestURL("send", "");
    console.log(url);
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  sendDpersonSMS(mobile: any, vendor: any) {
    // this.custMobile = orderItems.custmobile;
    // this.invoicenum = orderItems.invoicenum;
    // this.custname = orderItems.custname;
    const message =
      "New Order " +
      this.invoicenum +
      " Assigned for Delivery from  " +
      vendor +
      ". IVPL";
    // JGL: New Order IN#004  Assigned for Delivery from Jais Kirana
    // let mobile = localStorage.getItem('phone');
    const smsdata = {
      toMobile: mobile,
      message: message,
    };
    console.log("sending sms");
    console.log(smsdata);
    const url = this.restService.smsRestURL("send", "");
    console.log(url);
    this.restService.postFormData(url, smsdata).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  sendcommonNotify(data: any, vendor: any) {
    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);

    // const message = 'JGL: Order Number '+ data.invoicenum+ ' has been cancelled successfully. Amount of Rs. '+totalrefund+' will be refunded within 6-7 Working days';
    console.log(
      "data************************************* agyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );

    console.log(data);

    const message =
      "MGB: Order Number " +
      this.invoicenum +
      " placed successfully. Expected Delivery:" +
      this.order.expdelivery;

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: sessionStorage.getItem("id"),
      toMobile: mobile,
      message: message,
      notificationFor: "CUSTOMER",
    };

    bulk.push(smsdata);

    const message1 =
      "MGB: Order Number " +
      data.invoice +
      " has been Placed by Customer(" +
      sessionStorage.getItem("name") +
      ")";

    const mobile1 = "0000000000";
    const smsdata1 = {
      id: this.branchid,
      toMobile: mobile1,
      message: message1,
      notificationFor: "BRANCH",
    };

    bulk.push(smsdata1);

    const message2 =
      "MGB: New Order " +
      this.invoicenum +
      " Assigned for Delivery from  " +
      vendor;

    const mobile2 = "0000000000"; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: this.dpid,
      toMobile: this.deliverypersonnumber,
      message: message2,
      notificationFor: "DELIVERY_PERSON",
    };

    bulk.push(smsdata2);
    console.log("sending notification");
    console.log(bulk);
    const url = this.restService.notifyRestURL("sendM", "");
    console.log(url);
    this.restService.postFormData(url, bulk).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  // public buttonClick() {
  //   var i = 0;

  //   i++;
  //   this.document.getElementById('inc').value = i;
  // }

  // add(index) {

  //   if (this.selectedItems[index].serves < 10) {
  //     // this.selectedItems[index].serves++;
  //     // this.selectedItems[index].amount = this.selectedItems[index].rateperunit * this.selectedItems[index].serves

  //     // Delete if Cart is in problem...
  //     this.CartService.addProductItemInCart(index)

  //     this.populateorder();
  //   }
  // }

  // remove(index) {
  //   if (this.selectedItems[index].serves > 1) {

  //     this.CartService.subProductItemInCart(index)

  //     this.populateorder();
  //   }
  // }

  quantity: number = 1;
  i = 1;

  public plus() {
    if (this.i != 5) {
      this.i++;

      this.quantity = this.i;

      // this.order.oentry.quantity = this.order.oentry.qty;

      let total = 0;
      let gsttotal = 0;
      for (let data of this.productdata)
        total = total + Number(data.quantity) * Number(data.rateperunit);
      gsttotal = (total * 5) / 100;
    }
  }

  public minus() {
    if (this.i != 1) {
      this.i--;

      this.quantity = this.i;
    }
  }

  addqty(index) {
    if (this.productdata[index].qty < 10) {
      this.productdata[index].qty++;
      this.productdata[index].amount =
        this.productdata[index].rateperunit * this.productdata[index].qty;

      sessionStorage.setItem("items", JSON.stringify(this.productdata));
      this.recalProduct();
    }
  }

  removeqty(index) {
    if (this.productdata[index].qty > 1) {
      this.productdata[index].qty--;
      this.productdata[index].amount =
        this.productdata[index].rateperunit * this.productdata[index].qty;
    } else {
      this.productdata = this.productdata.filter((value, i, arr) => {
        return i != index;
      });
    }
    sessionStorage.setItem("items", JSON.stringify(this.productdata));
    this.recalProduct();
  }

  public getoffer() {
    // Get Information from JSON REST api
    const url = this.restService.discountRestURL("default", "");
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

  getcoupon() {
    // Get Information from JSON REST api
    // http://localhost:7094/discount?coupon=OFFER20&cartvalue=2200
    const strurl = this.coupan + "&cartvalue=" + this.grandtotal;
    const url = this.restService.discountRestURL("getcoupanbyname", strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.name = response.name;

        // set on UI

        if (response.valid === "YES") {
          this.isDiscountAvailable = true;
          this.saved = Number(response.cartvalue) - Number(response.disvalue);
          this.grandtotalCopy = response.disvalue;

          this.order.qcost.discountvalue = this.saved;
          this.order.qcost.discountrate = response.discount;

          // this.discountInfo.name = response.name;
          // this.discountInfo.code = response.couponcode;
          // this.discountInfo.price = response.disvalue;
        }

        if (response.valid === "NO") {
          this.isDiscountAvailable = false;

          let minValue = this.offerlist.find(
            (offer) => offer.couponcode === this.coupan
          ).minvalue;
          Swal.fire("Coupan only apply on " + minValue, "", "warning");
          this.coupan = "";
        }
        // alert("Done")
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private nutilizeDate(date) {
    if (date < 10) {
      return "0" + date;
    } else {
      return date.toString();
    }
  }

  public changeOrderType() {
    if (this.order.ordertype == "HOME_DELIVERY") {
      this.order.adddelivery = "YES";
      this.getcustomerbyid()
      // this.getDeliverycharges()
    }
    else {
      this.order.adddelivery = "NO";
      this.isDelivery = false
      this.getcustomerbyid()
    }
  }

  public clearFunction() {
    sessionStorage.removeItem("items");
    this.route.navigate(["/custhomepage"]);
  }
}
