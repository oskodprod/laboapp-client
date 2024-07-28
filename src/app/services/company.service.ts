import { Injectable } from '@angular/core';
import { Company } from '../company';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/company/";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private company: Company;
  private compUpdated = new Subject<Company>();
  
  private companyList: Company[] = [];
  private listUpdated = new Subject<Company[]>();

  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }
  
  getListUpdateListener(){ return this.listUpdated.asObservable(); }

  addCompany(name: string, address: string, postalcode: string, city: string, nip: string, category: string){
    
    const comp: Company = {name: name, address: address, postalcode: postalcode, city: city, nip: nip, category: category}

    this.http.post<{ message: string; result: Company}>(
      BACKEND_URL, comp
    )
    .subscribe(resData => {
      this.err.next(null)
      console.log(resData)
    }, err => { this.err.next(err) });
  }

  getList() {
    this.http.get<{ message: string; list: any }>(BACKEND_URL)
      .pipe(
        map(companyData => {
          return companyData.list.map(field => {
            return {
              id: field._id,
              name: field.name,
              address: field.address,
              postalcode: field.postalcode,
              city: field.city,
              nip: field.nip,
              category: field.category
            };
          });
        })
      )
      .subscribe(mapfieldList => {
        this.err.next(null)

        this.companyList = mapfieldList;
        this.listUpdated.next([...this.companyList]);
      }, err => { this.err.next(err) }
      );
  }

  getCompany(id: string) {
    this.http.get<{ message: string, company: Company }>(BACKEND_URL+id)
    .subscribe(foundComp => {
      this.err.next(foundComp.message)
      this.company = foundComp.company;
      this.compUpdated.next(this.company)
    }, err => { this.err.next(err) })
  }
  getCompanyUpdateListener() { return this.compUpdated.asObservable(); }

  updateCompany(
    id: string, 
    name: string, 
    address: string, 
    postalcode: string, 
    city: string, 
    nip: string, 
    category: string)
    {
      const comp: Company = {
        name: name, 
        address: address, 
        postalcode: postalcode, 
        city: city, 
        nip: nip, 
        category: category
      }

      this.http.put<{ message: string, updated: Company }>(BACKEND_URL+id, comp)
      .subscribe(resData => {
      this.err.next(resData.message)
      console.log("Firma zapisana.\n", resData.updated)
    }, err => { this.err.next(err) });
    }

  deleteCompany(id: string){
    this.http.delete<{ message:string, deleted: Company }>(BACKEND_URL+id)
    .subscribe(res => {
      this.err.next(res.message)
      console.log(res);
      this.getList();
    }, err => { this.err.next(err) })
  }
}
