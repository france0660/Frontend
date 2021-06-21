import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/service/http.service';
import { API_URL } from '../../constant/api.constant';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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
        User_Name: this.loginForm.value.username,
        Password: this.loginForm.value.password,
      })
      .subscribe(
        (res: any) => {
          if (res.length != 0) {
            this.loading = false
            this.router.navigate(["/home"]);
            console.log(res);
          } else {
            this.loading = false
            alert("ไป login ใหม่")
          }
        },
        (error) => {
          this.loading = false
          console.log(error);
        }
      );}else{
        this.loading = false
        alert("กรอกให้ถูกต้อง")
      }
    
  }
}
