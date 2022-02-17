import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminhomeComponent } from './dashboard/adminhome/adminhome.component';
import { CategoryComponent } from './master/category/category.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { VendorComponent } from './master/vendor/vendor.component';
import { DepartmentComponent } from './master/department/department.component';
import { ReferenceComponent } from './master/reference/reference.component';
import { InchargeComponent } from './master/incharge/incharge.component';
import { ProductComponent } from './master/product/product.component';
import { RatelableComponent } from './master/ratelable/ratelable.component';
import { TravelrateComponent } from './master/travelrate/travelrate.component';
import { UserroleComponent } from './master/userrole/userrole.component';
import { ProdtypeComponent } from './master/prodtype/prodtype.component';
import { FirmComponent } from './firm/firm.component';
import { SaleleadComponent } from './Billing-Sale/salelead/salelead.component';
import { FollowupComponent } from './Billing-Sale/salelead/followup/followup.component';
import { AccountingComponent } from './Billing-Sale/accounting/accounting.component';

import { ProductstockComponent } from './master/productstock/productstock.component';
import { VoucherComponent } from './Billing-Sale/voucher/voucher.component';
import { ProdpropertyComponent } from './Inventory-Management/prodproperty/prodproperty.component';
import { ProdpropertyvalueComponent } from './Inventory-Management/prodpropertyvalue/prodpropertyvalue.component';
import { PurchaseComponent } from './Purchasing/purchase/purchase.component';
import { PurchaseorderinwardComponent } from './Purchasing/purchaseorderinward/purchaseorderinward.component';
import { SupplierComponent } from './Purchasing/supplier/supplier.component';

import { PackingComponent } from './packing/packing.component';
import { PackingpendingComponent } from './packingpending/packingpending.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { QuoteComponent } from './Billing-Sale/quote/quote.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { DetailquoteComponent } from './Billing-Sale/quote/detailquote/detailquote.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { CustdetailsComponent } from './customer/customer/custdetails/custdetails.component';
import { ReturnChallanComponent } from './return-challan/return-challan.component';
import { ServicingComponent } from './Billing-Sale/servicing/servicing.component';
import { ServicingdetailsComponent } from './Billing-Sale/servicingdetails/servicingdetails.component';
import { ServicingjobComponent } from './Billing-Sale/servicingjob/servicingjob.component';
import { JobcardComponent } from './Billing-Sale/jobcard/jobcard.component';
import { InsurerComponent } from './Purchasing/insurer/insurer.component';
import { BookingComponent } from './Billing-Sale/booking/booking.component';
import { MarketingefwComponent } from './CRM/marketingefw/marketingefw.component';
import { CallwindowComponent } from './CRM/callwindow/callwindow.component';
import { CampaignComponent } from './CRM/campaign/campaign.component';
import { MarketcallreportComponent } from './CRM/marketcallreport/marketcallreport.component';
import { SpeechComponent } from './CRM/speech/speech.component';
import { CallblockComponent } from './CRM/callblock/callblock.component';
import { CustallotComponent } from './CRM/custallot/custallot.component';
import { SendcampaignComponent } from './CRM/sendcampaign/sendcampaign.component';
import { TargetcallComponent } from './CRM/targetcall/targetcall.component';
import { ReferancecallComponent } from './CRM/referancecall/referancecall.component';
import { CustomerstatsComponent } from './CRM/customerstats/customerstats.component';
import { QuoteapprovalComponent } from './quoteapproval/quoteapproval.component';
import { RecentorderComponent } from './CRM/recentorder/recentorder.component';
import { Level2Component } from './level2/level2.component';
import { RlabelComponent } from './rlabel/rlabel.component';
import { MycartComponent } from './Billing-Sale/booking/mycart/mycart.component';
import { SaleComponent } from './Billing-Sale/sale/sale.component';
import { RegcustomerComponent } from './customer/regcustomer/regcustomer.component';
import { DeliverypoolComponent } from './deliverypool/deliverypool.component';
import { VerifyotpComponent } from './registration/verifyotp/verifyotp.component';
import { CheckoutComponent } from './Billing-Sale/checkout/checkout.component';
import { SliderComponent } from './slider/slider.component';
import { VendorpageComponent } from './vendorpage/vendorpage.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliverypoolpageComponent } from './deliverypoolpage/deliverypoolpage.component';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';
import { AmountpayableComponent } from './amountpayable/amountpayable.component';
import { DeliverypoolareaComponent } from './deliverypoolarea/deliverypoolarea.component';
import { DummyscreensComponent } from './dummyscreens/dummyscreens.component';
import { CustomerordersComponent } from './customer/customer/customerorders/customerorders.component';
import { ProfileComponent } from './profile/profile.component';
import { AmountpayabledeliveryComponent } from './amountpayabledelivery/amountpayabledelivery.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CancelledordersComponent } from './orders/cancelledorders/cancelledorders.component';
import { CategorypageComponent } from './pages/categorypage/categorypage.component';
import { VendpageComponent } from './pages/vendpage/vendpage.component';
import { AllproductsComponent } from './pages/allproducts/allproducts.component';
import { VendorsettlementComponent } from './settlement/vendorsettlement/vendorsettlement.component';
import { DeliverysettlementComponent } from './settlement/deliverysettlement/deliverysettlement.component';


