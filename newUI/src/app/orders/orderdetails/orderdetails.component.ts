import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  public filterQuery = '';
  public rowsOnPage = 1.7976931348623157E+308;
  public sortBy = 'todate';
  public sortOrder = 'asc';
  public orderdetails;
  public id;
  public docServer = this.restService.docServer;


  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


  ngOnInit() {
    this.id = this.routprms.snapshot.params['id'];

    this.getorderbyid();
  }

  public getorderbyid() {

    const url = this.restService.OrdersRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);

        console.log(response);
        this.orderdetails = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  cancel() {
    window.history.back();
  }
}
