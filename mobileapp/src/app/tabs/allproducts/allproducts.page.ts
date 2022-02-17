import { RestService } from "./../../services/rest.service";
import { CartService } from "./../../cart.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-allproducts",
  templateUrl: "./allproducts.page.html",
  styleUrls: ["./allproducts.page.scss"],
})
export class AllproductsPage implements OnInit {
  public category;
  public title;
  public firm;

  vegbutton;
  showVarientBox: number;
  variantid;
  nonvegbutton;
  vegdata;
  nonvegdata;
  serachOn = false
  
  isloader = true

  vegdatanon = [];

  varientSelection = false;

  public docServer = this.restService.docServer;

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
    mfg: "",
    hasvariant: "",
    variantid: "",
    cstock: [],
  };

  datafood = false;

  cart = [];
  items = [];
  dishid;
  dishname;
  searchText = ""

  bestlist = [];
  filteredItems = [];
  menutype = []
  allData = [];
  searchData = [];


  variantlist: any;

  constructor(
    private CartService: CartService,
    public route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService
  ) {
    // this.getProductlist();
  }

  ngOnInit() {
    this.title = "Delicacies";
    this.cart = this.CartService.getCart();

    if (this.routprms.snapshot.params["id"]) {
      this.dishid = this.routprms.snapshot.params["id"];
    }

    if (this.routprms.snapshot.params["name"]) {
      this.dishname = this.routprms.snapshot.params["name"];
    }

    // this.getbestfood();
  }

  ionViewWillEnter() {
    this.cart = this.CartService.getCart();
    if (this.dishname) {
      this.getProductlist();
      this.getcatbyfood()
    } else {
      this.getbestbybfood();
    }
  }

  cancel() {
    window.history.back();
  }

  openCart() {
    this.route.navigate(["/cart"]);
  }

  public getbestbybfood() {
    // Get Information from JSON REST api
    const url = this.restService.dishRestURL("getfood", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.filteredItems = response;
        let getCart = this.CartService.getCart();
        this.filteredItems = this.filteredItems.map((entry) => {
          let foundFlag = false;

          // If verient present then add first rateperunit of varient into that
          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          // check item is present on cart or not
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

        this.allData = this.filteredItems;
        this.isloader = false
        console.log(this.filteredItems);

        
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
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

    // Reset items back to all of the items
    // this.filteredItems = this.allData;


    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != "") {
    //   this.filteredItems = this.filteredItems.filter((item) => {
    //     return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    //   });
    // }
  }

  getProductlist() {
    console.log("Getting productlist ");
    //  const urlstr = 'cat='+ this.category+'&firm='+  this.firm;
    var url = "";

    let supportUrl = "?mtype=" + this.dishname;
    url = this.restService.compactRestURL("getnamebymenu", supportUrl);
    // http://localhost:7094/dish?mtype=menutypename

    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.items = response;
        this.filteredItems = response;
        let getCart = this.CartService.getCart();
        this.filteredItems = this.filteredItems.map((entry) => {
          let foundFlag = false;

          // If verient present then add first rateperunit of varient into that
          if (entry.hasvariant == "YES" && entry.variants[0]) {
            entry.rateperunit = entry.variants[0].rateperunit;
          }

          // check item is present on cart or not
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
        this.allData = this.filteredItems;
        this.filterveg(response);

        console.log(response);

        // this. getPopularProducts();
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getvariant(index) {
    document.getElementById("dropdownlist5" + index).click();
    this.varientSelection = true;
  }

  addToCart(productid, callItem, index) {
    // this.CartService.addProduct(product);
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
        this.product.amount =
          Number(response.rateperunit) * Number(response.serves);

        // this.product.fullloose = this.fullloose;

        this.product.rateunit = response.rateunit;
        this.product.description = response.description;
        this.product.dishtype = response.dishtype;
        this.product.hasvariant = response.hasvariant;
        // this.product.mfg = response.variant;

        this.product.price = response.rateperunit;
        this.product.rateperunit = response.rateperunit;

        this.CartService.addProduct(JSON.parse(JSON.stringify(this.product)));

        if (callItem === "filteredItems") {
          this.filteredItems[index].cartPresent = true;
        }
        // if (callItem === "bestlist") {
        //   this.bestlist[index].cartPresent = true;
        // }
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  // private getProductbyveg() {
  //   const strurl = "?dishtype=VEG";
  //   const url = this.restService.compactRestURL("getallveg", strurl);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.filteredItems = response;

  //       let getCart = this.CartService.getCart();
  //       this.filteredItems = this.filteredItems.map((entry) => {
  //         let foundFlag = false;

  //         // If verient present then add first rateperunit of varient into that
  //         if (entry.hasvariant == "YES" && entry.variants[0]) {
  //           entry.rateperunit = entry.variants[0].rateperunit;
  //         }

  //         for (let item of getCart) if (item.id === entry.id) foundFlag = true;

  //         if (foundFlag) {
  //           return {
  //             cartPresent: true,
  //             ...entry,
  //           };
  //         } else {
  //           return {
  //             cartPresent: false,
  //             ...entry,
  //           };
  //         }
  //       });
  //       console.log(response);
  //       // http://localhost:7094/dish?dishtype=VEG
  //     },
  //     (error) => {
  //       console.log("Error in data load.");
  //     }
  //   );
  // }

  // private getProductbynonveg() {
  //   const strurl = "?dishtype=NON_VEG";
  //   const url = this.restService.compactRestURL("getallveg", strurl);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.filteredItems = response;

  //       let getCart = this.CartService.getCart();
  //       this.filteredItems = this.filteredItems.map((entry) => {
  //         let foundFlag = false;

  //         // If verient present then add first rateperunit of varient into that
  //         if (entry.hasvariant == "YES" && entry.variants[0]) {
  //           entry.rateperunit = entry.variants[0].rateperunit;
  //         }

  //         for (let item of getCart) if (item.id === entry.id) foundFlag = true;

  //         if (foundFlag) {
  //           return {
  //             cartPresent: true,
  //             ...entry,
  //           };
  //         } else {
  //           return {
  //             cartPresent: false,
  //             ...entry,
  //           };
  //         }
  //       });
  //       console.log(response);
  //       // http://localhost:7094/dish?dishtype=VEG
  //     },
  //     (error) => {
  //       console.log("Error in data load.");
  //     }
  //   );
  // }

  checkveg() {
    // if (this.vegbutton) {
    //   this.vegdatanon = [0];
    // } else {
    //   this.getProductlist();
    // }
    if (this.vegbutton) {
      this.nonvegbutton = false
      this.filteredItems = this.allData.filter(item => item.dishtype === "VEG")
    } else {
      if (!this.nonvegbutton) {
        this.filteredItems = this.allData  
      }
    }

    // runs if search is on
    if (this.searchText && this.searchText.trim() != "") {
      this.serachOn = true
      this.searchData = this.filteredItems.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    }
  }

  checknonveg() {
    // if (this.nonvegbutton) {
    //   this.vegdatanon = [0];
    // } else {
    //   this.getProductlist();
    // }
    if (this.nonvegbutton) {
      this.vegbutton = false
      this.filteredItems = this.allData.filter(item => item.dishtype === "NON_VEG")
    } else {
      if (!this.vegbutton) {
        this.filteredItems = this.allData  
      }
    }

    // runs if search is on
    if (this.searchText && this.searchText.trim() != "") {
      this.serachOn = true
      this.searchData = this.filteredItems.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    }
  }

  filterveg(responce) {
    this.vegdata = responce.filter((item) => {
      if (item.dishtype === "VEG") return item;
    });
    this.nonvegdata = responce.filter((item) => {
      if (item.dishtype === "NON_VEG") return item;
    });

    console.log("veg::", this.vegdata);
    console.log("nonveg::", this.nonvegdata);

    this.checkvegnonveg();
  }
  checkvegnonveg() {
    if (this.vegdata.length != 0) {
      this.vegdatanon.push(this.vegdata[0]);
    } else if (this.nonvegdata.lenght != 0) {
      this.vegdatanon.push(this.nonvegdata[0]);
    }
    console.log("kkk", this.vegdatanon);
    console.log("filterdata");
  }

  show() {
    this.datafood = true;
  }

  // public getbestfood() {
  //   // Get Information from JSON REST api
  //   const strurl = "?category=FOOD";
  //   const url = this.restService.compactRestURL("getbestsel", strurl);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response: any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.bestlist = response;
  //       let getCart = this.CartService.getCart();
  //       this.bestlist = this.bestlist.map((entry) => {
  //         let foundFlag = false;

  //         // If verient present then add first rateperunit of varient into that
  //         if (entry.hasvariant == "YES" && entry.variants[0]) {
  //           entry.rateperunit = entry.variants[0].rateperunit;
  //         }

  //         // check item is present on cart or not
  //         for (let item of getCart) if (item.id === entry.id) foundFlag = true;

  //         if (foundFlag) {
  //           return {
  //             cartPresent: true,
  //             ...entry,
  //           };
  //         } else {
  //           return {
  //             cartPresent: false,
  //             ...entry,
  //           };
  //         }
  //       });
  //       console.log(this.bestlist);
  //     },
  //     (error) => {
  //       console.log("Error in data load.");
  //     }
  //   );
  // }

  addvariant(productid, variants) {
    // this.CartService.addProduct(product);

    if (this.varientSelection) {
      let getSelectedVarient = variants.find(
        (entry) => entry.id === this.variantid
      );
      this.varientSelection = false;

      // add in the cart
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

          this.showVarientBox = 0;
        },
        (error) => {
          console.log("Error in data load.");
        }
      );
    }
  }

  private getcatbyfood() {
    // Get Information from JSON REST api
    const url = this.restService.orderRestURL('getallfood', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        response = response.filter(entry => entry.id != this.dishid)
        this.menutype = response;
        this.isloader = false
      },
      error => {
        console.log('Error in data load.');
        this.isloader = false
      }
    );
  }

  private getsallerid(index) {
    document.getElementById("bestsallerid" + index).click();
    this.varientSelection = true;
  }
}
