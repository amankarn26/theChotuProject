
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../services/rest.service';
import { DatePipe } from '@angular/common';
import { error } from 'util';
declare var Swal: any;
@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
  providers: [DatePipe]
})
export class Level2Component implements OnInit {

public title = '';
  public subtitle = '';
//  public alertify = require('alertify.js');
  public flag = false;
  public empId;


  public increasebal=0;
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'role';
  public sortOrder = 'asc';
  public data;
  public detailFlag = false;

  public id;
  public isUpdate = false;
  public empList;

  public limitindc=0;
   
  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');


// ******for Travel Vendor*********
  
  public preftraarr= [];
  public preftraarr1=[];
  public priority;
  public vendor;
  public vendorDatalist;
  public categorylist;


  public rmList;

  public orgbalnce;
  public orgcreditlimit
  public orgusedlimit
  public orgbalanceimit

  public ratelabelList;

 public url;
  public file;
  public fileName;
  public docServer = this.restService.docServer;

public level2id;


   public leveltwo = {
    
      customer:'', //customer id ,not null
      ratelabel:'',  //--not null
      relationshipmgr:'', //--employee id
      relationshipmgrname:'',
      preftravels: [],
      creditlimit: 0,
      limitused: 0,
      balancelimit: 0,
      acctbalance:0
      
   
  };
  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute,
    public datePipe: DatePipe) { }


  ngOnInit() {
     this.id = this.routprms.snapshot.params['id'];
     this.leveltwo.customer = this.id;
  
    this.flag = false;
    if (this.route.url === '/updatelevel2detail/' + encodeURIComponent(this.id)) {
      this.title = 'Update Level 2 Details';
      this.subtitle = 'Edit Level 2 Details';
      this.flag = true;
      this.isUpdate = true;
      this.getDataById();
     this.getRatelabelData();
     this. getrelationshipmanager();
  //  this.getdatabyRetailerid();
       
       this.getVendorData();
      // this.getCategoryData();

    } else if (this.route.url === '/addlevel2detail/'+ encodeURIComponent(this.id)) {
      this.title = 'Add Level 2 Details';
      this.subtitle = 'Fill new Level 2 Details information and submit.';
      this.flag = true;
      this.getVendorData();
      this.getRatelabelData();
      this. getrelationshipmanager();
    //  this.getCategoryData();
     
    }
    else if (this.route.url === '/detaillevel2/' + encodeURIComponent(this.id)) {
      this.title = ' Level 2 Detail ';
      this.subtitle = ' Level 2 Detail';
      this.flag = true;
      this.detailFlag = true;
    //   this.getDataById();
    this.getDataById();
      //  this.getdatabyRetailerid();
       
      // this.getRoleList();
      // this.getGradeList();
      //   this.getAllDept();

    }   else {
      this.title = 'Manage Level 2 Details';
      this.subtitle = 'Manage Level 2 Details information including view, add, update and delete';
      this.flag = false;
      this.getData();
      }

}
cancel() {
  // goBack code fro cancel button
  window.history.back();
}

totalbalance()
{
  this.leveltwo.balancelimit=this.leveltwo.creditlimit-this.leveltwo.limitused
}

 public submitData() {


  //  if(this.leveltwo.workhrto !== '')
  //  {
  //    this.leveltwo.workhrto=  this.leveltwo.workhrto + ':00.000Z'

  //  }
  //   if(this.leveltwo.workhrfrom !== '')
  //  {
  //    this.leveltwo.workhrfrom=  this.leveltwo.workhrfrom + ':00.000Z'

  //  }
  // alert(this.leveltwo.workhrfrom);

  



 
this.leveltwo.preftravels =  this.preftraarr;

  console.log('submitData function');
  console.log(this.leveltwo);
  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.level2detailRestURL('add', '');
  
  

 
  this.restService.postFormData(url, this.leveltwo).subscribe(
    
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
       this.id = response.id; // getting employee id for photo add
        Swal.fire('Added', '', 'success');
          window.scrollTo(0, 0);
    
        this.route.navigate(['/managecustomer']);

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


public getrelationshipmanager() {


  this.rmList = [];
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
  

public getRatelabelData() {
  // Get Information from JSON REST api
  console.log('getting rate label data');
  const url = this.restService. rlabelRestURL('ratelabel','');
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
      // this.data=response;
      // console.log(
      //   'MIll data*************************************************'
      // );
      console.log(response);
      this.ratelabelList = response;
    },
    error => {
      console.log('Error in data load.');
    }
  );
}
  deletel2(id: any) {
   

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.level2detailRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response:any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )

          
            this.route.navigate(['/managecustomer']);
            window.scrollTo(0, 0);
    
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
            )
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

 
// ****************************** worktype***************************************
// ****************************** worktype***************************************






