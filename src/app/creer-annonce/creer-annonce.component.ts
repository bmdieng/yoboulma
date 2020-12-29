import { Component, OnInit } from '@angular/core';
import { APPLICATION_NAME } from '../constant';
import { Annonce } from 'src/models/annonce';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.scss'],
})
export class CreerAnnonceComponent implements OnInit {

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