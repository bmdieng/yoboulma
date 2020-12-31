import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { User } from "src/models/user";
import {
  NavController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { APPLICATION_NAME } from "src/app/constant";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;
  profileData: any;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public service: AuthenticationService,
    private storage: NativeStorage,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase
  ) {
    this.user.email = "";
    this.user.password = "";
  }

  ngOnInit() {}

  login(user: User) {
    const loading = this.loadingCtrl.create({cssClass: 'my-custom-class'});
    loading.then(load => {
      load.present();
    });
    this.authService
      .SignIn(user.email, user.password)
      .then(res => {
        loading.then(load => {
          load.dismiss();
        });
        if (res.user.uid) {
          if (res.user.emailVerified) {
            this.aFireAuth.authState.pipe(take(1)).subscribe(data =>{
              console.log(data);    
              if(data && data.email && data.uid){
                this.storage.remove('name');
                this.aFireAuthDB.object('profile/'+data.uid).valueChanges().subscribe(val => {
                  this.profileData = val;
                  // set a key/value
                  this.storage.setItem('name', this.profileData).then(
                    (data) => console.log('Stored first item!',data),
                    error => console.error('Error storing item', error)
                  );
                })
              }  
            })
            
            this.navCtrl.navigateRoot("home");
          } else {
            this.showAlert(
              "Merci de verifier que vous avez activé le compte. Un lien vous a été envoyé à linscription. Vous devez cliquer dessus pour l'activer"
            );
          }
        } else {
          this.showAlert("Email ou mot de passe eronné. Merci de verifier!");
        }
      })
      .catch(error => {
        console.log(error);
        loading.then(load => {
          load.dismiss();
        });
        this.showAlert(error);
      });
  }

  showAlert(text) {
    this.alertCtrl
      .create({
        header: APPLICATION_NAME,
        subHeader: text,
        buttons: [
          {
            text: "OK",
            handler: () => {}
          }
        ]
        // enableBackdropDismiss: false
      })
      .then(alert => {
        alert.present();
      });
  }

  register() {
    this.navCtrl.navigateForward("register");
  }

  forgotPass() {
    this.alertCtrl
      .create({
        cssClass: "my-custom-class",
        header: APPLICATION_NAME,
        inputs: [
          {
            name: "email",
            type: "email",
            placeholder: "saisir votre adresse email"
          }
        ],
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
            }
          },
          {
            text: "Ok",
            cssClass: "danger",
            handler: res => {
              // console.log('Confirm Ok');
              const loading = this.loadingCtrl.create();
              loading.then(load => {
                load.present();
              });
              this.service.PasswordRecover(res.email).then(res => {
                loading.then(load => {
                  load.dismiss();
                });
                this.showAlert(
                  "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse adresse e-mail"
                );
              });
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

}