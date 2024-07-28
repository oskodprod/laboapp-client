import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Subscription, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { field, recNames, clNames, SamplingService } from '../../services/sampling.service';
import { RecipeService } from '../../services/recipe.service';
import { ClientService } from '../../services/client.service';
//import { LabratService } from '../../services/labrat.service';
import { AuthService } from '../../auth/auth.service';
import { Rec2 } from '../../rec2';
import { Client2 } from '../../client2';
import { Labrat2 } from '../../labrat2';
import { Sample2 } from '../../sample2';
//import { Sampling } from '../../sampling';
import { Sampling2 } from 'src/app/sampling2';
import { Rec } from '../../rec';
import { DialogEditSampleFormComponent } from './dialog-edit-sample-form/dialog-edit-sample-form.component';
import { DialogAddSamplesFormComponent } from './dialog-add-samples-form/dialog-add-samples-form.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
//import { DialogAddClientFormComponent } from 'src/app/navbar/dialog-add-client-form/dialog-add-client-form.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-sampling',
  templateUrl: './view-sampling.component.html',
  styleUrls: ['./view-sampling.component.css']
})
export class ViewSamplingComponent implements OnInit, OnDestroy {

  form: FormGroup

  sampling: Sampling2;
  private proSub: Subscription;

  samples: Sample2[]
  samplesColumns: string[] = ['lp', 'WZ', 'sxid', 'agTime', 'sCategory', 'tLoad', 'tCheck', 'testCon', 'mixTemp', 'airTemp', 'airPRC', 'formSize', 'thermo', 'formNo', 'edit', 'delete']
  samplesShow: Sample2[];

  recs: recNames[] = [];
  private recListSub: Subscription;

  clients: clNames[] = [];
  private clListSub: Subscription;
  
  cl: Client2;
  clid: string;
  private clSub: Subscription;

  rc: Rec2;
  rec: Rec;
  recid: string;
  private recSub: Subscription;

  lb: Labrat2;
  labid: string;

  locList: field[] = [];
  private locListSub: Subscription;

  makList: field[] = [];
  private makListSub: Subscription;

  sxmakList: field[] = [];
  private sxmakListSub: Subscription;

  error: any = null;

  public thisid: string;
  //public disableDocDate = false;
  public destroyed = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private ss: SamplingService,
    private rs: RecipeService,
    private cs: ClientService,
    //private ls: LabratService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public EditSample: MatDialog,
    public AddSamples: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.error = null;
    this.thisid = this.route.snapshot.paramMap.get('samplingId');
    this.form = this.fb.group({
      //protokół
      docDate: [null, [Validators.required]],
      sidhd: [null, [Validators.required]],
      sidlp: [null, [Validators.required, Validators.pattern(/^[0-9]{1,5}$/)]],
      loc: [null, [Validators.nullValidator]], //miejsce betonowania
      locDesc: [null, [Validators.nullValidator]], //opis miejsca
      mak: [null, [Validators.nullValidator]],
      sxMak: [null, [Validators.nullValidator]], //wykonawca próbek

      //client: [null, [Validators.required]],
      //rec: [null, [Validators.required]],

      //informacje o recepturze (disabled)
      recName: [null, [Validators.required]],
      maker: [{ value: null, readonly: true }, [Validators.required]],
      cls: [{ value: null, readonly: true }, [Validators.required]],
      con: [{ value: null, readonly: true }, [Validators.required]],
      clW: [{ value: null, readonly: true }, [Validators.nullValidator]],
      clF: [{ value: null, readonly: true }, [Validators.nullValidator]],
      //cert: [null, [Validators.required]],
      //agTime: [null, [Validators.required]],
      clX: [{ value: null, readonly: true }, [Validators.required]],
      clN: [{ value: null, readonly: true }, [Validators.nullValidator]],
      comments: [{ value: null, readonly: true }, [Validators.nullValidator]],
      //informacje o budowie (disabled)
      cid: [{ value: null, readonly: true }, [Validators.required]],
      clName: [null, [Validators.required]],
      clCompany: [{ value: null, readonly: true }, [Validators.required]],
      clAddress: [{ value: null, readonly: true }, [Validators.required]],
      clCity: [{ value: null, readonly: true }, [Validators.required]],
      contact: [{ value: null, readonly: true }, [Validators.required]],//imię nazwisko i mail
      //laborant wystawiający protokół (disabled)
      labrat: [{ value: null, readonly: true }, [Validators.required]]
    })
    this.form.markAsPristine();
    
