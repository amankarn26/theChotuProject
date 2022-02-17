import { RestService } from './../services/rest.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-catwithdish',
  templateUrl: './catwithdish.page.html',
  styleUrls: ['./catwithdish.page.scss'],
})
export class CatwithdishPage implements OnInit {

  public title;
  public firm;
  category;
  dishlist = [];

  filter = false;
  vegbutton;
  mocktail;
  cocktail;
  serachOn = false
  isloader = true

  variantselection = false

  morebuttonshow = false;


  public docServer = this.restService.docServer;

  propularprodList = [];

  product = {
    id: 19174,
    name: '',
    dishtype:'',
    rateunit: "RATEPERPLATE",
    menutype:'',
    description: '',
    priority: 1,
    photos: [],
    img: '',
    price: 0,
    serves: '1',
    bestseller:'',
    amount:0,
    // fullloose:'',
    rateperunit:'',
    mfg:'',
    hasvariant:'',
    variantid:'',
    cstock:[]
   

  };
  searchData = [];

  searchText = ""
  variantid
  showVarientBox
  menuname =[];
  selectedmenu:any

  varientSelection = false


  Bestsellers = [];

  cart = [];
  items = [];
  dishid;
  dishname;
  veglist = [];
  nonvegbutton;

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


  

  filteredItems = [];

  type;
  nonveglist = [];

  constructor(private CartService: CartService,
    public route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService
  ) {

  }

  ngOnInit() {

    this.title = 'All Dish';
    this.cart = this.CartService.getCart();


    if (this.routprms.snapshot.params['id']) {
      this.dishid = this.routprms.snapshot.params['id'];
    }

    if (this.routprms.snapshot.params['name']) {
      this.dishname = this.routprms.snapshot.params['name'];
    }

    if (this.dishname) {
      this.getProductlist();
      
    } else {
      this.getbestbyfood();
      
    }


    // this.getbestsaller();
    this.getcatbydrink();
  }

  ionViewWillEnter() {
    this.cart = this.CartService.getCart();





  }

  OnSearchClick(){
    this.route.navigate(['/tabs/allproducts']);
  }
  onNotificationsClick() {
    this.route.navigate(['notifications']);
  }


  addToCart(productid,callItem,index) {
    // this.CartService.addProduct(product);
   

    const urlstr = '/' + productid;

    const url = this.restService.compactRestURL('proddetailsbyid_firm', urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        this.items = response;
        this.product.id = response.id;
        this.product.img = this.docServer + '/' + response.photos[0].docpath;
        this.product.name = response.name;
        this.product.menutype = response.menutype;
        this.product.amount = Number(response.rateperunit) * Number(response.serves);


        // this.product.fullloose = this.fullloose;

        this.product.rateunit = response.rateunit;
        this.product.description = response.description;
        this.product.dishtype = response.dishtype;
        this.product.hasvariant = response.hasvariant;
        // this.product.mfg = response.variant;


        this.product.price = response.rateperunit;
        this.product.rateperunit = response.rateperunit;


        this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));


