import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* import { NgFor } from '@angular/common';
import { HttpModule, Response } from '@angular/http'; */

import { RestService } from './../../services/rest.service';


declare var Swal: any;
//declare var Swal: any;
@Component({
  selector: 'app-productstock',
  templateUrl: './productstock.component.html',
  styleUrls: ['./productstock.component.css']
})
export class ProductstockComponent implements OnInit {

  // private alertify = require('alertify.js');

  public variantfromresponse;
  public isPossiblevalues = false;
  private title = '';
  private subtitle = '';
  private isManageState = true;
  private datalist;
  private catList;
  private custList;
  public userRole = sessionStorage.getItem('role');
  public userType = sessionStorage.getItem('type');
  public statelist = [];
  public citylist = [];
  private file;
  private fileName;
  private document;
  private fileArray = [];
  private docArray = [];
  public getPhots = [];
  public tab1 = false;
  public tab2 = false;
  public isUpdate = false;
  public docServer = this.restService.docServer;
  public delList = [];
  public id;
  public detailFlag = false;
  private prodList;

  public producttype;
  private productid;
  private pstockArary = [];
  private pstockData;
  private weightperunit = 0;
  public properties = [];
  public propvalues = [];
  // private compData;

  public prodtype;

  public producttype_byvendor;
  
  public showrateunit;

  public selectbranch: any;

  private pstock = {
    product: sessionStorage.getItem('product'),
    
    branch: sessionStorage.getItem('branch'),

    pname: '',
    soldas: '',
    // product: '',
    // hsncode: '',
    // mfg: '',
    // batchdesc: '',
    // mfgdate: '',
    // expiry: '',
    // totalunits: 0,
    // totalpacks:'',
    // purchaseprice: '',
    rateperunit: 0,
    looserateperunit: '0.0',
    gst:'0',
    soldqty: '0',
    soldvolume: '0',
    // ratewithgst:'0',
    //  available:'',  removed on 3/30/2019
    // balanceunits: 0,
    // lotno: '',
    //  quantity:'',
    available: 'YES',
    // available: 'NO',
    stockval: []

    // barimg:{
    //   docname:'',
    //   docpath:'',
    //   docdesc:'',
    //   doctype:''
    // }

  }

  public branchlist = [];

  public stockval = {
    name: '',
    pvalue: ''
  }

  public prodtlist=[];

  private barimg = {
    id: '',
    barimg: { docname: '', docpath: '', docdesc: '', doctype: '' },
  };

  public statusresponse=[];

  private product = {
    // firm : sessionStorage.getItem('firm'),
    category: '',
    /*  category: '', */
    // supplier: [this.getCustList()],
    name: '',
    prodcode: '',
    rateunit: '',
    rateperunit: '',
    purchaseprice: '',
    unitsinstock: '',
    videolink: '',
    unitsonorder: '',
    reorderlevel: '',

    gst: '',





    /*


        private String ;
        private Float ;
        private Float ;
        private Integer ;
        private Integer ;
        private Integer ;*/
  };

  private category = {
    deployacct: '',
    name: '',
    description: '',
  };

  private pcode;
  private pname;
  // for datatable
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'name';
  public sortOrder = 'asc';
  public data;
  public url;

  public branchid;
  public producttypee;

  public urllink;

  constructor(
    private route: Router,
    private restService: RestService,
    private routprms: ActivatedRoute
  ) { }

