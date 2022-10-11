import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {Router, Routes} from '@angular/router';
import {BookService} from '../service/book.service';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalQuantity: number = this.book.getCartTotalQuantity();
  totalMoney: number = this.book.getCartTotalMany();
  cart: any = [];

  constructor(private title: Title, private router: Router, private book: BookService) {
    this.title.setTitle('GIỏ hàng');
  }

  paypal() {
    document.getElementById('paypal').innerHTML = '<div id="btnPayPal"></div>';
    if (this.totalMoney > 0) {
      render({
        id: '#paypal',
        currency: 'USD',
        value: String((this.totalMoney / 23000).toFixed(2)),
        onApprove: (details) => {
          Swal.fire({
            title: 'Thanh toán thành công',
            icon: 'success',
            iconColor: ' #EBA850',
            timer: 2000
          });
          this.cart = [];
          this.book.saveCart(this.cart);
        }
      });
    } else {
      Swal.fire({
        title: 'Giỏ hàng trống',
        icon: 'success',
        iconColor: ' #EBA850',
        timer: 2000
      });
    }
  }

  ngOnInit(): void {
    this.cart = this.book.getCart();
    setTimeout(function() {
      this.book.changeData({
        quantity: this.book.getCartTotalQuantity()
      });
    }, 1);
    this.paypal();
  }

  subTotal(cart: any) {
    return cart.quantity * cart.price;
  }

  updateQuantity(idx: number, ev: any) {
    let newQuantity = ev.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    ev.target.value = newQuantity;
    this.cart[idx].quantity = ev.target.value;
    this.book.saveCart(this.cart);
    this.totalMoney = this.book.getCartTotalMany();
    this.totalQuantity = this.book.getCartTotalQuantity();
    this.book.changeData({
      quantity: this.book.getCartTotalQuantity()
    });
  }

  reduce(idx: number, quantity: any) {
    // tslint:disable-next-line:radix
    let newQuantity = parseInt(quantity) - 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.cart[idx].quantity = newQuantity;
    this.book.saveCart(this.cart);
    this.totalMoney = this.book.getCartTotalMany();
    this.totalQuantity = this.book.getCartTotalQuantity();
    this.book.changeData({
      quantity: this.book.getCartTotalQuantity()
    });
  }

  up(idx: number, quantity: any) {
    // tslint:disable-next-line:radix
    let newQuantity = parseInt(quantity) + 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.cart[idx].quantity = newQuantity;
    this.book.saveCart(this.cart);
    this.totalMoney = this.book.getCartTotalMany();
    this.totalQuantity = this.book.getCartTotalQuantity();
    this.book.changeData({
      quantity: this.book.getCartTotalQuantity()
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
        _this.cart.splice(i, 1);
        _this.book.saveCart(this.cart);
        this.book.changeData({
          quantity: this.book.getCartTotalQuantity()
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
        sessionStorage.clear();
        this.cart = [];
        this.book.changeData({
          quantity: this.book.getCartTotalQuantity()
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
