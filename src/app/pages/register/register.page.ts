import { Component, OnInit } from "@angular/core";
import { User } from "src/models/user";
import { NavController, AlertController, LoadingController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { APPLICATION_NAME } from 'src/app/constant';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(public nav: NavController, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public service : AuthenticationService,
    private fireAuth: AngularFireAuth) {}

  // register and go to home page
  async register(user: User) {
    const loading = this.loadingCtrl.create();
    loading.then(load => {
      load.present();
    });
    try {
      const res = await this.fireAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      
      console.log(res.user);
      loading.then(load => {
        load.dismiss();
      });
      if (res.user.uid) {
        this.service.SendVerificationMail();
        // this.nav.navigateRoot("profile");
        this.nav.navigateRoot(["profile/", "create"]);
      }
    } catch (error) {
      loading.then(load => {
        load.dismiss();
      });
      console.error(error);
      this.showAlert(error.message);
    }
  }

  // go to login page
  login() {
    this.nav.navigateForward("login");
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

  ngOnInit() {}
}
