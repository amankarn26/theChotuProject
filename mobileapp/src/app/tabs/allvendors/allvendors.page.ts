import { RestService } from './../../services/rest.service';
import { CartService } from './../../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allvendors',
  templateUrl: './allvendors.page.html',
  styleUrls: ['./allvendors.page.scss'],
})
export class AllvendorsPage implements OnInit {

  public category;
  public title;
  public firm;

  public docServer = this.restService.docServer;

  propularprodList = [];

  cart = [];
  items = [];

  firmList = [];
  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
    loop: true,
  };

  sliderConfig3 = {
    initialSlide: 1,
    slidesPerView: 2,
    autoplay: true,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20
  };


  filteredItems=[];

  constructor(private CartService: CartService,
              public route: Router,
              public routprms: ActivatedRoute,
              private restService: RestService
              ) {
                this.initializeItems();
                this.getProductlist();
               }

  ngOnInit() {

    this.title = 'All Vendors';
    this.cart = this.CartService.getCart();
    // this.category = this.routprms.snapshot.params['category'];

    // if(this.routprms.snapshot.params['firm']){
    //  // this.firm = this.routprms.snapshot.params['firm'];
    // }

    // if (this.route.url === '/tabs/productlist/' + encodeURIComponent(this.category)) {
    //   this.title = this.category;
    //   this.getFirmList();
    //   this.cart = this.CartService.getCart();
    //  // this.items = this.CartService.getProducts();
    // } else{
    //   // if (this.route.url === '/tabs/fproductlist/' + encodeURIComponent(this.category) + '/' +
    //   //   + encodeURIComponent(this.firm)) {

    //   //       //
    //   //       this.title = this.category;
    //   //       // this.getFirmList();
    //   //       this.cart = this.CartService.getCart();

    //   //       this.getProductlistbyPopularfirm(this.category, this.firm);
    // }
  }

  ionViewWillEnter() {
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

  getProductlist(){

    console.log('Getting productlist ');
  //  const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
  // http://localhost:8090/SmartSupplyManager/rest/firm?pincode=441401

    const address = JSON.parse(localStorage.getItem('Address'));

    const url = this.restService.compactRestURL('getallvendorsbypin', address.pincode);

  //  const url = this.restService.compactRestURL('prodlistbytype_firm', urlstr);
   // const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.items = response;
        this.filteredItems = response;
        console.log(response);
        // this. getPopularProducts();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getFirmList() {
    // Get Information from JSON REST api
    // alert('firm');


    console.log('Getting firm list');
    const url = this.restService.compactRestURL('getfirmbycategory', this.category);
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

}
