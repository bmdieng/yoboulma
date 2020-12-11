import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsMapTypeId,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   Environment
// } from '@ionic-native/google-maps';


@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef; 
  map: any;
  markers = [];
  public livreurs: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/livreurs');

  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  ionViewDidLoad(){
    this.initMap();
    this.getLivreurs();
  }
 
  initMap() {

    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      // let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      // this.map = new google.maps.Map(this.mapElement.nativeElement, {
      //   zoom: 15,
      //   center: mylocation
      // });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      // let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/moi.png';
      // this.addMarker(updatelocation,image);    
      this.livreurs.forEach(element => {  
        // let coordLiv = new google.maps.LatLng(element.lat,element.lng);
        let image = 'assets/imgs/livreur.png';
        // this.addMarker(coordLiv,image);
      });

      this.setMapOnAll(this.map);
    });
  }
  
  addMarker(location, image) {
    // let marker = new google.maps.Marker({
    //   position: location,
    //   map: this.map,
    //   icon: image
    // });
    // this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  getLivreurs(){
    this.itemRef.on('value', itemSnapshot => {
      this.livreurs = [];
      itemSnapshot.forEach( itemSnap => {
        this.livreurs.push(itemSnap.val());                  
      });
      console.log(this.livreurs);
    });
    return this.livreurs;
  }

  ngOnInit() {
  }

}
