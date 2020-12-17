import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { User } from "src/models/user";
import {
  NavController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { APPLICATION_NAME } from "src/app/constant";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public service: AuthenticationService
  ) {
    this.user.email = "";
    this.user.password = "";
  }

  ngOnInit() {}

  login(user: User) {
    const loading = this.loadingCtrl.create();
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
            this.navCtrl.navigateRoot("home");
          } else {
            this.showAlert(
              "Merci de verifier que vous avez activé le compte. Un lien vous a été envoyé à linscription. Vous devez cliquer dessus pour l'activer"
            );
          }
        } else {
          this.showAlert("Email ou mot de passe eronné. mMrci de verifier!");
        }
      })
      .catch(error => {
        console.log(error);
        loading.then(load => {
          load.dismiss();
        });
        this.showAlert("Login ou mot de passe eronné, merci de verifier!");
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