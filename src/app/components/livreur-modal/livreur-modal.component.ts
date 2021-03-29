import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Livreur } from 'src/models/livreur';
import { take } from 'rxjs/operators';
import { APPLICATION_NAME } from 'src/app/constant';

@Component({
  selector: 'app-livreur-modal',
  templateUrl: './livreur-modal.component.html',
  styleUrls: ['./livreur-modal.component.scss'],
})
export class LivreurModalComponent implements OnInit {

  lat: any;
  lng: any;
  profileData: any;
  livreur= {} as Livreur;

  constructor(public navCtrl: NavController, 
    public viewCtrl: ModalController,  
    private alertCtrl: AlertController,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase,
    // private geolocation: Geolocation,
    public navParams: NavParams) {
      // this.geolocation.getCurrentPosition().then((resp) => {
      //    this.lat = resp.coords.latitude;
      //    this.lng = resp.coords.longitude;
      //  }).catch((error) => {
      //    console.log("Impossible d'obtenir vos coordonnées GPS, merci de ressayer.", error);
      //  });
      this.livreur.telephone = "";
    }
  
    ionViewDidLoad() {
    }
  
    annuler(){
      this.viewCtrl.dismiss();
    }
  
    posterAnnonce(livreur: Livreur){
      livreur.etat = true;    
      // livreur.lat = this.lat;
      // livreur.lng  = this.lng;
      // console.log(this.lat, this.lng);

      if (livreur.dispo != "" && livreur.adresse != "" && livreur.titre != "" &&
        livreur.telephone.length > 8) {

      livreur.date = new Date().toISOString();
      this.aFireAuth.authState.pipe(take(1)).subscribe(auth => {
        //  RECUPERATION DU PRENOM ET DU NOM DE L'UTILISATEUR
        this.aFireAuthDB.object('profile/'+auth.uid).valueChanges().subscribe(val => {
            this.profileData = val;
            livreur.name = this.profileData.prenom+" "+this.profileData.nom;
  
        this.aFireAuthDB.list(`livreurs/`).push(this.livreur)
        .then( () => {
          this.alertCtrl
                .create({
                  header: APPLICATION_NAME,
                  subHeader: "Offre de livraison ajoutée avec succès. Elle sera visible dés qu'elle sera validée par les administrateurs!",
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
        
          })
  
        })
  
      })

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


  ngOnInit() {
  }


}
