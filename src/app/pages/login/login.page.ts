import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/models/user';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { APPLICATION_NAME } from 'src/app/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  user = {} as User;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController

  ) {
    this.user.email = "";
    this.user.password= "";
  }

  ngOnInit() {}

  login(user: User) {
    const loading = this.loadingCtrl.create();
    loading.then(load => {
      load.present();
    });
    this.authService.SignIn(user.email, user.password)
      .then((res) => {
        loading.then(load => {
          load.dismiss();
        });
        if (res.user.uid) {
          this.navCtrl.navigateRoot('home');       
        } else {
        this.showAlert("l'utilisateur introuvable. Email ou mot de passe eronné, merci de verifier!");
        }
      }).catch((error) => {
        console.log(error);
        loading.then(load => {
          load.dismiss();
        });
        this.showAlert("Login ou mot de passe eronné, merci de verifier!");
      })
  }

  showAlert(text) {
    this.alertCtrl
      .create({
        header: APPLICATION_NAME,
        subHeader: text,
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
        // enableBackdropDismiss: false
      })
      .then(alert => {
        alert.present();
      });
  }

  register(){
    this.navCtrl.navigateForward('register');
  }
  

}