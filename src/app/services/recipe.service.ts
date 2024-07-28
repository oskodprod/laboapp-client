import { Injectable } from '@angular/core';
import { Rec } from '../rec';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_RECIPE_URL = environment.apiUrl + "/recipe/";
const BACKEND_COMPANY_URL = environment.apiUrl + "/company/";
const BACKEND_FORMFIELD_URL = environment.apiUrl + "/formfield/";

export interface prodNames
{
  id: string,
  name: string
}

export interface field
{
  id: string,
  value: string
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private rec: Rec;
  private recUpdated = new Subject<Rec>();

  private recList: Rec[] = [];
  private recListUpdated = new Subject<Rec[]>();
  
  private prodNamesList: prodNames[] = [];
  private prodListUpdated = new Subject<prodNames[]>();

  private clsList: field[] = [];
  private clsListUpdated = new Subject<field[]>();

  private clwList: field[] = [];
  private clwListUpdated = new Subject<field[]>();

  private clxList: field[] = [];
  private clxListUpdated = new Subject<field[]>();

  private conList: field[] = [];
  private conListUpdated = new Subject<field[]>();

  private clfList: field[] = [];
  private clfListUpdated = new Subject<field[]>();

  private clnList: field[] = [];
  private clnListUpdated = new Subject<field[]>();

  private agtList: field[] = [];
  private agtListUpdated = new Subject<field[]>();

