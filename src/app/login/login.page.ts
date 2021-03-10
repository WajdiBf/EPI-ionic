import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  Errors = {
    email: '',
    password: ''
  };


  constructor(public NavCtlr: NavController, private storage: Storage, public formProvider: FormBuilder, private router: Router) {


    this.loginForm = formProvider.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  login() {
    this.Errors = {
      email: '',
      password: ''
    };
    const { email, password } = this.loginForm.value;
    this.storage.get('usersList').then(users => {
      const userExistingCheck = users.filter(item => item.email === email);
      if (userExistingCheck[0]) {
        if (+password !== +userExistingCheck[0].password) {
          this.Errors.password = 'Password Incorrect';
          return;
        }
        this.storage.set('USER_INFO', {
          email, password
        }).then(() => {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              special: JSON.stringify(users)
            }
          };
          this.router.navigate(['users'], navigationExtras);
          // this.NavCtlr.navigateRoot('users', users);
        });
      } else {
        this.Errors.email = 'Email does not Exist';
      }

    });


  }

}
