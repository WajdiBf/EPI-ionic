import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public students = [
    {
      firstName: 'Will Smith',
      lastName: 'Smith',
      email: 'a',
      password: 123456
    },
    {
      firstName: 'Jackline Joy',
      lastName: 'Joy',
      email: 'email1@email.com',
      password: 123456
    },
    {
      firstName: 'Alu Arjun',
      lastName: 'Arjun',
      email: 'email2@email.com',
      password: 123456
    },
    {
      firstName: 'Kavitha Kumar',
      lastName: 'Kumar',
      email: 'email3@email.com',
      password: 123456
    },
    {
      firstName: 'John Snow',
      lastName: 'Snow',
      email: 'email4@email.com',
      password: 123456
    },
    {
      firstName: 'Priya Dutt',
      lastName: 'Dutt',
      email: 'email5@email.com',
      password: 123456
    }
  ];
  constructor(private NavCtlr: NavController, private storage: Storage) {

    this.storage.get('usersList').then((response) => {
      if (!response) {
        this.storage.set('usersList', this.students);
      }
      this.storage.get('USER_INFO').then((res) => {
        if (res) {
          this.NavCtlr.navigateRoot('users');
        }
      });
    });


  }

}

