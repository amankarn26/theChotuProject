import { Pipe, PipeTransform } from '@angular/core';
const lodash = require('../../../node_modules/lodash/lodash.js');
@Pipe({
  name: 'dataFilterPr'
})

export class DataFilterPrPipe implements PipeTransform {

  transform(array: any[], query: string, query2: string): any {
    console.log('Before Query ');
    console.log('Query ' + query);
    console.log('Query 2' + query2);
    if (query) {
      console.log('Query ' + query);
      console.log('Query 2' + query2);
      console.log('-------------------------------------------------------');
      console.log(array);
      if (!Number(query)) {


        if (query2 === 'quotation') {
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.salesmanname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.status.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }

        
        if (query2 === 'orders') {
          console.log(query2)
          console.log(query);

          return lodash.filter(array, row => String(row.invoicenum).toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.custcity.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.status.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }


        if (query2 === 'cust') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }

        
        if (query2 === 'managecategory') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }



        if (query2 === 'supplier') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }

        if (query2 === 'firm') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
             || row.code.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }

        if (query2 === 'vendorbrodcast') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.code.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }

        if (query2 === 'insurer') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
           //  || row.code.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }


        if (query2 === 'name') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.code.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }




        if (query2 === 'VOUCHER') {
          return lodash.filter(array, row => row.paymentmode.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.head.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.sechandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }

        if (query2 === 'servicing') {
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }


        if (query2 === 'servicingjob') {
          return lodash.filter(array, row => row.mechanicname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.vregno.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }

        // if (query2 === 'jobcard') {
        //   return lodash.filter(array, row => row.jobcardno.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.vregno.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.chassisnum.toLowerCase().indexOf(query.toLowerCase()) > -1

        //   );
        // }

        if (query2 === 'ratelabel') {
          return lodash.filter(array, row => row.label.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }


        if (query2 === 'packingentry') {
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.sechandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }


        if (query2 === 'manageinsurance') {
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.policynum.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.sechandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }

        if (query2 === 'employee') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.login.username.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.role.role.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }
        if (query2 === 'retailer') {
          return lodash.filter(array, row => row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.relationshipmgrname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.sechandlername.toLowerCase().indexOf(query.toLowerCase()) > -1


            // || row.retailername.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }


        if (query2 === 'sparepart') {
          console.log('sparepart :*******' + query);
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.brand.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.hsncode.indexOf(query) > -1

            //  || row.brand.toLowerCase().indexOf(query.toLowerCase()) > -1 brand
            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        // booksparepart

        if (query2 === 'booksparepart') {
          console.log('booksparepart screen filter query');
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  ||    row.custcity.toLowerCase().indexOf(query.toLowerCase()) > -1
            //     //  || row.prodname.toLowerCase().indexOf(query.toLowerCase()) > -1
            //     //  || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //      // || row.custcity.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   //    || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1


            //     // || row.quotepaper.type.toLowerCase().indexOf(query.toLowerCase()) > -1
            //     // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            //     // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //     //   || row[0].indexOf(query) > -1

          );
        }



        if (query2 === 'fproduct') {
          console.log('fproduct:*******' + query);
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.menutype.toLowerCase().indexOf(query.toLowerCase()) > -1

        //    || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1
           // || row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'managediscount') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'manageevent') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'dcharge') {
          return lodash.filter(array, row => row.durationtype.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'managedishreviews') {
          console.log('managedishreviews:*******' + query);
          return lodash.filter(array, row => row.addedbyname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.addedbyname.toLowerCase().indexOf(query.toLowerCase()) > -1

        //    || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1
           // || row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'managevariant') {
          console.log('managevariant:*******' + query);
          return lodash.filter(array, row => row.variant.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'productstock') {
          console.log('fproduct:*******' + query);
          return lodash.filter(array, row => row.mfg.toLowerCase().indexOf(query.toLowerCase()) > -1
            //|| row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

           // || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1
         //   || row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'frchallan') {
          console.log('frchallan:*******' + query);
          return lodash.filter(array, row => row.suppname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.state.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.challannum.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'booking') {
          console.log('booking:*******' + query);
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.bookingnum.toLowerCase().indexOf(query.toLowerCase()) > -1

            || row.salesmanname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.prodetails.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'vendor_search') {
          console.log('booking:*******' + query);
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.bookingnum.toLowerCase().indexOf(query.toLowerCase()) > -1

            // || row.salesmanname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.prodetails.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }



        //  bookingvehicle
        if (query2 === 'bookingvehicle') {
          console.log('bookingvehicle:*******' + query);
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            || String(row.ongoingrate).toLowerCase().indexOf(query.toLowerCase()) > -1

            // || row.salesmanname.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.makername.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }







        // managesale

        if (query2 === 'managesale') {
          console.log('selling :*******' + query);
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.bookingnum.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.invoicenum.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.salesmanname.toLowerCase().indexOf(query.toLowerCase()) > -1
            //    || String(row.bookingdate).toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }






        if (query2 === 'porderinward') {
          console.log('porderinward:*******' + query);
          return lodash.filter(array, row => row.suppname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.deliveredby.toLowerCase().indexOf(query.toLowerCase()) > -1

            || row.deliveryperson.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }
        if (query2 === 'purchaseorder') {
          console.log('purchaseorder:*******' + query);
          return lodash.filter(array, row => row.suppname.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.deliveredby.toLowerCase().indexOf(query.toLowerCase()) > -1

            || row.pobyname.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'prate') {
          return lodash.filter(array, row => row.ptype.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.mill.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }


        if (query2 === 'lrate') {
          return lodash.filter(array, row => row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.vname.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        // if (query2 === 'mrate') {
        //   return lodash.filter(array, row => row.base.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.mname.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.vname.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.size.toLowerCase().indexOf(query.toLowerCase()) > -1);
        // }

        if (query2 === 'mrate') {
          return lodash.filter(array, row => row.mname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.vname.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        if (query2 === 'mill') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.ptype.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }


        if (query2 === 'platerate') {
          return lodash.filter(array, row => row.vname.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }

        if (query2 === 'papersize') {
          return lodash.filter(array, row => row.base.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.base.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.ptype.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row.size.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'travelrate') {
          return lodash.filter(array, row => row.vname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.destcity.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        // if (query2 === 'quotation') {
        //   return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
        //      || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
        //      || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
        //      || row.sechandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     // || row.quotepaper.type.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     //   || row[0].indexOf(query) > -1

        //   );
        // }

        if (query2 === 'qenquiry') {
          console.log('inside enquiry');
          console.log(query);
          // return lodash.filter(array, row => row.qtype.indexOf(query) > -1
          // row.handlername.toLowerCase().indexOf(query.toLowerCase()) > -1
          //      ||
          return lodash.filter(array, row => row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.type.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.status.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }

        if (query2 === 'shit') {
          console.log('********************inside shit********************');
          console.log(query);
          // return lodash.filter(array, row => row.qtype.indexOf(query) > -1
          return lodash.filter(array, row => row.pside.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.jobsize.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.qtype.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.status.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.quotepaper.size.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.primhandlername.toLowerCase().indexOf(query.toLowerCase()) > -1
            //   || row[0].indexOf(query) > -1

          );
        }

        // if (query2 === 'enquiry') {
        //   return lodash.filter(array, row => row.qtype.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     // || row.size.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   );
        // }



        // if (query2 === 'enquiry') {
        //   return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   //  || row.product.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   //   || row.qtype.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   //  || row.status.toLowerCase().indexOf(query.toLowerCase()) > -1
        //  /*   || row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 */

        //   );
        // }



        if (query2 === 'postpressrate') {
          return lodash.filter(array, row => row.activity.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'quantitybased') {
          return lodash.filter(array, row => row.activity.toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }
        if (query2 === 'vendor') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.category.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.contactperson.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.type.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.address.city.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }

        if (query2 === 'clubbingrate') {
          return lodash.filter(array, row => row.papertype.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.lamn.toLowerCase().indexOf(query.toLowerCase()) > -1
            || row.papersize.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.colour.toLowerCase().indexOf(query.toLowerCase()) > -1
            /*   || row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1

               || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 */

          );
        }


        if (query2 === 'sheetcount') {
          console.log('************************************sheetcounts********************************');
          return lodash.filter(array, row => row.pside.toLowerCase().indexOf(query.toLowerCase()) > -1
            // || row.lamn.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.papersize.toLowerCase().indexOf(query.toLowerCase()) > -1
            //  || row.colour.toLowerCase().indexOf(query.toLowerCase()) > -1
            /*   || row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1

               || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 */

          );
        }

        // if (query2 === 'sheetcount') {
        //   return lodash.filter(array, row => row.pside.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   || row.pside.toLowerCase().indexOf(query.toLowerCase()) > -1

        //   //  || row.colour.toLowerCase().indexOf(query.toLowerCase()) > -1
        //  /*   || row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1

        //     || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 */

        //   );
        // }

        if (query2 === 'cutrate') {
          return lodash.filter(array, row => row.ratelabel.toLowerCase().indexOf(query.toLowerCase()) > -1

            //  || row.colour.toLowerCase().indexOf(query.toLowerCase()) > -1
            /*   || row.ltype.toLowerCase().indexOf(query.toLowerCase()) > -1

               || row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 */

          );
        }

        if (query2 === 'prodact') {
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }
        if (query2 === 'servicing') {
          return lodash.filter(array, row => row.custname.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }

        if (query2 === 'manage_deliverypoolarea') {
          return lodash.filter(array, row => row.area.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }



        // if (query2 === 'servicingjob') {
        //   return lodash.filter(array, row => row.mechanicname.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.vregno.toLowerCase().indexOf(query.toLowerCase()) > -1
        //     || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1
        //    // || row.vmodel.toLowerCase().indexOf(query.toLowerCase()) > -1


        //   );
        // }

          if (query2 === 'jobcard') {
            return lodash.filter(array, row => row.jobcardno.toLowerCase().indexOf(query.toLowerCase()) > -1
              || row.servicetype.toLowerCase().indexOf(query.toLowerCase()) > -1
              || row.prodname.toLowerCase().indexOf(query.toLowerCase()) > -1

            );
          }

      } else {

        if (query2 === 'fproduct') {

          return lodash.filter(array, row => row.hsncode.indexOf(query) > -1);
        }

        if (query2 === 'sparepart') {

          return lodash.filter(array, row => row.hsncode.indexOf(query) > -1);
        }


        //   if (query2 === 'booking') {
        //     return lodash.filter(array, row => row.hsncode.indexOf(query) > -1);
        // }


        if (query2 === 'quotation') {
          console.log('quotation search called');
          return lodash.filter(array, row => String(row.id).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        }

        
        if (query2 === 'manage_deliverypoolarea') {
          console.log('quotation search called');
          return lodash.filter(array, row => String(row.pincode).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        }

        
        if (query2 === 'vendorbrodcast') {
          console.log('quotation search called');
          return lodash.filter(array, row => String(row.mobile).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        }


        // if (query2 === 'bookingvehicle') {
        //   console.log('bookingvehicle:*******' + query);
        // return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        //   || String(row.ongoingrate).toLowerCase().indexOf(query.toLowerCase()) > -1}

        if (query2 === 'bookingvehicle') {
          console.log('bookingvehicle search called');
          return lodash.filter(array, row => String(row.ongoingrate).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        }


        if (query2 === 'packingentry') {
          console.log('quotation search called');
          return lodash.filter(array, row => String(row.retailorder).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        }


        if (query2 === 'employee') {
          console.log('employee search called');
          return lodash.filter(array, row => String(row.phone).toLowerCase().indexOf(String(query).toLowerCase()) > -1
            || String(row.id).toLowerCase().indexOf(query.toLowerCase()) > -1);
          // return lodash.filter(array, row => String(row.id).toLowerCase().indexOf(String(query).toLowerCase()) > -1);


        }


        if (query2 === 'booksparepart') {
          console.log('booksparepart:*******' + query);
          return lodash.filter(array, row => row.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            || String(row.ongoingrate).toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }


        if (query2 === 'booking') {
          console.log('booksparepart:*******' + query);
          return lodash.filter(array, row => row.custmobile.toLowerCase().indexOf(query.toLowerCase()) > -1


          );
        }

        if (query2 === 'orders') {
          console.log('Orders:*******' + query);
          return lodash.filter(array, row => row.custmobile.toLowerCase().indexOf(query.toLowerCase()) > -1
          || String(row.deliveryaddress.pincode).toLowerCase().indexOf(query.toLowerCase()) > -1

          );
        }


        //   if (query2 === 'employee') {
        //     console.log('quotation search called');
        //     return lodash.filter(array, row => String(row.phone).toLowerCase().indexOf(String(query).toLowerCase()) > -1);
        // }
        /* if (query2 === 'prate') {

          return lodash.filter(array, row => row.gsm.indexOf(query) > -1);
        }

        if (query2 === 'lrate') {
          return lodash.filter(array, row => row.prate.indexOf(Number(query)) > -1 ||
            row.srate.indexOf(Number(query)) > -1);
        } */
      }

    }
    return array;
  }

}
