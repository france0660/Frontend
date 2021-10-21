import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ViewChild, AfterViewInit } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { Readers } from '@ericblade/quagga2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Allproduct = [];
  Allcode :any;
  public addproductform: FormGroup;
  public scanbarcodeform: FormGroup;
  public loading: boolean = false
  public statuspage : number = 1
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
    ) { 
    this.addproductform = this.formBuilder.group({
      product_id: ['0', Validators.required],
      product_barcode: ['', Validators.required],
      product_name: ['', Validators.required],
      product_quantity: ['', Validators.required],
      product_price: ['', Validators.required],
      
    });
    this.scanbarcodeform = this.formBuilder.group({
      barcode_id: ['', Validators.required],
      barcode_pin: ['', Validators.required],
      barcode_description: ['', Validators.required],
      barcode_perpiece: ['', Validators.required],
      barcode_price: ['', Validators.required],
      barcode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

  public getListProduct(){
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
  }

  // public scanbarcode(){
  //   this.httpService.get(API_URL.barcodescanDetailURL, {
  //     barcode: this.saleform.value.barcode
  //   }).subscribe(
  //     (res: any) => {
  //       this.Allcode = res[0];
  //       this.saleform.controls.productname.setValue(this.Allcode.barcode_description)      // location.reload()
  //       console.log("code"+ res);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }


  public onSubmit(form: any) {
    
    this.httpService.post(API_URL.addproductURL, {
      product_id: this.addproductform.value.product_id,
      product_barcode: this.addproductform.value.product_barcode,
      product_name: this.addproductform.value.product_name,
      product_quantity: this.addproductform.value.product_quantity,
      product_price: this.addproductform.value.product_price,
      
      
      
    }).subscribe(
      (res: any) => {
        this.addproductform.controls.product_barcode.reset()
        this.addproductform.controls.product_name.reset()
        this.addproductform.controls.product_quantity.reset()
        this.addproductform.controls.product_price.reset()
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
