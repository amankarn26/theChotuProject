import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '././../services/rest.service';
declare var Swal: any;

@Component({
  selector: 'app-return-challan',
  templateUrl: './return-challan.component.html',
  styleUrls: ['./return-challan.component.css']
})
export class ReturnChallanComponent implements OnInit {

  private title = '';
  private subtitle = '';
  private isManageState = true;
  private suppList;
  private isdetails = false;
  public tab1 = false;
  public tab2 = false;
  public id;
  public detailFlag = false;
  public isUpdate = false;
  public userType;
  private prodList;
  public productid;
  public userid = sessionStorage.getItem('id');
  public username = sessionStorage.getItem('name');
  public quantity;
  public dummqty=1;

  private returnchallan = {
    firm: sessionStorage.getItem('firm'),
    supplier: '',
    suppname: '',
    challanby: this.userid,
    challannum: '',
    totalprods: '',
    description: '',
    expreturndate: '',
    returnedon: '',
    state: 'ADDED',
    deliveredby: this.username,
    estdcarting: 0,
    finalreturnval: 0,
    returnreason: '',
    rejectreason: '',
    entries: []
  }

  entries = {
    product: '',
    prod_stock: '',
    pname: '',
    makername: '',
    hsncode: '',
    // qty: '',
    vmodel: '',
    vtype: '',
    voption: '',
    vcolour: '',
    chassisnum: '',
    enginenum: '',
    lotno: '',
    batteryname: '',
    batternum: '',
    mfgdate: '',
    gst: '',
    gstamt: '',
    amount: '',
    finalamt: '',
  }

  public productstockdetails;
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

