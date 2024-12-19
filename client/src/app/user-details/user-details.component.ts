import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  formdetails!: FormGroup; // FormGroup declaration
  successMessage: string = ''; // Success message

  constructor(private fb: FormBuilder, 
    private ApiService: ApiService,
    private Router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize the form group
    this.formdetails = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Mobile: ['', [Validators.required]],
      Designation: ['', Validators.required],
      createdBy: [1], // Default value
    });
  }
  onSubmit(event: Event): void {
  //onSubmit(e: Event): void {
   // e.preventDefault(); // Prevent default form submission
   this.formdetails.markAllAsTouched();
   console.log(this.formdetails);
   
    if (this.formdetails.valid) {
      console.log(this.formdetails.value);

      this.ApiService.PostData('shainkeydetails/createShainkeydetails', this.formdetails.value).subscribe({
        next: (resp) => {
          console.log(resp, 'PostData');
          if(resp.status=='success'){
            this.Router.navigate(['home'])
          }
         // this.successMessage = 'Form submitted successfully!';
         // setTimeout(() => (this.successMessage = ''), 1500);
         // this.formdetails.reset({ createdBy: 1 }); // Reset with default value
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.successMessage = 'Something went wrong. Please try again.';
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
