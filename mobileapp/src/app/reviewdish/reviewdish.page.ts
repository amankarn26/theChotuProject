import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { RestService } from './../services/rest.service';

@Component({
  selector: 'app-reviewdish',
  templateUrl: './reviewdish.page.html',
  styleUrls: ['./reviewdish.page.scss'],
})
export class ReviewdishPage implements OnInit {

  id = localStorage.getItem('id');

  
  cssClass
  dished = {
    dish: '',
    addedby: '',
    addedbyname: '',
    review: '',
    status: 'ADDED',
    rating: ''
  };

  oentry = [];
  selectedItems = [];

  review;

  dishname;
  public dishlist;
  public selectedDish = [];
  private selectedOrder : any

  public docServer = this.restService.docServer;
  reviewdish: any;
  orderid;
  isDataLoaded = false

  ratingCount = 0;
  alertCtrl: any;

  constructor(private restService: RestService,
    private routprms: ActivatedRoute,
    private route: Router,
    public alertController: AlertController) { }


  ngOnInit() {
    
    this.orderid = this.routprms.snapshot.params['id'];
    this.dishname = this.routprms.snapshot.params['name']
    this.getdishbyreview();
  }


  addreview() {

    for(let item of this.selectedDish) {
      if (item?.rating > 0) {

        // Make a api call here
        const urls = this.restService.compactRestURL('getbishbyname',item?.dname);
        this.restService.getJSONFromURL(urls).subscribe(
          (response: any) => {
            
            let sendableJSON = {
              dish: response.id,
              dishname:response.name,
              addedby: this.selectedOrder.customer,
              addedbyname: this.selectedOrder.custname,
              review: item?.review,
              status: 'ADDED',
              rating: item?.rating
            }
            
            
            this.sendReview(sendableJSON)
          },
          error => {
           
            console.log('Error in data load.');
          }
        );
        
        
        
      }
    }
   
    // this.presentAlert();
    // this.back();
    
  }

  sendReview(sendableJSON) {
    const url = this.restService.compactRestURL('reviewed','');
    this.restService.postFormData(url,sendableJSON).subscribe(
      (response: any) => {
        console.log(response);
         if (response === "REVIEW_LIMIT_EXCEEDED") {

           this.presentAle();
           this.back();
           
         } else {
           
          this.presentAlert();
          this.back();
         }
        
      },
      error => {
       
        console.log('Error in data load.');
        
      }
    );
  }

  //  For Rating
  setRating(star,index) {
    // this.ratingCount = star
    this.selectedDish[index].rating = star
    console.log("selectedItem::",this.selectedDish)
  }

  // For Review
  setReview() {
    console.log();
    
  }

  private getdishbyreview() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('ordersbyid',this.orderid);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.selectedOrder = response;
        // this.selectedOrder = this.dishlist.filter(entry => entry.id === Number(this.orderid))
        this.selectedDish = this.selectedOrder.oentry
        this.populateorder();
        this.isDataLoaded = true
      }, 
      error => {
        console.log('Error in data load.');
      }
    );
  }

  

  


  populateorder() {
    this.selectedDish.map(entry => {
      entry.rating = 0;
      entry.review ="";
      return entry
    })
    
  }

  back(){
    window.history.back();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // subHeader: 'Subtitle',
      message: 'Thank you For The Rating',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAle() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // subHeader: 'Subtitle',
      message: 'You exceeded limit of adding review for this dish',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  


}
