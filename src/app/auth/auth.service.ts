import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../user';
import { Labrat } from '../labrat';
import { Client } from '../client';
//import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isAdmin = false;
  private isLabrat = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private adminStatusListener = new Subject<boolean>();
  private loggedLabrat: Labrat;
  private loggedClient: Client;
  private loggedLabratListener = new Subject<Labrat>();
  private loggedClientListener = new Subject<Client>();

  public err = new BehaviorSubject<any>(null);
  public message: string;
  private iniShort: string = "DEV";
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin(){
    return this.isAdmin;
  }

  getIsLabrat(){
    return this.isLabrat;
  }

  getAdminStatusListener(){
    return this.adminStatusListener.asObservable();
  }

  getIniShort(){
    return this.iniShort;
  }

  //logowanie
  signIn(email: string, password: string) {
    const user: User = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number, userId: string }>(
        BACKEND_URL + "login",
        user
      )
      .subscribe(response => {

        this.err.next(null)

        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      },
        err => {
          this.err.next(err)
        });
  }

  //rejestracja użytkownika - addusr component
  createUser(email: string, password: string) {
    const user: User = { email: email, password: password };
    this.http
      .post(BACKEND_URL + "signup", user)
      .subscribe(response => {
        this.err.next(null)
        //this.router.navigate(["/"]); // <- zmienić,

      },
        err => {
          this.err.next(err)
        });
  }

  //wylogowanie
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  //daje autoryzację
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  //wyczyszczenie danych po logoucie i powrót do okna logowania
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("profile");
    localStorage.removeItem("uname");
  }

  //zapisanie tokena w localStorage
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    //this.profileService.getProfile()
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  //ustawienie czasu do wylogowania
  private setAuthTimer(duration: number) {

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  //wyciągnięcie logowania z localStorage przy nowym odpaleniu sesji
  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.UserDetails();
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  UserDetails(){
    this.http.get<{ message: string, loggedLabrat: Labrat, loggedClient: Client }>(BACKEND_URL+this.getUserId())
      .subscribe(res => {
        this.err.next(null)
        if(res.loggedLabrat)
        {
          this.loggedLabrat = res.loggedLabrat;
          if(res.loggedLabrat.isAdmin) { this.isAdmin = true; this.adminStatusListener.next(true); }
          this.loggedLabratListener.next(this.loggedLabrat)
          this.iniShort = res.loggedLabrat.iniShort;
        }
        if(res.loggedClient)
        {
          this.loggedClient = res.loggedClient; 
          this.isAdmin = false; this.adminStatusListener.next(false);
          this.loggedClientListener.next(this.loggedClient)
          this.iniShort = res.loggedClient.iniShort;
        };
        this.message = res.message;

      }, err => { this.err.next(err) })
  }
  getLoggedLabratUpdateListener(){ return this.loggedLabratListener.asObservable() }
  getLoggedClientUpdateListener(){ return this.loggedClientListener.asObservable() }
}
