import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./services/rest.service";
import { API_BASE_URL } from "./services/config";
import { switchAll } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Howl } from "howler";

declare var Swal: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // for sound

  soundPlayer = new Howl({
    src: ["assets/sound/noti1.mp3"],
    html5: true,
    onend: function () {
      console.log("Finished!");
    },
  });

  title = "app works!";
  public loginStatus = false;
  public cookies = Object;
  public username = localStorage.getItem("name");
  public userrole = localStorage.getItem("role");
  public id = sessionStorage.getItem("id");
  public firm = sessionStorage.getItem("firm");
  public profilePic = sessionStorage.getItem("photo");
  public docServer = this.restService.docServer;

  public email = sessionStorage.getItem("email");
  public password;
  public newpassword1;
  public newpassword;

  public cnt;

  public notificationlist = [];
  public Activelist = [];
  constructor(
    private restService: RestService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(API_BASE_URL) public baseUrl?: string
  ) {
    this.router = router;

    this.setGstAmount()

    if (localStorage.getItem("islogin")) {
      this.localsesLogin();

      this.loginStatus = true;

      sessionStorage.setItem("id", localStorage.getItem("id"));
      sessionStorage.setItem("name", localStorage.getItem("name"));
      sessionStorage.setItem("role", localStorage.getItem("role"));
      sessionStorage.setItem("type", localStorage.getItem("type"));
      sessionStorage.setItem("category", localStorage.getItem("category"));

      sessionStorage.setItem("islogin", localStorage.getItem("islogin"));

      sessionStorage.setItem("email", localStorage.getItem("email"));
      sessionStorage.setItem("pincode", localStorage.getItem("pincode"));

      if (sessionStorage.getItem("islogin")) {
        this.loginStatus = true;
      } else {
        this.router.navigate(["/homepage"]);
      }

      this.recallAvtiveNoti();
    } else {
      this.router.navigate(["/homepage"]);
    }
    this.simpleNotif();
  }

  clearnotify() {
    const message =
      "?id=" +
      localStorage.getItem("id") +
      "&type=" +
      localStorage.getItem("type");
    const url = this.restService.notifyRestURL("deleteM", message);
    console.log(url);

    this.restService.deleteFormData(url).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        Swal.fire("Notifications Cleared !", "", "success");
        this.simpleNotif();
      },
      (error) => {
        console.log("Error in SMS.");
      }
    );
    return 0;
  }

  getnotificationforcustomer() {
    var api = "?id=" + this.id + "&type=CUSTOMER";
    const url = this.restService.notifyRestURL("getnotification", api);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.notificationlist = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  loginRedirect() {
    // console.log("Indu"+this.router.url);
    if (this.loginStatus) {
      if (sessionStorage.getItem("type") === "CUSTOMER") {
        alert("1");
        this.router.navigate(["/custhomepage"]);
      } else if (
        sessionStorage.getItem("type") === "BRANCH" &&
        sessionStorage.getItem("role") === "BRANCH"
      ) {
        alert("2");
        this.router.navigate(["/vendorhomepage"]);
      } else if (
        sessionStorage.getItem("type") === "FIRM" &&
        sessionStorage.getItem("role") === "FIRM"
      ) {
        alert("3");
        this.router.navigate(["/vendorhomepage"]);
      } else if (
        sessionStorage.getItem("type") === "FIRM" &&
        sessionStorage.getItem("role") === "SUPERADMIN"
      ) {
        alert("4");
        this.router.navigate(["/adminhome"]);
      } else if (
        sessionStorage.getItem("type") === "DELIVERY_PERSON" &&
        sessionStorage.getItem("role") === "DELIVERY_PERSON"
      ) {
        alert("5");

        this.router.navigate(["/delivery_dashboard"]);
      }
    } else {
      alert("6");
      this.router.navigate(["/homepage"]);
      // this.router.navigate(['/login']);
    }
  }

  logoutApp() {
    sessionStorage.clear();
    localStorage.clear();

    location.reload();
  }

  updatePassword() {
    if (this.newpassword === this.newpassword1) {
      console.log("submiti function");

      const url = this.restService.loginRestURL("edit", "");

      console.log(url);
      console.log(this.newpassword);

      let login = {
        email: this.email,
        password: this.newpassword,
      };

      login.password = window.btoa(login.password);
      console.log("update encrypted password is :" + login.password);

      this.restService.postFormData(url, login).subscribe(
        (response: any) => {
          // Responce data.
          console.log("Status on Post API");
          console.log(response);

          this.router.navigate(["/home"]);
          document.getElementById("closethis").click();
        },
        (error) => {
          console.log("Error in data load.");
          // Doyour stuff here
        }
      );
      return 0;
    }
  }

  localsesLogin() {
    if (localStorage.getItem("type") === "CUSTOMER") {
      this.router.navigate(["/custhomepage"]);
    } else if (
      sessionStorage.getItem("type") === "BRANCH" &&
      sessionStorage.getItem("role") === "BRANCH"
    ) {
      // alert('2');
      this.router.navigate(["/vendorhomepage"]);
    } else if (
      localStorage.getItem("type") === "FIRM" &&
      localStorage.getItem("role") === "FIRM"
    ) {
      this.router.navigate(["/vendorhomepage"]);
    } else if (
      localStorage.getItem("type") === "FIRM" &&
      localStorage.getItem("role") === "SUPERADMIN"
    ) {
      this.router.navigate(["/adminhome"]);
    } else if (
      localStorage.getItem("type") === "DELIVERY_PERSON" &&
      localStorage.getItem("role") === "DELIVERY_PERSON"
    ) {
      this.router.navigate(["/delivery_dashboard"]);
    } else {
      this.router.navigate(["/homepage"]);
      // this.router.navigate(['/login']);
    }
  }

  sendNotification() {
    setTimeout(() => {
      console.log("works");
      this.simpleNotif(); // call rest api if response then call simpleNotif
    }, 30000); // 5000
  }

  simpleNotif() {
    console.log("Getting Notification From server");
    const url = this.restService.notifyRestURL(
      "getnotification",
      "?id=" +
        sessionStorage.getItem("id") +
        "&type=" +
        sessionStorage.getItem("type")
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.notificationlist = response;
        this.sendNotification();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public recallAvtiveNoti() {
    setTimeout(() => {
      console.log("works");
      this.getActiveNoti();
    }, 15000); // 5000
  }

  public getActiveNoti() {
    const url = this.restService.OrdersRestURL(
      "allActiveOrders",
      "status=PLACED&firm=" + localStorage.getItem("firm") + "&active=YES"
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.Activelist = response;
        this.recallAvtiveNoti();
        this.setActiveNoti();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private setActiveNoti() {
    let onlyIdArray = this.Activelist.map((x) => {
      return x.id;
    });

    if (localStorage.getItem("activeList")) {
      let currentActiveOrder = JSON.parse(localStorage.getItem("activeList"));

      // check difference
      let diff = this.arr_diff(currentActiveOrder, onlyIdArray);

      if (diff.length > 0) {
        for (let notiOrder of diff) {
          let clientData = this.Activelist.find((x) => x.id == notiOrder);
          if (clientData) {
            this.showSuccess(
              "New Order!",
              "1 New order places by " + clientData.custname
            );
          } else {
            this.showSuccess("New Order!", "1 New order places");
          }
        }
        localStorage.setItem("activeList", JSON.stringify(onlyIdArray));
        this.soundPlayer.play();
      }
    } else {
      localStorage.setItem("activeList", JSON.stringify(onlyIdArray));
      let notiCount = onlyIdArray.length + " Active order";
      let notiCountmsg =
        "You have " + onlyIdArray.length + " Active order, places by Cutomers.";
      this.showSuccess(notiCount, notiCountmsg);

      this.soundPlayer.play();
    }
  }

  // ?id=19272&notid=1&type=CUSTOMER'

  deleteNotification(id: any, notid: any, type: any) {
    const message = "?id=" + id + "&notid=" + notid + "&type=" + type;

    console.log("sending sms");

    const url = this.restService.notifyRestURL("delete", message);
    console.log(url);

    this.restService.deleteFormData(url).subscribe(
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

  private showSuccess(title: any, notmsg: any) {
    this.toastr.success(notmsg.toString(), title.toString()),
      {
        timeOut: 10000,
        closeButton: true,
        progressBar: true,
        progressAnimation: "increasing",
        maxOpened: 6,
      };
  }

  private arr_diff(a1, a2) {
    var a = [],
      diff = [];

    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    for (var k in a) {
      diff.push(k);
    }

    return diff;
  }

  private setGstAmount() {
    const url = this.restService.firmRestURL("getallfirm", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // Responce data.
        localStorage.setItem("universalGST", response[0].gst);
      },
      (error) => {
        console.log(error)
        // Doyour stuff here
      }
    );
  }
}
