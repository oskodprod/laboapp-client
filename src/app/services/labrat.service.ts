import { Injectable } from '@angular/core';
import { Labrat } from "../labrat";
import { Company } from "../company";
import { User } from "../user";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const BACKEND_LABRAT_URL = environment.apiUrl + "/labrat/";
const BACKEND_COMPANY_URL = environment.apiUrl + "/company/";
const BACKEND_USER_URL = environment.apiUrl + "/user/";

export interface laboNames 
{
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class LabratService {

  private labrat: Labrat;
  private labratUpdated = new Subject<Labrat>();

  private namesList: laboNames[] = [];
  private listUpdated = new Subject<laboNames[]>();

  private labratList: Labrat[] = [];
  private labratListUpdated = new Subject<Labrat[]>();

  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  addLabrat(
    pName: string,
    lastname: string,
    iniShort: string,
    isAdmin: boolean,
    //user: string,
    //labo: string,
    email: string,
    password: string,
    name: string //nazwa labo/firmy
  ){
    const labrat:Labrat = {
      pName: pName,
      lastname: lastname,
      iniShort: iniShort,
      isAdmin: isAdmin,
      //user: user,
      //labo: labo,
      email: email,
      password: password,
      name: name
    }

    this.http.post<{ message: string; result: Labrat }>(
      BACKEND_LABRAT_URL, labrat
    )
    .subscribe(resData => {
      this.err.next(null)
      console.log("Laborant dodany.\n", resData)
    }, err => { this.err.next(err) });
  }

  getLabosField()
  {
    this.http.get<{ names: any }>(BACKEND_COMPANY_URL+"laboNames")
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
        this.listUpdated.next([...this.namesList]);

      }, err => {this.err.next(err)})
  }
  getLabosFieldUpdateListener(){ return this.listUpdated.asObservable(); }

  getList() {
    this.http.get<{ message: string; list: any }>(BACKEND_LABRAT_URL)
      .pipe(
        map(labratData => {
          console.log(labratData.message);
          return labratData.list.map(field => {
            return {
              id: field._id,
              pName: field.pName,
              lastname: field.lastname,
              iniShort: field.iniShort,
              isAdmin: field.isAdmin,
              labo: field.labo.name,
              user: field.user.email
            };
          });
        })
      )
      .subscribe(mapfieldList => {
        this.err.next(null)
        
        this.labratList = mapfieldList;
        this.labratListUpdated.next([...this.labratList]);
      }, err => { this.err.next(err) }
      );
  }
  getListUpdateListener(){ return this.labratListUpdated.asObservable(); }

  getLabrat(id:string){
    this.http.get<{ message: string, labrat: Labrat, name: string, email: string }>(BACKEND_LABRAT_URL+id)
    .subscribe(foundLabrat => {
      this.err.next(foundLabrat.message)
      this.labrat = foundLabrat.labrat;
      this.labrat.name = foundLabrat.name;
      this.labrat.email = foundLabrat.email;
      this.labratUpdated.next(this.labrat)
    }, err => { this.err.next(err) })
  }
  getLabratUpdateListener(){ return this.labratUpdated.asObservable(); }

  updateLabrat(
    id: string,
    pName: string,
    lastname: string,
    iniShort: string,
    isAdmin: boolean,
    email: string,
    password: string,
    name: string //nazwa labo/firmy
    )
    {
      const labrat: Labrat = {
        pName: pName,
        lastname: lastname,
        iniShort: iniShort,
        isAdmin: isAdmin,
        email: email,
        password: password,
        name: name
      }

      this.http.put<{ message: string, updated: Labrat }>(BACKEND_LABRAT_URL+id, labrat)
      .subscribe(resData => {
      this.err.next(resData.message)
      console.log("Laborant zapisany.\n", resData.updated)
      this.getList();
    }, err => { this.err.next(err) });
    }
  
  deleteLabrat(id: string){
    this.http.delete<{ message:string, deleted: Labrat }>(BACKEND_LABRAT_URL+id)
    .subscribe(res => {
      this.err.next(res.message)
      console.log(res);
      this.getList();
    }, err => { this.err.next(err) })
  }
}
