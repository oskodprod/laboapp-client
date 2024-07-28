//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { samplingsList, ReportService } from 'src/app/services/report.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit, OnDestroy {

  samplingsList: samplingsList[] = [];
  samplingsListColumns: string[] = [
    "docDate",
    "client",
    "sid",
    "rec",
    "samples",
    "report"
  ]
  samplingsListShow: samplingsList[];
  private listSub: Subscription;
  private navSub: Subscription;
  errorflag: number = null;
  error: any = null

  constructor(
    private rps: ReportService,
    private router: Router
  ) {
      this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
      })
    }

  ngOnInit(): void {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  searchSamplings(start: Date, end: Date)
  {
    this.rps.getSamplingsList(start, end);
    this.listSub = this.rps.getFilterUpdatedListener()
    .subscribe((list: samplingsList[]) => {
      this.samplingsList = list;
      this.errorflag = this.rps.getSamplingsListFlag();
    }, err => { this.error = err })
  }

  ngOnDestroy(){}
}
