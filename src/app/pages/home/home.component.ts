import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Allproduct = [];
  public saleform: FormGroup;
  public resetsaleform: FormGroup;
  public loading: boolean = false
  public statuspage : number = 1
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
    ) { 
    this.saleform = this.formBuilder.group({
      buyer_name: ['', Validators.required],
      sale_name: ['', Validators.required],
      sale_date: ['', Validators.required],
      productname: ['', Validators.required],
      quantity: ['', Validators.required],
      priceperpiece: ['', Validators.required],
      sale_status: ['1', Validators.required],
    });
    this.resetsaleform = this.formBuilder.group({
      productname: ['', Validators.required],
      quantity: ['', Validators.required],
      priceperpiece: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.httpService.get(API_URL.getListsaleProductURL, {}).subscribe(
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

  public getListSale(){
    this.httpService.get(API_URL.getListsaleProductURL, {}).subscribe(
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



  public onSubmit(form: any) {
    
    this.httpService.post(API_URL.saleProductURL, {
      buyer_name: this.saleform.value.buyer_name,
      sale_name: this.saleform.value.sale_name,
      sale_date: this.saleform.value.sale_date,
      productname: this.saleform.value.productname,
      quantity: this.saleform.value.quantity,
      priceperpiece: this.saleform.value.priceperpiece,
      sale_status: this.saleform.value.sale_status
      
    }).subscribe(
      (res: any) => {
        this.saleform.controls.productname.reset()
        this.saleform.controls.quantity.reset()
        this.saleform.controls.priceperpiece.reset()
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
