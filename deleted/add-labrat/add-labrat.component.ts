import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-add-labrat',
  templateUrl: './add-labrat.component.html',
  styleUrls: ['./add-labrat.component.css']
})
export class AddLabratComponent implements OnInit {

  error: any = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.error = null
    this.authService.err.subscribe(err => {
      this.error = err
  })
}

  onSubmit(form: NgForm) {
    //this.isLoading = true;
    if (!form.valid) {
      return;
    }
    
    const pName = form.value.pName;
    const lastName = form.value.lastName;
    const iniShort = form.value.iniShort;
    //const isAdmin;

    //user
    const email = form.value.email;
    const password = form.value.password;
    
    this.authService.createUser(email, password)
  }
}
