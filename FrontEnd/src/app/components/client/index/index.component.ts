import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { CategoryService } from 'src/app/_service/category.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]

})
export class IndexComponent implements OnInit {


    constructor(private productService: ProductService,private cartService: CartService,private messageService:MessageService, private categoryService: CategoryService){

    }

    ngOnInit(): void {
      this.getListProductByCategory();
      this.getListProductByCategoryMeo();
      this.loadCart();
      this.getListCategoryEnabledDog();
      this.getListCategoryEnabledCat();
    }


    listItemInCart !: any;
    listCategoryEnabled : any;
    listProduct1: any;
    listProduct2: any;
    HasDog : boolean = false;
    HasCat : boolean = false;
    category: any;

    cars: any = [
        {
          url: 'assets/banner3.jpg'
        },
        {
          url: 'assets/banner2.jpg'
        },
        {
          url: 'assets/banner.jpg'
        },
        {
          url: 'assets/banner4.jpg'
        }
    ]

    getListCategoryEnabledDog(){
      this.categoryService.getListCategoryEnabled().subscribe({
        next: res =>{
          this.listCategoryEnabled = res;
          console.log(res);
          this.HasDog = this.listCategoryEnabled.find((category:any) => category.name === 'Chó cảnh');
        },error: err=>{
          this.showError(err.message);
        }
      })
    }
  getListCategoryEnabledCat(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnabled = res;
        console.log(res);
        this.HasCat = this.listCategoryEnabled.find((category:any) => category.name === 'Mèo cảnh');
      },error: err=>{
        this.showError(err.message);
      }
    })
  }

    // const foundDog = this.listCategoryEnabled.find(item => item.enabled === '1');


  getListProductByCategory(){
      this.productService.getProductByCategory(1,0).subscribe({
        next: res=>{
          this.listProduct1 = res;
        },error: err =>{
          console.log(err);
        }
      })
    }

  getListProductByCategoryMeo(){
    this.productService.getProductByCategory(2,0).subscribe({
      next: res=>{
        this.listProduct2 = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

    addTocart(item: any){
      if(!this.cartService.productInCart(item)){
        item.quantity = 1;
        this.cartService.addToCart(item);
        this.listItemInCart = this.cartService.getItem();
        this.showSuccess("Thêm vào giỏ hàng thành công")
      }else{
        this.showWarn("Sản phẩm đã có trong giỏ hàng")
      }
    }

    loadCart(){
      this.cartService.loadCart();
      this.listItemInCart = this.cartService.getItem();
    }


    showSuccess(text: string) {
      this.messageService.add({severity:'success', summary: 'Success', detail: text});
    }
    showError(text: string) {
      this.messageService.add({severity:'error', summary: 'Error', detail: text});
    }

    showWarn(text: string) {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
    }




}
