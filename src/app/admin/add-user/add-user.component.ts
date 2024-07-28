import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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

  onSubmit(form: NgForm) {
    //this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.createUser(email, password);
    form.reset();
    /*if (this.isLoginMode) {
      this.authService.signIn(email, password)

      form.reset()
    }
    else {
      this.authService.createUser(email, password)

      form.reset()
    }*/
  }


}