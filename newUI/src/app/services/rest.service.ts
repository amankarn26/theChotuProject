import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Bug } from './bug';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { API_BASE_URL } from './config';
declare var Swal: any;


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  public ip = "https://aaitheantiquebake.com"

  public staticIp = "https://aaitheantiquebake.com:8443"

  //  https://jgl.inouvelleapps.com

  // http://localhost:8090 /etc/postgresql/12/main/

  public server = this.ip + '/MoleculeManager';
  public docServer = this.ip + '/moleculedocs';
  public imgServer = this.ip + '/moleculedocs';

  public firmid = sessionStorage.getItem('firm');
  public branchid = sessionStorage.getItem('branch');
  BranchRestURL: any;
  // branchid: string;

  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) public baseUrl?: string) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Http Headers
  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'form-data'
    })
  };

  public enableloading() {
    setTimeout(() => {
      Swal.fire('Hold On ! ..', 'We are Retrieving your data');
      Swal.showLoading();
    }, 500); // 5000 
    //this.disableload();
  }

  public disableloading() {
    //   Swal.disableLoading();
    setTimeout(() => { Swal.close(); }, 500); // 5000
    // Swal.close();
  }

  public servererror() {
    Swal.fire('Cannot get Response from Server !', '', 'info');
  }

  // Get Data
  public getJSONFromURL(url) {
    /* const headers = new Headers();
     headers.append('Authorization', 'Basic' + btoa('erpadmin' + ':' + 'password'));*/
    //  headers.append('Content-Type', 'application/json, text/plain, */*');

    /* headers.append('Authorization', 'Basic' + btoa('erpadmin' + ':' + 'password'));
      headers.append('Content-Type', 'application/json');*/
    //  headers.append('Accept', 'application/json, text/plain, */*');
    /*   headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
       headers.append('Access-Control-Allow-Credentials', 'true');*/
    /*
    'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'true'
        */
    /*
        var options = new RequestOptions({
          headers: new Headers({
            'Accept': 'application/json',
            'Authorization': 'Basic ZXJwYWRtaW46cGFzc3dvcmQ=',
          })
        });*/
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(url); // .map((response:any) => response.json());


    // GET

  }

  // Post Data
  public postFormData(url, json) {
    const headers = new Headers();
    // headers.append('Authorization', 'Basic ZXJwYWRtaW46cGFzc3dvcmQ=');
    // headers.append('Authorization', 'Basic ' + btoa('erpadmin' + ':' + 'password'));
    //  headers.append('Content-Type', 'application/json');
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(url, json, options)
    //   .map(res => {
    //     let newReview = res.json();
    //     console.log('service method: ' + newReview);
    //     return newReview;
    //   });
    // let responsedata = {};

    return this.http.post(url, json, this.httpOptions).pipe(
      map(res => {
        const postresponse = res;
        console.log('service method: ' + postresponse);
        return postresponse;
      })
    );
  }

  public uploadFormData(url, formdata) {
    const headers = new Headers();
    // const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // const options = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.post(url, formdata)
      .pipe(map(res => {
        const postresponse = res;
        console.log('service method: ' + postresponse);
        return postresponse;
      }));
  }

  // Delete Data
  public deleteFormData(url) {
    // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    // let options = new RequestOptions({ headers: headers }); // Create a request option

    // return this.http.delete(url, options)
    //   .map((response:any) => response.json());

    // this.httpOptions
    return this.http.delete(url).pipe(
      map((res: Response) => {
        const deleteresponse = res; // .json();
        console.log('service method: ');
        console.log(deleteresponse);
        console.log('end delete response in rest');

        return deleteresponse;
      })
    );

    // return this.http.delete(url, this.httpOptions).pipe(
    //   map((response:any) => response.json())
    // );
  }

  public customUpload(restid, type) {
    let url = this.staticIp;
    switch (restid) {
      case 'upload':
        url += '/upload';
        break;
      default:
        url += '/upload/' + type;
        break;
    }
    return url;
  }


  public homepageURL(restid, data) {
    var url = this.server;
    switch (restid) {
      case 'best':
        url += '/dish/bestseller?category=' + data;
        break;
      case 'dish':
        url += '/dish?' + data;
        break;
      case 'event':
        url += '/event';
        break;
      case 'menutype':
        url += '/dish/menutype' + data;
        break;
      default:
        url += '/event';
        break;
    }
    return url;
  }

  public advertisementRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/advertisement';
        break;
      case 'edit':
        url += '/advertisement/update';
        break;
      case 'details':
        url += '/advertisement/' + userId;
        break;
      case 'delete':
        url += '/advertisement/' + userId;
        break;
      case 'allproducttype':
        url += '/product/prodtype/' + userId;
        break;
      default:
        url += '/advertisement';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public discountRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/discount';
        break;
      case 'edit':
        url += '/discount/update';
        break;

      case 'all':
        url += '/discount?all=YES';
        break;


      // case 'getofferbycouponcode':
      //   url += '/offer?coupon' + couponcode;
      //   break;

      case 'details':
        url += '/discount/' + userId;
        break;
      case 'delete':
        url += '/discount/' + userId;
        break;
      case 'allproducttype':
        url += '/product/prodtype/' + userId;
        break;

      case "getcoupanbyname":
        url += "/discount?coupon=" + userId;
        break;


      default:
        url += '/discount';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public eventRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/event';
        break;
      case 'edit':
        url += '/event/update';
        break;
      case 'details':
        url += '/event/' + userId;
        break;
      case 'delete':
        url += '/event/' + userId;
        break;
      case 'allproducttype':
        url += '/product/prodtype/' + userId;
        break;
      case 'getAll':
        url += '/event?all=YES';
        break;
      default:
        url += '/event';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public stateRestURL(restid, countryId) {
    let url = this.server;
    switch (restid) {
      // http://localhost:8090/SmartSupplyManager/rest/common/state?country=India
      default:
        url += '/common/state?country=' + 'India';
        break;
    }
    return url;
  }

  public PincodeRestURL(restid, pincodeId) {
    let url = this.server;
    switch (restid) {
      default:
        url += '/common/pincode?pin=' + pincodeId;
        break;
    }
    return url;
  }

  public cityRestURL(restid, stateId) {
    let url = this.server;
    switch (restid) {
      //http://localhost:8090/SmartSupplyManager/common/pincode?city=Nagpur

      case 'pincodesbycity':
        url += '/common/pincode?city=' + stateId;
        break;

      default:
        //  url += '/cities?state=' + stateId;
        url += '/common/city?state=' + stateId;
        break;
    }
    return url;
  }

  public branchRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/branch';
        break;

      case 'edit':
        url += '/branch/update';
        break;

      case 'details':
        url += '/branch/' + userId;
        // url += '/court/getById/' + userId;
        break;

      // case 'branchid':
      //   url += '/branch/' + userId;
      //   break;

      case 'delete':
        url += '/branch/' + userId;
        break;

      case 'logoadd':
        url += '/branch/photo';
        break;

      case 'config':
        url += '/system?branch=' + userId;
        break;

      case 'configadd':
        url += '/system/addM';
        break;

      case 'configdelete':
        url += '/system/' + userId;
        break;

      case 'branchbycat':
        url += '/compact?cat=' + userId;
        break;

      case 'branchbyprodtype':
        url += '/compact?ptype=' + userId;
        break;

      case 'allbranchbyprodavailable':
        url += '/compact?prod=' + userId;
        break;

      case 'todayspayableV':
        url += '/branch/payable?type=TODAY';
        break;

      case 'todaysreceivedV':
        url += '/branch/received?type=TODAY';
        break;

      case 'yestpayableV':
        url += '/branch/payable?type=YESTERDAY';
        break;

      case 'cashorderR':
        url += '/branch/received/cash?type=CASH&daytype=' + userId;
        break;

      case 'cashorderP':
        url += '/branch/payable/cash?type=CASH&daytype=' + userId;
        break;

      case 'yestreceivedV':
        url += '/branch/received?type=YESTERDAY';
        break;

      case 'branchlistbycat':
        url += '/branch?category=' + userId;
        break;

      case 'branch_braodcast':
        url += '/branch/bulk';
        break;

      case 'branchearnings':
        url += '/branch/earning' + userId;
        break;

      case 'branchosearch':
        url += '/branch' + userId;
        break;

      case 'monthly_invoice':
        url += '/branch/monthly/invoice';
        break;

      case 'invoice_paid':
        url += '/branch/paid/vendor?' + userId;
        break;

      case 'invoice_not_paid':
        url += '/branch/notpaid/vendor?' + userId;
        break;

      default:
        url += '/branch';
        break;
    }
    return url;
  }

  public firmRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/firm';
        break;
      case 'edit':
        url += '/firm/update';
        break;
      case 'details':
        url += '/firm/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/firm/' + userId;
        break;
      case 'logoadd':
        url += '/firm/logo';
        break;
      case 'config':
        url += '/system?firm=' + userId;
        break;
      case 'configadd':
        url += '/system/addM';
        break;

      case 'configdelete':
        url += '/system/' + userId;
        break;

      case 'firmbycat':
        url += '/compact?cat=' + userId;
        break;

      case 'firmbyprodtype':
        url += '/compact?ptype=' + userId;
        break;

      case 'allfirmbyprodavailable':
        url += '/compact?prod=' + userId;
        break;

      case 'todayspayableV':
        url += '/firm/payable?type=TODAY';
        break;

      case 'todaysreceivedV':
        url += '/firm/received?type=TODAY';
        break;

      case 'yestpayableV':
        url += '/firm/payable?type=YESTERDAY';
        break;

      case 'cashorderR':
        url += '/firm/received/cash?type=CASH&daytype=' + userId;
        break;

      case 'cashorderP':
        url += '/firm/payable/cash?type=CASH&daytype=' + userId;
        break;

      case 'yestreceivedV':
        url += '/firm/received?type=YESTERDAY';
        break;

      case 'firmlistbycat':
        url += '/firm?category=' + userId;
        break;

      case 'vendor_braodcast':
        url += '/firm/bulk';
        break;


      case 'firmearnings':
        url += '/firm/earning' + userId;
        break;

      case 'firmosearch':
        url += '/firm' + userId;
        break;


      case 'monthly_invoice':
        url += '/firm/monthly/invoice';
        break;

      // case 'invoice_paid':
      //   url += '/firm/paid/vendor?' + userId;
      //   break;

      case 'invoice_paid':
        // common/date?numdays
        url += '/common/date?numdays=6';
        break;

      case 'invoice_not_paid':
        url += '/firm/notpaid/vendor?' + userId;
        break;

      default:
        url += '/firm';
        break;
    }
    return url;
  }

  public actcatRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/acctcategory/add';
        break;
      case 'edit':
        url += '/acctcategory/update';
        break;
      case 'details':
        url += '/acctcategory/id/' + userId;
        break;
      case 'delete':
        url += '/category/delete';
        break;
      default:
        url += '/acctcategory';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public actRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/account/add';
        break;
      case 'edit':
        url += '/account/update';
        break;
      case 'details':
        url += '/account/id/' + userId;
        break;
      case 'delete':
        url += '/account/delete';
        break;
      default:
        url += '/account';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public accountRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/account';
        break;
      case 'edit':
        url += '/account/update';
        break;
      case 'details':
        url += '/account/' + userId;
        break;
      case 'delete':
        url += '/account' + userId;
        break;
      case 'accountByid':
        url += '/account?firm=' + this.firmid;
        break;

      default:
        url += '/account?firm=' + this.firmid;
        break;
    }
    return url;
  }

  public catRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/category';
        break;
      case 'edit':
        url += '/category/update';
        break;
      case 'details':
        url += '/category/' + userId;
        break;
      case 'delete':
        url += '/category/' + userId;
        break;
      case 'allproducttype':
        url += '/dish/menutype/' + userId;
        break;
      default:
        url += '/category';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  // public delivertypoolRestURL(restid, userId) {
  //   var url = this.server;
  //   switch (restid) {
  //     case 'add':
  //       url += '/deliverypool';
  //       break;
  //     case 'edit':
  //       url += '/deliverypool/update';
  //       break;
  //     case 'details':
  //       url += '/deliverypool/' + userId;
  //       break;
  //     case 'delete':
  //       url += '/deliverypool/' + userId;
  //       break;

  //     case 'addarea':
  //       url += '/deliverypool/area/update';
  //       break;

  //     case 'addarea':
  //       url += '/common/area';
  //       break;

  //     case 'deletearea':
  //       url += '/common/area/' + userId;
  //       break;


  //     case 'getareabyid':
  //       url += '/common/area/' + userId;
  //       break;

  //     case 'updatearea':
  //       url += '/deliverypool/area/' + userId;
  //       break;

  //     case 'areadelete':
  //       url += '/deliverypool/area/' + userId;
  //       break;


  //     case 'areadeletefromupdate':
  //       url += '/deliverypool/area/delete';
  //       break;
  //     case 'todayspayableD':
  //       url += '/deliverypool/payable?type=TODAY';
  //       break;

  //     case 'todaysreceivedD':
  //       url += '/deliverypool/received?type=TODAY';
  //       break;

  //     case 'cashorderP_D':
  //       url += '/deliverypool/payable/cash?type=CASH&daytype=' + userId;
  //       break;

  //     case 'cashorderR_D':
  //       url += '/deliverypool/received/cash?type=CASH&daytype=' + userId;
  //       break;

  //     case 'yestpayableD':
  //       url += '/deliverypool/payable?type=YESTERDAY';
  //       break;

  //     case 'yestreceivedD':
  //       url += '/deliverypool/received?type=YESTERDAY';
  //       break;


  //     case 'todaysreceivedCustomer':
  //       url += '/order/cancel/received?type=TODAY';
  //       break;


  //     case 'todayspayableCustomer':
  //       url += '/order/cancel/payable?type=TODAY';
  //       break;

  //     case 'cancelbydate':
  //       url += '/order/cancel' + userId;
  //       break;

  //     case 'yestpayableCustomer':
  //       url += '/order/cancel/payable?type=YESTERDAY';
  //       break;

  //     case 'yestreceivedCustomer':
  //       url += '/order/cancel/received?type=YESTERDAY';
  //       break;


  //     case 'deliverypoolosearch':
  //       url += '/deliverypool' + userId;
  //       break;


  //     case 'getdeliveryppol':
  //       url += '/deliverypool/assign?' + userId;
  //       break;


  //     case 'photoadd':
  //       url += '/deliverypool/doc';
  //       break;
  //     default:
  //       url += '/deliverypool';
  //       break;
  //   }
  //   return url;
  // }

  public delivertypoolRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/deliverypool';
        break;
      case 'edit':
        url += '/deliverypool/update';
        break;
      case 'details':
        url += '/deliverypool/' + userId;
        break;
      case 'delete':
        url += '/deliverypool/' + userId;
        break;

      // case 'addarea':
      //   url += '/common/area';
      //   break;

      case 'addarea':
        url += '/common/area';
        break;

      // case 'addarea':
      //   url += '/deliverypool/area';
      //   break;

      case 'deletearea':
        url += '/common/area/' + userId;
        break;

      // case 'deletearea':
      //   url += '/common/area/' + userId;
      //   break;


      case 'getareabyid':
        url += '/common/area/' + userId;
        break;

      case 'updatearea':
        url += '/deliverypool/area/' + userId;
        break;

      case 'areadelete':
        url += '/deliverypool/area/' + userId;
        break;

      case 'areadeletefromupdate':
        url += '/deliverypool/area/delete';
        break;

      // case 'todayspayableD':
      //   url += '/deliverypool/payable?type=TODAY';
      //   break;

      // last month
      case 'yestpayableD':
        url += '/deliverypool/payable?type=LASTMONTH';
        break;

      // current month
      case 'todayspayableD':
        url += '/deliverypool/payable?type=THISMONTH';
        break;

      // last month
      case 'yestreceivedD':
        url += '/deliverypool/received?type=LASTMONTH';
        break;

      // current month
      case 'todaysreceivedD':
        url += '/deliverypool/received?type=THISMONTH';
        break;

      case 'cashorderP_D':
        url += '/deliverypool/payable/cash?type=CASH&daytype=' + userId;
        break;

      case 'cashorderR_D':
        url += '/deliverypool/received/cash?type=CASH&daytype=' + userId;
        break;


      case 'todaysreceivedCustomer':
        url += '/order/cancel/received?type=TODAY';
        break;

      case 'todayspayableCustomer':
        url += '/order/cancel/payable?type=TODAY';
        break;

      case 'cancelbydate':
        url += '/order/cancel' + userId;
        break;

      case 'yestpayableCustomer':
        url += '/order/cancel/payable?type=YESTERDAY';
        break;

      case 'yestreceivedCustomer':
        url += '/order/cancel/received?type=YESTERDAY';
        break;

      case 'deliverypoolosearch':
        url += '/deliverypool' + userId;
        break;

      case 'getdeliveryppol':
        url += '/deliverypool/assign?' + userId;
        break;

      case 'photoadd':
        url += '/deliverypool/doc';
        break;

      case 'delivery_charges':
        url += '/deliverypool/dcharge';
        break;

      case 'delivery_charges_param':
        url += '/deliverypool/dcharge' + userId;
        break;

      case 'delivery_chargesDel':
        url += '/deliverypool/dcharge/' + userId;
        break;

      case 'delivery_chargesM':
        url += '/deliverypool/dcharge/addM';
        break;

      case 'deliverycharge_details':
        url += '/deliverypool/dcharge/' + userId;
        break;

      default:
        url += '/deliverypool';
        // url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public prodtypeRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/product/prodtype';
        // http://localhost:8090/SmartSupplyManager/rest/product/prodtype
        break;
      case 'edit':
        url += '/product/prodtype/update';
        break;
      case 'details':
        url += '/product/prodtype/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/product/prodtype/' + userId;
        break;
      case 'logoadd':
        url += '/product/logo/add';
        break;
      case 'photoadd':
        url += '/product/prodtype/update';
        break;
      case 'prodtypenew':
        url += '/product/prodtype/name';
        break;
      case 'bybranchprodtype':
        url += '/product/prodtype?branch=' + userId;
        break;
      case 'bycategory':
        url += '/product/prodtype?category=' + userId;
        break;
      default:
        url += '/product/prodtype';
        break;
    }
    return url;
  }

  public menutypeRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/dish/menutype';
        // http://localhost:8090/SmartSupplyManager/rest/product/prodtype
        break;
      case 'edit':
        url += '/dish/menutype/update';
        break;
      case 'details':
        url += '/dish/menutype/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/dish/menutype/' + userId;
        break;
      case 'logoadd':
        url += '/dish/logo/add';
        break;
      case 'photoadd':
        url += '/dish/menutype/update';
        break;
      case 'prodtypenew':
        url += '/dish/menutype/name';
        break;
      case 'bybranchprodtype':
        url += '/dish/menutype?branch=' + userId;
        break;
      case 'bycategory':
        url += '/dish/menutype?category=' + userId;
        break;
      default:
        url += '/dish/menutype';
        break;
    }
    return url;
  }

  public vouherRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'addPorder':
        url += '/porder/history/add';
        // http://localhost:8090/IMBAManager/rest/porder/history/add
        break;
      case 'edit':
        url += '/porder/update';
        break;
      case 'details':
        url += '/account/voucher/' + userId;
        break;
      // http://localhost:8090/IMBAManager/rest/account/voucher/id/214
      // case 'vouchers':
      //  // url += '/account/voucher/id/' + userId;
      //   url += '/voucher/vdetail?voucher=' + userId;
      //   break;
      // http://localhost:8090/SuppChainManager/rest/voucher/vdetail?voucher=19599
      case 'pinwarddetails':
        url += '/voucher/pdetail';
        break;
      case 'delete':
        url += '/voucher/' + userId;
        break;

      case 'addvoucher':
        url += '/account/voucher';
        break;


      case 'supplierByid':
        url += '/porder?firm=' + userId;
        break;
      default:
        url += '/account/voucher?firm=' + sessionStorage.getItem('firm');
        // http://localhost:8090/IMBAManager/rest/account/voucher?firm=7
        break;
    }
    return url;
  }

  public variantRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/dish/variant/addM';
        break;
      case 'edit':
        url += '/dish/variant/update';
        break;
      case 'details':
        url += '/dish/variant/' + userId;
        break;
      case 'delete':
        url += '/dish/variant/' + userId;
        break;

      // dish/variant?dish=19395
      case 'getvariant':
        // /dish?firm=27
        url += '/dish?firm=' + userId;
        // url += '/dish/variant?dish=' + userId;
        break;

      case 'dealbystockid':
        url += '/dish/review?dish=' + userId;
        break;

      case 'MPdelete':
        url += '/dish/photos/deleteM';
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/dish?branch=' + userId;
        break;
      case 'import':
        // url += '/prescription?firm=' + userId;
        url += '/dish/import';
        break;
      case 'docarray':
        url += '/dish/photos ';
        break;

      case 'bycategory':
        url += '/dish' + userId;
        break;

      case 'product':
        url += '/dish/review' + userId;
        break;

      //   case 'product':
      // url += '/product'+ userId;
      //   break;

      // case 'allproduct':
      //   url += '/product';
      //     break;

      ///product/prodtype/sale?prodtype=BIKE&forsale=YES&firm=1

      case 'prodbyprodtype':
        url += '/dish/menutype/sale' + userId;;
        break;

      //    http://localhost:8090/SmartSupplyManager/rest/product/search?name=Cheese

      case 'searchproduct':
        url += '/compact/search?pname=' + userId;;
        break;

      case 'byprodtype':
        url += '/dish/search?menutype=' + userId;;
        break;

      case 'compact':
        url += '/compact' + userId;
        break;

      default:
        // /dish/variant?dish=115
        //  url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/dish/variant?dish=' + userId;

        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public dishreviewsRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/dish/review';
        break;
      case 'edit':
        url += '/dish/review/update';
        break;
      case 'details':
        url += '/dish/review/' + userId;
        break;
      case 'delete':
        url += '/dish/review/' + userId;
        break;

      case 'dealbystockid':
        // /dish/review?dish=19126
        url += '/dish/review?dish=' + userId;
        break;

      case 'MPdelete':
        url += '/dish/photos/deleteM';
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/dish?branch=' + userId;
        break;
      case 'import':
        // url += '/prescription?firm=' + userId;
        url += '/dish/import';
        break;
      case 'docarray':
        url += '/dish/photos ';
        break;

      case 'bycategory':
        url += '/dish' + userId;
        break;

      case 'product':
        url += '/dish/review' + userId;
        break;

      //   case 'product':
      // url += '/product'+ userId;
      //   break;

      // case 'allproduct':
      //   url += '/product';
      //     break;

      ///product/prodtype/sale?prodtype=BIKE&forsale=YES&firm=1

      case 'prodbyprodtype':
        url += '/dish/menutype/sale' + userId;;
        break;

      //    http://localhost:8090/SmartSupplyManager/rest/product/search?name=Cheese

      case 'searchproduct':
        url += '/compact/search?pname=' + userId;;
        break;

      case 'byprodtype':
        url += '/dish/search?menutype=' + userId;;
        break;

      case 'compact':
        url += '/compact' + userId;
        break;

      default:
        //  url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/dish/review';

        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public dishRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/dish';
        break;
      case 'edit':
        url += '/dish/update';
        break;
      case 'details':
        url += '/dish/' + userId;
        break;
      case 'delete':
        url += '/dish/' + userId;
        break;
      case 'MPdelete':
        url += '/dish/photos/deleteM';
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/dish?firm=' + userId;
        break;
      case 'import':
        // url += '/prescription?firm=' + userId;
        url += '/dish/import';
        break;
      case 'docarray':
        url += '/dish/photos ';
        break;

      case 'bycategory':
        url += '/dish' + userId;
        break;

      case 'product':
        url += '/dish' + userId;
        break;

      case 'prodbyprodtype':
        url += '/dish/menutype/sale' + userId;;
        break;

      case 'searchproduct':
        url += '/compact/search?pname=' + userId;;
        break;

      case 'byprodtype':
        url += '/dish/search?menutype=' + userId;;
        break;

      case 'compact':
        url += '/compact' + userId;
        break;

      default:
        //  url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/dish';

        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public productRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/product';
        break;
      case 'edit':
        url += '/product/update';
        break;
      case 'details':
        url += '/product/' + userId;
        break;
      case 'delete':
        url += '/product/' + userId;
        break;
      case 'MPdelete':
        url += '/product/photos/deleteM';
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/product?branch=' + userId;
        break;
      case 'import':
        // url += '/prescription?firm=' + userId;
        url += '/product/import';
        break;
      case 'docarray':
        url += '/product/photos ';
        break;

      case 'bycategory':
        url += '/product' + userId;
        break;

      case 'product':
        url += '/product' + userId;
        break;

      //   case 'product':
      // url += '/product'+ userId;
      //   break;

      // case 'allproduct':
      //   url += '/product';
      //     break;

      ///product/prodtype/sale?prodtype=BIKE&forsale=YES&firm=1

      case 'prodbyprodtype':
        url += '/product/prodtype/sale' + userId;;
        break;

      //    http://localhost:8090/SmartSupplyManager/rest/product/search?name=Cheese

      case 'searchproduct':
        url += '/compact/search?pname=' + userId;;
        break;

      case 'byprodtype':
        url += '/product/search?prodtype=' + userId;;
        break;

      case 'compact':
        url += '/compact' + userId;
        break;

      default:
        //  url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/product';

        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public prodpropRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/product/prodprop';
        // http://localhost:8090/SmartSupplyManager/rest/product/prodtype
        break;
      case 'edit':
        url += '/firm/update';
        break;
      case 'details':
        url += '/product/prodprop/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/product/prodprop/' + userId;
        break;
      case 'logoadd':
        url += '/firm/logo/add';
        break;
      default:
        // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29


        url += '/product/prodprop?product=' + userId;
        break;
    }
    return url;
  }

  public docsRestURL(restid, type) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/doc';
        break;
      case 'productphotoadd':
        url += '/product/photos ';
        break;
      case 'photoadd':
        url += '/employee/photo';
        break;
      case 'edit':
        url += '/doc/update';
        break;
      case 'delete':
        url += '/doc/delete';
        break;
      case 'upload':
        url += '/common/doc/upload';
        break;
      case 'details':
        url += '/doc/getId/' + type;
        break;

      case 'sliderimg':
        url += '/common/doc?type=OFFER';
        break;

      case 'slider':
        url += '/common/doc';
        break;
      case 'delslider':
        url += '/common/slider/delete';
        break;
      case 'details':
        url += '/doc/getId/' + type;
        break;

      case 'todaysdate':
        url += '/common/date';
        break;

      case 'dowExcel':
        url += '/excel/download?type=BANK';
        break;


      default:
        url += '/doc?type=' + type;
        break;
    }
    return url;
  }

  public prodpropvalueRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/product/pvalue/update';
        // http://localhost:8090/SmartSupplyManager/rest/product/prodtype
        break;
      case 'edit':
        url += '/firm/update';
        break;
      case 'details':
        url += '/firm/getById/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/product/pvalue/delete';
        break;
      case 'logoadd':
        url += '/firm/logo/add';
        break;
      default:
        // http://localhost:8090/SmartSupplyManager/rest/product/prodprop?product=29


        url += '/product/prodprop?product=' + userId;
        break;
    }
    return url;
  }

  public productstockRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/product/stock/add';
        break;
      case 'addm':
        url += '/product/stock/addM';
        break;
      case 'edit':
        url += '/product/stock/update';
        break;
      case 'details':
        url += '/product/stock/' + userId;
        break;
      case 'lastlotno':
        //    url += '/product/last/lotno?prodcode=' + userId + '&firm=' + sessionStorage.getItem('firm');
        url += '/product/newlot/no?product=' + userId;

        break;
      case 'delete':
        url += '/product/stock/' + userId;
        break;
      case 'MPdelete':
        url += '/product/photos/delete';
        break;
      case 'available':
        url += '/product/stock/check?' + userId;
        break;
      case 'rate':
        url += '/product/rate?' + userId;
        //  http://localhost:8090/SuppChainManager/rest/product/rate?prodcode="cap2"&ratelabel=Silver&quantity=100&ptype=SELLING
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/product?branch=' + userId;
        break;
      case 'byprodcode':

        url += '/product/stock?prodcode=' + userId;
        // http://localhost:8090/SuppChainManager/rest/product/stock/get?prodcode=abc12345
        // http://localhost:8090/SuppChainManager/rest/product/stock?prodcode=4545
        break;
      case 'byprodidbranch':
        url += '/product/stock?product=' + userId + '&branch=' + this.branchid;
        break;

      case 'byprodid':
        url += '/product/stock?product=' + userId;
        break;

      // http://localhost:8090/SmartSupplyManager/rest/product/stock?product=102&color=Red
      case 'byprodidcolor':
        url += '/product/stock?product=' + userId;
        break;

      case 'byprodstatus':
        url += '/product/stock/status?product=' + userId;
        break;

      case 'bystatprodcode':
        url += '/stationery/stock?prodcode=' + userId;
        break;
      // case 'bystatprodcode':
      // console.log(userId);
      //    url += '/stationery/stock?prodcode=' + userId;
      case 'photoadd':
        url += '/product/stock/barcode/add ';
        break;
      case 'docarray':
        url += '/product/photos ';
        break;

      case 'prodstockk':
        url += '/product/stock?' + userId;
        break;


      case 'quantityprod':
        url += '/product/stock?' + userId;
        break;

      case 'quantityspare':  // getting product stock by product id and qty
        // http://localhost:8090/SmartSupplyManager/rest/product/stock/status?product=19157&status=AVAILABLE
        url += '/product/stock/status?' + userId;
        break;

      case 'prodstockbyprodid':
        url += '/product/stock?product=' + userId;
        // http://localhost:8090/SmartSupplyManager/rest/product/stock?product=29
        break;

      default:
        // url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/product/stock';
        break;
    }
    return url;
  }

  public quoteRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/quote';
        break;

      case 'details':
        url += '/quote/' + userId;
        break;

      case 'quotenumber':
        url += '/quote/newquote/no?etype=' + userId + '&firm=' + sessionStorage.getItem('firm');
        break;

      case 'qinvoicenumber':
        url += '/quote/newinvoice/no?firm=' + sessionStorage.getItem('firm');
        break;

      case 'qsentrybyquoteid':
        url += '/quote/entry?quote=' + userId;;
        break;

      default:
        url += '/quote?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public customerRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/customer';
        break;
      case 'edit':
        url += '/customer/update';
        break;
      case 'details':
        url += '/customer/' + userId;
        break;

      case 'detailsbycustname':
        url += '/customer/Name/' + userId;
        break;

      case 'delete':
        url += '/customer/' + userId;
        break;

      case 'getcustomer':
        url += '/customer/' + userId;
        break;


      case 'docarray':
        url += '/customer/doc/add';
        // http://localhost:8090/SmartSupplyManager/rest/customer/doc/add

        break;


      case 'cbyrm':
        url += '/customer/marketing?relationshipmgr=' + userId;
        break;

      case 'assignrms':
        url += '/crm/assignrm/cust?firm=' + this.firmid;
        break;

      case 'unassignrms':
        url += '/crm/unassignrm/cust?firm=' + this.firmid;
        break;


      case 'databypincode':
        url += '/customer?pincode=' + userId;
        break;



      default:
        //  url += '/customer?firm=' + 20;
        url += '/customer';
        //   url += '/customer?firm=' + sessionStorage.getItem('firm');

        break;
    }
    return url;
  }

  public level2detailRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/customer/level2';
        break;

      case 'edit':
        url += '/customer/level2/update';
        break;

      case 'travelupdate':
        url += '/customer/travel/add';
        break;

      case 'deletetravel':
        url += '/customer/travel/delete';
        break;

      case 'details':
        url += '/customer/level2/custid?custid=' + userId;
        break;

      case 'delete':
        url += '/customer/level2/delete';
        break;

      case 'prefred':
        url += '/customer/preftravel?custid=' + userId;
        break;
      // case 'supplierByid':
      //   url += '/level2detail?firm=' + userId;
      //   break;

      // case 'city':
      //   url += '/level2detail?city=' + userId;
      //   break;

      case 'detailsbycustomer':
        url += '/customer/level2/rid/' + userId;
        // http://localhost:8090/SuppChainManager/rest/customer/level2/rid/38444  detailsbycustomer
        break;

      default:
        url += '/customer/level2';
        break;
    }
    return url;
  }

  public rlabelRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/rlabel';
        break;
      case 'edit':
        url += '/rlabel/update';
        break;
      case 'details':
        url += '/rlabel/' + userId;
        break;

      case 'delete':
        url += '/rlabel/' + userId;
        break;
      default:
        url += '/rlabel?firm=' + sessionStorage.getItem('firm');
        break;
    }

    return url;
  }

  public vendorRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/vendor';
        break;
      case 'edit':
        url += '/vendor/update';
        break;
      case 'details':
        url += '/vendor/' + userId;
        break;
      case 'delete':
        url += '/vendor/' + userId;
        break;
      case 'supplierByid':
        url += '/vendor?firm=' + userId;
        break;
      case 'type':
        url += '/vendor?category=' + userId + '&firm=' + this.firmid;
        break;
      case 'default':
        url += '/vendor/default?category=' + userId;
        break;
      case 'ttype':
        url += '/vendor/type?type=' + userId;

        //    url += '/vendor/type?type=' + userId +'&firm='+this.firmid;
        break;
      default:
        url += '/vendor?firm=' + this.firmid;
        break;
    }
    return url;
  }

  public empRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/employee';
        break;
      case 'edit':
        url += '/employee/update';
        break;
      case 'details':
        url += '/employee/' + userId;
        break;

      case 'delete':
        url += '/employee/' + userId;
        break;

      case 'photoadd':
        url += '/employee/photo';
        break;

      case 'dependantadd':
        url += '/employee/dependant/add';
        break;
      case 'dependant':
        url += '/employee/dependant/' + userId;
        break;
      case 'attend':
        url += '/employee/attend/add';
        break;
      case 'details_attend':
        url += '/employee/attend/' + userId;
        break;
      case 'account':
        url += '/employee/account/add';
        break;
      case 'accountUpdate':
        url += '/employee/account/update';
        break;
      case 'details_account':
        url += '/employee/account/' + userId;
        break;

      case 'empbyrole':
        url += '/employee?role=' + userId + '&firm=' + this.firmid;
        break;

      default:
        url += '/employee?firm=' + sessionStorage.getItem('firm');
        //     url += '/customer?firm=' + sessionStorage.getItem('firm');

        break;
    }
    return url;
  }

  public insurerRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/insurer';
        break;
      case 'edit':
        url += '/insurer/update';
        break;
      case 'details':
        url += '/insurer/' + userId;
        break;
      case 'delete':
        url += '/insurer/' + userId;
        break;
      case 'insurerByid':
        url += '/insurer?firm=' + userId;
        break;
      default:
        url += '/insurer?firm=' + sessionStorage.getItem('firm');
        //    url += '/insurer?firm=' + 20;
        break;
    }
    return url;
  }

  public supplierRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/supplier';
        break;
      case 'edit':
        url += '/supplier/update';
        break;
      case 'details':
        url += '/supplier/getById/' + userId;
        break;
      case 'delete':
        url += '/supplier/' + userId;
        break;
      case 'supplierByid':
        url += '/supplier?firm=' + userId;
        break;
      default:
        url += '/supplier?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public userRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/user/add';
        break;
      case 'signup':
        url += '/user/register';
        break;
      case 'login':
        url += '/login';
        break;
      case 'edit':
        url += '/user/update';
        break;
      case 'details':
        url += '/user/get/' + userId;
        break;
      case 'delete':
        url += '/user/delete';
        break;
      case 'count':
        url += '/user/count';
        break;
      default:
        url += '/user';
        break;
    }
    return url;
  }

  public loginRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'login':
        url += '/login';
        break;
      case 'edit':
        url += '/login/update';
        break;
      case 'details':
        url += '/stop/getById/' + userId;
        break;
      case 'delete':
        url += '/stop/delete';
        break;
      //login?username=7083470977
      case 'checknumberfromdb':
        url += '/login?username=' + userId;
        break;

      default:
        url += '/stop';
        break;
    }
    return url;
  }

  public mailRestURL(restid, uid) {
    var url = this.server;
    switch (restid) {
      case 'otp':
        url += '/mail/otp';
        break;
      case 'send':
        url += '/mail/send';
        break;
      case 'groupmail':
        url += '/mail/groupmail';
        break;
      case 'sendPDF':
        url += '/mail/sendPDF';
        break;

      // /rest/mail/sendPDF
      default:
        url += '/mail';
        break;
    }
    return url;
  }

  public MailRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/mail/config';
        break;
      case 'send':
        url += '/mail/send';
        break;
      case 'details':
        url += '/mail/config';
        break;
      case 'group':
        url += '/mail/groupmail';
        break;
      default:
        url += '/category';
        //url += '/category/getById/' + userId;
        break;
    }
    return url;
  }

  public packingRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/packing';
        break;
      case 'edit':
        url += '/product/update';
        break;
      case 'details':
        url += '/packing/' + userId;
        break;
      case 'delete':
        url += '/packing/' + userId;
        break;
      case 'newpackageno':
        url += '/packing/newpkgno?firm=' + userId;
        break;

      case 'getallpackingbyemp': // get all packing by employee id , packing incharge
        url += '/packing?emp=' + userId;
        break;

      // http://localhost:8090/SmartSupplyManager/rest/packentry/newpkgno?firm=1

      default:
        url += '/packing?firm=' + sessionStorage.getItem('firm');
        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public dispatchRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/packing';
        break;
      case 'edit':
        url += '/product/update';
        break;
      case 'details':
        url += '/packing/' + userId;
        break;
      case 'delete':
        url += '/product/' + userId;
        break;
      case 'newdispatchno':
        url += '/dispatch/newdispatchno?firm=' + userId;
        break; // http://localhost:8090/SmartSupplyManager/rest/dispatch/newdispatchno?firm=1

      case 'getallpackingbyemp': // get all packing by employee id , packing incharge
        url += '/packing?emp=' + userId;
        break;

      // http://localhost:8090/SmartSupplyManager/rest/packentry/newpkgno?firm=1

      default:
        url += '/packing?firm=' + sessionStorage.getItem('firm');
        //  url += '/product?firm=20';
        break;
    }
    return url;
  }

  public purchaseRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/porder';
        break;
      case 'edit':
        url += '/porder/update';
        break;
      case 'details':
        url += '/porder/' + userId;
        break;
      case 'proddetails':
        url += '/porder/PODetailsbyPO/id/' + userId;
        break;
      case 'clone':
        url += '/porder/clone?POid=' + userId;
        break;
      case 'delete':
        url += '/porder/' + userId;
        break;
      case 'detailsdelete':
        url += '/porder/details/' + userId;;
        break;
      case 'supplierByid':
        url += '/porder?firm=' + userId;
        break;
      default:
        // url += '/porder';
        url += '/porder?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public porderRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/porderdetails/add';
        break;
      case 'edit':
        url += '/porderdetails/update';
        break;
      case 'details':
        url += '/porderdetails/getById/' + userId;
        break;
      case 'delete':
        url += '/porderdetails/delete';
        break;
      case 'MPdelete':
        url += '/porderdetails/photos/delete';
        break;
      case 'porderdetailsByid':
        // url += '/prescription?firm=' + userId;
        url += '/porderdetails?firm=' + userId;
        break;
      case 'docarray':
        url += '/porderdetails/photos ';
        break;
      case 'lastorderno':
        url += '/porder/lastorderno?firm=' + sessionStorage.getItem('firm');
        break;
      // http://localhost:8090/SmartSupplyManager/rest/porder/poinward/details/poiid/118
      case 'pinwarddetails':
        url += '/porder/poinward/details/poiid/' + userId;
        break;
      case 'porderdetails':
        url += '/porder/details?porder=' + userId;
        break;
      // Get Information from JSON REST api
      // http://localhost:8090/SmartSupplyManager/rest/porder/details/poid/92
      // http://localhost:8090/SmartSupplyManager/rest/porder/lastorderno?firm=1
      default:
        // url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/porderdetails';
        break;
    }
    return url;
  }

  public purchaseorderinwardRestURL(restid, userId) {
    // http://localhost:8090/IMBAManager/rest/porder/poinward/add
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/porder/poinward';
        break;
      case 'edit':
        url += '/porder/poinward/update';
        break;
      case 'details':
        url += '/porder/poinward/' + userId;
        break;
      case 'pinwarddetails':
        //  url += '/porder/poinward/POIDetailbyPOI/id/' + userId;
        //  http://localhost:8090/IMBAManager/rest/porder/poinward/poid/115
        url += '/porder/poinward/poid/' + userId;
        break;
      case 'poinwarddetails':
        url += '/porder/poinward/' + userId;
        break;
      case 'delete':
        // http://localhost:8090/IMBAManager/rest/porder/poinward/delete
        url += '/porder/poinward/' + userId;
        break;
      case 'supplierByid':
        url += '/porder?firm=' + userId;
        break;
      // case 'purchaseinwarddetails':
      //   url += '/porder/poinward/details/poiid/' + userId;
      //   break;
      // pinwarddetails
      // http://localhost:8090/IMBAManager/rest/porder/poinward/details/poiid/118
      //  http://localhost:8090/IMBAManager/rest/porder/poinward/POIDetailbyPOI/id/146
      default:
        // http://localhost:8090/IMBAManager/rest/porder/poinward?firm=7
        url += '/porder/poinward?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public pinwardRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/porder/POinward/add';
        break;
      case 'edit':
        url += '/porder/POinward/update';
        break;
      case 'details':
        url += '/porder/POInward/' + userId;
        break;
      case 'pinwarddetails':
        url += '/porder/POInward/POIDetailbyPOI/id/' + userId;
        break;
      case 'delete':
        url += '/porder/delete';
        break;
      case 'supplierByid':
        url += '/porder?firm=' + userId;
        break;
      default:
        url += '/porder/POInward';
        break;
    }
    return url;
  }

  public returnchallanRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/returnchallan';
        break;
      case 'edit':
        url += '/returnchallan/update';
        break;
      case 'details':
        url += '/returnchallan/' + userId;
        // http://localhost:8090/IMBAManager/rest/returnchallan/getById/39
        break;
      case 'delete':
        url += '/returnchallan/' + userId;
        break;
      case 'returnchallanByid':
        url += '/returnchallan?firm=' + userId;
        break;
      default:
        url += '/returnchallan?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public lastlotRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      // http://localhost:8090/SmartSupplyManager/rest/product/newlot/no?product=40
      case 'product':
        url += '/product/newlot/no?product=' + userId;
        break;
      case 'sparepart':
        url += '/sparepart/newlot/no?sparepart=' + userId;
        break;
      case 'porder':
        url += '/porder/neworder/no?firm=' + sessionStorage.getItem('firm');
        // http://localhost:8090/SmartSupplyManager/rest/porder/neworder/no?firm=7
        break;
      case 'voucher':
        url += '/account/newvoucher/no?firm=' + sessionStorage.getItem('firm');
        // http://localhost:8090/SmartSupplyManager/rest/account/newvoucher/no?firm=7
        break;
      case 'booking':
        url += '/booking/newbooking/no?firm=' + sessionStorage.getItem('firm') + '&etype=' + userId;
        //   http://localhost:8090/SmartSupplyManager/rest/booking/newbooking/no?firm=7
        break;


      case 'invoice':
        url += '/servicing/newinvoice/num?firm=' + sessionStorage.getItem('firm');
        // http://localhost:8090/SmartSupplyManager/rest/sale/newinvoice/num?firm=7
        break;

      case 'challan':
        url += '/returnchallan/newchallan/num?firm=' + sessionStorage.getItem('firm');
        // http://localhost:8090/SmartSupplyManager/rest/returnchallan/newchallan/num?firm=5
        break;


      case 'selling':
        url += '/booking/newinvoice/no?firm=' + sessionStorage.getItem('firm'); // '&etype='+userId;
        // http://localhost:8090/SmartSupplyManager/rest/sale/newinvoice/num?firm=7
        break;
      //http://localhost:8090/SmartSupplyManager/rest/booking/newinvoice/no?firm=5
      case 'delete':
        url += '/customer/delete';
        break;
      case 'supplierByid':
        url += '/customer?firm=' + userId;
        break;
      case 'newinvoiceno':
        url += '/account/newinvoice/num?firm=' + userId;
        break;
      // http://localhost:8090/SmartSupplyManager/rest/insurance/newinvoice/num?firm=11
      case 'newvoucherno':
        url += '/account/newvoucher/no?firm=' + userId;
        break;
      // http://localhost:8090/SmartSupplyManager/rest/account/newvoucher/no?firm=7
      default:
        url += '/customer?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public servicingRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/servicing';
        break;
      case 'edit':
        url += '/servicing/update';
        break;
      case 'details':
        url += '/servicing/' + userId;
        break;
      case 'delete':
        url += '/servicing/delete';
        break;
      case 'servicingByid':
        url += '/servicing?firm=' + userId;
        break;

      case 'jobcardByid':
        url += '/jobcard/' + userId;
        // http://localhost:8090/IMBAManager/rest/jobcard/servicing/38464
        break;
      case 'getservicingjobByid':
        url += '/servicing/job/card/' + userId;
        break;

      default:
        url += '/servicing?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public servicingjobRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/servicing/job';
        break;
      case 'edit':
        url += '/servicing/job/update';
        break;
      case 'details':
        url += '/servicing/job/' + userId;
        // http://localhost:8090/IMBAManager/rest/servicing/job/getById/undefined
        break;
      case 'jobcardnum':
        url += '/servicing/job/detail?' + userId;
        break;
      case 'delete':
        url += '/servicing/job/delete';
        break;
      case 'labourdetails':
        url += '/servicing/job/labour?job=' + userId;
        break;

      case 'sparedetails':
        url += '/servicing/job/sparepart?job=' + userId;
        break;

      case 'servicingjobbysid':
        url += '/servicing/job?servicing=' + userId;

        break;

      case 'jobcardbysid':
        url += '/jobcard/servicing/' + userId;
        // http://localhost:8090/IMBAManager/rest/jobcard/servicing/38464
        break;

      case 'labourdelete':
        url += '/servicing/job/labour/delete';
        break;

      case 'sparedelete':
        url += '/servicing/job/sparepart/delete';
        break;
      case 'jobcardbysid':
        url += '/jobcard/servicing/' + userId;
        // http://localhost:8090/IMBAManager/rest/jobcard/servicing/38464
        break;

      default:
        url += '/servicing/job?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public jobcardRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/jobcard';
        break;
      case 'edit':
        url += '/jobcard/update';
        break;
      case 'details':
        url += '/jobcard/' + userId;
        break;
      case 'delete':
        url += '/jobcard/delete';
        break;
      case 'jobcardbyid':
        url += '/jobcard/' + userId;
        // http://localhost:8090/IMBAManager/rest/jobcard/id/24
        break;


      default:
        url += '/jobcard?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public servicingdetailsRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/servicing/detail/add';
        break;
      case 'edit':
        url += '/servicing/detail/update';
        break;
      case 'details':
        url += '/servicing/detail/getById/' + userId;
        break;
      case 'delete':
        url += '/servicing/detail/delete';
        break;
      case 'servicingdetailsbysid':
        url += '/servicing/detail?servicing=' + userId;
        break;
      default:
        url += '/servicing/detail?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public sparepartstockRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/sparepart/stock/add';
        break;
      case 'addm':
        url += '/sparepart/stock/addM';
        break;
      case 'edit':
        url += '/sparepart/update';
        break;
      case 'details':
        url += '/sparepart/stock/id/' + userId;
        break;
      case 'quantityspare':
        //http://localhost:8090/IMBAManager/rest/sparepart/stock?sparepart=27&qty=10
        url += '/sparepart/stock?' + userId;
        break;
      case 'lastlotno':
        // http://localhost:8090/IMBAManager/rest/sparepart/last/lotno?firm=1&prodcode=Prod121
        // http://localhost:8090/IMBAManager/rest/sparepart/last/lotno?firm=7&sparepart=14
        url += '/sparepart/last/lotno?sparepart=' + userId + '&firm=' + sessionStorage.getItem('firm');
        break;
      case 'delete':
        url += '/sparepart/stock/delete';
        break;
      case 'MPdelete':
        url += '/sparepart/photos/delete';
        break;
      ///product/stock/check?prodcode=abc12345quantity=100
      case 'available':
        url += '/sparepart/stock/check?' + userId;
        break;
      case 'rate':
        url += '/sparepart/rate?' + userId;
        //  http://localhost:8090/SuppChainManager/rest/product/rate?prodcode="cap2"&ratelabel=Silver&quantity=100&ptype=SELLING
        break;
      case 'productByid':
        // url += '/prescription?firm=' + userId;
        url += '/sparepart?firm=' + userId;
        break;
      case 'byprodcode':
        url += '/sparepart/stock?prodcode=' + userId;
        // http://localhost:8090/SuppChainManager/rest/product/stock/get?prodcode=abc12345
        //http://localhost:8090/SuppChainManager/rest/product/stock?prodcode=4545
        break;
      case 'byprodid':
        url += '/sparepart/stock?sparepart=' + userId;
        break;

      case 'bysparestatus':
        url += '/sparepart/stock/status?sparepart=' + userId;
        break;


      case 'bystatprodcode':
        url += '/sparepart/stock?prodcode=' + userId;
        break;
      // case 'bystatprodcode':
      // console.log(userId);
      //    url += '/stationery/stock?prodcode=' + userId;
      case 'photoadd':
        url += '/sparepart/stock/barcode/add ';
        break;
      case 'docarray':
        url += '/sparepart/photos ';
        break;
      default:
        // url += '/product?firm=' + sessionStorage.getItem('firm');
        url += '/sparepart/stock';
        break;
    }
    return url;
  }

  public inchargeRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/employee/incharge';
        break;
      case 'edit':
        url += '/employee/incharge/update';
        break;
      case 'details':
        url += '/incharge/id/' + userId;
        break;
      case 'delete':
        url += '/incharge/delete';
        break;
      default:
        url += '/employee/incharge';
        break;
    }
    return url;
  }

  public roleRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/common/role/add';
        break;
      case 'edit':
        url += '/common/role/update';
        break;
      case 'details':
        url += '/common/role/get?name=' + userId;
        break;

      case 'removeimage':
        url += '/common//file/delete';
        break;
      //   http://localhost:8090/ERPManager/rest/common/file/delete
      case 'delete':
        url += '/common/role/delete';
        break;
      case 'validtill':
        url += '/common/futuredate?numdays=' + userId;
        //  http://localhost:8090/PPressManager/rest/common/date?numdays=4
        //   // http://localhost:8090/SuppChainManager/rest/common/futuredate?numdays=7
        break;
      default:
        url += '/common/role';
        break;
    }
    return url;
  }

  public OrdersRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {

      case 'add':
        url += '/order';
        break;

      case 'details':
        url += '/' + userId;
        break;

      case 'allorderss':
        url += '/order/allorder' + userId;
        break;

      case 'orderbyperson':
        url += '/order' + userId;
        break;

      case 'orderbycustomer':
        url += '/order?cust=' + userId;
        break;

      case 'orderbycustomerplaced':
        url += '/order?cust=' + userId + '&status=PLACED';
        break;

      case 'update':
        url += '/order/update';
        break;

      case 'delete':
        url += '/order/' + userId;
        break;

      // case 'orderactive':
      //   // order/status?status=PLACED&firm=19121&active=YES
      //   url += '/order/status?active=' + userId + '&branch=' + this.branchid;
      //   break;

      case 'orderactive':
        // order/status?status=PLACED&firm=19121&active=YES
        url += '/order/status?status=PLACED&firm=' + userId + '&active=YES';
        // url += '/order/status?status=PLACED&firm=27&active=NO';
        break;

      case 'orderclose':
        // url += '/order/status?status=PLACED&firm=27&active=YES';
        url += '/order/status?status=CLOSED&firm=' + userId + '&active=NO';
        break;
      //  http://localhost:8090/SmartSupplyManager/rest/order/status?firm=20&active=NO

      case 'orderbystatus':
        url += '/order/status?status=' + userId + '&branch=' + this.branchid;
        break;

      case 'allActiveOrders':
        url += '/order/status?' + userId;
        break;

      case 'allactiveorder':
        http://localhost:7094/order?firm=27&active=YES&delivered=NO
        url += '/order/status?firm=' + userId + '&active=YES' + '&delivered=NO'
        break;

      case 'accountspayable':
        url += '/order/payable' + userId;
        break;
      case 'accountsreceived':
        url += '/order/received' + userId;
        break;

      case 'accountspayable_delivery':
        url += '/deliverypool/payable' + userId;
        break;
      case 'accountsreceived_delivery':
        url += '/deliverypool/received' + userId;
        break;

      case 'multipledel':
        url += '/order/deleteM'
        break;

      case 'bulkstatus':
        url += '/order/bulk/status';
        break;

      case 'cloneorder':
        url += '/order/clone?id=' + userId;
        break;

      case 'allorders':
        url += '/order?branch=' + this.branchid + userId;
        break;

      case 'allordersbybranch':
        url += '/order?branch=' + userId;
        break;

      case 'allordersbydp':
        url += '/order?person=' + userId;
        break;

      case 'freqorder':
        url += '/order/frequent?customer=' + userId;
        break;

      case 'freqorderbybranch':
        url += '/order/frequent?branch=' + userId;
        break;

      case 'getvendororders':
        url += '/order/details';
        break;

      case 'vendorpaid':
        url += '/order/ispaid';
        break;

      default:
        url += '/order?branch=' + this.branchid;
        break;
    }
    return url;
  }

  public bulkRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {

      case 'RatelabelAdd':
        url += '/customer/bulk/ratelabel';
        break;

      case 'MaxQuoteAdd':
        url += '/customer/bulk/maxquote';
        break;

      case 'RMAdd':
        url += '/customer/bulk/rm';
        break;

      default:
        url += '/employee/lbal';
        break;
    }
    return url;
  }

  public unixTimeConverterDate(ts) {
    let datetime = '';
    const dattime1 = '';
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = '0';



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

  public RetailerRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/retailer/add';
        break;
      case 'edit':
        url += '/retailer/update';
        break;
      case 'details':
        url += '/retailer/id/' + userId;
        break;
      case 'delete':
        url += '/retailer/delete';
        break;
      case 'newclient':
        url += '/crm/marketing?status=' + userId;
        break;
      case 'city':
        // http://localhost:8090/IMBAManager/rest/customer?city=nagpur
        url += '/customer?city=' + userId + '&firm=' + sessionStorage.getItem('firm');
        break;
      case 'deleteAddress':
        url += '/retailer/address/delete';
        break;
      case 'deleteRemarks':
        url += '/retailer/remark/delete';
        break;
      case 'addressadd':
        url += '/retailer/address/add';
        break;
      case 'remarkadd':
        url += '/retailer/remark/add';
        break;
      case 'lastusedadd':
        url += '/retailer/lastused?retailer=' + userId;
        break;
      case 'payment':
        url += '/retailer/payment?retailer=' + userId;
        // http://localhost:8090/SuppChainManager/rest/retailer/payment?retailer=19559
        break;
      case 'retailerbystatus':
        url += '/retailer?status=' + userId;
        // http://localhost:8090/SuppChainManager/rest/retailer/payment?retailer=19559
        break;
      //http://localhost:8090/SuppChainManager/rest/retailer?status=REGISTERED

      // http://localhost:8090/SuppChainManager/rest/retailer/lastused?retailer=19559
      case 'rmcust':
        url += '/retailer?rmid=' + userId;
        // Get Retailer By RM
        // http://localhost:8090/SuppChainManager/rest/retailer?rmid=21
        break;
      default:
        url += '/retailer';
        break;
    }
    return url;
  }

  public shopRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/wholesaler/shop/add';
        break;
      case 'edit':
        url += '/wholesaler/shop/update';
        break;
      case 'details':
        url += '/wholesaler/shop/id/' + userId;
        break;
      case 'delete':
        url += '/wholesaler/shop/delete';
        break;
      case 'supplierByid':
        url += '/wholesaler/shop?firm=' + userId;
        break;
      default:
        url += '/wholesaler/shop';
        break;
    }
    return url;
  }

  public crmRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {

      //http://localhost:8090/PPressManager/rest/crm/call/add
      case 'add':
        url += '/crm/call';
        break;
      case 'edit':
        url += '/crm/call/update';
        break;
      case 'details':
        url += '/crm/call/' + userId;
        break;
      case 'delete':
        url += '/crm/call/' + userId;
        break;
      case 'orderdetails':
        url += '/crm/quote?callto=' + userId;
        break;
      //http://localhost:8090/PPressManager/rest/crm/call/last?cust=1451
      case 'lastcall':
        url += '/crm/call/last?cust=' + userId;
        break;

      case 'speechall':
        url += '/crm/speech?firm=' + this.firmid;
        break;


      case 'speechbyid':
        url += '/crm/speech/' + userId;
        break;

      case 'callblockbyid':
        url += '/crm/block/' + userId;
        break;

      //http://localhost:8090/PPressManager/rest/crm/block/add
      case 'addblockcall':
        url += '/crm/block';
        break;

      case 'updateblockcall':
        url += '/crm/block/update';
        break;


      case 'addspeech':
        url += '/crm/speech/add';
        break;

      case 'deletespeech':
        url += '/crm/speech/' + userId;
        break;

      case 'deletecallblock':
        url += '/crm/block/' + userId;
        break;
      //http://localhost:8090/PPressManager/rest/crm/block

      case 'allblockreq':
        url += '/crm/block';
        break;

      case 'deleteblockreqbyid':
        url += '/crm/block/' + userId;
        break;


      case 'empsaledata':
        url += '/crm/stats?emp=' + userId;
        break;


      case 'empcalldata':
        url += '/crm/call/by?emp=' + userId;
        break;

      case 'calldataall':
        url += '/crm/call/details?emp=' + userId;
        break;



      case 'emptarsaledata':
        url += '/crm/target/stats?emp=' + userId;
        break;


      case 'addtargetcall':
        url += '/crm/target';
        break;

      case 'deletetargetcall':
        url += '/crm/target/' + userId;
        break;


      case 'calltdelete':
        url += '/crm/ctarget/' + userId;
        break;


      case 'targetcallall':
        url += '/crm/target';
        break;

      case 'targetcallbyid':
        url += '/crm/target/' + userId;
        break;

      case 'addreferancecall':
        url += '/crm/reference';
        break;

      case 'referancecallall':
        url += '/crm/reference?firm=' + this.firmid;
        break;


      case 'referancecallbyid':
        url += '/crm/reference/' + userId;
        break;

      case 'allottedclientsstats':
        url += '/crm/all/cust?emp=' + userId;
        break;

      case 'newallottedclientsstats':
        url += '/crm/new/cust?emp=' + userId;
        break;

      case 'followupstats':
        url += '/crm/today/followup?emp=' + userId;
        break;


      case 'regularclientdata':
        url += '/crm/stats/regular?emp=' + userId;
        break;


      case 'irregularclientdata':
        url += '/crm/stats/irregular?emp=' + userId;
        break;

      case 'paymentrecoverydata':
        url += '/crm/stats/payment?emp=' + userId;
        break;


      case 'coldcalldata':
        url += '/crm/coldcall?firm=' + this.firmid;
        break;

      case 'referencecalldata':
        url += '/crm/reference?firm=' + this.firmid;
        break;

      case 'referencecalldelete':
        url += '/crm/reference/' + userId;
        break;

      case 'calldetailsbyemp':
        url += '/crm/call/emp?emp=' + userId;
        break;

      case 'databydates':
        url += '/crm/call/bydate?' + userId;
        break;

      case 'productstatsdonut':
        url += '/crm/doughnut/product?customer=' + userId;
        break;

      case 'papertypestatsdonut':
        url += '/crm/doughnut/paper?customer=' + userId;
        break;

      default:
        url += '/crm/call';
        break;
    }
    return url;
  }

  public campaignRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/crm/campaign';
        break;
      case 'edit':
        url += '/crm/campaign/update';
        break;
      case 'details':
        url += '/crm/campaign/' + userId;
        break;
      case 'delete':
        url += '/crm/campaign/' + userId;
        break;
      default:
        url += '/crm/campaign?firm=' + this.firmid;
        break;
    }
    return url;
  }

  public crmstatsRestURL(restid, userid) {
    let url = this.server;
    switch (restid) {

      ///crm/quotation/monthly?customer=1447&product=7614
      case 'statsbycusprod':
        url += '/crm/quotation/monthly?' + userid;
        break;

      default:
        url += '/stats/applicant';
        break;
    }
    return url;
  }

  public bookRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case 'add':
        url += '/quote';
        break;

      case 'details':
        url += '/quote/' + userId;
        break;

      case 'quotenumber':
        url += '/quote/newquote/no?etype=' + userId + '&firm=' + sessionStorage.getItem('firm');
        break;

      case 'qinvoicenumber':
        url += '/quote/newinvoice/no?firm=' + sessionStorage.getItem('firm');
        break;

      case 'qsentrybyquoteid':
        url += '/quote/entry?quote=' + userId;;
        break;

      // previous
      //   case 'convert':
      //     url += '/booking/convert';
      //     break;

      // case 'edit':
      //   url += '/booking/update';
      //   break;
      //   // http://localhost:8090/IMBAManager/rest/booking/details?booking

      // case 'delete':
      //   url += '/booking/cancel';
      //   // http://localhost:8090/IMBAManager/rest/booking/cancel
      //   break;
      // case 'bookingByid':
      //   // url += '/booking?firm=' + userId;
      //   url += '/booking?firm=' + userId;
      //   break;
      // case 'history':
      //     url += '/booking/history/add';
      //     break;
      default:
        url += '/quote?firm=' + sessionStorage.getItem('firm');
        break;
    }
    return url;
  }

  public categoryRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'add':
        url += '/firm/category/menutype';
        // http://localhost:8090/SmartSupplyManager/rest/product/prodtype
        break;
      case 'edit':
        url += '/firm/category';
        break;
      case 'details':
        url += '/firm/category/' + userId;
        // url += '/court/getById/' + userId;
        break;
      case 'delete':
        url += '/firm/category/' + userId;
        break;
      case 'logoadd':
        url += '/firm/logo/add';
        break;
      default:
        url += '/firm/category';
        break;
    }
    return url;
  }

  public compactRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case 'prodlistbytype_branch':
        url += '/compact?' + userId;
        break;

      case 'proddetailsbyid_branch':
        url += '/compact?' + userId;
        break;

      case 'getcompactbranch':
        url += '/compact';
        break;

      case 'allproduct':
        url += '/dish';
        break;

      case 'getcompactbranchbylimit':
        url += '/compact?index=0&limit=12';
        break;

      case 'getcompactbranchnearby':
        url += '/firm/nearby?pincode=' + userId;
        break;

      case 'edit':
        url += '/login/update';
        break;

      case 'details':
        url += '/stop/getById/' + userId;
        break;

      case 'delete':
        url += '/stop/delete';
        break;

      case 'deliverydate':
        url += '/branch/delivery/' + userId;
        break;

      case 'addorder':
        url += '/order';
        break;

      case 'updateorder':
        url += '/order/update';
        break;

      case 'ordersbycustomer':
        url += '/order?cust=' + userId;
        break;

      // case 'popularproducts':
      //   url += '/order/popular/product';
      //   break;

      case 'popularproducts':
        url += '/product';
        break;

      // case 'popularproductsbylimit':
      //   url += '/order/popular/dish?index=0&limit=30';
      //   break;

      case 'popularproductsbylimit':
        url += '/order/popular/dish?index=0&limit=10';
        break;

      case 'popularproductsbyfirm':
        url += '/order/popular/dish?firm=' + userId;
        break;

      case 'popularshops':
        url += '/order/popular';
        break;

      case 'popularprodtype':
        url += '/dish/menutype';
        break;

      case 'prodtypedatabylimit':
        url += '/dish/menutype?index=0&limit=16';
        break;

      case 'getoffers':
        url += '/common/doc?type=OFFER';
        break;

      case 'searchvendor':
        url += '/compact/search?firm =' + userId;
        break;

      // case 'prodstockbyfoolloose':
      //   url += '/dish/stock?' + userId;

      case 'prodstockbyfoolloose':
        // /dish/variant?dish=19395

        url += '/dish/variant?dish=' + userId;

        break;
      // case 'allproduct':
      //   url += '/product';
      //   break;


      //http://localhost:8090/SmartSupplyManager/rest/product/stats?vendor=19341

      case 'vendorstats':
        url += '/branch/stats?vendor=' + userId;
        break;

      default:
        url += '/stop';
        break;
    }
    return url;
  }

  public smsRestURL(restid, uid) {
    var url = this.server;
    switch (restid) {
      case 'send':
        url += '/sms/send';
        break;

      case 'bulk_send':
        url += '/sms/send/bulk';
        break;
      case 'groupmail':
        url += '/mail/groupmail';
        break;
      default:
        url += '/mail';
        break;
    }
    return url;
  }

  public statsRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {

      case 'vendororderstats_admin':
        url += '/stats/order'
        break;

      case 'monthlyvendororders_admin':
        url += '/stats/order/monthly'
        break;

      case 'product_admin':
        url += '/stats/order/product'
        break;


      case 'revenuestats_admin':
        url += '/stats/order/toprevenues'
        break;

      case 'vendororderstats':
        url += '/stats/order?firm=' + userId;
        break;

      case 'monthlyvendororders':
        url += '/stats/order/monthly?firm=' + userId;
        break;

      case 'product':
        url += '/stats/order/product?firm=' + userId;
        break;


      case 'revenuestats':
        url += '/stats/order/toprevenues?firm=' + userId;
        break;


      case 'vendororderstats_delivery':
        url += '/stats/order?dperson=' + userId;
        break;

      case 'monthlyvendororders_delivery':
        url += '/stats/order/monthly?dperson=' + userId;
        break;

      case 'product_delivery':
        url += '/stats/order/product?dperson=' + userId;
        break;


      case 'revenuestats_delivery':
        url += '/stats/order/toprevenues?dperson=' + userId;
        break;




      default:
        url += '/stats/applicant';
        break;
    }
    return url;
  }

  public notifyRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {

      case 'sendM':
        url += '/notification/addM';
        break;


      case 'getnotification':
        url += '/notification/cache' + userId;
        break;


      case 'deleteM':
        url += '/notification/cacheM' + userId;
        break;

      // http://localhost:8090/SmartSupplyManager/notification/cacheM?id=19272&type=CUSTOMER

      default:
        url += '/stats/applicant';
        break;
    }
    return url;
  }
}
