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






@Component({
  selector: 'app-placeorders',
  templateUrl: './placeorders.component.html',
  styleUrls: ['./placeorders.component.scss']
})
export class PlaceordersComponent implements OnInit {
  Allproduct = [];
  testsearch = [];
  Allcode : any = [];
  Allcodereset : any = [];
  Allbill : any = [];
  Allcheck : any = [];
  userDetail:any;
  billDetail:any;
  productDetail:any;
  billDetailprice0:any
  searchTextinPlaceorder:any ;
  public addproductforsaleform: FormGroup;
  public addtotableform: FormGroup;
  public getdetailbarcodeform: FormGroup;
  public listbillform: FormGroup;
  public checkform: FormGroup;
  public loading: boolean = false
  public statuspage : number = 1

  public total=0
  public _total = 0
  public _bill : any
  private sum=0
  public sumtotal = 0
  
  public value :any = 0;  
  public _value :any = 0;
  public check :any

  public BillNo : any = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
     
    ) { 
    this.addproductforsaleform = this.formBuilder.group({
      product_id: ['0', Validators.required],
      product_barcode: ['', Validators.required],
      product_name: ['', Validators.required],
      product_quantity: ['', Validators.required],
      product_price: ['', Validators.required],
      
    });
    this.addtotableform = this.formBuilder.group({
      barcode_id: ['', Validators.required],
      barcode_pin: ['', Validators.required],
      barcode_description: ['', Validators.required],
      barcode_perpiece: ['', Validators.required],
      barcode_price: ['', Validators.required],
      barcode: ['', Validators.required],
    });
    this.getdetailbarcodeform = this.formBuilder.group({
      saleproduct_employee_id: ['', Validators.required],
      saleproduct_employee: ['', Validators.required],
      saleproduct_name: ['', Validators.required],
      saleproduct_quantity: ['1', Validators.required],
      saleproduct_price: ['', Validators.required],
      barcode: ['', Validators.required],
      saleproduct_bill_id: ['', Validators.required],
    });
    this.listbillform = this.formBuilder.group({
      saleproduct_bill:['', Validators.required]
    });
    this.checkform = this.formBuilder.group({
     checkscan:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userDetail =localStorage.getItem('userDetail');
   this.userDetail=JSON.parse(this.userDetail)
   console.log(this.userDetail.first_name );
   this.getdetailbarcodeform.controls.saleproduct_employee.setValue(this.userDetail.first_name+' '+this.userDetail.last_name);
   this.getdetailbarcodeform.controls.saleproduct_employee_id.setValue(this.userDetail.user_id);
    this.httpService.get(API_URL.getListallProductURL, {}).subscribe(
      (res: any) => {
        this.Allproduct = res;
        
        // location.reload()
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );

    // Readers.BarcodeReader
  }

  // public getListProduct(){
  //   this.httpService.get(API_URL.getListallProductURL, {}).subscribe(
  //     (res: any) => {
  //       this.Allproduct = res;
  //       // location.reload()
  //       console.log(res);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  public getListsaleproductforshow(){
    this.httpService.get(API_URL.getListallproductforshowURL, {}).subscribe(
      (res: any) => {
        this.Allproduct = res;
        this.testsearch = this.Allproduct
        
        // location.reload()
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public scanbarcode(){
    if(this.getdetailbarcodeform.value.barcode ){
    this.httpService.get(API_URL.getListallproductforsaleURL, {
      barcode: this.getdetailbarcodeform.value.barcode,
    
    }).subscribe(
      (res: any) => {
        const resData = res[0];
        localStorage.setItem('productDetail',JSON.stringify(resData) );//เก็บค่าไว้ใน local
        this.productDetail =localStorage.getItem('productDetail');
        this.productDetail=JSON.parse(this.productDetail)
        resData.product_quantity = this.getdetailbarcodeform.value.saleproduct_quantity
        if(this.productDetail.value == undefined){
          console.log("resdata productquantity = ",resData.product_quantity);
          
          this.Allcode.push(resData);
          
          // console.log("code quantity "+this.Allcode.product_quantity);
          // this.Allcode.product_quantity = this.getdetailbarcodeform.value.saleproduct_quantity
          // this.getdetailbarcodeform.controls.saleproduct_name.setValue(this.Allcode.product_name)
          // this.getdetailbarcodeform.controls.saleproduct_quantity.setValue(this.Allcode.product_quantity)  
          // this.getdetailbarcodeform.controls.saleproduct_price.setValue(this.Allcode.product_price)  
          this.getdetailbarcodeform.controls.barcode.reset()   
          this.getdetailbarcodeform.controls.saleproduct_quantity.setValue("1")   
          console.log("code", this.Allcode);
          // this.Allcode.push(res[0]);
          // const data = res[0]
          // this.Allcode.push(data[0]);
          // console.log(res[0]);
          
        }else{
          window.alert("งง")
        }
      },
    
      (error) => {
        console.log(error);
      }
   
    ); 
  }else{
       const obj ={
        product_barcode: null,
        product_id: 1,
        product_name: this.getdetailbarcodeform.value.saleproduct_name,
        product_price: this.getdetailbarcodeform.value.saleproduct_price,
        product_quantity: this.getdetailbarcodeform.value.saleproduct_quantity
       }
       this.Allcode.push(obj);
       this.getdetailbarcodeform.controls.saleproduct_name.reset()
       this.getdetailbarcodeform.controls.saleproduct_price.reset()
       this.getdetailbarcodeform.controls.saleproduct_quantity.reset()
  }
  }

  public createbill(){
    this.httpService.post(API_URL.createBillURL, {
      bill_id:'0',
      bill_price:'0'
    }).subscribe(
      (res: any) => {
        this.value=this.Allcode
        this._value=this.value  
    
        for(let j=0;j<this._value.length;j++){  
        this.total == 0
         this.total += this.Allcode[j].product_quantity * this.Allcode[j].product_price
        //  this._total += this.total
        //  this.total = 0
        //  console.log("sum = "+this._total)  
        }  
        this._total += this.total
        this.total = 0
        console.log("sum = "+this._total)  
        this.routeTo(2)
        
        // location.reload()
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getlistbill(){
    this.httpService.get(API_URL.getListallBillURL, {}).subscribe(
      (res: any) => {
        const Allbill = res[0];
        localStorage.setItem('billDetail',JSON.stringify(Allbill) );//เก็บค่าไว้ใน local

        this.billDetail =localStorage.getItem('billDetail');
        this.billDetail=JSON.parse(this.billDetail)


   this.checkform.controls.checkscan.setValue(this.billDetail.bill_no);
   console.log("check",this.checkform.value.checkscan);
   

    this._bill = this.billDetail.bill_no 
    console.log("ThisgetBill_no = "+this._bill );

        // this._bill = this.billDetail.bill_no
        // console.log("_bill",this.billDetail.bill_no);
        
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  

 

  

  public onSubmit() {
    this.billDetail =localStorage.getItem('billDetail');
   this.billDetail=JSON.parse(this.billDetail)
   console.log("getBill_id = "+this.billDetail.bill_id );
   console.log("getBill_no = "+this.billDetail.bill_no );
   this.getdetailbarcodeform.controls.saleproduct_bill_id.setValue(this.billDetail.bill_id );
   this.checkform.controls.checkscan.setValue(this.billDetail.bill_no);
   console.log("check",this.checkform.value.checkscan);
   

    // this._bill = this.billDetail.bill_no 
    // console.log("ThisgetBill_no = "+this._bill );
    


    this.httpService.post(API_URL.saleproductURL, {
      listProductForsale:this.Allcode,
      getdetailbarcodeform:this.getdetailbarcodeform.value,
      // listbillform:this.listbillform.value
      // listbill:this.billDetail =localStorage.getItem('billDetail'),
      // listbillstring:JSON.parse(this.billDetail)
      
      // saleproduct_id: this.addproductforsaleform.value.product_id,
      // saleproduct_employee: this.getdetailbarcodeform.value.saleproduct_employee,
      // saleproduct_name: this.Allcode[0].product_name,
      // saleproduct_quantity: this.Allcode[0].product_quantity,
      // saleproduct_price: this.Allcode[0].product_price,
      // product_price: this.addproductforsaleform.value.product_price,
    }).subscribe(
      (res: any) => {
        // this._bill = this.billDetail.bill_no 
        // console.log("ThisgetBill_no = "+this._bill );
        


        // this.billDetail =localStorage.getItem('billDetail');
        // this.billDetail=JSON.parse(this.billDetail)
        // this.BillNo = this.billDetail.insertId
        // location.reload()
        // this.Allcode.controls.product_name.reset()
        // this.Allcode.controls.product_quantity.reset()
        // this.Allcode.controls.product_price.reset()
        // this.Allcode.controls.reset()


        // this.value=this.Allcode
        // this._value=this.value  
    
        // for(let j=0;j<this._value.length;j++){  
        // this.total == 0
        //  this.total += this.Allcode[j].product_quantity * this.Allcode[j].product_price
        // //  this._total += this.total
        // //  this.total = 0
        // //  console.log("sum = "+this._total)  
        // }  
        // this._total += this.total
        // this.total = 0
        // console.log("sum = "+this._total)  
        // this.routeTo(2)
        
        // this.addproductform.controls.product_barcode.reset()
        // this.addproductform.controls.product_name.reset()
        // this.addproductform.controls.product_quantity.reset()
        // this.addproductform.controls.product_price.reset()
        // this.saleform.reset({
        //   productname: ' ',
        //   quantity: ' ',
        //   priceperpiece: ' '
          
        // });
      }, 
    )
    
  }


  public addbillprice(){
    this.httpService.post(API_URL.addbillpriceURL, {
      bill_price: this._total,
      bill_id: this.getdetailbarcodeform.value
    }).subscribe(
      (res: any) => {
        this.Allcodereset = []
        this.Allcode = this.Allcodereset
        this._total = 0
        this.routeTo(1)
        
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }



  public routeTo(data:number) {
    this.statuspage = data
    // this.router.navigate(["/home"]);
  }

  // findsum(){    
  //   // debugger  
    
  //   this.value=this.Allcode
  //   this._value=this.value  
    
  //   for(let j=0;j<this._value.length;j++){  
  //       this.total == 0
  //        this.total += this.Allcode[j].product_quantity * this.Allcode[j].product_price
  //       //  this._total += this.total
  //       //  this.total = 0
  //       //  console.log("sum = "+this._total)  
  //   }  
  //   this._total += this.total
  //        this.total = 0
  //   console.log("sum = "+this._total)  
  // }  



  printPage(){
    window.print()
  }
}