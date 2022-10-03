import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-restigers',
  templateUrl: './restiger.component.html',
  styleUrls: ['./restiger.component.css']
})
export class RestigerComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Đăng ký');
  }

  ngOnInit(): void {
  }

}
