import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import {  Color } from 'ng2-charts';
declare var Swal: any;

//import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  branchlist: any;


  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

    public docServer = this.restService.docServer;

    piedata=[];

    public freqdata = [];

  public filterQuery = '';
  public filterQuery1 = '';

  public rowsOnPage = 5;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data=[];

  public vendorstatsdata;
public vendorstats;

 public deliveredorders=[];
 public placedorders=[];
 public packedorders=[];
public popularproducts=[];
public pickuporders=[];
public id =sessionStorage.getItem('id');


  username=sessionStorage.getItem('name');


  private quoteStat=[];

  public barChartColors: Color[] = [
    { backgroundColor: 'lightblue' },
    
  ]

  public barChartLabels: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
   
    { data: [65, 59, 80, 81], label: 'Sale' },
     { data: [28, 1, 10, 19], label: 'Bookings' },
    // { data: [65, 140, 100, 120], label: 'Employee' }
  ];


  public barChartLabels1: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartData1: any[] = [
    { data: [65, 59, 80, 81], label: 'Orders' },
   //  { data: [28, 1, 10, 19], label: 'Booking' },
  ];

  public barChartLabels2: string[] = []; // ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
  public barChartData2: any[] = [
    { data: [65, 59, 80, 81], label: 'Sales' },
    //  { data: [28, 1, 10, 19], label: 'Value' },
  ];






  // lineChart
  public lineChartData: Array<any> = [
    { data: [28, 1, 10, 19, 28, 1, 10], label: 'Expense' },
    { data: [65, 59, 80, 81, 65, 59, 80], label: 'Income' }

  ];
  // income and expense
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';
public orderstats=[];

private qValue1=[];

private qValue=[];


//public quoteStat=[]

public saledata=[];

private mcaseState;

