import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from "rxjs/operators";


@Component({
  selector: 'app-mon-profile',
  templateUrl: './mon-profile.page.html',
  styleUrls: ['./mon-profile.page.scss'],
})
export class MonProfilePage implements OnInit {

  profileData :any;
  isValid:boolean = false;

  constructor(
    private aFireAuth: AngularFireAuth,
    private aFireAuthDB : AngularFireDatabase) {
      this.aFireAuth.authState.pipe(take(1)).subscribe(data =>{
        console.log(data);    
        if(data && data.email && data.uid){
          this.aFireAuthDB.object('profile/'+data.uid).valueChanges().subscribe(val => {
            this.profileData = val;
            console.log(this.profileData);
          })
        }  
      })
    }

  ngOnInit() {
  }

}
