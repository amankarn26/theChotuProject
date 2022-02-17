import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "../../services/rest.service";
declare var Swal: any;

@Component({
  selector: "app-deliverysettlement",
  templateUrl: "./deliverysettlement.component.html",
  styleUrls: ["./deliverysettlement.component.css"],
})
export class DeliverysettlementComponent implements OnInit {
  current_check: boolean;
  searchbydate_paid_currmonth: any;
  checked: boolean;
  mapid: any[];

  constructor(
    public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute
  ) {}

  public totalpayamount = 0;
  public totalrecamount = 0;

  Cashtotalpayamount = 0;
  Cashtotalrecamount = 0;

  public tab1 = false;
  public title = "";
  public subtitle = "";
  //public alertify = require('alertify.js');
  public flag = false;
  public activepage = false;
  public docServer = this.restService.docServer;

  // for datatable
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "role";
  public sortOrder = "asc";
  public data = [];

  public filterQuery1 = "";
  public filterQuery2 = "";
  public filterQuery3 = "";
  public filterQuery4 = "";

  public statusdelivery;

  public statusresponse;

  public customdate1;

  public fromDatee = "";
  public toDatee = "";

  public deliveredorders = [];
  public placedorders = [];
  public packedorders = [];
  public pickuporders = [];

  public refundedorders = [];

  public customdate;

  public customdate4 = false;
  public customdate5 = false;
  //  public orders;

  public orderids = [19241, 19214, 14781, 1245];

  public userType = sessionStorage.getItem("type");
  public userRole = sessionStorage.getItem("role");

  public employees = [];

  public selectedorders = [];
  selectstatus = "REFUNDED";

  public firm;
  public firmlist = [];

  public id;
  public isUpdate = false;

  public todayspayableorders = [];
  public todaysreceivedorders = [];

  public cashreceivedorders = [];
  public cashpayableorders = [];

  ngOnInit() {
    // this.getyestspayable();
    this.gettodayspayable();
    // this.gettodaysdate();

    // this.getyestreceieved();
    this.gettodaysreceived();

    // this.getcashpayableDay("THURSDAY");
    // this.getcashreceivedDay("THURSDAY");
  }

  // payable delivery

