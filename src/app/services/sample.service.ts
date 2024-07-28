import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sample } from '../sample';
import { Sample2 } from '../sample2';
//import { Formfield } from '../formfield';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_SAMPLE_URL = environment.apiUrl + "/sample/";
const BACKEND_FORMFIELD_URL = environment.apiUrl + "/formfield/";

export interface field
{
  id: string,
  value: string
}

export interface sampleList
{
  id: string,
  date: Date,
  chkDate: Date,
  agTime: number,
  client: string,
  WZ: string,
  clS: string,
  formSize: string,
  recName: string,
  destResult: number,
  sxid: string
}

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private sample: Sample2
  private sampleUpdated = new Subject<Sample2>();

  private testSamples: sampleList[] = [];
  private testflag: number = 0;
  private testsUpdated = new Subject<sampleList[]>();

  private formSizes: field[] = [];
  private formSizesUpdated = new Subject<field[]>();

  public err = new BehaviorSubject<any>(null);

  private addsamples: Observable<{}>
  constructor(private http: HttpClient) { }

  getSample(id: string)
  {
    this.http.get<{ message: string, found: Sample2 }>(BACKEND_SAMPLE_URL+id)
    .subscribe( sample => {
      this.err.next(sample.message)
      this.sample = sample.found;
      this.sampleUpdated.next(this.sample)
    }, err => { this.err.next(err) })
  }
  getSampleUpdatedListener(){
    return this.sampleUpdated.asObservable();
  }

  getTestList(start: Date, end: Date, flag: string){
    
    //var datestart = Date.parse(start);
    //var dateend = Date.parse(end);
    const data = {
      start: start.valueOf().toString(),
      end: end.valueOf().toString(),
      flag: flag
    }
    //console.log(BACKEND_SAMPLE_URL, {params: data});
    this.http.get<{ flag: number, message: string, filtered: Sample2[], loc: string }>(BACKEND_SAMPLE_URL, {params: data})
    .pipe(
      map(samples => {
        //console.log(samples.message);
        //console.log(samples.loc);
        this.testflag = samples.flag;
        //this.err.next([...samples.loc]);
        return samples.filtered.map(field =>{
          return {
            id: field._id,
            date: field.date,
            chkDate: field.chkDate,
            agTime: field.agTime,
            client: field.client.company.name+' '+field.client.clName+'\n'+field.client.clAddress+', '+field.client.clCity+'\n('+field.client.cid+')',
            WZ: field.WZ,
            clS: field.rec.clS,
            formSize: field.formSize,
            recName: field.rec.recName,
            destResult: field.destResult,
            sxid: field.sxid
          }
        })
      })
    )
    .subscribe( maplist => {
      this.testSamples = maplist;
      this.testsUpdated.next([...this.testSamples])
    }), err => { this.err.next(err) }
  }
  getTestsUpdatedListener(){
    return this.testsUpdated.asObservable();
  }
  getTestSampleListFlag(){
    return this.testflag; 
  }

  updateSample(
    id: string,
    WZ: string,
    sxHead: string,
    sxLP: string,
    agTime: number,
    sCategory: boolean,
    tLoad: string,
    tCheck: string,
    testCon: string,
    mixTemp: number,
    airTemp: number,
    airPRC: number,
    formSize: string,
    thermo: string,
    formNo: string
  ){
    let sxid = sxHead+sxLP;
    const data = {
    nrWZ: WZ,
    sxid: sxid,
    sxHead: sxHead,
    sxLP: sxLP,
    agTime: agTime,
    sCategory: sCategory,
    tLoad: tLoad,
    tCheck: tCheck,
    testCon: testCon,
    mixTemp: mixTemp,
    airTemp: airTemp,
    airPRC: airPRC,
    formSize: formSize,
    thermo: thermo,
    formNo: formNo
    }
  
  this.http.put<{ updated: boolean, noData: any[], fResult: Sample2 }>(BACKEND_SAMPLE_URL+id, data)
  .subscribe( resData => {
    if(resData.fResult) console.log("Próbka zapisana.\n", resData.fResult)
  }, err => { this.err.next(err) });
  }


  getFSField()
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
        this.formSizes = nameList;
        this.formSizesUpdated.next([...this.formSizes]);

      }, err => {this.err.next(err)})
  }
  getFSFieldUpdateListener(){ return this.formSizesUpdated.asObservable(); }

  addSamples(
    sxIT: number,
    //------------------
    WZ: string,
    sxHead: string,
    //sxLP: string,
    agTime: number,
    sCategory: boolean,
    tLoad: string,
    tCheck: string,
    testCon: string,
    mixTemp: number,
    airTemp: number,
    airPRC: number,
    formSize: string,
    thermo: string,
    formNo: string,
    //------------------
    recid: string,
    clientid: string,
    loc: string[],
    locDesc: string,
    date: Date,
    sxMak: string,
    mak: string,
    samplingid: string,
    comm1: string
  )
  {
    //let sxid = sxHead+sxLP;
    const data = {
    nrWZ: WZ,
    //sxid: sxid,
    sxHead: sxHead,
    //sxLP: sxLP,
    agTime: agTime,
    sCategory: sCategory,
    tLoad: tLoad,
    tCheck: tCheck,
    testCon: testCon,
    mixTemp: mixTemp,
    airTemp: airTemp,
    airPRC: airPRC,
    formSize: formSize,
    thermo: thermo,
    formNo: formNo,
    //------------------
    rec: recid,
    client: clientid,
    loc: loc,
    locDesc: locDesc,
    date: date,
    sxMak: sxMak,
    mak: mak,
    sid: samplingid,
    sxIT: sxIT,
    comm1: comm1
    }
  
    this.http.post<{ message: any, created: Sample2[] }>(BACKEND_SAMPLE_URL, data)
    .subscribe( resData => {
      if(resData.created) console.log("Próbki zapisane.\n", resData.created)
    }, err => { this.err.next(err) });
  }

  updateTested(
    id: string,
    laboTemp: number,
    comm1: string,
    precForm: boolean,
    precSide: boolean,
    precUpDown: boolean,
    precFlat: boolean,
    precPerpSide: boolean,
    precComm: string,
    mass: number,
    wymA: number,
    wymB: number,
    wymC: number,
    wymComm: string,

    destSpeed: number,
    destForce: number,
    destComm: string,
    chkDate: Date,
    agTime: number,
    destType?: string
  )
  {
    var destResultUnr = (destForce*1000)/(wymA*wymB);
    function round(value)
    {
      const power = Math.pow(10, 2)
      return Math.round((value*power)+(Number.EPSILON*power)) / power
    }
    var DRrounded = round(destResultUnr);

    const data = {
      tested: true,
      chkDate: chkDate,

      laboTemp: laboTemp,

      comm1: comm1,

      precForm: precForm,
      precSide: precSide,
      precUpDown: precUpDown,
      precFlat: precFlat,
      precPerpSide: precPerpSide,
      precComm: precComm,

      mass: mass,
      wymA: wymA,
      wymB: wymB,
      wymC: wymC,
      wymComm: wymComm,

      destSpeed: destSpeed,
      destSpeedCheck: true,
      destForce: destForce,
      destResult: DRrounded,
      destComm: destComm,
      destType: destType,
      agTime: agTime

    }
    this.http.put<{ updated: boolean, noData: any[], fResult: Sample2 }>(BACKEND_SAMPLE_URL+id, data)
  .subscribe( resData => {
    if(resData.fResult) console.log("Próbka zapisana.\n", resData.fResult)
  }, err => { this.err.next(err) });
  }

}


