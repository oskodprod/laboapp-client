import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
//import { Company } from '../../company';
import { CompanyService } from '../../services/company.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit, OnDestroy {

  //company: Company;
  form: FormGroup;
  private cSub: Subscription;
  error: any = null;
  constructor(
    private cService: CompanyService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.error = null;
    this.form = this.fb.group({   
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      postalcode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      nip: [null, [Validators.required]],
      category: [null, [Validators.required]]
  });
    this.cService.err.subscribe(err => { this.error = err })
    this.cService.getCompany(this.route.snapshot.paramMap.get('companyId'));
    this.cSub = this.cService.getCompanyUpdateListener()
    .subscribe(found => 
      { 
        this.form.get('name').setValue(found.name);
        this.form.get('address').setValue(found.address);
        this.form.get('postalcode').setValue(found.postalcode);
        this.form.get('city').setValue(found.city);
        this.form.get('nip').setValue(found.nip);
        this.form.get('category').setValue(found.category);
      }, err => {this.error = err})
  }

  save(){
    this.cService.updateCompany(
      this.route.snapshot.paramMap.get('companyId'),
      this.form.value.name,
      this.form.value.address,
      this.form.value.postalcode,
      this.form.value.city,
      this.form.value.nip,
      this.form.value.category
    )
    this.router.navigateByUrl("/filcomp")
  }
  
  ngOnDestroy(): void {}
}
