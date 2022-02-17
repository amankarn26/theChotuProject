import { RestService } from './../../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
// import { resolve } from 'dns';

@Component({
  selector: 'app-prod-stock',
  templateUrl: './prod-stock.page.html',
  styleUrls: ['./prod-stock.page.scss'],
})
export class ProdStockPage implements OnInit {
  isManageState = true;
  title;
  id;
  productid;
  category = localStorage.getItem('category');

  prodname;

  allData = [];  // Store all data from provider
  filterData = []; // Store filtered data
  pstockArary = [];

  showproductlist = false;
  addproductstock = false;
  editproductstock = false;
  showproductstock = false;

  pstock = {
    firm: localStorage.getItem('firm'),

    pname: '',
    product: '',
    mfg: '',
 //   purchaseprice: '', REMOVED ON 4 AUG 2020
    rateperunit: '',
    gst: 0,
    ratewithgst: 0,
    // status: 'AVAILABLE',
    available:'YES'
    // stockval: []
  };

  stockList=[];


  rateunit;

  isUpdate=false;

  public docServer = this.restService.docServer;
  filteredItems=[];

  segment = 'STOCK';

  spinner = true;

  filter = false;

  prodtypeList=[];
  prodtype;
  constructor(private router: Router,
    private restService: RestService,
    public toastController: ToastController,
    public routprms: ActivatedRoute) {

  }

  ngOnInit() {



    if (this.routprms.snapshot.params.id) {
      this.id = this.routprms.snapshot.params.id;
      this.pstock.product = this.id;
    }

    if (this.routprms.snapshot.params.id) {
      this.prodname = this.routprms.snapshot.params.name;
      this.pstock.pname = this.prodname;
    }

    if (this.routprms.snapshot.params.rateunit) {
      this.rateunit = this.routprms.snapshot.params.rateunit;

    }


    if (this.router.url === '/vendors/prod-stock-add/' + this.id + '/' + encodeURI(this.prodname)
    + '/' + encodeURI(this.rateunit)) {
      this.title = 'Add ' + this.pstock.pname + ' Stock';
      // this.isManageState = false;
      this.addproductstock = true;

    } else if (this.router.url === '/vendors/prod-stock-edit/' + this.id
    + '/' + encodeURI(this.rateunit)) {
      // this.title = 'Edit Product Stock';

      // this.isManageState = false;
      // //    this.getprodList();
      // // this.getByid();
      // this.tab1 = true;

      this.title = 'Update Stock';

      this.editproductstock = true;
      this.getproductStock();



    }
    else if (this.router.url === '/vendors/prod-stock/' + encodeURIComponent(this.id)+ '/' + encodeURI(this.prodname)
     + '/' + encodeURI(this.rateunit)) {
      // this.title = 'Product Stock Details';
      // this.subtitle = '';
      // this.isManageState = false;
      // this.detailFlag = true;
      // this.getByid();
      this.title = this.pstock.pname + ' Stock';
      this.getallStock();
      this.showproductstock = true;
    } else if (this.router.url === '/prod-stockdfd') {
      // this.title = 'Product Stock For ' + this.pname ;
      // this.subtitle = 'Manage product information including view, add, update and delete';
      // this.userType = sessionStorage.getItem('role');
      // this.getpstockData();
      //  this.getByid();
    } else {
      this.title = 'Manage Stock ';
      // this.getallProductdata(); removed on 9/5/2020

      this.showproductlist = true;
      // this.subtitle = 'Manage product information including view, add, update and delete';
      // this.userType = sessionStorage.getItem('role');
     // this.getData();
      // this.getByid();
    }
  }



