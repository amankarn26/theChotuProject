import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Observable } from 'rxjs/Rx';
declare var Swal: any;



@Component({
  selector: 'app-customerstats',
  templateUrl: './customerstats.component.html',
  styleUrls: ['./customerstats.component.css']
})

export class CustomerstatsComponent implements OnInit {

  public caseState;
  public mcaseState;
  public quoteState;
  public piemonth = [];
  public piedata = [];
  public piedata1 = [];

  public productList = [];
  public custList = [];
  public customer='';
  public product='';
public quoteState1;
public quoteState2;
public quoteState3;
public quoteState4;
public quoteState5;



public isUpdate;

public prodname;
public papertypename;

  public docServer = this.restService.docServer;

  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');

  public portState;
  public mportState;
  public revenueState;
  public memberState;
  public applicantState;
  public upcomingCases;
  public totalEnquiries = 0;
  public eventdata;
  public quoteStat;

  public barchartAll = [];
  public barchartAll1 = [];
  public barchartAll2 = [];
  public barchartAll3 = [];
  public barchartAll4 = [];
  public barchartAll5 = [];






  public empstats;
  public custstats;

  public rmList;
  public papertype='';
  public papertypeList;


  options: Object;

  // Doughnut Chart
  public doughnutChartLabels: string[] = [];
  public doughnutChartLabels1: string[] = [];

  // public doughnutChartColours:string[]=['Blue','lightgreen','lightgrey','yellow','red','lightblue'];

  // ['Temporary', 'Trainee', 'Permanent', 'Internship'];  'Leaflet', 'Brochure','Visiting Cards','Doctor File'
  public doughnutChartData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public doughnutChartData1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // [100000, 40000, 60000, 10000]; // [];//[1, 2, 0,3];
  public doughnutChartType: string = 'doughnut';


  public doughnutChartColours = [
    {
      backgroundColor: ['rgba(25,013,892,0.7)', 'rgba(74,255,741,0.7)', 'rgba(360,850,25,0.7)','rgba(255,30,80,0.7)', 'rgba(10,255,110,0.7)', 'rgba(880,0,2,0.3)','rgba(85,0,741,0.6)', 'rgba(30,85,10,0.6)', 'rgba(712,0,255,0.6)',
      'rgba(96,505,50,0.6)', 'rgba(0,255,0,0.6)', 'rgba(795,0,255,0.6)','rgba(05,25,0,0.3)', 'rgba(78,369,0,0.3)', 'rgba(195,20,255,0.3)','rgba(25,925,10,0.3)', 'rgba(978,369,20,0.3)', 'rgba(89,0,255,0.3)','rgba(7,202,0,0.3)', 'rgba(74,96,0,0.3)', 'rgba(28,0,255,0.3)'],
    },
  ];

  public doughnutChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

 

