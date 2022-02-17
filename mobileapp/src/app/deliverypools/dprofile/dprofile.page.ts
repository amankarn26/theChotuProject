import { Component, OnInit } from '@angular/core';
import { RestService } from './../../services/rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.page.html',
  styleUrls: ['./dprofile.page.scss'],
  providers: [
    Geolocation
  ]
})
export class DprofilePage implements OnInit {

  name = localStorage.getItem('name');
  phone = localStorage.getItem('phone');
  Address = JSON.parse(localStorage.getItem('Address'));
  email = localStorage.getItem('email');


  isUpdate=false;

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
    country: 'India'
  };

  lattitude;
  longitude;

  location;

  constructor( private restService: RestService,
    public geolocation: Geolocation) {}



  ngOnInit() {
  }


  gotoupdatepass(){
    console.log('update ture');
    this.isUpdate = true;
    this.updateLocation = false;
    this.updatePassword = true;
  }


  gotoupdatelocation() {

    this.isUpdate = true;
    this.updateLocation = true;
    this.updatePassword = false;
    this.findloc();

    console.log(this.Address);
  }



  back(){
    console.log('update false');
    this.isUpdate = false;
  }

  update(){
if(this.pass == this.vpass){
console.log('Both password Mathc');
this.updatepass();

}else{
  alert('Please, Renter Correct Password');
}

  }





  public updatepass() {

    // alert('order add call');

    const jsono =  {
        "username": this.phone,
        "password": window.btoa(this.vpass)
      };

    console.log('submitData function');
    console.log(jsono);
    const url = this.restService.loginRestURL('updatepass', '');
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        alert('Password Updated');
        this.back();

      },
      error => {
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }


  findloc() : Promise<any> {


    return new Promise((resolve, reject) => {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {

      this.location = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      };

      this.lattitude = data.coords.latitude;
      this.longitude = data.coords.longitude;

      this.address['latitude'] = this.lattitude;
      this.address['longitude'] = this.longitude;

      console.log(data);
      console.log(this.location);
    });


    });

    // this.geolocation.getCurrentPosition(

  }

  public updatecustomer() {

    // alert('order add call');

    const jsono = {
      id:localStorage.getItem('id'),
    address: this.address
    };

    console.log('submitData function');
    console.log(jsono);
    const url = this.restService.delivertypoolRestURL('edit', '');
    this.restService.postFormData(url, jsono).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        alert(' Updated');
        // this.back();
        localStorage.setItem('Address', JSON.stringify(this.address));
        this.Address = JSON.parse(localStorage.getItem('Address'));
        location.reload();
      },
      error => {
        console.log('Error in data load.');
        alert('Failed To Update');
        // Doyour stuff here
      }
    );
    return 0;
  }

  getState(obj) {
    // Get Information from JSON REST api

    console.log(obj);

    const url = this.restService.PincodeRestURL('', obj.target.value);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {

        this.address.states = response.state_name;
        this.address.city = response.city_name;



        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }





}
