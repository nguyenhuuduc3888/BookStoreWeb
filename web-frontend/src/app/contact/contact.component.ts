import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Gởi liên hệ thành công',
        color: '#EBA850',
        icon: 'success',
        timer: 1600,
        confirmButtonColor: '#EBA850',
      });
      this.router.navigate(['']);
    }, err => {
      console.log(err);
      this.toastService.error('Lỗi validate Backend');
    });
  }

}
