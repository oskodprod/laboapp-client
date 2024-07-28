import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Client } from '../client';
import { Labrat } from '../labrat';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  loggedLabrat: Labrat;
  private loggedLabratSub: Subscription;

  loggedClient: Client;
  private loggedClientSub: Subscription;
  error: any = null;

  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
    //this.loggedUser = this.auth.getUserId();
    this.auth.err.subscribe(err => { this.error = err})

    this.auth.UserDetails();
    this.loggedLabratSub = this.auth.getLoggedLabratUpdateListener()
    .subscribe(res => {
      this.loggedLabrat = res;
      this.error = this.auth.message;
    }, err => { this.error = err; })
    this.loggedClientSub = this.auth.getLoggedClientUpdateListener()
    .subscribe(res => {
      this.loggedClient = res;
      this.error = this.auth.message;
    }, err => { this.error = err; })
  }

  ngOnDestroy(){}

}
