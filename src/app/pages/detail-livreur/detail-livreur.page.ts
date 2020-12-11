import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, IonRouterOutlet } from "@ionic/angular";
import { APPLICATION_NAME } from "src/app/constant";
import { ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: "app-detail-livreur",
  templateUrl: "./detail-livreur.page.html",
  styleUrls: ["./detail-livreur.page.scss"]
})
export class DetailLivreurPage implements OnInit {
  livreur: any;
  sub: any;

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private routerOutlet: IonRouterOutlet,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.livreur = this.activatedRoute.snapshot.paramMap.get(
    //   "livreur"
    // );
    console.log(this.livreur);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailLivreurPage");
  }

  callLivreur() {
    this.alertCtrl
      .create({
        header: APPLICATION_NAME,
        subHeader:
          "Vous êtes sur le point d'appeler le livreur " + this.livreur.name,
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
            handler: () => {
              console.log("annuler");
            }
          },
          {
            text: "Envoyer",
            handler: () => {
              this.callNumber
                .callNumber("" + this.livreur.telephone, true)
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



  ngOnInit() {}
}