  // public barChartLabels: string[] = ['Jan-Mar', 'Apr-June', 'Jul-Sep', 'Oct-Dec'];
   public barChartLabels:string[]= ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    /*   { data: [65, 59, 80, 81, 56, 55, 40, 50, 100, 80, 50, 90], label: 'Revenue' },
       { data: [28, 1, 10, 19, 12, 20, 0, 2, 20, 30, 0, 5], label: 'Maintenance' }*/
    { data: [65, 200, 80, 500, 50, 40, 80, 45, 100, 200, 40, 500], label: 'Product Sale' },
 /*    { data: [28, 1, 10, 19], label: 'Leaving' },
    { data: [65, 140, 100, 120], label: 'Employee' } */
    /* { data: [65, 59, 80, 81], label: 'Joining' },
    { data: [28, 1, 10, 19], label: 'Leaving' },
    { data: [65, 140, 100, 120], label: 'Employee' } */
  ];

  
  public barChartLabels1: string[] =  ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartData1: any[] = [
    { data: [65, 59, 80, 81, 120, 58, 58, 25,  55, 45, 24, 50], label: 'Total Sale' },
     
  ];

  public barChartLabels2: string[] =  ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartData2: any[] = [
    { data: [65, 59, 80, 81, 120, 58, 58, 25,  55, 45, 24, 50], label: 'Total Papertype Sale' },
     
  ];

  public barChartLabels3: string[] =  ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartData3: any[] = [
    { data: [65, 59, 80, 81, 120, 58, 58, 25,  55, 45, 24, 50], label: 'Total Quotation Count',},
     
  ];

  public barChartLabels4: string[] =  ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartData4: any[] = [
    { data: [65, 59, 80, 81, 120, 58, 58, 25,  55, 45, 24, 50], label: 'Product Count' },
     
  ];
   

  public barChartLabels5: string[] =  ["Mar 2019", "Apr 2019", "May 2019", "Jun 2019", "Jul 2019", "Aug 2019", "Sep 2019", "Oct 2019", "Nov 2019", "Dec 2019", "Jan 2020", "Feb 2020"];
  public barChartData5: any[] = [
    { data: [65, 59, 80, 81, 120, 58, 58, 25,  55, 45, 24, 50], label: 'PaperType Count' },
     
  ];
   
  
  public barChartDatadonut: any[] = [
    { data: [65, 59, 80, 81], label: 'Total Count' },
     
  ];

  public barChartColors3:Array<any> = [
    { // grey
      backgroundColor: 'lightblue',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.7)'
    }
  ]
  public caseData = []; // getting case counts for bar chart
  public portfolioData = []; // getting portfolio counts for bar chart
  public joiningData = [];
  public leavingData = [];
  public employeeData = [];
// expenditure graph
  public incomeData = [];
  public expenseData = [];
  public monthData = [];



  // lineChart
  public lineChartData: Array<any> = [
    { data: [28, 1, 10, 19, 28, 1, 10], label: 'Expense' },
    { data: [65, 59, 80, 81, 65, 59, 80], label: 'Income' }

  ];
  // income and expense
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: string = 'line';


  constructor(
     public route: Router,
    // public activatedRoute: ActivatedRoute,
    //  public routprms: ActivatedRoute,
    public restService: RestService,
    //  public fb: FormBuilder

  ) { }



  ngOnInit() {
   // this.getcaseStateList();

    if (this.userType === 'CUSTOMER') {

      this.route.navigate(['/profile']);
    }
   // this.getquotationAllStateList();

    // For getting notification on every 2 minutes
    Observable.interval(1000 * 60).subscribe(x => {
  //     alert("hello");
    });


    this.getrelationshipmanager();
    this.getProductData();
    this.getCustList();
  }



  // Bar-chart randamoize button code
  public randomize(): void {

    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = this.barchartAll;
    this.barChartData = clone;

    let clone1 = JSON.parse(JSON.stringify(this.barChartData1));
    clone1[0].data = this.barchartAll1;
    this.barChartData1 = clone1;

    let clone2 = JSON.parse(JSON.stringify(this.barChartData2));
    clone2[0].data = this.barchartAll2;
    this.barChartData2 = clone2;

    let clone3 = JSON.parse(JSON.stringify(this.barChartData3));
    clone3[0].data = this.barchartAll3;
    this.barChartData3 = clone3;

    let clone4 = JSON.parse(JSON.stringify(this.barChartData4));
    clone4[0].data = this.barchartAll4;
    this.barChartData4 = clone4;


    let clone5 = JSON.parse(JSON.stringify(this.barChartData5));
    clone5[0].data = this.barchartAll5;
    this.barChartData5 = clone5;    
    // console.log('Barchart');
    // console.log(this.barChartData);


    const clon = JSON.parse(JSON.stringify(this.barChartData));
    clon[0].data = this.piedata;
    this.doughnutChartData = clon;

    
    const clon1 = JSON.parse(JSON.stringify(this.barChartDatadonut));
    clon1[0].data = this.piedata1;
    this.doughnutChartData1 = clon1;
    
   
  }
  // events
  public chartClicked(e: any): void {
    console.log('Cart click');
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // public getcaseStateList() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.statsRestURL('cases', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response :any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.caseState = response;
  //       console.log(this.caseState);


  //       /* this.piedata.push(this.caseState.totalCivilCases);
  //        this.piedata.push(this.caseState.totalCriminalCases);
  //        this.piedata.push(this.caseState.totalConsumerCases);
  //        this.piedata.push(this.caseState.totalFamilyCases);*/
  //       // this.chartClicked(['CIVIL', 'CRIMINAL', 'CONSUMER', 'FAMILY']);
  //       console.log('Getting Data For Pie Cahrt');
  //       console.log(this.caseState);

  //       // this.chartClicked("MouseEvent")

  //       /*  this.doughnutChartLabels.push('CIVIL');//['CIVIL', 'CRIMINAL', 'CONSUMER','FAMILY'];
  //          this.doughnutChartLabels.push('CRIMINAL');
  //          this.doughnutChartLabels.push('CONSUMER');
  //          this.doughnutChartLabels.push('FAMILY');     */

  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }




