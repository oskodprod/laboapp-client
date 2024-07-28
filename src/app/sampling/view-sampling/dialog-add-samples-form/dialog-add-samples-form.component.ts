import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { field, SampleService } from 'src/app/services/sample.service';
import { Sample2 } from 'src/app/sample2';
import { Rec2 } from 'src/app/rec2';
//import { Labrat2 } from 'src/app/labrat2';
import { Client2 } from 'src/app/client2';
import { Company } from 'src/app/company';
import { Sampling2 } from 'src/app/sampling2';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-dialog-add-samples-form',
  templateUrl: './dialog-add-samples-form.component.html',
  styleUrls: ['./dialog-add-samples-form.component.css']
})
export class DialogAddSamplesFormComponent implements OnInit, OnDestroy {

  date: Date;
  checked: boolean;
  form: FormGroup;
  title: string;

  preSxHead: string;
  
  sample: Sample2;
  private sampleUpdated: Subscription;

  formList: field[] = [];
  private formSizes: Subscription;

  error: any = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddSamplesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: Rec2, client: Client2, company: Company, ini: string, sDate: Date, sampling: Sampling2 },
    private sxs: SampleService
    ) { }

  ngOnInit(): void {
    this.date = new Date(this.data.sDate);
    this.preSxHead = this.date.getFullYear().toString() + "/" + (this.date.getMonth()+1).toString() + "/" + this.data.ini + "/";
    this.form = this.fb.group({
      sxC: [1, [Validators.required]],
      WZ: [null, [Validators.required]],
      //sxid: [null, [Validators.required]],
      sxHead: [ this.preSxHead, [Validators.required]],
      //sxLP: [null, [Validators.required]],
      agTime: [null, [Validators.pattern(/^[0-9]{1,3}$/)]],
      sCategory: [true, [Validators.required]],
      tLoad: [null, [Validators.nullValidator]],
      tCheck: [null, [Validators.required]],
      testCon: [null, [Validators.pattern(/^[0-9]{2,3}$/)]],
      mixTemp: [null, [Validators.nullValidator]],
      airTemp: [null, [Validators.nullValidator]],
      airPRC: [null, [Validators.nullValidator]],
      formSize: [null, [Validators.required]],
      thermo: [null, [Validators.nullValidator]],
      formNo: [null, [Validators.required]]
    })
    this.sxs.getFSField();
    this.formSizes = this.sxs.getFSFieldUpdateListener()
    .subscribe((list: field[]) => { this.formList = list }, err => {this.error = err})

    this.sxs.err.subscribe(err => {this.error = err});
    //this.sxs.getSample(this.data);
    /*this.sampleUpdated = this.sxs.getSampleUpdatedListener()
    .subscribe(foundSample => {
      this.sample = foundSample;
      this.form.get('WZ').setValue(this.sample.WZ);
      
      this.form.get('sxLP').setValue(this.sample.sxLP);
      this.form.get('agTime').setValue(this.sample.agTime);
      this.form.get('sCategory').setValue(this.sample.sCategory);
      this.form.get('tLoad').setValue(this.sample.tLoad);
      this.form.get('tCheck').setValue(this.sample.tCheck);
      this.form.get('testCon').setValue(this.sample.testCon);
      this.form.get('mixTemp').setValue(this.sample.mixTemp);
      this.form.get('airTemp').setValue(this.sample.airTemp);
      this.form.get('airPRC').setValue(this.sample.airPRC);
      this.form.get('formSize').setValue(this.sample.formSize);
      this.form.get('thermo').setValue(this.sample.thermo);
      this.form.get('formNo').setValue(this.sample.formNo);
    }, err => {this.error = err})*/
    //this.form.get('sxHead').setValue(this.preSxHead);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.sxs.addSamples
    (
      this.form.value.sxC,
      //------------------
      this.form.value.WZ,
      this.form.value.sxHead,
      //this.form.value.sxLP,
      this.form.value.agTime,
      this.form.value.sCategory,
      this.form.value.tLoad,
      this.form.value.tCheck,
      this.form.value.testCon,
      this.form.value.mixTemp,
      this.form.value.airTemp,
      this.form.value.airPRC,
      this.form.value.formSize,
      this.form.value.thermo,
      this.form.value.formNo,
      //------------------
      this.data.sampling.rec._id,
      this.data.sampling.client._id,
      this.data.sampling.loc,
      this.data.sampling.locDesc,
      this.data.sampling.docDate,
      this.data.sampling.sxMak,
      this.data.sampling.mak,
      this.data.sampling._id,
      this.data.sampling.comments
    );
    this.dialogRef.close('Refresh')
  }

  ngOnDestroy(): void {}
}