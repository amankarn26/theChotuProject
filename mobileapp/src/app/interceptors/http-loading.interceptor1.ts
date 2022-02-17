import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { retryWhen, delay, take, tap, map, catchError, finalize } from 'rxjs/operators';



@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    activeRequests: number = 0;

    constructor(private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        if (this.activeRequests === 0) {
            this.loadingCtrl.getTop().then(hasLoading => {
                if (!hasLoading) {
                    this.loadingCtrl.create({
                        spinner: 'circular',
                        translucent: true
                    }).then(loading => loading.present());
                }
            });
        }

        this.activeRequests++;

        console.log('Activereques while entering: '+  this.activeRequests);
        console.log(req);



        // this.loadingCtrl.getTop().then(hasLoading => {
        //     if (!hasLoading) {
        //         this.loadingCtrl.create({
        //             spinner: 'circular',
        //             translucent: true
        //         }).then(loading => loading.present());
        //     }
        // });

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
        //  this.presentFailedAlert('Server Error');
          if(err.status !== 400){
                    this.showFailedToast('Connection error..!');
            }

        //  this.presentFailedAlert(err.error['msg']);
          return EMPTY;
       }),

       finalize(()=>{
    //    console.log('end api request: ');

         // console.log('Active reques = '+ this.activeRequests);

           //   this.activeRequests--;
          this.activeRequests = this.activeRequests - 1;

          console.log(' Finalize Active reques = '+ this.activeRequests);


          if (this.activeRequests === 0) {

             // this.loadingCtrl.dismiss();

            this.loadingCtrl.getTop().then(hasLoading => {
            console.log('end *************: '+ hasLoading);

            this.hideLoader(hasLoading);
            // if (hasLoading) {
            //     this.loadingCtrl.dismiss();
            //     console.log('dismiss loadding');
            // }

        });

          }
        // this.loadingCtrl.getTop().then(hasLoading => {
        // console.log('end *************: '+ hasLoading);
        // if (hasLoading) {
        //     this.loadingCtrl.dismiss();
        //     console.log('dismiss loadding');

        // }

        // });
       })

            );
    }


    async showRetryToast(retryCount) {
        const toast = await this.toastCtrl.create({
            message: 'Retry: ' + retryCount + '/3',
            duration: 1000
        });
        toast.present();
    }


    async presentFailedAlert(msg) {
        const toast = await this.alertCtrl.create({
            header:'Oops',
            message: msg,
            buttons: ['ok']
        });
        toast.present();
    }


    async showFailedToast(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 6000
        });
        toast.present();
    }

    // async (): Promise<boolean> {
    //     const isVaultLocked = await  this.loadingCtrl.dismiss();

    //     if (isVaultLocked) {
    //       return true;
    //     } else {
    //       return false;
    //     }

    //   }


    async hideLoader(hasLoading) {
        if (hasLoading) {
            await this.loadingCtrl.dismiss();
        }
    }

}
