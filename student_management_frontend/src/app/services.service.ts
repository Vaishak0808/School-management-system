import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map,catchError } from 'rxjs/operators';
import { Observable ,of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  hostAddress = 'http://localhost:8000/'

  constructor(private http: HttpClient, private router : Router ) { }


  post(url:any,data:any){

    // const token = localStorage.getItem('Tokeniser');
    // const header = new HttpHeaders({ Authorization: 'JWT ' + token });
    return this.http.post(this.hostAddress + url, data, {  observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        if (error.status == 401){
          this.router.navigateByUrl('/login')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/login')
          Swal.fire({
            position:'center',
            title:'Session expired',
            icon:'error',
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);
      })
    );
  }

  postDatawithToken(url:any,data:any):Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post(this.hostAddress + url, data, { headers, observe:'response' }).pipe(
        map((response: HttpResponse<any>) => {
        const data = response;
        return data;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        
        if (error.status == 401){
          this.router.navigateByUrl('/login')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/home')
          Swal.fire({
            position:'center',
            title:'Access Denied',
            text:"Sorry, you don't have the permission to access this page",
            icon:'error',
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);

      })
    )
  }

  getDatawithToken(url:any, params = ""):Observable<any> {
    const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({ Authorization: 'JWT ' + token }); 
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.get(this.hostAddress + url, { headers, observe:'response' }).pipe(
        map((response: HttpResponse<any>) => {
        const data = response;
        return data;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        
        if (error.status == 401){
          this.router.navigateByUrl('/login')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/home')
          Swal.fire({
            position:'center',
            title:'Access Denied',
            text:"Sorry, you don't have the permission to access this page",
            icon:'error',
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);

      })
    )
  }

  getData(url:any, params = ""):Observable<any> {
    // const token = localStorage.getItem('Tokeniser');
    // const header = new HttpHeaders({ Authorization: 'JWT ' + token });      
    return this.http.get(this.hostAddress + url, { observe:'response' }).pipe(
        map((response: HttpResponse<any>) => {
        const data = response;
        return data;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
        
        if (error.status == 401){
          this.router.navigateByUrl('/login')
        }
        if (error.status == 403){
          this.router.navigateByUrl('/home')
          Swal.fire({
            position:'center',
            title:'Access Denied',
            text:"Sorry, you don't have the permission to access this page",
            icon:'error',
          })
        }
        if (error.status == 429){
          Swal.fire({
            position:'center',
            title:'Error',
            icon:'error',
            text:error.error.detail,
          })
        }
        return of(null);

      })
    )
  }


}