  /*private formList: field[] = [];
  private formListUpdated = new Subject<field[]>();

  private locList: field[] = [];
  private locListUpdated = new Subject<field[]>();

  private makList: field[] = [];
  private makListUpdated = new Subject<field[]>();*/

  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getProdsField()
  {
    this.http.get<{ names: any }>(BACKEND_COMPANY_URL+"prodNames")
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
        this.prodNamesList = nameList;
        this.prodListUpdated.next([...this.prodNamesList]);

      }, err => {this.err.next(err)})
  }
  getProdsFieldUpdateListener(){ return this.prodListUpdated.asObservable(); }

  getCLSField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"clsNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.clsList = nameList;
        this.clsListUpdated.next([...this.clsList]);

      }, err => {this.err.next(err)})
  }
  getCLSFieldUpdateListener(){ return this.clsListUpdated.asObservable(); }

  getCLWField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"clwNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.clwList = nameList;
        this.clwListUpdated.next([...this.clwList]);

      }, err => {this.err.next(err)})
  }
  getCLWFieldUpdateListener(){ return this.clwListUpdated.asObservable(); }

  getCLFField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"clfNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.clfList = nameList;
        this.clfListUpdated.next([...this.clfList]);

      }, err => {this.err.next(err)})
  }
  getCLFFieldUpdateListener(){ return this.clfListUpdated.asObservable(); }

  getCLXField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"clxNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.clxList = nameList;
        this.clxListUpdated.next([...this.clxList]);

      }, err => {this.err.next(err)})
  }
  getCLXFieldUpdateListener(){ return this.clxListUpdated.asObservable(); }

  getCLNField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"clnNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.clnList = nameList;
        this.clnListUpdated.next([...this.clnList]);

      }, err => {this.err.next(err)})
  }
  getCLNFieldUpdateListener(){ return this.clnListUpdated.asObservable(); }

  getCONField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"conNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.conList = nameList;
        this.conListUpdated.next([...this.conList]);

      }, err => {this.err.next(err)})
  }
  getCONFieldUpdateListener(){ return this.conListUpdated.asObservable(); }

  /*getLOCField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"locNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.locList = nameList;
        this.locListUpdated.next([...this.locList]);

      }, err => {this.err.next(err)})
  }
  getLOCFieldUpdateListener(){ return this.locListUpdated.asObservable(); }*/

  /*getMAKField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"makNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.makList = nameList;
        this.makListUpdated.next([...this.makList]);

      }, err => {this.err.next(err)})
  }
  getMAKFieldUpdateListener(){ return this.makListUpdated.asObservable(); }*/

  /*getFORMField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"formNames")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.formList = nameList;
        this.formListUpdated.next([...this.formList]);

      }, err => {this.err.next(err)})
  }
  getFORMFieldUpdateListener(){ return this.formListUpdated.asObservable(); }*/

  getAGTField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"agTimes")
      .pipe(
        map(nameslist => {
          return nameslist.names.map(name => {
            return {
              id: name._id,
              value: name.value
            };
          })
        })
      )
      .subscribe(nameList => {
        this.err.next(null)
        this.agtList = nameList;
        this.agtListUpdated.next([...this.agtList]);

      }, err => {this.err.next(err)})
  }
  getAGTFieldUpdateListener(){ return this.agtListUpdated.asObservable(); }

  addRecipe(
    name: string, 
    recName: string,
    clS: string,
    con: string,
    clW: string,
    clF: string,
    cert: boolean,
    agTime: number,
    clX: string[],
    clN:string,
    comments: string
  )
  {
    const recipe: Rec = {
      recName: recName,
      name: name,
      clS: clS,
      con: con,
      clW: clW,
      clF: clF,
      cert: cert,
      agTime: agTime,
      clX: clX,
      clN: clN,
      comments: comments
    }

    this.http.post<{ message: string, result: Rec }>(BACKEND_RECIPE_URL, recipe)
    .subscribe(resData => {
      this.err.next(null)
      console.log(resData)
    }, err => { this.err.next(err) });
  }

  getList() {
    this.http.get<{ message: string; list: any }>(BACKEND_RECIPE_URL)
      .pipe(
        map(recipeData => {
          console.log(recipeData.message);
          return recipeData.list.map(field => {
            return {
              id: field._id,
              recName: field.recName,
              name: field.maker.name,
              clS: field.clS,
              con: field.con,
              clW: field.clW,
              clF: field.clF,
              cert: field.cert,
              agTime: field.agTime,
              clX: field.clX,
              clN: field.clN,
              comments: field.comments
            };
          });
        })
      )
      .subscribe(mapfieldList => {
        this.err.next(null)
        
        this.recList = mapfieldList;
        this.recListUpdated.next([...this.recList]);
      }, err => { this.err.next(err) }
      );
  }
  getListUpdateListener(){ return this.recListUpdated.asObservable(); }


  async getRecipe(id:string){
    this.http.get<{ message:string, recipe: Rec, name: string }>(BACKEND_RECIPE_URL+id)
    .subscribe(foundRec => {
      this.err.next(foundRec.message)
      this.rec = foundRec.recipe;
      this.rec.name = foundRec.name;
      this.recUpdated.next(this.rec)
    }, err => { this.err.next(err) })
  }
  getRecipeUpdateListener(){ return this.recUpdated.asObservable(); }

  updateRecipe(
    id: string,
    name: string, 
    recName: string,
    clS: string,
    con: string,
    clW: string,
    clF: string,
    cert: boolean,
    agTime: number,
    clX: string[],
    clN:string,
    comments: string 
    )
    {
      const recipe: Rec = {
        recName: recName,
        name: name,
        clS: clS,
        con: con,
        clW: clW,
        clF: clF,
        cert: cert,
        agTime: agTime,
        clX: clX,
        clN: clN,
        comments: comments
      }
      this.http.put<{ message: string, updated: Rec }>(BACKEND_RECIPE_URL+id, recipe)
      .subscribe(resData => {
      this.err.next(resData.message)
      console.log("Receptura zapisana.\n", resData.updated)
      this.getList();
    }, err => { this.err.next(err) });
    }

  deleteRecipe(id: string){
    this.http.delete<{ message:string, deleted: Rec }>(BACKEND_RECIPE_URL+id)
    .subscribe(res => {
      this.err.next(res.message)
      console.log(res);
      this.getList();
    }, err => { this.err.next(err) })
  }
}
