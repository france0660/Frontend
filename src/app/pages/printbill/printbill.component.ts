import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printbill',
  templateUrl: './printbill.component.html',
  styleUrls: ['./printbill.component.scss']
})
export class PrintbillComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  printPage(){
    window.print()
  }
}