// ****************************** Machinaries***************************************
// ****************************** Machinaries***************************************







// ****************************** Preftravell Vendor*********************************





onAddPrefVendor() {
    if ((this.priority !== '' && this.priority !== undefined ) && (this.vendor !== ''&& this.priority !== undefined )) {
      this.preftraarr.push({ 'priority': this.priority, 'vendor': this.vendor });
      // this.dyElemObjData.push({ 'this.dyelem.name' : this.dyelem.value });
      // this.dynamo['this.dyelem.name']=this.dyelem.value;
      this.priority = '';
      this.vendor = '';
    

      console.log(this.preftraarr);


      // if ((this.pside !== '')) {
      // this.psidearr.push({ 'pside': this.pside});
      // console.log('pside arrrraayyy');
      //  console.log(this.psidearr);

      // }
    } else {
          // Swal.fire(             'Information not complited yet',             '',             'error'           );
          // Swal.fire(
          //   'Information not complited yet',
          //   '',
          //   'information'
          // );
          Swal.fire(
            'Information not complited yet',
            '',
            'error'
          );
    }
    //  this.pside = '';
  }


onDeletePrefVendor(i) {



  console.log('Deleting*********************');

  
  

  this.preftraarr.splice(i, 1);

  // this.alertify.alert('Item Deleted successfully.');
  Swal.fire(
    'Deleted!',
    '',
    'success'
  );
  // console.log(this.dyElemObjData);
}

onDeletePrefVendor1(id:any) {

 console.log('Deleting size by id ='+id);
  
  Swal.fire({
  title: 'Are you sure?',
  text: 'It will delete from all places wherever it is in used!',
  type: 'Warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
    // delete code







    const url = this.restService.level2detailRestURL('deletetravel', '');
    console.log('Delete using this id:' + id);
   // const json = '{\"id\":\"' + id + '\"}';
     const json = {
          container: this.level2id,
          ids: [id]
        };
    this.restService.postFormData(url, json).subscribe(
      (response:any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
        this.getDataById();
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
      }   );

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

  // this.alertify.alert('Item Deleted successfully.');
  // Swal.fire(
  //   'Deleted!',
  //   '',
  //   'success'
  // );
  // console.log(this.dyElemObjData);

}



 public getVendorData() {
    // Get Information from JSON REST api
    const url = this.restService.vendorRestURL('type','TRAVEL');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.vendorDatalist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  } 


  // public getCategoryData() {
   
  //   const url = this.restService.catRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.restService.getJSONFromURL(response);
       
  //       console.log(response);
  //       this.categorylist = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  // ********************** get data****************************************
  





// ******************************Contact Info*********************************












// ******************************Communication Level*********************************


// validateno1(){
//   Swal.fire('Invalid Number','',error);
//   this.phone ='';
//   }





// ************************************* Identity Set**************************************************************************
// ************************************* Identity Set********************************************************************




public onChangeRM(obj) {
  const stateId = obj.srcElement.value;
  // console.log(obj);
  // Call city data method
  console.log('primhandre...');
  console.log(obj.target.value);
  console.log(obj.target.options[obj.target.selectedIndex].text);
  this.leveltwo.relationshipmgrname = obj.target.options[obj.target.selectedIndex].text;
};







public getData() {
  // Get Information from JSON REST api
  const url = this.restService.level2detailRestURL('', '');
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
  // http://localhost:8090/SuppChainManager/rest/retailer/level2/rid/38444

  const url = this.restService.level2detailRestURL('details', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
      // this.data=response;
      
      console.log(response);
      this.level2id=response.id;
     // this.leveltwo.custid = response.custid;
      this.leveltwo.customer = response.customer;
      this.leveltwo.ratelabel = response.ratelabel;
      this.leveltwo.relationshipmgr = response.relationshipmgr;
      this.leveltwo.relationshipmgrname = response.relationshipmgrname;
     
     // this.leveltwo.materialpkg = response.materialpkg;

     this.leveltwo.creditlimit = response.creditlimit;
     this.leveltwo.balancelimit = response.balancelimit;
     this.leveltwo.limitused = response.limitused;
     this.leveltwo.acctbalance = response.acctbalance;
     this.orgbalnce = response.acctbalance;

     this.orgcreditlimit = response.creditlimit;
     this.orgusedlimit = response.limitused;
     this.orgbalanceimit = response.balancelimit;
     

     
      this.preftraarr1 = response.preftravels;
     
      this.leveltwo['id'] = response.id;

    },
    error => {
      console.log('Error in data load.');
    }
  );
}

public getdatabyRetailerid() {
  // Get Information from JSON REST api
  // http://localhost:8090/SuppChainManager/rest/retailer/level2/rid/38444
  
  const url = this.restService.level2detailRestURL('detailsbyretailer', this.id);
  this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      this.restService.getJSONFromURL(response);
      // this.datalist = response;
      // this.data=response;
      this.leveltwo.customer = response.customer;
      this.leveltwo.ratelabel = response.ratelabel;
      this.leveltwo.relationshipmgr = response.relationshipmgr;
      this.leveltwo.relationshipmgrname = response.relationshipmgrname;
      console.log(response);
     // this.leveltwo.custid = response.custid;
     
   //   this.leveltwo.dob =  this.transformDate(response.dob);
    //  alert( this.leveltwo.dob );
     
    
// alert(response.workhrfrom);
      // this.leveltwo.workhrfrom = response.workhrfrom;
      // this.leveltwo.workhrto = response.workhrto;
     // this.leveltwo.materialpkg = response.materialpkg;

      // this.worktyparr1 = response.workTypeSet;
      // this.machinearr1 = response.machineSet;
      this.preftraarr1 = response.preftravels;
      // this.contactArr1 = response.contacts;
      // this.commlevArr1 = response.commlevels;
      // this.identitySetArr1 = response.identitySet;
      this.leveltwo['id'] = response.id;

 
    },
    error => {
      console.log('Error in data load.');
    }
  );
}



