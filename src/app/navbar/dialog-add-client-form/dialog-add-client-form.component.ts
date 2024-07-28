import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { wykoNames, ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-dialog-add-client-form',
  templateUrl: './dialog-add-client-form.component.html',
  styleUrls: ['./dialog-add-client-form.component.css']
})
export class DialogAddClientFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  wykos: wykoNames[] = [];
  private wykoListSub: Subscription;
  error: any = null;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddClientFormComponent>,
    private cls: ClientService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      clName: ['', [Validators.required]],
      clAddress: ['', [Validators.required]],
      clCity: ['', [Validators.required]],
      short: ['', [Validators.pattern(/^[0-9A-Za-z ]{3,11}$/)]],
      iniShort: ['', [Validators.pattern(/^[0-9A-Z]{2,4}$/)]],
      cid: ['', [Validators.required]],
      contactname: ['', [Validators.required]],
      contactlastname: ['', [Validators.required]],
      contactTelNo: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      name: ['', [Validators.required]], //company name
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.cls.getWykosField();
    this.wykoListSub = this.cls.getWykosFieldUpdateListener()
    .subscribe((list: wykoNames[]) => {this.wykos = list}, err => {this.error = err });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.cls.addClient(
      this.form.value.clName,
      this.form.value.clAddress,
      this.form.value.clCity,
      this.form.value.short,
      this.form.value.iniShort,
      this.form.value.cid,
      this.form.value.contactname,
      this.form.value.contactlastname,
      this.form.value.contactTelNo,
      this.form.value.email,
      this.form.value.password,
      this.form.value.name );
    this.dialogRef.close();
  }

  ngOnDestroy(): void{}
}
