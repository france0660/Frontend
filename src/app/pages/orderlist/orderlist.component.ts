import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {


  value = 'code1234';
  name = 'test';
  quantity = '1';
  displayValue = true;





  public loading: boolean = false
  public statuspage : number = 1

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { 
   
  }

  ngOnInit(): void {
  }

  get values(): string[] {
    return this.value.split('\n');
    
  }

 
 
}
