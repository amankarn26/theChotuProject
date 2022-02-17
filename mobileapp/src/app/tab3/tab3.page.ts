import { Component } from "@angular/core";
import { RestService } from "./../services/rest.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

declare const L: any;

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
  providers: [Geolocation],
})
export class Tab3Page {
  name = localStorage.getItem("name");
  phone = localStorage.getItem("phone");
  Address = JSON.parse(localStorage.getItem("Address"));
  email = localStorage.getItem("email");

  isUpdate = false;

  public isMapSet = false;
  public ismapShow = false;

  updateLocation = false;
  updatePassword = false;

  pass;
  vpass;

  address = {
    line1: this.Address.line1, // '',
    line2: this.Address.line2, // '',
    city: this.Address.city, // '',
    pincode: this.Address.pincode, // '',
    states: this.Address.states, // '',
    lattitude: '',
    longitude: '',
    country: "India",
  };

  lattitude;
  longitude;

  location;

  constructor(
    private restService: RestService,
    public geolocation: Geolocation,
    public alertController: AlertController,
    public route: Router
  ) {}

  gotoupdatepass() {
    console.log("update ture");
    this.isUpdate = true;

    this.updateLocation = false;
    this.updatePassword = true;
  }

  gotoupdatelocation() {

    this.route.navigate(['getloaction'])
    return 0;


    this.isUpdate = true;
    this.updateLocation = true;
    this.updatePassword = false;
    this.findloc();

    console.log(this.Address);
  }

  back() {
    console.log("update false");
    this.Address = JSON.parse(localStorage.getItem("Address"));
    this.address = this.Address;
    console.log(localStorage.getItem("Address"));
    console.log(this.Address);
    this.isUpdate = false;
    // location.reload();
  }

  update() {
    if (this.pass == this.vpass) {
      console.log("Both password Mathc");
      this.updatepass();
    } else {
      alert("Please, Renter Correct Password");
    }
  }

  public updatepass() {
    // alert('order add call');

    const jsono = {
      username: this.phone,
      password: window.btoa(this.vpass),
    };

    this.Alert();
    console.log("submitData function");
    console.log(jsono);
    const url = this.restService.loginRestURL("updatepass", "");
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        // alert('Password Updated');
        this.back();
        this.pass = "";
        this.vpass = "";
      },
      (error) => {
        console.log("Error in data load.");
        alert("Failed To Update");
        // Doyour stuff here
      }
    );
    return 0;
  }

  getState(obj) {
    // Get Information from JSON REST api

    console.log(obj);

    const url = this.restService.PincodeRestURL("", obj.target.value);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.address.states = response.state_name;
        this.address.city = response.city_name;

        console.log("State data available");
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  findloc() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.location = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      };

      this.lattitude = data.coords.latitude;
      this.longitude = data.coords.longitude;

      this.address["latitude"] = this.lattitude;
      this.address["longitude"] = this.longitude;

      console.log(data);
      console.log(this.location);
    });

    // this.geolocation.getCurrentPosition(
    //   {
    //     maximumAge: 1000, timeout: 5000,
    //     enableHighAccuracy: true
    //   }
    // ).then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   // alert("r succ"+resp.coords.latitude)
    //   alert(JSON.stringify(resp.coords));

    //   this.lattitude = String(resp.coords.latitude);
    //   this.longitude = String(resp.coords.longitude);
    //   this.address['latitude'] = this.lattitude;
    //   this.address['longitude'] = this.longitude;
    // }, er => {
    //   // alert("error getting location")
    //   alert('Can not retrieve Location')
    // }).catch((error) => {
    //   // alert('Error getting location'+JSON.stringify(error));
    //   alert('Error getting location - ' + JSON.stringify(error));
    // });
  }

  // getPosition(): Promise<any>
  // {
  //   return new Promise((resolve, reject) => {

  //     navigator.geolocation.getCurrentPosition(resp => {

  //         resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
  //         console.log(resp.coords.longitude);
  //         console.log(resp.coords.latitude);

  //         this.address['latitude'] =resp.coords.longitude;
  //         this.address['longitude'] = resp.coords.latitude;
  //       },
  //       err => {
  //         reject(err);
  //         alert('This page has been blocked from tracking your location, You will be charged higher Delivery Charges');

  //       });
  //   });

  // }

  public updatecustomer() {
    // alert('order add call');

    const jsono = {
      id: localStorage.getItem("id"),
      address: this.address,
    };
    this.presentAlert();
    console.log("submitData function");
    console.log(jsono);
    const url = this.restService.customerRestURL("edit", "");
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);

        // alert('Address Updated');
        // this.back();
        localStorage.setItem("Address", JSON.stringify(this.address));
        this.Address = JSON.parse(localStorage.getItem("Address"));
        location.reload();
      },
      (error) => {
        console.log("Error in data load.");

        // Doyour stuff here
      }
    );
    return 0;
  }
  // presentAlert() {
  //   let alert = this.alertCtrl.create({
  //     cssClass: 'my-custom-class',
  //     subHeader: 'Subtitle',
  //     message: 'Address Updated.',
  //     buttons: ['OK']
  //   });
  //  _await alert.present();
  // }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // subHeader: 'Subtitle',
      message: "Address Updated.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async Alert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // subHeader: 'Subtitle',
      message: "Password Updated.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem("islogout","true");
    location.reload();
  }


  public setLocation() {
    this.isMapSet = true
    if (!navigator.geolocation) {
      console.log("location service not supported")
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords
        console.log({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        let mymap = L.map('map').setView([coords.latitude, coords.longitude], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1Ijoia3Jpc2huYWJoYWdhdDU1NSIsImEiOiJja3R2cGN0MjYxenRzMzJucTIweXd5bWk2In0.4DaOMGf5u6Dk-oelFgCe1Q'
        }).addTo(mymap);
        L.control.locate({ position: "bottomright", flyTo: true, }).addTo(mymap);
        var marker = L.marker([coords.latitude, coords.longitude], {
          draggable: true
        }).addTo(mymap);

        L.useEffect(() => {
          mymap.locate().on("locationfound", function (e) {
            L.setPosition(e.latlng);
            mymap.flyTo(e.latlng, mymap.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(mymap);
            L.setBbox(e.bounds.toBBoxString().split(","));
          });
        }, [mymap]);

        var popup = L.popup();
        marker.on('dragend', (e: any) => {
          this.getLocation(marker)

        });

        function onMapClick(e: any) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
        }

        mymap.on('click', onMapClick);
      })
      this.ismapShow = true;
    }
  }

  private getLocation(marker) {
    console.log("lat :" + marker.getLatLng().lat);
    console.log("long :" + marker.getLatLng().lng);
    this.lattitude = marker.getLatLng().lat;
    this.longitude = marker.getLatLng().lng
  }

  public stopMap() {
    this.ismapShow = false;
  }

}
