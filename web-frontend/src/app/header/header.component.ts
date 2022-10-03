import {Component, OnInit} from '@angular/core';
import {BookService} from '../service/book.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private bookService: BookService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

}
