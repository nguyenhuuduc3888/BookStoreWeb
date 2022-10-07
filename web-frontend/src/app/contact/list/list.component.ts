import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../service/contact.service';
import {Contact} from '../../model/contact';
import {Book} from '../../model/book';
import {Category} from '../../model/category';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contactList: Contact [] = [];
  nameDelete: any;
  idDelete: number;
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';

  constructor(private contactService: ContactService, private toastService: ToastrService, private title: Title) {
    this.title.setTitle('Danh sách liên hệ');
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.contactService.getList(this.indexPagination, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        this.totalPage = new Array(0);
        this.contactList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.contactList = data?.content;
        console.log(this.contactList + ' ok');
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.contactList = null;
    });
  }

  previousPage(event: any) {
    event.preventDefault();
    this.indexPagination--;
    this.ngOnInit();
  }

  nextPage(event: any) {
    event.preventDefault();
    this.indexPagination++;
    this.ngOnInit();
  }

  checkPreviousAndNext() {
    if (this.indexPagination === 0) {
      this.previousPageStyle = 'none';
    } else if (this.indexPagination !== 0) {
      this.previousPageStyle = 'inline-block';
    }
    if (this.indexPagination < (this.totalPage.length - 1)) {
      this.nextPageStyle = 'inline-block';
    } else if (this.indexPagination === (this.totalPage.length - 1) || this.indexPagination > (this.totalPage.length - 1)) {
      this.nextPageStyle = 'none';
    }
  }

  totalElement($event: any) {
    switch ($event.target.value) {
      case '6':
        this.pageSize = 6;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '12':
        this.pageSize = 12;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case '18':
        this.pageSize = 18;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
      case 'full':
        this.pageSize = this.totalElements;
        this.indexPagination = 0;
        this.ngOnInit();
        break;
    }
  }

  openDelete(contact: Contact) {
    this.nameDelete = contact.name;
    this.idDelete = contact.id;
  }

  delete(idDelete: number) {
    this.contactService.delete(idDelete).subscribe(() => {
      this.ngOnInit();
      Swal.fire({
        title: 'Xoá liên hệ thành công',
        color: '#EBA850',
        icon: 'success',
        timer: 1200,
        confirmButtonColor: '#EBA850',
      });
    });
  }

}
