import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //isLoginMode = true;
  //isLoading = false;
  error: any = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.error = null
    this.authService.err.subscribe(err => {
      this.error = err
      //this.isLoading = false
    })
  }

  /*onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }*/

  onSubmit(form: NgForm) {
    //this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signIn(email, password)
    //this.router.navigate(['/']);
    /*if (this.isLoginMode) {


      form.reset()
    }
    else {
      this.authService.createUser(email, password)

      form.reset()
    }*/
  }

}
