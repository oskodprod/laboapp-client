import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../../company';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-company-form',
  templateUrl: './dialog-add-company-form.component.html',
  styleUrls: ['./dialog-add-company-form.component.css']
})
export class DialogAddCompanyFormComponent implements OnInit {

  form: FormGroup;
  description:string;
  title: string;
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogAddCompanyFormComponent>,
        private cs: CompanyService,
        @Inject(MAT_DIALOG_DATA) data) {

        //this.title = data.title;
        //this.description = data.description;
    }

    ngOnInit() {
        this.form = this.fb.group({
            
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            postalcode: ['', [Validators.required]],
            city: ['', [Validators.required]],
            nip: ['', [Validators.required]],
            category: ['', [Validators.required]]
        });
    }
  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.cs.addCompany(
      this.form.value.name,
      this.form.value.address,
      this.form.value.postalcode,
      this.form.value.city,
      this.form.value.nip,
      this.form.value.category );
    this.dialogRef.close();
  }
}
