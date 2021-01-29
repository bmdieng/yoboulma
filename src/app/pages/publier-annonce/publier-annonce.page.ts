import { Component, OnInit } from "@angular/core";

import * as firebase from "firebase";
import { ModalController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AnnonceModalComponent } from "src/app/components/annonce-modal/annonce-modal.component";

@Component({
  selector: "app-publier-annonce",
  templateUrl: "./publier-annonce.page.html",
  styleUrls: ["./publier-annonce.page.scss"]
})
export class PublierAnnoncePage implements OnInit {
  public annonces: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase
    .database()
    .ref("/annonces");
  tabDate: Array<any> = [];
  start = 0;
  limit = 10;

  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public loadingCtrl: LoadingController
  ) {
    this.getAnnonces(this.start, this.limit, "");
  }

  ngOnInit() {}

  async creerAnnonce() {
    console.log("Modal creerAnnonce : ");
    const modal = await this.modalCtrl.create({
      component: AnnonceModalComponent
    });
    await modal.present();
  }

  getAnnonces(start, limit, event) {
    const loading = this.loadingCtrl.create({ cssClass: "my-custom-class" });
    loading.then(load => {
      load.present();
    });
    this.itemRef
      .orderByValue()
      .startAt(start)
      .limitToLast(limit)
      .on("value", itemSnapshot => {
        this.annonces = [];
        itemSnapshot.forEach(itemSnap => {
          var dateOne = new Date(); //Year, Month, Date
          var dateTwo = new Date(itemSnap.val().date);
          if (this.compare_dates(dateOne, dateTwo)) {
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
              this.tabDate.push(dateString);
              this.annonces.push(itemSnap.val());
            }
          }
        });
        console.log(this.annonces);
        event.target.complete();
      });
    loading.then(load => {
      load.dismiss();
    });
    return this.annonces;
  }

  consulter(annonce) {
    this.router.navigate(["detail-annonceur/", JSON.stringify(annonce)]);
  }

  compare_dates(date1, date2) {
    if (date1 > date2) return false;
    else if (date1 < date2) return true;
    else return true;
  }

  loadDataAnnonce(event) {
    this.start = this.limit;
    this.limit += 10; // or however many more you want to load
    this.getAnnonces(this.start, this.limit, event);
  }
}
