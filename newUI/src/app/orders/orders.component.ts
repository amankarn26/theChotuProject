import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./../services/rest.service";
import { Console } from "console";
declare var Swal: any;

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  lmt = "&index=0&limit=25";
  allOrder_lmt = "?index=0&limit=200";

  public title = "";
  public subtitle = "";
  //public alertify = require('alertify.js');
  public flag = false;
  public activepage = false;
  public docServer = this.restService.docServer;

  public orderdata: any = [];
  deliverypersonupdate;
  // for datatable
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "role";
  public sortOrder = "asc";
  public data = [];

  public fromDatee = "";
  public toDatee = "";

  public dpname;

  public deliveredorders = [];
  public placedorders = [];
  public packedorders = [];
  public pickuporders = [];
  public servedorders = [];

  public customdate;

  public userType = localStorage.getItem("type");
  public userRole = localStorage.getItem("role");

  public employees = [];

  public selectedorders = [];

  public dpersonList = [];

  public branch: any;
  public branchlist = [];
  private firmID = localStorage.getItem("firm");

  public id;
  public isUpdate = false;

  public ratelabel = {
    firm: localStorage.getItem("firm"),
    label: "",
    description: "",
  };
  firm: string;

  constructor(
    public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.routprms.snapshot.params["id"];
    this.flag = false;
    if (this.route.url === "/detail_order/" + encodeURIComponent(this.id)) {
      this.title = "Update Rate Label";
      this.subtitle = "Edit Rate Label";

      this.getDataById();
    } else if (this.route.url === "/active_orders") {
      this.title = "Active Orders";
      this.subtitle = "Fill new Rate Label information and submit.";

      if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
        this.getopenorders();
      } else {
        this.getopenorders();
      }
    } else if (this.route.url === "/all_delivered_orders") {
      this.title = "Delivered Orders";
      this.subtitle = "";

      // Call the list to show.
      this.getDeliveredOrder();
    } else if (this.route.url === "/closed_orders") {
      this.title = "Closed Orders";
      this.subtitle = "Fill new Rate Label information and submit.";

      if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
        this.getclosedorders();
      } else {
        this.getclosedorders();
      }
    } else {
      this.title = "All Orders ";
      this.subtitle =
        "Manage  Rate Label information including view, add, update and delete";
      this.flag = false;
      this.activepage = false;

      if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
        this.getallbranch();
        this.allorders();
      } else {
        this.alltypesoforders();
      }
    }
  }

  public getDeliveredOrder() {
    this.restService.enableloading();

    let params =
      "status=DELIVERED&firm=" + localStorage.getItem("firm") + "&active=YES";

    var url = this.restService.OrdersRestURL("allActiveOrders", params);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  cancel() {
    window.history.back();
  }

  top200() {
    this.allOrder_lmt = "?index=0&limit=200";
    this.allorders();
  }

  top1000() {
    this.allOrder_lmt = "?index=0&limit=1000";
    this.allorders();
  }

  allorders() {
    this.restService.enableloading();

    var api = this.allOrder_lmt;
    var url = this.restService.OrdersRestURL("allorderss", this.allOrder_lmt);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  decrement() {
    this.lmt = "&index=0&limit=25";
    this.getallorders();
  }

  getall() {
    this.lmt = "&index=0&limit=1000";
    this.getallorders();
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
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var url = this.restService.OrdersRestURL("allorders", this.lmt);
    } else {
      var url = this.restService.OrdersRestURL("allorders", this.lmt);
    }

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getclosedorders() {
    this.restService.enableloading();

    var url = this.restService.OrdersRestURL("orderclose", this.firmID);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getreceivedorderspaid() {
    this.restService.enableloading();

    const url = this.restService.OrdersRestURL("orderbystatus", "PAID");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getopenorders() {
    this.restService.enableloading();

    var url = this.restService.OrdersRestURL("allactiveorder", this.firmID);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.data = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getDataById() {
    // Get Information from JSON REST api
    const url = this.restService.OrdersRestURL("details", this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.ratelabel.label = response.label;
        this.ratelabel.description = response.description;

        this.ratelabel["id"] = response.id;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  delete(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      type: "Warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.OrdersRestURL("delete", id);
        //   console.log('Delete using this id:' + id);
        //    const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            //  this.getEmpList();

            if (this.route.url === "/detail_order/" + encodeURIComponent(this.id)) {
              this.getDataById();
            } else if (this.route.url === "/active_orders") {
              if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
                this.getopenorders();
              } else {
                this.getopenorders();
              }
            } else if (this.route.url === "/all_delivered_orders") {
              // Call the list to show.
              this.getDeliveredOrder();
            } else if (this.route.url === "/closed_orders") {
              if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
                this.getclosedorders();
              } else {
                this.getclosedorders();
              }
            } else {
              if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
                this.getallbranch();
                this.allorders();
              } else {
                this.alltypesoforders();
              }
            }


            // Now do your stuff here
          },
          (error) => {
            // Error Message
            Swal.fire(error.statusText, error._body, "error");
            console.log("Error in data load.");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  }

  acceptOrder(id: number, orderType: string) {
    let order_update;

    if (orderType === "DINE_IN") {
      order_update = {
        id: id,
        status: "SERVED",
      };
    } else if (orderType === "PICK_UP" || orderType === "HOME_DELIVERY") {
      order_update = {
        id: id,
        status: "PACKED",
      };
    } else {
      order_update = {
        id: id,
        status: "PACKED",
      };
    }

    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.OrdersRestURL("update", "");
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // Now do your stuff here
        Swal.fire("Order Accepted", "", "success");
        // if (this.branch === undefined) {
        //   if (this.userRole === "SUPERADMIN") {
        //     this.allorders();
        //   } else {
        //     this.getallorders();
        //   }
        // } else {
        //   this.alltypesoforders();
        // }
        this.getopenorders();
        this.route.navigate(["/active_orders"]);
        window.scrollTo(0, 0);
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

  // Changing status of any order
  orderpacked(id: number, orderType: string, phoneNumber: string) {
    let order_update;

    if (orderType === "DINE_IN" || orderType === "PICK_UP") {
      order_update = {
        id: id,
        status: "CLOSED",
      };
    } else if ('orderType === "HOME_DELIVERY"' && 'status === "PACKED"') {
      order_update = {
        id: id,
        status: "PICKED_UP",
      };
    } else if ('orderType === "HOME_DELIVERY" && status === "PICKED_UP"') {
      order_update = {
        id: id,
        status: "DELIVERED",
      };
    } else if ('orderType === "HOME_DELIVERY"' && 'status === "DELIVERED"') {
      order_update = {
        id: id,
        status: "CLOSED",
      };
    }

    const url = this.restService.OrdersRestURL("update", "");
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        console.log("Status on Post API");
        console.log(response);

        Swal.fire("Order is Successfully Packed", "", "success");
        // if (this.branch === undefined) {
        //   if (this.userRole === 'SUPERADMIN') {
        //     this.allorders();
        //   } else {
        //     this.getallorders();
        //   }

        // }
        // else {
        //   this.alltypesoforders();
        // }

        if (this.route.url === "/all_delivered_orders")
          this.getDeliveredOrder();
        else this.getopenorders();

        if (order_update.status == "CLOSED") {
          this.sendInvoice(id, phoneNumber);
          // this.getopenorders();
        }

        this.sendcommonNotify(this.data);
        window.scrollTo(0, 0);
      },
      (error) => {
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
      }
    );
    return 0;
  }

  orderpacked1(id: number, orderType: string, phoneNumber: string) {
    let order_update;

    if ('orderType === "HOME_DELIVERY" && status === "PICKED_UP"') {
      // alert('1234567');

      order_update = {
        id: id,
        status: "DELIVERED",
      };
    } else if ('orderType === "HOME_DELIVERY"' && 'status === "DELIVERED"') {
      //

      order_update = {
        id: id,
        status: "CLOSED",
      };
    }

    const url = this.restService.OrdersRestURL("update", "");
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        console.log("Status on Post API");
        console.log(response);

        Swal.fire("Order is Successfully Packed", "", "success");
        // if (this.branch === undefined) {
        //   if (this.userRole === 'SUPERADMIN') {
        //     this.allorders();
        //   } else {
        //     this.getallorders();
        //   }

        // }
        // else {
        //   this.alltypesoforders();
        // }

        if (this.route.url === "/all_delivered_orders")
          this.getDeliveredOrder();
        else this.getopenorders();

        if (order_update.status == "CLOSED") {
          this.sendInvoice(id, phoneNumber);
          // this.getopenorders();
        }

        this.sendcommonNotify(this.data);
        window.scrollTo(0, 0);
      },
      (error) => {
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
      }
    );
    return 0;
  }

  orderpacked2(id: number, orderType: string, phoneNumber: string) {
    let order_update;

    if ('orderType === "HOME_DELIVERY" && status === "DELIVERED"') {
      order_update = {
        id: id,
        status: "CLOSED",
      };
    }

    const url = this.restService.OrdersRestURL("update", "");
    this.restService.postFormData(url, order_update).subscribe(
      (response: any) => {
        console.log("Status on Post API");
        console.log(response);

        Swal.fire("Order is Successfully Packed", "", "success");
        // if (this.branch === undefined) {
        //   if (this.userRole === "SUPERADMIN") {
        //     this.allorders();
        //   } else {
        //     this.getallorders();
        //   }
        // } else {
        //   this.alltypesoforders();
        // }

        if (this.route.url === "/all_delivered_orders")
          this.getDeliveredOrder();
        else this.getopenorders();

        if (order_update.status == "CLOSED") {
          this.sendInvoice(id, phoneNumber);
          // this.getopenorders();
        }

        this.sendcommonNotify(this.data);
        window.scrollTo(0, 0);
      },
      (error) => {
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
      }
    );
    return 0;
  }

  sendInvoice(id, phoneNumber) {
    let getInvoice: any;

    let urlGetOrder = this.restService.OrdersRestURL("delete", id);
    this.restService.getJSONFromURL(urlGetOrder).subscribe(
      (response: any) => {
        getInvoice = response.invoice;

        if (getInvoice != null) {
          const message =
            "Your Food is delivered, you can download your invoice from here \n " +
            this.docServer +
            "/" +
            getInvoice.docpath;
          const smsdata = {
            toMobile: phoneNumber,
            message: message,
          };

          const url = this.restService.smsRestURL("send", "");

          this.restService.postFormData(url, smsdata).subscribe(
            (response) => {
              // Responce data.
              console.log(response);
            },
            (error) => {
              console.log("Error in SMS.");
            }
          );

          let invoiceMsg = {
            to: "amankarn26@gmail.com",
            cc: "amankarn26@gmail.com",
            templateId: "invoice",
            contentData: {
              content: {
                message: "Message",
              },
              subject: "Register",
            },
          };

          let urlForInvoice = this.restService.mailRestURL("send", "");
          console.log(url);
          //  console.log(this.request);
          this.restService.postFormData(urlForInvoice, invoiceMsg).subscribe(
            (response: any) => {
              // Responce data.
              console.log("Status on Post API");
              console.log(response);
            },
            (error) => {
              console.log("Failed to send new password");
              console.log("Error in data load.");
              // Doyour stuff here
            }
          );

          return 0;
        } else {
          console.log("Invoice Not generated yet.");
        }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  alltypesoforders() {
    this.getallorders();
    this.getplacedorders();
    this.getservedorders();
    this.getpackedorders();
    this.getpickuporders();
    this.getdeliveredorders();
  }

  public getplacedorders() {
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var api = "/status?status=PLACED&branch=" + this.branch;
      var url = this.restService.OrdersRestURL("orderbyperson", api);
    } else {
      var url = this.restService.OrdersRestURL("orderbystatus", "PLACED");
    }
    console.log("urllllllllllll::::::::::::::::::::;;;");
    console.log(url);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.placedorders = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getpackedorders() {
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var api = "/status?status=PACKED&branch=" + this.branch;
      var url = this.restService.OrdersRestURL("orderbyperson", api);
    } else {
      var url = this.restService.OrdersRestURL("orderbystatus", "PACKED");
    }
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.packedorders = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getservedorders() {
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var url = this.restService.OrdersRestURL("orderbystatus", "SERVED");
    } else {
      var url = this.restService.OrdersRestURL("orderbystatus", "SERVED");
    }
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.servedorders = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getpickuporders() {
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var url = this.restService.OrdersRestURL("orderbystatus", "PICKED_UP");
    } else {
      var url = this.restService.OrdersRestURL("orderbystatus", "PICKED_UP");
    }
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.pickuporders = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  public getdeliveredorders() {
    this.restService.enableloading();

    if (this.userRole === "SUPERADMIN" && this.userType === "FIRM") {
      var url = this.restService.OrdersRestURL("orderbystatus", "DELIVERED");
    } else {
      var url = this.restService.OrdersRestURL("orderbystatus", "DELIVERED");
    }
    // const url = this.restService.OrdersRestURL('orderbystatus', 'DELIVERED');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.deliveredorders = response;
        this.restService.disableloading();
      },
      (error) => {
        console.log("Error in data load.");
        this.restService.disableloading();
      }
    );
  }

  getallbranch() {
    var url = this.restService.branchRestURL("", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.branchlist = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  refreshincall() {
    this.branch = undefined;
    this.customdate = undefined;

    this.selectedorders = [];
    //this.getCallList();
    this.allorders();
  }

  private searchdayspayable() {
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

      var api = "?branch=" + this.branch + "&from=" + fdate + "&to=" + todate;

      var url = this.restService.OrdersRestURL("orderbyperson", api);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          console.log(response);

          this.data = response;
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
    if (this.selectedorders.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this data!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.value) {
          // delete code
          const url = this.restService.OrdersRestURL("multipledel", "");

          this.restService.postFormData(url, this.selectedorders).subscribe(
            (response: any) => {
              // Responce data.
              console.log("Status on Post API");
              console.log(response);
              Swal.fire("Deleted!", "Your data has been deleted.", "success");
              this.selectedorders = [];
              this.alltypesoforders();
              // Now do your stuff here
            },
            (error) => {
              // Error Message
              Swal.fire(error.statusText, error._body, "error");
              console.log("Error in data load.");
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your data is safe :)", "error");
        }
      });
    } else {
      Swal.fire("Select atleast one Order to Delete", "", "error");
    }
  }

  changestatus() {
    if (this.selectedorders.length > 0) {
      const order_update = {
        order: this.selectedorders,
        status: "PAID",
      };

      // let finalData = this.multiJson(this.appointment);
      const url = this.restService.OrdersRestURL("bulkstatus", "");
      this.restService.postFormData(url, order_update).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
          console.log(response);
          // Now do your stuff here
          Swal.fire("Status Updated", "", "success");
          this.selectedorders = [];
          this.alltypesoforders();

          window.scrollTo(0, 0);
        },
        (error) => {
          // Error Message
          Swal.fire(error.statusText, error._body, "error");
          console.log("Error in data load.");
          // Doyour stuff here
        }
      );
      return 0;
    } else {
      Swal.fire("Select atleast one Order to Delete", "", "error");
    }
  }

  RejectOrder(data: any) {
    var refundvalue = (2 / 100) * data.qcost.finalamt;
    console.log(refundvalue.toFixed(2));

    var totalrefund = data.qcost.finalamt - refundvalue;

    const order_update = {
      id: data.id,
      status: "CANCELLED",
      qcost: {
        refundamt: data.qcost.finalamt,
      },
    };

    Swal.fire({
      title: "Do you want to cancel your Order",
      // text: 'You will not be able to recover this data!',
      html:
        '<b style="display: block;font-weight: bold;color: red;"> 2 % will be deducted from your Next order Settelment, deducted amount will be ' +
        refundvalue.toFixed(2) +
        " /- </b>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.OrdersRestURL("update", "");
        this.restService.postFormData(url, order_update).subscribe(
          (response: any) => {
            // Responce data.
            console.log("Status on Post API");
            console.log(response);
            Swal.fire("Order is Successfully Cancelled!", "", "success");
            if (this.branch === undefined) {
              if (this.userRole === "SUPERADMIN") {
                this.allorders();
              } else {
                this.getallorders();
              }
            } else {
              this.alltypesoforders();
            }
            this.sendcancelnotify(data);
          },
          (error) => {
            // Error Message
            /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
               + error._body); */
            Swal.fire(error.statusText, error._body, "error");
            console.log("Error in data load.");
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

  changedeliveryperson(data: any) {
    console.log(data);
    document.getElementById("id01").style.display = "block";

    this.orderdata = data;
    this.getdeliveryperson(data);
  }

  getdeliveryperson(data: any) {
    var url = this.restService.delivertypoolRestURL(
      "getdeliveryppol",
      "dperson=" +
        data.deliverypool +
        "&pincode=" +
        data.deliveryaddress.pincode
    );

    //  var url = this.restService.OrdersRestURL('orderbycustomer', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.dpersonList = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  updatedeliveryperson() {
    const json = {
      id: this.orderdata.id,
      deliverypool: this.deliverypersonupdate,
    };

    const url = this.restService.OrdersRestURL("update", "");
    this.restService.postFormData(url, json).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        Swal.fire("Updated Successfully !", "", "success");
        document.getElementById("id01").style.display = "none";
        // this.isDeliverypoolchange = false;
        // this.getcustomerorders();
        if (this.branch === undefined) {
          if (this.userRole === "SUPERADMIN") {
            this.allorders();
          } else {
            this.getallorders();
          }
        } else {
          this.alltypesoforders();
        }
        this.sendNotifOndeliverychange(this.orderdata);

        this.deliverypersonupdate = null;
      },
      (error) => {
        // Error Message
        /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
            + error._body); */
        Swal.fire(error.statusText, error._body, "error");
        console.log("Error in data load.");
        // Doyour stuff here
      }
    );
  }

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

  sendcommonNotify(data: any) {
    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);

    const message =
      "MGB: Order Number " + data.invoicenum + " has been Packed by the Branch";

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: data.customer,
      toMobile: mobile,
      message: message,
      notificationFor: "CUSTOMER",
    };

    bulk.push(smsdata);

    // const message1 = 'JGL: Order Number '+ data.invoicenum+ '  has been Packed by the Vendor';

    // const mobile1 = '0000000000';
    // const smsdata1 = {
    // id:data.firm,
    // toMobile: mobile1,
    // message: message1,
    // notificationFor: 'FIRM'
    // };

    // bulk.push(smsdata1);

    const message2 =
      "MGB: Order Number " +
      data.invoicenum +
      "  has been Packed by the Firm. Please Collect the Parcel";

    const mobile2 = "0000000000"; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: data.deliverypool,
      toMobile: mobile2,
      message: message2,
      notificationFor: "DELIVERY_PERSON",
    };

    bulk.push(smsdata2);
    // console.log('sending notification');
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

  sendcancelnotify(data: any) {
    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);

    const message =
      "MGB: Order Number " +
      data.invoicenum +
      " has been Cancelled by the Firm, Sorry for the inconvenience. Your amount will be refunded shortly.";

    const mobile = data.custmobile; // localStorage.getItem('phone');
    const smsdata = {
      id: data.customer,
      toMobile: mobile,
      message: message,
      notificationFor: "CUSTOMER",
    };

    bulk.push(smsdata);

    // const message1 = 'JGL: Order Number '+ data.invoicenum+ '  has been Packed by the Vendor';

    // const mobile1 = '0000000000';
    // const smsdata1 = {
    // id:data.firm,
    // toMobile: mobile1,
    // message: message1,
    // notificationFor: 'FIRM'
    // };

    // bulk.push(smsdata1);

    const message2 =
      "MGB: Order Number " +
      data.invoicenum +
      "  has been Cancelled by the Firm.";

    const mobile2 = "0000000000"; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: data.deliverypool,
      toMobile: mobile2,
      message: message2,
      notificationFor: "DELIVERY_PERSON",
    };

    bulk.push(smsdata2);
    // console.log('sending notification');
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

  dpchange(obj) {
    this.dpname = obj.target.options[obj.target.selectedIndex].text;
  }

  sendNotifOndeliverychange(data: any) {
    let bulk = [];
    // const refundvalue = (2/100) * Number(data.qcost.finalamt);
    // console.log(refundvalue.toFixed(2));
    // const totalrefund = Number(data.qcost.finalamt) - Number(refundvalue);

    const message1 =
      "(UPDATE) MGB: Order Number " +
      data.invoicenum +
      " has been Assigned to Delivery Person (" +
      this.dpname +
      ")";

    const mobile1 = "0000000000";
    const smsdata1 = {
      id: data.firm,
      toMobile: mobile1,
      message: message1,
      notificationFor: "FIRM",
    };

    bulk.push(smsdata1);

    const message2 =
      "(UPDATE) MGB: New Order " +
      data.invoicenum +
      " Assigned for Delivery from  " +
      data.firmname;

    const mobile2 = "0000000000"; // data.custmobile; // localStorage.getItem('phone');
    const smsdata2 = {
      id: this.deliverypersonupdate,
      toMobile: mobile2,
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
}
