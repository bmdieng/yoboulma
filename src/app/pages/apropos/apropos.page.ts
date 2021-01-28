import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

  constructor(public emailComposer: EmailComposer) { }

  ngOnInit() {
  }

  envoyerEmail(){
    let email = {
      to: 'linkma2018@gmail.com',
      // cc: 'momodieng00@gmail.com',
      
      subject: 'Contact Yoboulma',
      body: "Bonjour Equipe Yoboulma<br>, je vous contact pour avoir des informations sur l'application",
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
