import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,HeaderComponent,FooterComponent,NgFor,NgForOf,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userList: any[] = [];
  errorMessage: string = '';
  constructor(private fb: FormBuilder, 
    private ApiService: ApiService,
    private Router: Router,
  ) {}
  
  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList(): void {
    // this.ApiService.GetData('shainkeydetails/userlist').subscribe({
    //   next: (data) => {
      this.ApiService.GetData('shainkeydetails/userlist').subscribe({
        next: (response) => {
        // Handle successful response
        console.log('Fetched users:', response);
        if (response.data && Array.isArray(response.data)) {
       // this.userList = data;
        this.userList = Array.isArray(response.data) ? response.data : [];
      } else {
        this.errorMessage = 'The response does not contain an array of users.';
      }
         
      },
      error: (error) => {
        // Handle errors
        this.errorMessage = 'Failed to load user list.';
        console.error('API Error:', error)
      },
    });
    
 }

  // Delete user method
  deleteUser(userId: number): void {
    console.log("userId12",userId);
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.ApiService.DeleteData(`shainkeydetails/deleteUser/${userId}`).subscribe({
        next: (response) => {
          console.log('User deleted:', response);
          // After successful deletion, fetch the updated user list
          this.fetchUserList();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete the user.';
          console.error('Delete Error:', error);
        },
      });
    }
  }

  logoutUser(): void {
    this.ApiService.PostData('shainkeydetails/logout','').subscribe({
      next: (response) => {
        console.log('Logout successful:', response);

        // Clear auth token from local storage
        localStorage.clear();  // Replace 'authToken' with your actual token key
        this.Router.navigate(['/login']);  // Navigate to the login page or any other page you want
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.errorMessage = 'Failed to log out.';
      }
    });
  }
 
}
