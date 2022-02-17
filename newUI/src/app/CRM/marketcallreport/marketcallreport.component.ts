import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;



@Component({
  selector: 'app-marketcallreport',
  templateUrl: './marketcallreport.component.html',
  styleUrls: ['./marketcallreport.component.css']
})

export class MarketcallreportComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }


public firstmonthday;
public lastmonthday;
public currentmonthday;

public calldata;

public fromdate;
public todate;

public empcalldata;

public targetaddition;
public compaddition;


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

  ngOnInit() {

    this.getrelationshipmanager();
    this.getallcampaing();
    if(this.userRole==='MARKETING')
    {
       this.rm = sessionStorage.getItem('name');
       this.getrmbyid();
       this.getemptarsaledata();
       this.getempcalldata();
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
      


        this.fromdate = this.firstmonthDate();
        this.todate = this.todayDate();

        this.getemptarsaledata();
        this.getcalldatabyemp();
        this.getempcalldata();



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


  public  getemptarsaledata()
    {

      if(this.userRole==='MARKETING')
      {
        const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

        const url = this.restService.crmRestURL('emptarsaledata', this.eid+ urlstring);
        this.restService.getJSONFromURL(url).subscribe(
          (response:any) => {
            this.restService.getJSONFromURL(response);
            // this.datalist = response;
            // this.data=response;
            console.log(response);
            this.esaledata = response;
           this.getcalldatabyemp();
           this.getempcalldata();

          },
          error => {
            console.log('Error in data load. in getemptarsaledata()');
          }
        );
      }
      else
      {
        //8834&todate=2019-07-11&fromdate=2019-07-27
        const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

        const url = this.restService.crmRestURL('emptarsaledata', this.rm + urlstring);
        this.restService.getJSONFromURL(url).subscribe(
          (response:any) => {
            this.restService.getJSONFromURL(response);
            // this.datalist = response;
            // this.data=response;
            console.log(response);
            this.esaledata = response;
           this.getcalldatabyemp();
           this.getempcalldata();

          },
          error => {
            console.log('Error in data load getemptarsaledata()');
          }
        );
  
      }
     
     
    }

    public firstmonthDate() {
      var datee = new Date();
      var d = new String();
      let dd: string;
      let mm: string;
      let temp: string;
      let temp1: string = '0';
      // for month only
      temp = (datee.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else { mm = (datee.getMonth() + 1).toString(); }
      // for date only
      temp = datee.getDate().toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        dd = temp1;
      } else { dd = datee.getDate().toString(); }
      d = datee.getFullYear() + '-' + mm + '-' + '01';

      return d.toString();
    }

    public todayDate() {
      var datee = new Date();
      var d = new String();
      let dd: string;
      let mm: string;
      let temp: string;
      let temp1: string = '0';
      // for month only
      temp = (datee.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else { mm = (datee.getMonth() + 1).toString(); }
      // for date only
      temp = datee.getDate().toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        dd = temp1;
      } else { dd = datee.getDate().toString(); }
      d = datee.getFullYear() + '-' + mm + '-' + dd;

      return d.toString();
    }


 
  public unixTimeConverter(ts) {
    let datetime = '';
    const dattime1 = '';
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';


    /******************* */
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dtt = new Date(ts * 1000);
    // Hours part from the timestamp
    const hours = dtt.getHours();
    // Minutes part from the timestamp
    const minutes = '0' + dtt.getMinutes();
    // Seconds part from the timestamp
    const seconds = '0' + dtt.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ':' + minutes.substr(-2);
    // alert(formattedTime);
    /*********************************************************** */

    try {
      const dateVal = '/Date(' + ts + ')/';
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else { mm = (date.getMonth() + 1).toString(); }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = '0';
        temp1 = temp1 + temp;

        dd = temp1;
      } else { dd = date.getDate().toString(); }

      //  datetime = date.getFullYear() + "-" + mm + "-" + dd + 'T' + date.toTimeString().slice(0, 5);
      datetime = date.getFullYear() + '-' + mm + '-' + dd;


    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

  }


  public getcalldatabyemp()
  {
    if(this.userRole==='MARKETING')
    {
      const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

      const url = this.restService.crmRestURL('empcalldata', this.eid+ urlstring);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.calldata = response;
         
        },
        error => {
          console.log('Error in data load. in getcalldatabyemp()');
        }
      );
    }
    else
    {
      //8834&todate=2019-07-11&fromdate=2019-07-27
      const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

      const url = this.restService.crmRestURL('empcalldata', this.rm + urlstring);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.calldata = response;
        },
        error => {
          console.log('Error in data load getcalldatabyemp()');
        }
      );

    }
  }


  public getempcalldata()
  {
    if(this.userRole==='MARKETING')
    {
      const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

      const url = this.restService.crmRestURL('calldataall', this.eid+ urlstring);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.empcalldata = response.callData;
          let targetaddition = 0;
          let compaddition =0;
          for(let data of this.empcalldata)
          {
            targetaddition = Number(targetaddition) + Number(data.calltarget);
            compaddition = Number(compaddition) +Number(data.compcall);
          }

          this.targetaddition =targetaddition;
          this.compaddition =compaddition;


         
        },
        error => {
          console.log('Error in data load. in getempcalldata()');
        }
      );
    }
    else
    {
      //8834&todate=2019-07-11&fromdate=2019-07-27
      const urlstring = '&todate='+this.todate+'&fromdate='+this.fromdate;

      const url = this.restService.crmRestURL('calldataall', this.rm + urlstring);
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.empcalldata = response.callData;
          let targetaddition = 0;
          let compaddition =0;
          for(let data of this.empcalldata)
          {
            targetaddition = Number(targetaddition) + Number(data.calltarget);
            compaddition = Number(compaddition) +Number(data.compcall);
          }
          this.targetaddition =targetaddition;
          this.compaddition =compaddition;

        },
        error => {
          console.log('Error in data load getempcalldata()');
        }
      );

    }
  }

}

