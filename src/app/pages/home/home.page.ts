import { Component } from "@angular/core";
import * as firebase from "firebase";
import { NavController, AlertController, IonSlides} from "@ionic/angular";
import { Router } from "@angular/router";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { APPLICATION_NAME, APPLICATION_LINK } from "src/app/constant";
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
    public annonces: Array<any> = [];
  public itemRef_: firebase.database.Reference = firebase.database().ref('/annonces');
  profileData: {};
  tabDate: Array<any> = [];
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  limitLiV = 10;
  limitAnn = 10;
  inputLivreur ="";
  inputAnnonce ="";

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: AlertController,
    private socialSharing: SocialSharing,
    public router: Router
  ) {
    this.getLivreurs(this.limitLiV, "");
    this.getAnnonces(this.limitAnn, "");
  }

  OnViewWillLoad() {}


  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  getLivreurs(limit, event) {
    const loading = this.loadingCtrl.create();
    loading.then(load => {
      load.present();
    });
    this.itemRef.orderByValue().limitToLast(limit).on("value", itemSnapshot => {
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
      event.target.complete();
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

  getAnnonces(limit, event){
    const loading = this.loadingCtrl.create({cssClass: 'my-custom-class'});
      loading.then(load => {
        load.present();
      });
    this.itemRef_.orderByValue().limitToLast(limit).on('value', itemSnapshot => {
      this.annonces = [];
      itemSnapshot.forEach( itemSnap => {
        var dateOne = new Date(); //Year, Month, Date    
        var dateTwo = new Date(itemSnap.val().date);   
        if (this.compare_dates(dateOne, dateTwo)) {
          if (itemSnap.val().etat) {
            var m = new Date(itemSnap.val().date);
            var dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
            console.log("date => ", dateString);
            this.tabDate.push(dateString)
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
  
  consulterAnnonce(annonce){
    this.router.navigate(['detail-annonceur/', JSON.stringify(annonce)]);
  }

  openGeoloc() {
    this.router.navigate(["/geoloc"]);
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
        APPLICATION_LINK
      )
      .then(ok => console.log(ok), err => console.log(err));
  }

  loadDataAnnonce(event){
    this.limitAnn += 10; // or however many more you want to load
    this.getLivreurs(this.limitAnn, event);
  }

  loadDataLivreur(event){
    this.limitLiV += 10; // or however many more you want to load
    this.getLivreurs(this.limitLiV, event);
  }

  rechercherLivreur(ev){
    console.log("Value search : ", this.inputLivreur);
    
    if (ev.target.value !="") {
      this.livreurs = [];
      this.itemRef.orderByChild('adresse').equalTo("Mariste").on("value", function(itemSnapshot) {
        
        itemSnapshot.forEach( itemSnap => {
          var dateOne = new Date(); //Year, Month, Date    
          var dateTwo = new Date(itemSnap.val().date);   
          if (this.compare_dates(dateOne, dateTwo)) {
            if (itemSnap.val().etat) {
              var m = new Date(itemSnap.val().date);
              var dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
              console.log("date => ", dateString);
              this.tabDate.push(dateString)
              this.livreurs.push(itemSnap.val());   
              
            }  
          }            
        });
    });
    } else {
      this.getLivreurs(this.limitLiV, "");
    }
    
  }

  rechercherAnnonce(ev){
    console.log("Value search : ",this.inputAnnonce);
    this.inputAnnonce ="Dakar";
    if (ev.target.value !="") {
      this.annonces = [];
      this.itemRef_.orderByChild('arrivee').equalTo(this.inputAnnonce).on("value", function(itemSnapshot) {
       
        itemSnapshot.forEach( itemSnap => {
          var dateOne = new Date(); //Year, Month, Date    
          var dateTwo = new Date(itemSnap.val().date);   
          if (this.compare_dates(dateOne, dateTwo)) {
            if (itemSnap.val().etat) {
              var m = new Date(itemSnap.val().date);
              var dateString = m.getUTCDate() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " à " + m.getUTCHours() + ":" + m.getUTCMinutes();
              console.log("date => ", dateString);
              this.tabDate.push(dateString)
              this.annonces.push(itemSnap.val());   
              
            }  
          }            
        });
    });
    } else {
      this.getLivreurs(this.limitLiV, "");
    }
    
  }

}
