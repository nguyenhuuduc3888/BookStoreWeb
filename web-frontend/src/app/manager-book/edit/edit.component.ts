import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  buttonAdvertisementStatus = true;
  bookForm: FormGroup;
  id: number;
  categoryList: Category[];

  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private title: Title, private activatedRoute: ActivatedRoute, private bookService: BookService,
              private router: Router, private toastrService: ToastrService) {
    this.title.setTitle('Sửa thông tin sách');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getBook(this.id);
    });
  }

  private getBook(id: number) {
    return this.bookService.detailBook(id).subscribe(book => {
      this.bookForm = new FormGroup({
        id: new FormControl(book.id),
        codeBook: new FormControl(book.codeBook, [Validators.required]),
        bookName: new FormControl(book.bookName, [Validators.required]),
        price: new FormControl(book.price, [Validators.required]),
        author: new FormControl(book.author, [Validators.required]),
        image: new FormControl(book.image),
        totalPages: new FormControl(book.totalPages, [Validators.required]),
        size: new FormControl(book.size, [Validators.required]),
        publicationCompany: new FormControl(book.publicationCompany, [Validators.required]),
        introduce: new FormControl(book.introduce, [Validators.required]),
        releaseDate: new FormControl(book.releaseDate, [Validators.required]),
        category: new FormControl(book.category, [Validators.required]),
      });
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    return this.bookService.getListCategory().subscribe(category => {
      this.categoryList = category;
    });
  }

  compare(value, option): boolean {
    return value.id === option.id;
  }

  submit() {
    const nameImg = this.selectedImage.name;
    const filePath = `book/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        this.buttonAdvertisementStatus = false;
        fileRef.getDownloadURL().subscribe((url) => {
          this.bookForm.patchValue({image: url});
          console.log(url);
          console.log(this.bookForm.value);
          this.bookService.update(this.id, this.bookForm.value).subscribe(
            () => {
              this.router.navigateByUrl('/manager');
              Swal.fire({
                title: 'Thông Báo!',
                text: 'Sửa thành công',
                color: '#EBA850',
                icon: 'success',
                timer: 1200,
                iconColor: ' #EBA850',
              });
            },
            error => {
              this.toastrService.error('Sửa thất bại');
            }
          );
        });
      })
    ).subscribe();
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.bookForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }


  reset() {
    this.selectedImage = null;
    this.checkImgSize = false;
    this.regexImageUrl = false;
    this.editImageState = false;
    this.checkImg = false;
    this.bookService.detailBook(this.id).subscribe(book => {
      this.bookForm = new FormGroup({
        id: new FormControl(book.id),
        codeBook: new FormControl(book.codeBook, [Validators.required]),
        bookName: new FormControl(book.bookName, [Validators.required]),
        price: new FormControl(book.price, [Validators.required]),
        author: new FormControl(book.author, [Validators.required]),
        image: new FormControl(book.image),
        totalPages: new FormControl(book.totalPages, [Validators.required]),
        size: new FormControl(book.size, [Validators.required]),
        publicationCompany: new FormControl(book.publicationCompany, [Validators.required]),
        introduce: new FormControl(book.introduce, [Validators.required]),
        releaseDate: new FormControl(book.releaseDate, [Validators.required]),
        category: new FormControl(book.category, [Validators.required]),
      });
    });
  }

}
