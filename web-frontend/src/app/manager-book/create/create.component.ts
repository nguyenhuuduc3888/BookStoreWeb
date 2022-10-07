import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../model/category';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedImage: File = null;
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  buttonAdvertisementStatus = true;

  // tslint:disable-next-line:max-line-length
  constructor(private storage: AngularFireStorage, private title: Title, private bookService: BookService, private toastrService: ToastrService, private router: Router) {
    this.title.setTitle('Thêm mới đầu sách');
  }

  categoryList: Category[];

  bookForm = new FormGroup({
    id: new FormControl(),
    codeBook: new FormControl('', [Validators.required]),
    bookName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    totalPages: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    publicationCompany: new FormControl('', [Validators.required]),
    introduce: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getCategory();
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
          this.bookService.save(this.bookForm.value).subscribe(
            () => {
              this.router.navigateByUrl('/manager');
              Swal.fire({
                title: 'Thông Báo!',
                text: 'Thêm mới thành công',
                color: '#EBA850',
                icon: 'success',
                timer: 1200,
                iconColor: ' #EBA850',
              });
            },
            error => {
              this.toastrService.error('Thất bại');
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
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG|PNG)$')) {
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
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG|PNG)$')) {
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

  getCategory() {
    return this.bookService.getListCategory().subscribe(category => {
      this.categoryList = category;
    });
  }
}
