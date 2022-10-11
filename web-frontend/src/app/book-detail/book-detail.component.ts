import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../service/book.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: number;
  codeBook: string;
  author: string;
  description: string;
  image: string;
  name: string;
  price: number;
  releaseDate: string;
  totalPages: number;
  size: string;
  company: string;
  cart: any = this.bookService.getCart();
  book: Book;
  roles: string[] = [];
  role: string;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private tokenStorageService: TokenStorageService) {
    this.title.setTitle('Chi Tiết Sách');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getDetail(this.id);
      console.log(this.id);
    });
    this.role = this.tokenStorageService.getUser().roles[0];

  }

  ngOnInit(): void {
    this.roles = this.tokenStorageService.getUser().roles;
  }

  getDetail(id: number) {
    return this.bookService.detailBook(id).subscribe(book => {
      this.id = book.id;
      this.codeBook = book.codeBook;
      this.name = book.bookName;
      this.price = book.price;
      this.author = book.author;
      this.image = book.image;
      this.totalPages = book.totalPages;
      this.description = book.introduce;
      this.releaseDate = book.releaseDate;
      this.size = book.size;
      this.company = book.publicationCompany;
      this.book = book;
    });
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
        timer: 1200,
        confirmButtonColor: '#EBA850'
      });
    } else {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        icon: 'error',
        timer: 1200,
        confirmButtonColor: '#EBA850'
      });
    }

  }

}
