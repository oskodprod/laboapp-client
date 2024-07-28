import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { laboNames, LabratService } from '../../services/labrat.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-add-labrat-form',
  templateUrl: './dialog-add-labrat-form.component.html',
  styleUrls: ['./dialog-add-labrat-form.component.css']
})
export class DialogAddLabratFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  labos: laboNames[] = [];
  private laboListSub: Subscription;
  selectedLabo: string;
  error: any = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddLabratFormComponent>,
    private ls: LabratService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      pName: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      iniShort: ['', [Validators.pattern(/^[0-9A-Z]{2,4}$/)]],
      isAdmin: [false, Validators.required],

      name: ['', [Validators.required]], //company name

      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.ls.getLabosField();
    this.laboListSub = this.ls.getLabosFieldUpdateListener()
    .subscribe((list: laboNames[]) => {this.labos = list}, err => {this.error = err });

  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.ls.addLabrat(
      this.form.value.pName,
      this.form.value.lastname,
      this.form.value.iniShort,
      this.form.value.isAdmin,
      this.form.value.email,
      this.form.value.password,
      this.form.value.name );
    this.dialogRef.close();
  }

}
