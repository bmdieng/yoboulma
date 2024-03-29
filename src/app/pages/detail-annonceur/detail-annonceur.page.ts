import { Component, OnInit } from '@angular/core';
import { APPLICATION_NAME } from 'src/app/constant';
import { NavController, AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-annonceur',
  templateUrl: './detail-annonceur.page.html',
  styleUrls: ['./detail-annonceur.page.scss'],
})
export class DetailAnnonceurPage implements OnInit {

  annonceur: any;
  sub: any;
  dateString: string

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ionViewDidLoad() {
  }

  callLivreur() {
    this.alertCtrl
      .create({
        header: APPLICATION_NAME,
        subHeader:
          "Vous êtes sur le point d'appeler l'annonceur " + this.annonceur.auteur,
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
            handler: () => {
              console.log("annuler");
            }
          },
          {
            text: "Appeler",
            handler: () => {
              this.callNumber
                .callNumber("" + this.annonceur.telephone, true)
                .then(res => console.log("Launched dialer!", res))
                .catch(err => console.log("Error launching dialer", err));
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  ngOnInit() {
    this.annonceur = this.activatedRoute.snapshot.paramMap.get("data");
    this.annonceur = JSON.parse(this.annonceur);
    var m = new Date(this.annonceur.date);
    this.dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
  }
}
