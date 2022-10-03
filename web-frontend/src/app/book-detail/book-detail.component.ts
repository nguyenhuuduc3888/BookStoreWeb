import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../service/book.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Title} from '@angular/platform-browser';

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

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
    this.title.setTitle('Chi Tiết Sách');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getDetail(this.id);
      console.log(this.id);
    });
  }

  ngOnInit(): void {
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
      console.log(book);
    });
  }

}
