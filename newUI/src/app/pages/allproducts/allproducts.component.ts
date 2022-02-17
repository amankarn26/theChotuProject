import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';

declare var Swal: any;

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  constructor(private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public firmcatgeory = sessionStorage.getItem('category');

  public urls=[];
  public tp = 0;

  public prodtypeselect;


  public prodlist;
  public prodtlist;
public data=[];
  public prodtype;

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public items = [];
  

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }



  ngOnInit() {
    this.countcart();
    this.getProdlist();
    this.getData();
  }

  
  countcart() {
    console.log(this.items.length);
    console.log(this.items);
if(sessionStorage.getItem('items'))
{
  this.items= JSON.parse(sessionStorage.getItem('items'));
}
   

  }

  private getProdlist() {
    // Get Information from JSON REST api
    const url = this.restService.prodtypeRestURL('prodtypenew', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.prodtlist = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getData() {
    var url = this.restService.productRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        this.tp = this.data.length;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  
  public getprodbyprodtype() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
  //  http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.productRestURL('byprodtype', this.prodtype);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        console.log('Done fatching data from prod property!');
        const res: any = response;
        this.data = res;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  refreshincall()
{
  
 
    this.prodtype = undefined;
    this.getData();
  
    

  
}

}
