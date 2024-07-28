import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../company';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-filter-company',
  templateUrl: './filter-company.component.html',
  styleUrls: ['./filter-company.component.css']
})
export class FilterCompanyComponent implements OnInit, OnDestroy {

  companyList: Company[] = [];
  companyListColumns: string[] = ['name', 'address', 'category', 'edit', 'delete'];
  companyListShow: Company[];
  private listSub: Subscription;

  error: any = null;

  constructor( private comService: CompanyService ) { }

  ngOnInit(): void {
    this.error = null;
    this.comService.err.subscribe(err => { this.error = err })

    this.comService.getList();
    this.listSub = this.comService.getListUpdateListener()
    .subscribe((list: Company[]) => { this.companyList = list }, err => { this.error = err });
  }

  deleteCompany(id: string){
    this.comService.deleteCompany(id);
    this.listSub = this.comService.getListUpdateListener()
    .subscribe((list: Company[]) => {
      this.companyList = list;
    },
    err => { this.error = err });
  }

  ngOnDestroy(): void {}

}
