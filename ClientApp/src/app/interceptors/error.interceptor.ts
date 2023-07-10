import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                let errorsM = [];
                for( const key in error.error.errors ){
                  if (error.error.errors[key]){
                    errorsM.push(error.error.errors[key]);
                  }
                  throw errorsM[0];
                }
              }else {
                this.toastr.error(error.error, error.statusText);
              }
              break;
            case 401:
              this.toastr.error("Unauthorized", error.statusText);
              break;
            case 404:
              this.router.navigate(["/not-found"]);
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: { error: error.error}};
              this.router.navigate(["/server-error"], navigationExtras);
              break;
            default:
              this.toastr.error("Something unexpected occoured");
              console.log(error);
          }  
        }
        throw error;
      })
    );
  }
}
