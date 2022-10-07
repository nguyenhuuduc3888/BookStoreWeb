import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private title: Title, private formBuilder: FormBuilder,
              private authService: AuthService,) {
    this.title.setTitle('Quên mật khẩu');
  }
  formGroup: FormGroup;
  isSubmited = false;
  formValid = false;

  validationMessages = {
    username: [
      {type: 'required', message: 'Trường này không được để trống!'},
    ]
  };

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isSubmited = true;
    this.authService.resetPassword(this.formGroup.value.username).subscribe(
      data => {
        Swal.fire({
          title: 'Thông Báo!',
          text: 'Gởi mail thành công',
          color: '#EBA850',
          icon: 'success',
          timer: 1500,
          iconColor: ' #EBA850',
          confirmButtonColor: '#EBA850',
          confirmButtonAriaLabel: '#EBA850',
        });
      }, err => {
        Swal.fire({
          title: 'Thông Báo!',
          text: 'Tài khoản chưa tồn tại',
          color: '#EBA850',
          icon: 'warning',
          timer: 1200,
          iconColor: ' #EBA850',
          confirmButtonColor: '#EBA850',
          confirmButtonAriaLabel: '#EBA850',
        });
        this.isSubmited = false;
      }
    );
  }

}
