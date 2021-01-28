import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { APPLICATION_NAME } from "src/app/constant";
import { Profile } from "src/models/profile";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  profile = {} as Profile;
  image = "assets/imgs/scooter.png";
  action = "create";

  constructor(
    public navCtrl: NavController,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB: AngularFireDatabase,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) {
    this.profile.tel = "";

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }

  mettreAjour(profile: Profile) {
    if (this.validateEmail(profile.email)) {
      if (
        profile.nom != "" &&
        profile.prenom != "" &&
        profile.adresse != "" &&
        profile.tel.length > 8
      ) {
        this.aFireAuth.authState.pipe(take(1)).subscribe(auth => {
          this.aFireAuthDB
            .object(`profile/${auth.uid}`)
            .set(this.profile)
            .then(() => {
              if (this.action == "create") {
                this.navCtrl.navigateRoot("login");
              } else {
                this.alertCtrl
                  .create({
                    header: APPLICATION_NAME,
                    subHeader: "Votre profil a été mis à jour avec succès.",
                    buttons: [
                      {
                        text: "OK",
                        handler: () => {
                          this.navCtrl.pop();
                        }
                      }
                    ]
                    // enableBackdropDismiss: false
                  })
                  .then(alert => {
                    alert.present();
                  });
              }
            });
        });
      } else {
        this.showAlert("Les données saisies ne sont pas correctes!");
      }
    } else {
      this.showAlert("l'adresse email saisie n'est pas valide!");
    }
  }

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.paramMap.get("action");
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  showAlert(msg) {
    this.alertCtrl
      .create({
        header: APPLICATION_NAME,
        subHeader: msg,
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
}
