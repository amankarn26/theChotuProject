import { CartService } from "./../cart.service";
import { RestService } from "./../services/rest.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  // Created By aman
  varientSelection = true;

  // Old Code

  cart = [];
  items = [];
  branchlist = [];
  public discountlist;
  drinklist = [];
  private isLogin = false;

  Bestsellers = [];
  bestlist = [];

  eventlist = [];
  menuname = [];

  public variantlist;
  variantid;

  discountFlag = false;

  public docServer = this.restService.docServer;

  public party = {
    name: "",
    place: "",
    contact: "",
    date: ""
  }

  popularcategorry;
  populerid;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
  };

  sliderConfig1 = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  };

  sliderConfig2 = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  };

  sliderConfig3 = {
    initialSlide: 0,
    slidesPerView: 1,
    // autoplay: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // },
    loop: true,
    centeredSlides: false,
    autoplayDisableOnInteraction: false,
    spaceBetween: 5,
  };

  sliderConfig4 = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // autoplay: true,
    loop: true,
    centeredSlides: false,
    spaceBetween: 5,
  };

  sliderConfig5 = {
    initialSlide: 0,
    slidesPerView: 4,
    // autoplay: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false
    // },
    loop: true,
    centeredSlides: false,
    autoplayDisableOnInteraction: false,
    spaceBetween: 5,
  };


  allcategory = [];
  menutype = [];
  dishlist = [];
  offferList = [];

  serviceAvailable = true;

  notificationList = [];
  propularprodCateList = [];
  producttype = [];
  searchmenu = [];

  // New Var For Product
  product = {
    id: 19174,
    name: "",
    dishtype: "",
    rateunit: "RATEPERPLATE",
    menutype: "",
    description: "",
    priority: 1,
    photos: [],
    img: "",
    price: 0,
    serves: "1",
    bestseller: "",
    amount: 0,
    // fullloose:'',
    rateperunit: "",
    variantid: "",
    hasvariant: "",
    cstock: [],
  };

  showVarientBox: number;



  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  sliderConfigNew = {
    initialSlide: 0,
    slidesPerView: 4,
    spaceBetween: 20,
  };

  sliderConfigDeal = {
    initialSlide: 0,
    slidesPerView: 2.3,
    spaceBetween: 20,
  };
  sliderConfigDeal1 = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 20,
  };


  constructor(
    private CartService: CartService,
    private router: Router,
    private restService: RestService
  ) {
    if(localStorage.getItem("islogin") != "true") {
      this.router.navigate(["/index/home"]);
    }
  }

  ngOnInit() {
    // console.clear()
    this.cart = this.CartService.getCart();
    this.getOffers();
    // this.getdiscount();
    this.getbestsaller();
    this.getallevent();
    this.getbestbyfood();

    this.getPopularProductsCategory();
    this.getcatbyfood();
    this.getPopularProductsdish();
    this.getLogin();
    this.getdrink();
    this.getcatbydrink();
  }

  ionViewWillEnter() {
    this.cart = this.CartService.getCart();

    this.notificationList = JSON.parse(
      localStorage.getItem("notificationList")
    );
  }

  openCart() {
    this.router.navigate(["/cart"]);
  }

  private getPopularProductsCategory() {
    const url = this.restService.productRestURL("getallcategory", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.allcategory = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getPopularProductsdish() {
    const url = this.restService.compactRestURL("getalldishesh", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.dishlist = response;
        let getCart = this.CartService.getCart();
        this.dishlist = this.dishlist.map((entry) => {
          let foundFlag = false;

          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          for (let item of getCart) if (item.id === entry.id) foundFlag = true;

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry,
            };
          } else {
            return {
              cartPresent: false,
              ...entry,
            };
          }
        });
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getdrink() {
    const url = this.restService.compactRestURL("getalldrink", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.drinklist = response;
        let getCart = this.CartService.getCart();
        this.drinklist = this.drinklist.map((entry) => {
          let foundFlag = false;
          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          for (let item of getCart) if (item.id === entry.id) foundFlag = true;

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry,
            };
          } else {
            return {
              cartPresent: false,
              ...entry,
            };
          }
        });
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // It is in use aman, for new Home page
  // Used to retrive Offers and retriving successfully
  private getOffers() {
    const url = this.restService.compactRestURL("getoffers", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.offferList = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public submitPartyOrder() {
    const url = this.restService.pratyRestURL();
    let sendableData = {
      name: this.party.name,
      phone: this.party.contact,
      dob: this.party.date,
      address: this.party.place,
      status: "New"
    }
    this.restService.postFormData(url, sendableData).subscribe(
      (response) => {
        // Responce data.
        console.log("Status on Post API");
        console.log(response);
        alert("We successfully receive your request. We will contact you soon.")
      },
      (error) => {
        console.log("Error in Submit Party order.");
        alert("Please check your internet connection.")
      }
    );

  }

  public getbestsaller() {
    const strurl = "?category=DRINKS";
    const url = this.restService.compactRestURL("getbestseller", strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.Bestsellers = response;

        let getCart = this.CartService.getCart();
        this.Bestsellers = this.Bestsellers.map((entry) => {
          let foundFlag = false;

          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          for (let item of getCart) if (item.id === entry.id) foundFlag = true;

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry,
            };
          } else {
            return {
              cartPresent: false,
              ...entry,
            };
          }
        });

      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getbestbyfood() {
    const strurl = "?category=FOOD";
    const url = this.restService.compactRestURL("getbestsel", strurl);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.bestlist = response;
        let getCart = this.CartService.getCart();
        this.bestlist = this.bestlist.map((entry) => {
          let foundFlag = false;

          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          for (let item of getCart) if (item.id === entry.id) foundFlag = true;

          if (foundFlag) {
            return {
              cartPresent: true,
              ...entry,
            };
          } else {
            return {
              cartPresent: false,
              ...entry,
            };
          }
        });
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getallevent() {
    const url = this.restService.compactRestURL("getallevent", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.eventlist = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  onNotificationsClick() {
    this.router.navigate(["notifications"]);
  }

  async isNotify(): Promise<any> {
    return this.notificationList.length > 0 ? true : false;
  }

  OnSearchClick() {
    this.router.navigate(["/tabs/allproducts"]);
  }

  getLogin() {
    if (localStorage.getItem("islogin") === "true") {
      this.isLogin = true;
    }
  }

  public getdiscount() {
    const url = this.restService.compactRestURL("getcoupan", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response) => {
        this.restService.getJSONFromURL(response);
        this.discountlist = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  addToCart(productid, callItem, index) {
    const urlstr = "/" + productid;

    const url = this.restService.compactRestURL("proddetailsbyid_firm", urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        this.items = response;
        this.product.id = response.id;
        this.product.img = this.docServer + "/" + response.photos[0].docpath;
        this.product.name = response.name;
        this.product.menutype = response.menutype;
        this.product.amount = Number(response.rateperunit);
        this.product.rateunit = response.rateunit;
        this.product.description = response.description;
        this.product.dishtype = response.dishtype;
        this.product.hasvariant = response.hasvariant;

        this.product.price = response.rateperunit;
        this.product.rateperunit = response.rateperunit;

        this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));

        if (callItem === "bestlist") {
          this.bestlist[index].cartPresent = true;
        } else if (callItem === "Bestsellers") {
          this.Bestsellers[index].cartPresent = true;
        } else if (callItem === "dishlist") {
          this.dishlist[index].cartPresent = true;
        } else if (callItem === "drinklist") {
          this.drinklist[index].cartPresent = true;
        }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getvariant(index) {

    document.getElementById("dropdownlist" + index).click();
    this.varientSelection = true;
  }

  public getsallerid(index) {
    document.getElementById("bestsallerid" + index).click();
    this.varientSelection = true;
  }

  public bestsdrink(index) {
    document.getElementById("drinklike" + index).click();
    this.varientSelection = true;
  }

  public bestfoodby(index) {
    document.getElementById("dropdown1" + index).click();
    this.varientSelection = true;
  }

  addvariant(productid, variants) {

    if (this.varientSelection) {
      let getSelectedVarient = variants.find(
        (entry) => entry.id === this.variantid
      );
      this.varientSelection = false;

      const urlstr = "/" + productid;

      const url = this.restService.compactRestURL(
        "proddetailsbyid_firm",
        urlstr
      );
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.restService.getJSONFromURL(response);

          this.items = response;
          this.product.id = response.id;
          this.product.img = this.docServer + "/" + response.photos[0].docpath;
          this.product.name = response.name;
          this.product.menutype = response.menutype;
          this.product.amount =
            Number(getSelectedVarient.rateperunit) * Number(response.serves);


          this.product.rateunit = response.rateunit;
          this.product.description = response.description;
          this.product.dishtype = response.dishtype;
          this.product.hasvariant = response.hasvariant;
          this.product.variantid = getSelectedVarient;

          this.product.price = getSelectedVarient.rateperunit;
          this.product.rateperunit = getSelectedVarient.rateperunit;
          this.variantid = "";

          this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));

          this.showVarientBox = 0;
        },
        (error) => {
          console.log("Error in data load.");
        }
      );
    }
  }

  private getcatbyfood() {
    const url = this.restService.orderRestURL("getallfood", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.menutype = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getcatbydrink() {
    const url = this.restService.orderRestURL("getalldrinks", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.menuname = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // Open Website
  public openWebsite() {
    window.open("https://softwiders.com/", "_blank")
  }
}
