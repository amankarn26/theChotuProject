import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../services/rest.service';

declare var Swal: any;
@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css']
})
export class CategorypageComponent implements OnInit {

  constructor(private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }


public availablestock;
  
  public stockavailable;
  public productdata=[];

  public varientname;
  public firmlist=[];
  prodquantity=1;
  public routeid;
  public routecategory;
  public docServer = this.restService.docServer;

  public pstockdata:any=[];

  public varientnamefromresponse;
  public stockdata;
  public firmname;
  items=[];

  public prodouctid;
  public producttypedata=[];

  public producttype;


public isduplicatefirm=true;

public isduplicate = false;


  ngOnInit() {
    if (this.routprms.snapshot.params['category']) {
      this.routecategory = this.routprms.snapshot.params['category'];
    }

    if (this.routprms.snapshot.params['id']) {
      this.routeid = this.routprms.snapshot.params['id'];
    }
this.countcart();
    console.log(this.routecategory);
    console.log(this.routeid);
this.getfirmlist();
// this.getpopularproduct();
  }



  countcart() {
    console.log(this.items.length);
    console.log(this.items);
if(sessionStorage.getItem('items'))
{
  this.items= JSON.parse(sessionStorage.getItem('items'));
}
console.log(this.items);


  }

  public getfirmlist() {
    this.firmlist=[];
    //http://localhost:8090/SmartSupplyManager/rest/compact?cat=Kirana 
    const url = this.restService.firmRestURL('firmbycat', this.routecategory);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          console.log(response);
          this.firmlist = response;
          console.log('State data available');
       //   this.producttype=response.prodtype;
        },
        error => {
          console.log('Error in data load.');
        }
      );
  }

  public getproductdatalist() {
    this.producttypedata=[];
    //http://localhost:8090/SmartSupplyManager/rest/compact?cat=Kirana 
    const url = this.restService.prodtypeRestURL('byfirmprodtype', this.firmname);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          console.log(response);
          this.producttypedata = response;
          this.producttype=null;
          console.log('State data available');
        },
        error => {
          console.log('Error in data load.');
        }
      );
  }

  // private getpopularproduct() {
  //   // Get Information from JSON REST api
  
  //   var url = this.restService.compactRestURL('popularproducts', '');
  //   this.restService.getJSONFromURL(url).subscribe(
  //     (response :any) => {
  //       this.restService.getJSONFromURL(response);
  //       this.productdata = response;
  //       console.log(response);
  //     },
  //     error => {
  //       console.log('Error in data load.');
  //     }
  //   );
  // }

getstockbyid(i : any)
{

     
      const url = this.restService.productstockRestURL('details', this.varientname);
      this.restService.getJSONFromURL(url).subscribe(
        (response :any) => {
          this.restService.getJSONFromURL(response);
          console.log(response);
          this.stockdata = response;
          this.varientnamefromresponse=response.mfg;
          this.prodouctid=response.product;
          console.log('State data available');
          this.getstockdetailsbystock(i,response);
      //  this.changepstock(response);
        },
        error => {
          console.log('Error in data load.');
        }
      );
}


getstockdetailsbystock(i:any ,data : any)
{
// http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

  var api = '?prod='+data.product+'&firm='+data.firm;
  let url = this.restService.productRestURL('compact', api);
  this.restService.getJSONFromURL(url).subscribe(
    (response : any )=> {
      console.log('Done fatching data from prod property!');

      console.log(response);
      this.stockdata=response;
      this.stockavailable=response.status;
      this.pstockdata=response.pstock;
     this.changepstock(i)


    }, error => {
      console.log('Error in data load.');
    }
  );


}


