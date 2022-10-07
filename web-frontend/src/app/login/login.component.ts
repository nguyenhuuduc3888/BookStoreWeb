import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import {AuthService} from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ShareService} from '../service/share.service';
import {CookieService} from 'ngx-cookie-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  roles: string[] = [];
  username: string;
  returnUrl: string;

  constructor(private title: Title, private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService) {
    this.title.setTitle('Đăng nhập');
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.formGroup = this.formBuild.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );

    if (this.tokenStorageService.getToken()) {
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit() {
    this.authService.login(this.formGroup.value).subscribe(data => {
      if (this.formGroup.value.remember_me === true) {
        this.tokenStorageService.saveTokenLocal(data.token);
        this.tokenStorageService.saveUserLocal(data);
      } else {
        this.tokenStorageService.saveTokenSession(data.token);
        this.tokenStorageService.saveUserSession(data);
      }

      this.authService.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      this.roles = this.tokenStorageService.getUser().roles;
      this.formGroup.reset();
      this.router.navigateByUrl(this.returnUrl);
      Swal.fire({
        title: 'Đăng nhập thành công',
        color: '#EBA850',
        icon: 'success',
        timer: 1200,
        confirmButtonColor: '#EBA850',
      });
      this.shareService.sendClickEvent();
    }, err => {
      this.authService.isLoggedIn = false;
      Swal.fire({
        title: 'Đăng nhập thất bại ,tài khoản chưa tồn tại hoặc sai mật khẩu',
        color: '#EBA850',
        icon: 'warning',
        timer: 1800,
        iconColor: ' #EBA850',
        confirmButtonColor: '#EBA850',
      });
    });
  }

}
