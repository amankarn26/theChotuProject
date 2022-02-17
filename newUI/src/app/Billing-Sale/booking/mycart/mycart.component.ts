import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../../services/rest.service';
declare var Swal: any;
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  // private alertify = require('alertify.js');
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  public userType;
  public statelist = [];
  public citylist = [];
  public isUpdate = false;
  public id;
  public detailFlag = false;
  public docServer = this.restService.docServer;
  public sparepartdata;
  public productdata = [];
  deliverycharges;
  grandtotal = 0;
  gsttotal = 0;
  public branch = sessionStorage.getItem('branch');
  public image = sessionStorage.getItem('image');


  stockavailable;

  private member = {
    role: '',
    description: ''
  };

  private shop = {
    // branch: sessionStorage.getItem('branch'),
    firm: sessionStorage.getItem('firm'),
    name: '',
    fax: '',
    phone: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      pincode: '',
      states: '',
      city: '',
      country: 'India'
    }
  };


  public selectedbranch;


  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  public ptotal = 0;
  public stotal = 0;
  public total = 0;

  public deliveryerror;

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

    this.getcartdata();

    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addshop') {
      this.title = 'Add Shop';
      this.subtitle = 'Fill new shop information and submit.';
      this.isManageState = false;


    } else if (this.route.url === '/editshop/' + this.id) {
      this.title = 'Update Shop';
      this.subtitle = 'Update shop information and submit.';
      this.isManageState = false;
      this.isUpdate = true;
      this.getByid();
    } else if (this.route.url === '/detailshop/' + encodeURIComponent(this.id)) {
      this.title = 'Shop Details';
      this.subtitle = '';
      this.isManageState = false;
      this.detailFlag = true;

      this.getByid();

    } else {
      this.title = 'Manage Cart';
      this.subtitle = 'Manage shop information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      // this.getData();
    }

  }

  onDeletePstock(i) {
    console.log('Deleting*********************');
    this.productdata.splice(i, 1);
    Swal.fire({ title: "Deleted!", icon: "success", timer: 800 });

    sessionStorage.setItem('items', JSON.stringify(this.productdata));
    this.getcartdata();
  }

  private getcartdata() {
    let product = [];
    let cartcount = 0;
    
    if (JSON.parse(sessionStorage.getItem('items')) === null) {
      this.productdata = [];
    }
    else {
      this.productdata = JSON.parse(sessionStorage.getItem('items'));
    }
    console.clear()
    console.log(this.productdata);

    this.recalProduct();
    // if (this.selectedbranch !== undefined) {
    //   this.getDeliverycharges();
    // }

  }

  recalcartcount() {


    let sparepart = [];
    let product = [];
    let cartcount = 0;
    if (sessionStorage.getItem('spstock')) {
      sparepart = JSON.parse(sessionStorage.getItem('spstock'));
      cartcount = cartcount + sparepart.length;
    }
    if (sessionStorage.getItem('items')) {
      const pstock = JSON.parse(sessionStorage.getItem('items'));
      product = pstock;
      cartcount = cartcount + product.length;
    }

  }



  recalSparepart() {
    let total = 0;
    for (let data of this.sparepartdata) {
      total = total + data.finalamt; // (Number(data.qty) * Number(data.finalamt));
    }
    this.stotal = total;

    this.finaltotal();
  }


  recalProduct() {

    if (this.productdata.length === 0) this.deliverycharges = 0
    else this.deliverycharges = 0
    
    let total = 0;
    let gsttotal = 0;
    for (let data of this.productdata) total = total + (Number(data.qty) * Number(data.rateperunit))
    gsttotal = (total * 5) / 100

    // alert(gsttotal);
    this.gsttotal = gsttotal;
    this.ptotal = total;
    this.finaltotal();
  }

  finaltotal() {


    this.total = this.stotal + this.ptotal;
    this.grandtotal = this.gsttotal + this.total;

  }


  qtychangedplus(index: any, data: any, value: any) {
    console.log('Index:' + index);
    console.log(data);
    console.log(value);
    this.sparepartdata[index].qty = this.sparepartdata[index].qty + 1;
    sessionStorage.setItem('spstock', JSON.stringify(this.sparepartdata));
    this.recalSparepart();
  }

  qtychangedminus(index: any, data: any, value: any) {
    console.log('Index:' + index);
    console.log(data);
    console.log(value);
    this.sparepartdata[index].qty = this.sparepartdata[index].qty - 1;
    sessionStorage.setItem('spstock', JSON.stringify(this.sparepartdata));
    this.recalSparepart();
  }


  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.shopRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        this.data = response;
        console.log(response);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.shopRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);
        this.shop = response;
        this.shop.name = response.name;
        this.shop.email = response.email;
        this.shop.phone = response.phone;
        this.shop.fax = response.fax;
        this.shop.address.states = response.address.states;
        this.shop.address.pincode = response.address.pincode;
        this.shop.address.line1 = response.address.line1;
        this.shop.address.line2 = response.address.line2;
        this.shop.address.city = response.address.city;
        this.shop.address.country = response.address.country;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getState() {
    // Get Information from JSON REST api
    var url = this.restService.PincodeRestURL('', this.shop.address.pincode);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.statelist = response;
        this.shop.address.states = response.state_name;
        this.shop.address.city = response.city_name;


        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getDeliverycharges() {
    // alert('getting list');
    console.log('Getting delivery details');
    Swal.fire('Calculating Delivery Charges ...')
    Swal.showLoading();
    // http://localhost:8090/SmartSupplyManager/rest/order/Dcharge?firm=20&customer=12
    //  const urlstr = 'Dcharge?firm='+ this.selectedfirm+'&customer='+ sessionStorage.getItem('id');

    const urlstr = 'dcharge?firm=' + this.selectedbranch + '&customer=' + sessionStorage.getItem('id') +
      '&duration=WITHIN_4_HRS&item=' + this.productdata.length + '&specialitem=NO';


    const url = this.restService.OrdersRestURL('delivery_cal', urlstr);

    alert(url);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.restService.getJSONFromURL(response);
        console.log(response);
        this.deliverycharges = Number(response.charge);
        this.deliveryerror = response.error;

        alert('deliverycharges=' + this.deliverycharges);
        alert('gsttotal=' + this.gsttotal);
        alert('total=' + this.total);
        this.grandtotal = this.deliverycharges + this.gsttotal + this.total;

        this.restService.disableloading();

        // this.finaltotal();

      },
      error => {
        this.restService.disableloading();
        console.log('Error in data load.');
      }
    );
  }


  checkouttonextpage() {
    this.getcartdata();
    this.stockavailablecheck();
    if (this.stockavailable === false) {
      Swal.fire('Stock Not Available for Product', 'Please delete from Cart or try adding another product', 'info');
    }
    else {


      if (this.deliveryerror === 'DELIVERY_PERSON_NOT_AVAILABLE') {
        Swal.fire('Delivery Person not available for that area', 'please try after sometime', 'info');
      }
      else {
        this.route.navigate(['/checkout']);
      }
    }
  }

  stockavailablecheck() {

    var checkstock = true;
    for (let data of this.productdata) {

      if (data.stockStatus === 'NO') {
        //alert(data.stockStatus);
        checkstock = false;
      }
    }

    this.stockavailable = checkstock;

  }

  clearcart() {

    {

      Swal.fire({
        title: 'Are you sure?',
        // text: 'You will not be able to recover this data!',
        text: 'This will clear your Cart, Do you wish to proceed?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Clear it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          // delete code

          sessionStorage.removeItem('items');

          Swal.fire({ title: "Cart Cleared!", icon: "success", timer: 800 });


          this.getcartdata();


        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your data is safe :)',
            'error'
          );

        }
      });


    }
  }
}
