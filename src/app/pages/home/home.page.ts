import { Component } from "@angular/core";
import * as firebase from "firebase";
import { NavController, AlertController, IonSlides} from "@ionic/angular";
import { Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { APPLICATION_NAME } from "src/app/constant";
import { ViewChild } from '@angular/core';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase
    .database()
    .ref("/livreurs");
  profileData: {};
  tabDate: Array<any> = [];
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: AlertController,
    private socialSharing: SocialSharing,
    public router: Router
  ) {
    this.getLivreurs();
  }

  OnViewWillLoad() {}


  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  getLivreurs() {
    const loading = this.loadingCtrl.create();
    loading.then(load => {
      load.present();
    });
    this.itemRef.on("value", itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach(itemSnap => {
        // var dateOne = new Date(); //Year, Month, Date
        // var dateTwo = new Date(itemSnap.val().date);
        // if (this.compare_dates(dateOne, dateTwo)) {
          if (itemSnap.val().etat) {
            var m = new Date(itemSnap.val().date);
            var dateString =
              m.getUTCDate() +
              "/" +
              (m.getUTCMonth() + 1) +
              "/" +
              m.getUTCFullYear() +
              " à " +
              m.getUTCHours() +
              ":" +
              m.getUTCMinutes();
            console.log("date => ", dateString);
            this.tabDate.push(dateString);
            this.livreurs.push(itemSnap.val());
          }
        // }
      });
      console.log(this.livreurs);
    });
    loading.then(load => {
      load.dismiss();
    });
    return this.livreurs;
  }

  consulter(livreur) {
    this.router.navigate(["detail-livreur/", JSON.stringify(livreur)]);
  }

  openGeoloc() {
    this.router.navigate(["/geoloc"]);
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 1000);
  }

  compare_dates(date1, date2) {
    if (date1 > date2) return false;
    else if (date1 < date2) return true;
    else return true;
  }

  shareApp() {
    this.socialSharing
      .share(
        "Bonjour, je te partage cette application mobile de mise en relation entre particulier et coursier à moto, c'est très cool. tu peux l'installer en cliquant sur le lien suivant",
        APPLICATION_NAME,
        "",
        "https://bit.ly/2L3ZB0S"
      )
      .then(ok => console.log(ok), err => console.log(err));
  }
}
