import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm:any = FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private fb: FormBuilder, 
    private ApiService: ApiService,
    private Router: Router,
  ) {}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [
        '',
        [Validators.required, Validators.email] // Email validation
      ],
      Password: [
        '',
        [Validators.required] // Password validation
      ],
    });
  }
  loginSubmit(){
    if(this.loginForm.valid){
      const loginData = this.loginForm.value;
      console.log(loginData,'logindatavalue');
      this.ApiService.PostData('shainkeydetails/userLogin',loginData).subscribe(resp =>{
        console.log(resp,"login");
        localStorage.setItem("userToken",resp.token)
        if(resp.status =='success'){
          this.Router.navigate(['home'])
        }
        
      })
    }
  }
}
