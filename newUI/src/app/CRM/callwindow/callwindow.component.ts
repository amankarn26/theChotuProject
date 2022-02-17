import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

declare var Swal: any;


@Component({
  selector: 'app-callwindow',
  templateUrl: './callwindow.component.html',
  styleUrls: ['./callwindow.component.css']
})
export class CallwindowComponent implements OnInit {

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

public urll;
public rm;
public rmList;
public customer;
public relationshipmgrid;
public rmdetails;
public callList;

public fromdate;
public todate;

public lastcall;

public relationshipmgrname;

public isUpdate= false;


public callcallto;
public callcalltoname;

public callcalledby;
public callcalledbyname;



public eid = sessionStorage.getItem('id');
public username="";
public const ='localhost:8080/elegaldocs/';
public docServer = this.restService.docServer;
public photo = sessionStorage.getItem('photo');

public userRole = sessionStorage.getItem('role');
public userType = sessionStorage.getItem('type');

public custList;
public custdetails;
public cdata;
public custListbyrm;
public orderdetails;

public title = '';
public subtitle = '';
public id ='';

  //  for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;

  public calldetails;

  public flag = false;
  public gradeList;

  public speech;
  public speechList;
  public speechdetails;


  public call = {
    firm:sessionStorage.getItem('firm'),
    calledby: '',
		calledbyname: '',
		callto: '',
		calltoname:'', 
		callnotes: '',
		calltime: new Date(),
		nextcallremark: '',
    nextcalltime: '',
    callduration:''
  };

  public blockcall = {
    customer: '',
	custname: '',
	requestedby: '',           
	reqbyname:'', 				
  head: '' ,
  blockreason : '',
	rejectreason: '',
	state: 'REQUESTED'
  }

  ngOnInit() {



this.id=this.routprms.snapshot.params['id'];


    if(this.route.url==='/addcall')
    {

      this.title = 'Add Call';
      this.subtitle = 'Fill new Call information and submit.';
     // this.flag = true;
    //  this.getRoleList();
    this.getempbymarketing();
    if(this.userRole==='MARKETING'){
      this.marketinglogin();
      this.getallcustomerbyrm();
    }
  
  }
  else if (this.route.url === '/updatecall/' + encodeURIComponent(this.id)) {
    this.call['id'] =  this.routprms.snapshot.params['id'];
    this.title = 'Update Call ';
    this.subtitle = 'Edit Call details';
    this.isUpdate = true;

    this.getCallListbyid();

  }
  else if(this.route.url==='/managecall')
  {

    this.title = 'Manage Call';
    this.subtitle = 'Manage Call information including view, add, update and delete';
    this.getCallList();
    this.getempbymarketing();
   
  }

  else
  {
   // this.speech='INTRODUCTION'
   
    if(this.userRole==='MARKETING')
    {
       this.getcusListbyrm();
     //  this.getallcustomerbyrm();
       this.rm=sessionStorage.getItem('name');
       
    }
    else{
      this.getCustList();
      this.getempbymarketing();
    }
  }



  }


  public marketinglogin()
  {
    this.call.calledby= sessionStorage.getItem('id');
    this.call.calledbyname= sessionStorage.getItem('name');
  }

  public getCustList() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('','');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
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

