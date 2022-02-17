import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { RestService } from "./services/rest.service";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  cnt = 1;

  clickSub: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: Router,
    private localNotifications: LocalNotifications,
    private restService: RestService,
    public alertController: AlertController
  ) {
    this.initializeApp();

    // if(localStorage.getItem('isLoggedin') != null){
 
    // }else{

    // }

    if (localStorage.getItem("islogin") === "true") {
      if (localStorage.getItem("type") === "CUSTOMER") {
        this.route.navigate(["/tabs/tab1"]);
        // this.route.navigate(["getloaction"]);
      }
      else if (this.route.url === "/index/login" || this.route.url === "/cart") {
        if (localStorage.getItem("type") === "FIRM") {
          this.route.navigate(["/vendors/vendor-home"]);
        } else if (localStorage.getItem("type") === "CUSTOMER") {
          this.route.navigate(["/tabs/tab1"]);
          // this.route.navigate(["getloaction"]);
        } else if (localStorage.getItem("type") === "DELIVERY_PERSON") {
          this.route.navigate(["/deliverypools/deliverypool-home"]);
        }
      }

      if (localStorage.getItem("type") === "FIRM") {
        this.route.navigate(["/vendors/vendor-home"]);
      } else if (localStorage.getItem("type") === "DELIVERY_PERSON") {
        this.route.navigate(["/deliverypools/deliverypool-home"]);
      }
    } else {
      this.route.navigate(["/index/home"]);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.sendNotification();

      if (localStorage.getItem("type")) {
        this.simpleNotif(); // working notification
      }
    });
  }

  ionViewWillEnter() {
    if (this.isAuthenticated()) {
      if (localStorage.getItem("type") === "CUSTOMER") {
        this.route.navigate(["/tabs/tab1"]);
        // this.route.navigate(["getloaction"]);
      }
      else if (this.route.url === "/index/login" || this.route.url === "/cart") {
        if (localStorage.getItem("type") === "BRANCH") {
          this.route.navigate(["/vendors/vendor-home"]);
        } else if (localStorage.getItem("type") === "CUSTOMER") {
          this.route.navigate(["/tabs/tab1"]);
          // this.route.navigate(["getloaction"]);
        } else if (localStorage.getItem("type") === "DELIVERY_PERSON") {
          this.route.navigate(["/deliverypools/deliverypool-home"]);
        }
      }

      if (localStorage.getItem("type") === "BRANCH") {
        this.route.navigate(["/vendors/vendor-home"]);
      } else if (localStorage.getItem("type") === "DELIVERY_PERSON") {
        this.route.navigate(["/deliverypools/deliverypool-home"]);
      }
    } else {
      this.route.navigate(["/index/home"]);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const isVaultLocked = await localStorage.getItem("islogin");

    if (isVaultLocked === "true") {
      return true;
    } else {
      return false;
    }
  }

  // isLoggedin() {
  //   return localStorage.getItem('isLoggedin') != null;
  // }
  // this.splashScreen.show();

  // this.splashScreen.hide();

  sendNotification() {
    setTimeout(() => {
      console.log("works");
      if (localStorage.getItem("type")) {
        this.simpleNotif(); // call rest api if response then call simpleNotif
      }
    }, 20000); // 5000
  }

  simpleNotif() {
    console.log("Getting Notification From server");
    const url = this.restService.notifyRestURL(
      "get",
      "?id=" +
        localStorage.getItem("id") +
        "&type=" +
        localStorage.getItem("type")
    );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.propularprodList = response;
        // console.log(response);

        let notificationList = [];

        if (response) {
          for (const entry of response) {
            if (entry.message) {
              this.localNotifications.schedule({
                id: entry.notid,
                text: entry.message + entry.notid,
                icon: "res://assets/img/logo.png",
                vibrate: true,
                data: { secret: "secret" },
                launch: true,
              });

              this.cnt = entry.notid;
              console.log(this.cnt);
              this.sendNotification();
              this.deleteNotification(
                entry.id,
                entry.notid,
                entry.notificationFor
              );
              notificationList.push(entry.message);
              if (localStorage.getItem("notificationList")) {
                const allnotificaitons = notificationList.concat(
                  JSON.parse(localStorage.getItem("notificationList"))
                );
                localStorage.setItem(
                  "notificationList",
                  JSON.stringify(allnotificaitons)
                );
              } else {
                localStorage.setItem(
                  "notificationList",
                  JSON.stringify(notificationList)
                );
              }
            }
          }
        }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );

    // added today
    this.clickSub = this.localNotifications.on("click").subscribe((data) => {
      console.log(data);
      // this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.route.navigate(["/notifications"]);
      this.unsub();
    });
  }

  unsub() {
    this.clickSub.unsubscribe();
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: data,
      buttons: ["OK"],
    });
    await alert.present();
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
}
