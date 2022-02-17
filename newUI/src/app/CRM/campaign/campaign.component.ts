import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  public title = '';
  public subtitle = '';
  // public alertify = require('alertify.js');
  public flag = false;

  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;
  public gsmlist;

  public pimage;
  public docServer = this.restService.docServer;


  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  

  public papertypeList;
  public qtypeslist;
  public psideslist;
  public psidecols; 

  public id;
  public isUpdate = false;

   public productDataList;
   public papergsmList;
   public millList;
   public psizelist;
   public ppactlist;
   public plamnslist;

    public prodSize = [];
     public papertDatalist;

  //  public campaign= {

  // product: '',
  // qtype: '',
  // plength: '',
  // pbreadth: '',
  // psize: '',
  // papertype:'',
  // papergsm:'',
  // papermill:'',
  // printside:'',
  // printcolor:'',
  // quantity: '',
  // namune: '',
  // ppactivity: '',
  // islamn: '',
  // lamn: '',
  // validtill: '',
  // uptodate: '',
  // shoottime: '',
  // offeramt: '',
  // frequency:''



  //  };

   public campaign= {

    firm:sessionStorage.getItem('firm'),
    header:'',
    totalprods:'',
    totalprodqty: 0,
    validtill:'',
    uptodate:'',
    shoottime:'',
    discount:0,
    frequency:'',
    totalamt:0,
    totalofferamt:0,
    camp_prods:[]         
   
   
   
   
      };

      public  camp_prods=
        {
         product:'',
         pname:'',
         qty:0,
         rateunit:'',
         rateperunit:0,
         offerrateperunit:0,
         regularamt:0,
         offeramt:0

        };
         

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

  ngOnInit() {
     this.id = this.routprms.snapshot.params['id'];
    this.flag = false;
    if (this.route.url === '/updatecampaign/' + encodeURIComponent(this.id)) {
      this.title = 'Update Campaign';
      this.subtitle = 'Update Campaign details';
      this.flag = true;
      this.isUpdate = true;
      this.getDataById();
    } else if (this.route.url === '/addcampaign') {
      this.title = 'Add Campaign';
      this.subtitle = 'Fill new Campaign information and submit.';
      this.flag = true;
      this.getProductData();
     // this.getpapertypeData();
    }  else {
      this.title = 'Manage Campaign';
      this.subtitle = 'Manage Campaign information including view, add, update and delete';
      this.flag = false;
      this.getData();
  }


}

cancel() {
  // goBack code fro cancel button
  window.history.back();
}


