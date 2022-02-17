import { Component, OnInit } from '@angular/core';
import { RestService } from './../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../cart.service';



@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {
  [x: string]: any;

  public title;

  cart = [];
  items = [];

  filteredItems = [];

  segment = 'DRINKS'





  public docServer = this.restService.docServer;
  constructor(private restService: RestService,
    public route: Router,
    public routprms: ActivatedRoute,
    private CartService: CartService) {
   
  }

  ngOnInit() {

  

    if (this.routprms.snapshot.params['menuname']) {
      this.menuname = this.routprms.snapshot.params['menuname'];
      console.log('asmita::',this.menuname)
      if (this.menuname === "DRINKS") {
        this.segment = 'DRINKS'
        this.getcatbydrink();
      } else {
        this.segment = 'FOOD'
      }
    }


    this.title = 'Menu';
    this.cart = this.CartService.getCart();

  }

  changebutton(id,name) {
    console.log('asmita::',this.menuname)
    if (this.menuname === 'DRINKS') {
      this.route.navigate(['/catwithdish/',id,name]);
      // this.route.navigate(['/tabs/allproducts/',id,name]);
    }
    else {
      this.route.navigate(['/tabs/allproducts/',id,name]);
      
    } 
  }


  ionViewWillEnter() {
    this.cart = this.CartService.getCart();
    // this.getcategories();
    this.getcatbydrink()

  }

  getcategories() {

    console.log('Getting productlist ');
    //  const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    const url = this.restService.compactRestURL('getallcategorie', '');

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







  cancel() {
    console.log('asmita');
    window.history.back();
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



  openCart() {
    this.route.navigate(['/cart']);
  }

  onNotificationsClick() {
    this.route.navigate(['notifications']);
  }

  segmentChanged() {

    if (this.segment === 'DRINKS') {

      this.getcatbydrink()
      this.menuname = 'DRINKS'
    
      
    }
    else {
      
      // document.getElementById("segfood").style.borderColor = "green";
      this.getcatbyfood();
      this.menuname = 'FOOD'
    }

  

  }


  private getcatbyfood() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('getallfood', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.filteredItems = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getcatbydrink() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('getalldrinks', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.filteredItems = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }





}
