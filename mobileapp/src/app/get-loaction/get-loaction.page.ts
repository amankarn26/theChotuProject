import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-get-loaction',
  templateUrl: './get-loaction.page.html',
  styleUrls: ['./get-loaction.page.scss'],
})
export class GetLoactionPage {

  public allAddress = []

  constructor(
    private router: Router,
    private restService: RestService
  ) { }


  ionViewDidEnter() {
    this.getAllLocation();
  }

  public onLocationSelect(selectedLocation) {
    localStorage.setItem("multiAddress", JSON.stringify(selectedLocation));
    this.router.navigate(["tabs/tab1"]);
  }

  public addLocation() {
    this.router.navigate(["addloaction"]);
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


  public cancel() {
    window.history.back();
  }

}
