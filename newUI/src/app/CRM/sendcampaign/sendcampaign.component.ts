import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { FormControl, Validators } from '@angular/forms';

declare var Swal: any;

@Component({
  selector: 'app-sendcampaign',
  templateUrl: './sendcampaign.component.html',
  styleUrls: ['./sendcampaign.component.css']
})

export class SendcampaignComponent implements OnInit {

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

public lastcall;

public relationshipmgrname;

public isUpdate= false;


public allemployees = [];
public empmails = [];
public employees = [];

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

 public checkbox = false ;
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


  public campaign= {

    product: '',
    qtype: '',
    plength: '',
    pbreadth: '',
    psize: '',
    papertype:'',
    papergsm:'',
    papermill:'',
    printside:'',
    printcolor:'',
    quantity: '',
    namune: '',
    ppactivity: '',
    islamn: '',
    lamn: '',
    validtill: '',
    uptodate: '',
    shoottime: '',
    offeramt: '',
    frequency:''



     };


public pimage;
public rmid;
public campaignid;
public routeprodname;





public email = {
  bcc: '',
  cc: 'amankarn26@gmail.com',
  templateId: 'campaign',

  contentData: {
    content: {
      message: 'Thank you for giving us  chance to serve you ',
      dt:(new Date()).toString().split(' ').splice(1,3).join(' '),
      quatationid: '',
      validtill: '',
      // "dt": "11/16/2018",
      // "quatationid": "12345678",
      // "validtill": "11/22/2018"

    },
    table: [],
    costtable: [],
    // [
    //                 {
    //                                 'a':'12',
    //                                 'b':'34'
    //                 },
    //                 {
    //                                 'a':'67',
    //                                 'b':'97'
    //                 }],
    subject: 'Hurrry UPPP !! Campaign Starts NOW !!!!!'
  }
};


public email_table = {
  No: '1',
  Product_Head: '',
  Detail: '',
  Qty: '',
  Amount: '',
};


  ngOnInit() {

this.routeprodname = this.routprms.snapshot.params['name'];
this.campaignid = this.routprms.snapshot.params['cid'];
this.rmid = this.routprms.snapshot.params['rmid'];




    if(this.route.url==='/addcall')
    {

      this.title = 'Add Call';
      this.subtitle = 'Fill new Call information and submit.';
     // this.flag = true;
    //  this.getRoleList();
    this.getempbymarketing();
    if(this.userRole==='MARKETING'){
     // this.marketinglogin();
      this.getallcustomerbyrm();
    }

  }
  else if (this.route.url === '/updatecall/' + encodeURIComponent(this.id)) {
   // this.call['id'] =  this.routprms.snapshot.params['id'];
    this.title = 'Update Call ';
    this.subtitle = 'Edit Call details';
    this.isUpdate = true;

   // this.getCallListbyid();

  }
  else if(this.route.url==='/managecall')
  {

    this.title = 'Manage Call';
    this.subtitle = 'Manage Call information including view, add, update and delete';
    //this.getCallList();
   // this.getempbymarketing();

  }

  else
  this.getDataById();

  {

    if(this.userRole==='MARKETING')
    {
      this.getallcustomerbyrm();
     //  this.getcusListbyrm();
     //  this.getallcustomerbyrm();
       this.rm=sessionStorage.getItem('name');

    }
    else{
    this.rm = this.rmid;


    //  this.getCustList();
    this.getallcustomerbyrm();
      this.getempbymarketing();
     // this.rm=this.rmid;

    // this.rm=undefined;

    }
  }



  }


  // public marketinglogin()
  // {
  //   this.call.calledby= sessionStorage.getItem('id');
  //   this.call.calledbyname= sessionStorage.getItem('name');
  // }

  // public getCustList() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.customerRestURL('','');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log(response);
  //       this.custList = response;