public toprevenue=[];


 // Doughnut Chart
 public doughnutChartLabels: string[] = [];
 // ['Temporary', 'Trainee', 'Permanent', 'Internship'];  'Leaflet', 'Brochure','Visiting Cards','Doctor File'
 public doughnutChartData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
 // [100000, 40000, 60000, 10000]; // [];//[1, 2, 0,3];
 public doughnutChartType: string = 'doughnut';


 public doughnutChartOptions: any = {
   scaleShowVerticalLines: false,
   responsive: true
 };


 public adminselect;
 public vendorselect;
 public deliveryselect;

 firmlist=[];

 public selectdelivery;
 public selectfirm;



  ngOnInit() {
    if(this.route.url === '/adminhome')
{
  this.getvendororderstats();
  this.getorderStateList();
  this.getProductStats();
  this.getrevenuestats();
}
  }


  adminstats()
  {
  // this.getvendororderstats();
  // this.getorderStateList();
  // this.getProductStats();
  // this.getrevenuestats();
  this.vendorselect=false;
  this.deliveryselect=false;
  }
  
  getallbranch(){

    var url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
       // this.data=response;
        console.log(response);
        this.branchlist = response;
      
        
      },
      error => {
        console.log('Error in data load.');
      }
    );
  this.adminselect=null;
  this.deliveryselect=null;

  }

  getalldp(){

    var url = this.restService.delivertypoolRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
       // this.data=response;
        console.log(response);
        this.branchlist = response;
      
        
      },
      error => {
        console.log('Error in data load.');
      }
    );
    this.adminselect=null;
    this.vendorselect=null;
  
  }
  /////////////////////////////////////////////////////////////Statiss starting////////////////////////////////////////////////////////////////////////////

  public getProductStats() {
    const url = this.restService.statsRestURL('product_admin', sessionStorage.getItem('id'));
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        console.log('Getting all product');
        for (let entry of response) {
          console.log(entry); // 1, "string", false
          this.doughnutChartLabels.push(entry.name);
       // this.doughnutChartData.push(entry.qCount);
         this.piedata.push(entry.count);
         // this.piedata.push(100);
        }

        console.log('Getting Data For Pie Cahrt');

     
        this.randomize();

      
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
    
  getvendororderstats()
{
  var url = this.restService.statsRestURL('vendororderstats_admin', sessionStorage.getItem('id'));
  this.restService.getJSONFromURL(url).subscribe(
    (response :any) => {
      this.restService.getJSONFromURL(response);
      this.vendorstatsdata = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

public randomize(): void {

      let clone1 = JSON.parse(JSON.stringify(this.barChartData1));
      clone1[0].data = this.orderstats;
 //     clone1[1].data = this.qValue1;
  
      this.barChartData1 = clone1;
      console.log('clonedf rom quotation stat and quotation value:');
      console.log(clone1);

      let clone2 = JSON.parse(JSON.stringify(this.barChartData2));
      clone2[0].data = this.qValue1;
 //     clone1[1].data = this.qValue1;
  
      this.barChartData2 = clone2;
      console.log('clonedf rom quotation stat and quotation value:');
      console.log(clone1);

      const clon = JSON.parse(JSON.stringify(this.barChartData));
      clon[0].data = this.piedata;
      this.doughnutChartData = clon;

    }

  public getorderStateList() {
   
    
   
        var url = this.restService.statsRestURL('monthlyvendororders_admin', sessionStorage.getItem('firm'));
        this.restService.getJSONFromURL(url).subscribe(
          (response : any) => {
            this.restService.getJSONFromURL(response);
              this.mcaseState = response;
            let joingingDataa;
            joingingDataa = response;
            console.log('barcjart 222222222222222222222222222222222222222222222222222222222222');
            console.log(response);
    

            const data = response;
    
            this.saledata = response;
    
        this.generatbooksalecount();
        this.generatbooksalevalue();
          },
          error => {
            console.log('Error in data load.');
          }
        );
      }
    
    
     generatbooksalecount(){
    
    
            this.barChartLabels1.push(this.saledata[0].month.substring(0, 3) + ' ' + this.saledata[0].year);
         //   this.orderstats.push(10);
             this.orderstats.push(this.saledata[0].count);
    
            this.qValue1.push(this.mcaseState[0].qvalue);
    
    
    
    
            this.barChartLabels1.push(this.saledata[1].month.substring(0, 3) + ' ' + this.saledata[1].year);
            this.orderstats.push(this.saledata[1].count);
            this.qValue1.push(this.mcaseState[1].qvalue);
            this.barChartLabels1.push(this.saledata[2].month.substring(0, 3) + ' ' + this.saledata[2].year);
            this.orderstats.push(this.saledata[2].count);
            this.qValue1.push(this.mcaseState[2].qvalue);
    
            this.barChartLabels1.push(this.saledata[3].month.substring(0, 3) + ' ' + this.saledata[3].year);
            this.orderstats.push(this.saledata[3].count);
            this.qValue1.push(this.mcaseState[3].qvalue);
    
            this.barChartLabels1.push(this.saledata[4].month.substring(0, 3) + ' ' + this.saledata[4].year);
            this.orderstats.push(this.saledata[4].count);
            this.qValue1.push(this.mcaseState[4].qvalue);
    
            this.barChartLabels1.push(this.saledata[5].month.substring(0, 3) + ' ' + this.saledata[5].year);
            this.orderstats.push(this.saledata[5].count);
            this.qValue1.push(this.mcaseState[5].qvalue);
    
            this.barChartLabels1.push(this.saledata[6].month.substring(0, 3) + ' ' + this.saledata[6].year);
            this.orderstats.push(this.saledata[6].count);
            this.qValue1.push(this.mcaseState[6].qvalue);
    
            this.barChartLabels1.push(this.saledata[7].month.substring(0, 3) + ' ' + this.saledata[7].year);
            this.orderstats.push(this.saledata[7].count);
            this.qValue1.push(this.mcaseState[7].qvalue);
    
            this.barChartLabels1.push(this.saledata[8].month.substring(0, 3) + ' ' + this.saledata[8].year);
            this.orderstats.push(this.saledata[8].count);
            this.qValue1.push(this.mcaseState[8].qvalue);
    
            this.barChartLabels1.push(this.saledata[9].month.substring(0, 3) + ' ' + this.saledata[9].year);
            this.orderstats.push(this.saledata[9].count);
            this.qValue1.push(this.mcaseState[9].qvalue);
    
            this.barChartLabels1.push(this.saledata[10].month.substring(0, 3) + ' ' + this.saledata[10].year);
            this.orderstats.push(this.saledata[10].count);
            this.qValue1.push(this.mcaseState[10].qvalue);
    
            console.log('barcjartxyz lables');
            console.log( this.barChartLabels1);
    
            console.log('barcjart lables q value');
            console.log( this.qValue1);
    
            this.randomize();
     }
    
     generatbooksalevalue(){
    
    
          this.barChartLabels.push(this.mcaseState[0].month.substring(0, 3) + ' ' + this.mcaseState[0].year);
          //this.quoteStat.push(6000);
          this.quoteStat.push(this.saledata[0].qvalue);
           this.qValue.push(this.mcaseState[0].qvalue);
    
          this.barChartLabels.push(this.mcaseState[1].month.substring(0, 3) + ' ' + this.mcaseState[1].year);
          this.quoteStat.push(this.saledata[1].qvalue);
         this.qValue.push(this.mcaseState[1].qvalue);
          this.barChartLabels.push(this.mcaseState[2].month.substring(0, 3) + ' ' + this.mcaseState[2].year);
          this.quoteStat.push(this.saledata[2].qvalue);
         this.qValue.push(this.mcaseState[2].qvalue);
    
    
          this.barChartLabels.push(this.mcaseState[3].month.substring(0, 3) + ' ' + this.mcaseState[3].year);
          this.quoteStat.push(this.saledata[3].qvalue);
           this.qValue.push(this.mcaseState[3].qvalue);
    
          this.barChartLabels.push(this.mcaseState[4].month.substring(0, 3) + ' ' + this.mcaseState[4].year);
          this.quoteStat.push(this.saledata[4].qvalue);
          this.qValue.push(this.mcaseState[4].qvalue);
    
          this.barChartLabels.push(this.mcaseState[5].month.substring(0, 3) + ' ' + this.mcaseState[5].year);
          this.quoteStat.push(this.saledata[5].qvalue);
          this.qValue.push(this.mcaseState[5].qvalue);
    
          this.barChartLabels.push(this.mcaseState[6].month.substring(0, 3) + ' ' + this.mcaseState[6].year);
          this.quoteStat.push(this.saledata[6].qvalue);
          this.qValue.push(this.mcaseState[6].qvalue);
    
          this.barChartLabels.push(this.mcaseState[7].month.substring(0, 3) + ' ' + this.mcaseState[7].year);
          this.quoteStat.push(this.saledata[7].qvalue);
          this.qValue.push(this.mcaseState[7].qvalue);
    
          this.barChartLabels.push(this.mcaseState[8].month.substring(0, 3) + ' ' + this.mcaseState[8].year);
          this.quoteStat.push(this.saledata[8].qvalue);
          this.qValue.push(this.mcaseState[8].qvalue);
    
          this.barChartLabels.push(this.mcaseState[9].month.substring(0, 3) + ' ' + this.mcaseState[9].year);
          this.quoteStat.push(this.saledata[9].qvalue);
          this.qValue.push(this.mcaseState[9].qvalue);
    
          this.barChartLabels.push(this.mcaseState[10].month.substring(0, 3) + ' ' + this.mcaseState[10].year);
          this.quoteStat.push(this.saledata[10].qvalue);
          this.qValue.push(this.mcaseState[10].qvalue);
          this.randomize();
    }



  getrevenuestats()
{
  var url = this.restService.statsRestURL('revenuestats_admin', sessionStorage.getItem('id'));
  this.restService.getJSONFromURL(url).subscribe(
    (response :any) => {
      this.restService.getJSONFromURL(response);
      this.toprevenue = response;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


vendorstatdataseleted(id:any, event:any)
{

console.log(id);
console.log(event.target.options[event.target.selectedIndex].text);
var name = event.target.options[event.target.selectedIndex].text;
sessionStorage.setItem('idfromadmin',id);
sessionStorage.setItem('usernamefromadmin',name);

this.route.navigate(['/vendorhomepage']);
}


dpstatdataseleted(id:any, event:any)
{
console.log(id);
console.log(event.target.options[event.target.selectedIndex].text);
var name = event.target.options[event.target.selectedIndex].text;
sessionStorage.setItem('idfromadmin',id);
sessionStorage.setItem('usernamefromadmin',name);

this.route.navigate(['/delivery_dashboard']);
}

}
