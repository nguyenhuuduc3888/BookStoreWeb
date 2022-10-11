import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {Book} from '../model/book';
import {Category} from '../model/category';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roles: string[] = [];
  constructor(private router: Router, private title: Title, private bookService: BookService,
              private tokenStorageService: TokenStorageService) {
    this.title.setTitle('Trang chủ');
  }

  searchForm: FormGroup = new FormGroup({
    author: new FormControl(''),
    bookName: new FormControl(''),
    category: new FormGroup({
      categoryName: new FormControl('')
    })
  });
  categorySearch = '';
  nameSearch = '';
  authorSearch = '';
  bookList: Book [] = [];
  categoryList: Category [] = [];
  number: number;
  indexPagination = 0;
  totalPage: string[];
  numberOfElement = 0;
  totalElements = 0;
  pageSize: number;
  previousPageStyle = 'inline-block';
  nextPageStyle = 'inline-block';
  displayPagination = 'inline-block';
  id: any;
  image: any;
  price: any;
  author: any;
  name: any;
  cart: any = this.bookService.getCart();

  ngOnInit(): void {
    this.searchBook();
    this.getListSearch();
    this.getCategoryList();
    setTimeout(function() {
      this.book.changeData({
        quantity: this.book.getCartTotalQuantity()
      });
    }, 1);
    this.roles = this.tokenStorageService.getUser().roles;
  }

  addToCart(book: any) {
    const idx = this.cart.findIndex((item: any) => {
      // tslint:disable-next-line:triple-equals
      return item.id == book.id;
    });
    if (idx >= 0) {
      this.cart[idx].quantity += 1;
    } else {
      const cartItem: any = {
        image: book.image,
        id: book.id,
        author: book.author,
        name: book.bookName,
        price: book.price,
        quantity: 1,
      };
      this.cart.push(cartItem);
    }
    if (this.roles.length > 0) {
      this.bookService.saveCart(this.cart);
      // gọi phương thức khi có sự thay đổi giỏ hàng
      this.bookService.changeData({
        quantity: this.bookService.getCartTotalQuantity()
      });
      Swal.fire({
        title: 'Thêm vào giỏ thành công',
        icon: 'success',
        timer: 800,
        confirmButtonColor: '#EBA850'
      });
    } else {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        icon: 'error',
        timer: 1000,
        confirmButtonColor: '#EBA850'
      });
    }

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
          title: 'Không có kết quả nào phù hợp',
          icon: 'warning',
          timer: 1200,
          confirmButtonColor: '#EBA850'
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
        console.log(this.bookList + ' ok');
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
}