  //       // allemployees
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }





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


  public getallcustomerbyrm()     {
   //   const url = this.restService.customerRestURL('cbyrm', sessionStorage.getItem('id'));


  ///var url = this.restService.customerRestURL('cbyrm', this.rmid);

if(this.userRole==='MARKETING')
{
  var url = this.restService.customerRestURL('cbyrm', sessionStorage.getItem('id'));

}
else
{
  var url = this.restService.customerRestURL('cbyrm', this.rm);

}



      this.restService.getJSONFromURL(url).subscribe(
        (response:any) => {
          this.restService.getJSONFromURL(response);
          // this.datalist = response;
           this.data=response;
          console.log(response);
         // this.custListbyrm = response;
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }



makecall(){

  this.getempbymarketing();
  if(this.userRole==='MARKETING'){
  //  this.marketinglogin();
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


cancel() {
  // goBack code fro cancel button
  window.history.back();
}
  /****************************** submit data************************************ */



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


  public unixTimeConverterwithtime(ts) {
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

     datetime = date.getFullYear() + "-" + mm + "-" + dd + ' '+date.toTimeString().slice(0, 5);
   //  datetime = date.getFullYear() + '-' + mm + '-' + dd;

 //  datetime = dd + '-'+mm+'-'+date.getFullYear();
    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

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








public getCustList() {
  // Get Information from JSON REST api
  const url = this.restService.customerRestURL('','');
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
      // this.data=response;
      console.log(response);
      this.data = response;
      for (const entry of response) {
        this.allemployees.push(entry.id);
     //   this.empmails.push(entry.login.email);
      }
      console.log('all empmloyee id');
      console.log(this.allemployees);

      // allemployees+

      console.log('all empmloyee id');
      console.log(this.empmails);
      // allemployees
    },
    error => {
      console.log('Error in data load.');
    }
  );
}


public deleteNewsList(id: any , email : any) {
  if (this.employees.indexOf(id) > -1) {
    // alert('pop');
    this.employees.splice(this.employees.indexOf(id), 1);
    this.empmails.splice(this.employees.indexOf(email), 1);


  } else {
    this.employees.push(id);
    this.empmails.push(email);
    //  alert('push');
  }
  //   alert(id);
  console.log(this.employees);
  console.log(this.empmails);

}




public getDataById() {
  // Get Information from JSON REST api
  const url = this.restService.campaignRestURL('details', this.campaignid);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
      // this.data=response;



      console.log(response);
      this.campaign=response;
      this.campaign.product=response.product;
      this.campaign.uptodate = response.uptodate;
      this.campaign.shoottime = response.shoottime;
      this.campaign.islamn=response.islamn;
      this.campaign.offeramt = response.offeramt;
      this.campaign.frequency=response.frequency;
     // this.searchProduct();

      // this.passparam(response.uptodate,response.shoottime);



    },
    error => {
      console.log('Error in data load.');
    }
  );
  }



  // searchProduct() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.productRestURL('searchproduct',  this.routeprodname);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.restService.getJSONFromURL(response);
  //       // this.datalist = response;
  //       // this.data=response;
  //       console.log(response);
  //       this.pimage = this.docServer + '/' + response[0].photo.docpath;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }



  public sendmail() {

    let custEmail ='';
    for(let data of this.empmails)
    {


        if(custEmail ===''){
          custEmail = data;
        }else{
          custEmail = custEmail +';'+data;
        }

    }

    this.email.bcc = custEmail;
    console.log(this.email.bcc);




   this.email_table.Product_Head = this.campaign.product;
   this.email_table.Detail = 'Size :'+this.campaign.psize + '<br>'  +
                             'Paper :'+this.campaign.papergsm + 'GSM '+ this.campaign.papertype + ''+this.campaign.papermill + '<br>'  +
                             'Colour :'+this.campaign.printcolor + this.campaign.printside + 'Printed' + ' <br>'  +
                             'Qty :'+this.campaign.quantity + '<br>'  +
                             'Offer Amount :'+this.campaign.offeramt + '/-' + '<br>'  +
                             'Hurry up vaild till:'+this.unixTimeConverterwithtime(this.campaign.uptodate) + '<br>'



   this.email_table.Qty=this.campaign.quantity;
   this.email_table.Amount = '<p style=\'text-align:center\'>' + this.campaign.offeramt + '/- </p>';

// this.email.contentData.content.dt = (new Date()).toString().split(' ').splice(1,3).join(' ');

   this.email.contentData.content.message = 'Dear Customer,'+ '<br>' +'Following Campaign is Generated for the Product <b style=" color: #000000; background: #00d0c652; border-radius: 3px; ">'
    + this.campaign.product +'</b> and is Vaild till <b style="color: #000000;background: #ff000070;border-radius: 3px;">' + this.unixTimeConverterwithtime(this.campaign.uptodate) +'</b> <br> Hurry Up !!!! Campaign Starts From <b style="color: #000000;background: #1cff0059;border-radius: 3px;">' + this.unixTimeConverterwithtime(this.campaign.shoottime)+'</b>';


    console.log('***********************dateeeeeeeeeeeeeeeeeeeettttt' + this.unixTimeConverterwithtime(this.campaign.shoottime));




    this.email.contentData.content.validtill = this.unixTimeConverterwithtime(this.campaign.uptodate);


    this.email.contentData.content.quatationid = this.campaignid;


    this.email.contentData.table.push(this.email_table);







    console.log(this.email);



    // "Are you sure you want to send this email without a subject?"
    Swal.fire({
      title: 'Are you sure you want to send email?',
      //   text: this.email_table,  updated on 10/23/2018
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Sent it!',
      cancelButtonText: 'No, Cancel it'
    }).then((result) => {
      if (result.value) {
        // email code
        console.log('submiti function');
        console.log(this.email);
        const url = this.restService.mailRestURL('send', '');
        this.restService.postFormData(url, this.email).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Campaign Sent Successfully to the Customers',
              '',
              'success'
            );
            // Swal.fire('SMS and email sent to your registered Mobile no. and email id', email.body, 'success');
            // this.route.navigate(['/authentication']);
            return true;
          },
          error => {
            // Error Message
            console.log('Failed to send email message to customer');
            return false;
            // Doyour stuff here
          }
        );
        return 0;
        // email code end
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Message Cancelled :)',
          'error'
        );
      }
    });
  }



  // checkall(id: any , email : any)
  // {
  //   this.checkbox = true;
  //   this.deleteNewsList(id,email)
  // }
}
