import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {Router, Routes} from '@angular/router';
import {BookService} from '../service/book.service';
import {render} from 'creditcardpayments/creditCardPayments';
import {CartDetailService} from '../service/cart-detail.service';
import {TokenStorageService} from '../service/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalQuantity: number = this.bookService.getCartTotalQuantity();
  totalMoney: number = this.bookService.getCartTotalMany();
  carts: any = [];

  // tslint:disable-next-line:max-line-length
  constructor(private tokenStorageService: TokenStorageService, private title: Title, private router: Router, private bookService: BookService, private cartDetailService: CartDetailService) {
    this.title.setTitle('GIỏ hàng');
  }

  ngOnInit(): void {
    setTimeout(function() {
      this.book.changeData({
        quantity: this.book.getCartTotalQuantity()
      });
    }, 1);
    this.carts = this.bookService.getCart();
    this.bookService.changeData({
      quantity: this.bookService.getCartTotalQuantity()
    });
  }

  payment() {
    document.getElementById('paypal').innerHTML = '<div id="btnPayPal"></div>';
    const username = this.tokenStorageService.getUser().username;
    render({
      id: '#paypal',
      currency: 'USD',
      value: String((this.totalMoney / 23000).toFixed(2)),
      onApprove: (details) => {
        for (const item of this.carts) {
          item.book = {
            id: item.id
          };
        }
        this.cartDetailService.saveCartDetail(username, this.carts).subscribe();
        console.log(this.carts + ' luu xuong database');
        Swal.fire({
          title: 'Thanh toán thành công',
          icon: 'success',
          iconColor: ' #EBA850',
        });
        document.getElementById('close').click();
        this.carts = [];
        this.bookService.saveCart(this.carts);
        this.bookService.changeData({
          quantity: this.bookService.getCartTotalQuantity()
        });
      }
    });
  }

  subTotal(cart: any) {
    return cart.quantity * cart.price;
  }

  updateQuantity(idx: number, ev: any) {
    let newQuantity = ev.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    ev.target.value = newQuantity;
    this.carts[idx].quantity = ev.target.value;
    this.bookService.saveCart(this.carts);
    this.totalMoney = this.bookService.getCartTotalMany();
    this.totalQuantity = this.bookService.getCartTotalQuantity();
    this.bookService.changeData({
      quantity: this.bookService.getCartTotalQuantity()
    });
  }

  reduce(idx: number, quantity: any) {
    // tslint:disable-next-line:radix
    let newQuantity = parseInt(quantity) - 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.carts[idx].quantity = newQuantity;
    this.bookService.saveCart(this.carts);
    this.totalMoney = this.bookService.getCartTotalMany();
    this.totalQuantity = this.bookService.getCartTotalQuantity();
    this.bookService.changeData({
      quantity: this.bookService.getCartTotalQuantity()
    });
  }

  up(idx: number, quantity: any) {
    // tslint:disable-next-line:radix
    let newQuantity = parseInt(quantity) + 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.carts[idx].quantity = newQuantity;
    this.bookService.saveCart(this.carts);
    this.totalMoney = this.bookService.getCartTotalMany();
    this.totalQuantity = this.bookService.getCartTotalQuantity();
    this.bookService.changeData({
      quantity: this.bookService.getCartTotalQuantity()
    });
  }

  delete(i: number) {
    // tslint:disable-next-line:variable-name
    const _this = this;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Xóa!',
          'Đã xóa thành công',
          'success'
        );
        _this.carts.splice(i, 1);
        _this.bookService.saveCart(this.carts);
        this.bookService.changeData({
          quantity: this.bookService.getCartTotalQuantity()
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Hú hồn không hủy thì mua hàng đi bạn :)',
          'success'
        );
      }
    });
  }

  clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Xóa!',
          'Đã xóa thành công',
          'success'
        );
        this.carts = [];
        this.bookService.saveCart(this.carts);
        this.bookService.changeData({
          quantity: this.bookService.getCartTotalQuantity()
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Hú hồn không hủy thì mua hàng đi bạn :)',
          'success'
        );
      }
    });
  }
}
