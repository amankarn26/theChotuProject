import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../../services/rest.service';
// import {productstock} from '../.././Inventory-Management/productstock/productstock.component';
declare var Swal: any;
@Component({
  selector: 'app-bookvehicle',
  templateUrl: './bookvehicle.component.html',
  styleUrls: ['./bookvehicle.component.css']
})
export class BookvehicleComponent implements OnInit {
  private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  public userType;
  public statelist = [];
  public citylist = [];

  public cartcout=0;

  public id;
  private member = {
    role: '',
    description: ''
  };

  public firm = {
    name: '',
   // regno: '',
    phone: '',
    email: '',
    code: '',
    empcount: '',
    pannum: '',
    gstin:'',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };

  public productstock;
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public isUpdate = false;

public product;
  public address = {
    id: 0,
    line1: '',
    line2: '',
    city: '',
    pincode: '',
    states: 'Maharashtra',
    country: 'India'
  };
  /// booking vehicle add
  public pstock; // product stock

  public delList = [];

  public clientdata;
  public empList;

  public bookingnum;
  public bookingdate;
  public saletype;
public productdata;
 public custstate;
 public custcity;
 public customer;
 public custname;
 public financename;
 public pricetype;
 public expdelivery;
 public salesman;
 public salesmanname;

  // public exchange: {
  //   model: '',
  //   yrofmfg: '',
  //   regno: '',
  //   exchgvalue: '',
  // };
  public booingqty;

  public qcost: {
    exshowroom: '',
    insurance: '',
    yearsinsured: '',
    roadtax: '',
    accessorycost: '',
    extwarranty: '',
    rcbookcost: '',
    exchgvalue: '',
    gstamt: '',
    bookingamt: '',
    finalamt: '',
  };


  public isexchg='NO';
  public exchange = {
    model: '',
    yrofmfg: '',
    regno: '',
    exchgvalue: '',
  };

  public prodlList;
  // public bookvehicles = {
  //   product: '',
  //   pname: '',
  //   hsncode: '',
  //   prod_stock: '',
  //   vmodel: '',
  //   vtype: '',
  //   voption: '',
  //   vcolour: '',
  //   chassisnum: '',
  //   enginenum: '',
  //   gst: '',
  //   gstamt: '',
  //   amount: '',
  //   finalamt: '',
  //   qty: 1
  // };

  public bookvehicles = [];

 public hypothecation;
 // public exchange;
 public totalprods;
 public comments;
 public status;
 public paystatus;
 public total;

