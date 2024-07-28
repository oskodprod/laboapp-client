import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { field, prodNames, RecipeService } from '../../services/recipe.service'
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-dialog-add-recipe-form',
  templateUrl: './dialog-add-recipe-form.component.html',
  styleUrls: ['./dialog-add-recipe-form.component.css']
})
export class DialogAddRecipeFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  title: string;
  
  prods: prodNames[] = [];
  private prodListSub: Subscription;

  cls: field[] = [];
  private clsListSub: Subscription;

  clw: field[] = [];
  private clwListSub: Subscription;

  clx: field[] = [];
  private clxListSub: Subscription;
  
  con: field[] = [];
  private conListSub: Subscription;

  clf: field[] = [];
  private clfListSub: Subscription;

  cln: field[] = [];
  private clnListSub: Subscription;

  agt: field[] = [];
  private agtListSub: Subscription;

  error: any = null;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddRecipeFormComponent>,
    private rs: RecipeService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      recName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      cls: ['', [Validators.required]],
      con: ['', [Validators.required]],
      clW: [null, [Validators.nullValidator]],
      clF: [null, [Validators.nullValidator]],
      cert: [false, [Validators.required]],
      agTime: [28, [Validators.required]],
      clX: [[''], [Validators.required]],
      clN: [null, [Validators.nullValidator]],
      comments: [null, [Validators.nullValidator]],
    })
    this.rs.getProdsField();
    this.prodListSub = this.rs.getProdsFieldUpdateListener()
    .subscribe((list: prodNames[]) => {this.prods = list}, err => {this.error = err});

    this.rs.getCLSField();
    this.clsListSub = this.rs.getCLSFieldUpdateListener()
    .subscribe((list: field[]) => {this.cls = list}, err => {this.error = err});

    this.rs.getCLWField();
    this.clwListSub = this.rs.getCLWFieldUpdateListener()
    .subscribe((list: field[]) => {this.clw = list}, err => {this.error = err});

    this.rs.getCLFField();
    this.clfListSub = this.rs.getCLFFieldUpdateListener()
    .subscribe((list: field[]) => {this.clf = list}, err => {this.error = err});

    this.rs.getCLXField();
    this.clxListSub = this.rs.getCLXFieldUpdateListener()
    .subscribe((list: field[]) => {this.clx = list}, err => {this.error = err});

    this.rs.getCLNField();
    this.clnListSub = this.rs.getCLNFieldUpdateListener()
    .subscribe((list: field[]) => {this.cln = list}, err => {this.error = err});

    this.rs.getCONField();
    this.conListSub = this.rs.getCONFieldUpdateListener()
    .subscribe((list: field[]) => {this.con = list}, err => {this.error = err});

    this.rs.getAGTField();
    this.agtListSub = this.rs.getAGTFieldUpdateListener()
    .subscribe((list: field[]) => {this.agt = list}, err => {this.error = err});
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.rs.addRecipe(
      this.form.value.name,
      this.form.value.recName,
      this.form.value.cls,
      this.form.value.con,
      this.form.value.clW,
      this.form.value.clF,
      this.form.value.cert,
      this.form.value.agTime,
      this.form.value.clX,
      this.form.value.clN,
      this.form.value.comments
    );
    this.dialogRef.close();
  }

  ngOnDestroy(): void {}

}
