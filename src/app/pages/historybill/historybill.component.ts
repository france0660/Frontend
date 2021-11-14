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
  public statuspage : number = 1
  public searchdatesaleform: FormGroup;
  public edithistorybillform: FormGroup;
  public value :any = 0;  
  public _value :any = 0;
  public total=0
  public _total = 0
  searchTextinHistorybill:any ;
  ForeditHistorybill :any;
  
  

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private calendar: NgbCalendar,
  ) { 
    this.searchdatesaleform = this.formBuilder.group({
      startDate: calendar.getToday(),
      endDate: calendar.getToday(),
      search : ['', Validators.required],
    });
    this.edithistorybillform = this.formBuilder.group({
      saleId : ['0', Validators.required],
      saleProductname : ['', Validators.required],
      saleDate : ['', Validators.required ],
      billNo : ['', Validators.required],
      firstNameAndLastname : ['', Validators.required],
      saleQuantity : ['', Validators.required],
      salePrice : ['', Validators.required],
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


  public editHistoryBill(item:any){
    this.httpService.get(API_URL.getHistorysaleforEditURL, {
      senditem : item.saleId
    }).subscribe(
      (res: any) => {
        this.ForeditHistorybill = res[0];
        console.log("editproduct = ",this.ForeditHistorybill);
        this.edithistorybillform.controls.saleId.setValue(this.ForeditHistorybill.saleId);
        this.edithistorybillform.controls.saleProductname.setValue(this.ForeditHistorybill.saleProductname);
        this.edithistorybillform.controls.saleDate.setValue(this.ForeditHistorybill.saleDate );
        this.edithistorybillform.controls.billNo.setValue(this.ForeditHistorybill.billNo);
        this.edithistorybillform.controls.firstNameAndLastname.setValue(this.ForeditHistorybill.firstName+' '+this.ForeditHistorybill.lastName);
        this.edithistorybillform.controls.saleQuantity.setValue(this.ForeditHistorybill.saleQuantity);
        this.edithistorybillform.controls.salePrice.setValue(this.ForeditHistorybill.salePrice);
        this.routeTo(2)
      },
      (error) => {
        // console.log(error);
      }
    );
  }

  public submitEditHistoryBill(){
    this.httpService.post(API_URL.submitEditHistorysaleURL, {
      Allofsubmitedithistorybill : this.edithistorybillform.value
    }).subscribe(
      (res: any) => {
        {
          Swal.fire(
              'Successful!',
              'Edit Stock Product Seccess.',
              'success'
          );
          this.routeTo(1)

      } 
        
        
      },
      (error) => {
        // console.log(error);
      }
    );
      this.getProductshowinhistory()
  }

  public resetsum(){
    this._total = 0

  }

  public cancel(){
    this.routeTo(1)

  }

  public routeTo(data:number) {
    this.statuspage = data
    // this.router.navigate(["/home"]);
  }

}
