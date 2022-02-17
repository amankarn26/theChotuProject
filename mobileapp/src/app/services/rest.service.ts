import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RestService {

  // public ip = "http://localhost:8090";

  // public ip = "http://206.189.135.25:8090";

  public ip = "https://aaitheantiquebake.com";

  public nodeIp = "https://aaitheantiquebake.com:8443"

  public server = this.ip + "/MoleculeManager"; 
  public baseurl = this.ip + "/MoleculeManager"; 

  public docServer = this.ip + "/moleculedocs";
  public imgServer = this.ip + "/moleculedocs";

  public firmid = sessionStorage.getItem("firm");

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  // Http Headers
  httpOptions1 = {
    headers: new HttpHeaders({
      "Content-Type": "form-data",
    }),
  };

  // Get Data
  public getJSONFromURL(url) {
    return this.http.get(url, {
      headers: new HttpHeaders({ timeout: `${30000}` }),
    }); 

    // GET
  }

  // Post Data
  public postFormData(url, json) {
    const headers = new Headers();

    return this.http.post(url, json, this.httpOptions).pipe(
      map((res) => {
        const postresponse = res;
        console.log("service method: " + postresponse);
        return postresponse;
      })
    );
  }

  public uploadFormData(url, formdata) {
    const headers = new Headers();
    return this.http.post(url, formdata).pipe(
      map((res) => {
        const postresponse = res;
        console.log("service method: " + postresponse);
        return postresponse;
      })
    );
  }

  // Delete Data
  public deleteFormData(url) {
    return this.http.delete(url).pipe(
      map((res: Response) => {
        const deleteresponse = res; // .json();
        console.log("service method: ");
        console.log(deleteresponse);
        console.log("end delete response in rest");

        return deleteresponse;
      })
    );
  }

  public PincodeRestURL(restid, pincodeId) {
    let url = this.server;
    switch (restid) {
      default:
        url += "/common/pincode?pin=" + pincodeId;
        break;
    }
    return url;
  }

  public pratyRestURL() {
    return this.nodeIp + "/party"
  }

  public custAddres(restId, extra) {
    let url = this.nodeIp;
    switch (restId) {
      case 'getByCust':
        url = url + '/cut_address/' + extra;
        break;
      case 'add':
        url = url + '/cut_address';
        break;
    
      default:
        break;
    }

    return url
  }

  public compactRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "prodlistbytype_firm":
        url += "/compact?" + userId;
        break;

      case "prodlistbycategory_firm":
        //   url += '/' + userId;
        url += "/compact?" + userId;
        break;

      case "proddetailsbyid_firm":
        url += "/dish" + userId;

        break;

      case "edit":
        url += "/login/update";
        break;
      case "details":
        url += "/stop/getById/" + userId;
        break;
      case "delete":
        url += "/stop/delete";
        break;
      case "deliverydate":
        url += "/firm/delivery/" + userId;
        break;

      case "deliveryCharges":
        url += "/deliverypool/" + userId;
        break;

      case "addorder":
        url += "/order";
        break;

      case "updateorder":
        url += "/order/update";
        break;

      case "ordersbycustomer":
        url += "/order?cust=" + userId;
        break;

      case "popularproducts":
        url += "/order/popular/product";
        break;

      case "allproductype":
        url += "/product/producttype";
        break;

      case "frequentproducts":
        url += "/order/" + userId;
        break;

      case "allproduct":
        url += "/product";
        break;

      case "popularproductsfirm":
        url += "/order/popular/product" + userId;
        break;

      case "popularshops":
        url += "/order/popular/branch";
        break;

      case "popularshopshome":
        url += "/compact?index=0&limit=12";
        break;

      case "nearshops":
        url += "/firm/nearby?pincode=" + userId;
        break;

      case "distance":
        url += "/dcharge/distance" + userId;
        break;

      case "getoffers":
        url += "/common/doc?type=OFFER";
        break;

      case "getproduct":
        url += "/compact/product?prodtype=" + userId;
        break;

      case "ordersbyfirm":
        url += "/order/popular/branch" + userId;
        break;

      case "ordersbybranch":
        url += "/order" + userId;

        break;

      case "ordersbystatus":
        url += "/order" + userId;
        break;

      case "ordersbydeliverypool":
        url += "/order" + userId;
        break;

      case "getproductsbyfirmcat":
        url += "/product" + userId;
        break;
      case "ordersbydeliverypool":
        url += "/order" + userId;
        break;

      case "stockadd":
        url += "/product/stock/addM";
        break;

      case "editstock":
        url += "/product/stock/update";
        break;

      case "getstockbyid":
        url += "/product/stock/" + userId;
        break;

      case "getallstock":
        url += "/product/stock?product=" + userId;
        break;

      case "amountpayabledelivery":
        url += "/deliverypool" + userId;
        break;

      case "getfirmbycategory":
        url += "/compact?cat=" + userId;

        break;

      case "getallproducts":
        url += "/dish";

        break;

      case "getallcategorie":
        url += "/category";

        break;

      case "getallmenutype":
        url += "/dish/menutype?index=0&limit=10";

        break;

      case "getalldishesh":
        url += "/dish?category=FOOD&index=0&limit=10";

        break;

      case "getalldrink":
        url += "/dish?category=DRINKS&index=0&limit=10";

        break;

      case "getprodtypebycat":
        url += "/product/prodtype?category=" + userId;

        break;

      case "getprodbybranch":
        url += "/compact?branch=" + userId;
        break;
      case "getallProdby_btype_firm":
        url += "/product" + userId;

        break;

      case "getallvendorsbypin":
        url += "/firm?pincode=" + userId;

        break;

      case "deletestock":
        url += "/product/stock/" + userId;
        break;

      case "prodstockbyfoolloose":
        url += "/product/stock?" + userId;

        break;

      case "getproductbyid":
        url += "/dish/" + userId;
        break;

      case "getallmenutypes":
        url += "/dish/menutype";

        break;

      case "getallmenutypesWithExtra":
        url += "/dish/menutype" + userId;

        break;

      case "getallfirm":
        url += "/firm" + userId;
        break;

      case "getcoupan":
        url += "/discount";
        break;

      case "getcoupanbyid":
        url += "/discount/" + userId;
        break;

      case "getcoupanbyname":
        url += "/discount?coupon=" + userId;
        break;

      case "getnamebymenu":
        url += "/dish" + userId;
        break;

      case "getbestseller":
        url += "/dish/bestseller" + userId;
        break;

      case "getbestsel":
        url += "/dish/bestseller" + userId;
        break;

      case "getallevent":
        url += "/event" + userId;
        break;

      case "getallveg":
        url += "/dish" + userId;
        break;

      case "reviewed":
        url += "/dish/review";
        break;

      case "reviewbyid":
        url += "/dish/review?dish=" + userId;
        break;

      case "dishdetailsbyid_firm":
        url += "/order/clone?id=" + userId;
        break;

      case "getbishbyname":
        url += "/dish/search?name=" + userId;
        break;

      default:
        url += "/stop";
        break;
    }
    return url;
  }

  public loginRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "login":
        url += "/login";
        break;
      case "edit":
        url += "/login/update";
        break;
      case "details":
        url += "/stop/getById/" + userId;
        break;
      case "delete":
        url += "/stop/delete";
        break;

      case "checknumberfromdb":
        url += "/login?username=" + userId;
        break;

      case "updatepass":
        url += "/login/update";
        break;

      default:
        url += "/stop";
        break;
    }
    return url;
  }

  public firmRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "add":
        url += "/branch";
        break;
      case "edit":
        url += "/firm/update";
        break;
      case "details":
        url += "/firm/" + userId;
        break;
      case "delete":
        url += "/firm/" + userId;
        break;
      case "logoadd":
        url += "/firm/logo";
        break;
      case "config":
        url += "/system?firm=" + userId;
        break;
      case "configadd":
        url += "/system/addM";
        break;

      case "configdelete":
        url += "/system/" + userId;
        break;

      case "vendorstatistics":
        url += "/firm/stats?branch=" + userId;
        break;
      default:
        url += "/firm";
        break;
    }
    return url;
  }

  public catRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      default:
        url += "/firm/category";
        break;
    }
    return url;
  }

  public delivertypoolRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case "add":
        url += "/deliverypool";
        break;
      case "edit":
        url += "/deliverypool/update";
        break;
      case "details":
        url += "/deliverypool/" + userId;
        break;
      case "delete":
        url += "/deliverypool/" + userId;
        break;

      case "photoadd":
        url += "/deliverypool/doc";
        break;

      default:
        url += "/deliverypool";
        break;
    }
    return url;
  }

  
  public productRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "add":
        url += "/product";
        break;
      case "edit":
        url += "/product/update";
        break;
      case "details":
        url += "/product/" + userId;
        break;
      case "delete":
        url += "/product/" + userId;
        break;
      case "MPdelete":
        url += "/product/photos/delete";
        break;
      case "productByid":
        url += "/product?firm=" + userId;
        break;
      case "import":
        url += "/product/import";
        break;
      case "docarray":
        url += "/product/photos/add ";
        break;

      case "productByCategory":
        url += "/prescription?firm=" + userId;
        break;

      case "prodbyprodtype":
        url += "/product/prodtype/sale" + userId;
        break;

      case "allproduct":
        url += "/product";
        break;

      case "compact":
        url += "/compact" + userId;
        break;

      case "getallcategory":
        url += "/category";
        break;

      case "getbyvariant":
        url += "/dish/variant?dish=" + userId;
        break;

      default:
        url += "/product?firm=" + sessionStorage.getItem("firm");
        break;
    }
    return url;
  }

  public dishByParam(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "byname":
        url += "/dish/search?name=" + userId;
        break;

      default:
        break;
    }
    return url;
  }

  public customerRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case "add":
        url += "/customer";
        break;
      case "edit":
        url += "/customer/update";
        break;

      default:
        url += "/customer";
        break;
    }
    return url;
  }

  public userRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case "add":
        url += "/user/add";
        break;
      case "signup":
        url += "/user/register";
        break;
      case "login":
        url += "/login";
        break;
      case "edit":
        url += "/user/update";
        break;
      case "details":
        url += "/user/get/" + userId;
        break;
      case "delete":
        url += "/user/delete";
        break;
      case "count":
        url += "/user/count";
        break;
      default:
        url += "/user";
        break;
    }
    return url;
  }

  public mailRestURL(restid, uid) {
    var url = this.server;
    switch (restid) {
      case "otp":
        url += "/mail/otp";
        break;
      case "send":
        url += "/mail/send";
        break;
      case "groupmail":
        url += "/mail/groupmail";
        break;
      case "sendPDF":
        url += "/mail/sendPDF";
        break;

      default:
        url += "/mail";
        break;
    }
    return url;
  }
  public MailRestURL(restid, userId) {
    var url = this.server;
    switch (restid) {
      case "add":
        url += "/mail/config";
        break;
      case "send":
        url += "/mail/send";
        break;
      case "details":
        url += "/mail/config";
        break;
      case "group":
        url += "/mail/groupmail";
        break;
      default:
        url += "/category";
        break;
    }
    return url;
  }

  public unixTimeConverterDate(ts) {
    let datetime = "";
    const dattime1 = "";
    let dd: string;
    let mm: string;
    let temp: string;
    let temp1: string = "0";

    const dtt = new Date(ts * 1000);
    const hours = dtt.getHours();
    const minutes = "0" + dtt.getMinutes();
    const seconds = "0" + dtt.getSeconds();

    const formattedTime = hours + ":" + minutes.substr(-2);

    try {
      const dateVal = "/Date(" + ts + ")/";
      const date = new Date(parseFloat(dateVal.substr(6)));

      // for month only
      temp = (date.getMonth() + 1).toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;
        // alert(temp);
        mm = temp1;
      } else {
        mm = (date.getMonth() + 1).toString();
      }

      // for date only
      temp = date.getDate().toString();
      if (temp.length < 2) {
        temp1 = "0";
        temp1 = temp1 + temp;

        dd = temp1;
      } else {
        dd = date.getDate().toString();
      }

      datetime = date.getFullYear() + "-" + mm + "-" + dd;
    } catch (err) {
      console.log("Unable to parse date data in unixTimeConverter");
      datetime = ts;
    }

    // this.tm=formattedTime;
    return datetime;
  }

  public categoryRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "add":
        url += "/firm/category/prodtype";
        break;
      case "edit":
        url += "/firm/category";
        break;
      case "details":
        url += "/firm/category/" + userId;
        break;
      case "delete":
        url += "/firm/category/" + userId;
        break;
      case "logoadd":
        url += "/firm/logo/add";
        break;
      default:
        url += "/firm/category";
        break;
    }
    return url;
  }

  public smsRestURL(restid, uid) {
    var url = this.server;
    switch (restid) {
      case "send":
        url += "/sms/send";
        break;
      case "groupmail":
        url += "/mail/groupmail";
        break;
      default:
        url += "/mail";
        break;
    }
    return url;
  }

  public notifyRestURL(restid, uid) {
    var url = this.server;
    switch (restid) {
      case "send":
        url += "/notification/cache";
        break;
      case "sendM":
        url += "/notification/addM";
        break;

      case "groupmail":
        url += "/notification/cache";
        break;
      case "get":
        url += "/notification/cache" + uid;
        break;

      case "delete":
        url += "/notification/cache" + uid;
        break;
      default:
        url += "/mail";
        break;
    }
    return url;
  }

  public orderRestURL(restid, userId) {
    let url = this.server;

    switch (restid) {
      case "ordersbyid":
        url += "/order/" + userId;
        break;
      case "ordersbycustomer":
        url += "/order?cust=" + userId;
        break;

      case "getallfood":
        url += "/dish/menutype?category=FOOD";

        break;

      case "getalldrinks":
        url += "/dish/menutype?category=DRINKS";

        break;

      case "getdrink":
        url += "/dish?category=FOOD";

        break;

      case "getfood":
        url += "/dish?category=DRINKS";

        break;

      default:
        break;
    }

    return url;
  }

  public dishRestURL(restid, userId) {
    let url = this.server;
    switch (restid) {
      case "getfood":
        url += "/dish?category=FOOD";
        break;

      case "getdrink":
        url += "/dish?category=DRINKS";
        break;
    
      default:
        url += "/dish";
        break;
    }

    return url;
  }

  public docsRestURL(restid, type) {
    let url = this.server;
    switch (restid) {
      case "add":
        url += "/doc";
        break;
      case "productphotoadd":
        url += "/product/photos ";
        break;
      case "photoadd":
        url += "/employee/photo";
        break;
      case "edit":
        url += "/doc/update";
        break;
      case "delete":
        url += "/doc/delete";
        break;
      case "upload":
        url += "/common/doc/upload";
        break;
      case "details":
        url += "/doc/getId/" + type;
        break;
      default:
        url += "/doc?type=" + type;
        break;
    }
    return url;
  }
}