changepstock(i:any)
{

console.log(this.varientnamefromresponse);
console.log(this.pstockdata);

for(let data of this.pstockdata)
{
if(this.varientnamefromresponse===data.mfg)
{
  console.log('without round off')
  console.log(data.gstamt+'............'+data.rateperunit+'...........'+data.gst)

  this.stockdata['rateperunit']=Math.round(data.rateperunit);
  this.stockdata['gstamt']=Math.round(data.gstamt);
  this.stockdata['gst']=Math.round(data.gst);
  this.productdata[i].rateperunit=Math.round(data.rateperunit);

  this.productdata[i].available=data.available;

  this.availablestock=data.available;


}
}

console.log(this.stockdata);


}

  


  getstockdetails()
  {
 // http://localhost:8090/SmartSupplyManager/rest/compact?prod=19174&firm=20

 //http://localhost:8090/SmartSupplyManager/rest/product?firm=19341&ptype=JUICE

    var api = '?ptype='+this.producttype+'&firm='+this.firmname;
    let url = this.restService.productRestURL('product', api);
    this.restService.getJSONFromURL(url).subscribe(
      (response : any )=> {
        console.log('Done fatching data from prod property!');
       // this.proplist = response;
        this.productdata=response;
        this.productdata['rateperunit']=0;
        this.stockavailable=response.status;
        if(!this.productdata.length)
        {
          Swal.fire('No Products are available For this Product Type','Please try after sometime or try adding differnet product','warning');
          this.producttype='';
        }

      }, error => {
        console.log('Error in data load.');
      }
    );


  }



  checkduplication() {
    let items=[];
    if (sessionStorage.getItem('items')) {
      items = JSON.parse(sessionStorage.getItem('items'));
      console.log(items);
      for (const product of items) {
        if (product.id == this.prodouctid && product.mfg === this.varientnamefromresponse) {
          this.isduplicate = true;

        }
      }
    }
  }

  
  checkfirmduplicate() {
    let items=[];
    if (sessionStorage.getItem('items')) {
      items = JSON.parse(sessionStorage.getItem('items'));
      console.log(items);
      for (const product of items) {
        if (product.firm != this.firmname) {
        
          this.isduplicatefirm = false;

        }
      }
    }
  }

  
  public book() {
    console.log(this.stockdata);
    let productdata = this.stockdata;
    console.log('************** Branch is ::::'+this.firmname)
    this.checkfirmduplicate();
    if(this.isduplicatefirm===false)
    {
   
      Swal.fire({
        title: 'Are you sure?',
        // text: 'You will not be able to recover this data!',
        text: 'Changing branch will clear your Cart, Do you wish to proceed?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Clear it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          // delete code
      
          sessionStorage.removeItem('items');

           Swal.fire({ title: "Added to cart!", icon:"success", timer: 800});

          console.log(productdata)
          let items=[];
          if(sessionStorage.getItem('items'))
          {
           console.log('in IF condition');
      
            items = JSON.parse(sessionStorage.getItem('items'));
            productdata['mfg']=this.varientnamefromresponse;
            productdata['qty']=this.prodquantity;
            productdata['stockStatus']='YES';

            productdata.firm=Number(this.firmname);
            items.push(productdata);
            this.prodquantity=0;
          }
         else{
           console.log('in else condition');
           productdata['mfg']=this.varientnamefromresponse;
          productdata['qty']=this.prodquantity;
          productdata['stockStatus']='YES';

          productdata.firm=Number(this.firmname);
          items.push(productdata);
          this.prodquantity=0;
      
         }
         sessionStorage.setItem('items',JSON.stringify(items));
        // this.route.navigate(['/mycart']);
        this.countcart();
        this.prodouctid='';
        this.varientname=null;
        this.isduplicatefirm=undefined;
      
          // delete code end
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your data is safe :)',
            'error'
          );
          this.firmname=null;
        }
      });
    
    
    }
    else{


    this.checkduplication();
   if(this.isduplicate===true && this.prodquantity >0)
   {
     console.log(this.prodquantity);
    Swal.fire({ title: "Quantity updated!", icon:"warning", timer: 800});
    this.addProduct(this.stockdata);
    this.isduplicate=false;
    this.prodouctid=null;
    this.varientname=null;
    this.prodquantity=null;
  // this.route.navigate(['/mycart']);

   }
    else{
      
    // console.log(this.prodquantity);
    // alert(this.prodquantity);
   
if(this.prodquantity===null ||this.prodquantity===undefined ||  this.prodquantity<0)
{
  Swal.fire('Quantity Cannot be Null','','error');
}else
{
   Swal.fire({ title: "Added to cart!", icon:"success", timer: 800});

    console.log(productdata)
    let items=[];
    if(sessionStorage.getItem('items'))
    {
     console.log('in IF condition');

      items = JSON.parse(sessionStorage.getItem('items'));
      productdata['mfg']=this.varientnamefromresponse;
      productdata['qty']=this.prodquantity;
      productdata['stockStatus']='YES';

      productdata.firm=Number(this.firmname);
      items.push(productdata);
      this.prodquantity=0;
    }
   else{
     console.log('in else condition');
     productdata['mfg']=this.varientnamefromresponse;
    productdata['qty']=this.prodquantity;
    productdata['stockStatus']='YES';

    productdata.firm=Number(this.firmname);
    items.push(productdata);
    this.prodquantity=0;

   }
   sessionStorage.setItem('items',JSON.stringify(items));
  // this.route.navigate(['/mycart']);
  this.countcart();
  this.prodouctid='';
  this.varientname=null;
  
  }
  
}
    }
}

