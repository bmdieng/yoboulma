import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { APPLICATION_VERSION } from './constant';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  v = APPLICATION_VERSION;

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
    private storage: NativeStorage,
    public fcm: FCM,
    public router: Router) {  
      
    this.initializeApp();
    this.ionViewDidEnter()
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
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ionViewDidEnter(){
    this.storage.getItem('name').then(
      (data) => {
        console.log("Get Value : ", data);
        this.profileData = data
      },
      error => console.error('Error storing item', error)
    );

  }

  
}