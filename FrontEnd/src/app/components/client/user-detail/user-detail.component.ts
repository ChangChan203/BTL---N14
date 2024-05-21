import {Component, OnInit} from '@angular/core';
import { StorageService } from 'src/app/_service/storage.service';
import { UserService } from 'src/app/_service/user.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  username: any;
  user :any;
  email: any;
  changePassword : boolean = false;
  address : any;
  birth : any;

  updateForm: any ={
    birthday: null,
    email: null,
    country: null,
    address: null,
    phone: null
  }

  changePasswordForm: any= {
    oldPassword : null,
    newPassword: null,

  }

  constructor(private storageService: StorageService,private userService: UserService, ){}



  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.email = this.storageService.getUser().email;
    this.address = this.storageService.getUser().address;
    this.birth = this.storageService.getUser().birth;
    // console.log(this.storageService.getUser())
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        this.user = res;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.birthday = res.birthday;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },error : err =>{
        console.log(err);
      }
    })
  }

  updateProfile(){
    const{firstname,lastname,email,country,state,address,phone} = this.updateForm;
    this.userService.updateProfile(this.username,firstname,lastname,email,country,state,address,phone).subscribe({
      next: res =>{
        this.getUser();
      },error: err=>{
        console.log(err);
      }
    })
  }

  changePasswordFunc(){
    const{oldPassword,newPassword} = this.changePasswordForm;
    this.userService.changePassword(this.username,oldPassword,newPassword).subscribe({
      next: res =>{
        this.getUser();
      },error: err =>{
        console.log(err);
      }
    })
  }
}
