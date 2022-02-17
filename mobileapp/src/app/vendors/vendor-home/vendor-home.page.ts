import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.page.html',
  styleUrls: ['./vendor-home.page.scss'],
})
export class VendorHomePage implements OnInit {

  sliderConfig3 = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true,
    loop: true,
    centeredSlides: false,
    spaceBetween: 5
  };

  propularprodList = [];
  frequentprodList = [];

  public docServer = this.restService.docServer;


  orderStats; // vendor statistics

  user = localStorage.getItem('name');
  notificationList = [];
  constructor(private router: Router,
      private restService: RestService) {
      this.getPopularProducts();
      this.getStatistics();
      this.getFrequentProducts();
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getPopularProducts();
    this.getStatistics();
    this.getFrequentProducts();
    this.notificationList = JSON.parse(localStorage.getItem('notificationList'));
    console.log(this.notificationList);
  }

  showOrders(status: string){
    this.router.navigate(['/vendors/vendor-orders/' + status]);
  }

  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
     // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

   showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;

   // alert('latitude =' +position.coords.latitude);
  }


  private getPopularProducts() {
    // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/order/popular/product?firm=20
    const url = this.restService.compactRestURL('popularproductsfirm', '?branch=' + localStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.propularprodList = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getStatistics() {
    // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/firm/stats?vendor=20

    const url = this.restService.firmRestURL('vendorstatistics',  localStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.orderStats = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  addProductstock(){
       this.router.navigate(['/vendors/prod-stock']);
    // this.router.navigate(['/vendors/vendor-orders/' + status]);

  }


  private getFrequentProducts() {
    // Get Information from JSON REST ap

    const strurl = 'frequent?branch='+ localStorage.getItem('id');
    const url = this.restService.compactRestURL('frequentproducts', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.frequentprodList = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  onNotificationsClick(){
    console.log('notifiations viewed');
    this.router.navigate(['notifications']);
  }


  // isNotification():Promise <boolean>{

  //   let res=false;

  //   if ( this.notificationList.length  > 0) {
  //     res = true;
  //   }
  //  return res;

  // }
}
