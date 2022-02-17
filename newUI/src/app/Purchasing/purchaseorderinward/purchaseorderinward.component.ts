import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
// import { Cookie } from 'ng2-cookies';
declare var Swal: any;
@Component({
  selector: 'app-purchaseorderinward',
  templateUrl: './purchaseorderinward.component.html',
  styleUrls: ['./purchaseorderinward.component.css']
})
export class PurchaseorderinwardComponent implements OnInit {


  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  public detailFlag = false;
  private datalist;
  public userType;
  private supplierList = [];
  private empList = [];
  public statelist = [];
  public citylist = [];
  public purchaeorderdetails = [];
  private vendorList;
  private prodlList;
  private stationarydata;
  private generatedon;
  public supemail;

  public totalvalueofinward = 0;
  public isUpdate = false;

  private nm = [];
  private st = [];
  private er = [];

  public id;
  private member = {
    role: '',
    description: ''
  };

  public firm = {
    name: '',
    regno: '',
    phone: '',
    email: '',
    empcount: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };




  // "inwardby":10,
  // "receivedon":257362600000,
  // "totalproducts":30,
  // "deliveredby":"Gajanan Travels",
  // "deliveryperson":"Chunkss delivery",




  private purchase = {
    firm: sessionStorage.getItem('firm'),
    supplier: '',
    suppname: '',
    inwardby: sessionStorage.getItem('id'),
    purchaseorder: '',
    porderno: '',
    poby: '',
    //  pobyname: sessionStorage.getItem('name'),
    //   porderno: '',
    description: '',
    // expdelivery: '',
    receivedon: '',
    //  generatedon: '',  removed on 4/13/2019 it will be generated from backend
    //  generatedon : '',
    totalamt: 0,
    finalamt: 0,
    paymentmode: '',
    state: 'ADDED',
    deliveredby: '',
    deliveryperson: '',
    estdcarting: '',
    totalweight: 0,
    totalpacks: 0,
    details: [],

    totalproducts: 0,
    //totalspares: 0,
  };


  private details = {
    // purchaseorder: '',
    product: '',
    pname: '',
    qty: 1,
    rateunit: '',
    rateperunit: '',
    purchaseprice:'',
    ptype: '',

  
    amount: 0,
    gst: '',

    gstamt: 0,


    hsncode: '',

    subtotal: 0,
    inwardedqty:0,

    batchdesc: '',
    mfgdate: '',
    mfg: '',
    porder_details:'',
    expiry:''

  };
  private category = {
    firm: sessionStorage.getItem('firm'),
    name: '',
    description: '',

  };

  // {

  //   "details": [
  //     {
  //       "purchaseorder": "",
  //       "product": "38603",
  //       "pname": "Fairness Creams",
  //       "prodcode": "2345",
  //       "qty": 12,
  //       "unitsperpack": 5,
  //       "rateunit": "RATEPER1000",
  //       "rateperunit": 100,


  //       "stationery":23,
  //       "totalproducts":12,
  //       "expktweight":123,
  //       "amount":200,
  //       "gst":12345654321,
  //       "gsttype":"INCLUSIVE",
  //       "gstamt":3000

