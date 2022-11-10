import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../service/token-storage.service';
import {AuthService} from '../service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../service/share.service';
import {CookieService} from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {BookService} from '../service/book.service';

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
  socialUser: SocialUser;
  isLogged: boolean;

  constructor(private title: Title, private formBuild: FormBuilder,
              private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private shareService: ShareService,
              private cookieService: CookieService,
              private authSocial: SocialAuthService,
              private book: BookService) {
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

  signInWithFB(): void {
    this.authSocial.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      this.isLogged = (data != null);
      const user: { password: string; email: string; username: string } = {
        email: data.email,
        password: data.id,
        username: data.name,
      };
      this.book.saveFacebook(user).subscribe(next => {
        this.tokenStorageService.saveTokenSession(data.authToken);
        this.tokenStorageService.saveUserSession(data);
        this.isLogged = true;
        this.router.navigateByUrl('');
        this.formGroup = this.formBuild.group({
          username: [user.username],
          password: [user.password]
        });
        this.onSubmit();
      });
    });
  }

}