  ionViewWillEnter(){
    this.getproducttype();
    this.filter = false;

    if (this.routprms.snapshot.params.id) {
      this.id = this.routprms.snapshot.params.id;
      this.pstock.product = this.id;
    }

    if (this.routprms.snapshot.params.id) {
      this.prodname = this.routprms.snapshot.params.name;
      this.pstock.pname = this.prodname;
    }

    if (this.routprms.snapshot.params.rateunit) {
      this.rateunit = this.routprms.snapshot.params.rateunit;
    }

    if (this.router.url === '/vendors/prod-stock-add/' + this.id + '/' + encodeURI(this.prodname)
    + '/' + encodeURI(this.rateunit)) {
      this.title = 'Add ' + this.pstock.pname + ' Stock';
      this.addproductstock = true;

    } else if (this.router.url === '/vendors/prod-stock-edit/' + this.id   + '/' + encodeURI(this.rateunit)) {

      this.title = 'Update Stock';

      this.editproductstock = true;
      this.getproductStock();
    }
    else if (this.router.url === '/vendors/prod-stock/' + encodeURIComponent(this.id)+ '/' + encodeURI(this.prodname)
    + '/' + encodeURI(this.rateunit)) {

      this.title = this.pstock.pname + ' Stock';
      this.getallStock();
      this.showproductstock = true;
    } else if (this.router.url === '/prod-stockdfd') {
    } else {
      this.title = 'Manage Stock ';
      this.getallProductdata();
      this.showproductlist = true;
    }
  }

  getallProductdata() {
    this.allData = [];
    this.filteredItems = [];
    this.spinner = true;
    if (this.segment === 'STOCK') {
      this.getdata();
    } else {
      this.getnotadded();
    }
    // const qerystr = '?category=' + this.category + '&firm=' + localStorage.getItem('firm');


    // // Get Information from JSON REST api
    // const url = this.restService.compactRestURL('getproductsbyfirmcat', qerystr);
    // this.restService.getJSONFromURL(url).subscribe(
    //   (response: any) => {
    //     this.restService.getJSONFromURL(response);
    //     this.allData = response;
    //     this.filteredItems = response;
    //     // return response;
    //   },
    //   error => {
    //     console.log('Error in data load.');
    //   }
    // );
  }


  gotoaddstock(id: any, name: string, rateperunit: string) {
    this.router.navigate(['/vendors/prod-stock-add', id, name, rateperunit]);
  }



  gotoupdatestock(id: any) {
    this.router.navigate(['/vendors/prod-stock-edit', id, this.rateunit]);
  }

  showStock(id: any, name: string, rateperunit: string){   // rateunit added on 19/9/2020
    this.router.navigate(['/vendors/prod-stock', id, name, rateperunit]);
  }

  addstock() {



    this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
    console.log('Product Stock');
    // console.log(this.pstockArary);

    console.log('submiti function');
    var url = this.restService.compactRestURL('stockadd', '');
    console.log(url);
    this.restService.postFormData(url, this.pstockArary).subscribe(
      (response: any) => {
        // Responce data.
        console.log('Status on Post API');
        // console.log(this.pstockArary);
        // Now do your stuff here
        // Swal.fire('', '', 'success');
        window.scrollTo(0, 0);
        // this.tab1 = false;
        // this.tab2 = true;
        this.id = response.id;
        this.presentToast('Stock added sucessfully..!');

        this.router.navigate(['/vendors/prod-stock']);
        // //  this.route.navigate(['/manageproduct']);

        // // alert('added');
        // //     this.route.navigate(['/manageproduct']);
        // this.route.navigate(['/managepstock/' + this.pstock.pname + '/' + this.productid]);
        // console.log('/managepstock/' + this.pstock.pname + '/' + this.id);
      },
      error => {
        // Error Message

        console.log('Error in data load.');
        // Doyour stuff here
      }
    );
    return 0;


  }


  gsttotal() {
    const gstamt = (Number(this.pstock.rateperunit) * Number(this.pstock.gst) / 100);
    this.pstock.ratewithgst = Number(this.pstock.rateperunit) + Number(gstamt);
  }