  public getcustomerbyid()
   {
   
    
     var url = this.restService.customerRestURL('details', this.customer);

      console.log('id:'+ this.customer);
  
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.custdetails = response;
        this.relationshipmgrname=response.l2details.relationshipmgrname;
        this.call.calledby=response.l2details.relationshipmgr;
        this.call.calledbyname=response.l2details.relationshipmgrname;
        this.call.callto=response.id;
        this.call.calltoname=response.shopname;
        this.blockcall.customer=response.id;
        this.blockcall.custname= response.shopname;
        this.blockcall.requestedby= response.l2details.relationshipmgr;
        this.blockcall.reqbyname= response.l2details.relationshipmgrname;
  
      
        this.callcallto=response.id;;
        this.callcalltoname= response.shopname;
        this.callcalledby= response.l2details.relationshipmgr;
        this.callcalledbyname= response.l2details.relationshipmgrname;


        this.getcustomerorderdetails();
        this.getcustomerlastcall();
        this.getallspeech();

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getcustomerorderdetails()
  {
   // http://192.168.0.122:8090/PPressManager/rest/crm/call/quote?callto=65

   const url = this.restService.crmRestURL('orderdetails', this.customer);
   this.restService.getJSONFromURL(url).subscribe(
     (response:any) => {
       this.restService.getJSONFromURL(response);
      
       console.log(response);
       this.orderdetails = response;
     },
     error => {
       console.log('Error in data load.');
      //  Swal.fire('This Customer Does not Placed any Quotation Yet','','error');
      //  this.refresh();
     }
   );

  }

  public getcustomerlastcall()
  {
   

   const url = this.restService.crmRestURL('lastcall', this.customer);
   this.restService.getJSONFromURL(url).subscribe(
     (response:any) => {
       this.restService.getJSONFromURL(response);
      
       console.log(response);
       this.lastcall = response;
     },
     error => {
       console.log('Error in data load.');
      //  Swal.fire('Last Call Detail Not Found','','info');
      //  this.refresh();
     }
   );

  }


  public getcusListbyrm() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('cbyrm', this.eid);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.custList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  
  public getallcustomerbyrm() {
    // Get Information from JSON REST api
    if(this.userRole==='MARKETING')
    {
      const url = this.restService.customerRestURL('cbyrm', sessionStorage.getItem('id'));
      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          this.custListbyrm = response;
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }
    else{
      if(this.route.url==='/viewcall')
      {
       this.urll = this.restService.customerRestURL('cbyrm', this.rm );

      }
      else{
        this.urll = this.restService.customerRestURL('cbyrm', this.call.calledby );

      }
      this.restService.getJSONFromURL(this.urll).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
          // this.data=response;
          console.log(response);
          if(this.route.url==='/viewcall')
          {
            this.custList = response;
          }
          else{
            this.custListbyrm = response;
          }
        
        },
        error => {
          console.log('Error in data load.');
        }
      );

    }
  
  
  }

makecall(){

  this.getempbymarketing();
  if(this.userRole==='MARKETING'){
    this.marketinglogin();
    this.getallcustomerbyrm();
  }


}


  public getempbymarketing() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('empbyrole', 'MARKETING');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.rmList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  public onChangeRM(obj) {
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.call.calledbyname = obj.target.options[obj.target.selectedIndex].text;
    this.getallcustomerbyrm();
  };

  public onChangecustomer(obj) {
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.call.calltoname = obj.target.options[obj.target.selectedIndex].text;
  };

  
