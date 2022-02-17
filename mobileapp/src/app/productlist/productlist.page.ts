
import { RestService } from './../services/rest.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  public category;
  public title;
  public firm;

  public docServer = this.restService.docServer;

  propularprodList = [];

  cart = [];
  items = [];

  prodtypeList = [];

  firmList = [];
  sliderConfig = {
    // spaceBetween: 10,
    // centeredSlides: true,
    // slidesPerView: 1.6,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // },
    // loop: true,
    initialSlide: 1,
    slidesPerView: 2,
    // autoplay: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };

  sliderConfig3 = {
    initialSlide: 1,
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
    initialSlide: 1,
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

  sliderConfig5 = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };


  sliderConfig6 = {
    initialSlide: 1,
    slidesPerView: 2,
    // autoplay: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };

  filteredItems=[];

  prodtype;

  constructor(private CartService: CartService,
              public route: Router,
              public routprms: ActivatedRoute,
              private restService: RestService,
              public alertController: AlertController
              ) {
                this.initializeItems();
               }

  ngOnInit() {
    this.category = this.routprms.snapshot.params['category'];

    if(this.routprms.snapshot.params['firm']){
     // this.firm = this.routprms.snapshot.params['firm'];
    }

    if (this.route.url === '/tabs/productlist/' + encodeURIComponent(this.category)) {
      this.title = this.category;
      this.getFirmList();
      this.cart = this.CartService.getCart();
      this.firm = sessionStorage.getItem('firm');
     // this.items = this.CartService.getProducts();
    } else{
      // if (this.route.url === '/tabs/fproductlist/' + encodeURIComponent(this.category) + '/' +
      //   + encodeURIComponent(this.firm)) {

      //       //
      //       this.title = this.category;
      //       // this.getFirmList();
      //       this.cart = this.CartService.getCart();

      //       this.getProductlistbyPopularfirm(this.category, this.firm);
    }

   // this.presentAlertConfirm();
    // alert(localStorage.getItem('selectedFirm'));
    // this.firm = localStorage.getItem('selectedFirm');
  }

  ionViewWillEnter(){
    this.prodtypeList = [];
    // this.items = [];
    // this.filteredItems = [];
    this.getFirmList();
    this.cart = this.CartService.getCart();
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
    // console.log(event);

    if(localStorage.getItem('selectedFirm') && (Number(localStorage.getItem('selectedFirm')) !== Number(this.firm)) && (this.cart.length > 0)  ){

      // console.log(localStorage.getItem('selectedFirm'));

      // alert('Not same shope clearing cart');
      // localStorage.removeItem('cartData');
      // localStorage.removeItem('selectedFirm');
      // this.cart = this.CartService.getCart();
      // location.reload();

         this.presentAlertConfirm();
      // this.route.navigate(['/tabs/tab1']);
     //  <a [routerLink]="['/tabs/productlist',cat.prodtype]">

    }else{

    localStorage.setItem('selectedFirm',this.firm);


    // console.log('Getting productlist by CATEGORY and firm');
    // const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    // const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);

    // this.restService.getJSONFromURL(url).subscribe(
    //   (response: any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.items = response;
    //     this.filteredItems = response;
    //     console.log(response);
    //     this.getPopularProducts();
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );

    console.log('Getting product type  by CATEGORY');



    const result1 = this.firmList.find(x => x.id == this.firm);

    if (result1) {
      this.getProdtypesData();
      this. getPopularProducts();
    }




  }
  }


  private getFirmList() {
    // Get Information from JSON REST api
    // alert('firm');

   // http://localhost:8090/SmartSupplyManager/rest/firm?category=BAKERY&pincode=441401

    const address = JSON.parse(localStorage.getItem('Address'));
   // let urlstr = this.category;
    const urlstr = this.category+'&pincode='+ address.pincode;

    console.log('Getting firm list');
    const url = this.restService.compactRestURL('getfirmbycategory', urlstr );
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.firmList = response;



        if(localStorage.getItem('selectedFirm')){
          this.firm = localStorage.getItem('selectedFirm');

          this.getProductlist('dd');
        }

        // alert(this.firm);
        // alert(this.firm);

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );

    // console.log('Getting firm list');
    // const url = this.restService.firmRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response: any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.firmList = response;
    //     console.log(response);
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
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

    if(localStorage.getItem('selectedFirm') && (Number(localStorage.getItem('selectedFirm')) !== Number(this.firm))){

      console.log(localStorage.getItem('selectedFirm'));

      alert('Not same shope clearing cart');
      localStorage.removeItem('cartData');
      localStorage.removeItem('selectedFirm');
      this.cart = this.CartService.getCart();
      // location.reload();
            // this.route.navigate(['/tabs/tab1']);
          //  <a [routerLink]="['/tabs/productlist',cat.prodtype]">

    }else{

    localStorage.setItem('selectedFirm',this.firm);




    console.log('Getting productlist by prodtype and firm');
    const urlstr = 'product?category='+ this.category+'&firm='+  this.firm;
    const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
    // http://localhost:8090/SmartSupplyManager/rest/product?category=Cloths&firm=20
   // const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.items = response;
        console.log(response);
        this. getPopularProducts();
      },
      error => {
        console.log('Error in data load.');
      }
    );


  }
  }


  initializeItems(){


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
      message : 'Changing Vendor will clear your Cart, Do you wish to proceed?',
    // message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // location.reload();
            console.log('Confirm Cancel: blah');
            this.cancel();
            this.firm = localStorage.getItem('selectedFirm');
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
    this.prodtypeList = [];
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
    this.items = [];
    this.filteredItems = [];
    // http://localhost:8090/SmartSupplyManager/rest/product?firm=19387&ptype=Dry
    const url = this.restService.compactRestURL('getallProdby_btype_firm', '?firm=' + this.firm+'&ptype='+this.prodtype);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        this.items = response;
        this.filteredItems = response;
        console.log(response);
       // this.sliderConfig6.

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }



  setvendor(firm: any){
    this.firm = firm;
    this.getProductlist('all');
    location.reload();
  }
}
