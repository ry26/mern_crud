import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-user-details-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,RouterLink,HeaderComponent,FooterComponent],
  templateUrl: './user-details-edit.component.html',
  styleUrl: './user-details-edit.component.css'
})
export class UserDetailsEditComponent {
  userId: string | null = null;
  user: any = {}; // This will hold the user data to be edited
  errorMessage: string = '';
  userForm:any;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ApiService: ApiService,
   //private HomeComponent: HomeComponent,
    private router: Router,
    private fb:FormBuilder
  ) {}

  // ngOnInit(): void {
  //   this.userId = this.ActivatedRoute.snapshot.paramMap.get('id'); 
  //   if (this.userId) {
  //     this.loadUserData();
  //   }
  // }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      Name: ['', Validators.required],  // Name is required
      Email: ['', [Validators.required, Validators.email]],  // Email with email validation
      Mobile: ['', [Validators.required, ]],  // Mobile with regex for 10 digits
      Designation: ['', Validators.required]  // Designation is required
    });

    this.userId = this.ActivatedRoute.snapshot.paramMap.get('id'); // Fixed typo here
    if (this.userId) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    const userIdNumber = Number(this.userId);
    console.log("userIdNumber",userIdNumber);
    this.ApiService.GetDataById('shainkeydetails/getUser', userIdNumber).subscribe({
      next: (response) => {
        // Handle successful response
        console.log('Fetched users:', response);
       this.user = response;
        },
      error: (error) => {
        // Handle errors
        this.errorMessage = 'Failed to load user list.';
        console.error('API Error:', error)
      },
    });
    
 }

 onSubmit(): void {
  if (this.userForm.valid) {
    const updatedUserData = {
      Name: this.userForm.value.Name,
      Email: this.userForm.value.Email,
      Mobile: this.userForm.value.Mobile,
      Designation: this.userForm.value.Designation
    };

    const userIdNumber = Number(this.userId);
    // this.apiService.PutDataById(userIdNumber, updatedUserData).subscribe({
    //   next: (response) => {
      this.ApiService.PutDataById('shainkeydetails/updateuser',userIdNumber,updatedUserData).subscribe({
        next: (response) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['/user-list']); // Navigate to the user list or another route after updating
      },
      error: (error) => {
        this.errorMessage = 'Failed to update user.';
        console.error('API Error:', error);
      }
    });
  } else {
    this.errorMessage = 'Please fill in all required fields.';
  }
}
//  logoutUser(): void {
//   this.HomeComponent.logoutUser(); // Reuse the logout logic from AuthService
// }
}