  // last month
  public getyestspayable() {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;

    this.restService.enableloading();

    var url = this.restService.delivertypoolRestURL("yestpayableD", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.todayspayableorders = response.amtobj;
        this.totalpayamount = response.totalamount;

        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  // current month
  public gettodayspayable() {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;
    this.restService.enableloading();
    var url = this.restService.delivertypoolRestURL("todayspayableD", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.todayspayableorders = response.amtobj;
        this.totalpayamount = response.totalamount;

        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.enableloading();
      }
    );
  }

  // custom date
  public gettodaysdate() {
    var url = this.restService.docsRestURL("todaysdate", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        const res = response;

        this.fromDatee = response.firstdate.substring(10, 0);
        this.toDatee = response.currentdate.substring(10, 0);
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // settled/received delivery

  //last month
  public getyestreceieved() {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;

    this.restService.enableloading();

    var url = this.restService.delivertypoolRestURL("yestreceivedD", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.todaysreceivedorders = response.amtobj;
        this.totalrecamount = response.totalamount;

        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  // current month
  public gettodaysreceived() {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;
    this.restService.enableloading();

    var url = this.restService.delivertypoolRestURL("todaysreceivedD", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.todaysreceivedorders = response.amtobj;
        this.totalrecamount = response.totalamount;

        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  // custom date

  private searchdayspayable() {
    // this.customdate=true;

    this.restService.enableloading();

    if (this.fromDatee === "" || this.toDatee === "") {
      Swal.fire(
        "From date or To date is NULL",
        "please fill the data",
        "error"
      );
    } else {
      const fdate = this.fromDatee;
      const todate = this.toDatee;
      //http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20

      var api = "/payable?fromdate=" + fdate + "&todate=" + todate;
      var url = this.restService.delivertypoolRestURL(
        "deliverypoolosearch",
        api
      );
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          console.log(response);
          this.todayspayableorders = response.amtobj;
          this.totalpayamount = response.totalamount;

          this.restService.disableloading();
        },
        (error) => {
          console.log("Error in data load.");
          this.restService.disableloading();

          // this.isLoader = false;
          // this.isLoader = false;
          // alert('false2='+this.isLoader);
        }
      );
    }
  }

  private searchdaysreceived() {
    // this.customdate=true;

    this.restService.enableloading();

    if (this.fromDatee === "" || this.toDatee === "") {
      Swal.fire(
        "From date or To date is NULL",
        "please fill the data",
        "error"
      );
    } else {
      const fdate = this.fromDatee;
      const todate = this.toDatee;
      //http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20

      var api = "/received?fromdate=" + fdate + "&todate=" + todate;
      var url = this.restService.delivertypoolRestURL(
        "deliverypoolosearch",
        api
      );
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          console.log(response);
          this.todaysreceivedorders = response.amtobj;
          this.totalrecamount = response.totalamount;

          this.restService.disableloading();
        },
        (error) => {
          console.log("Error in data load.");
          this.restService.disableloading();

          // this.isLoader = false;
          // this.isLoader = false;
          // alert('false2='+this.isLoader);
        }
      );
    }
  }

  examp() {
    var json = {
      isvendorpaid: "YES",
      orderids: this.orderids,
    };

    console.log(json);
  }

  getvendororders(data: any) {
    console.log(data);
    const json = {
      order: data,
    };
    //get orders
    // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL("getvendororders", "");
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        this.data = response;
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        //  Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.tab1 = true;
        //this.route.navigate(['/vendor_settlement_orders']);
      },
      (error) => {
        // Error Message
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  cancel() {
    this.tab1 = false;
  }

  vendorpaidorders(data: any) {
    console.log(data);
    const json = {
      isdeliverypaid: "YES",
      order: data,
    };
    //get orders
    // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL("vendorpaid", "");
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        Swal.fire("Delivery Paid", "", "success");
        window.scrollTo(0, 0);
        this.gettodayspayable();
        this.gettodaysreceived();
        this.getcashpayableDay("THURSDAY");
        this.getcashreceivedDay("THURSDAY");
      },
      (error) => {
        // Error Message
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  changestatus(data: any) {
    console.log(data);
    const json = {
      status: "CLOSED",
      order: data,
    };
    //get orders
    // http://localhost:8090/SmartSupplyManager/rest/order/details
    var url = this.restService.OrdersRestURL("bulkstatus", "");
    console.log(url);
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        //  Swal.fire(' Paid', '', 'success');
        window.scrollTo(0, 0);
        //  this.gettodayspayable();
        //  this.gettodaysreceived();
        this.statusdelivery = response[0].dperson;
        this.statusresponse = response;
        document.getElementById("id01").style.display = "block";
      },
      (error) => {
        // Error Message
        // Swal.fire(
        //   error.statusText,
        //   error._body,
        //   'error'
        // );
        document.getElementById("id01").style.display = "block";

        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
    return 0;
  }

  public refreshPage() {
    document.getElementById('id01').style.display='none'; 
    this.gettodayspayable();
    this.gettodaysreceived();
  }

  // last month

  public getcashorderreceived() {
    this.customdate = null;
    this.customdate1 = null;

    var url = this.restService.delivertypoolRestURL("cashorderR_D", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.cashreceivedorders = response.amtobj;
        this.Cashtotalrecamount = response.totalamount;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getcashorderpayable() {
    this.customdate = null;
    this.customdate1 = null;

    var url = this.restService.delivertypoolRestURL("cashorderP_D", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.cashpayableorders = response.amtobj;
        this.Cashtotalpayamount = response.totalamount;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  getcashpayableDay(day: any) {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;
    var url = this.restService.delivertypoolRestURL("cashorderP_D", day);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.cashpayableorders = response.amtobj;
        this.Cashtotalpayamount = response.totalamount;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getcashreceivedDay(day: any) {
    this.customdate = null;
    this.customdate1 = null;
    this.customdate4 = null;
    this.customdate5 = null;

    var url = this.restService.delivertypoolRestURL("cashorderR_D", day);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.cashreceivedorders = response.amtobj;
        this.Cashtotalrecamount = response.totalamount;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getcashpayablebydate() {
    this.customdate4 = true;

    this.restService.enableloading();

    if (this.fromDatee === "" || this.toDatee === "") {
      Swal.fire(
        "From date or To date is NULL",
        "please fill the data",
        "error"
      );
    } else {
      const fdate = this.fromDatee;
      const todate = this.toDatee;
      //http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20

      var api =
        "/payable/cash?type=CASH&fromdate=" + fdate + "&todate=" + todate;
      var url = this.restService.delivertypoolRestURL(
        "deliverypoolosearch",
        api
      );
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          console.log(response);
          this.cashpayableorders = response.amtobj;
          this.Cashtotalpayamount = response.totalamount;

          this.restService.disableloading();
        },
        (error) => {
          console.log("Error in data load.");
          this.restService.disableloading();

          // this.isLoader = false;
          // this.isLoader = false;
          // alert('false2='+this.isLoader);
        }
      );
    }
  }

  private getcashreceivebydate() {
    this.customdate5 = true;

    this.restService.enableloading();

    if (this.fromDatee === "" || this.toDatee === "") {
      Swal.fire(
        "From date or To date is NULL",
        "please fill the data",
        "error"
      );
    } else {
      const fdate = this.fromDatee;
      const todate = this.toDatee;
      //http://localhost:8090/SmartSupplyManager/rest/firm/payable?fromdate=2020-07-18&todate=2020-07-20

      var api =
        "/received/cash?type=CASH&fromdate=" + fdate + "&todate=" + todate;
      var url = this.restService.delivertypoolRestURL(
        "deliverypoolosearch",
        api
      );
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          console.log(response);
          this.cashreceivedorders = response.amtobj;
          this.Cashtotalrecamount = response.totalamount;

          this.restService.disableloading();
        },
        (error) => {
          console.log("Error in data load.");
          this.restService.disableloading();

          // this.isLoader = false;
          // this.isLoader = false;
          // alert('false2='+this.isLoader);
        }
      );
    }
  }

  // last month
  public getlastmonthorders() {
    this.customdate = null;
    this.checked = false;
    // this.customdate1=null;
    this.restService.enableloading();
    let api = "type=LASTMONTH";
    var url = this.restService.firmRestURL("invoice_paid", api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        // console.log(response);
        // this.paidorders = response.amtobj;
        // this.totalamount_paid = response.totalamount;
        // this.totalservice_paid = response.totalservice;

        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );

    this.selectedorders = [];
    this.mapid = [];
  }

  // current Month

  datesearchbypaid() {
    this.customdate = null;
    this.current_check = true;

    this.gettodaysdate();
    setTimeout(() => {
      this.searchbydate_paid_currmonth();
    }, 500);
  }
}
