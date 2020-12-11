import { Component, OnInit } from "@angular/core";
import { Annonce } from "src/models/annonce";
import {
  NavController,
  AlertController,
  NavParams,
  ModalController
} from "@ionic/angular";
import { ViewController } from "@ionic/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from "rxjs/operators";
import { APPLICATION_NAME } from "src/app/constant";

@Component({
  selector: "app-modal-creer-annonce",
  templateUrl: "./modal-creer-annonce.page.html",
  styleUrls: ["./modal-creer-annonce.page.scss"]
})
export class ModalCreerAnnoncePage implements OnInit {
  annonce = {} as Annonce;
  profileData: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ModalController,
    private alertCtrl: AlertController,
    private aFireAuth: AngularFireAuth,
    private storage: Storage,
    private aFireAuthDB: AngularFireDatabase,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalCreerAnnoncePage");
  }

  annuler() {
    this.viewCtrl.dismiss();
  }

  posterAnnonce(annonce: Annonce) {
    annonce.etat = true;

    this.aFireAuth.authState.pipe(take(1)).subscribe(auth => {
      //  RECUPERATION DU PRENOM ET DU NOM DE L'UTILISATEUR
      this.aFireAuthDB
        .object("profile/" + auth.uid)
        .valueChanges()
        .subscribe(val => {
          this.profileData = val;
          annonce.auteur = this.profileData.prenom + " " + this.profileData.nom;

          this.aFireAuthDB
            .list(`annonces/`)
            .push(this.annonce)
            .then(() => {
              this.alertCtrl
                .create({
                  header: APPLICATION_NAME,
                  subHeader: "Annonce publiée avec succès!",
                  buttons: [
                    {
                      text: "Quitter",
                      handler: () => {}
                    }
                  ]
                  // enableBackdropDismiss: false
                })
                .then(alert => {
                  alert.present();
                });
            });
        });
    });
  }

  ngOnInit() {}
}
