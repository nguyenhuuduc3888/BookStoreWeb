import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import Swal from 'sweetalert2';
import {AppUser} from '../model/app-user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  currentUser: string;
  role: string;
  isLoggedIn = false;
  totalQuantity?: any;
  users: any = [];


  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService, private book: BookService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  ngOnInit(): void {
    this.loadHeader();
    // Nhận dữ liệu từ các component khác;
    this.book.getData.subscribe((res?: any) => {
      this.totalQuantity = res?.quantity;
    });
    this.viewInfor();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }

  logOut() {
    this.tokenStorageService.signOut();
    Swal.fire({
      title: 'Thông Báo!',
      text: 'Đã đăng xuất',
      icon: 'success',
      timer: 1200,
      confirmButtonColor: '#EBA850',
    });
  }

  viewInfor() {
    this.book.findUserName(this.tokenStorageService.getUser().username).subscribe(data => {
      this.users = data;
    });
  }
}
