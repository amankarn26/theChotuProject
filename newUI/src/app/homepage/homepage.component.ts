import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from "./../services/rest.service";

declare var Swal: any;

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {


  constructor(
    private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) {}

  public firmdata = [];
  public productdata = [];
  prodtypedata = [];
  // public propularprodCateList=[];
  public docServer = this.restService.docServer;
  public slider = [];

  public filterQuery = "";



  // Updateed by aman 26 4 2021

  public bestfood = [];
  public bestdrinks = [];
  public delifood = [];
  public delidrinks = [];
  public eventSlider = [];
  public menuFood = [];
  public menuDrinks = [];

  ngOnInit() {
    this.getEvents();

    // update by aman
    this.getBestSellerFood()
    this.getBestSellerDrinks()
    this.getBestFood()
    this.getBestDrink()
    this.getEvent()
    this.getMenuFood()
    this.getMenuDrinks()
  }

  // Updateed by aman 26 4 2021

  public getBestSellerFood(){
    const url = this.restService.homepageURL("best", "FOOD");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.bestfood = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getBestSellerDrinks(){
    const url = this.restService.homepageURL("best", "DRINKS");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.bestdrinks = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getBestFood(){
    const url = this.restService.homepageURL("dish", "category=FOOD&index=0&limit=12");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.delifood = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getBestDrink(){
    const url = this.restService.homepageURL("dish", "category=DRINKS&index=0&limit=12");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.delidrinks = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getEvent(){
    const url = this.restService.homepageURL("event", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.eventSlider = response;
        
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getMenuFood(){
    const url = this.restService.homepageURL("menutype", "?category=FOOD");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.menuFood = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  public getMenuDrinks(){
    const url = this.restService.homepageURL("menutype", "?category=DRINKS");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.menuDrinks = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }



  public getEvents() {
    // Get Information from JSON REST api
    const url = this.restService.docsRestURL("sliderimg", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.slider = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }


}
