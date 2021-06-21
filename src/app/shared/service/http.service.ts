import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Http, Headers } from '@angular/http';
//import { AuthenticationService } from './authentication.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams,HttpBackend } from '@angular/common/http';
//import {ApiUrl} from '../../constant/api.constant';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(
    private http: HttpClient
  ) { }
  get(url: string, params: any) {
    return this.http.get<any>(url, {params:params}).pipe(catchError(this.handleError));
  }


  post(url: string, body: any) {
    return this.http.post<any>(url, body,{ }).pipe(catchError(this.handleError));
  }


  delete(url: string, params: any) {
    return this.http.delete<any>(url, {params:params}).pipe(catchError(this.handleError));
  }


    private handleError(error: HttpErrorResponse){
    return throwError(error);
  }

}







// export class HttpService {
//   //token_head
//   private httpWithoutInterceptor: HttpClient;
 
  
//   getHeader() {
//     const headerSettings: any = {};
//     headerSettings['packagename'] = 'kdms-web';
//     headerSettings['companyid'] = 'KDMS01';
//     const hederpac = new HttpHeaders(headerSettings);
//     return hederpac;
//   }

//   constructor(
//     private http: HttpClient,
//     private encrypt:EncryptionService,private httpBackend: HttpBackend) {
//       this.httpWithoutInterceptor = new HttpClient(httpBackend);
//      }


//     get(url: string, params: any) {
//       const token_head = this.getHeader();

      
//       return this.http.get<any>(url, {params:params,headers: token_head}).pipe(catchError(this.handleError));
//     }


//     post(url: string, body: any) {
//       const token_head = this.getHeader();
//       return this.http.post<any>(url, body,{ headers: token_head }).pipe(catchError(this.handleError));
//     }

//     // delete(url: string, body: any) {
//     //   console.log(body);
      
//     //   const token_head = this.getHeader();
//     //   return this.http.delete<any>(url,body).pipe(catchError(this.handleError));
//     // }
//     delete(url: string, params: any) {
//       const token_head = this.getHeader();
//       return this.http.delete<any>(url, {params:params,headers: token_head}).pipe(catchError(this.handleError));
//     }

//     get_no_token(url: string, params: any) {
//       const token_head = this.getHeader();
//       return this.httpWithoutInterceptor.get<any>(url, {params:params,headers: token_head}).pipe(catchError(this.handleError));
//     }

//     post_no_token(url: string, body: any) {
//       const token_head = this.getHeader();
//       return this.httpWithoutInterceptor.post<any>(url, body,{ headers: token_head }).pipe(catchError(this.handleError));
//     }


//   private handleError(error: HttpErrorResponse){
//     return throwError(error);
//   }


// }