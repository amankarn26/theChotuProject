import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';


declare const L: any;

@Component({
  selector: 'app-add-loaction',
  templateUrl: './add-loaction.page.html',
  styleUrls: ['./add-loaction.page.scss'],
})
export class AddLoactionPage implements OnInit {

  public address = {
    city: '',
    country: 'India',
    latitude: '21.000000',
    longitude: '74.000000',
    line1: '',
    line2: '',
    states: '',
    cut_id: '',
    pincode: ''
  }

  public isMapSet = false;
  public ismapShow = false;

  public latitude = ''
  public longitude = ''

  constructor(
    private router: Router,
    private restService: RestService,

  ) { }

  ngOnInit() {
    this.address.cut_id = localStorage.getItem('id')
  }

  ionViewWillEnter() {
    this.createMap()
  }

  public close() {
    this.router.navigate(["getloaction"])
  }

  public cancel() {
    window.history.back();
  }

  public getState(obj) {
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

  public submitData() {
    if (this.address.line1 == "" && this.address.line2 == "") {
      alert("Please enter your data.")
    } else {
      this.address.latitude = this.latitude
      this.address.longitude = this.longitude
      console.log(this.address);
      
      let url = this.restService.custAddres('add', '')
      this.restService.postFormData(url, this.address).subscribe(
        (response: any) => {
          this.router.navigate(['getloaction']);
        },
        error => {
          console.log('Error in data load.');
          console.log(error)
        }
      );
    }
  }

  public addLocation() {
    this.isMapSet = true
    this.ismapShow = true;
    
  }

  private createMap() {
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

        var popup = L.popup();
        marker.on('dragend', (e: any) => {
          this.setCustPostion(marker) 
        });
  
        function onMapClick(e: any) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
        }
  
        mymap.on('click', onMapClick);
      })
    }
    
  }

  private setCustPostion(marker) {
    this.latitude = marker.getLatLng().lat.toString();
    this.longitude = marker.getLatLng().lng.toString();
    console.log(this.latitude)
    console.log(this.longitude)
    
  }

  public stopMap() {
    this.ismapShow = false;
  }

}