public submitData() {

 // this.campaign.uptodate = this.campaign.uptodate+':00';
 let datee= new Date();
 this.campaign.uptodate = this.campaign.uptodate+'T'+datee.getHours()+':'+datee.getMinutes()+':00';
  this.campaign.shoottime = this.campaign.shoottime+':00';

console.log('submitData function');
console.log(this.campaign);
// let finalData = this.multiJson(this.appointment);
const url = this.restService.campaignRestURL('add', '');
this.restService.postFormData(url, this.campaign).subscribe(
  (response:any) => {
    // Responce data.
    console.log('Status on Post API');
    console.log(response);
    // Now do your stuff here
      Swal.fire('Added', '', 'success');
      this.route.navigate(['/managecampaign']);
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

 public getProductData() {
    // Get Information from JSON REST api
    console.log('getting rate label data');
    const url = this.restService. productRestURL('','');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
         this.productDataList = response;
        //  this.papertypeList =response.ptypes;
        //  this.qtypeslist=response.qtypes;
        //  this.psideslist=response.psides;
        //  this.psidecols=response.psidecols;

        console.log('ProductDatalist ***************');
        console.log(response);
       
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


   public getproduct() {
    console.log('in');

    for (let data of this.productDataList) {
      if (data.name === this.camp_prods.pname) {
        console.log(data);

        // this.prodSize = data.sizes;
        // this.papertDatalist = data.ptypes;  // getting paper type according to product name


        // this.papertypeList =data.ptypes;
        // this.qtypeslist=data.qtypes;
        // this.psideslist=data.psides;
        // this.psidecols=data.psidecols;
        // this.psizelist=data.sizes;
        // this.ppactlist=data.ppact;
        // this.plamnslist=data.plamns

       // this.campaign.islamn = data.lamn;
        this.pimage = this.docServer + '/' + data.photos[0].docpath;

      this.camp_prods.product=data.id;
      this.camp_prods.rateunit=data.rateunit;
      this.camp_prods.rateperunit=data.rateperunit;
   //   this.camp_prods.rateunit=data.rateperunit;



      }
   this.camp_prods.offerrateperunit=0;
    this.camp_prods.regularamt=0;
    this.camp_prods.offeramt=0;
    this.camp_prods.qty=0;
      }
    
    }



//  public getlenbreath()
//     {
//       let dataarray;
//       dataarray = this.campaign.psize.split('X');
//       console.log(dataarray[0]);
//       console.log(dataarray[1]);
//       this.campaign.plength = dataarray[0];
//       this.campaign.pbreadth = dataarray[1];
//     }

// public getgsmbypapertype()
// {
//   console.log('getting rate label data');
//   const url = this.restService. papersizeRestURL('base','type='+this.campaign.papertype);
//   this.restService.getJSONFromURL(url).subscribe(
//     (response:any) => {
//       this.restService.getJSONFromURL(response);
//        this.papergsmList = response.gsms;

//       console.log('getgsmbypapertype ***************');
//       console.log(response);
//       this.getmillbypapertype();
     
//     },
//     error => {
//       console.log('Error in data load.');
//     }
//   );
// }

// public getmillbypapertype()
// {
//   const url = this.restService. millRestURL('pptype',this.campaign.papertype);
//   this.restService.getJSONFromURL(url).subscribe(
//     (response:any) => {
//       this.restService.getJSONFromURL(response);
//        this.millList = response;

//       console.log('getmillbypapertype ***************');
//       console.log(response);
     
//     },
//     error => {
//       console.log('Error in data load.');
//     }
//   );
// }






// delete Role
delete(id: any) {
Swal.fire({
  title: 'Are you sure?',
  // text: 'You will not be able to recover this data!',
  text: 'It will delete from all places wherever it is in used!',
  type: 'Warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
    // delete code

    const url = this.restService.campaignRestURL('delete', id);
    console.log('Delete using this id:' + id);
    const json = '{\"id\":\"' + id + '\"}';
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
        this.getData();
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

public getData() {
// Get Information from JSON REST api
const url = this.restService.campaignRestURL('', '');
this.restService.getJSONFromURL(url).subscribe(
  (response:any) => {
    this.restService.getJSONFromURL(response);
    // this.datalist = response;
    // this.data=response;
    console.log(response);
    this.data = response;
  },
  error => {
    console.log('Error in data load.');
  }
);
}

public getDataById() {
// Get Information from JSON REST api
const url = this.restService.campaignRestURL('details', this.id);
this.restService.getJSONFromURL(url).subscribe(
  (response:any) => {
    this.restService.getJSONFromURL(response);
    // this.datalist = response;
    // this.data=response;
   
  

    console.log(response);
    this.campaign=response;
    this.campaign.uptodate = this.unixTimeConverter(response.uptodate);
    this.campaign.shoottime = this.unixTimeConverter(response.shoottime);
    // this.campaign.islamn=response.islamn;
    // this.campaign.offeramt = response.offeramt;
    this.campaign.frequency=response.frequency;
  //  this.searchProduct();




  },
  error => {
    console.log('Error in data load.');
  }
);
}

public updateData() {

  let datee= new Date();
  this.campaign.uptodate = this.campaign.uptodate+'T'+datee.getHours()+':'+datee.getMinutes()+':00';
  this.campaign.shoottime = this.campaign.shoottime+':00';

console.log('submitData function');
console.log(this.campaign);

// let finalData = this.multiJson(this.appointment);
const url = this.restService.campaignRestURL('edit', '');
this.restService.postFormData(url, this.campaign).subscribe(
  (response:any) => {
    // Responce data.
    console.log('Status on Post API');
    console.log(response);
    // Now do your stuff here
    Swal.fire('Updated', '', 'success');
      this.route.navigate(['/managecampaign']);
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



// public getpapertypeData() {
//   // Get Information from JSON REST api
//   const url = this.restService.ptypeRestURL('', '');
//   this.restService.getJSONFromURL(url).subscribe(
//     (response:any) => {
//       this.restService.getJSONFromURL(response);
//       // this.datalist = response;
//       // this.data=response;
//       console.log(response);
//      // this.papertypeList = response;
//     },
//     error => {
//       console.log('Error in data load.');
//     }
//   );
// }

// public getgsmsizedata()
// {
//     // Get Information from JSON REST api
//     const url = this.restService.papersizeRestURL('base', 'type='+this.campaign.papertype);
//     this.restService.getJSONFromURL(url).subscribe(
//       (response:any) => {
//         this.restService.getJSONFromURL(response);
//         // this.datalist = response;
//         // this.data=response;
//         console.log(response);
//         this.gsmlist = response;
//       },
//       error => {
//         console.log('Error in data load.');
//       }
//     );
//   }

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
      datetime = date.getFullYear() + '-' + mm + '-' + dd + 'T' + date.toTimeString().slice(0, 5);


    } catch (err) {
      console.log('Unable to parse date data in unixTimeConverter');
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;

  }

  
  // searchProduct() {
  //   // Get Information from JSON REST api
  //   const url = this.restService.productRestURL('searchproduct',  this.campaign.product);
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


//   public totaldays() {
//     var datee = new Date();
//     var d = new String();
//     let dd: string;
//     let mm: string;
//     let temp: string;
//     let temp1: string = '0';
//     // for month only
//     temp = (datee.getMonth() + 1).toString();
//     if (temp.length < 2) {
//       temp1 = '0';
//       temp1 = temp1 + temp;
//       // alert(temp);
//       mm = temp1;
//     } else { mm = (datee.getMonth() + 1).toString(); }
//     // for date only
//     temp = datee.getDate().toString();
//     if (temp.length < 2) {
//       temp1 = '0';
//       temp1 = temp1 + temp;
//       dd = temp1+Number(this.campaign.validtill);
//     } else { dd = datee.getDate().toString(); }
    

//     dd = datee.getDate().toString(); 
//     console.log(dd);

//   let  ddd = datee.getDate()+Number(this.campaign.validtill); 
//     console.log(ddd);


// //    let validdate=Number(this.campaign.shoottime)+Number(this.campaign.validtill);

//     d = datee.getFullYear() + '-' + mm + '-' + ddd+'T'+datee.getHours()+':'+datee.getMinutes();
//     this.campaign.uptodate=String(d);

//     this.validTill()
//     return d.toString();
  

//   }

  public validTill() {
    // Get Information from JSON REST api
    const url = this.restService.roleRestURL('validtill', this.campaign.validtill+'&fromdate='+this.campaign.shoottime);
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log('future date after '+this.campaign.validtill+'************************************************************');
        console.log(response);
      // this.futuredate = String(response.futuredate);
      // this.futuredate = this.futuredate.replace(' ', 'T');
      this.campaign.uptodate = response.futuredate.toLocaleString().substring(0, 10);
     // console.log(futuredate);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  pushcamp_product()
  {
    let flagger = true;

    for (const entry of this.campaign.camp_prods) {

      if (this.camp_prods.pname == entry.pname) {

        Swal.fire('Cannot Add Duplicate Entry','','error');
        this.clearvalues();
  
        flagger = false;
      }
    }

    if (flagger )  {
    this.campaign.camp_prods.push(JSON.parse(JSON.stringify(this.camp_prods)));
   this.campaign.totalprods = String(this.campaign.camp_prods.length);
   this.campaign.totalprodqty=Number(this.campaign.totalprodqty)+Number(this.camp_prods.qty);
   this.campaign.totalamt=Number(this.campaign.totalamt)+Number(this.camp_prods.regularamt);
   this.campaign.totalofferamt=Number(this.campaign.totalofferamt)+Number(this.camp_prods.offeramt);
   this.campaign.discount= this.campaign.totalamt-this.campaign.totalofferamt;





   this.clearvalues();
    }
  }
  onDeletestockval(i,data) {
 
    this.campaign.camp_prods.splice(i, 1); 
   
    Swal.fire('Deleted!','','success' );
   this.campaign.totalprods = String(this.campaign.camp_prods.length);
   this.campaign.totalprodqty=Number(this.campaign.totalprodqty)-Number(data.qty);
   this.campaign.totalamt=Number(this.campaign.totalamt)-Number(data.regularamt);
   this.campaign.totalofferamt=Number(this.campaign.totalofferamt)-Number(data.offeramt);
   this.campaign.discount= this.campaign.totalamt-this.campaign.totalofferamt;

//    let prodqty=0;
// for(let data of this.campaign.camp_prods)
// {
//   console.log(data.qty);
//   prodqty=data.qty;
// }
//     this.campaign.totalprodqty=prodqty;
  }

  clearvalues()
  {
    this.camp_prods.product='';
    this.camp_prods.pname='';
    this.camp_prods.qty=0;
    this.camp_prods.rateunit='';
    this.camp_prods.rateperunit=0;
    this.camp_prods.offerrateperunit=0;
    this.camp_prods.regularamt=0;
    this.camp_prods.offeramt=0;



  }

  total()
  {
    this.camp_prods.regularamt=this.camp_prods.rateperunit*this.camp_prods.qty;
    this.camp_prods.offeramt=this.camp_prods.offerrateperunit*this.camp_prods.qty;

  }
}


