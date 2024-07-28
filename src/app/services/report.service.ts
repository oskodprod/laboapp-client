import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Report } from '../report2';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sampling2 } from '../sampling2';

const BACKEND_REPORT_URL = environment.apiUrl + "/report/";
const BACKEND_SAMPLE_URL = environment.apiUrl + "/sample/";
const BACKEND_SAMPLING_URL = environment.apiUrl + "/sampling/";

export interface samplingsList
{
  id: string,
  docDate: Date,
  client: string,
  sid: string,
  rec: string,
  samples: string[],
  destResults: number[]
}

export interface reportsList
{
  id: string,
  docDate: Date,
  rid: string,
  createdBy: string,
  fckEnd: number,
  avgEnd: number,
  samplesTaken: number,
}

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  private filteredSamplings: samplingsList[] = [];
  private filteredReports: reportsList[] = [];
  private repflag: number = 0;
  public report: Report;
  private filterUpdated = new Subject<samplingsList[]>();
  private reportsFilterUpdated = new Subject<reportsList[]>();
  private reportCreated = new Subject<Report>();
  private reportFound = new Subject<Report>();

  public err = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) { }

  getSamplingsList(start: Date, end: Date){
    
    //var datestart = Date.parse(start);
    //var dateend = Date.parse(end);
    const data = {
      start: start.valueOf().toString(),
      end: end.valueOf().toString()
    }

    //console.log(BACKEND_SAMPLE_URL, {params: data});
    this.http.get<{ flag: number, message: string, filtered: Sampling2[], loc: string }>(BACKEND_SAMPLING_URL+"dates", {params: data})
    .pipe(
      map(samplings => {
        //console.log(samples.message);
        //console.log(samples.loc);
        this.repflag = samplings.flag;

        //this.err.next([...samples.loc]);
        return samplings.filtered.map(field =>{
          return {
            id: field._id,
            docDate: field.docDate,
            client: field.client.company.name+' '+field.client.clName,
            sid: field.sid,
            rec: field.rec.recName,
            //samples: field.samples.map( res => { return res.sxid+": "+res.destResult+"\n"; } )
            samples: field.samples.map( res => { return res.sxid.slice(5) } ),
            destResults: field.samples.map(res => { return res.destResult })
          }
        })
      })
    )
    .subscribe( maplist => {
      this.filteredSamplings = maplist;
      this.filterUpdated.next([...this.filteredSamplings])
    }, err => { this.err.next(err) })
  }
  getFilterUpdatedListener(){
    return this.filterUpdated.asObservable();
  }
  getSamplingsListFlag(){
    return this.repflag; 
  }

  getReportsList(start: Date, end: Date){
    const data = {
      start: start.valueOf().toString(),
      end: end.valueOf().toString()
    }

    this.http.get<{ flag: number, message: string, filtered: Report[], loc: string }>(BACKEND_REPORT_URL, {params: data})
    .pipe(
      map(reports => {
        this.repflag = reports.flag;
        
        return reports.filtered.map( field => {
          return {
            id: field._id,
            docDate: field.docDate,
            rid: field.rid,
            createdBy: field.createdBy,
            fckEnd: field.fckEnd,
            avgEnd: field.avgEnd,
            samplesTaken: field.samples.length
          }
        })
      })
    )
    .subscribe(maplist => {
      this.filteredReports = maplist;
      this.reportsFilterUpdated.next([...this.filteredReports])
    }, err => { this.err.next(err) })
  }
  getReportsFilterUpdatedListener(){
    return this.reportsFilterUpdated.asObservable();
  }

  saveReport(
    docDate: Date,
    rid: string,
    sampling: string,
    samples: string[],
    avgEnd: number,
    fckEnd: number,
    minEnd: number,
    odchStd: number,
    niepewnosc: number,
    createdBy: string
  ){
    const data = {
      docDate: docDate,
      rid: rid,
      sampling: sampling,
      samples: samples,
      avgEnd: avgEnd,
      fckEnd: fckEnd,
      minEnd: minEnd,
      odchStd: odchStd,
      niepewnosc: niepewnosc,
      createdBy: createdBy
    }

    this.http.post<{ message: any, created: Report }>(BACKEND_REPORT_URL, data)
    .subscribe( resData => {
      if(resData.created)
      {
        console.log("Sprawozdanie zapisane.\n", resData.created);
        this.report = resData.created;
        this.reportCreated.next(resData.created);
      //return resData.created._id; 
      }
    }, err => { this.err.next(err) } )
  }
  getSavedReportUpdateListener(){
    return this.reportCreated.asObservable();
  }

  async getGeneratedReport(id: string)
  {
    this.http.get<{ message?: any, found: Report }>(BACKEND_REPORT_URL+id)
    .subscribe(resData => {
      if (resData.found) {
        this.report = resData.found;
        this.reportFound.next(resData.found);
      }
    }, err => { this.err.next(err) } )
  }
  getFoundReportUpdateListener(){
    return this.reportFound.asObservable();
  }

  deleteReport(id: string)
  {
    this.http.delete<{ message: any, deleted: any }>(BACKEND_REPORT_URL+id)
    .subscribe(resData => {
      this.err.next('Błąd');
      console.log("Protokół usunięto.\n", resData.deleted)
    }), err => { this.err.next(err) };
  }
}
