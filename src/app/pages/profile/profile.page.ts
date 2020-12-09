import { Component, OnInit } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile = {} as Profile;
  image = "assets/imgs/scooter.png"

  constructor(public navCtrl: NavController,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  mettreAjour(){
    this.aFireAuth.authState.pipe(take(1)).subscribe(auth => {
      this.aFireAuthDB.object(`profile/${auth.uid}`).set(this.profile)
      .then( () => this.navCtrl.navigateRoot('login'))

    })
  }

  ngOnInit() {
  }

}
