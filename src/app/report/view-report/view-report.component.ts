import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Labrat } from 'src/app/labrat';
//import { Labrat2 } from 'src/app/labrat2';
import { Sampling2 } from 'src/app/sampling2';
import { Report } from 'src/app/report2';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { AuthService } from 'src/app/auth/auth.service';
import { SamplingService } from 'src/app/services/sampling.service';
//import { CompanyService } from 'src/app/services/company.service';
//import { Company } from 'src/app/company';
import { Sample2 } from 'src/app/sample2';
//import { element } from 'protractor';
//import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

export function round(value)
{
  const power = Math.pow(10, 2)
  return Math.round((value*power)+(Number.EPSILON*power)) / power
}

export interface samplelisted
{
  sample: Sample2,
  checked: boolean;
  locked: boolean;
}

@AutoUnsubscribe()
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  public samplingid: string;

  loggedLabrat: Labrat;

  //loggedLabrat2: Labrat2;
  private loggedLabratSub: Subscription;
  //private csSub: Subscription;

  public reportSampling: Sampling2;
  public samplingSamples: Sample2[];
  public chosenSamples: Sample2[];
  public generatedReport: Report;
  public samplelist: samplelisted[] = [];
  
  public batchestaken: number;
  
  public destAvg: number;
  public destCk: number;
  public destMin: number;
  public stdDev: number;
  public extUnc: number;
  public Crit1: boolean;
  public Crit2: boolean;

  public scTrue: boolean = false;
  public scFalse: boolean = false;
  public s100check: boolean = false;
  public s150check: boolean = false;
  private rSub: Subscription;
  private sSub: Subscription;

  error: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rps: ReportService,
    private ss: SamplingService,
    //private cs: CompanyService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getLabratDetails();
    this.getSampling();
    this.inputs.get('repoDate').setValue(new Date());
    //this.checks();
  }

  getLabratDetails()
  {
    this.auth.UserDetails();
    this.loggedLabratSub = this.auth.getLoggedLabratUpdateListener()
    .subscribe(res => {
      this.loggedLabrat = res;
      this.error = this.auth.message;
    }, err => { this.error = err; })
  }

  getSampling()
  {
    this.samplingid = this.route.snapshot.paramMap.get('reportId')
    this.ss.getSampling(this.samplingid);
    this.sSub = this.ss.getSamplingUpdateListener()
    .subscribe(foundSampling => {
      this.reportSampling = foundSampling;
      this.chosenSamples = this.samplingSamples = this.reportSampling.samples;
      
      this.destCk = Number(this.reportSampling.rec.clS.slice(-2))
      this.samplingSamples.forEach(index => {
        if(index.destResult==0||index.destResult==null)
        this.samplelist.push({ sample: index, checked: false, locked: true})
        else
        this.samplelist.push({ sample: index, checked: true, locked: false})
      })

      this.checks();
      /*this.Labo.name = foundSampling.labrat.labo.name;
      this.Labo.address = foundSampling.labrat.labo.address;
      this.Labo.city = foundSampling.labrat.labo.city;
      this.Labo.postalcode = foundSampling.labrat.labo.name;*/
    }, err => { this.error = err; })
    
  }

  checks()
  {
    this.scTrue = this.scFalse = this.s100check = this.s150check = this.Crit1 = this.Crit2 = false;
    this.chosenSamples = [];
    this.destAvg = this.batchestaken = this.destMin = this.stdDev = this.extUnc = 0;
    
    this.samplelist.forEach(element => {
      if (element.sample.sCategory==true) this.scTrue=true;
      if (element.sample.sCategory==false) this.scFalse=true;
      if (element.sample.formSize=='S100') this.s100check=true;
      if (element.sample.formSize=='S150') this.s150check=true;
      if (element.checked) this.chosenSamples.push(element.sample);
    });
    if(this.chosenSamples.length!=0) {
      let batches = new Array();
      let min = new Array();
      this.chosenSamples.forEach(element => {
        min.push(element.destResult);
        //min.map( element => { return (element - ) } )
        if( !batches.includes(element.WZ) ) batches.push(element.WZ);
        this.destAvg += element.destResult;
      })
      this.batchestaken = batches.length;
      this.destAvg = round(this.destAvg/this.chosenSamples.length);
      this.destMin = Math.min(...min);
      if(this.destMin >= (this.destCk-4)) this.Crit2=true;
      if(this.chosenSamples.length>1){
        min = min.map( element => { return (element - this.destAvg)**2 } );
        this.stdDev = min.reduce((a,c)=> a+c, 0);
        this.extUnc = round(2* Math.sqrt( this.stdDev/(this.chosenSamples.length*(this.chosenSamples.length-1)) ));
        this.stdDev = round(Math.sqrt( this.stdDev/this.chosenSamples.length ));
        if ( this.batchestaken > 1 && this.batchestaken < 5 && this.destAvg >= (this.destCk+1)) this.Crit1=true;
        if ( this.batchestaken > 4 && this.destAvg >= (this.destCk+2)) this.Crit1=true;
      }
    }
  }

  onCheck()
  {
    this.checks();
  }

  inputs = new FormGroup({
    repoRev: new FormControl( '', [Validators.maxLength(1), Validators.required] ),
    repoDate: new FormControl( 0, Validators.required )
  })

  save()
  {
    this.rps.saveReport(
      this.inputs.value.repoDate,
      'REP/'+this.inputs.value.repoRev+'/'+this.chosenSamples[0].sxid.slice(5),
      this.reportSampling._id,
      this.chosenSamples.map(index => {return index._id}),
      this.destAvg,
      this.destCk,
      this.destMin,
      this.stdDev,
      this.extUnc,
      this.loggedLabrat.pName+' '+this.loggedLabrat.lastname
    )
    this.rSub = this.rps.getSavedReportUpdateListener()
    .subscribe(savedReport => {
      //console.log(savedReport);
      this.router.navigateByUrl("/generated/"+savedReport._id);
    })
  }

  ngOnDestroy(){}
}