public updateData() {

  



  


    // this. updateDataWorkType();
    // this.updateDataMachinery();
  this.updateTravelVendor();
  // this.updateContacts();
  // this.updateIdentityset();
  // this.updateCommlevel();




  const url = this.restService.level2detailRestURL('edit', '');
  this.restService.postFormData(url, this.leveltwo).subscribe(
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);
      // Now do your stuff here
      Swal.fire('Updated', '', 'success');
      //  this.route.navigate(['/managelevel2detail']);
      this.route.navigate(['/managecustomer']);
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









public updateTravelVendor() {
  
  //  this.leveltwo.preftravels= this.preftraarr;
 const preftravelId={
   id:this.level2id, 
   preftravels:this.preftraarr
 }



  console.log('submitData function');
  console.log(this.leveltwo);
          
  // let finalData = this.multiJson(this.appointment);
  const url = this.restService.level2detailRestURL('travelupdate', '');
  this.restService.postFormData(url,preftravelId).subscribe(
    (response:any) => {
      // Responce data.
      console.log('Status on Post API');
      console.log(response);


    },
    error => {
      // Error Message
 
      console.log('Error in data load.');
      // Doyour stuff here
    }
  );
  return 0;
}









  transformDate(date) {
  //  return this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  changeaccountbal()
  {
   // let orgbalnce= this.leveltwo.acctbalance;
    this.leveltwo.acctbalance=this.leveltwo.acctbalance+this.increasebal;
  
    if(this.increasebal===0||this.increasebal===null)
    {
      // console.log(this.orgbalnce);
      // console.log(this.increasebal);

      this.leveltwo.acctbalance=this.orgbalnce;
    }
  }


  increaselimit()
  {
    this.leveltwo.creditlimit=this.leveltwo.creditlimit+this.limitindc;
    this.leveltwo.balancelimit=this.leveltwo.balancelimit+this.limitindc;

    if(this.leveltwo.balancelimit<0)
    {

      Swal.fire('Balance Limit Cant be less than Zero','','error');
      this.leveltwo.creditlimit=this.orgcreditlimit;
      this.leveltwo.balancelimit=this.orgbalanceimit;
      this.limitindc=0;
    }

    if(this.limitindc===0||this.limitindc===null)
    {
      // console.log(this.orgbalnce);
      // console.log(this.increasebal);

      this.leveltwo.creditlimit=this.orgcreditlimit;
      this.leveltwo.balancelimit=this.orgbalanceimit;

    }


  }

  decreaselimit()
  {
    this.leveltwo.creditlimit=this.leveltwo.creditlimit-this.limitindc;
    this.leveltwo.balancelimit=this.leveltwo.balancelimit-this.limitindc;
    if(this.leveltwo.balancelimit<0)
    {
      console.log(this.leveltwo.balancelimit);
      Swal.fire('Balance Limit Cant be less than Zero','','error');
      this.leveltwo.creditlimit=this.orgcreditlimit;
      this.leveltwo.balancelimit=this.orgbalanceimit;
      this.limitindc=0;
    }

    if(this.limitindc===0||this.limitindc===null)
    {
      // console.log(this.orgbalnce);
      // console.log(this.increasebal);

      this.leveltwo.creditlimit=this.orgcreditlimit;
      this.leveltwo.limitused=this.orgusedlimit;
      this.leveltwo.balancelimit=this.orgbalanceimit;

    }

  }
}