  public routecategory;

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
      this.productid = this.routprms.snapshot.params['id'];
      this.producttypee=this.routprms.snapshot.params['producttype']
    }

    if (this.routprms.snapshot.params['prodtype']) {
      // alert(this.routprms.snapshot.params['prodtype']);
      this.prodtype = this.routprms.snapshot.params['prodtype'];
      this.pname = this.routprms.snapshot.params['pname'];
    }

    if (this.routprms.snapshot.params['pname']) {
      // alert(this.routprms.snapshot.params['prodtype']);
    //  this.prodtype = this.routprms.snapshot.params['prodtype'];
      this.pname = this.routprms.snapshot.params['pname'];
    }
    
    if (this.routprms.snapshot.params['branchid']) {
      this.branchid = this.routprms.snapshot.params['branchid'];
    }

    if (this.routprms.snapshot.params['category']) {
      this.routecategory = this.routprms.snapshot.params['category'];
    }

    //this.pname = this.routprms.snapshot.params['pname'];
    console.log('adadad');
    this.url = this.route.url;
    console.log(this.route.url);

    if (this.route.url === '/addpstock/' + encodeURIComponent(this.id)+'/'+encodeURIComponent(this.prodtype) ||
     this.route.url === '/addpstock/' + encodeURIComponent(this.id)+'/'+encodeURIComponent(this.prodtype)+'/'+encodeURIComponent(this.branchid)) {
     //alert('addpstock1')

      this.title = 'Add Product Stock';
      this.subtitle = 'Fill new product information and submit.';
      this.isManageState = false;
      this.tab1 = true;
      this.getprodList();
      this.pstock.product = this.id;
      if(this.branchid)
      {
        this.selectbranch=this.branchid
      }
      // this.getProperties();
      // this.getallfirm();
      // this.ok();

    }
    else  if (this.route.url === '/addpstock_byvendor/' + encodeURIComponent(this.branchid)+'/'+encodeURIComponent(this.routecategory)) {

     this.urllink='/addpstock_byvendor/' + encodeURIComponent(this.branchid)+'/'+encodeURIComponent(this.routecategory);
     this.title = 'Add Product Stock';
     this.subtitle = 'Fill new product information and submit.';
     this.isManageState = false;
     this.tab1 = true;
     this.getprodtypelistbycatgory();
     this.getallbranch1();
     this.getprodList();
   //  this.pstock.product = this.id;
     if(this.branchid)
     {
       this.selectbranch=this.branchid
     }
    // this.getProperties();
   //  this.getallfirm();
     // this.ok();

   }
     else if (this.route.url === '/editpstock/' + encodeURIComponent(this.id)) {
      this.title = 'Edit Product Stock';
      this.subtitle = 'Update branch information and submit.';
      this.isManageState = false;
      // this.getallprodList();
      this.getByid();
      this.tab1 = true;
      this.isUpdate = true;
    }
    else if (this.route.url === '/detailpstock/' + encodeURIComponent(this.id)) {
      this.title = 'Product Stock Details';
      this.subtitle = '';
      // this.flag = true;
      // this.isUpdate = true;
      this.isManageState = false;
      this.detailFlag = true;
      this.getByid();
      //  this.updateEmp();
      // this.getRoleList();
      // this.getEmpById();
      // this.getGradeList();
      // this.getAllDept();
      //  this.getAllDept();
    } else if (this.route.url === '/managepstock/' + encodeURIComponent(this.pname) + '/' + encodeURIComponent(this.id) +'/' + encodeURIComponent(this.producttypee) ||
    this.route.url === '/managepstock/' + encodeURIComponent(this.pname) + '/' + encodeURIComponent(this.id) +'/' + encodeURIComponent(this.producttypee)+'/'+encodeURIComponent(this.branchid)) {
      this.title = 'Product Stock For ' + this.pname ;
      this.subtitle = 'Manage product information including view, add, update and delete';
      this.userType = sessionStorage.getItem('role');
     
      if(this.branchid)
      {
       // alert('in')
        this.selectbranch=this.branchid
        this.getpstockDatabybranch();   //byprodid REST SERVICE

      }
      else{
        this.getpstockData();    //byprodidbranch & byprodid REST SERVICE
      }
      //  this.getByid();
    } else {
      this.title = 'Manage Product Stock ';
      this.subtitle = 'Manage product information including view, add, update and delete';
   //   this.userType = sessionStorage.getItem('role');
      this.getData();
      this.getByid();
    }

    // path: 'managepstock/:pcode/:pname',

  }

  private getData() {
    // // Get Information from JSON REST api
    // var url = this.restService.productstockRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response :any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.data = response;
    //     console.log(response);

    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private getpstockData() {
    // alert(this.userRole)
    // alert(this.userType)

    // Get Information from JSON REST api
    // http://localhost:8090/SuppChainManager/rest/product/stock?prodcode=4545
    if(this.userRole==='SUPERADMIN' || this.userType==='BRANCH')
    {
      var url = this.restService.productstockRestURL('byprodid', this.id);


    }
    else
    {
      //alert('in')
    var url = this.restService.productstockRestURL('byprodidbranch', this.id);


    }
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

  private getpstockDatabybranch() {

   var api = this.id+'&branch='+this.selectbranch;
    var url = this.restService.productstockRestURL('byprodid', api);
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

  private getlastLotno() {
    // // Get Information from JSON REST api
    // // http://localhost:8090/SuppChainManager/rest/product/last/lotno?prodcode=pro9
    // var url = this.restService.productstockRestURL('lastlotno', this.pstock.product);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response: any) => {
    //     this.restService.getJSONFromURL(response);
    //     // alert(response.lastlotno)
    //     console.log(response);
    //     this.pstock.lotno = response.generatednum;
    //     //   this.generateNewLotNo(response.generatednum);



    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private generateNewLotNo(lastlotno: any) {
    console.log(lastlotno)

    let strarry = lastlotno.split("-", "#"); //001
    let newnostr = '';
    const lot1 = strarry[1];

    // if (lot1 === '000') {
    //   newnostr = lastlotno;
    // }else{

    let lot2 = Number(strarry[1]);
    lot2 = lot2 + 1;

    if (lot2 > 0 && lot2 < 10) {
      newnostr = strarry[0] + "-00" + lot2;
    }
    else if (lot2 >= 10 && lot2 <= 99) {
      newnostr = strarry[0] + "-0" + lot2;
    }

    // }
  //  this.pstock.lotno = newnostr;


  }

  pushPstock() {
    if(this.userRole==='BRANCH')
    {
      this.pstock.branch=this.selectbranch;
    }

    let flagger = true;

    for(let data of this.pstockArary)
    {
      if(this.pstock.branch == data.branch && this.pstock.pname == data.pname)
      {
        Swal.fire('Duplicate Variant name','','error');
        flagger= false;
      }
    }

    if(flagger)
    {
      this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
      console.log('Product Stock');
      console.log(this.pstockArary);
      // this.pstock.firm='';
      // this.pstock.available='';
      this.pstock.gst='0';
      // this.pstock.purchaseprice='';
      this.pstock.rateperunit=0;
      // this.pstock.variant='';
      // this.pstock.ratewithgst=0;
    }

       //   this.holidaym.push(JSON.parse(JSON.stringify(this.holiday)));
       //  this.generateNewLotNo(this.pstock.lotno);
  }

  onDeletePstock(i) {
    console.log('Deleting*********************');

    // this.pstock.lotno=this.pstockArary[i].lotno;
    this.pstockArary.splice(i, 1); // added on 4/11/2019
    //  const index = this.pstockArary.length - 1;

    //  alert(this.pstock.lotno);
    Swal.fire(
      'Deleted!',
      '',
      'success'
    );
    // console.log(this.dyElemObjData);
  }

  onDeletestockval(i) {
    console.log('Deleting*********************');

    // this.pstock.lotno=this.pstockArary[i].lotno;
    this.pstock.stockval.splice(i, 1); // added on 4/11/2019
    //  const index = this.pstockArary.length - 1;

    //  alert(this.pstock.lotno);
    Swal.fire(
      'Deleted!',
      '',
      'success'
    );
    // console.log(this.dyElemObjData);
  }

  updateData() {

     this.pstock['id'] = this.id;
    // delete  this.pstock['mfg'];
   //  this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
  //  if(this.pstock.variant === this.variantfromresponse)
  //  {
  //   delete  this.pstock['variant'];
  //  }


    console.log('Updating function');
    var url = this.restService.productstockRestURL('edit', '');
    console.log(url);
    this.restService.postFormData(url,this.pstock).subscribe(
      (response :any) => {
        // Responce data.
        console.log('Status on Post API');
        console.log(response);
        // Now do your stuff here
        //   if (this.alertify.alert('Firm is updated sucessfully..!')) {

        if(response.errCode === 'DUPLICATE_VARIANT')
        {
          Swal.fire('Duplicate Varient', response.reqstatus, 'error');

        }
        else
        {
          Swal.fire('Updated', '', 'success');

        }
        this.cancel();
        window.scrollTo(0, 0);
        // this.tab1 = false;
        // this.tab2 = true;
        console.log(this.pstock['product'])
        this.productid=this.pstock['product'];
            this.route.navigate(['/managepstock/' + this.pstock.pname + '/' + this.productid]);
            console.log('/managepstock/' + this.pstock.pname + '/' + this.productid);

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

  private getByid() {
    //  Get Information from JSON REST api
    let url = this.restService.productstockRestURL('details', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data!');
        //   this.pstockData = response;


        this.pstock = response;

        this.pstock.pname = response.pname;


        this.pstock.product = response.product;
     //   this.pstock.hsncode = response.hsncode;
        // this.pstock.variant = response.variant;
        this.variantfromresponse = response.variant;
        this.pstock.rateperunit=response.rateperunit;
     //   this.pstock.batchdesc = response.batchdesc;
      //  this.pstock.mfgdate = response.mfgdate;
     //   this.pstock.expiry = response.expiry;
     //   this.pstock.totalunits = response.totalunits;
        //   this.pstock.unitsperpack = response.unitsperpack;

        //    this.pstock.barcode = response.barcode;
        //    this.pstock.available=response.available; removed on 3/30/2019
     //   this.pstock.balanceunits = response.balanceunits;
    //    this.pstock.lotno = response.lotno;
        //   this.pstock.quantity=response.quantity;
        //   this.pstock.balweight = response.balweight;
        this.pstock.available = response.available;

        this.pstock['product']=response.product;
        // if (response.barimg.docpath) {
        //   this.url = this.docServer + '/' + response.barimg.docpath;

        // }
        //   // barimg:{
        //   //   docname:'',
        //   //   docpath:'',
        //   //   docdesc:'',
        //   //   doctype:''
        //   // }


        // this.datalist = response;
        // this.getCityList(this.datalist.address.states);




        console.log(response);

        // this.compData=JSON.parse(JSON.stringify(this.product));
        // console.log('error in data upload n')
        // console.log(this.product);
        // console.log(this.compData);

      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getproduct() {
    for (let data of this.prodList) {
      if (Number(data.id) === Number(this.pstock.product)) {
        // this.product.prodcode = data.prodcode;
        // this.product.rateperunit = data.rateperunit;
        // this.product.rateunit = data.rateunit;
        //  this.productlabel.productname=data.name;
        console.log('data');
        console.log(data);
       //this.pstock.hsncode = data.hsncode;
        this.pstock.pname = data.name;

        this.pstock.rateperunit = data.rateperunit;
        // this.pstock.purchaseprice = data.purchaseprice;
        this.showrateunit=data.rateunit;
        this.producttype=data.prodtype;

        //    alert(data.mfg);
        this.getlastLotno();
        this.getallbranch();
      }
    }
  }

  onchangetotu() {
  //  this.pstock.balanceunits = this.pstock.totalunits;
    //  this.pstock.lotweight = this.weightperunit * this.pstock.totalunits;
    //this.pstock.balweight = this.pstock.lotweight;
  }

  gsttotal()
  {
    const gstamt = (Number(this.pstock.rateperunit) * Number(this.pstock.gst) / 100);
    //  console.log(gstamt);
    // this.pstock.ratewithgst= Number(this.pstock.rateperunit) + Number(gstamt);
    // console.log(finalamt);
  }

  private getStateList() {
    // // Get Information from JSON REST api
    // var url = this.restService.stateRestURL('', 'India');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response :any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.statelist = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  // submit doc array
  private submitDocarray() {

    // let doc = {
    //   id: this.id,
    //   photos: this.docArray
    // }
    // console.log('submitDocarray function');
    // console.log(doc);
    // // let finalData = this.multiJson(this.appointment);
    // const url = this.restService.productstockRestURL('photoadd', '');
    // this.restService.postFormData(url, doc).subscribe(
    //   (response :any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('', '', 'success');
    //     // }
    //     this.route.navigate(['/managepstock']);
    //     window.scrollTo(0, 0);
    //     //   this.uploadFlag = true;
    //     // this.id = response.id;

    //     //    }
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

  private getprodList() {
    this.prodList = [];
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('byprodtype', this.prodtype);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.prodList = response;
        console.log('product data available');
        this.getproduct();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getallprodList() {
    this.prodList = [];
    // Get Information from JSON REST api
    var url = this.restService.productRestURL('', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        // this.restService.getJSONFromURL(response);
        this.prodList = response;
        console.log('product data available');
        this.getproduct();
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getprod(Id: any) {
    console.log(this.id);

    console.log('in get prod');


    for (let data of this.prodList) {

      console.log(data.name);
      if (Number(data.id) === Number(this.pstock.product)) {

     //   this.pstock.hsncode = data.hsncode;

        this.pstock.product = data.name;
        this.showrateunit=data.rateunit;
        this.producttype=data.prodtype;
     //   alert(this.showrateunit);


      }
    }
    this.getallbranch();

  }

  private getCustList() {
    // // Get Information from JSON REST api
    // var url = this.restService.supplierRestURL('', '');
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response :any) => {
    //     // this.restService.getJSONFromURL(response);
    //     this.custList = response;
    //     console.log('State data available');
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  private deleteNewsList(id: any) {
    if (this.delList.indexOf(id) > -1) {
      // alert('pop');
      this.delList.splice(this.delList.indexOf(id), 1);

    } else {
      this.delList.push(id);
      //  alert('push');
    }
    //   alert(id);
    console.log(this.delList);
  }

  deleteMultiplePhotos() {

    // const delPhots = {
    //   'container': this.id,
    //   'ids': this.delList
    // };
    // if (confirm('Are you sure you want to delete this?')) {
    //   const url = this.restService.productRestURL('MPdelete', '');
    //   console.log('Delete using this id:' + delPhots);
    //   const json = delPhots;
    //   this.restService.postFormData(url, json).subscribe(
    //     (response :any) => {
    //       // Responce data.
    //       console.log('Status on Post API');
    //       console.log(response);
    //       alert('Deleted Successfully');
    //       this.getByid();
    //       // Now do your stuff here
    //     },
    //     error => {
    //       // Error Message
    //       alert('<b>Failed to delete</b><br>' + error.statusText + '<br>'
    //         + error._body);
    //       console.log('Error in data load.');
    //       // Doyour stuff here
    //     }
    //   );
    //   return 0;
    // }
  }

  private onChangeState(obj) {
    let stateId = obj.srcElement.value;
    // Call city data method
    this.getCityList(stateId);
  }

  private getCityList(stateId) {
    // this.citylist = [];
    // // Get Information from JSON REST api
    // var url = this.restService.cityRestURL('', stateId);
    // console.log(stateId);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response :any) => {
    //     this.citylist = response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }

  submitData() {
  //   this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
  //document.getElementById('id01').style.display='block'
  if(this.pstock.soldas!='FULL'){
    // alert('123');
    this.pstock.rateperunit=0;
    // alert(this.pstock.rate);
  }
  this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
  console.log('Product Stock');
  console.log(this.pstockArary);

    console.log('Product Stock');
    console.log(this.pstockArary);
    if (this.pstockArary.length > 0) {
      console.log('submiti function');
      var url = this.restService.productstockRestURL('addm', '');
      console.log(url);
      this.restService.postFormData(url, this.pstockArary).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          console.log(this.pstockArary);
          // Now do your stuff here
          // Swal.fire('', '', 'success');
          window.scrollTo(0, 0);
          // this.tab1 = false;
          // this.tab2 = true;
          this.id = response.id;
          this.statusresponse=response;
          this.pstockArary=[];

          // if(response[0].errCode==='DUPLICATE_PRODUCT_STOCK')
          // {
          //   Swal.fire('DUPLICATE_PRODUCT_STOCK', '', 'warning');
          // }
          // else{
          //   Swal.fire('Added', '', 'success');

          // }
          document.getElementById('id01').style.display='block'

          //  this.route.navigate(['/manageproduct']);

          // alert('added');
          // var url = '/addpstock/' + encodeURIComponent(this.id)+'/'+encodeURIComponent(this.prodtype)+'/'+encodeURIComponent(this.firmid)
          // if(this.route.url === '/addpstock/' + this.id+'/'+this.prodtype+'/'+this.firmid)
          // {
          //   alert('true');
          //   this.cancel();
          // }
          // else
          // {
          //   this.route.navigate(['/manageproduct']);
          // }
        
        //  this.cancel();
       //   this.route.navigate(['/managepstock/' + this.pstock.pname + '/' + this.productid]);
          //console.log('/managepstock/' + this.pstock.pname + '/' + this.id);

          //  this.route.navigate(['/manageappointment', this.userId, this.appointment.mname]);



        },
        error => {
          // Error Message
          this.pstockArary=[];

          Swal.fire(
            'DUPLICATE_PRODUCT_STOCK',
            error._body,
            'error'
          );
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    }
    else {
      Swal.fire(
        'Please, Add Product Stock First',
        '',
        'error'
      );
    }
  }

  // addsubmitdata() {
  //   console.log('submiti function');
  //   // var url = this.restService.studentRestURL('add', '');
  //   // console.log(url);
  //   // console.log(this.student);.
  //   var sdata = { name: "chunky rajesh hariyani", email: "chunkyhariyani@gmail.com", phoneNumber: "9021414785", designation: "DEVELOPER" };
  //   this.restService.postFormData('http://localhost:3000/api/students/send', sdata).subscribe(
  //     (response: any) => {
  //       // Responce data.
  //       console.log('Status on Post API');
  //       console.log(response);
  //       // Now do your stuff here
  //       alert('added');
  //       //   this.route.navigate(['/studentlist']);
  //     },
  //     error => {
  //       // Error Message
  //       alert('error')
  //       console.log('Error in data load.');
  //       // Doyour stuff here
  //     }
  //   );
  // }

  private photoAdd() {
    // alert('inside photo add');

    // this.uploadfile();
    // // if (this.uploadfile()){
    // console.log('submitData function');
    // console.log(this.barimg);
    // const url = this.restService.productstockRestURL('photoadd', '');
    // this.restService.postFormData(url, this.barimg).subscribe(
    //   (response :any) => {
    //     // Responce data.
    //     console.log('Status on Post API');
    //     console.log(response);
    //     // Now do your stuff here
    //     Swal.fire('Added', '', 'success');
    //     window.scrollTo(0, 0);
    //     this.route.navigate(['/managepstock']);
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
    // // }
  }
  /*****upload image********************************************************** */

  fileEvent(fileInput: any) {
    // // alert('file event begin');
    // if (fileInput.target.files[0] != '') {
    //   this.file = fileInput.target.files[0];
    //   // this.fileName = this.user.category;


    //   var reader = new FileReader();
    //   reader.onload = (event: any) => {
    //     this.url = event.target.result;
    //   }
    //   reader.readAsDataURL(fileInput.target.files[0]);


    //   console.log('Inside multiple file select');

    // }

  }

  uploadfile() {
    // alert('Inside upload file');
    // if (this.file) {


    //   alert('Inside  file');
    //   const fileExtension = '.' + this.file.name.split('.').pop();
    //   const rname = Math.random().toString(36).substring(7) + new Date().getTime();

    //   let objDoc = new Object();
    //   this.barimg.barimg.docname = this.file.name;
    //   this.barimg.barimg.doctype = 'barimg';
    //   this.barimg.barimg.docpath = 'product/' + this.id + '/' + rname + this.file.name;

    //   var docFormData = new FormData();
    //   // docFormData.append('doc', this.file, this.fileName);
    //   docFormData.append('doc', this.file, rname + this.file.name);
    //   docFormData.append('name', 'product' + '/' + this.id);
    //   var docurl = this.restService.docsRestURL('upload', '');
    //   console.log(docurl);

    //   this.restService.uploadFormData(docurl, docFormData).subscribe(
    //     (response :any) => {
    //       // Responce data.
    //       console.log('Status on Upload API');
    //       console.log(response);
    //       // Now do your stuff here

    //       return 1;
    //     },
    //     error => {
    //       // Error Message
    //       console.log('Error in doc upload .');
    //       return 0;
    //       // Do your stuff here
    //     }
    //   );


    // } else {

    //   return 0;
    // }

  }

  /*****End  upload image********************************************************** */

  deleteRole(id: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // delete code
        const url = this.restService.productstockRestURL('delete', id);
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
            )
            
            if(this.branchid)
            {
              this.getpstockDatabybranch();
            }
            else
            {
            this.getpstockData();

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

  pushstockvalue() {
    this.pstock.stockval.push(JSON.parse(JSON.stringify(this.stockval)));
    this.stockval.name = '';
    this.stockval.pvalue = '';
  }

  private getProperties() {
    // // Get Information from JSON REST api
    // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29
    let url = this.restService.prodpropRestURL('', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        this.properties = response;
        console.log(response);
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getvalues() {
    // this.propvalues      name

    this.propvalues =[];
    this.stockval.pvalue ='';

    const result1 = this.pstock.stockval.find(x => x.name === this.stockval.name);

    if (!result1) {
      const result = this.properties.find(x => x.name === this.stockval.name);
      console.log(result);
      if (result) {
        this.propvalues = result.possibelvalues;
        if (this.propvalues.length > 0) {
          this.isPossiblevalues = true;
        //  alert('possible');
        } else {
          this.isPossiblevalues = false;
       //   alert('notpossible');
        }
      }

    } else {

      Swal.fire('Duplicate Entry', '', 'error');
    }
  }

  public getallbranch() {
    this.branchlist=[];
    const url = this.restService.branchRestURL('branchbyprodtype', this.producttype);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          console.log(response);
          this.branchlist = response;
          console.log('State data available');
        },
        error => {
          console.log('Error in data load.');
        }
      );
  }

  public getallbranch1() {
    this.branchlist=[];
    const url = this.restService.branchRestURL('', '');
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          console.log(response);
          this.branchlist = response;
          console.log('State data available');
        },
        error => {
          console.log('Error in data load.');
        }
      );
  }

  getprodtypelistbycatgory()
  {
    // http://localhost:8090/SmartSupplyManager/rest/product/search?prodtype=Dry Fruit
    let url = this.restService.prodtypeRestURL('bycategory', this.routecategory);
    this.restService.getJSONFromURL(url).subscribe(
    (response:any) => {
      console.log('Done fatching data from prod property!');
      const res: any = response;
      this.prodtlist = res;
      console.log(response);
    },
    error => {
      console.log('Error in data load.');
    }
  );
  }

  getdatabyprodtype()
  {
    // http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20
    //http://localhost:8090/SmartSupplyManager/rest/product?firm=19341&ptype=JUICE  
    //var api = '?ptype='+this.producttype_byvendor+'&firm='+this.firmid;
    let url = this.restService.productRestURL('byprodtype', this.producttype_byvendor);
    this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');
     // this.proplist = response;
     this.prodList=response;

      if(!this.prodList.length)
      {
        Swal.fire('No Products are available For this Product Type','Please try after sometime or try adding differnet product','warning');
        this.producttype_byvendor='';
      //  this.getdata();
      }

    }, error => {
      console.log('Error in data load.');
    }
  );


  }

}
