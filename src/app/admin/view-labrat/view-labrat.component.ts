import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { LabratService, laboNames } from '../../services/labrat.service';
//import { Labrat } from '../../labrat';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-labrat',
  templateUrl: './view-labrat.component.html',
  styleUrls: ['./view-labrat.component.css']
})
export class ViewLabratComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private labratSub: Subscription;
  labos: laboNames[] = [];
  private laboListSub: Subscription;
  error: any = null;
  constructor(
    private lService: LabratService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.error = null;
    this.form = this.fb.group({
      pName: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      iniShort: [null, [Validators.pattern(/^[0-9A-Z]{2,4}$/)]],
      isAdmin: [null, Validators.required],
      name: [null, [Validators.required]], //company name
      email:[null,[Validators.required]],
      password:[null,[Validators.nullValidator]]
    })
    this.lService.err.subscribe(err => { this.error = err })
    this.lService.getLabrat(this.route.snapshot.paramMap.get('labratId'));
    this.labratSub = this.lService.getLabratUpdateListener()
    .subscribe(found => 
      { 
        this.form.get('pName').setValue(found.pName);
        this.form.get('lastname').setValue(found.lastname);
        this.form.get('iniShort').setValue(found.iniShort);
        this.form.get('isAdmin').setValue(found.isAdmin);
        this.form.get('name').setValue(found.name);
        this.form.get('email').setValue(found.email);
      }, err => {this.error = err})
      this.lService.getLabosField();
      this.laboListSub = this.lService.getLabosFieldUpdateListener()
      .subscribe((list: laboNames[]) => {this.labos = list}, err => {this.error = err });
  }

  save(){
    this.lService.updateLabrat(
      this.route.snapshot.paramMap.get('labratId'),
      this.form.value.pName,
      this.form.value.lastname,
      this.form.value.iniShort,
      this.form.value.isAdmin,
      this.form.value.email,
      this.form.value.password,
      this.form.value.name
    )
    this.router.navigateByUrl("/labrats")
  }

  ngOnDestroy(): void {}
}