    if (this.route.url === '/addreturnchallan') {
      this.title = 'Add Return Challan';
      this.subtitle = 'Fill new Return Challan information and submit.';
      this.isManageState = false;
      this.tab1 = true;
      this.getlastLotno();
      this.getSuppList();
      this.getallproduct();
    } else if (this.route.url === '/editreturnchallan/' + this.id) {
      this.title = 'Update Return Challan';
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.getlastLotno();
      this.getByid();
      this.getSuppList();
      this.tab1 = true;
      this.tab2 = true;
      this.isUpdate = true;
    }
    else if (this.route.url === '/detailreturnchallan/' + this.id) {
      this.title = "Return Challan Detail";
      this.subtitle = 'Update firm information and submit.';
      this.isManageState = false;
      this.isdetails = true;
      this.isUpdate = true;
      this.getByid();
    }
    else {
      this.title = 'Manage Return Challan';
      this.subtitle = 'Manage Return Challan information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
      this.getData();
      this.getSuppList();
    }
  }
  cancel() {
    // goBack code fro cancel button
    window.history.back();
  }

  private getByid() {
    // Get Information from JSON REST api
    let url = this.restService.returnchallanRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        console.log('Done fatching data!');
        this.returnchallan = response;
        this.entries.pname = response.pname;
        this.returnchallan.expreturndate = this.unixTimeConverter(response.expreturndate);
        this.returnchallan.returnedon = this.unixTimeConverter(response.returnedon);
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getData() {
    // Get Information from JSON REST api
    var url = this.restService.returnchallanRestURL('', '');
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

  submitData() {
    for(let data of this.returnchallan.entries)
    {
      delete data.lotno;
    }
    console.log('submiti function');
    // if(this.returnchallan.returnedon ===''){
    //   delete  this.returnchallan.returnedon;
    // }
 //   alert('return challan');
    if (this.returnchallan.expreturndate === '') {
      delete this.returnchallan.expreturndate;
    }

    delete this.returnchallan['returnedon'];

    var url = this.restService.returnchallanRestURL('add', '');
    console.log(url);
    this.restService.postFormData(url, this.returnchallan).subscribe(
      (response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        Swal.fire('Added', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managereturnchallan']);
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

  updateData() {
    console.log('submiti function');
    if (this.returnchallan.expreturndate === '') {
      delete this.returnchallan.expreturndate;
    }


    if (this.returnchallan['retrunedon'] === '') {
      delete this.returnchallan['retrunedon'];
    }


    const rchalan = {
      id: this.id,
      description: this.returnchallan.description,
      state: this.returnchallan.state,
      expreturndate: this.returnchallan.expreturndate,
      deliveredby: this.returnchallan.deliveredby,
      estdcarting: this.returnchallan.estdcarting,
      finalreturnval: this.returnchallan.finalreturnval,
      returnreason: this.returnchallan.returnreason,
      rejectreason: this.returnchallan.rejectreason,
    };
    var url = this.restService.returnchallanRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url, rchalan).subscribe(
      (response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {
        Swal.fire('Updated', '', 'success');
        window.scrollTo(0, 0);
        this.route.navigate(['/managereturnchallan']);
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

  private getSuppList() {
    // Get Information from JSON REST api
    var url = this.restService.supplierRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.suppList = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private onChangeHandler1(obj) {
    const stateId = obj.srcElement.value;
    console.log('vendorname...');
    console.log(obj.target.value);
    console.log(obj.target.options[obj.target.selectedIndex].text);
    this.returnchallan.suppname = obj.target.options[obj.target.selectedIndex].text;
  }

  private getallproduct() {
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        // this.restService.getJSONFromURL(response);
        this.prodList = response;
        console.log('State data available');
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  push(data: any, i: any) {
    this.quantity=this.dummqty;
    if(data.balanceunits>this.quantity)
    {

    console.log('pushing entries');
    console.log(data);
    const gst = this.entries.gst;
    console.log('this.entries.amount:' + data.rateperunit);
    console.log('this.entries.gst:' + this.entries.gst);
    const gstamt = Math.round(Number(data.rateperunit) * (Number(this.entries.gst) / 100));
    // Math.round(this.qcost.ordercost * 100) / 100;
    console.log('gstamt:' + gstamt);
    let amount;
    const finalamt = gstamt + Number(data.rateperunit);
    const finalreturnval = finalamt + Number(data.finalreturnval);
   // const qty =this.quantity;
    const jsonobj = {
      product: this.productid,
      prod_stock: data.id,
      hsncode: data.hsncode,
      lotno: data.lotno,
      qty:this.quantity,
      mfgdate: data.mfgdate,
      // qty: '1',
      gst: this.entries.gst,
      gstamt: gstamt,
      amount: data.rateperunit,
      finalamt: finalamt,
      pname: this.entries.pname,
    };
 //   delete jsonobj.lotno;
    console.log(jsonobj);
    this.returnchallan.entries.push(jsonobj);
    this.quantity=1;
    this.productstockdetails.splice(i, 1);
    this.totCal();
  }
  else{
    Swal.fire('Quantity is not available for this LOT-NO','','error');
  }
}


  totCal() {
    let total = 0;
    for (let data of this.returnchallan.entries) {
      total = total + Number(data.finalamt);
    }
    this.returnchallan.finalreturnval = total + Number(this.returnchallan.estdcarting);
  }


  getprodstock() {
    // http://localhost:8090/IMBAManager/rest/sparepart/stock?sparepart=27&qty=10
    let api = 'product=' + this.entries.product + '&status=AVAILABLE';
    let url = this.restService.productstockRestURL('quantityspare', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        console.log('Done fatching data!');
        this.productstockdetails = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );

  }

  private getpstockData() {
    // Get Information from JSON REST api
    var url = this.restService.productstockRestURL('byprodid', this.productid);
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

  private getlastLotno() {
    var url = this.restService.lastlotRestURL('challan', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response :any) => {
        this.restService.getJSONFromURL(response);
        this.returnchallan.challannum = response.generatednum;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getproddetails() {
    console.log('Product changed');
    for (let data of this.prodList) {
      console.log(data.name);
      console.log(data.id);
      this.productid = data.id;
      if (Number(data.id) === Number(this.entries.product)) {
        this.entries.makername = data.makername;
        this.entries.pname = data.name;
        this.entries.voption = data.voption;
        this.entries.vmodel = data.vmodel;
        this.entries.vtype = data.vtype;
        this.entries.chassisnum = data.chassisnum;
        this.entries.enginenum = data.enginenum;
        this.entries.hsncode = data.hsncode;
        this.entries.batternum = data.batternum;
        this.entries.batteryname = data.batteryname;
        this.entries.amount = data.amount;
        this.entries.gst = data.gst;
        this.entries.gstamt = data.gstamt;
        this.entries.mfgdate = data.mfgdate;
        this.entries.finalamt = data.finalamt;
        this.entries.lotno = data.lotno;
      }
    }
    this.getprodstock();
    this.getpstockData();
  }

  private deleteNewsList(id: any, data: any) {
    const index = this.productstockdetails.findIndex(x => x.spare_stock === id);
    console.log('id= ' + id);
    console.log('index= ' + index);
    if (index > -1) {
      this.productstockdetails.splice(index, 1);
      console.log(index);
    } else {
    }

  }
  onDeleteproduct(i) {
    this.returnchallan.entries.splice(i, 1);
    this.totCal();
    Swal.fire('Deleted!', '', 'success');
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
        const url = this.restService.returnchallanRestURL('delete', id);
        console.log('Delete using this id:' + id);
        const json = '{\"id\":\"' + id + '\"}';
        this.restService.deleteFormData(url).subscribe(
          (response :any) => {
            // Responce data.
            console.log('Status on Post API');
            console.log(response);
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            );
            this.getData();
            this.route.navigate(['/managereturnchallan']);
            if (this.detailFlag) {
              this.cancel();
            }
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
}
