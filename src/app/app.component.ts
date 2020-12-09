import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/mon-profile',
      icon: 'person'
    },
    {
      title: 'Trouver un livreur',
      url: '/folder/Outbox',
      icon: 'search'
    },
    {
      title: 'Publier une annonce',
      url: '/folder/Favorites',
      icon: 'create'
    },
    {
      title: 'A propos',
      url: '/folder/Favorites',
      icon: 'ribbon'
    },
    {
      title: 'Charte',
      url: '/folder/Archived',
      icon: 'document'
    },
    {
      title: 'Se déconnecter',
      url: '/login',
      icon: 'log-out'
    }
  ];
  public labels = [''];
  profileData: {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase,
    public router: Router) {  
      this.aFireAuth.authState.pipe(take(1)).subscribe(data =>{
        console.log(data);    
        if(data && data.email && data.uid){
          this.aFireAuthDB.object('profile/'+data.uid).valueChanges().subscribe(val => {
            this.profileData = val;
            console.log(this.profileData);
          })
        }  
      })  
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}