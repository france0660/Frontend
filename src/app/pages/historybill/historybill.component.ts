import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { Readers } from '@ericblade/quagga2';
import { NgIf } from '@angular/common';
import { PrintbillComponent } from '../printbill/printbill.component';
import {NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';


@Component({
  selector: 'app-historybill',
  templateUrl: './historybill.component.html',
  styleUrls: ['./historybill.component.scss']
})
export class HistorybillComponent implements OnInit {
  Allproductfromsearch : any = [];
  public searchdatesaleform: FormGroup;
  public value :any = 0;  
  public _value :any = 0;
  public total=0
  public _total = 0
  

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private calendar: NgbCalendar,
  ) { 
    this.searchdatesaleform = this.formBuilder.group({
      startDate: calendar.getToday(),
      endDate: calendar.getToday()
    });
  }

  ngOnInit(): void {
  }


  public getProductshowinhistory(){
    
    console.log("search",this.searchdatesaleform.value);
    const dateTest = this.searchdatesaleform.value.startDate.year+'-'+this.searchdatesaleform.value.startDate.month+'-'+this.searchdatesaleform.value.startDate.day;
    console.log("log",dateTest);
    
    this.httpService.get(API_URL.getProductshowinhistoryURL, {
      start_date:this.searchdatesaleform.value.startDate.year+'-'+this.searchdatesaleform.value.startDate.month+'-'+this.searchdatesaleform.value.startDate.day,
      end_date:this.searchdatesaleform.value.endDate.year+'-'+this.searchdatesaleform.value.endDate.month+'-'+this.searchdatesaleform.value.endDate.day
    }).subscribe(
      (res: any) => {
        
        
        const Allforshow = res;
        console.log("res",Allforshow);
        this.Allproductfromsearch=res;

        this.value=this.Allproductfromsearch
        this._value=this.value  
    
        for(let j=0;j<this._value.length;j++){  
        this.total == 0
         this.total += this.Allproductfromsearch[j].saleQuantity * this.Allproductfromsearch[j].salePrice
        //  this._total += this.total
        //  this.total = 0
        //  console.log("sum = "+this._total)  
        }  
        this._total += this.total
        this.total = 0
        console.log("sum = "+this._total)
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public resetsum(){
    this._total = 0

  }

}
