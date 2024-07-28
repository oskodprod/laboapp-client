import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { recNames, clNames, SamplingService } from '../../services/sampling.service';
import { AuthService } from '../../auth/auth.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-dialog-add-sampling',
  templateUrl: './dialog-add-sampling.component.html',
  styleUrls: ['./dialog-add-sampling.component.css']
})
export class DialogAddSamplingComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  date: Date;
  iniShort: string;

  recs: recNames[] = [];
  private recListSub: Subscription;

  clients: clNames[] = [];
  private clListSub: Subscription;

  private sidHead: string;
  //private sidLP: number;
  //private IdUpdate: Subscription;
  //private sid: string;
  //private labrat: string;
  //private createdSampling: string;

  error: any = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddSamplingComponent>,
    private ss: SamplingService,
    private auth: AuthService,
    //private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      client: [null, [Validators.required]],
      rec: [null, [Validators.required]]
    })
    this.ss.getRecField();
    this.recListSub = this.ss.getRecFieldUpdateListener()
    .subscribe((list: recNames[]) => {this.recs = list}, err => {this.error = err});

    this.ss.getClField();
    this.clListSub = this.ss.getClFieldUpdateListener()
    .subscribe((list: clNames[]) => {this.clients = list}, err => {this.error = err});

    this.iniShort = this.auth.getIniShort();
    //this.labrat = this.auth.getUserId();
    //this.IdUpdate = this.ss.SamplingIdUpdateListener()
    //.subscribe(id => this.createdSampling = id);
    this.date = new Date();
    this.sidHead = this.date.getFullYear().toString() + "/" + (this.date.getMonth()+1).toString() + "/P/" + this.iniShort + "/";
    //this.ss.getSIDLP(this.sidHead);
    //this.sidLPSub = this.ss.getSIDLPListener()
    //.subscribe((sidlp: number) => { this.sidLP = sidlp }, err => {this.error = err});
    //this.sidLP = this.ss.sidLP;
    //this.sid = this.sidHead+this.sidLP.toString();
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.ss.addSampling(
      //this.sid, 
      this.sidHead, 
      //this.sidLP, 
      this.form.value.rec,
      this.form.value.client,
      this.auth.getUserId() )
    this.dialogRef.close();
    //this.router.navigate(["/editpro/"+this.createdSampling])
  }

  ngOnDestroy(): void {}
}
