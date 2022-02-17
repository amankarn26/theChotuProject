import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
// import {productstock} from '../.././Inventory-Management/productstock/productstock.component';
declare var Swal: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private restService: RestService,
    private route: Router,
    private routprms: ActivatedRoute
  ) { }

 public items = JSON.parse(sessionStorage.getItem('items'));

 

  ngOnInit() {

  //  this.checkitems();

  }


  // checkitems(){
  //   this.items=[];

  // }
}
