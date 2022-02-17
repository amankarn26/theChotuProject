import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-marketingefw',
  templateUrl: './marketingefw.component.html',
  styleUrls: ['./marketingefw.component.css']
})
export class MarketingefwComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


public rmList;
public rm;
public relationshipmgrid;
public rmdetails;
public esaledata;
public eid = sessionStorage.getItem('id');
public username="";
public const ='localhost:8080/elegaldocs/';
public docServer = this.restService.docServer;
public photo = sessionStorage.getItem('photo');

public userRole = sessionStorage.getItem('role');
public userType = sessionStorage.getItem('type');

public campaingdata;

public rmnane = sessionStorage.getItem('name');


public allottedclients;
public newallottedclients;
public followupstats;
public regularclientdata;
public coldcalldata;
public referencecalldata;
public paymentrecoverydata;
public irregularclientdata;

  ngOnInit() {

    this.getrelationshipmanager();
    this.getallcampaing();
    if(this.userRole==='MARKETING')
    {
       this.rm = sessionStorage.getItem('name');
       this.getrmbyid();
       this.getempsaledata();
    }
  }


public refresh()
{
    
this.rm ='';
 
  this.getrelationshipmanager();
}

  public getrelationshipmanager() {



    // Get Information from JSON REST api
    var url = this.restService.empRestURL('empbyrole', 'MARKETING');
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.rmList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getrmbyid()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.empRestURL('details', this.eid);

    }
    else{
      var url = this.restService.empRestURL('details', this.rm);

    }
    console.log('id:'+ this.rm);
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.rmdetails = response;
        this.getempsaledata();
        this.getallalottedclients();
        this.getallnewalottedclients();
        this.getallfollowupstats();
        this.getallregularclientdata();
        this.getpaymentrecoverylist();
        this.getallirregularclientdata();
        this.getallcoldcalldata();
        this.getallreferencecalldata();

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallalottedclients()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('allottedclientsstats', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('allottedclientsstats', this.rm);
    }
    console.log('id:'+ this.rm);
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.allottedclients = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getallnewalottedclients()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('newallottedclientsstats', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('newallottedclientsstats', this.rm);
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.newallottedclients = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallfollowupstats()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('followupstats', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('followupstats', this.rm);
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.followupstats = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallregularclientdata()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('regularclientdata', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('regularclientdata', this.rm);
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.regularclientdata = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallirregularclientdata()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('irregularclientdata', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('irregularclientdata', this.rm);
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.irregularclientdata = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public getpaymentrecoverylist(){
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('paymentrecoverydata', this.eid);
    }
    else{
      var url = this.restService.crmRestURL('paymentrecoverydata', this.rm);
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.paymentrecoverydata = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallcoldcalldata()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('coldcalldata','');
    }
    else{
      var url = this.restService.crmRestURL('coldcalldata', '');
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.coldcalldata = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallreferencecalldata()
  {
    if(this.userRole==='MARKETING')
    {
    var url = this.restService.crmRestURL('referencecalldata','');
    }
    else{
      var url = this.restService.crmRestURL('referencecalldata', '');
    }
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.referencecalldata = response;
        },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  
  // public onChangeRM(obj) {
  //   const stateId = obj.srcElement.value;
  //   // console.log(obj);
  //   // Call city data method
  //   console.log('primhandre...');
  //   console.log(obj.target.value);
  //   console.log(obj.target.options[obj.target.selectedIndex].text);
  //   this.relationshipmgrid = obj.target.options[obj.target.selectedIndex].text;
  // };


  public getallcampaing() {
    // Get Information from JSON REST api
    const url = this.restService.campaignRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.campaingdata = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
    }


  public  getempsaledata()
    {

      if(this.userRole==='MARKETING')
      {
        const url = this.restService.crmRestURL('empsaledata', this.eid);
        this.restService.getJSONFromURL(url).subscribe(
          (response:any) => {
            this.restService.getJSONFromURL(response);
            // this.datalist = response;
            // this.data=response;
            console.log(response);
            this.esaledata = response;
           
          },
          error => {
            console.log('Error in data load. in getempsaledata()');
          }
        );
      }
      else
      {
        const url = this.restService.crmRestURL('empsaledata', this.rm);
        this.restService.getJSONFromURL(url).subscribe(
          (response:any) => {
            this.restService.getJSONFromURL(response);
            // this.datalist = response;
            // this.data=response;
            console.log(response);
            this.esaledata = response;
          },
          error => {
            console.log('Error in data load getempsaledata()');
          }
        );
  
      }
     
     
    }

}
