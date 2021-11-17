
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-printbill',
  templateUrl: './printbill.component.html',
  styleUrls: ['./printbill.component.scss']
})
export class PrintbillComponent implements OnInit {
  public loginForm: FormGroup;
  public createUserForm: FormGroup;
  public loading: boolean = false
  public statuspage : number = 1
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.createUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      nickname: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

   ngOnInit(): void {
  }

  public onSubmit() {
    this.loading = true

    if (this.loginForm.status == "VALID"){
      
      this.httpService
      .get(API_URL.loginURL, {
        user_name: this.loginForm.value.username,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (res: any) => {
          if (res.length != 0) {
            this.loading = false
            this.router.navigate(["/home"]);
            console.log(res);
          } else {
            this.loading = false
            Swal.fire('Not Correct',
            'Username or Password is not correct!',
            'error')
          }
        },
        (error) => {
          this.loading = false
          console.log(error);
        }
      );}else{
        this.loading = false
        Swal.fire('Not Correct',
        'Please Fill completely!',
        'error')
      }
    
  }
  public submitForm(form: any) {
    this.httpService.post(API_URL.createUserURL, {
      firstname: this.createUserForm.value.firstname,
      lastname: this.createUserForm.value.lastname,
      nickname: this.createUserForm.value.nickname,
      user_name: this.createUserForm.value.user_name,
      password: this.createUserForm.value.password,

    }).subscribe(
      (res: any) => {
        console.log("Status = " + status)
      }, (error) => {
        if (error.MSG === 'OK') {
          this.createUserForm.reset({
            first_name: '',
            last_name: '',
            nickname: '',
            username: '',
            password: ''
          });
          this.loading = false
          Swal.fire('Success',
        'Register complete',
        'success')
        } 
        else {
          this.loading = false
          Swal.fire('Not Correct',
            'Please Try Again!',
            'error')
        }
      }, () => { }
    )
    
  }

  public routeTo(data:number) {
    this.statuspage = data
    // this.router.navigate(["/home"]);
  }

}

