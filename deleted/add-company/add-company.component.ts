import { Component, OnInit } from '@angular/core';
//mport { FormGroup, FormControl, Validators } from '@angular/forms';
//import { Company } from '../../company';
import { CompanyService } from '../../services/company.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  //company: Company;
  error: any = null;
  constructor(private cs: CompanyService) { }
  public selectedToggle: string;

  ngOnInit(): void {
    this.error = null
    this.cs.err.subscribe(err => {
      this.error = err
    })
  }

  public onValChange(val: string){
    this.selectedToggle = val;
  }

  /*createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required]} ),
      address: new FormControl(null, { validators: [Validators.required] }),
      postalcode: new FormControl(null, { validators: [Validators.required]} ),
      city: new FormControl(null, { validators: [Validators.required]} ),
      nip: new FormControl(null, { validators: [Validators.required, Validators.pattern('^[0-9]*$')]} ),
      category: new FormControl(null, { validators: [Validators.required]} )
    });
  }*/

  /*onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.cs.addCompany(
        this.form.value.name,
        this.form.value.address,
        this.form.value.postalcode,
        this.form.value.city,
        this.form.value.nip,
        this.form.value.category
      );
      this.form.reset();
    }*/

    onSubmit(form: NgForm) {
      if (!form.valid) {
        return;
      }
      const name: string = form.value.name;
      const address: string = form.value.address;
      const postalcode: string = form.value.postalcode;
      const city: string = form.value.city;
      const nip:string = form.value.nip;
      const category: string = this.selectedToggle;

      this.cs.addCompany(name, address, postalcode, city, nip, category)
        form.reset();
      }

}