    this.ss.getRecField();
    this.recListSub = this.ss.getRecFieldUpdateListener()
    .subscribe((list: recNames[]) => {this.recs = list}, err => {this.error += err });

    this.ss.getClField();
    this.clListSub = this.ss.getClFieldUpdateListener()
    .subscribe((list: clNames[]) => {this.clients = list}, err => {this.error += err });

    this.ss.getLOCField();
    this.locListSub = this.ss.getLOCFieldUpdateListener()
    .subscribe((list: field[]) => {this.locList = list}, err => {this.error += err });
    
    this.ss.getMAKField();
    this.makListSub = this.ss.getMAKFieldUpdateListener()
    .subscribe((list: field[]) => {this.makList = list}, err => {this.error += err });

    this.ss.getSXMAKField();
    this.sxmakListSub = this.ss.getSXMAKFieldUpdateListener()
    .subscribe((list: field[]) => {this.sxmakList = list}, err => {this.error += err });

    this.ss.err.subscribe(err => {this.error += err})
    this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'))
    this.proSub = this.ss.getSamplingUpdateListener()
    .subscribe(foundSampling => 
      {
        this.sampling = foundSampling;
        this.rc = foundSampling.rec;
        this.cl = foundSampling.client;
        this.lb = foundSampling.labrat;
        this.samples = foundSampling.samples;
        //if ( this.samples.length!=0 ) { this.disableDocDate=true };
        this.form.get('docDate').setValue(this.sampling.docDate);
        this.form.get('sidhd').setValue(this.sampling.sidHead);
        this.form.get('sidlp').setValue(this.sampling.sidLP);
        this.form.get('loc').setValue(this.sampling.loc);
        this.form.get('locDesc').setValue(this.sampling.locDesc);
        this.form.get('sxMak').setValue(this.sampling.sxMak);
        this.form.get('mak').setValue(this.sampling.mak);

        //receptura
        this.form.get('recName').setValue(this.rc.recName);
                  //disabled
        this.form.get('maker').setValue(this.rc.maker.name);
        this.form.get('cls').setValue(this.rc.clS);
        this.form.get('con').setValue(this.rc.con);
        this.form.get('clW').setValue(this.rc.clW);
        this.form.get('clF').setValue(this.rc.clF);
        this.form.get('clX').setValue(this.rc.clX);
        this.form.get('clN').setValue(this.rc.clN);
        this.form.get('comments').setValue(this.rc.comments);
        //budowa
        this.form.get('clName').setValue(this.cl.clName);
                  //(disabled)
        this.form.get('clCompany').setValue(this.cl.company.name)
        this.form.get('cid').setValue(this.cl.cid);
        this.form.get('clAddress').setValue(this.cl.clAddress);
        this.form.get('clCity').setValue(this.cl.clCity);
        this.form.get('contact').setValue
        (this.cl.contactname+' '+this.cl.contactlastname+' '+this.cl.user.email);
        //laborant
        this.form.get('labrat').setValue
        (this.lb.pName+' '+this.lb.lastname+' '+this.lb.labo.name);
      }, err => {this.error = err})

      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      ).subscribe(() => {
        this.fetchData();
        this.form.markAsPristine();
      });
  }

  fetchData(){
    this.ss.getRecField();
    this.recListSub = this.ss.getRecFieldUpdateListener()
    .subscribe((list: recNames[]) => {this.recs = list}, err => {this.error += err });

    this.ss.getClField();
    this.clListSub = this.ss.getClFieldUpdateListener()
    .subscribe((list: clNames[]) => {this.clients = list}, err => {this.error += err });

    this.ss.getLOCField();
    this.locListSub = this.ss.getLOCFieldUpdateListener()
    .subscribe((list: field[]) => {this.locList = list}, err => {this.error += err });
    
    this.ss.getMAKField();
    this.makListSub = this.ss.getMAKFieldUpdateListener()
    .subscribe((list: field[]) => {this.makList = list}, err => {this.error += err });

    this.ss.getSXMAKField();
    this.sxmakListSub = this.ss.getSXMAKFieldUpdateListener()
    .subscribe((list: field[]) => {this.sxmakList = list}, err => {this.error += err });

    this.ss.err.subscribe(err => {this.error += err})
    this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'))
    this.proSub = this.ss.getSamplingUpdateListener()
    .subscribe(foundSampling => 
      {
        this.sampling = foundSampling;
        this.rc = foundSampling.rec;
        this.cl = foundSampling.client;
        this.lb = foundSampling.labrat;
        this.samples = foundSampling.samples;       
        //if ( this.samples.length!=0 ) { this.disableDocDate=true };
        this.form.get('docDate').setValue(this.sampling.docDate);
        this.form.get('sidhd').setValue(this.sampling.sidHead);
        this.form.get('sidlp').setValue(this.sampling.sidLP);
        this.form.get('loc').setValue(this.sampling.loc);
        this.form.get('locDesc').setValue(this.sampling.locDesc);
        this.form.get('sxMak').setValue(this.sampling.sxMak);
        this.form.get('mak').setValue(this.sampling.mak);

        //receptura
        this.form.get('recName').setValue(this.rc.recName);
                  //disabled
        this.form.get('maker').setValue(this.rc.maker.name);
        this.form.get('cls').setValue(this.rc.clS);
        this.form.get('con').setValue(this.rc.con);
        this.form.get('clW').setValue(this.rc.clW);
        this.form.get('clF').setValue(this.rc.clF);
        this.form.get('clX').setValue(this.rc.clX);
        this.form.get('clN').setValue(this.rc.clN);
        this.form.get('comments').setValue(this.rc.comments);
        //budowa
        this.form.get('clName').setValue(this.cl.clName);
                  //(disabled)
        this.form.get('clCompany').setValue(this.cl.company.name)
        this.form.get('cid').setValue(this.cl.cid);
        this.form.get('clAddress').setValue(this.cl.clAddress);
        this.form.get('clCity').setValue(this.cl.clCity);
        this.form.get('contact').setValue
        (this.cl.contactname+' '+this.cl.contactlastname+' '+this.cl.user.email);
        //laborant
        this.form.get('labrat').setValue
        (this.lb.pName+' '+this.lb.lastname+' '+this.lb.labo.name);
      }, err => {this.error += err})
    
      this.form.markAsPristine();
  }

  onClChange(id: string){
    this.cs.getClient(id)
    this.clSub = this.cs.getClientUpdateListener()
    .subscribe(found => {
      this.form.get('clCompany').setValue(found.name);
      this.form.get('cid').setValue(found.cid);
      this.form.get('clAddress').setValue(found.clAddress);
      this.form.get('clCity').setValue(found.clCity);
      this.form.get('contact').setValue
      (found.contactname+' '+found.contactlastname+' '+found.email);
      this.clid = id;
      this.changeDetectorRef.detectChanges();
    }, err => { console.error(err); this.error += err })
  }

  async onRecChange(id: string){
     this.rs.getRecipe(id)
    .then(() => {
      this.recSub = this.rs.getRecipeUpdateListener()
      .subscribe(found => {
          this.form.get('maker').setValue(found.name);
          this.form.get('cls').setValue(found.clS);
          this.form.get('con').setValue(found.con);
          this.form.get('clW').setValue(found.clW);
          this.form.get('clF').setValue(found.clF);
          this.form.get('clX').setValue(found.clX);
          this.form.get('clN').setValue(found.clN);
          this.form.get('comments').setValue(found.comments);
          this.recid = id;
          this.changeDetectorRef.detectChanges();
      }, err => { console.error(err); this.error += err } );
      this.changeDetectorRef.detectChanges();}
    )
  }

  openEditSampleDialog(id: string)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = id;

    const dialogRef = this.EditSample.open(DialogEditSampleFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data == 'Refresh') this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'));
    }, err => this.error += err);
  }

  
  openAddSamplesDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { 
      recipe: this.rc, 
      client: this.cl, 
      company: this.lb.labo, 
      ini: this.auth.getIniShort(), 
      sDate: this.sampling.docDate,
      sampling: this.sampling
    }

    const dialogRef = this.AddSamples.open(DialogAddSamplesFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data == 'Refresh') this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'));
    }, err => this.error += err);
  }
  
  deleteSample(id: string)
  {
    this.ss.deleteSample(id);
    this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'));
    this.router.navigateByUrl("/editpro/"+this.thisid);
    this.form.markAsPristine();
  }

  save(): void
  {
    this.ss.updateSampling(
      this.route.snapshot.paramMap.get('samplingId'),
      this.form.value.docDate, //date1,
      this.clid,
      this.recid,
      this.form.value.sidhd,
      this.labid,
      this.form.value.sidhd+this.form.value.sidlp,
      this.form.value.sidlp,
      this.form.value.comments,
      this.samples,
      this.form.value.loc,
      this.form.value.locDesc,
      this.form.value.mak,
      this.form.value.sxMak
    );
    this.ss.getSampling(this.route.snapshot.paramMap.get('samplingId'));
    this.router.navigateByUrl("/editpro/"+this.thisid);
    this.form.markAsPristine();
  }

  ngOnDestroy(): void {}
}
