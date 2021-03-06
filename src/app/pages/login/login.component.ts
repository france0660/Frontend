import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

// const Swal = require('sweetalert2');


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      user_id:['0', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      nickname: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.httpService.get(API_URL.TestGet, {}).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
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
            this.loading = false;
            const list = res[0];
            console.log(list);
            
            localStorage.setItem('userDetail',JSON.stringify(list) );//เก็บค่าไว้ใน local
            this.router.navigate(["/placeorders"]);
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
    if (this.createUserForm.invalid) {
      Swal.fire(
          'Input Invalid!',
          'Please enter all require input',
          'error'
      );
  } else {
    this.httpService.post(API_URL.createUserURL, {
      user_id: this.createUserForm.value.user_id,
      firstname: this.createUserForm.value.firstname,
      lastname: this.createUserForm.value.lastname,
      nickname: this.createUserForm.value.nickname,
      user_name: this.createUserForm.value.user_name,
      password: this.createUserForm.value.password,
      
    }).subscribe(
          (res: any) => {
               {
                  Swal.fire(
                      'Successful!',
                      'Create User Success.',
                      'success'
                  );
                  this.routeTo(1)

              } 
              
          },
          (error) => {
          },
      );
  }
  }

  public routeTo(data:number) {
    this.statuspage = data
    // this.router.navigate(["/home"]);
  }
}
