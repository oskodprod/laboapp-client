import { Injectable } from '@angular/core';
import { Client } from '../client';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const BACKEND_CLIENT_URL = environment.apiUrl + "/client/";
const BACKEND_COMPANY_URL = environment.apiUrl + "/company/";

export interface wykoNames
{
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client: Client;
  private clientUpdated = new Subject<Client>();

  private namesList: wykoNames[] = [];
  private nameslistUpdated = new Subject<wykoNames[]>();
  
  private clientList: Client[] = [];
  private listUpdated = new Subject<Client[]>();
  
  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getListUpdateListener(){ return this.listUpdated.asObservable(); }

  getList()
  {
    this.http.get<{message: string; clientList: any }>(BACKEND_CLIENT_URL)
      .pipe(
        map(clientData => {
          return clientData.clientList.map(client => {
            return {
              id: client._id, //MONGOID OBIEKTU
              clName: client.clName,
              clAddress: client.clAddress,
              clCity: client.clCity,
              short: client.short,
              iniShort: client.iniShort,
              cid: client.cid,
              contactname: client.contactname,
              contactlastname: client.contactlastname,
              contactTelNo: client.contactTelNo,
              user: client.user.email, //MONGOID OBIEKTU
              company: client.company.name //MONGOID OBIEKTU
            };
          });
        })
      )
      .subscribe(mapclientList => {
        this.err.next(null)

        this.clientList = mapclientList;
        this.listUpdated.next([...this.clientList]);
      }, err => { this.err.next(err) }
      );
  }

  getWykosField()
  {
    this.http.get<{ names: any }>(BACKEND_COMPANY_URL+"wykoNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              name: name.name
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.namesList = nameList;
        this.nameslistUpdated.next([...this.namesList]);

      }, err => {this.err.next(err)})
  }
  getWykosFieldUpdateListener(){ return this.nameslistUpdated.asObservable(); }

  addClient(
    clName: string,
    clAddress: string,
    clCity: string,
    short: String,
    iniShort: string,
    cid: string,
    contactname: string,
    contactlastname: string,
    contactTelNo: string,
    email: string, //user email
    password: string, //user pass
    name: string //labo name
  )
  {
    const client: Client = {
      clName: clName,
      clAddress: clAddress,
      clCity: clCity,
      short: short,
      iniShort:iniShort,
      cid:cid,
      contactname:contactname,
      contactlastname:contactlastname,
      contactTelNo:contactTelNo,
      email:email,
      password:password,
      name:name
    }

    this.http.post<{ created: Client }>(BACKEND_CLIENT_URL, client)
    .subscribe(resData => {
      this.err.next(null)
      console.log("Klient dodany.\n", resData)
    }, err => { this.err.next(err) });
  }

  getClient(id: string){
    this.http.get<{ message: string, client: Client, name: string, email: string}>(BACKEND_CLIENT_URL+id)
    .subscribe(foundClient => {
      this.err.next(foundClient.message)
      this.client = foundClient.client;
      this.client.name = foundClient.name;
      this.client.email = foundClient.email;
      this.clientUpdated.next(this.client)
    }, err => { this.err.next(err) })
  }
  getClientUpdateListener(){ return this.clientUpdated.asObservable(); }

  updateClient(
    id: string,
    clName: string,
    clAddress: string,
    clCity: string,
    short: String,
    iniShort: string,
    cid: string,
    contactname: string,
    contactlastname: string,
    contactTelNo: string,
    email: string, //user email
    password: string, //user pass
    name: string //labo name
    )
    {
      const client: Client = {
        clName: clName,
        clAddress: clAddress,
        clCity: clCity,
        short: short,
        iniShort:iniShort,
        cid:cid,
        contactname:contactname,
        contactlastname:contactlastname,
        contactTelNo:contactTelNo,
        email:email,
        password:password,
        name:name
      }

      this.http.put<{ message: string, updated: Client }>(BACKEND_CLIENT_URL+id, client)
      .subscribe(resData => {
      this.err.next(resData.message)
      console.log("Klient zapisany.\n", resData.updated)
      this.getList();
    }, err => { this.err.next(err) });
    }

  deleteClient(id: string){
    this.http.delete<{ message: string, deleted: Client}>(BACKEND_CLIENT_URL+id)
    .subscribe(res => {
      this.err.next(res.message)
      console.log(res);
      this.getList();
    }, err => { this.err.next(err) })
  }
}
