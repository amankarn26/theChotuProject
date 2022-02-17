import { CustdetailsComponent } from './customer/customer/custdetails/custdetails.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTableModule} from "angular2-datatable";
import {NgxPrintModule} from 'ngx-print';
import { ConfigFactory, ConfigService, API_BASE_URL } from './services/config';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// import { HttpModule } from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// import { RestService } from './services/rest.service';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AdminhomeComponent } from './dashboard/adminhome/adminhome.component';
import { UserroleComponent } from './master/userrole/userrole.component';
import { CategoryComponent } from './master/category/category.component';
import { EmployeeComponent } from './master/employee/employee.component';
import { VendorComponent } from './master/vendor/vendor.component';
import { DepartmentComponent } from './master/department/department.component';
import { ReferenceComponent } from './master/reference/reference.component';
import { InchargeComponent } from './master/incharge/incharge.component';
import { ProductComponent } from './master/product/product.component';
import { RatelableComponent } from './master/ratelable/ratelable.component';
import { TravelrateComponent } from './master/travelrate/travelrate.component';
import { ProdtypeComponent } from './master/prodtype/prodtype.component';
import { FirmComponent } from './firm/firm.component';
import { AccountingComponent } from './Billing-Sale/accounting/accounting.component';
import { VoucherComponent } from './Billing-Sale/voucher/voucher.component';
import { ProductstockComponent } from './master/productstock/productstock.component';
import { SaleleadComponent } from './Billing-Sale/salelead/salelead.component';
import { FollowupComponent } from './Billing-Sale/salelead/followup/followup.component';
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
import { DataFilterPrPipe } from './pipes/data-filter-pr.pipe';
import { DatafilterPipe } from './pipes/datafilter.pipe';
// import { VoucherComponent } from './Billing-Sale/voucher/voucher.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { ReturnChallanComponent } from './return-challan/return-challan.component';
import { ServicingComponent } from './Billing-Sale/servicing/servicing.component';
import { ServicingdetailsComponent } from './Billing-Sale/servicingdetails/servicingdetails.component';
import { ServicingjobComponent } from './Billing-Sale/servicingjob/servicingjob.component';
import { JobcardComponent } from './Billing-Sale/jobcard/jobcard.component';
import { InsurerComponent } from './Purchasing/insurer/insurer.component';
import { BookingComponent } from './Billing-Sale/booking/booking.component';
//import { Level3Component } from './CRM/level-3/level-3.component';
import { MarketingefwComponent } from './CRM/marketingefw/marketingefw.component';
import { CallwindowComponent } from './CRM/callwindow/callwindow.component';
import { CampaignComponent } from './CRM/campaign/campaign.component';

// import { ConfigFactory, ConfigService, API_BASE_URL } from './services/config';
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
import { CustomerhomepageComponent } from './Billing-Sale/customerhomepage/customerhomepage.component';
import { CheckoutComponent } from './Billing-Sale/checkout/checkout.component';
import { NavbarComponent } from './Billing-Sale/navbar/navbar.component';

import { ImageUploadModule } from 'ng2-imageupload';
import { SliderComponent } from './slider/slider.component';
import { VendorpageComponent } from './vendorpage/vendorpage.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliverypoolpageComponent } from './deliverypoolpage/deliverypoolpage.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { OrderdetailsComponent } from './orders/orderdetails/orderdetails.component';
import { KeyValuePipe } from './pipes/key-value.pipe';
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
// import { DishvariantComponent } from './product/dishvariant/dishvariant.component';
import { VariantComponent } from './variant/variant.component';
import { TermsandcondComponent } from './termsandcond/termsandcond.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
// import { HttpRequestInterceptor } from './interceptors/http-loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminhomeComponent,
    UserroleComponent,
    CategoryComponent,
    EmployeeComponent,
    VendorComponent,
    DepartmentComponent,
    ReferenceComponent,
    InchargeComponent,
    ProductComponent,
    RatelableComponent,
    TravelrateComponent,
    ProdtypeComponent,
    FirmComponent,
    AccountingComponent,
    ProductstockComponent,
    VoucherComponent,
    // AccountingComponent,
    SaleleadComponent,
    FollowupComponent,
    ProdpropertyComponent,
    ProdpropertyvalueComponent,
    PurchaseComponent,
    PurchaseorderinwardComponent,
    SupplierComponent,
    PackingComponent,
    PackingpendingComponent,
    DispatchComponent,
    QuoteComponent,
    AuthenticationComponent,
    DetailquoteComponent,
    DataFilterPrPipe,
    DatafilterPipe,
    CustomerComponent,
    CustdetailsComponent,
    ReturnChallanComponent,
    ServicingComponent,
    ServicingdetailsComponent,
    ServicingjobComponent,
    JobcardComponent,
    InsurerComponent,
    BookingComponent,
    MarketingefwComponent,
    CallwindowComponent,
    CampaignComponent,
    MarketcallreportComponent,
    SpeechComponent,
    CallblockComponent,
    CustallotComponent,
    SendcampaignComponent,
    TargetcallComponent,
    ReferancecallComponent,
    CustomerstatsComponent,
    QuoteapprovalComponent,
    RecentorderComponent,
    Level2Component,
    MycartComponent,
    SaleComponent,
    RlabelComponent,
    RegcustomerComponent,
    DeliverypoolComponent,
    VerifyotpComponent,
    CustomerhomepageComponent,
    CheckoutComponent,
    NavbarComponent,
    SliderComponent,
    VendorpageComponent,
    OrdersComponent,
    DeliverypoolpageComponent,
    OrderdetailsComponent,
    KeyValuePipe,
    AmountpayableComponent,
    DeliverypoolareaComponent,
    DummyscreensComponent,
    CustomerordersComponent,
    ProfileComponent,
    AmountpayabledeliveryComponent,
    HomepageComponent,
    CancelledordersComponent,
    CategorypageComponent,
    VendpageComponent,
    AllproductsComponent,
    VendorsettlementComponent,
    DeliverysettlementComponent,
    VendorordersComponent,
    FirmdetailsComponent,
    CancelsettlementComponent,
    OrderbytypeComponent,
    SystemconfigComponent,
    InvoiceComponent,
    BranchComponent,
    BranchdetailsComponent,
    DeliverychargesComponent,
    DiscountComponent,
    EventComponent,
    AdvertisementComponent,
    DishreviewsComponent,
    // DishvariantComponent,
    VariantComponent,
    TermsandcondComponent,
    PrivacypolicyComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   // HttpClient,
    HttpClientModule,
    DataTableModule,
    NgxPrintModule,
    ChartsModule,
    ImageUploadModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })

   // HttpModule
  ],
  providers: [
    ConfigService,{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'CONFIGPATH', useValue: './assets/config.json' },
    { provide: 'APIURL-VAR', useValue: 'API_BASE_URL' },
    {
      provide: API_BASE_URL, useFactory: ConfigFactory,
      deps: [ConfigService, 'CONFIGPATH', 'APIURL-VAR']
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //  {
    //       provide:HTTP_INTERCEPTORS,
    //       useClass: HttpRequestInterceptor,
    //       multi:true
    //     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
