import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { retryWhen, delay, take, tap, map, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor() { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.activeRequests++;
        // console.log('Activereques while entering: '+  this.activeRequests);
        // console.log(req.url);
        return next.handle(req).pipe(
       retryWhen(err =>{
           let retries = 1;
           return err.pipe(
               delay(1000),
               tap(()=>{
                   this.showRetryToast(retries);
               }),
               map(error =>{
                    console.log(error);
                    if(error.status == 400){
                         retries =3;
                    }
                    if(retries++ === 3){
                            throw error;
                    }
                    return error;
               }
               )
           )
       }),catchError(err =>{
          console.log('error: ', err);
          if(err.status !== 400){
                    console.log('Connection error..!');
            }

        //  this.presentFailedAlert(err.error['msg']);
          return EMPTY;
       })

            );
    }


    async showRetryToast(retryCount) {
        const message ='Retry: ' + retryCount + '/3';
        console.log(message);
    }


    async presentFailedAlert(msg) {
        console.log(msg);
    }


    async showFailedToast(msg) {
        console.log(msg);
    }



}
