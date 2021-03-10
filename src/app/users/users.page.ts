import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  public usersList: any = [];
  constructor(public NavCtlr: NavController, private route: ActivatedRoute, private storage: Storage, public loader: LoadingController) { }
  async ngOnInit() {
    const loaderProvider = await this.presentLoading();
    await loaderProvider.present();
    this.route.queryParams.subscribe(async params => {
      if (params && params.special) {
        this.usersList = JSON.parse(params.special);
        await loaderProvider.dismiss();
      }
    });

  }
  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.NavCtlr.navigateRoot('login');
    });
  }

  async presentLoading() {
    const loading = await this.loader.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      animated: true,
      // backdropDismiss: true
    });

    return await loading;

  }

  /*  async presentLoadingWithOptions() {
     const loading = await this.loader.create({
       spinner: null,
       duration: 5000,
       message: 'Click the backdrop to dismiss early...',
       translucent: true,
       cssClass: 'custom-class custom-loading',
       backdropDismiss: true
     });
     await loading.present();

     const { role, data } = await loading.onDidDismiss();
     console.log('Loading dismissed with role:', role);
   } */
}