import { VendorordersComponent } from './settlement/vendororders/vendororders.component';
import { FirmdetailsComponent } from './firm/firmdetails/firmdetails.component';
import { CancelsettlementComponent } from './settlement/cancelsettlement/cancelsettlement.component';
import { OrderbytypeComponent } from './orders/orderbytype/orderbytype.component';
import { SystemconfigComponent } from './firm/systemconfig/systemconfig.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BranchComponent } from './branch/branch.component';
import { BranchdetailsComponent } from './branch/branchdetails/branchdetails.component';
import { DeliverychargesComponent } from './deliverycharges/deliverycharges.component';
import { DiscountComponent } from './discount/discount.component';
import { EventComponent } from './event/event.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { DishreviewsComponent } from './dishreviews/dishreviews.component';
import { VariantComponent } from './variant/variant.component';
import { TermsandcondComponent } from './termsandcond/termsandcond.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutusComponent } from './aboutus/aboutus.component';



const routes: Routes = [
 // { path: '', redirectTo: 'adminhome', pathMatch: 'full' },

  { path: 'aboutus', component:  AboutusComponent },


  { path: 'privacypolicy', component:  PrivacypolicyComponent },

  { path: 'termsandcond', component:  TermsandcondComponent },

  { path: 'addvariant/:id', component:  VariantComponent },
  { path: 'editvariant/:id', component:  VariantComponent },
  { path: 'managevariant', component:  VariantComponent },
  { path: 'managevariant/:id', component:  VariantComponent },

  { path: 'adddishreviews/:id', component:  DishreviewsComponent },
  { path: 'editdishreviews/:id', component:  DishreviewsComponent },
  { path: 'managedishreviews', component:  DishreviewsComponent },
  { path: 'managedishreviews/:id', component:  DishreviewsComponent },

  { path: 'addadvertisement', component:  AdvertisementComponent },
  { path: 'editadvertisement/:id', component:  AdvertisementComponent },
  { path: 'manageadvertisement', component:  AdvertisementComponent },

  { path: 'addevent', component:  EventComponent },
  { path: 'editevent/:id', component:  EventComponent },
  { path: 'manageevent', component:  EventComponent },

  { path: 'adddiscount', component:  DiscountComponent },
  { path: 'editdiscount/:id', component:  DiscountComponent },
  { path: 'managediscount', component:  DiscountComponent },

  { path: 'add_deliverycharge', component:DeliverychargesComponent },
  { path: 'update_deliverycharge/:id', component:DeliverychargesComponent },
  { path: 'manage_deliverycharge', component:DeliverychargesComponent },

  { path: 'adminhome', component: AdminhomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'custregisteration/:id', component: RegcustomerComponent },


  { path: 'addcategory', component: CategoryComponent },
  { path: 'managecategory', component: CategoryComponent },
  { path: 'editcategory/:id', component: CategoryComponent },

  { path: 'addemployee', component: EmployeeComponent },
  { path: 'manageemployee', component: EmployeeComponent },
  { path: 'updateemployee/:eid', component: EmployeeComponent },
  { path: 'detailemployee/:eid', component: EmployeeComponent },

  { path: 'addvendor', component:  VendorComponent },
  { path: 'managevendor', component:  VendorComponent },
  { path: 'editvendor/:id', component:  VendorComponent },
  { path: 'detailvendor/:id', component:  VendorComponent },


  { path: 'adddept', component: DepartmentComponent },
  { path: 'managedept', component: DepartmentComponent },
  { path: 'updatedept/:id', component: DepartmentComponent },

  { path: 'addreference', component: ReferenceComponent },
  { path: 'managereference', component: ReferenceComponent },
  { path: 'updatereference/:id', component: ReferenceComponent },

  { path: 'addincharge', component: InchargeComponent },
  { path: 'manageincharge', component: InchargeComponent },
  { path: 'updateincharge/:id', component: InchargeComponent },

  { path: 'addproduct', component: ProductComponent },
  { path: 'manageproduct', component: ProductComponent },
  { path: 'editproduct/:id', component: ProductComponent },
  { path: 'detailproduct/:id', component: ProductComponent },

  { path: 'addprodtype', component: ProdtypeComponent },
  { path: 'manageprodtype', component: ProdtypeComponent },
  { path: 'editprodtype/:id', component: ProdtypeComponent },
  { path: 'detailprodtype/:id', component: ProdtypeComponent },



  // { path: 'addratelabel', component:  RatelableComponent },
  // { path: 'manageratelabel', component:RatelableComponent },
  // { path: 'editratelabel/:id', component:  RatelableComponent },
  // { path: 'detailratelabel/:id', component:  RatelableComponent },

  { path: 'addrlabel', component: RlabelComponent },
  { path: 'managerlabel', component:  RlabelComponent },
  { path: 'updaterlabel/:id', component:  RlabelComponent },

  { path: 'addtravelrate', component: TravelrateComponent },
  { path: 'managetravelrate', component: TravelrateComponent },
  { path: 'edittravelrate/:id', component: TravelrateComponent },
  { path: 'detailtravelrate/:id', component: TravelrateComponent },

  { path: 'addrole', component: UserroleComponent },


  { path: 'managerole', component: UserroleComponent },

  { path: 'addfirm', component: FirmComponent },
  { path: 'managefirm', component: FirmComponent },
  { path: 'addfirm/:no', component: FirmComponent },
  { path: 'editfirm/:id', component: FirmComponent },

  { path: 'detailfirm/:id', component: FirmdetailsComponent },
  { path: 'vendor_stock/:id/:category', component: FirmdetailsComponent },
  { path: 'vendor_broadcast', component: FirmdetailsComponent },

  { path: 'managebranch', component: BranchComponent },
  { path: 'addbranch', component: BranchComponent },
  { path: 'addbranch/:no', component: BranchComponent },
  { path: 'editbranch/:id', component: BranchComponent },

  { path: 'detailbranch/:id', component: BranchdetailsComponent },
  { path: 'branch_stock/:id/:category', component: BranchdetailsComponent },
  { path: 'branch_broadcast', component: BranchdetailsComponent },




  { path: 'updatesysconfig/:id', component: SystemconfigComponent },
  // { path: 'editfirm/:id', component: SystemconfigComponent },
  
  

  { path: 'addacount', component: AccountingComponent },
  { path: 'manageaccount', component: AccountingComponent },
  { path: 'editacount/:id', component: AccountingComponent },
  { path: 'detailacount/:id', component: AccountingComponent },

  { path: 'addvoucher', component: VoucherComponent },
  { path: 'addvoucher/:id/:supp', component: VoucherComponent },
  { path: 'managevoucher', component: VoucherComponent },
  { path: 'editvoucher/:id', component: VoucherComponent },
  { path: 'detailvoucher/:id', component: VoucherComponent },

  { path: 'addpstock/:id/:prodtype', component:  ProductstockComponent },
  { path: 'addpstock/:id/:prodtype/:firmid', component:  ProductstockComponent },
  { path: 'addpstock_byvendor/:firmid/:category', component:  ProductstockComponent },


  { path: 'managepstock', component: ProductstockComponent },
  { path: 'managepstock/:pname/:id/:producttype', component: ProductstockComponent },
  { path: 'managepstock/:pname/:id/:producttype/:firmid', component: ProductstockComponent },

  { path: 'editpstock/:id', component:  ProductstockComponent },
  { path: 'detailpstock/:id', component:  ProductstockComponent },
  { path: 'addsalelead', component: SaleleadComponent },
  { path: 'managesalelead', component: SaleleadComponent },
  { path: 'editsalelead/:id', component: SaleleadComponent },
  { path: 'detailsalelead/:id', component: SaleleadComponent },

  { path: 'addfollowup/:id', component: FollowupComponent },
  { path: 'managefollowup', component: FollowupComponent },
  { path: 'editfollowup/:id', component: FollowupComponent },
  { path: 'detailfollowup/:id', component: FollowupComponent },

  // { path: 'addvoucher', component: VoucherComponent },
  // { path: 'addvoucher/:id/:supp', component: VoucherComponent },
  // { path: 'managevoucher', component: VoucherComponent },
  // { path: 'editvoucher/:id', component: VoucherComponent },
  // { path: 'detailvoucher/:id', component: VoucherComponent },

  { path: 'addproperty/:id/:name', component: ProdpropertyComponent },
  { path: 'addproperty', component: ProdpropertyComponent },
  { path: 'manageproperty', component: ProdpropertyComponent },
  { path: 'editproperty/:id', component: ProdpropertyComponent },
  { path: 'detailproperty/:id', component: ProdpropertyComponent },
  // addpropertyvalue

  { path: 'addpropertyvalue/:id/:name', component: ProdpropertyvalueComponent },
  { path: 'addpropertyvalue', component: ProdpropertyvalueComponent },
  { path: 'managepropertyvalue', component: ProdpropertyvalueComponent },
  { path: 'editpropertyvalue/:id', component: ProdpropertyvalueComponent },
  { path: 'detailpropertyvalue/:id', component: ProdpropertyvalueComponent },

  { path: 'addpurchase', component: PurchaseComponent },
  { path: 'managepurchase', component: PurchaseComponent },
  { path: 'editpurchase/:id', component: PurchaseComponent },
  { path: 'detailpurchase/:id', component: PurchaseComponent },


  { path: 'addpurchaseorderinward/:id', component: PurchaseorderinwardComponent },
  { path: 'managepurchaseorderinward', component: PurchaseorderinwardComponent },
  { path: 'editpurchaseorderinward/:id', component: PurchaseorderinwardComponent },
  { path: 'detailpurchaseorderinward/:id', component: PurchaseorderinwardComponent },


  { path: 'addsupplier', component: SupplierComponent },
  { path: 'managesupplier', component: SupplierComponent },
  { path: 'editsupplier/:id', component: SupplierComponent },

  { path: 'packingpending', component:  PackingpendingComponent },

  { path: 'addpacking', component:  PackingComponent },
  { path: 'addpacking/:id', component:  PackingComponent },
  { path: 'managepacking', component: PackingComponent },
  { path: 'editpacking/:id', component:  PackingComponent },
  { path: 'detailpacking/:id', component:  PackingComponent },
  { path: 'detailpackingbyorderno/:id', component:  PackingComponent },

  { path: 'adddispatch', component:  DispatchComponent },
  { path: 'managedispatch', component:  DispatchComponent },
  { path: 'editdispatch/:id', component:  DispatchComponent },
  { path: 'detaildispatch/:id', component:  DispatchComponent },


  { path: 'addquote', component: QuoteComponent },
  { path: 'managequote', component: QuoteComponent },
  { path: 'editquote/:id', component: QuoteComponent },

  { path: 'detailquote/:id', component: DetailquoteComponent },

  { path: 'addcustomer', component: CustomerComponent },
  { path: 'managecustomer', component: CustomerComponent },
  { path: 'updatecustomer/:eid', component: CustomerComponent },
  { path: 'customerdetails/:eid', component: CustdetailsComponent },

  { path: 'addlevel2detail/:id', component: Level2Component },
  { path: 'managelevel2detail', component: Level2Component },
  { path: 'updatelevel2detail/:id', component: Level2Component },
  { path: 'detaillevel2/:id', component: Level2Component },


  { path: 'addreturnchallan', component: ReturnChallanComponent },
  { path: 'managereturnchallan', component: ReturnChallanComponent },
  { path: 'editreturnchallan/:id', component: ReturnChallanComponent },
  { path: 'detailreturnchallan/:id', component: ReturnChallanComponent },

  { path: 'addservicing', component: ServicingComponent },
  { path: 'manageservicing', component: ServicingComponent },
  { path: 'updateservicing/:id', component: ServicingComponent },
  { path: 'detailservicing/:id', component: ServicingComponent },

  { path: 'addservicingdetails/:id', component: ServicingdetailsComponent },
  { path: 'manageservicingdetails/:id', component: ServicingdetailsComponent },
  { path: 'updateservicingdetails/:id', component: ServicingdetailsComponent },
  { path: 'detailservicingdetails/:id', component: ServicingdetailsComponent },

  { path: 'addservicingjob/:id', component: ServicingjobComponent },
  { path: 'manageservicingjob/:id', component: ServicingjobComponent },
  { path: 'updateservicingjob/:id', component: ServicingjobComponent },
  { path: 'detailservicingjob/:id', component: ServicingjobComponent },
  { path: 'viewinvoiceservicing/:id', component: ServicingjobComponent },
  { path: 'viewinvoiceservicing/:sid/:jid/:billto', component: ServicingjobComponent },
  { path: 'invoice/:jid/:billto', component: ServicingjobComponent },  // jid : jobcardid and billto: customer/insuerer




  { path: 'addjobcard/:id', component: JobcardComponent },
  { path: 'managejobcard/:id', component: JobcardComponent },
  { path: 'updatejobcard/:id', component: JobcardComponent },
  { path: 'detailjobcard/:id', component: JobcardComponent },

  { path: 'addinsurer', component: InsurerComponent },
  { path: 'manageinsurer', component: InsurerComponent },
  { path: 'editinsurer/:id', component: InsurerComponent },


  { path: 'custhomepage', component: BookingComponent },

  { path: 'addcall', component: CallwindowComponent },
  { path: 'updatecall/:id', component: CallwindowComponent },
  { path: 'managecall', component: CallwindowComponent },
  { path: 'viewcall', component: CallwindowComponent },



  { path: 'addcampaign', component: CampaignComponent },
  { path: 'managecampaign', component: CampaignComponent },
  { path: 'updatecampaign/:id', component: CampaignComponent },



  { path: 'marketingwindow', component: MarketingefwComponent },

  { path: 'mcallreport', component: MarketcallreportComponent },


  { path: 'addspeech', component: SpeechComponent },
  { path: 'managespeech', component: SpeechComponent },
  { path: 'updatespeech/:id', component: SpeechComponent },
  { path: 'detailspeech/:id', component: SpeechComponent },


  { path: 'addcallblock', component: CallblockComponent },
  { path: 'managecallblock', component: CallblockComponent },
  { path: 'updatecallblock/:id', component: CallblockComponent },
  { path: 'detailcallblock/:id', component: CallblockComponent },



  { path: 'allotnewclient', component: CustallotComponent },

  { path: 'sendcampaign/:cid/:rmid', component: SendcampaignComponent },



  { path: 'addtargetcall', component: TargetcallComponent },
  { path: 'managetargetcall', component: TargetcallComponent },
  { path: 'updatetargetcall/:id', component: TargetcallComponent },
  { path: 'detailtargetcall/:id', component: TargetcallComponent },


  { path: 'addreferancecall', component: ReferancecallComponent },
  { path: 'managereferancecall', component: ReferancecallComponent },
  { path: 'updatereferancecall/:id', component: ReferancecallComponent },
  { path: 'detailreferancecall/:id', component: ReferancecallComponent },

  { path: 'customerstats', component: CustomerstatsComponent },

  { path: 'adminapprovalquote', component: QuoteapprovalComponent },

  { path: 'recentcustorder/:id', component: RecentorderComponent },
  { path: 'custquotehistory/:id', component: RecentorderComponent },

  { path: 'mycart', component: MycartComponent },

  { path: 'sale', component: SaleComponent },
  { path: 'sale/:id', component: SaleComponent },
  { path: 'managesale', component: SaleComponent },

  { path: 'adddeliverypool', component: DeliverypoolComponent },
  { path: 'adddeliverypool/:id', component: DeliverypoolComponent },
  { path: 'managedeliverypool', component: DeliverypoolComponent },
  { path: 'editdeliverypool/:id', component: DeliverypoolComponent },
  { path: 'update_areadeliverypool/:id', component: DeliverypoolComponent },



  { path: 'verifywithotp', component: VerifyotpComponent },

  { path: 'checkout', component: CheckoutComponent },


  { path: 'manageslider', component: SliderComponent },
  { path: 'addslider', component: SliderComponent },
  { path: 'detailslider/:id', component: SliderComponent },

  { path: 'vendorhomepage', component: VendorpageComponent },


  { path: 'active_orders', component: OrdersComponent },
  { path: 'all_delivered_orders', component: OrdersComponent },
  { path: 'closed_orders', component:  OrdersComponent },
  { path: 'detail_order', component:  OrdersComponent },
  { path: 'all_orders', component:  OrdersComponent },


  { path: 'delivery_dashboard', component:DeliverypoolpageComponent },
  { path: 'packed_orders', component:DeliverypoolpageComponent },
  { path: 'placed_orders', component:DeliverypoolpageComponent },

  { path: 'delivered_orders', component:DeliverypoolpageComponent },
  { path: 'pickup_orders', component:DeliverypoolpageComponent },

  { path: 'orderdetails/:id', component:OrderdetailsComponent },

  { path: 'manage_amountpayable', component:AmountpayableComponent },
  { path: 'manage_amountpayable/:id', component:AmountpayableComponent },

  { path: 'manage_amountreceived', component:AmountpayableComponent },

  { path: 'manage_amountreceived', component:DeliverypoolareaComponent },

  { path: 'add_deliverypoolarea', component: DeliverypoolareaComponent },
  { path: 'manage_deliverypoolarea', component: DeliverypoolareaComponent },
  { path: 'update_deliverypoolarea/:id', component: DeliverypoolareaComponent },

  { path: 'dummy_screens', component: DummyscreensComponent },

  { path: 'customer_orders', component:CustomerordersComponent },

  { path: 'myprofile', component:ProfileComponent },

  { path: 'manage_amountpayable_delivery', component:AmountpayabledeliveryComponent },
  { path: 'manage_amountreceived_delivery', component:AmountpayabledeliveryComponent },

  { path: 'homepage', component:HomepageComponent },


  { path: 'cancelled_orders', component:CancelledordersComponent },

  { path: 'by_category/:category/:id', component:CategorypageComponent },
  
  { path: 'by_vendor/:firmname/:id', component:VendpageComponent },

  { path: 'all_products', component:AllproductsComponent },

  { path: 'vendor_settlement', component:VendorsettlementComponent },
  { path: 'vendor_settlement_orders', component:VendorsettlementComponent },

  
  { path: 'delivery_settlement', component:DeliverysettlementComponent },

  { path: 'model', component:VendorordersComponent },


  { path: 'cancelledorder_settlement', component: CancelsettlementComponent},
  
  { path: 'vendor_orderbyid/:id', component: OrderbytypeComponent},
  { path: 'deliverypool_orderbyid/:id', component: OrderbytypeComponent},


  { path: 'invoice_management', component:InvoiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
