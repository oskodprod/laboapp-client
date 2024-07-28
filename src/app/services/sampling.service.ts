import { Injectable, OptionalDecorator } from '@angular/core';
import { Sampling } from '../sampling';
import { Client } from '../client';
import { Rec } from '../rec';
import { Labrat } from '../labrat'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';
import { Sampling2 } from '../sampling2';
import { Rec2 } from '../rec2';
import { Labrat2 } from "../labrat2";
import { Client2 } from '../client2';
import { Sample2 } from '../sample2';

const BACKEND_CLIENT_URL = environment.apiUrl + "/client/";
const BACKEND_RECIPE_URL = environment.apiUrl + "/recipe/";
const BACKEND_LABRAT_URL = environment.apiUrl + "/labrat/";
const BACKEND_SAMPLE_URL = environment.apiUrl + "/sample/";
const BACKEND_SAMPLING_URL = environment.apiUrl + "/sampling/";
const BACKEND_FORMFIELD_URL = environment.apiUrl + "/formfield/";

export interface recNames
{
  id: string,
  name: string
}

export interface clNames
{
  id: string,
  name: string,
  address: string,
  city: string,
  cid: string,
  company: string
}

export interface field
{
  id: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class SamplingService {

  public sampling: Sampling2;
  private samplingUpdated = new Subject<Sampling2>();

  private rec: Rec2;
  private recipeUpdated = new Subject<Rec2>();

  private labrat: Labrat2;
  private labratUpdated = new Subject<Labrat2>();

  private client: Client2;
  private clientUpdated = new Subject<Client2>();

  private samples: Sample2[];
  private samplesUpdated = new Subject<Sample2[]>();

  private samplingList: Sampling[] = [];
  private listUpdated = new Subject<Sampling[]>();

  private recNamesList: recNames[] = [];
  private recNamesListUpdated = new Subject<recNames[]>();

  private clNamesList: clNames[] = [];
  private clNamesListUpdated = new Subject<clNames[]>();

  private locList: field[] = [];
  private locListUpdated = new Subject<field[]>();

  private makList: field[] = [];
  private makListUpdated = new Subject<field[]>();

  private sxmakList: field[] = [];
  private sxmakListUpdated = new Subject<field[]>();

  //private fetchedLabrat: string;
  //public sidLP: number;
  //private sidLPUpdate = new Subject<number>();
  //public createdSamplingId: string;
  //private IdUpdate = new Subject<string>();

  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getList() {
    this.http.get<{ message: string; list: any }>(BACKEND_SAMPLING_URL)
      .pipe(
        map(samplingData => {
          console.log(samplingData.message);
          return samplingData.list.map(field => {
            return {
              id: field._id,
              docDate: field.docDate,
              sid: field.sid,
              labrat: field.labrat.pName+' '+field.labrat.lastname,
              client: field.client.company.name+' '+field.client.clName,
              rec: field.rec.recName,
              comments: field.comments,
              samples: field.samples,
              sidHead: field.sidHead,
              sidLP: field.sidLP
            };
          });
        })
      )
      .subscribe(mapfieldList => {
        this.err.next(null)
        
        this.samplingList = mapfieldList;
        this.listUpdated.next([...this.samplingList]);
      }, err => { this.err.next(err) }
      );
  }
  getListUpdateListener(){ return this.listUpdated.asObservable(); }

  async getRecField(){
    this.http.get<{ message: string, names: any }>(BACKEND_SAMPLING_URL+"recNames")
    .pipe(
      map(nameslist => {
        return nameslist.names.map( name => {
          return {
            id: name._id,
            name: name.recName 
          };
        })
      })
    )
    .subscribe( nameList => {
      this.err.next(nameList.message)
      this.recNamesList = nameList;
      this.recNamesListUpdated.next([...this.recNamesList]);
    }, err => {this.err.next(err)})
  }
  getRecFieldUpdateListener(){ return this.recNamesListUpdated.asObservable() }

  async getClField() {
    this.http.get<{message: string, names: any}>(BACKEND_SAMPLING_URL+"clNames")
    .pipe(
      map(nameslist => {
        return nameslist.names.map(name => {
          return {
            id: name._id,
            name: name.clName,
            address: name.clAddress,
            city: name.clCity,
            cid: name.cid,
            company: name.company.name
          }
        })
      })
    )
    .subscribe( nameList => {
      this.err.next(nameList.message)
      this.clNamesList = nameList;
      this.clNamesListUpdated.next([...this.clNamesList]);
    }, err => {this.err.next(err)})
  }
  getClFieldUpdateListener(){ return this.clNamesListUpdated.asObservable() }

  /*getSIDLP(sidHead: string) {
    const getLP = { sidHead: sidHead }
    this.http.post<{result: number}>(BACKEND_SAMPLING_URL+"lp", getLP)
    .subscribe(res => {
      this.err.next(null)
      this.sidLP = res.result;
      this.sidLPUpdate.next(this.sidLP);
    }, err => {this.err.next(err)} );
  }
  getSIDLPListener(){ return this.sidLPUpdate.asObservable() }*/

  getLOCField()
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
  getLOCFieldUpdateListener(){ return this.locListUpdated.asObservable(); }

  getMAKField()
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
  getMAKFieldUpdateListener(){ return this.makListUpdated.asObservable(); }

  getSXMAKField()
  {
    this.http.get<{ names: any }>(BACKEND_FORMFIELD_URL+"sxmakNames")
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
        this.sxmakList = nameList;
        this.sxmakListUpdated.next([...this.sxmakList]);

      }, err => {this.err.next(err)})
  }
  getSXMAKFieldUpdateListener(){ return this.sxmakListUpdated.asObservable(); }

  addSampling(
    //sid: string,
    sidHead: string,
    //sidLP: number,
    rec: string,
    client: string,
    labrat: string, 
  ){
    const cSampling: Sampling = {
      docDate: new Date,
      //sid: sid,
      labrat: labrat,
      client: client,
      rec: rec,
      sidHead: sidHead,
      //sidLP: sidLP,
      samples: []
    }

    this.http.post<{ message: string, created: Sampling, id: string }>(BACKEND_SAMPLING_URL, cSampling)
    .subscribe(resData => {
      this.err.next(resData.message);
      //this.createdSamplingId = resData.id;
      //this.IdUpdate.next(this.createdSamplingId)
      console.log("Protokół dodany", resData);
    }, err => {this.err.next(err) })
  }

  async getSampling(id: string){

    this.http.get<{ message: string, found: Sampling2 }>(BACKEND_SAMPLING_URL+id)
    .subscribe(foundSampling => {
      this.err.next(foundSampling.message);
      this.sampling = foundSampling.found;
      //this.labrat = foundSampling.found.labrat;
      //this.rec = foundSampling.found.rec;
      //this.client = foundSampling.found.client;
      this.samples = foundSampling.found.samples;
      this.samplingUpdated.next(this.sampling);
      //this.labratUpdated.next(this.labrat);
      //this.recipeUpdated.next(this.rec);
      //this.clientUpdated.next(this.client);
      this.samplesUpdated.next([...this.samples]);
  }, err => { this.err.next(err) })
  }


  updateSampling(
    id: string, //MONGOID OBIEKTU
    docDate: Date,
    client: string, //MONGOID OBIEKTU
    rec: string, //MONGOID OBIEKTU
    sidHead: string,
    labrat: string, //MONGOID OBIEKTU
    sid?: string,
    sidLP?: Number,
    comments?: string,
    samples?: Sample2[], //MONGOID OBIEKTU
    loc?: string[],
    locDesc?: string,
    mak?: string, //metoda zagęszzenia
    sxMak?: string
  )
  {
    var reqArray: Observable<{old, new}>[] = [];
    for (let index = 0; index < samples.length; index++) {
      //var id = samples[index]._id;
      //var newChkDate = new Date(docDate);
      //var sxAgTime = samples[index].agTime;
      //newChkDate.setDate(newChkDate.getDate() + sxAgTime);
      reqArray.push(this.http.patch<{ old: any, new: any }>(BACKEND_SAMPLING_URL+samples[index]._id, { docDate: docDate, agTime: samples[index].agTime}))
    }
    
    const sampling: Sampling = {
      docDate: docDate,
      sid: sidHead+sidLP,
      sidHead: sidHead,
      sidLP: sidLP,
      labrat: labrat,
      client: client,
      rec: rec,
      comments: comments,
      loc: loc,
      locDesc: locDesc,
      mak: mak,
      sxMak: sxMak,
      //samples: samples
    } 
    this.http.put<{ message: string, updated: Sampling }>(BACKEND_SAMPLING_URL+id, sampling)
    .subscribe(resData => {
      this.err.next(resData.message)
      console.log("Zmiany zapisano.\n", resData.updated)
      forkJoin(reqArray).subscribe( resData => {
        console.log("Ustawiono.\n", resData)
      }, err => { this.err.next(err) });
      //this.getList();
    }, err => { this.err.next(err) });
    
  }

  deleteSample(id: string)
  {
    this.http.delete<{ message: string, deleted: any}>(BACKEND_SAMPLE_URL+id)
    .subscribe(resData => {
      this.err.next(resData.message);
      console.log("Próbkę usunięto.\n", resData.deleted)
    }, err => { this.err.next(err) });
  }

  deleteSampling(id: string)
  {
    this.http.delete<{ reportDeleted: boolean, samplesDeleted: any, deleted: any }>(BACKEND_SAMPLING_URL+id)
    .subscribe(resData => {
      this.err.next('Błąd');
      console.log("Protokół usunięto.\n", resData.reportDeleted, resData.samplesDeleted, resData.deleted)
    }), err => { this.err.next(err) };
  }

  /*patchChkDate(samples: Sample2[], docDate: number){
    var reqArray: Observable<{old, new}>[] = [];
    for (let index = 0; index < samples.length; index++) {
      //var id = samples[index]._id;
      var newChkDate = new Date();
      var sxAgTime: number;
      sxAgTime = samples[index].agTime;
      newChkDate.setDate(docDate + sxAgTime);
      reqArray.push(this.http.patch<{ old: any, new: any }>(BACKEND_SAMPLING_URL+samples[index]._id, { newChkDate: newChkDate }))
    }
    
    
  }*/

  getSamplingUpdateListener(){
    return this.samplingUpdated.asObservable()
  }

  getLabratUpdateListener(){
    return this.labratUpdated.asObservable()
  }
  getRecipeUpdateListener(){
    return this.recipeUpdated.asObservable()
  }
  getClientUpdateListener(){
    return this.clientUpdated.asObservable()
  }
  getSamplesUpdateListener(){
    return this.samplesUpdated.asObservable()
  }
}
