import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { 

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['denis.guzeev@gmail.com', Validators.required],
      password: ['111111', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => this.router.navigate([this.returnUrl]),
        error => {
          this.loading = false;
        }
      );
  }
}