  async presentToast(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      // position: 'top',
      // animated: true,
      duration: 2000
    });
    toast.present();
  }




  getproductStock() {
  //  const qerystr = '?category=' + this.category + '&firm=' + localStorage.getItem('firm');
  // http://localhost:8090/SmartSupplyManager/rest/product/stock/41

    // Get Information from JSON REST api
    const url = this.restService.compactRestURL('getstockbyid', this.id);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
       this.pstock.pname = response.pname;
       this.pstock.product = response.product;
       this.pstock.mfg = response.mfg;
      //  this.pstock.purchaseprice = response.purchaseprice;
       this.pstock.rateperunit = response.rateperunit;
       this.pstock.gst = response.gst;
       this.pstock.ratewithgst = response.ratewithgst;
       this.pstock.available = response.available;
       this.pstock['id'] = response.id;

      //  this.rateunit = response.rateunit;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  getallStock() {
    //  const qerystr = '?category=' + this.category + '&firm=' + localStorage.getItem('firm');
    // http://localhost:8090/SmartSupplyManager/rest/product/stock/41

      // Get Information from JSON REST api
      const url = this.restService.compactRestURL('getallstock', this.id+'&firm='+ localStorage.getItem('id'));
      this.restService.getJSONFromURL(url).subscribe(
        (response: any) => {
          this.stockList = response;
          console.log( this.stockList );
        },
        error => {
          console.log('Error in data load.');
        }
      );
    }





    updatestock() {

      this.pstockArary.push(JSON.parse(JSON.stringify(this.pstock)));
      console.log('Product Stock');
      // console.log(this.pstockArary);
      console.log('submiti function');
      var url = this.restService.compactRestURL('editstock', '');
      console.log(url);
      this.restService.postFormData(url, this.pstock).subscribe(
        (response: any) => {
          // Responce data.
          console.log('Status on Post API');
          window.scrollTo(0, 0);
          this.presentToast('Stock updated sucessfully..!');
          this.cancel();
        },
        error => {
          // Error Message
          console.log('Error in data load.');
          // Doyour stuff here
        }
      );
      return 0;
    }


    cancel() {
      // goBack code fro cancel button
      window.history.back();
    }

    getItems(ev) {
      // Reset items back to all of the items
     this.filteredItems = this.allData;

      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.filteredItems = this.filteredItems.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }




getdata()
{

  let api;
  console.log('filter='+ this.filter);
  // alert('1');
  if (this.filter) {
    // alert('2');
    api = '?branch=' + localStorage.getItem('firm') + '&ptype=' + this.prodtype; // this.id;

  } else {
    // alert('3');
    api = '?branch=' + localStorage.getItem('firm'); // this.id;
  }

  // alert(api);

  // api = '?firm=' + localStorage.getItem('firm'); // this.id;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      this.allData = response;
      this.filteredItems = response;

      this.spinner = false;

    }, error => {
      console.log('Error in data load.');
      this.spinner = false;
    }
  );


}

getnotadded()
{


  let api;
  console.log('filter='+ this.filter);
  // alert('1');
  if (this.filter) {
    // alert('2');
    api = '/notstock?branch=' + localStorage.getItem('firm') + '&ptype=' + this.prodtype; // this.id;

  } else {
    // alert('3');
    api = '/notstock?branch='+ localStorage.getItem('firm'); // this.id;
  }





  // var api = '/notstock?firm='+ localStorage.getItem('firm'); // this.id;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      this.allData = response;
      this.filteredItems = response;
      this.spinner = false;

    }, error => {
      console.log('Error in data load.');
      this.spinner = false;
    }
  );
}

async segmentChanged(obj) {
  console.log(obj);
  console.log(this.segment);
  this.getallProductdata();
}



changeFilter(){

  if(this.filter){
    this.filter = false;
    this.getallProductdata();
  }else{
    this.filter = true;
    this.getallProductdata();
  }

}

getproducttype()
{
  this.spinner = true;
  // var api =  '/prodtype?category='+ localStorage.getItem('firm'); // this.id;
  let url = this.restService.compactRestURL('getprodtypebycat', localStorage.getItem('category'));
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');
      this.prodtypeList = response;
      this.spinner = false;
    }, error => {
      console.log('Error in data load.');
      this.spinner = false;
    }
  );
}


  deletestock(id: any) {
    console.log('Delete Stock');
    this.spinner = true;
    const url = this.restService.compactRestURL('deletestock', id);
    this.restService.deleteFormData(url).subscribe(
      (response: any) => {
        console.log('Done fatching data from prod property!');
        this.allData = response;
        this.filteredItems = response;
        this.cancel();
        this.spinner = false;

      }, error => {
        console.log('Error in data load.');
        this.spinner = false;
      }
    );
  }

}
