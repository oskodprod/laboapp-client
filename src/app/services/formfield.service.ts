import { Injectable } from '@angular/core';
import { Formfield } from '../formfield';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
//import { MatDialog, MatDialogConfig } from '@angular/material/dialog'


import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/formfield/";

@Injectable({
  providedIn: 'root'
})
export class FormfieldService {

  private fieldList: Formfield[] = [];

  private listUpdated = new Subject<Formfield[]>();
  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  
  /*private clMessage = 
  {
    message:'',
    category:'',
    value:''
  };
  private sendMsg = new Subject<this.clMessage>();*/

  getListUpdateListener(){ return this.listUpdated.asObservable(); }


  addFormfield(category: string, value: string)
  {
    const field: Formfield = {category: category, value: value}

    this.http.post<{ message: string; result: Formfield}>(
      BACKEND_URL, field
    )
    .subscribe(resData => {
      this.err.next(null)
      console.log("Dodano pole formularza.", resData);
      this.getList();
    }, err => { this.err.next(err) } );

  }

  getList() {
    this.http.get<{ message: string; fieldList: any }>(BACKEND_URL)
      .pipe(
        map(formfieldData => {
          return formfieldData.fieldList.map(field => {
            return {
              id: field._id,
              category: field.category,
              value: field.value
            };
          });
        })
      )
      .subscribe(mapfieldList => {
        this.err.next(null)

        this.fieldList = mapfieldList;
        this.listUpdated.next([...this.fieldList]);
      }, err => { this.err.next(err) }
      );
  }

  deleteElement(id: string) {
    
    this.http.delete<{ message: string; deleted: any }>(BACKEND_URL+id)
    .subscribe(res => {
      this.err.next(null)
      console.log(res);
      this.getList();
    }, err => { this.err.next(err) })
  }
}
