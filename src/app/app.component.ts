import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';

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
      url: '/trouver-annonce',
      icon: 'search'
    },
    {
      title: 'Publier une annonce',
      url: '/publier-annonce',
      icon: 'create'
    },
    {
      title: 'A propos',
      url: '/apropos',
      icon: 'ribbon'
    },
    {
      title: 'Charte',
      url: '/charte',
      icon: 'document'
    },
    {
      title: 'Se déconnecter',
      url: '/login',
      icon: 'log-out'
    }
  ];
  profileData: {};

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase,
    public fcm: FCM,
    public router: Router) {  
      
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // get FCM token
      this.fcm.getToken().then(token => {
        console.log("getToken =>",token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
        console.log("onNotification =>",data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });      

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("onTokenRefresh", token);
      });
    });
  }

  ngOnInit() {
    this.aFireAuth.authState.pipe(take(1)).subscribe(data =>{
      console.log(data);    
      if(data && data.email && data.uid){
        this.aFireAuthDB.object('profile/'+data.uid).valueChanges().subscribe(val => {
          this.profileData = val;
          console.log(this.profileData);
        })
      }  
    })  
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  
}