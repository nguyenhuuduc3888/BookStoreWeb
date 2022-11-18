import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {TokenStorageService} from '../../service/token-storage.service';

firebase.initializeApp(environment.firebaseConfigs);

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-chat',
  templateUrl: './login-chat.component.html',
  styleUrls: ['./login-chat.component.css']
})
export class LoginChatComponent implements OnInit {
  loginForm: FormGroup;
  nickname = this.tokenStorageService.getUser().username;
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('nickname')) {
      this.router.navigate(['/room/list']);
    }
    this.loginForm = this.formBuilder.group({
      nickname: [this.tokenStorageService.getUser().username, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const login = form;
    this.ref.orderByChild('nickname').equalTo(login.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/room/list']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/room/list']);
      }
    });
  }
}
