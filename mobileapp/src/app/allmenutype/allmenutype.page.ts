import { Component, OnInit } from '@angular/core';
import { RestService } from './../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-allmenutype',
  templateUrl: './allmenutype.page.html',
  styleUrls: ['./allmenutype.page.scss'],
})
export class AllmenutypePage implements OnInit {


  public docServer = this.restService.docServer;
  menutype;
  dishname;
  dishid;

  constructor(private restService: RestService,
    public route: Router,
    public routprms: ActivatedRoute,
    private CartService: CartService) { }

  ngOnInit() {

    this.title = 'Menu';
    this.cart = this.CartService.getCart();

    if (this.routprms.snapshot.params['id']) {
      this.dishid = this.routprms.snapshot.params['id'];
    }

    if (this.routprms.snapshot.params['name']) {
      this.dishname = this.routprms.snapshot.params['name'];
    }




  }

  public title;

  cart = [];
  items = [];

  filteredItems = [];





  ionViewWillEnter() {
    this.cart = this.CartService.getCart();
    this.getcategories();
  }

  getcategories() {

    console.log('Getting productlist ');
    //  const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    var url = ""

    if (this.dishname) {
      let supportUrl = "?category=" + this.dishname
      url = this.restService.compactRestURL('getallmenutypesWithExtra', supportUrl);
    }
    else {
      url = this.restService.compactRestURL('getallmenutypes', '');
    }

    

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

  getmenutype() {

    console.log('Getting menutype ');
    const url = this.restService.compactRestURL('getnamebymenu', this.dishname);

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // http://localhost:7094/dish?mtype=menutypename






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


}
