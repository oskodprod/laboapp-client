import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
//import { Sample2 } from 'src/app/sample2';
import { sampleList, SampleService } from 'src/app/services/sample.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate } from '@angular/common';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@AutoUnsubscribe()
@Component({
  selector: 'app-test-sample',
  templateUrl: './test-sample.component.html',
  styleUrls: ['./test-sample.component.css']
})
export class TestSampleComponent implements OnInit, OnDestroy {

  sampleList: sampleList[] = [];
  sampleListColumns: string[] = [
    "date", 
    "chkDate", 
    "agTime", 
    "client", 
    "WZ", 
    "clS", 
    "formSize", 
    "recName", 
    "destResult", 
    "sxid", 
    "test" 
  ]
  sampleListShow: sampleList[];
  private listSub: Subscription;
  navSub: Subscription;
  pickedSearchMode: string;
  SearchModes: string[] = ["date", "chk"];
  errorflag: number = null;

  error: any = null;
  constructor(
    private sxs: SampleService,
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

  searchSamples(start: Date, end: Date, flag: string){
    this.sxs.getTestList(start, end, flag)
    this.listSub = this.sxs.getTestsUpdatedListener()
    .subscribe((list: sampleList[]) => { 
      this.sampleList = list;
      this.errorflag = this.sxs.getTestSampleListFlag();
    }, err => { this.error = err })
    
  }

  printTestList(startDate: Date, endDate: Date, samplelist: sampleList[]){
    const ListPDF = this.getListPDF(startDate, endDate, samplelist);
    pdfMake.createPdf(ListPDF).open();
  }

  getListPDF(start: Date, end: Date, sxs: sampleList[]){

    var sxStart = new Date(start);
    var sxEnd = new Date(end);
    var sxSTR: string = formatDate(sxStart, 'dd/MM/yyyy', 'pl-PL');
    var sxEND: string = formatDate(sxEnd, 'dd/MM/yyyy', 'pl-PL');
    var ListBody = [];
    var ListHeader = [];
    ListHeader = [
      { text: 'Data pobrania', style: 'tableHeader'},
      { text: 'Data badania', style: 'tableHeader'},
      { text: 'Wiek próbki', style: 'tableHeader'},
      { text: 'Budowa', style: 'tableHeader'},
      { text: 'Dowód dostawy', style: 'tableHeader'},
      { text: 'Klasa betonu', style: 'tableHeader'},
      { text: 'Nr próbki', style: 'tableHeader'},
      { text: 'Waga', style: 'tableHeader'},
      { text: 'Wynik', style: 'tableHeader'},
    ]
    ListBody.push(ListHeader);
    sxs.forEach(sample => {
      var sxRow = [];
      var sxDate: Date = new Date(sample.date);
      var sxChkDate: Date = new Date(sample.chkDate);

      var sxDateSTR: string = formatDate(sxDate,'dd/MM/yyyy','pl-PL');
      var sxChkSTR: string = formatDate(sxChkDate,'dd/MM/yyyy','pl-PL');

      sxRow.push({ text: sxDateSTR, style: 'tableRow' });
      sxRow.push({ text: sxChkSTR, style: 'tableRow' });
      sxRow.push({ text: sample.agTime, style: 'tableRow' });
      sxRow.push({ text: sample.client, style: 'tableRow' });
      sxRow.push({ text: sample.WZ, style: 'tableRow' });
      sxRow.push({ text: sample.clS, style: 'tableRow' });
      sxRow.push({ text: sample.sxid.slice(5), style: 'tableRow' });
      sxRow.push({});
      sxRow.push({});
      ListBody.push(sxRow);
    })
    
    return {
      pageMargins: [20,15,20,15],
      content:
      [
        { text: 'Badania wytrzymałości próbek na ściskanie\n'+sxSTR+' - '+sxEND, style: 'header1' },
        {
          table: {
            widths: [45,45,25,'*','*',29,30,40,40],
            body: ListBody
          }
        }
      ],
      styles:
      {
        header1: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 10],
          alignment: "center"
        },
        tableHeader: {
          fontSize: 8,
          bold: true
        },
        tableRow: {
          fontSize: 8,
        }
      }
    }
  }

  ngOnDestroy(){}
}
