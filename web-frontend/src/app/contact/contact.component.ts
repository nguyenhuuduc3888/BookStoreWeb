import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {ToastrService} from 'ngx-toastr';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {Category} from '../model/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private title: Title, private contactService: ContactService, private toastService: ToastrService, private router: Router) {
    this.title.setTitle('Liên hệ');
  }

  contactForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }


  submit() {
    const book = this.contactForm.value;
    this.contactService.save(book).subscribe(() => {
      this.contactForm.reset();
      this.toastService.success('Thêm mới thành công', '--Đã thực hện--', {
        timeOut: 2000, progressBar: false
      });
      this.router.navigate(['']);
    }, err => {
      console.log(err);
      this.toastService.error('Lỗi validate Backend');
    });
  }

}
