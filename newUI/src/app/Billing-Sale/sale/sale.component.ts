import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
// import {productstock} from '../.././Inventory-Management/productstock/productstock.component';
declare var Swal: any;
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
 // private alertify = require('alertify.js');

  private title = '';
  private subtitle = '';
  private isManageState = true;
  public firmdata;
  private datalist;
  public userType;
  public statelist = [];
  public citylist = [];
  public consigneeData;
  public isStock = true;
  public prodstockids = [];
  public sparestockids = [];
  public sparepartdata;
  public cartcout = 0;
  public istockselected = 'NO';
  public id;
  private member = {
    role: '',
    description: ''
  };

  public paymentmode;  // CASH and BANK
  public consignee;
  public consigneename;
  public inwords;
  public detailFlag = false;
  private isInvoice = false;
  public firm = {
    name: '',
    // regno: '',
    phone: '',
    email: '',
    code: '',
    empcount: '',
    pannum: '',
    gstin: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: [this.getStateList()],
      city: [this.getCityList('Maharashtra')],
      country: 'India'
    }
  };

  public customerData;
  public productstock;
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;
  public isUpdate = false;

  public vouchernumber;
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
  public sstock; // sparepart stock
  public delList = [];
  public clientdata;
  public empList;
  public invoicenum;
  public challannumber;
  public bookingdate = this.todayDate();
  public saletype;
  public productdata;
  public custstate;
  public custcity;
  public customer;
  public custname;
  public financename;
  public pricetype = 'RETAIL';
  public expdelivery;
  public salesman;
  public salesmanname;
  public ordertype = 'DIRECT';
  public booingqty;

  public quotenum;

  public entrytype;

  public qcost = {
    baseprice: 0,
    insurance: 0,
    yearsinsured: 0,
    roadtax: 0,
    accessorycost: 0,
    extwarranty: 0,
    rcbookcost: 0,
    exchgvalue: 0,
    hypothecationcost: 0,
    gstamt: 0,
    bookingamt: 0,
    finalamt: 0,
    balanceamt: 0
  };


  public isexchg = 'NO';
  public isInsurance = 'NO';

  public exchange = {
    model: '',
    yrofmfg: '',
    regno: '',
    exchgvalue: 0,
  };

  public prodlList;
  public bookvehicles = [];

  public hypothecation;
  // public exchange;
  public totalprods;
  public comments;
  public status;
  public paystatus;
  public total;

  public isinsured;
  public insurance = {
    firm: sessionStorage.getItem('firm'),
    customer: '',
    custname: '',
    insurername: '',
    policynum: '',
    startdate: '',
    enddate: ''
  };


  // public iswarranty = 'NO';
  // public	warranty ={
  //      firm: sessionStorage.getItem('firm'),
  //      invoicenum:'',
  //      customer: this.customer,
  //      custname: this.custname,
  //      pname:"book",
  //      startdate:"257362600000",
  //      enddate:"257362600000",
  //      duration:"3",
  //      amount:20
  //  };

  public insurerlist=[];

  private dt = new Date();
  private email = {
    to: '',
    cc: 'amankarn26@gmail.com',
    templateId: 'selling',

    contentData: {
      content: {
        message: 'Thank you for giving us  chance to serve you ',
        dt: this.dt.toLocaleDateString(),
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
      subject: 'New Selling Invoice Generated'
    }
  };


  private email_table = {
    No: '1',
    Product_Head: '',
    Detail: '',
    Qty: '',
    GST: '',
    Amount: '',
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
    } else if (this.route.url === '/sale/' + this.id) {
      this.title = 'Billing Form';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;
      // this.getlastLotno();
      this.getinvoiceno();
      this.getvoucherno();
      this.getBookingdetails();
    } else if (this.route.url === '/sale') {
      this.title = 'Billing Form';
      this.subtitle = 'Fill new firm information and submit.';
      this.isManageState = false;
      this.mycart();
      // this.getlastLotno();
      this.getinvoiceno();
      this.getvoucherno();

      this.custstate = 'Maharashtra';
      this.custcity = 'Nagpur';
      this.getClienList();
      this.entrytype = 'SALE';
      this.getquoteno();
      this.getallinsurer();

    } else if (this.route.url === '/detailsale/' + this.id) {
      this.title = 'Sale Details';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.detailFlag = true;
      this.getBookingdetails();
    } else if (this.route.url === '/invoicesell/' + this.id) {
      this.title = 'Invoice Details';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.detailFlag = true;
      this.isInvoice = true;
      this.getBookingdetails();
      this.getFirm();
    } else if (this.route.url === '/editfirm/' + this.id) {
      this.title = 'Edit Firm';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getFirm();
    } else {
      this.title = 'Manage Sales';
      this.subtitle = 'Manage Book information including view, add, update and delete';
      this.getBooking();
    }

  }


  mycart() {
    console.log('Getching cart data');
    let sparepart = [];
    let product = [];
    let cartcount = 0;
    if (sessionStorage.getItem('spstock')) {
      // if session exists then get previous and then add new entry
      sparepart = JSON.parse(sessionStorage.getItem('spstock'));
      cartcount = cartcount + sparepart.length;
    }
    if (sessionStorage.getItem('pstocklist')) {
      // if session exists then get previous and then add new entry
      const pstock = JSON.parse(sessionStorage.getItem('pstocklist'));
      product = pstock;
      cartcount = cartcount + product.length;
    }

    this.sparepartdata = sparepart;
    this.productdata = product;

    console.log(this.sparepartdata);
    console.log(this.productdata);
    this.totalprods = this.sparepartdata.length + this.productdata.length;
    let totalGST = 0;
    let finalAmt = 0;
    let amount = 0;
    for (let entry of this.productdata) {
      totalGST = totalGST + entry.gstamt;
      finalAmt = finalAmt + entry.finalamt;
      amount = amount + entry.amount;
      this.qcost.baseprice = this.qcost.baseprice + entry.amount;

    }
    for (let entry of this.sparepartdata) {
      totalGST = totalGST + entry.gstamt;
      finalAmt = finalAmt + entry.finalamt;
      this.qcost.accessorycost = this.qcost.accessorycost + entry.amount;
    }
    this.qcost.finalamt = finalAmt;
    this.qcost.gstamt = totalGST;
  }




  private getRoleList() {
    // Get Information from JSON REST api
    var url = this.restService.firmRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  private getBooking() {
    // Get Information from JSON REST api
    var url = this.restService.bookRestURL('', 'SALE');
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
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
     ( response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal('', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managefirm']);
      },
      error => {
        // Error Message
        Swal(
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


  private getBookingdetails() {
    // Get Information from JSON REST api
    // http://localhost:8090/IMBAManager/rest/booking/id/110
    let url = this.restService.bookRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');

        //  this.firm.address.states = [this.getStateList()];
        this.datalist = response;
        this.productdata = response.bookvehicles;
        this.sparepartdata = response.bookaccessories;
        console.log('this.sparepartdata');
        console.log(this.sparepartdata);

        this.getCustById(response.customer);

        if (response.consignee) {
          this.getConsigneeById(response.consignee);
        }


        this.qcost = response.qcost;
        this.isexchg = response.isexchg;
        this.expdelivery = this.unixTimeConverter(response.expdelivery);

        this.saletype = response.saletype;
        this.hypothecation = response.hypothecation;

        this.isexchg = response.isexchg;


        this.isInsurance = response.isinsured;

        if (this.isexchg === 'YES') {
          this.exchange = response.exchange;
        }

        if (this.isInsurance === 'YES') {
          this.exchange = response.exchange;
        }

        if (this.hypothecation === 'YES') {
          this.financename = response.financename;
        }

        this.comments = response.comments;
        // this.inwords =     this.inwords=this.convertNumberToWords(this.datalist.qcost.finalamt) + ' only';
        this.inwords = this.convertNumberToWords(this.datalist.qcost.finalamt) + ' only';

        this.customer = response.customer;
        this.custname = response.custname;

        this.consignee = response.customer;
        this.consigneename = response.custname;

        this.totalprods = response.totalprods;

        this.paymentmode = response.paymentmode;



        // for email data start
                    // let tableData = [];
                    // let ic = 1;
                    // //   console.log(this.productdata);

                    // for (const pdata of this.productdata) {
                    //   this.email_table.No = String(ic);
                    //   this.email_table.Product_Head = pdata.pname;
                    //   this.email_table.Qty = pdata.qty;
                    //   this.email_table.Amount = pdata.finalamt;

                    //   if (pdata.vmodel) {
                    //     this.email_table.Detail = 'Model:' + pdata.vmodel + '<br>' +
                    //       'Colour:' + pdata.vcolour + '<br>' +
                    //       'Chasis No:' + pdata.chassisnum + '<br>' +
                    //       'Engine No:' + pdata.enginenum;
                    //   }


                    //   ic = ic + 1;
                    //   tableData.push(JSON.parse(JSON.stringify(this.email_table)));
                    // }

                    // //  console.log(this.sparepartdata);

                    // for (const sdata of this.sparepartdata) {

                    //   this.email_table.No = String(ic);
                    //   this.email_table.Product_Head = sdata.name;
                    //   this.email_table.Qty = sdata.qty;
                    //   this.email_table.Amount = sdata.finalamt;
                    //   ic = ic + 1;
                    //   console.log(this.email_table);
                    //   tableData.push(JSON.parse(JSON.stringify(this.email_table)));
                    // }

                    // this.email.contentData.table = JSON.parse(JSON.stringify(tableData));



                    // const costtable = {
                    //   Booking_Amount: this.qcost.bookingamt,
                    //   Balance_Amount: this.qcost.balanceamt
                    // };

                    // this.email.contentData.costtable.push(costtable);

                    // console.log('generating email content data table ');
                    // console.log(this.email.contentData.table);
                    // console.log(this.email.contentData.costtable);

        // for email data end
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getFirm() {
    // Get Information from JSON REST api
    let url = this.restService.firmRestURL('details', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');
        this.firm = response;
        console.log(response);

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
     ( response :any) => {
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
     ( response :any) => {
        this.citylist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  multiJson(data) {
    /* tslint:disable:no-string-literal */
    let bookorder = new Object();
    // let objAddress =new Object();
    bookorder['firm'] = sessionStorage.getItem('firm');
    bookorder['invoicenum'] = this.invoicenum;
    bookorder['quotenum'] = this.quotenum;

    //const today = new Date().toISOString().substr(0, 10);



    bookorder['quotedate'] = this.bookingdate;
    bookorder['invoicedate'] = this.bookingdate;
//   bookorder['invoicedate'] = this.bookingdate;

    bookorder['saletype'] = this.saletype;
    bookorder['entrytype'] = this.entrytype;

    if (this.route.url === '/sale/' + this.id) {
      bookorder['id'] = this.id;
    }

    bookorder['customer'] = this.customer;
    bookorder['custname'] = this.custname;
    bookorder['consignee'] = this.consignee;
    bookorder['consigneename'] = this.consigneename;
    if (this.hypothecation === 'YES') {
      bookorder['financename'] = this.financename;
    }
    bookorder['pricetype'] = this.pricetype;
    bookorder['expdelivery'] = this.expdelivery;
    bookorder['salesman'] = sessionStorage.getItem('id');
    bookorder['salesmanname'] = sessionStorage.getItem('name');
    bookorder['hypothecation'] = this.hypothecation;
    bookorder['hypothecation'] = this.hypothecation;
    bookorder['isstockselected'] = 'YES'; // sessionStorage.getItem('istockselected');

    bookorder['total'] = this.qcost.finalamt;
    bookorder['isexchg'] = this.isexchg;
    bookorder['isinsured'] = this.isInsurance;

    if (this.isInsurance === 'YES') {
      bookorder['insurance'] = this.insurance;
    }


    bookorder['custmobile'] = this.customerData.phone;
    bookorder['paymentmode'] = this.paymentmode;

    if (this.isexchg === 'YES') {
      this.exchange.exchgvalue = this.qcost.exchgvalue;
      bookorder['exchange'] = this.exchange;
    } else {

      //   bookorder['exchange'] = null;
    }

    bookorder['comments'] = this.comments;
    bookorder['status'] = 'SOLD';
    bookorder['paystatus'] = this.pricetype;
    //   bookorder['bookvehicles'] =    this.bookvehicles;
    bookorder['qcost'] = this.qcost;
    //  bookorder['bookvehicles'] =  JSON.parse(JSON.stringify(this.productdata));
    let bookvc = JSON.parse(JSON.stringify(this.productdata));



    for (let entry of bookvc) {
      if (entry.photo) {
        delete entry.photo;
      }
    }
    bookorder['bookvehicles'] = bookvc;
    let issparestockselected = 'NO';

    if (this.route.url === '/sale/' + this.id) {
      bookorder['bookaccessories'] = this.sparepartdata; // sale conversion after booking


    } else if (this.route.url === '/sale') {

      // bookaccessories
      let bookaccessories = [];


      for (let entry of this.sparepartdata) {
        const sp = {
          sparepart: entry.id,
          pname: entry.name,
          hsncode: entry.hsncode,
          qty: entry.qty,
          gst: entry.GST,
          gstamt: entry.gstamt,
          amount: entry.amount,
          finalamt: entry.finalamt,
          rateperunit: entry.rateperunit,
          stockids: entry.spare_stock
        };
        bookaccessories.push(sp);
        if (entry.spare_stock) {
          issparestockselected = 'YES';
        }else{
          issparestockselected = 'NO';
        }
      }
      bookorder['bookaccessories'] = bookaccessories; /// direct checkout
    }



    let isstockselected = 'NO';

    for (let entry of this.productdata) {

      if (entry.prod_stock) {
        isstockselected = 'YES';
      } else {
        isstockselected = 'NO';
      }
    }

    bookorder['isstockselected'] = isstockselected;
    bookorder['issparestockselected'] = issparestockselected;



    //  bookorder['bookaccessories'] = this.sparepartdata;
    bookorder['totalprods'] = this.totalprods;

    // bookorder['istockselected'] =  this.istockselected;
    this.isStock = true;
    for (const pdata of this.productdata) {
      if (pdata.prod_stock) { } else {
        this.isStock = false;
        //  alert('no prod stock');
      }
    }


    if (this.route.url === '/sale/' + this.id) {
      for (const sdata of this.sparepartdata) {
        if (sdata.stockids.length === 0) {
          this.isStock = false;
          //  alert('no spare stock');
        }
      }

    } else if (this.route.url === '/sale') {


      for (const sdata of this.sparepartdata) {
        if (!sdata.spare_stock) {
          this.isStock = false;
          //  alert('no spare stock');
        }
      }
    }

    return bookorder;

    /* tslint:enable:no-string-literal */
  }

  submitData() {
    const finalData = this.multiJson('pankaj');
    console.log('submiti function');
    console.log(finalData);
    //  alert(this.isStock);

    if (this.isStock) {
      var url;
      if (this.route.url === '/sale/' + this.id) {
        url = this.restService.bookRestURL('convert', '');
      } else {
        url = this.restService.bookRestURL('add', '');
      }


      console.log(url);
      this.restService.postFormData(url, finalData).subscribe(
       ( response :any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(response);
          // Now do your stuff here
          //  this.voucher(response.id);

          this.customerMail();
          Swal('', '', 'success');
          this.clearssesion();
          window.scrollTo(0, 0);
          this.route.navigate(['/managesale']);

        },
        error => {
          // Error Message
          Swal(
            error.statusText,
            error._body,
            'error'
          );
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;

    } else {
      Swal(
        'Stock is not selected',
        '',
        'error'
      );
    }
  }


  clearssesion() {
    console.log('clearing sessino');
    sessionStorage.removeItem('istockselected');
    sessionStorage.removeItem('spstock');
    sessionStorage.removeItem('pstocklist');
    sessionStorage.removeItem('mycartcount');
  }



  deleteRole(id: any) {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'Warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.bookRestURL('delete', '');
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.postFormData(url, json).subscribe(
         ( response :any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getBooking();
            // Now do your stuff here
          },
          error => {
            // Error Message
            Swal(
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
        Swal(
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
     ( response :any) => {
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

  // private getlastLotno() {
  //   // Get Information from JSON REST api
  //   // GET Last Lot No purcahse order
  //   //  http://localhost:8090/IMBAManager/rest/sale/newinvoice/num?firm=7
  //   // BOOKING
  //   var url = this.restService.lastlotRestURL('selling', 'SELLING');
  //   this.restService.getJSONFromURL(url).subscribe(
  //    ( response :any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.invoicenum = response.generatednum;
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

  private getClienList() {
    // Get Information from JSON REST api
    const url = this.restService.RetailerRestURL('city', this.custcity);
   // const url = this.restService.customerRestURL('', sessionStorage.getItem('firm'));
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
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
    const url = this.restService.empRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
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

    const result1 = this.clientdata.find(x => x.id == this.customer);

    this.customerData = result1;
    console.log(this.customerData);
    this.consignee = this.customer;
    this.consigneename = this.custname;
  }

  private onChangeConsignee(obj) {
    const stateId = obj.srcElement.value;
    console.log(obj);
    console.log('onChangeConsignee');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.consigneename = obj.target.options[obj.target.selectedIndex].text;
  }


  private getProdstock() {
    // Get Information from JSON REST api
    let url = this.restService.productstockRestURL('byprodid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');
        this.productstock = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  public getprodbyid() {
    let url = this.restService.productRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
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


  onchangeHypo() {

    if (this.hypothecation === 'NO') {
      this.qcost.hypothecationcost = 0;
      this.financename = '';
      this.recal();
    }
  }

  onchangeExc() {
    if (this.isexchg === 'NO') {
      this.qcost.exchgvalue = 0;
      this.exchange.model = '';
      this.exchange.yrofmfg = '';
      this.recal();
    }
  }

  recal() {
    console.log('Recalculating Data');
    let total = 0;
    console.log('total =' + total);

    total = total + Number(this.qcost.baseprice);
    console.log('this.qcost.baseprice =' + this.qcost.baseprice);
    console.log('total =' + total);

    total = total + Number(this.qcost.insurance);
    console.log('this.qcost.insurance =' + this.qcost.insurance);
    console.log('total =' + total);

    total = total + Number(this.qcost.roadtax);
    console.log('this.qcost.roadtax =' + this.qcost.roadtax);
    console.log('total =' + total);

    total = total + Number(this.qcost.accessorycost);
    console.log('this.qcost.accessorycost =' + this.qcost.accessorycost);
    console.log('total =' + total);

    total = total + Number(this.qcost.extwarranty);
    console.log('this.qcost.extwarranty =' + this.qcost.extwarranty);
    console.log('total =' + total);

    total = total + Number(this.qcost.hypothecationcost);
    console.log('this.qcost.hypothecationcost =' + this.qcost.hypothecationcost);
    console.log('total =' + total);

    total = total + Number(this.qcost.rcbookcost);
    console.log('this.qcost.rcbookcost =' + this.qcost.rcbookcost);
    console.log('total =' + total);

    total = total + Number(this.qcost.gstamt);
    console.log('this.qcost.gstamt =' + this.qcost.gstamt);
    console.log('total =' + total);
    this.qcost.finalamt = total;
    console.log('before this.qcost.balanceamt:' + this.qcost.balanceamt);
    this.qcost.balanceamt = total - Number(this.qcost.bookingamt) - Number(this.qcost.exchgvalue);
    this.qcost.balanceamt = Math.round(this.qcost.balanceamt);
    console.log(' after this.qcost.balanceamt:' + this.qcost.balanceamt);
  }






  private getCustById(id: any) {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        this.restService.getJSONFromURL(response);
        this.customerData = response;
        this.custstate = response.address.states;
        this.custcity = response.city;

        if (this.route.url === '/sale/' + this.id) {
          this.getClienList();
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }




  private getConsigneeById(id: any) {
    // Get Information from JSON REST api
    const url = this.restService.customerRestURL('details', id);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        this.restService.getJSONFromURL(response);
        this.consigneeData = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private voucher(data: any) {

    const vobj = {
      id: data,
      history: [{
        updatedby: sessionStorage.getItem('id'),
        updatedbyname: sessionStorage.getItem('name'),
        status: 'PAID',
        // comment:this.comment,
        voucher: {
          vno: this.vouchernumber,
          vdate: new Date(),
          transtype: 'CREDIT',
          debitacct: this.customerData.name,
          creditacct: sessionStorage.getItem('firm'),
          amount: this.qcost.bookingamt,
          narration: 'Payment added for voucher no ' + this.vouchernumber,
          authby: sessionStorage.getItem('id'),
          prepby: sessionStorage.getItem('id'),
          firm: sessionStorage.getItem('firm'),
        }
      }]
    };
    var url = this.restService.bookRestURL('history', '');
    this.restService.postFormData(url, vobj).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');
        console.log(response);

        Swal('', '', 'success');
        this.clearssesion();
        window.scrollTo(0, 0);
        this.route.navigate(['/managebook']);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getvoucherno() {
    var url = this.restService.lastlotRestURL('voucher', 'newvoucher');
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        this.restService.getJSONFromURL(response);
        //   console.log(response);
        this.vouchernumber = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }


  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + Number(n_array[j]);
            n_array[i] = 0;
          }
        }
      }
      var value = 0;
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          value = n_array[i] * 10;
        } else {
          value = n_array[i];
        }
        if (value != 0) {
          words_string += words[value] + " ";
        }
        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Crores ";
        }
        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    return words_string;
  }


  generatePdf() {

    var data = document.getElementById('content');

    html2canvas(data).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      // enter code here
      const imgData = canvas.toDataURL('image/png')

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
        heightLeft -= pageHeight;
      }
      doc.save('ServicingJob' + this.id + '_' + '.pdf')

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
    return datetime;
  }

  public getstockforProduct(data: any, index: any) {
    console.log('Getting stock for selected product');
    console.log(data);
    console.log(index);
    this.getstockByprod(data.product, data.qty, index);
  }

  public getstockforSpare(data: any, index: any) {
    console.log('Getting stock for selected Spare Part');
    console.log(data);
    this.getstockByspare(data.sparepart, data.qty, index);
  }


  private getstockByprod(id: any, qty: any, index: any) {
    // http://localhost:8090/IMBAManager/rest/sparepart/stock?sparepart=27&qty=10
    const api = 'product=' + id + '&qty=' + qty;
    const url = this.restService.productstockRestURL('quantityspare', api);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');
        this.pstock = response;
        console.log(index);
        this.prodstockids = [];
        for (let entry of this.pstock) {
          const temp = {
            stockid: entry.id,
            lotno: entry.lotno
          };
          this.prodstockids.push(temp);
        }
        if (response.length === 0) {
          this.isStock = false;
          Swal(
            'Out Of Stock',
            'Stock is not available for this Product',
            'error'
          );
        } else {
          console.log('IF STOCK EXISTS THEN ADD OTHER PARAMETER TO PRODUCT FROM STOCK');
          this.productdata[index]['prod_stock'] = response['0'].id;
          this.productdata[index]['mfgdate'] = response['0'].mfgdate;
          this.productdata[index]['makername'] = response['0'].makername;
          this.productdata[index]['lotno'] = response['0'].lotno;
          this.productdata[index]['enginenum'] = response['0'].enginenum;
          this.productdata[index]['chassisnum'] = response['0'].chassisnum;
          this.productdata[index]['batteryname'] = response['0'].batteryname;
          this.productdata[index]['batternum'] = response['0'].batternum;
          console.log(this.productdata);
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getstockByspare(id: any, qty: any, index: any) {
    // http://localhost:8090/IMBAManager/rest/sparepart/stock?sparepart=27&qty=10
    const api = 'sparepart=' + id + '&qty=' + qty;
    const url = this.restService.sparepartstockRestURL('quantityspare', api);
    this.restService.getJSONFromURL(url).subscribe(
     ( response :any) => {
        console.log('Done fatching data!');
        this.sstock = response;
        this.sparestockids = [];
        for (let entry of this.sstock) {
          const temp = {
            stockid: entry.id,
            lotno: entry.lotno
          };
          this.sparestockids.push(temp);
          //  this.delList.push(temp);
        }

        if (response.length === 0) {
          this.isStock = false;
          Swal(
            'Out Of Stock',
            'Stock is not available for this Sparepart',
            'error'
          );
        } else {
          this.sparepartdata[index]['stockids'] = JSON.parse(JSON.stringify(this.sparestockids));
          console.log('  this.sparepartdata');
          console.log(this.sparepartdata);
        }
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  // customer mail code

  private customerMail() {
    // sending mail with random generated password
    //   this.route.navigate(['/managequotation']); // added on 12/27/2018

    console.log('Call to customer mail  : ');


    // for email data start
    let tableData = [];
    let ic = 1;
    for (const pdata of this.productdata) {
      this.email_table.No = String(ic);
      this.email_table.Product_Head = pdata.pname;
      this.email_table.Qty = pdata.qty;
      this.email_table.GST = pdata.gstamt;
      this.email_table.Amount = pdata.finalamt;
      if (pdata.vmodel) {
        this.email_table.Detail = 'Model:' + pdata.vmodel + '<br>' +
          'Colour:' + pdata.vcolour + '<br>' +
          'Chasis No:' + pdata.chassisnum + '<br>' +
          'Engine No:' + pdata.enginenum;
      }
      ic = ic + 1;
      tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    }


    for (const sdata of this.sparepartdata) {
      this.email_table.No = String(ic);
      this.email_table.Product_Head = sdata.name;
      this.email_table.Qty = sdata.qty;
      this.email_table.GST = sdata.gstamt;
      this.email_table.Amount = sdata.finalamt;
      this.email_table.Detail = '';
      ic = ic + 1;
      console.log(this.email_table);
      tableData.push(JSON.parse(JSON.stringify(this.email_table)));
    }

    this.email.contentData.table = JSON.parse(JSON.stringify(tableData));

    const costtable = {
      Booking_Amount: this.qcost.bookingamt,
      GST_AMOUNT: this.qcost.gstamt,
      Balance_Amount: this.qcost.balanceamt,
      FINAL_AMOUNT: this.qcost.finalamt
    };

    this.email.contentData.costtable.push(costtable);
    console.log('generating email content data table ');
    console.log(this.email.contentData.table);
    console.log(this.email.contentData.costtable);
    // for email data end
    this.email.to = this.customerData.email; // this.custEmail;
    console.log(this.email.to);
    this.email.contentData.content.quatationid = String(this.invoicenum); // quotation id
    this.email_table.Amount = '<p style=\'text-align:center\'>' + this.qcost.finalamt + '</p>';
    this.email.contentData.content.message = 'To, ' + this.customerData.name.toUpperCase() + '\n ';

    console.log(this.email);
    this.email.templateId = 'selling';
    this.email_table.Qty = '<p style=\'text-align:center\'>' + String(this.totalprods) + '</p>';
    console.log('submiti function');
    console.log(this.email);
    const url = this.restService.mailRestURL('send', '');
    this.restService.postFormData(url, this.email).subscribe(
     ( response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        return true;
      },
      error => {
        // Error Message
        console.log('Failed to send email message to customer');
        return false;
        // Doyour stuff here
      }
    );
  }


  public getquoteno() {

    var url = this.restService.quoteRestURL('quotenumber', this.entrytype);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any ) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.quotenum=response.generatednum;
     //   this.generateNewLotNo(response.generatednum);



      },
      error => {
        console.log('Error in data load.');
      }
    );

  }


  public getinvoiceno() {

    var url = this.restService.quoteRestURL('qinvoicenumber', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response : any ) => {
        this.restService.getJSONFromURL(response);
        // alert(response.lastlotno)
        console.log(response);
        this.invoicenum=response.generatednum;
     //   this.generateNewLotNo(response.generatednum);



      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  public getallinsurer() {
    // Get Information from JSON REST api
    const url = this.restService.insurerRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response:any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.insurerlist = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

}
