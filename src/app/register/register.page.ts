import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  constructor(public NavCtlr: NavController, private storage: Storage, public formProvider: FormBuilder) {
    this.registerForm = formProvider.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

  }
  ngOnInit() {
  }

  register() {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this.storage.get('usersList').then(users => {
      const newUser = { firstName, lastName, email, password };
      this.storage.set('usersList',
        [...users,
          newUser]
      );
    });
    this.NavCtlr.navigateRoot('login');
  }

}
