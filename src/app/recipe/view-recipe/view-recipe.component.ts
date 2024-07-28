import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService, field, prodNames } from '../../services/recipe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rec } from '../../rec';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit, OnDestroy {

  form: FormGroup

  recipe: Rec;
  private recSub: Subscription;

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
    private recService: RecipeService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.error = null;
    this.form = this.fb.group({
      recName: [null, [Validators.required]],
      name: [null, [Validators.required]],
      cls: [null, [Validators.required]],
      con: [null, [Validators.required]],
      clW: [null, [Validators.nullValidator]],
      clF: [null, [Validators.nullValidator]],
      cert: [null, [Validators.required]],
      agTime: [null, [Validators.required]],
      clX: [null, [Validators.required]],
      clN: [null, [Validators.nullValidator]],
      comments: [null, [Validators.nullValidator]],
    })
    this.recService.getProdsField();
    this.prodListSub = this.recService.getProdsFieldUpdateListener()
    .subscribe((list: prodNames[]) => {this.prods = list}, err => {this.error = err});

    this.recService.getCLSField();
    this.clsListSub = this.recService.getCLSFieldUpdateListener()
    .subscribe((list: field[]) => {this.cls = list}, err => {this.error = err});

    this.recService.getCLWField();
    this.clwListSub = this.recService.getCLWFieldUpdateListener()
    .subscribe((list: field[]) => {this.clw = list}, err => {this.error = err});

    this.recService.getCLFField();
    this.clfListSub = this.recService.getCLFFieldUpdateListener()
    .subscribe((list: field[]) => {this.clf = list}, err => {this.error = err});

    this.recService.getCLXField();
    this.clxListSub = this.recService.getCLXFieldUpdateListener()
    .subscribe((list: field[]) => {this.clx = list}, err => {this.error = err});

    this.recService.getCLNField();
    this.clnListSub = this.recService.getCLNFieldUpdateListener()
    .subscribe((list: field[]) => {this.cln = list}, err => {this.error = err});

    this.recService.getCONField();
    this.conListSub = this.recService.getCONFieldUpdateListener()
    .subscribe((list: field[]) => {this.con = list}, err => {this.error = err});

    this.recService.getAGTField();
    this.agtListSub = this.recService.getAGTFieldUpdateListener()
    .subscribe((list: field[]) => {this.agt = list}, err => {this.error = err});
    
    this.recService.err.subscribe(err => { this.error = err })
    this.recService.getRecipe(this.route.snapshot.paramMap.get('recipeId'));
    this.recSub = this.recService.getRecipeUpdateListener()
    .subscribe(found => 
      { 
        this.form.get('name').setValue(found.name);
        this.form.get('recName').setValue(found.recName);
        this.form.get('cls').setValue(found.clS);
        this.form.get('con').setValue(found.con);
        this.form.get('clW').setValue(found.clW);
        this.form.get('clF').setValue(found.clF);
        this.form.get('cert').setValue(found.cert);
        this.form.get('agTime').setValue(found.agTime);
        this.form.get('clX').setValue(found.clX);
        this.form.get('clN').setValue(found.clN);
        this.form.get('comments').setValue(found.comments);
      }, err => {this.error = err})
  }

  save(): void {
    this.recService.updateRecipe(
      this.route.snapshot.paramMap.get('recipeId'),
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
    this.router.navigateByUrl("/filrec");
  }

  ngOnDestroy(): void {}
}