        if (callItem === 'filteredItems') {
          this.filteredItems[index].cartPresent = true;
        }
        if (callItem === 'Bestsellers') {
          this.Bestsellers[index].cartPresent = true;
        }
        

      },
      error => {
        console.log('Error in data load.');
      }
    );
    
  }

  cancel() {
    // goBack code fro cancel button
    // alert("Mai hu aman")
    window.history.back();
  }



  openCart() {
    this.route.navigate(['/cart']);
  }



 









  getProductlistbyPopularfirm(category: any, firm: any) {
    // alert('getting list');

    if (localStorage.getItem('selectedFirm') && (Number(localStorage.getItem('selectedFirm')) !== Number(this.firm))) {

      console.log(localStorage.getItem('selectedFirm'));

      alert('Not same shope clearing cart');
      localStorage.removeItem('cartData');
      localStorage.removeItem('selectedFirm');
      this.cart = this.CartService.getCart();
      // location.reload();
      // this.route.navigate(['/tabs/tab1']);
      //  <a [routerLink]="['/tabs/productlist',cat.prodtype]">

    } else {

      localStorage.setItem('selectedFirm', this.firm);




      console.log('Getting productlist by prodtype and firm');
      const urlstr = 'product?category=' + this.category + '&firm=' + this.firm;
      const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
      // http://localhost:8090/SmartSupplyManager/rest/product?category=Cloths&firm=20
      // const url = this.restService.compactRestURL('prodlistbycategory_firm', urlstr);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);
          this.items = response;
          console.log(response);

        },
        error => {
          console.log('Error in data load.');
        }
      );


    }
  }



  getItems(ev) {


    // set val to the value of the ev target searchData
    this.searchText = ev.target.value;

    if (this.searchText && this.searchText.trim() != "") {
      this.serachOn = true
      this.searchData = this.filteredItems.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    } else {
      this.serachOn = false
    }
  }

  private getPopularProductsdish() {
    const url = this.restService.compactRestURL('getallproducts', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.dishlist = response;

        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getProductbyveg() {
    const strurl = '?dishtype=COCKTAIL';
    const url = this.restService.compactRestURL('getallveg', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.dishlist = response;
        console.log(response);
        // http://localhost:7094/dish?dishtype=VEG
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getProductbynonveg() {
    const strurl = '?dishtype=MOCKTAIL';
    const url = this.restService.compactRestURL('getallveg', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
       this.dishlist = response;
        console.log(response);
        // http://localhost:7094/dish?dishtype=VEG
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getProductbycoc() {
    const strurl = '?dishtype=HARD_DRINKS';
    const url = this.restService.compactRestURL('getallveg', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
       this.dishlist = response;
        console.log(response);
        // http://localhost:7094/dish?dishtype=VEG
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getProductbymoc() {
    const strurl = '?dishtype=SOFT_DRINKS';
    const url = this.restService.compactRestURL('getallveg', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
       this.dishlist = response;
        console.log(response);
        // http://localhost:7094/dish?dishtype=VEG
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  public getbestbyfood() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('getfood','');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.filteredItems = response;
        let getCart = this.CartService.getCart();
        this.filteredItems = this.filteredItems.map(entry => {
          let foundFlag = false

          // If verient present then add first rateperunit of varient into that
          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit
          }

          // check item is present on cart or not
          for(let item of getCart) if (item.id === entry.id) foundFlag = true

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry
            }
          } else {
            return {
              cartPresent: false,
              ...entry
            }
          }
        });
        this.isloader = false
        console.log(this.filteredItems);
        
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  
  
  getProductlist() {

    console.log('Getting productlist ');
    //  const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    var url = ""

   
      let supportUrl = "?mtype=" + this.dishname
      url = this.restService.compactRestURL('getnamebymenu', supportUrl);
      // http://localhost:7094/dish?mtype=menutypename

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.items = response;
        this.filteredItems = response;
        let getCart = this.CartService.getCart();
              this.filteredItems = this.filteredItems.map(entry => {
                let foundFlag = false
      
                // If verient present then add first rateperunit of varient into that
                if (entry.hasvariant == "YES" && entry.variants[0]) {
                  entry.rateperunit = entry.variants[0].rateperunit
                }
      
                // check item is present on cart or not
                for(let item of getCart) if (item.id === entry.id) foundFlag = true
      
                if (foundFlag) {
                  return {
                    cartPresent: true,
                    ...entry
                  }
                } else {
                  return {
                    cartPresent: false,
                    ...entry
                  }
                }
              })

        console.log(response);
        // this. getPopularProducts();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  bestsallerdata(){
    this.morebuttonshow = true;
  }

  public getbestsaller() {
    // Get Information from JSON REST api
    const strurl = '?category=DRINKS';
    const url = this.restService.compactRestURL('getbestseller', strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.Bestsellers = response;

        let getCart = this.CartService.getCart();
        this.Bestsellers = this.Bestsellers.map(entry => {
          let foundFlag = false

          // If verient present then add first rateperunit of varient into that
          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit
          }


          for (let item of getCart) if (item.id === entry.id) foundFlag = true

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry
            }
          } else {
            return {
              cartPresent: false,
              ...entry
            }
          }
        })

        //console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  addvariant(productid,variants) {
    // this.CartService.addProduct(product);


    if (this.varientSelection) {
      let getSelectedVarient = variants.find(entry => entry.id === this.variantid)
      this.varientSelection = false


      // add in the cart
      const urlstr = '/' + productid;

      const url = this.restService.compactRestURL('proddetailsbyid_firm', urlstr);
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          this.items = response;
          this.product.id = response.id;
          this.product.img = this.docServer + '/' + response.photos[0].docpath;
          this.product.name = response.name;
          this.product.menutype = response.menutype;
          this.product.amount = Number(getSelectedVarient.rateperunit) * Number(response.serves);


          // this.product.fullloose = this.fullloose;

          this.product.rateunit = response.rateunit;
          this.product.description = response.description;
          this.product.dishtype = response.dishtype;
          this.product.hasvariant = response.hasvariant;
          this.product.variantid = getSelectedVarient;


          this.product.price = getSelectedVarient.rateperunit;
          this.product.rateperunit = getSelectedVarient.rateperunit;
          this.variantid = "";


          this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));

          this.showVarientBox = 0

        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
  }

 public getvariant(index){
    document.getElementById("dropdownlist1" + index).click();
    this.varientSelection = true;
  }
 
 private bestsdrink(index){

 document.getElementById("drinklike" + index).click();
    this.varientSelection = true;
  }



  private getcatbydrink() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('getalldrinks','');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
      
        response = response.filter(entry => entry.id != Number(this.dishid))
        this.menuname = response;
        this.isloader = false
       

      },
      error => {
        console.log('Error in data load.');
        this.isloader = false
      }
    );
  }

}
