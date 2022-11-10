
import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import firebase from 'firebase';
import {TokenStorageService} from '../../service/token-storage.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddRoomComponent implements OnInit {
  role: string;
  roomForm: FormGroup;
  nickname = '';
  roomname = '';
  ref = firebase.database().ref('rooms/');
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private  tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0];
    this.roomForm = this.formBuilder.group({
      roomname: [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const room = form;
    this.ref.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        console.log(1);
      } else {
        const newRoom = firebase.database().ref('rooms/').push();
        newRoom.set(room);
        this.router.navigate(['/room/list']);
      }
    });
  }
}