  //     }
  //   ]
  // }






  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

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

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addpurchaseorderinward/' + this.id) {
      this.title = 'Add Purchase Order Inward';
      this.subtitle = 'Fill new PurchaseOrder information and submit.';
      this.isManageState = false;
      this.getVendorList();
      this.getByporderid(this.id); // get purchase order by id
      this.getpurchaseporderdetail();
      this.getEmpList();
      this.getproduct();
    // this.getStationary();
      //   this.getlastLotno();
      this.isUpdate = false;

    } else if (this.route.url === '/editpurchase/' + this.id) {
      this.title = 'Update Purchase Order';
      this.subtitle = 'Update PurchaseOrder information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid(this.id);
      this.getVendorList();
      this.getEmpList();
      this.getporderdetail();
    }
    else if (this.route.url === '/detailpurchaseorderinward/' + this.id) {
      this.title = 'Details Purchase Order';
      this.subtitle = '';
      this.isManageState = false;
     // alert('ljjljlds');
      this.getpurchaseorderdetailbyid(this.id);
      this.getpurchaseorderinwarddetails();
      // this.getByid(this.id);
      // this.getprodData(this.id);
      // this.getVendorList();
      // this.getEmpList();
      this.detailFlag = true;

    } else {
      this.title = 'Manage Purchase Order Inward';
      this.subtitle = 'Manage purchase Order Inward information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
      this.getVendorList();
    }
  }
  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.purchaseorderinwardRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // private getStationary() {
  //   // Get Information from JSON REST api
  //   var url = this.restService.sparepartRestURL('', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.stationarydata = response;
  //       console.log(response);
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }


  private getproduct() {
    // this.prodlList = [];
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.prodlList = response;
        console.log(this.prodlList);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getproductgst() {

    // alert(this.quotation.product);
    console.log('Product changed');

    // this.subdept.depname =
    // obj.target.options[obj.target.selectedIndex].text;
    for (let data of this.prodlList) {

      console.log(data.name);
      if (Number(data.id) === Number(this.details.product)) {

        this.details.hsncode = data.hsncode;
        // this.details.rateperunit = data.rateperunit;
        // this.details.rateunit = data.rateunit;
        this.details.pname = data.name;
        //    this.details.unitsperpack = data.weightperunit;

        this.details.gst = data.gst;
        //  const amt = data.exshowroomprice;
        this.details.amount = data.exshowroomprice;
        this.details.rateperunit = data.rateperunit;

        // const totalamt =Number(amt) * Number(data.gst)
        //   this.details.gstamt = (Number(data.exshowroomprice) * Number(data.gst)) / 100;
        console.log(data);
        this.prodtot();

      }
    }

  }

  public prodtot() {

    this.totalinwarded();
    this.details.amount = Number(this.details.inwardedqty) * Number(this.details.rateperunit);
    console.log('this.details.amount' + this.details.amount);
    this.details.gstamt = (Number(this.details.amount) * Number(this.details.gst)) / 100;
    console.log('this.details.gstamt' + this.details.gstamt);
    this.details.subtotal = Number(this.details.amount) + Number(this.details.gstamt);
    console.log('this.details.finalamt' + this.details.subtotal);

  }


  private getstationarygst() {
    console.log('Stationary changed');
    for (let data of this.stationarydata) {
      console.log(data.name);
      // alert(this.details.sparepart);
      if (Number(data.id) === Number(this.details.product)) {
    //    this.details.prodcode = data.hsncode;
        this.details.qty = data.unitsonorder;
        this.details.gst = data.GST;
      //  this.details.gsttype = data.gsttype;
        this.details.pname = data.name;
        this.details.rateperunit = data.rateperunit;
        this.details.amount = data.rateperunit;
        this.details.rateunit = data.rateunit;
        this.details.hsncode = data.hsncode;
        this.details.hsncode = data.hsncode;
        this.prodtot();
        console.log('prodcode' + data.prodcode);
        console.log('rateperunit' + data.rateperunit);
        console.log('rateunit' + data.rateunit);
        console.log('name' + data.name);
        // unitsonorder
      }
    }
  }




  recalculateqty(id: string, act: string, qty: any) {
    console.log(id);
    let i = 0;
    for (let data of this.purchaeorderdetails) {
      if (id === data.id) {
       // alert(data.ptype);
        if (act === '--') {
          console.log('-- Quantity');
          data.qty = data.qty - qty;
        } else {
          console.log('++ Quantity');
          // if (data.ptype === 'SPAREPARTS') {
          //     data.qty = qty;
          // }
          //  else {
            data.qty = data.qty + qty;
          }
        }
      }
      i = i + 1;
    }



  push() {

    this.totalinwarded();

  // let flagger

    // for (const entry of this.purchase.details) {

    //     if(this.details.sparepart == entry.sparepart || this.details.product == entry.product ){

    //       Swal.fire( 'Cannot Add Duplicate Entry',    '','error'  );
    //       flagger=false;
    //     }
    //   }

      // if(flagger)
      //{

    this.details.qty=this.details.inwardedqty;
  /// this.details.purchaseprice='0';
    console.log('pushing purchase order details');

    if ((this.details.qty !== 0) && (this.details.inwardedqty !== 0) && (this.details.rateperunit !== '')
    ) {
      console.log('ok working on it');

      // && (this.details.totalpacks !== '')  && (this.details.amount !== '') && (this.details.pktweight !=='') && (this.details.amount !== '')
      // if (this.quotation.requestortype === 'CUSTOMER'){
      //   delete this.details['wastage'];
      // };


        this.recalculateqty(this.details['id'], '--', this.details.qty);

       
     //  delete this.details.product;  
        delete this.details.amount;
        delete this.details.gst;
        delete this.details.gstamt;
        delete this.details.subtotal;



      const cloneProduct = JSON.parse(JSON.stringify(this.details));
      console.log('before pushing product');
      console.log(this.details);

      this.purchase.details.push(cloneProduct);
      console.log('After pushing product');
      console.log(this.purchase.details);
      this.details.product = '';
      this.details.ptype = '';

      this.details.hsncode = '';
      this.details.qty = 1;

      // this.details.wastage = '';
      this.details.rateunit = '';
      this.details.rateperunit = '';
      this.details.amount = 0;
      this.details.gst = '';
      this.details.gstamt = 0;
    

      this.details.hsncode = '';

      this.details.subtotal = 0;
      this.details.expiry = '';
      // this.details.pktweight ='';
      // this.details.amount ='';

this.details.inwardedqty=0;
      this.details.batchdesc = '';
      
      this.details.mfgdate = '';
      this.details.mfg = '';
      this.details.purchaseprice = '';
      this.details.pname = '';


      this.recal();
    }
//  }
}

  onDeleteproduct(i,id,quantity: any) {
    console.log(i);
    this.recalculateqty(this.details['id'], '++', quantity);
    this.purchase.details.splice(i, 1);   
    this.recal();
    Swal.fire('Deleted!', '', 'success');
    // console.log('beforeeeeeeee'+this.details.qty);

    // this.details.qty=this.details.qty-quantity;

    // console.log('after'+this.details.qty);


  }



  public onDeleteproductfromdb(id: number) {


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
        const url = this.restService.purchaseRestURL('detailsdelete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
          (response : any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getporderdetail();

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

  private getVendorList() {
    // Get Information from JSON REST api
    // http://localhost:8090/SuppChainManager/rest/vendor/category?category=SUPPLIER
    var url = this.restService.supplierRestURL('', '');
    // var url = this.restService.vendorRestURL('', '');

    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        this.vendorList = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getEmpList() {
    // Get Information from JSON REST api
    var url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        this.empList = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getporderdetail() {
    // Get Information from JSON REST api
    // http://localhost:8090/IMBAManager/rest/porder/details/poid/92
    var url = this.restService.purchaseorderinwardRestURL('porderdetails', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        // this.empList = response;
        this.purchase.details = response;
        console.log('State data available');
        this.recal();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getpurchaseorderinwarddetails(){
  //  alert('dfsdfdsf');

    var url = this.restService.purchaseorderinwardRestURL('pinwarddetails', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        // this.empList = response;
        this.purchase.details = response;
        console.log('State data available');
       // this.recal();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getpurchaseporderdetail() {
    var url = this.restService.porderRestURL('porderdetails', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        // this.restService.getJSONFromURL(response);
        // this.empList = response;
        this.purchaeorderdetails = response;
     //  this.totalvalueofinward=response.qty - response.inwardedqty
        console.log('State data available');
        this.recal();
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
    console.log('vendorname...');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.purchase.suppname = obj.target.options[obj.target.selectedIndex].text;


  }
  private onChangeHandler2(obj) {
    const stateId = obj.srcElement.value;
    // console.log(obj);
    // Call city data method
    console.log('pobyname...');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    //  this.purchase.pobyname = obj.target.options[obj.target.selectedIndex].text;
  }

  updateData() {
    console.log('submiti function');

    const porder = {
      id: this.id,
      description: this.purchase.description,
      expdelivery: this.purchase.receivedon,
      paymentmode: this.purchase.paymentmode,
      totalamt: this.purchase.totalamt,
      finalamt: this.purchase.finalamt,
      totalproducts: this.purchase.totalproducts
    };



    var url = this.restService.purchaseRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, porder).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        //  this.route.navigate(['/managepurchase']);
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

  private getByid(id: any) {
    // Get Information from JSON REST api
    // http://localhost:8090/IMBAManager/rest/porder/poinward/id/113
    let url = this.restService.purchaseorderinwardRestURL('poinwarddetails', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        // this.purchase = response;
        this.purchase.deliveredby = response.deliveredby;
        this.purchase.description = response.description;
        this.purchase.estdcarting = response.estdcarting;
        this.purchase.receivedon = this.unixTimeConverter(response.receivedon);
        //  this.purchase.generatedon=response.generatedon;
        this.generatedon = response.generatedon;
        this.purchase.paymentmode = response.paymentmode;
        // this.purchase.poby = response.poby;
        // this.purchase.pobyname = response.pobyname;
        this.purchase.porderno = response.porderno;
        this.purchase.state = response.state;
        this.purchase.totalamt = response.totalamt;
        this.purchase.totalpacks = response.totalpacks;
        this.purchase.totalweight = response.totalweight;
        this.purchase.supplier = response.supplier;
        this.purchase.suppname = response.suppname;
        this.purchase.finalamt = response.finalamt;
        this.purchase.totalproducts = response.totalproducts;
        // this.purchase.orderDate = this.unixTimeConverter(response.orderDate);
        // this.purchase.expDelivery = this.unixTimeConverter(response.expDelivery);
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


public getpurchaseorderdetailbyid(id:any){

   // http://localhost:8090/IMBAManager/rest/porder/poinward/id/113
   let url = this.restService.purchaseorderinwardRestURL('poinwarddetails', id);
   this.restService.getJSONFromURL(url).subscribe(
     (response : any) => {
       console.log('Done fatching data!');
       this.purchase = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }







  // private getprodData(id: any) {
  //   // Get Information from JSON REST api


  //   var url = this.restService.purchaseRestURL('proddetails', id);
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response : any) => {


  //       this.purchase.details = response;
  //       console.log(response);


  //     },
  //     error => {
  //       console.log('Error product in data load.');
  //     }
  //   );
  // }

  private getStateList() {
    // Get Information from JSON REST api
    var url = this.restService.stateRestURL('', 'India');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
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
      (response : any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  private Approved(data: any) {

 //   this.getprodData(data.id);

    var url = this.restService.purchaseRestURL('edit', '');
    const id = data.id;
    const json = {
      "id": id,
      "state": "APPROVED"
    };

    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        console.log('Done fatching data!');

        console.log(id);
        // alert(id);


        this.getData();
        console.log(response);
        // this.route.navigate(['/managepurchase']);
      },
      error => {
        console.log('Error in data load.');
      }
    );



  }


  private Received(data: any) {
    var url = this.restService.purchaseRestURL('edit', '');
    const id = data.id;
    const json = {
      "id": id,
      "state": "RECEIVED"
    };
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        this.getData();
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // RECEIVED
  private Send(data: any) {
    console.log(data);
    console.log(data.suppname);
    this.purchase.porderno = data.porderno;
    const result1 = this.vendorList.find(x => x.name == data.suppname);
    console.log('rs');
    console.log(result1);
    this.supemail = result1.email;
    console.log(this.supemail);

    var url = this.restService.purchaseRestURL('edit', '');
    const id = data.id;
    const json = {
      id: id,
      state: 'SENT'
    };
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        console.log(id);
        this.getData();
        console.log(response);
        // this.route.navigate(['/managepurchase']);
        this.supplieremail();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }




  private supplieremail() {
    const email = {
      // role: { role: 'ADMIN' },
      to: this.supemail,
      cc: "inouvellesolutions@gmail.com",
      templateId: 'simplemail',
      contentData: {
        content: {
          message: 'Dear Sir,\n \n' +
            ' Purchase order has been generated \n' +
            ' Details:\n '
            + 'Purchas Order Id : ' + this.purchase.porderno + '\n',

        },
        table: [],
        // costtable: [],
        subject: 'New Purchase Order Created'
      }
    };

    console.log('submiti function');
    console.log(email);
    const url = this.restService.mailRestURL('send', '');
    this.restService.postFormData(url, email).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
      },
      error => {
        // Error Message
        console.log('Failed to send email message to admin');
      }
    );
    return 0;
  }











  clonepurchase(id: any) {


    var url = this.restService.purchaseRestURL('clone', id);
    console.log(id);
    let json = '{\"id\":\"' + id + '\"}';
    this.restService.postFormData(url, json).subscribe(
      (response : any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        this.getByid(response.id);

      },
      error => {
        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;


  }




  submitData() {
    // this.push();
    

    this.details.qty=this.details.inwardedqty;
    if (this.purchase.details.length > 0) {

      console.log('submiti function');
      var url = this.restService.purchaseorderinwardRestURL('add', '');
      console.log(url);


     //   delete this.purchase.totalproducts;
       // delete this.details.purchaseorder;

        delete this.purchase.poby;
        delete this.purchase.description;
        delete this.purchase.totalamt;
        delete this.purchase.finalamt;
        delete this.purchase.paymentmode;
        delete this.purchase.state;
        delete this.purchase.estdcarting;





      for (let data of this.purchase.details) {
             delete data['id'];
      }

      this.restService.postFormData(url, this.purchase).subscribe(
        (response : any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          Swal.fire('Submited', '', 'success');
          window.scrollTo(0, 0);
          this.route.navigate(['/managepurchase']);

        //  document.getElementById('openModalButton').click();
          response.forEach(element => {
          //  if(element.name!="")
             this.nm.push(element.hsncode);
            //  else{ this.nm.push(element.fname+""+element.lname);//for name
            // }
             this.er.push(element.errCode); // for error
             this.st.push(element.reqstatus); // for status
          });

          // var swal_html = '<div class="panel" style="background:aliceblue;font-weight:bold"><table class="table table-condensed table-sm" style="font-size:10px;"> <tr> <th>HSN Code</th> <th>Status</th> <th>Error</th> </tr> <tr> <td> <div *ngFor="let name of nm"> {{name}}</div> </td> <td> <div *ngFor="let status of st"> {{status}}</div> </td> <td> <div *ngFor="let error of er"> {{error}}</div> </td> </tr> </table></div>'
          // Swal.fire({title:"Status!", html: swal_html});



        },
        error => {
          // Error Message
          Swal.fire(
            error.statusText,
            'Duplicate Entry',
            'error'
          );
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    } else {
      Swal.fire(
        'Please, add purchase order entry',
        '',
        'error'
      );

    }
  }

  deleteRole(id: any) {
    /*
     this.alertify.confirm("confirm it", function (e: any) {
            if (e) {
               //okCallback();
               alert("Ok");
            } else {alert("Cancel");
            }
        });*/

    /*
        if (confirm('Are you sure you want to delete this?')) {
          var url = this.restService.firmRestURL('delete', '');
          console.log(id);
          let json = '{\"id\":\"' + id + '\"}';
          this.restService.postFormData(url, json).subscribe(
            (response : any) => {
              // Responce data.
              console.log('Status on Post API');
              console.log(response);
              // window.location.reload();
              this.getRoleList();
              this.alertify.alert('Firm deleted Successfully')

              // Now do your stuff here
            },
            error => {
              // Error Message
              this.alertify.alert('<b>Failed to delete Role</b><br>' + error.statusText + '<br>'
                + error._body);
              console.log('Error in data load.');
              // Doyour stuff here
            }
          );
          return 0;
        }*/

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
        const url = this.restService.purchaseorderinwardRestURL('delete', id);
        console.log('Delete using this id:' + id);
   //     const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response : any) => {
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

  private unixTimeConverter(ts) {
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


  // private getrate() {
  //   console.log('get rate api');
  //   if (this.details.ptype === 'PRODUCT') {

  //     const str = 'prodcode=' + this.details.prodcode + '&ratelabel=DEFAULT_RATELABEL' + '&quantity='
  //       + this.details.qty + '&ptype=PURCHASE';

  //     var url = this.restService.productstockRestURL('rate', str);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response : any) => {
  //         this.restService.getJSONFromURL(response);
  //         this.details.amount = response.amtaddgst;
  //         this.details.gst = response.gstpercent;
  //         this.details.gstamt = response.gstValue;
  //         //  alert(response.gsttype);
  //         this.details.gsttype = response.gsttype;
  //         this.details.expktweight = response.totalweight;
  //         //  this.product.finalamt = response.amtaddgst;
  //         console.log(response);

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   } else {
  //     // http://localhost:8090/SuppChainManager/rest/stationery/rate?statcode=st1&quantity=12&ptype=PURCHASE
  //     const str = 'statcode=' + this.details.prodcode + '&quantity=' + this.details.qty + '&ptype=PURCHASE';

  //     var url = this.restService.stationaryRestURL('rate', str);
  //     this.restService.getJSONFromURL(url).subscribe(
  //       (response : any) => {
  //         this.restService.getJSONFromURL(response);
  //         this.details.amount = response.amtaddgst;
  //         this.details.gst = response.gstpercent;
  //         this.details.gstamt = response.gstValue;
  //         //  alert(response.gsttype);
  //         this.details.gsttype = response.gsttype;
  //         this.details.expktweight = response.totalweight;
  //         //  this.product.finalamt = response.amtaddgst;
  //         console.log(response);

  //       },
  //       error => {
  //         console.log('Error in data load.');
  //       }
  //     );
  //   }
  // }

  // get Porder No**********************************************************************************
  private getlastLotno() {
    // Get Information from JSON REST api
    // GET Last Lot No purcahse order
    // http://localhost:8090/IMBAManager/rest/porder/neworder/no?firm=7
    var url = this.restService.lastlotRestURL('porder', 'PURCHASEORDER');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
        this.purchase.porderno = response.generatednum;
        //  this.generateNewLotNo(response.lastlotno);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }
  // purchase.porderno
  private generateNewLotNo(lastlotno: any) {
    console.log('generating new lot no from previous:' + lastlotno);
    let strarry = lastlotno.split("-"); //001
    let newnostr = '';
    const lot1 = strarry[1];
    let lot2 = Number(strarry[1]);
    lot2 = lot2 + 1;
    if (lot2 > 0 && lot2 < 10) { // alert('1');
      newnostr = strarry[0] + "-00" + lot2;
      console.log(newnostr);
    }
    else if (lot2 >= 10 && lot2 <= 99) {
      // alert('2');
      newnostr = strarry[0] + "-0" + lot2;
      console.log(newnostr);
    } else {
      newnostr = strarry[0] + "-" + lot2;
    }
    this.purchase.porderno = newnostr;

  }
  // end last lot no************************************************************



  
  recal() {
    // calculate addition or deductions added on 2/2/2019

    console.log('Before recalculation         this.purchase.details :' + this.purchase.details);
    // let add = 0;
    // this.quotation.qcost.ordercost=0;
    // let wt=0;
    // let gst=0; // gstValue
    // let bundle=0;
    // let details='';
    let totalAmt = 0;
    let totalWt = 0;
    let totalProd = 0;
    let totalStat = 0;
    for (let data of this.purchase.details) {
      totalAmt += data.amount;
      totalWt += data.expktweight;
      totalProd += 1;
      // alert('1');

      // if (data.ptype === 'PRODUCT') {
      //   totalProd += 1;
      //   delete this.purchase.totalweight;
      //   delete this.purchase.totalpacks;

      // } else {
      //   totalStat += 1;
      //   delete this.purchase.totalproducts;
      //   delete this.purchase.totalweight;
      //   delete this.purchase.totalpacks;
      // }

      //       <select   class="form-control" name="ptype" [(ngModel)]="details.ptype"  >
      //       <option value="PRODUCT">PRODUCT</option>
      //       <option value="STATIONERY">STATIONERY</option>
      //     </select>
      // </div>

      //       totalproducts
      // totalstns
      // add +=data.amount;
      // wt +=data.weight;
      // gst += data.gstamt;
      // bundle += data.numbundles;

      // details += data.prodcode + ' : ' + data.amount+'Rs, ';

    }

    //  this.purchase.totalweight = totalWt;
    //  this.purchase.totalamt = totalAmt;
    this.purchase.totalproducts = totalProd;
    this.purchase.totalamt = totalAmt;
  //  this.purchase.totalspares = totalStat;
    this.purchase.finalamt = Number(this.purchase.totalamt) + Number(this.purchase.estdcarting);
    //    this.quotation.qcost.ordercost = add;
    //    this.quotation.qtransport.totalweight = wt;
    //    this.quotation.qtransport.numbundles = bundle;
    //    this.quotation.qcost.GST = gst;
    //    this.quotation.totalproducts = this.quotation.details.length;
    //    this.prodcut_details = details.slice(0, -2);

    //   this.quotation.qcost.ordercost = Math.round(this.quotation.qcost.ordercost * 100) / 100;

    //  if(this.travelType === 'Preffered') {
    //   this.quotation.qcost.parcel =Number(this.quotation.qtransport.preftravel.parcelamt);

    //   }else{
    //     this.quotation.qcost.parcel =Number(this.quotation.qtransport.temptravel.parcelamt);

    //   }



    //   this.quotation.qcost.subtotal=0;
    //   this.quotation.qcost.subtotal =this.quotation.qcost.ordercost +  this.quotation.qcost.parcel;

    //   this.quotation.qcost.ordercost  = Math.round(this.quotation.qcost.ordercost * 100) / 100;

    //   this.quotation.qcost.GST = gst;
    //   console.log('gst:'+ this.quotation.qcost.GST);


    //   this.quotation.qcost.finalamt= this.quotation.qcost.subtotal+(this.quotation.qcost.profit - this.quotation.qcost.loss)+ this.quotation.qcost.GST;
    //   this.quotation.qcost.finalamt= Math.round(this.quotation.qcost.finalamt);



  }


  clone(data: any) {


  this.totalvalueofinward=data.qty - data.inwardedqty;
  this.details.purchaseprice=data.rateperunit;

    console.log('clone data');
    console.log(data);
    this.details.ptype = data.ptype;
 //   this.details.purchaseprice = data.purchaseprice;
    this.details.rateperunit = data.rateperunit;
    this.details.porder_details= data.id;

      this.details.rateunit = data.rateunit;
      this.details.subtotal = data.subtotal;
      // this.details.amount = data.subtotal;
      this.details.hsncode = data.hsncode;
      this.details.amount = data.amount;
      // this.details.subtotal = data.finalamt;
      this.details.gst = data.gst;
      this.details.gstamt = data.gstamt;
  
      this.details.product = data.product;
      this.details.pname = data.pname;
     
      this.details.qty = data.qty;
      this.details['id'] = data.id;





  }


recalculation(){

console.log('on change rateperunit');
console.log('this.details.rateperunit = '+this.details.rateperunit);
console.log('this.details.gst = '+this.details.gst);


 this.details.subtotal = Number( this.details.rateperunit) * Number( this.details.qty);
 console.log('this.details.subtotal = '+this.details.subtotal);


  this.details.gstamt = Number( this.details.subtotal) * Number(this.details.gst) / 100;

  console.log(' this.details.gstamt = '+  this.details.gstamt);


  this.details.amount =  Number(this.details.subtotal) + Number(this.details.gstamt);
  console.log('this.details.amount' + this.details.amount);

}


  private getByporderid(id: any) {
    // Get Information from JSON REST api
    let url = this.restService.purchaseRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        // this.purchase = response;
        this.purchase.purchaseorder = response.id;
        this.purchase.porderno = response.porderno;
        this.purchase.deliveredby = response.deliveredby;
        this.purchase.description = response.description;
        this.purchase.estdcarting = response.estdcarting;
        //  this.purchase.expdelivery =   this.unixTimeConverter(response.expdelivery);
        this.generatedon = response.generatedon;
        this.purchase.paymentmode = response.paymentmode;
        // this.purchase.poby = response.poby;
        // this.purchase.pobyname = response.pobyname;
        // this.purchase.porderno = response.porderno;
        this.purchase.state = response.state;
        this.purchase.totalamt = response.totalamt;
        this.purchase.totalpacks = response.totalpacks;
        this.purchase.totalweight = response.totalweight;
        this.purchase.supplier = response.supplier;
        this.purchase.suppname = response.suppname;
        this.purchase.finalamt = response.finalamt;
        this.purchase.totalproducts = response.totalproducts;
        // this.purchase.orderDate = this.unixTimeConverter(response.orderDate);
        // this.purchase.expDelivery = this.unixTimeConverter(response.expDelivery);
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


totalinwarded()
{



  // for(let data of this.purchaeorderdetails)
  // {

  //   this.totalvalueofinward=data.qty - data.inwardedqty;

  // }

    console.log('totalvalueofinward'+ this.totalvalueofinward);
  //  this.totalvalueofinward=this.details.qty - this.details.inwardedqty;


 //  console.log('totalvalueofinward'+ this.totalvalueofinward);

//  if(this.details.inwardedqty===0)
//  {
//    Swal.fire('Please fill the information First','','info')
//  }

  if(this.details.inwardedqty>this.totalvalueofinward)
  {
    console.log(this.details.inwardedqty);
    Swal.fire('Inward Quantity Cannot be Greater Than Total Quantity','','info')
    this.details.inwardedqty=0;
  }

}
}