cancel() {
  // goBack code fro cancel button
  window.history.back();
}
  /****************************** submit data************************************ */
  public submitData() {

    this.call.callduration =  this.call.callduration+':00' ;
    console.log('submitData function');
    console.log(this.call);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('add', '');
    this.restService.postFormData(url, this.call).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
          Swal.fire('Added', '', 'success');
          if(this.route.url==='/viewcall')
          {
            document.getElementById('closethis').click();
            this.getCallList();
            this.call.calledby='';
            this.call.calledbyname='';
            this.call.callto='';
            this.call.callnotes='';
            this.call.nextcallremark='';
            this.call.nextcalltime='';
            this.call.callduration = '';
          }
          else
          {
            this.route.navigate(['/managecall']);
          }
          
          window.scrollTo(0, 0);

      },
      error => {
        // Error Message
        Swal.fire(
          error.statusText,
          error._body,
          'error'
        );
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
  }

  public updateData() {

   // this.call.calltime=new Date();

    console.log('submitData function');
    console.log(this.call);
    // let finalData = this.multiJson(this.appointment);
    const url = this.restService.crmRestURL('edit', '');
    this.restService.postFormData(url, this.call).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Updated', '', 'success');
          this.route.navigate(['/managecall']);
          window.scrollTo(0, 0);

      },
      error => {
        // Error Message
        Swal.fire(
          error.statusText,
          error._body,
          'error'
        )
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;
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

 //  datetime = dd + '-'+mm+'-'+date.getFullYear();
    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

  }
  // delete Role
  deletecall(id: any) {
  /*  if (confirm('Are you sure you want to delete this?')) {
      const url = this.restService.crmRestURL('delete', '');
      console.log('Delete using this id:' + id);
      const json = '{\"id\":\"' + id + '\"}';
      this.restService.postFormData(url, json).subscribe(
        (response:any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          this.alertify.alert('Deleted Successfully');
          this.getRoleList();
          // Now do your stuff here
        },
        error => {
          // Error Message
          this.alertify.alert('<b>Failed to delete </b><br>' + error.statusText + '<br>'
            + error._body);
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    }
*/
    /////////////////////////////
    Swal.fire({
      title: 'Are you sure?',
    // text: 'You will not be able to recover this data!',
      text: ' It will delete from all places wherever it is in used!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code

        const url = this.restService.crmRestURL('delete', id);
        console.log('Delete using this id:' + id);
     //   const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
           this.getCallList();

            // Now do your stuff here
          },
          error => {
            // Error Message
            /* this.alertify.alert('<b>Failed to delete grade</b><br>' + error.statusText + '<br>'
               + error._body); */
            Swal.fire(
              error.statusText,
              error._body,
              'error'
            );
            console.log('Error in data load.');
            // Doyour stuff here
          }
        );

        // delete code end
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        );
      }
    });
  }

  public getCallListbyemp() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('calldetailsbyemp', this.rm);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.callList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  public getCallList() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.callList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getCallListbyid() {
    // Get Information from JSON REST api
    const url = this.restService.crmRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.call = response;
        this.call.nextcalltime=this.unixTimeConverter(response.nextcalltime);
        console.log(this.unixTimeConverter(response.nextcalltime));
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  refresh()
  {
    
    this.customer = '';
    if(this.userRole==='ADMIN')
    {
      this.rm = '';
    }
   
    this.getCustList();
    
  }

  
  refreshincall()
  {
    
   
      this.rm = undefined;
      this.fromdate='';
      this.todate ='';
      
      this.getCallList();
    
  }



public getallspeech()
{
  //http://localhost:8090/PPressManager/rest/crm/speech/add
  const url = this.restService.crmRestURL('speechall', '');
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      this.speechList = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}

public getspeechbyid()
{
  //http://localhost:8090/PPressManager/rest/crm/speech/add
  const url = this.restService.crmRestURL('speechbyid', this.speech);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      console.log(response);
      this.speechdetails = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


public submitcallData() {

  this.blockcall.customer=this.callcallto;
  this.blockcall.custname= this.callcalltoname;
  this.blockcall.requestedby= this.callcalledby;
  this.blockcall.reqbyname= this.callcalledbyname;
  console.log('submitcallData function');
  console.log(this.blockcall);
  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.crmRestURL('addblockcall', '');
  this.restService.postFormData(url, this.blockcall).subscribe(
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
        Swal.fire('Your Request is Submited', '', 'success');
   
          this.blockcall.customer='';
          this.blockcall.custname='';
          this.blockcall.requestedby='';
          this.blockcall.reqbyname='';
          this.blockcall.head='';
          this.blockcall.blockreason='';
        //  this.blockcall.blockreason='';

         // this.route.navigate(['/managecall']);
          window.scrollTo(0, 0);

    },
    error => {
      // Error Message
      Swal.fire(
        error.statusText,
        error._body,
        'error'
      );
      console.log('Error in data load submitcallData().');
      // Doyour stuff here
    }
  );
  return 0;
}


public check()
{
  console.log('first*****************'+this.rm);
  if (this.rm===undefined)
  {
  console.log('rm Blank*****************'+this.rm);

    this.getdatabydates()
  }
  else{
  console.log('rm NOT Blank*****************'+this.rm);


    this.getemptarsaledata();
  }
}


public  getdatabydates()
{

  if(this.userRole==='MARKETING')
  {
    const urlstring = 'todate='+this.todate+'&fromdate='+this.fromdate;

    const url = this.restService.crmRestURL('databydates', urlstring);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.callList = response;
      // this.getcalldatabyemp();
      },
      error => {
        console.log('Error in data load. in getdatabydates()');
      }
    );
  }
  else
  {
    //8834&todate=2019-07-11&fromdate=2019-07-27
    const urlstring = 'todate='+this.todate+'&fromdate='+this.fromdate;

    const url = this.restService.crmRestURL('databydates', urlstring);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.callList = response;
     //  this.getcalldatabyemp();

      },
      error => {
        console.log('Error in data load getdatabydates()');
      }
    );

  }
 
 
}


public  getemptarsaledata()
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
        this.callList = response;
     
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

    const url = this.restService.crmRestURL('empcalldata', this.rm + urlstring);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.callList = response;
     

      },
      error => {
        console.log('Error in data load getemptarsaledata()');
      }
    );

  }
 
 
}

}