  public isinsured;
  public insurance:{
  customer: '',
  companyname: ''
  policynum: '',
  startdate: '',
  enddate: '',
};


public docServer = this.restService.docServer;
// public product;
public stock;
  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }
  ngOnInit() {
    /* this.alertify.confirm('Are you sure?').then(
        function onOk() {alert("Ok");},
        function onCancel() { alert("Cancel");}
    );*/
    if (this.routprms.snapshot.params['id']) {
      this.id = this.routprms.snapshot.params['id'];

    }


    this.countcart();

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);



    if (this.route.url === '/addfirm') {
      this.title = 'Add Firm';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;

    }else if (this.route.url === '/makebooking/' + this.id) {
      this.title = 'Book Vehicle';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;
      this.getprodbyid();
   //   this.getFirm();
      this.getEmpList();
      this.getlastLotno();

      //     sessionStorage.setItem('pstocklist', JSON.stringify(this.delList));

  }
     else if (this.route.url === '/editfirm/' + this.id) {
      this.title = 'Edit Firm';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getFirm();
    } else {
      this.title = 'Manage Firm';
      this.subtitle = 'Manage firm information including view, add, update and delete';
   //   this.userType = Cookie.getAll()['role'];
      this.getRoleList();
    }


  }
  private getRoleList() {
    // Get Information from JSON REST api
    var url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  updateData() {
    console.log('submiti function');
    var url = this.restService.firmRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, this.firm).subscribe(
      (response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managefirm']);
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

  private getFirm() {
    // Get Information from JSON REST api
    let url = this.restService.firmRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        console.log('Done fatching data!');

        //  this.firm.address.states = [this.getStateList()];
        this.datalist = response;
        this.getCityList(this.datalist.address.states);
        this.firm = response;
        console.log(response);
        // this.firm.address.states = this.datalist.address.states;
        // this.firm.address.states = this.datalist.address.states;

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getStateList() {
    // Get Information from JSON REST api
    var url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private onChangeState(obj) {
    let stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  private getCityList(stateId) {
    this.citylist = [];
    // Get Information from JSON REST api
    var url = this.restService.cityRestURL('', stateId);
    console.log(stateId);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  /*
  multiJson(data){


      let objMember = new Object();
      let objAddress =new Object();
      objCourt["name"]=this.court.name;

      objCourt["judge"]=this.court.judge;
      objCourt["contact"]=this.court.contact;
      objCourt["location"]=this.court.city;
      objCourt["url"]=this.court.url;

      objAddress["line1"]=this.court.line1;
      objAddress["line2"]=this.court.line2;
      objAddress["pincode"]=this.court.pincode;
      objAddress["states"]=this.court.states;
      objAddress["city"]=this.court.city;
      objAddress["country"]=this.court.country;

      objCourt["address"]=objAddress;

      console.log("Builded Object");
      console.log(objCourt);
      return objCourt;

    }*/


  multiJson(data){


    let bookorder = new Object();
    // let objAddress =new Object();
    bookorder['firm'] = sessionStorage.getItem('firm');
    bookorder['bookingnum'] = this.bookingnum;
    bookorder['bookingdate'] = this.bookingdate;
    bookorder['saletype'] = this.saletype;
    bookorder['customer'] = this.customer;
    bookorder['custname'] = this.custname;
    bookorder['financename'] = this.financename;
    bookorder['pricetype'] = this.pricetype;
    bookorder['expdelivery'] = this.expdelivery;
    bookorder['salesman'] = this.salesman;
    bookorder['salesmanname'] = this.salesmanname;
    bookorder['hypothecation'] = this.hypothecation;
  //  bookorder['hypothecation'] = this.hypothecation;
      // objCourt["name"]=this.court.name;

      // objCourt["judge"]=this.court.judge;
      // objCourt["contact"]=this.court.contact;
      // objCourt["location"]=this.court.city;
      // objCourt["url"]=this.court.url;

      // objAddress["line1"]=this.court.line1;
      // objAddress["line2"]=this.court.line2;
      // objAddress["pincode"]=this.court.pincode;
      // objAddress["states"]=this.court.states;
      // objAddress["city"]=this.court.city;
      // objAddress["country"]=this.court.country;

      // objCourt["address"]=objAddress;

      // console.log("Builded Object");
      // console.log(objCourt);
      bookorder['comments'] = this.comments;
      bookorder['status'] = 'BOOKED';
      bookorder['paystatus'] = this.pricetype;
      bookorder['bookvehicles'] =    this.bookvehicles;

            return bookorder;

    }

  submitData() {
    const finalData = this.multiJson('pankaj');
    console.log('submiti function');
    console.log(finalData);
    // var url = this.restService.firmRestURL('add', '');
    // console.log(url);
    // this.restService.postFormData(url, this.firm).subscribe(
    //   (response :any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managefirm']);
    //   },
    //   error => {
    //     // Error Message
    //     Swal.fire(
    //       error.statusText,
    //       error._body,
    //       'error'
    //     );
    //     console.log('Error in data load.');
    //     // Doyour stuff here
    //   }
    // );
    // return 0;
  }

  deleteRole(id: any) {
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
        const url = this.restService.firmRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response :any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getRoleList();
            // Now do your stuff here
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



  private getState() {
    // Get Information from JSON REST api
    const url = this.restService.PincodeRestURL('', this.firm.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.firm.address.states = response.state_name;
        this.firm.address.city = response.city_name;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getlastLotno() {
    // Get Information from JSON REST api
   // GET Last Lot No purcahse order
  //   http://localhost:8090/IMBAManager/rest/booking/newbooking/no?firm=7
    var url = this.restService.lastlotRestURL('booking', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        this.bookingnum = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getClienList() {
    // Get Information from JSON REST api
    const url = this.restService.RetailerRestURL('city', this.custcity);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.clientdata = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getEmpList() {
    // Get Information from JSON REST api
    const url = this.restService.empRestURL('','');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.empList = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private onChangeHandler1(obj) {
    const stateId = obj.srcElement.value;
    // console.log(obj);
    // Call city data method
    console.log('primhandre...');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.salesmanname = obj.target.options[obj.target.selectedIndex].text;
  }


  private onChangeCustomer(obj) {
    const stateId = obj.srcElement.value;
     console.log(obj);
    console.log('onChangeCustomer');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.custname = obj.target.options[obj.target.selectedIndex].text;
  }



  private getProdstock() {
    // Get Information from JSON REST api
    let url = this.restService.productstockRestURL('byprodid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        console.log('Done fatching data!');
        this.productstock = response;

        this.pstock = JSON.parse(sessionStorage.getItem('pstocklist'));
        console.log(this.pstock);


        for (let x of this.pstock) {
          console.log('outer '+x);

          for (let y of this.productstock) {

              if(y.id===x){
                      console.log(y);

                const gstamt = (Number(y.purchaseprice) * 18) / 100;
                console.log(gstamt);
                const finalamt = Number(y.purchaseprice) + Number(gstamt);
                console.log(finalamt);

                console.log(this.productdata);


                const temp = {
                  product: this.id,
                  pname: this.productdata.name,
                  hsncode: this.productdata.hsncode,
                  prod_stock: x,
                  vmodel: this.productdata.vmodel,
                  vtype: this.productdata.vtype,
                  voption: this.productdata.voption,
                  vcolour: this.productdata.vcolour,
                  chassisnum: y.chassisnum,
                  enginenum: y.enginenum,
                  gst: this.productdata.gst,
                  gstamt: gstamt,
                  amount: y.purchaseprice,
                  finalamt: finalamt,
                  qty: 1
                };

                const cloneProduct = JSON.parse(JSON.stringify(temp));
                console.log('cloneProduct');
                console.log(cloneProduct);

                this.bookvehicles.push(cloneProduct);


              }

          }

        }

        console.log(this.bookvehicles);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  public getprodbyid() {

    let url = this.restService.productRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        console.log('Done fatching data!');
       this.productdata = response;
       this.getProdstock();
      },
      error => {
        console.log('Error in data load.');
      }
    );


  }

  countcart() {
    if (sessionStorage.getItem('mycartcount')) {
      this.cartcout = Number(sessionStorage.getItem('mycartcount'));
    } else {
      this.cartcout = 0;
    }
}

}
