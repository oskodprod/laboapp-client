import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
//import { Client } from '../../client';
import { ClientService, wykoNames } from '../../services/client.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit, OnDestroy {

  form: FormGroup

  //client: Client;
  private clSub: Subscription;
  error: any = null;
  wykos: wykoNames[] = [];
  private wykoListSub: Subscription;
  constructor(private clService: ClientService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.error = null;
    this.form = this.fb.group({
      clName: [null, [Validators.required]],
      clAddress: [null, [Validators.required]],
      clCity: [null, [Validators.required]],
      short: [null, [Validators.pattern(/^[0-9A-Za-z ]{3,11}$/)]],
      iniShort: [null, [Validators.pattern(/^[0-9A-Z]{2,4}$/)]],
      cid: [null, [Validators.required]],
      contactname: [null, [Validators.required]],
      contactlastname: [null, [Validators.required]],
      contactTelNo: [null, [Validators.pattern(/^[0-9]{9}$/)]],
      name: [null, [Validators.required]], //company name
      email:[null,[Validators.required]],
      password:[null,[Validators.nullValidator]]
    })
    this.clService.err.subscribe(err => { this.error = err })
    this.clService.getClient(this.route.snapshot.paramMap.get('clientId'));
    this.clSub = this.clService.getClientUpdateListener()
    .subscribe(found => 
      { 
        //this.client = found;
        this.form.get('clName').setValue(found.clName);
        this.form.get('clAddress').setValue(found.clAddress);
        this.form.get('clCity').setValue(found.clCity);
        this.form.get('short').setValue(found.short);
        this.form.get('iniShort').setValue(found.iniShort);
        this.form.get('cid').setValue(found.cid);
        this.form.get('contactname').setValue(found.contactname);
        this.form.get('contactlastname').setValue(found.contactlastname);
        this.form.get('contactTelNo').setValue(found.contactTelNo);
        this.form.get('name').setValue(found.name);
        this.form.get('email').setValue(found.email);
      }, err => {this.error = err})
    this.clService.getWykosField();
    this.wykoListSub = this.clService.getWykosFieldUpdateListener()
    .subscribe((list: wykoNames[]) => {this.wykos = list}, err => {this.error = err });
  }

  save(){
    this.clService.updateClient(
      this.route.snapshot.paramMap.get('clientId'),
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
      this.form.value.name
    )
    this.router.navigateByUrl("/clients")//.navigate(["/clients"]);
  }

  ngOnDestroy(): void {}
}
