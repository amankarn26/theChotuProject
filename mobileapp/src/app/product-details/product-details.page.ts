import { RestService } from "./../services/rest.service";
import { CartService } from "./../cart.service";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AlertController, Animation, AnimationController } from "@ionic/angular";

import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.page.html",
  styleUrls: ["./product-details.page.scss"],
})
export class ProductDetailsPage implements OnInit, AfterViewInit{


  // For Animation
  anim:Animation;
  anim2:Animation;
  bundleAnim:Animation;

  @ViewChild('frame1',{static: false}) frame1:ElementRef;
  @ViewChild('frame2',{static: false}) frame2:ElementRef;


  public category;
  public title;

  public prodid;
  public prodname;

  RATEPERPLATE;
  RATEPERBOTTLE;
  RATEPERDRINK;

  public reviewlist;

  public docServer = this.restService.docServer;

  cart = [];
  items = [];
  variant;
  distance;
  volume;
  branch;
  stocksoldas;

  full;
  loose;
  count = 1;

  fullloose = "FULL";

  public branchlist;

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
    hasvariant: "",
    variants: "",
    variantid: "",
  };

  public selectedVarient 

  available = "NO";

  // RATEPEEPRODUCT/RATEPERKG/RATEPERDOZEN/RATEPERPKG

  serves = 0;

  public firm;

  public showfirmlist = false;

  firmList = [];

  sliderConfig5 = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true,

    loop: true,
    centeredSlides: false,
    spaceBetween: 5,
  };

  public reviewLoaded = false
  public varientselected = false

  public variantid : any

  constructor(
    private CartService: CartService,
    public route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService,
    public alertController: AlertController,
    private animationCtrl: AnimationController
  ) {}
  ngAfterViewInit(): void {
    // For First 
    this.anim = this.animationCtrl.create('frameAnim');
    this.anim.addElement(this.frame1.nativeElement).duration(750).easing("ease").fromTo("marginTop","100vh","0")

    // For second 
    this.anim2 = this.animationCtrl.create('frame2Anim');
    this.anim2.addElement(this.frame2.nativeElement).duration(750).easing("ease").fromTo("marginTop","100vh","-50px")

    this.bundleAnim = this.animationCtrl.create("bundleAnim");
    this.bundleAnim.addAnimation([this.anim,this.anim2]);
  }

  ngOnInit() {

    // console.clear()
    this.prodname = this.routprms.snapshot.params["name"];

    if (this.routprms.snapshot.params["id"]) {
      this.prodid = this.routprms.snapshot.params["id"];
    }


    this.title = this.prodname;

    this.cart = this.CartService.getCart();
    this.getProduct();
    this.getrereviewedbyid();
  }

  ionViewDidEnter() {

    // Play Animation
    this.bundleAnim.play()

  }

  openCart() {
    this.route.navigate(["/cart"]);
  }

  cancel() {
    window.history.back();
  }

  getProduct() {
    this.available = "NO";
    // alert('getting list');
    const urlstr = "/" + this.prodid;
    const url = this.restService.compactRestURL("proddetailsbyid_firm", urlstr);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        this.items = response;
        this.product.id = response.id;
        this.product.img = this.docServer + "/" + response.photos[0].docpath;
        this.product.name = response.name;
        this.product.menutype = response.menutype;
        this.product.amount = response.amount;

        // this.product.fullloose = this.fullloose;

        this.product.rateunit = response.rateunit;
        this.product.description = response.description;
        this.product.dishtype = response.dishtype;
        this.product.hasvariant = response.hasvariant;
        this.product.variants = response.variants;
        this.product.bestseller = response.bestseller;
        this.product.priority = response.priority;

        if (response.variants.length > 0) {
          this.selectedVarient = response.variants[0];
          this.product.variantid = this.selectedVarient
          this.product.price = response.variants[0].rateperunit;
          this.product.rateperunit = response.variants[0].rateperunit;
          this.varientselected = true
        }
        else {
          this.product.price = response.rateperunit;
          this.product.rateperunit = response.rateperunit;
        }


        this.product.photos = response.photos;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // subHeader: 'Subtitle',
      message: "Volume Not Available.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async AlertSelectVarient() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      // subHeader: 'Subtitle',
      message: "Currently not available, please try after sometime.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  private getrereviewedbyid() {
    // Get Information from JSON REST api
    const url = this.restService.compactRestURL("reviewbyid", this.prodid);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.reviewlist = response;
        // console.clear();
        this.reviewLoaded = true
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  add() {
    if (this.count < 10) {
      this.count++;
    }
  }

  remove() {
    if (this.count > 1) {
      this.count--;
    }
  }



  // Created in new Design
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  public pushToCart() {
    if (this.product.hasvariant ==="YES") {
      if (this.varientselected) {
        this.addToCart()
      } else {
        this.AlertSelectVarient()
      }
    }
    else{
      this.addToCart()
    }
  }

  public addToCart() {

    let cartSendData = JSON.parse(JSON.stringify(this.product))
    delete cartSendData.photos
    delete cartSendData.variants

    cartSendData.amount = cartSendData.price * Number(cartSendData.serves)
    
    this.CartService.addProduct(JSON.parse(JSON.stringify(cartSendData)));
    this.cancel();
  }

  public changeVarient(index) {
    this.selectedVarient = this.product.variants[index];
    this.product.variantid = this.selectedVarient
    this.product.price = this.selectedVarient.rateperunit
    this.product.rateperunit = this.selectedVarient.rateperunit

    this.varientselected = true
  }
}
