import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {Book} from '../../model/book';
import {Category} from '../../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-manager-book',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    author: new FormControl(''),
    bookName: new FormControl(''),
    category: new FormGroup({
      categoryName: new FormControl('')
    })
  });

  bookList: Book[] = [];
  categoryList: Category[] = [];
  nameDelete: any;
  idDelete: number;
  categorySearch = '';
  nameSearch = '';
  authorSearch = '';
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';
  totalQuantity = 0;

  constructor(private title: Title, private bookService: BookService) {
    this.title.setTitle('Danh sách các đầu sách ');
  }

  ngOnInit(): void {
    this.searchBook();
    this.getListSearch();
    this.getCategoryList();
    this.bookService.getData.subscribe((res: any) => {
      this.totalQuantity = res.quantity;
    });

  }

  getCategoryList() {
    this.bookService.getListCategory().subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList + ' danh mục');
    });
  }

  getListSearch() {
    this.bookService.getListAndSearch(this.indexPagination, this.categorySearch, this.authorSearch,
      this.nameSearch, this.pageSize).subscribe((data?: any) => {
      if (data === null) {
        Swal.fire({
          title: 'Thông Báo!',
          text: 'Không tìm thấy',
          color: '#EBA850',
          icon: 'warning',
          timer: 1200,
          iconColor: ' #EBA850',
          confirmButtonColor: '#EBA850',
          confirmButtonAriaLabel: '#EBA850',
        });
        this.totalPage = new Array(0);
        this.bookList = [];
        this.displayPagination = 'none';
      } else {
        this.number = data?.number;
        console.log(this.number);
        this.pageSize = data?.size;
        this.numberOfElement = data?.numberOfElements;
        this.bookList = data?.content;
        this.totalPage = new Array(+data.totalPages);
        this.totalElements = data?.totalElements;
      }
      this.checkPreviousAndNext();
    }, error => {
      this.bookList = null;
    });
  }

  searchBook() {
    this.categorySearch = this.searchForm.value.category.categoryName;
    this.authorSearch = this.searchForm.value.author;
    this.nameSearch = this.searchForm.value.bookName;
    this.getListSearch();
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

  openDelete(book: Book) {
    this.nameDelete = book.bookName;
    this.idDelete = book.id;
  }

  delete(idDelete: number) {
    this.bookService.deleteBook(idDelete).subscribe(() => {
      this.ngOnInit();
      Swal.fire({
        title: 'Thông Báo!',
        text: 'Xoá thành công',
        color: '#EBA850',
        icon: 'success',
        confirmButtonText: 'Tắt thông báo',
        iconColor: ' #EBA850',
      });
    });
  }
}