// getting total enquiries


  // get lables and data for piechart from product :rest/stats/quotation/product



  // Getting Monthly Information of cases
  // Getting Monthly Information of Quotations for alll

  public getpapertypesale(obj) {
    
  this.papertypename = obj.target.value;
    
 //   const urll = 'customer='+this.customer;
   const urll = 'customer='+this.customer+'&ptype='+this.papertype;

     var url = this.restService.crmstatsRestURL('statsbycusprod', urll);
     this.restService.getJSONFromURL(url).subscribe(
       (response :any) => {
 
         this.restService.getJSONFromURL(response);
         this.quoteState2= response;
 
        // alert('2.   getting response');
         console.log('***********************************************************************************');
         console.log(this.quoteState2);
         this.barChartLabels2 =[];
         this.barchartAll2 =[];
         this.randomize();
 
         this.barChartLabels2.push(this.quoteState2[11].month.substring(0, 3) + ' ' + this.quoteState2[11].year);
         this.barchartAll2.push(this.quoteState2[11].saleptype);
         this.barChartLabels2.push(this.quoteState2[10].month.substring(0, 3) + ' ' + this.quoteState2[10].year);
         this.barchartAll2.push(this.quoteState2[10].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[9].month.substring(0, 3) + ' ' + this.quoteState2[9].year);
         this.barchartAll2.push(this.quoteState2[9].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[8].month.substring(0, 3) + ' ' + this.quoteState2[8].year);
         this.barchartAll2.push(this.quoteState2[8].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[7].month.substring(0, 3) + ' ' + this.quoteState2[7].year);
         this.barchartAll2.push(this.quoteState2[7].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[6].month.substring(0, 3) + ' ' + this.quoteState2[6].year);
         this.barchartAll2.push(this.quoteState2[6].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[5].month.substring(0, 3) + ' ' + this.quoteState2[5].year);
         this.barchartAll2.push(this.quoteState2[5].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[4].month.substring(0, 3) + ' ' + this.quoteState2[4].year);
         this.barchartAll2.push(this.quoteState2[4].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[3].month.substring(0, 3) + ' ' + this.quoteState2[3].year);
         this.barchartAll2.push(this.quoteState2[3].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[2].month.substring(0, 3) + ' ' + this.quoteState2[2].year);
         this.barchartAll2.push(this.quoteState2[2].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[1].month.substring(0, 3) + ' ' + this.quoteState2[1].year);
         this.barchartAll2.push(this.quoteState2[1].saleptype);
 
         this.barChartLabels2.push(this.quoteState2[0].month.substring(0, 3) + ' ' + this.quoteState2[0].year);
         this.barchartAll2.push(this.quoteState2[0].saleptype);
 
 
 
         console.log(' ************************************************************************************ ');
         console.log(' this.barChartLabels1');
         console.log(this.barChartLabels1);
         console.log('barchartAll');
         console.log(this.barchartAll);
 
 
       //  alert('3.  generate barchart lable and data');
       this.getcustpapertypecount();
         this.randomize();
       },
       error => {
       //  alert('4. error');
         console.log('Error in data load.');
         console.log('Error in data barchart*****************************************************************');
       }
     );
   }
 
 public  getcustpapertypecount()
   {
     this.quoteState5=this.quoteState2;
     this.barChartLabels5 =[];
     this.barchartAll5 =[];
     this.randomize();
     this.barChartLabels5.push(this.quoteState5[11].month.substring(0, 3) + ' ' + this.quoteState5[11].year);
     this.barchartAll5.push(this.quoteState5[11].count);
 
     this.barChartLabels5.push(this.quoteState5[10].month.substring(0, 3) + ' ' + this.quoteState5[10].year);
     this.barchartAll5.push(this.quoteState5[10].count);
 
     this.barChartLabels5.push(this.quoteState5[9].month.substring(0, 3) + ' ' + this.quoteState5[9].year);
     this.barchartAll5.push(this.quoteState5[9].count);
 
     this.barChartLabels5.push(this.quoteState5[8].month.substring(0, 3) + ' ' + this.quoteState5[8].year);
     this.barchartAll5.push(this.quoteState5[8].count);
 
     this.barChartLabels5.push(this.quoteState5[7].month.substring(0, 3) + ' ' + this.quoteState5[7].year);
     this.barchartAll5.push(this.quoteState5[7].count);
 
     this.barChartLabels5.push(this.quoteState5[6].month.substring(0, 3) + ' ' + this.quoteState5[6].year);
     this.barchartAll5.push(this.quoteState5[6].count);
 
     this.barChartLabels5.push(this.quoteState5[5].month.substring(0, 3) + ' ' + this.quoteState5[5].year);
     this.barchartAll5.push(this.quoteState5[5].count);
 
     this.barChartLabels5.push(this.quoteState5[4].month.substring(0, 3) + ' ' + this.quoteState5[4].year);
     this.barchartAll5.push(this.quoteState5[4].count);
 
     this.barChartLabels5.push(this.quoteState5[3].month.substring(0, 3) + ' ' + this.quoteState5[3].year);
     this.barchartAll5.push(this.quoteState5[3].count);
 
     this.barChartLabels5.push(this.quoteState5[2].month.substring(0, 3) + ' ' + this.quoteState5[2].year);
     this.barchartAll5.push(this.quoteState5[2].count);
 
     this.barChartLabels5.push(this.quoteState5[1].month.substring(0, 3) + ' ' + this.quoteState5[1].year);
     this.barchartAll5.push(this.quoteState5[1].count);
 
     this.barChartLabels5.push(this.quoteState5[0].month.substring(0, 3) + ' ' + this.quoteState5[0].year);
     this.barchartAll5.push(this.quoteState5[0].count);
     this.randomize();
   }

  public getcustomersale() {
   
   const urll = 'customer='+this.customer;
    var url = this.restService.crmstatsRestURL('statsbycusprod', urll);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {

        this.restService.getJSONFromURL(response);
        this.quoteState1 = response;

      
       // alert('2.   getting response');
        console.log('***********************************************************************************');
        console.log(this.quoteState1);
              this.barChartLabels1 =[];
              this.barchartAll1 =[];
              this.randomize();

        this.barChartLabels1.push(this.quoteState1[11].month.substring(0, 3) + ' ' + this.quoteState1[11].year);
        this.barchartAll1.push(this.quoteState1[11].sale);

        this.barChartLabels1.push(this.quoteState1[10].month.substring(0, 3) + ' ' + this.quoteState1[10].year);
        this.barchartAll1.push(this.quoteState1[10].sale);

        this.barChartLabels1.push(this.quoteState1[9].month.substring(0, 3) + ' ' + this.quoteState1[9].year);
        this.barchartAll1.push(this.quoteState1[9].sale);

        this.barChartLabels1.push(this.quoteState1[8].month.substring(0, 3) + ' ' + this.quoteState1[8].year);
        this.barchartAll1.push(this.quoteState1[8].sale);

        this.barChartLabels1.push(this.quoteState1[7].month.substring(0, 3) + ' ' + this.quoteState1[7].year);
        this.barchartAll1.push(this.quoteState1[7].sale);

        this.barChartLabels1.push(this.quoteState1[6].month.substring(0, 3) + ' ' + this.quoteState1[6].year);
        this.barchartAll1.push(this.quoteState1[6].sale);

        this.barChartLabels1.push(this.quoteState1[5].month.substring(0, 3) + ' ' + this.quoteState1[5].year);
        this.barchartAll1.push(this.quoteState1[5].sale);

        this.barChartLabels1.push(this.quoteState1[4].month.substring(0, 3) + ' ' + this.quoteState1[4].year);
        this.barchartAll1.push(this.quoteState1[4].sale);

        this.barChartLabels1.push(this.quoteState1[3].month.substring(0, 3) + ' ' + this.quoteState1[3].year);
        this.barchartAll1.push(this.quoteState1[3].sale);

        this.barChartLabels1.push(this.quoteState1[2].month.substring(0, 3) + ' ' + this.quoteState1[2].year);
        this.barchartAll1.push(this.quoteState1[2].sale);

        this.barChartLabels1.push(this.quoteState1[1].month.substring(0, 3) + ' ' + this.quoteState1[1].year);
        this.barchartAll1.push(this.quoteState1[1].sale);

        this.barChartLabels1.push(this.quoteState1[0].month.substring(0, 3) + ' ' + this.quoteState1[0].year);
        this.barchartAll1.push(this.quoteState1[0].sale);



        console.log(' ************************************************************************************ ');
        console.log(' this.barChartLabels1');
        console.log(this.barChartLabels1);
        console.log('barchartAll');
        console.log(this.barchartAll);
        this.getcustsalecount();

      //  alert('3.  generate barchart lable and data');
      this.getProductStats();
      this.getpapertypestats();
        this.randomize();
      },
      error => {
      //  alert('4. error');
        console.log('Error in data load.');
        console.log('Error in data barchart*****************************************************************');
      }
    );
  }
  getcustsalecount()
  {
    this.quoteState3=this.quoteState1;
    this.barChartLabels3 =[];
    this.barchartAll3 =[];
    this.randomize();
    this.barChartLabels3.push(this.quoteState3[11].month.substring(0, 3) + ' ' + this.quoteState3[11].year);
    this.barchartAll3.push(this.quoteState3[11].count);

    this.barChartLabels3.push(this.quoteState3[10].month.substring(0, 3) + ' ' + this.quoteState3[10].year);
    this.barchartAll3.push(this.quoteState3[10].count);

    this.barChartLabels3.push(this.quoteState3[9].month.substring(0, 3) + ' ' + this.quoteState3[9].year);
    this.barchartAll3.push(this.quoteState3[9].count);

    this.barChartLabels3.push(this.quoteState3[8].month.substring(0, 3) + ' ' + this.quoteState3[8].year);
    this.barchartAll3.push(this.quoteState3[8].count);

    this.barChartLabels3.push(this.quoteState3[7].month.substring(0, 3) + ' ' + this.quoteState3[7].year);
    this.barchartAll3.push(this.quoteState3[7].count);

    this.barChartLabels3.push(this.quoteState3[6].month.substring(0, 3) + ' ' + this.quoteState3[6].year);
    this.barchartAll3.push(this.quoteState3[6].count);

    this.barChartLabels3.push(this.quoteState3[5].month.substring(0, 3) + ' ' + this.quoteState3[5].year);
    this.barchartAll3.push(this.quoteState3[5].count);

    this.barChartLabels3.push(this.quoteState3[4].month.substring(0, 3) + ' ' + this.quoteState3[4].year);
    this.barchartAll3.push(this.quoteState3[4].count);

    this.barChartLabels3.push(this.quoteState3[3].month.substring(0, 3) + ' ' + this.quoteState3[3].year);
    this.barchartAll3.push(this.quoteState3[3].count);

    this.barChartLabels3.push(this.quoteState3[2].month.substring(0, 3) + ' ' + this.quoteState3[2].year);
    this.barchartAll3.push(this.quoteState3[2].count);

    this.barChartLabels3.push(this.quoteState3[1].month.substring(0, 3) + ' ' + this.quoteState3[1].year);
    this.barchartAll3.push(this.quoteState3[1].count);

    this.barChartLabels3.push(this.quoteState3[0].month.substring(0, 3) + ' ' + this.quoteState3[0].year);
    this.barchartAll3.push(this.quoteState3[0].count);
    this.randomize();
  }

  public getquotationAllStateList() {
  
   const urll = 'customer='+this.customer+'&product='+this.product;
    var url = this.restService.crmstatsRestURL('statsbycusprod', urll);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {

        this.restService.getJSONFromURL(response);
        this.quoteState = response;

       // alert('2.   getting response');
        console.log('***********************************************************************************');
        console.log(this.quoteState);
        this.barChartLabels =[];
        this.barchartAll =[];
        this.randomize();

        this.barChartLabels.push(this.quoteState[11].month.substring(0, 3) + ' ' + this.quoteState[11].year);
        this.barchartAll.push(this.quoteState[11].saleprod);
        this.barChartLabels.push(this.quoteState[10].month.substring(0, 3) + ' ' + this.quoteState[10].year);
        this.barchartAll.push(this.quoteState[10].saleprod);

        this.barChartLabels.push(this.quoteState[9].month.substring(0, 3) + ' ' + this.quoteState[9].year);
        this.barchartAll.push(this.quoteState[9].saleprod);

        this.barChartLabels.push(this.quoteState[8].month.substring(0, 3) + ' ' + this.quoteState[8].year);
        this.barchartAll.push(this.quoteState[8].saleprod);

        this.barChartLabels.push(this.quoteState[7].month.substring(0, 3) + ' ' + this.quoteState[7].year);
        this.barchartAll.push(this.quoteState[7].saleprod);

        this.barChartLabels.push(this.quoteState[6].month.substring(0, 3) + ' ' + this.quoteState[6].year);
        this.barchartAll.push(this.quoteState[6].saleprod);

        this.barChartLabels.push(this.quoteState[5].month.substring(0, 3) + ' ' + this.quoteState[5].year);
        this.barchartAll.push(this.quoteState[5].saleprod);

        this.barChartLabels.push(this.quoteState[4].month.substring(0, 3) + ' ' + this.quoteState[4].year);
        this.barchartAll.push(this.quoteState[4].saleprod);

        this.barChartLabels.push(this.quoteState[3].month.substring(0, 3) + ' ' + this.quoteState[3].year);
        this.barchartAll.push(this.quoteState[3].saleprod);

        this.barChartLabels.push(this.quoteState[2].month.substring(0, 3) + ' ' + this.quoteState[2].year);
        this.barchartAll.push(this.quoteState[2].saleprod);

        this.barChartLabels.push(this.quoteState[1].month.substring(0, 3) + ' ' + this.quoteState[1].year);
        this.barchartAll.push(this.quoteState[1].saleprod);

        this.barChartLabels.push(this.quoteState[0].month.substring(0, 3) + ' ' + this.quoteState[0].year);
        this.barchartAll.push(this.quoteState[0].saleprod);


        console.log(' ************************************************************************************ ');
        console.log(' this.barChartLabels');
        console.log(this.barChartLabels);
        console.log('barchartAll');
        console.log(this.barchartAll);


      //  alert('3.  generate barchart lable and data');
        this.getproductcountsale();
        this.randomize();
      },
      error => {
      //  alert('4. error');
        console.log('Error in data load.');
        console.log('Error in data barchart*****************************************************************');
      }
    );
  }

  getproductcountsale()
  {
    this.barChartLabels4 =[];
    this.barchartAll4 =[];
    this.randomize();
    this.quoteState4=this.quoteState;
    this.barChartLabels4.push(this.quoteState4[11].month.substring(0, 3) + ' ' + this.quoteState4[11].year);
    this.barchartAll4.push(this.quoteState4[11].count);

    this.barChartLabels4.push(this.quoteState4[10].month.substring(0, 3) + ' ' + this.quoteState4[10].year);
    this.barchartAll4.push(this.quoteState4[10].count);

    this.barChartLabels4.push(this.quoteState4[9].month.substring(0, 3) + ' ' + this.quoteState4[9].year);
    this.barchartAll4.push(this.quoteState4[9].count);

    this.barChartLabels4.push(this.quoteState4[8].month.substring(0, 3) + ' ' + this.quoteState4[8].year);
    this.barchartAll4.push(this.quoteState4[8].count);

    this.barChartLabels4.push(this.quoteState4[7].month.substring(0, 3) + ' ' + this.quoteState4[7].year);
    this.barchartAll4.push(this.quoteState4[7].count);

    this.barChartLabels4.push(this.quoteState4[6].month.substring(0, 3) + ' ' + this.quoteState4[6].year);
    this.barchartAll4.push(this.quoteState4[6].count);

    this.barChartLabels4.push(this.quoteState4[5].month.substring(0, 3) + ' ' + this.quoteState4[5].year);
    this.barchartAll4.push(this.quoteState4[5].count);

    this.barChartLabels4.push(this.quoteState4[4].month.substring(0, 3) + ' ' + this.quoteState4[4].year);
    this.barchartAll4.push(this.quoteState4[4].count);

    this.barChartLabels4.push(this.quoteState4[3].month.substring(0, 3) + ' ' + this.quoteState4[3].year);
    this.barchartAll4.push(this.quoteState4[3].count);

    this.barChartLabels4.push(this.quoteState4[2].month.substring(0, 3) + ' ' + this.quoteState4[2].year);
    this.barchartAll4.push(this.quoteState4[2].count);

    this.barChartLabels4.push(this.quoteState4[1].month.substring(0, 3) + ' ' + this.quoteState4[1].year);
    this.barchartAll4.push(this.quoteState4[1].count);

    this.barChartLabels4.push(this.quoteState4[0].month.substring(0, 3) + ' ' + this.quoteState4[0].year);
    this.barchartAll4.push(this.quoteState4[0].count);
    this.randomize();
  }


  
  public getrelationshipmanager() {



    // Get Information from JSON REST api
    var url = this.restService.empRestURL('empbyrole', 'MARKETING');
  
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.rmList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getProductData() {
    // Get Information from JSON REST api
    const url = this.restService.productRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.productList = response;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getCustList() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('','');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.custList = response;
     
        // allemployees
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  public getproduct(obj) {
    this.prodname = obj.target.options[obj.target.selectedIndex].text;

  const prodname = obj.target.options[obj.target.selectedIndex].text; 
    

    for (let data of this.productList) {

      if (data.name === prodname) {
 

        

        // this.prodSize = data.sizes;
        // this.papertDatalist = data.ptypes;  // getting paper type according to product name


    //    this.papertypeList =data.ptypes;

      


      }
    }
    this.getpapertypeData();
    this.getquotationAllStateList();
  //  this.getcustomersale();
 //   this.getpapertypesale();

    }

    public getpapertypeData() {
      // Get Information from JSON REST api
      const url = this.restService.prodtypeRestURL('', '');
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.papertypeList = response;
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
    refresh()
    {
      this.customer='';
      this.product='';
      this.papertype='';
      
      
//       this.barChartLabels =[];
//       this.barchartAll =[];
//       this.barChartLabels1 =[];
//       this.barchartAll1 =[];
//       this.barChartLabels2 =[];
//       this.barchartAll2 =[];
//       this.barChartLabels3 =[];
//       this.barchartAll3 =[];
//       this.barChartLabels4 =[];
//       this.barchartAll4 =[];
//       this.barChartLabels5 =[];
//       this.barchartAll5 =[];

      this.doughnutChartData=[];
      this.piedata=[];

      this.doughnutChartData1=[];
      this.piedata1=[];

    this.doughnutChartLabels=[];
    this.doughnutChartLabels1=[];

// this.doughnutChartColours=[];

    //  this.randomize();
     // window.location.reload();

    }

    productrefresh()
    {
      this.product='';
    }

    papertyperefresh()
    {
      this.papertype='';
    }

    public getProductStats() {
      // Get Information from JSON REST api
      const url = this.restService.crmRestURL('productstatsdonut', this.customer);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
        //  this.empstats = response;
  
          console.log(response);
          console.log('Getting all product');
          // this.doughnutChartLabels=[];
          // this.piedata=[];
          this.randomize();
          for (let entry of response) {
            console.log(entry); // 1, "string", false
            this.doughnutChartLabels.push(entry.product);
         // this.doughnutChartData.push(entry.qCount);
           this.piedata.push(entry.qCount);
           // this.piedata.push(100);
          }
  
          console.log('Getting Data For Pie Cahrt');
  
       /*    this.piedata.push(this.empstats.totalTemporaryEmp);
          this.piedata.push(this.empstats.totalTraineeEmp);
          this.piedata.push(this.empstats.totalPermanentEmp);
          this.piedata.push(this.empstats.totalInternEmp); */
  
          /*   this.piedata.push(1500);
             this.piedata.push(1000);
             this.piedata.push(400);
             this.piedata.push(100); */
          this.randomize();
  
          /* this.doughnutChartLabels.push('CIVIL'); //['CIVIL', 'CRIMINAL', 'CONSUMER','FAMILY'];
              this.doughnutChartLabels.push('CRIMINAL');
              this.doughnutChartLabels.push('CONSUMER');
              this.doughnutChartLabels.push('FAMILY');     */
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
  
    
    public getpapertypestats() {
      // Get Information from JSON REST api
      const url = this.restService.crmRestURL('papertypestatsdonut', this.customer);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
        //  this.empstats = response;
  
          console.log(response);
          console.log('Getting all product');
          // this.doughnutChartLabels1=[];
          // this.piedata1=[];
          // this.piedata1=[];
this.randomize();
          for (let entry of response) {
            console.log(entry); // 1, "string", false
            this.doughnutChartLabels1.push(entry.paper);
         // this.doughnutChartData.push(entry.qCount);
           this.piedata1.push(entry.qCount);
           // this.piedata.push(100);
          }
  
          console.log('Getting Data For Pie Cahrt');
  
       /*    this.piedata.push(this.empstats.totalTemporaryEmp);
          this.piedata.push(this.empstats.totalTraineeEmp);
          this.piedata.push(this.empstats.totalPermanentEmp);
          this.piedata.push(this.empstats.totalInternEmp); */
  
          /*   this.piedata.push(1500);
             this.piedata.push(1000);
             this.piedata.push(400);
             this.piedata.push(100); */
          this.randomize();
  
          /* this.doughnutChartLabels.push('CIVIL'); //['CIVIL', 'CRIMINAL', 'CONSUMER','FAMILY'];
              this.doughnutChartLabels.push('CRIMINAL');
              this.doughnutChartLabels.push('CONSUMER');
              this.doughnutChartLabels.push('FAMILY');     */
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
}
