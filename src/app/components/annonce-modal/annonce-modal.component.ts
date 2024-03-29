import { Component, OnInit } from '@angular/core';
import { APPLICATION_NAME } from 'src/app/constant';
import { Annonce } from 'src/models/annonce';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-annonce-modal',
  templateUrl: './annonce-modal.component.html',
  styleUrls: ['./annonce-modal.component.scss'],
})
export class AnnonceModalComponent implements OnInit {

  annonce = {} as Annonce;
  profileData: any;
  minDate: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ModalController,
    private alertCtrl: AlertController,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.annonce.telephone =""
    this.minDate = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalCreerAnnoncePage");
  }

  annuler() {
    this.viewCtrl.dismiss();
  }

  posterAnnonce(annonce: Annonce) {
    annonce.etat = true;
    console.log("posterAnnonce ==> ", annonce);
    
    if (annonce.arrivee != "" && annonce.depart != "" && annonce.titre != "" &&
    annonce.telephone != "" && annonce.telephone.length > 8 ) {
      
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
                  subHeader: "Annonce publiée avec succès. Elle sera visible dés qu'elle sera validée par les administrateurs!",
                  buttons: [
                    {
                      text: "OK",
                      handler: () => {
                        this.viewCtrl.dismiss();
                      }
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
  } else {

    this.alertCtrl
                .create({
                  header: APPLICATION_NAME,
                  subHeader: "Les données saisies ne sont pas correctes!",
                  buttons: [
                    {
                      text: "OK",
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
  }

  ngOnInit() {}

}
