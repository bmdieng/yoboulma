import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { User } from "src/models/user";
import {
  NavController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { APPLICATION_NAME } from "src/app/constant";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { Device } from '@ionic-native/device/ngx';
// import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user = {} as User;
  profileData: any;
  fingerExist= false;
  firstConnect = false;

  constructor(
    public authService: AuthenticationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public service: AuthenticationService,
    private storage: NativeStorage,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB: AngularFireDatabase,
    // public firebaseAnalytics: FirebaseAnalytics,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private device: Device,
  ) {
    this.user.email = "";
    this.user.password = "";
  }

  ngOnInit(){
    this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    console.log("isAvailable ", result);

    if(result.isAvailable){
      this.fingerExist = true;
      this.storage.getItem('firstConnect').then(
        (data) => {
          console.log("Get Value firstConnect: ", data);
          this.firstConnect = data
        },
        error => console.error('Error storing firstConnect', error)
      );
    }
  });

  console.log("FingerPrint && firstConnect ==> ", this.fingerExist, this.firstConnect);
  
}

fingerPrint() {
    this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    console.log("isAvailable ", result);
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: APPLICATION_NAME, username: 'momodieng00@hotmail.com', password: 'test2020' })
        .then(result => {
        console.log("Device info => ", this.device.model, this.device.uuid, this.device.version, this.device.platform);

           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
               this.navCtrl.navigateRoot("home");
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error("Error Fingerprint ", error)
        });

    } else {
      // fingerprint auth isn't available
    console.log("Not Available ", result);

    }
  })
  .catch(error => console.error("Error androidFingerprintAuth : ",error));
}

login(user: User) {
    if (user.email != "" && user.password != "") {
      const loading = this.loadingCtrl.create({ cssClass: "my-custom-class" });
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
  //           this.firebaseAnalytics.logEvent('page_view', {page: "LoginPage"})
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));
            if (res.user.emailVerified) {
              this.storage.setItem('firstConnect', true)
              .then(
                () => console.log('Stored firstConnect!'),
                error => console.error('Error storing firstConnect', error)
              );
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
          this.showAlert(error.message);
        });
    } else {
      this.showAlert("Merci de bien renseigner les parametres de connexion ");
    }
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
                // console.log("verif email : ", res);
                if (res != undefined) {
                  this.showAlert(
                    "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse adresse e-mail"
                  );
                }

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
