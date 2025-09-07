import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../assets/environment';
import { error } from '../../alertbox/alert';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  environment=environment;

   loginForm: FormGroup;
   constructor(private route: ActivatedRoute, private router: Router,private fb: FormBuilder,private http: HttpClient){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  
  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.http.post(environment.API_BASE_URL + '/login',this.loginForm.value).subscribe({
      next: (res:any) =>{
        if(res.status && res.status != null && res.status === 1 && res.token && res.token != null){
          this.submitted = false;
          sessionStorage.setItem('token', res.token);
          setTimeout(() => {
            this.loginForm.reset();
            this.router.navigate(['/layout']);
          }, 200);          
        }else{
          this.loginForm.reset();
          this.submitted = false;
          error('Login failed. Please check your credentials.');
        }
      },
      error: err => {
        error('Login failed. Please try again later.');
        this.loginForm.reset();
        this.submitted = false;
      }  
    });
     }
   } 


  navigateTo(){
    this.router.navigate(['/layout']);
  }

}