addProduct(product) {


  const result1 = this.items.find(x => x.id == product.id);
  
  if (result1) {
  console.log('Existing Item added to cart');
  for (let obj of this.items) {
  if (obj.id == product.id) {
  obj.qty = Number(obj.qty) + Number(this.prodquantity);

  console.log(obj.qty);
  }
  }
}
  
  sessionStorage.setItem('items', JSON.stringify(this.items));
  }



setquantity() {
  if(this.varientname===null || this.varientname==='' || this.varientname===undefined)
  {
    Swal.fire('Please select the varient to proceed','','question');

  }
  else
  {


  console.log(this.availablestock);
  console.log(this.stockdata['rateunit']);
if(this.availablestock==='NO')
{
  Swal.fire('Stock Not Availble for the variant'+' '+this.varientnamefromresponse,'please try another variant','info');
}
else
{

  if(this.stockdata['rateunit'] ==='RATEPERKG' )
  {
  //  0.100, 0.250, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
    const { value: fruit } =  Swal.fire({
      title: 'You need to select the Quantity',
      html:'<p style=" color: blue; font-size: 14.5px; ">*For Quantity Greater than 12KG, Add to cart Multiple Times.</p>',
      input: 'select',
      inputOptions: {
        // 'Grams': {
        //   100: '100',
        //   250: '250',
        //   grapes: 'Grapes',
        //   oranges: 'Oranges'
        // },
        // 'Vegetables': {
        //   potato: 'Potato',
        //   broccoli: 'Broccoli',
        //   carrot: 'Carrot'
        // },
        '0.100': '100 Grams',
        '0.250': '250 Grams',
        '0.500': '500 Grams',
        '1': '1 KG',
        '1.5': '1.5 KG',
        '2': '2 KG',
        '2.5': '2.5 KG',
        '3': '3 KG',
        '3.5': '3.5 KG',
        '4': '4 KG',
        '4.5': '4.5 KG',
        '5': '5 KG',
        '5.5': '5.5 KG',
        '6': '6 KG',
        '6.5': '6.5 KG',
        '7': '7 KG',
        '7.5': '7.5 KG',
        '8': '8 KG',
        '8.5': '8.5 KG',
        '9': '9 KG',
        '9.5': '9.5 KG',
        '10': '10 KG',
        '10.5': '10.5 KG',
        '11': '11 KG',
        '11.5': '11.5 KG',
        '12': '12 KG',
       

      },
      inputPlaceholder: 'Select Gram/KG',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {

            console.log(value);
            this.prodquantity=value;
            resolve("")
            this.book();
            
          } else {
            resolve('You need to select atleast one category ')
          }
        })
      }
    })
  }
  else if(this.stockdata['rateunit'] ==='RATE_PER_LITRE' )
  {
  //  0.100, 0.250, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
    const { value: fruit } =  Swal.fire({
      title: 'You need to select the Quantity',
      html:'<p style=" color: blue; font-size: 14px; ">*For Quantity Greater than 12 Litre, Add to cart Multiple Times.</p>',

      input: 'select',
      inputOptions: {
        // 'Grams': {
        //   100: '100',
        //   250: '250',
        //   grapes: 'Grapes',
        //   oranges: 'Oranges'
        // },
        // 'Vegetables': {
        //   potato: 'Potato',
        //   broccoli: 'Broccoli',
        //   carrot: 'Carrot'
        // },
        // '0.100': '100 Grams',
        '0.250': '250 ML',
        '0.500': '500 ML',
        '1': '1 Litre',
        '1.5': '1.5 Litre',
        '2': '2 Litre',
        '2.5': '2.5 Litre',
        '3': '3 Litre',
        '3.5': '3.5 Litre',
        '4': '4 Litre',
        '4.5': '4.5 Litre',
        '5': '5 Litre',
        '5.5': '5.5 Litre',
        '6': '6 Litre',
        '6.5': '6.5 Litre',
        '7': '7 Litre',
        '7.5': '7.5 Litre',
        '8': '8 Litre',
        '8.5': '8.5 Litre',
        '9': '9 Litre',
        '9.5': '9.5 Litre',
        '10': '10 Litre',
        '10.5': '10.5 Litre',
        '11': '11 Litre',
        '11.5': '11.5 Litre',
        '12': '12 Litre',
       

      },
      inputPlaceholder: 'Select Litre',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {

            console.log(value);
            this.prodquantity=value;
            resolve('')
            this.book();
            
          } else {
            resolve('You need to select atleast one category ')
          }
        })
      }
    })
  }
  else{
      Swal.fire({
    title: "Please Enter the Quantity",
    text: "Quantity is Mandatory",
    input: 'number',
    showCancelButton: true        
}).then((result) => {
    if (result.value) {
      
      this.prodquantity=result.value
     this.book();
 
    }
});
  }



}

}

}
}
