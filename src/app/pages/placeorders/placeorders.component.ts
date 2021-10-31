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




@Component({
  selector: 'app-placeorders',
  templateUrl: './placeorders.component.html',
  styleUrls: ['./placeorders.component.scss']
})
export class PlaceordersComponent implements OnInit {
  Allproduct = [];
  Allcode : any = [];
  userDetail:any;
  public addproductforsaleform: FormGroup;
  public addtotableform: FormGroup;
  public getdetailbarcodeform: FormGroup;
  public loading: boolean = false
  public statuspage : number = 1
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
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
      saleproduct_quantity: ['', Validators.required],
      saleproduct_price: ['', Validators.required],
      barcode: ['', Validators.required],
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
        // location.reload()
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public scanbarcode(){
    if(this.getdetailbarcodeform.value.barcode){
    this.httpService.get(API_URL.getListallproductforsaleURL, {
      barcode: this.getdetailbarcodeform.value.barcode,
    
    }).subscribe(
      (res: any) => {
        const resData = res[0];
        console.log(resData);
        
        this.Allcode.push(resData);
        
        // this.getdetailbarcodeform.controls.saleproduct_name.setValue(this.Allcode.product_name)
        // this.getdetailbarcodeform.controls.saleproduct_quantity.setValue(this.Allcode.product_quantity)  
        // this.getdetailbarcodeform.controls.saleproduct_price.setValue(this.Allcode.product_price)  
        this.getdetailbarcodeform.controls.barcode.reset()      
        console.log("code", this.Allcode);
        // this.Allcode.push(res[0]);
        // const data = res[0]
        // this.Allcode.push(data[0]);
        // console.log(res[0]);
        
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


  public onSubmit() {
    this.httpService.post(API_URL.saleproductURL, {
      listProductForsale:this.Allcode,
      getdetailbarcodeform:this.getdetailbarcodeform.value
      // saleproduct_id: this.addproductforsaleform.value.product_id,
      // saleproduct_employee: this.getdetailbarcodeform.value.saleproduct_employee,
      // saleproduct_name: this.Allcode[0].product_name,
      // saleproduct_quantity: this.Allcode[0].product_quantity,
      // saleproduct_price: this.Allcode[0].product_price,
      // product_price: this.addproductforsaleform.value.product_price,
    }).subscribe(
      (res: any) => {
        // location.reload()
        // this.Allcode.controls.product_name.reset()
        // this.Allcode.controls.product_quantity.reset()
        // this.Allcode.controls.product_price.reset()
        // this.Allcode.controls.reset()
        this.routeTo(2)
        
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
  public routeTo(data:number) {
    this.statuspage = data
    // this.router.navigate(["/home"]);
  }
}