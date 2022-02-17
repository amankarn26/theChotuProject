
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { CartService } from './../../cart.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-popularshop',
  templateUrl: './popularshop.page.html',
  styleUrls: ['./popularshop.page.scss'],
})
export class PopularshopPage implements OnInit {

  public category;
  public title;
  public firm;

  public fname;

  public docServer = this.restService.docServer;

  propularprodList = [];

  cart = [];
  items = [];

  prodtypeList = [];

  firmList = [];
  sliderConfig = {
    spaceBetween: 5,
    centeredSlides: false,
    slidesPerView: 2,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
  };

  sliderConfig3 = {
    initialSlide: 0,
    slidesPerView: 2,
    // autoplay: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: false,
    spaceBetween: 5
  };

  sliderConfig4 = {
    initialSlide: 0,
    slidesPerView: 2,
    // autoplay: true,
    autoplay: {
      delay: 3000000,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: false,
    spaceBetween: 5
  };


  filteredItems=[];

  prodtype;

  constructor(private CartService: CartService,
              public route: Router,
              public routprms: ActivatedRoute,
              private restService: RestService,
              public alertController: AlertController
              ) { }

  ngOnInit() {

    this.category = this.routprms.snapshot.params['category'];
    this.firm = this.routprms.snapshot.params['firm'];

  this.fname = this.routprms.snapshot.params['name'];

    if (this.route.url === '/tabs/popularshop/' + encodeURIComponent(this.category) + '/' +
    + encodeURIComponent(this.firm) + '/' +
    + encodeURIComponent(this.fname)) {
      this.title = this.category;
      // this.getProductlistbyPopularfirm(this.category, this.firm);
      this.getProductlist('dd');
      this.cart = this.CartService.getCart();
    } else{
    }
  }





  ionViewWillEnter() {
    this.category = this.routprms.snapshot.params['category'];
    this.firm = this.routprms.snapshot.params['firm'];
    this.fname = this.routprms.snapshot.params['name'];
    this.title = this.category;
   // this.getProductlistbyPopularfirm(this.category, this.firm);

    this.cart = this.CartService.getCart();
    this.getProductlist('dd');
  }

  addToCart(product) {
    this.CartService.addProduct(product);
  //  this.cancel();
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }



  openCart() {
    this.route.navigate(['/cart']);
  }

  getProductlist(event:any){
    // alert('getting list');



    console.log('selectedFirm'+localStorage.getItem('selectedFirm') );
    console.log('this.firm'+this.firm );
    console.log('this.cart.length ='+this.cart.length );



    if(localStorage.getItem('selectedFirm') && (Number(localStorage.getItem('selectedFirm')) !== Number(this.firm)) && (this.cart.length > 0)){

              // console.log(localStorage.getItem('selectedFirm'));
              // alert('Not same shope clearing cart');
              // localStorage.removeItem('cartData');
              // localStorage.removeItem('selectedFirm');
              // this.cart = this.CartService.getCart();
              // location.reload();
              // alert('11');
              this.presentAlertConfirm();

      // this.route.navigate(['/tabs/tab1']);
     //  <a [routerLink]="['/tabs/productlist',cat.prodtype]">
    }else{
    // alert('22');
    localStorage.setItem('selectedFirm',this.firm);
  //   console.log('Getting productlist by prodtype and firm');
  //   const urlstr = 'ptype='+ this.category+'&firm='+  this.firm;
  //   const url = this.restService.compactRestURL('prodlistbytype_firm', urlstr);
  //  // const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.items = response;
  //       this.filteredItems = response;
  //       console.log(response);
  //       this. getPopularProducts();
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );

    console.log('Getting product type  by CATEGORY');

    this.getProdtypesData();
    this. getPopularProducts();

  }
  }


  private getFirmList() {
    // Get Information from JSON REST api
    // alert('firm');
    console.log('Getting firm list');
    const url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.firmList = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getPopularProducts() {
    // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/order/popular/product?firm=20
    const url = this.restService.compactRestURL('popularproductsfirm', '?firm=' + this.firm);
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





  getProductlistbyPopularfirm(category:any, firm:any){
    // alert('getting list');

    if(localStorage.getItem('selectedFirm') && (Number(localStorage.getItem('selectedFirm')) !== Number(this.firm)) && (this.cart.length > 0)){

      console.log(localStorage.getItem('selectedFirm'));
      // alert('1');
            // alert('Not same shope clearing cart');
            // localStorage.removeItem('cartData');
            // localStorage.removeItem('selectedFirm');
            // this.cart = this.CartService.getCart();
      this.presentAlertConfirm();
    }else{
    // alert('2');
    localStorage.setItem('selectedFirm',this.firm);
    console.log('Getting productlist by CATEGORY and firm');
    const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.items = response;
        this.filteredItems = response;
        console.log(response);
        this. getPopularProducts();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  }

  getItems(ev) {
    // Reset items back to all of the items
   this.filteredItems = this.items;
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }



    //// for yes not confirmation
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message : 'Changing vendor will clear your Cart, Do you wish to proceed?',
      // message: 'Message <strong>text</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
           //   this.firm = localStorage.getItem('selectedFirm');
              this.cancel();
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              console.log(localStorage.getItem('selectedFirm'));

              // alert('Not same shope clearing cart');
              localStorage.removeItem('cartData');
              //  localStorage.removeItem('selectedFirm');
              localStorage.setItem('selectedFirm',this.firm);
              this.cart = this.CartService.getCart();
              // this.cart =[];
              console.log('cart lenght'+this.cart.length);
              location.reload();
            //  this.getProductlist('d');
            }
          }
        ]
      });

      await alert.present();
    }

// get product types by category
private getProdtypesData() {
  // Get Information from JSON REST api
  const url = this.restService.compactRestURL('getprodtypebyfirmid', this.firm);
  // categoryRestURL
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);
      this.prodtypeList = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}
getproductbytype(ptype:any){
  this.prodtype = ptype;
  console.log('Product type = ' + this.prodtype);
  // http://localhost:8090/SmartSupplyManager/rest/product?firm=19387&ptype=Dry
  const url = this.restService.compactRestURL('getprodbybranch',this.firm);
  this.restService.getJSONFromURL(url).subscribe(
    (response: any) => {
      this.restService.getJSONFromURL(response);
      this.items = response;
      this.filteredItems = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

}
