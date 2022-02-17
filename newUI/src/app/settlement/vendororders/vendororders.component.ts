import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendororders',
  templateUrl: './vendororders.component.html',
  styleUrls: ['./vendororders.component.css']
})
export class VendorordersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clickmodal()
  {
    document.getElementById('id01').style.display='block'
  }

}
