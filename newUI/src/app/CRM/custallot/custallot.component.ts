import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
declare var Swal: any;


@Component({
  selector: 'app-custallot',
  templateUrl: './custallot.component.html',
  styleUrls: ['./custallot.component.css']
})


export class CustallotComponent implements OnInit {
  public title;
  public subtitle;
  public flag = false;
  public empId;
  public id;
  public employees = [];
  public ratelabelList;
  public ratelabel1;
  public maxquoteperday1;
  public atten; 

  public unassigneddata;
  
  public relationshipmgr1;
  public relationshipmgrname1;

  public RatelabelFlag = false;
  public MaxQuoteFlag = false;
  public RMflag= false;
  public allemployees = [];
  public empmails = [];
  

  public  rmList;

  public lbalance = {
    ltype: '',
    empid: '',
    balance: '',
    calendaryear: '2019',
    from: '',
    to: '',
  };


    // for datatable
    public filterQuery = '';
    public rowsOnPage = 1.7976931348623157E+308;
    public sortBy = 'todate';
    public sortOrder = 'asc';
    public data;

  constructor(public route: Router,
    public restService: RestService,
    public routprms: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.routprms.snapshot.params['id']);
   
   this.id=this.empId = this.routprms.snapshot.params['id'];
   
  if (this.route.url == '/addleavebal/' + encodeURIComponent(this.id)) {
  
   this.lbalance.empid = this.id;
      this.title = 'Add Leave Balance';
      this.subtitle = 'Fill new Leave Balance information and submit.';
      this.flag = true;
     
     // this.getRatelabelData();
  } else if (this.route.url === '/updateleavebal/' + encodeURIComponent(this.empId)) {
   
      this.title = 'update Leave Balance';
      this.subtitle = 'Fill new Leave Balance information and submit.';
      this.flag = true;
      // this.getlbalanceById();
  } else {
    
      // this.title = 'Bulk Add For Employees';
      // this.subtitle = 'Manage Bulk Add For Employees';
      this.flag = false;
      this.getCustList();
      this.getunassignCustList();
   //   this.atten = 'RatelabelFlag';
      this.getrelationshipmanager();
      
      
  //    this.getRatelabelData();
     // this.getLeaveList();
   // this.getLbalList();
    }
  }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
   /******************************get data ********************************************/
 


  // public getRatelabelData() {
   
  //   console.log('getting rate label data');
  //   const url = this.restService. rlabelRestURL('ratelabel','');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response:any) => {
  //       this.restService.getJSONFromURL(response);
        
  //       console.log(response);
  //       this.ratelabelList = response;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

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

  

  public getCustList() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('assignrms','');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.data = response;
      //  this.unassigneddata=response
        for (const entry of response) {
        
          this.allemployees.push(entry.id);
        }
        console.log('all empmloyee id');
        console.log(this.allemployees);
        // allemployees
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  
  public getunassignCustList() {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('unassignrms','');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        // this.datalist = response;
        // this.data=response;
        console.log(response);
        this.unassigneddata = response;
      //  this.unassigneddata=response
        for (const entry of response) {
        
          this.allemployees.push(entry.id);
        }
        console.log('all empmloyee id');
        console.log(this.allemployees);
        // allemployees
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }



    submitMultiple() {

//       console.log('submitData function');
//       console.log(this.lbalance);
// if(this.employees.length > 0){
//       const multiple = {
//         // leavetype: this.lbalance.ltype,
//         // numdays: this.lbalance.balance,
//         // startdate: this.lbalance.from,
//         // enddate: this.lbalance.to,
//         ratelabel: this.ratelabel1,
//         customers: this.employees,
//       };

//       console.log(multiple);

//       // {
//       //   "leavetype":"EARNED",
//       //   "numdays":1.5,
//       //   "startdate":"2019-02-01",
//       //   "enddate":"2019-02-28",
//       //   "employees":[83,75] // ids of selected employees.
//       // }




//       const url = this.restService.bulkRestURL('RatelabelAdd', '');
//       this.restService.postFormData(url, multiple).subscribe(
//         (response:any) => {
//           // Responce data.
//           this.getCustList();
//           this.employees=[];
//           console.log('Status on Post API');
//           console.log(response);
//           // Now do your stuff here
//           Swal.fire('', '', 'success');
//             window.scrollTo(0, 0);
//           this.route.navigate(['/allotnewclient']);
        
//         },
//         error => {
//           // Error Message
//           Swal.fire(
//             error.statusText,
//             error._body,
//             'error'
//           );
//           console.log('Error in data load.');
//           // Doyour stuff here
//         }
//       );
//       return 0;
//       }else{
//         Swal.fire(
//          'Select atleast one employee',
//           '',
//           'error'
//         );
//       }
    }


    submitMultiple1() {

//       console.log('submitData function');
//       console.log(this.lbalance);
// if(this.employees.length > 0){
//       const multiple = {
       
//         maxquotesperday: this.maxquoteperday1,
//         customers: this.employees,
//       };

//       console.log(multiple);

     



//       const url = this.restService.bulkRestURL('MaxQuoteAdd', '');
//       this.restService.postFormData(url, multiple).subscribe(
//         (response:any) => {
//           // Responce data.
//           this.getCustList();
//           this.employees=[];
//           console.log('Status on Post API');
//           console.log(response);
//           // Now do your stuff here
//           Swal.fire('', '', 'success');
//             window.scrollTo(0, 0);
//           this.route.navigate(['/allotnewclient']);

          
        
//         },
//         error => {
//           // Error Message
//           Swal.fire(
//             error.statusText,
//             error._body,
//             'error'
//           );
//           console.log('Error in data load.');
//           // Doyour stuff here
//         }
//       );
//       return 0;
//       }else{
//         Swal.fire(
//          'Select atleast one employee',
//           '',
//           'error'
//         );
//       }
    }

    submitMultiple2() {

      console.log('submitData function');
      console.log(this.lbalance);
if(this.employees.length > 0){
      const multiple = {
       
        relationshipmgr:this.relationshipmgr1,
        relationshipmgrname:this.relationshipmgrname1,
        rmstatus:"ASSIGNED",
        customers: this.employees,
      };

      console.log(multiple);

     



      const url = this.restService.bulkRestURL('RMAdd', '');
      this.restService.postFormData(url, multiple).subscribe(
        (response:any) => {
          // Responce data.
          this.getCustList();
          this.employees=[];
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          Swal.fire('RelationShip Manager Updated', '', 'success');
            window.scrollTo(0, 0);
          this.route.navigate(['/allotnewclient']);
          this.relationshipmgr1='';
      //    this.getCustList();
          this.getunassignCustList();
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
      }else{
        Swal.fire(
         'Select atleast one employee',
          '',
          'error'
        );
      }
    }


    public onChangeRM(obj) {
      const stateId = obj.srcElement.value;
      // console.log(obj);
      // Call city data method
      console.log('primhandre...');
      console.log(obj.target.value);
      console.log(obj.target.options[obj.target.selectedIndex].text);
      this.relationshipmgrname1 = obj.target.options[obj.target.selectedIndex].text;
    };

//   public deleteNewsList(id: any) {


// if (this.employees.length>0){
// for (const entry of this.employees) {
//   if(entry.id===id){
//     delete entry[id];
//     console.log(this.employees);
//   }
//   else{
//     this.employees.push(id);
//     console.log(this.employees);
//   }
// }
// }
// else{
//   this.employees.push(id);
//   console.log(this.employees);
// }
 

//     console.log('id');
//     console.log(id);

    
//    console.log(this.employees);
//   }


  public deleteNewsList(id: any) {
    if (this.employees.indexOf(id) > -1) {
      // alert('pop');
      this.employees.splice(this.employees.indexOf(id), 1);

    } else {
      this.employees.push(id);
      //  alert('push');
    }
    //   alert(id);
    console.log(this.employees);
    //this.employees=[]
  }
    
}

