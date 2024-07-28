import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SamplingService } from '../../services/sampling.service';
import { Sampling } from '../../sampling';
import { Sampling2 } from '../../sampling2';
import { Router, NavigationEnd } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as moment from "moment";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { DialogConfdeleteSamplingComponent } from './dialog-confdelete-sampling/dialog-confdelete-sampling.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-filter-sampling',
  templateUrl: './filter-sampling.component.html',
  styleUrls: ['./filter-sampling.component.css']
})
export class FilterSamplingComponent implements OnInit, OnDestroy {

  samplingList: Sampling[] = [];
  samplingListColumns: string[] = ['sid', 'date', 'client', 'labrat', 'rec', 'edit', 'print', 'delete']
  samplingListShow: Sampling[];
  private listSub: Subscription;
  navSub: Subscription;

  error: any = null
  constructor(
    private s: SamplingService, 
    private router: Router,
    public ConfDeleteSampling: MatDialog
    ) 
  { 
    this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    this.error = null;
    this.s.err.subscribe(err => { this.error = err })

    this.s.getList();
    this.listSub = this.s.getListUpdateListener()
    .subscribe((list: Sampling[]) => { this.samplingList = list }, err => { this.error = err });
  }

  printSampling(id: string)
  {
    var samplingSub: Subscription;
    this.s.getSampling(id)
    .then(() => 
      samplingSub = this.s.getSamplingUpdateListener()
      .subscribe(() => {
        
        var printed = this.s.sampling

        const SamplingPDF = this.getSamplingPDF(printed)
        pdfMake.createPdf(SamplingPDF).open();
        samplingSub.unsubscribe();
      })
    )
  }

  openDeleteSamplingDialog(id: string, sid: string)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      sid: sid
    }

    const dialogRef = this.ConfDeleteSampling.open(DialogConfdeleteSamplingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data == 'Refresh') this.s.getList();
    }, err => this.error += err);
  }

  ngOnDestroy(): void{}

  getSamplingPDF(printed: Sampling2)
  {
    var docDate = new Date(printed.docDate);
    var docDatestring = docDate.getDate()+"-"+(docDate.getMonth()+1)+"-"+docDate.getFullYear();
    var PDFrows = [];
    var rowsCount = 1;
    var PDFHeader = [];
    PDFHeader = [
      {text: 'l.p.', style: 'tableHeader'}, 
      {text: 'Nr dostawy', style: 'tableHeader'}, 
      {text: 'Oznaczenie próbek', style: 'tableHeader'},
      {text: 'Okres badania', style: 'tableHeader'},
      {text: 'Rodzaj próbki', style: 'tableHeader'},
      {text: 'Godz. załadunku', style: 'tableHeader'},
      {text: 'Godz. badania', style: 'tableHeader'},
      {text: 'Konsystencja', style: 'tableHeader'},
      {text: 'Temp. mieszanki', style: 'tableHeader'},
      {text: 'Temp. powietrza', style: 'tableHeader'},
      {text: 'Zaw powietrza', style: 'tableHeader'},
      {text: 'Rodzaj foremki', style: 'tableHeader'},
      {text: 'Termometr', style: 'tableHeader'},
      {text: 'Nr foremki', style: 'tableHeader'},
    ];
    PDFrows.push(PDFHeader);
    printed.samples.forEach(element => {
      var sxRow = [];
        sxRow.push({ text: rowsCount.toString(), style: 'tableRow' }); rowsCount++;
        sxRow.push({ text: element.WZ, style: 'tableRow' });
        sxRow.push({ text: element.sxid.slice(5), style: 'tableRow' });
        
        if(element.agTime) sxRow.push({ text: element.agTime.toString(), style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });
        
        if(element.sCategory) sxRow.push({ text: 'P', style: 'tableRow' })
        else sxRow.push({ text: 'Z', style: 'tableRow' });
        
        if(element.tLoad) sxRow.push({ text: element.tLoad, style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });

        if(element.tCheck) sxRow.push({ text: element.tCheck, style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });

        sxRow.push({ text: element.testCon, style: 'tableRow' });
        
        if(element.mixTemp) sxRow.push({ text: element.mixTemp.toString(), style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });

        if(element.airTemp) sxRow.push({ text: element.airTemp.toString(), style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });

        if(element.airPRC) sxRow.push({ text: element.airPRC.toString(), style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });
        
        sxRow.push({ text: element.formSize, style: 'tableRow' });
        
        if(element.thermo) sxRow.push({ text: element.thermo, style: 'tableRow' });
        else sxRow.push({ text: '-', style: 'tableRow' });
        
        sxRow.push({ text: element.formNo, style: 'tableRow' });
      PDFrows.push(sxRow);

    }); rowsCount = 1;

    return {
        pageMargins: [20,30,20,160],
        content: 
        [
          { text: "PROTOKÓŁ POBRANIA MIESZANKI BETONOWEJ nr "+printed.sid, style: "header1" }, 
          {
            columns: [
              {
                width: '*',
                text: [ { text: "ID Zlecenia\n", style: "column" }, { text: printed.client.cid, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Zleceniodawca\n", style: "column" }, { text: printed.client.company.name, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Miejsce pobrania\n", style: "column" }, { text: printed.client.clAddress+", "+printed.client.clCity, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Data wystawienia\n", style: "column" }, { text: docDatestring, style: "column", bold: true }  ]
              }
            ]
          },
          { text: "DEKLAROWANE PARAMETRY MIESZANKI BETONOWEJ\n", style: "subheader" },
          {
            columns: [
              {
                width: '*',
                text: [ { text: "Producent\n", style: "column" }, { text: printed.rec.maker.name, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Kod receptury\n", style: "column" }, { text: printed.rec.recName, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Wytrz. na ściskanie\n", style: "column" }, { text: printed.rec.clS, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Konsystencja\n", style: "column" }, { text: printed.rec.con, style: "column", bold: true }  ]
              }
            ]
          },
          { text: "\n", style: "space1" },
          {
            columns: [
              {
                width: '*', 
                text: [ { text: "Wodoszczelność\n", style: "column" }, { text: printed.rec.clW, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Mrozoodporność\n", style: "column" }, { text: printed.rec.clF, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Nasiąkliwość\n", style: "column" }, { text: printed.rec.clN, style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Klasy ekspozycji\n", style: "column" }, { text: printed.rec.clX.toString(), style: "column", bold: true }  ]
              },
              {
                width: '*',
                text: [ { text: "Inne\n", style: "column" }, { text: printed.rec.comments, style: "column", bold: true }  ]
              }
            ]
          },
          { text: "INFORMACJE O POBRANIU PRÓBEK\n", style: "subheader" },
          {
            columns: [
              {
                width: '*', 
                text: [ { text: "Metoda zagęszczenia\n", fontSize: 9 }, { text: printed.mak, fontSize: 9, bold: true }  ]
              },
              {
                width: '*', 
                text: [ { text: "Rodzaj elementu\n", fontSize: 9 }, { text: printed.loc.toString(), fontSize: 9, bold: true }  ]
              }
            ]
          },
          { text: "\nOpis elementu\n", fontSize: 9 }, 
          { text: printed.locDesc, bold: true, fontSize: 9 },
          { text: "POBRANE PRÓBKI\n", style: "subheader" },
          {
            table: {
              headerRows: 1,
              //dontBreakRows: true,
              keepWithHeaderRows: 1,
              body: PDFrows
            }
          }
        ],
        footer: {
          stack: [
          { text: 'Protokół wystawił\n\n', style: 'ftheader' },
          { text: printed.labrat.pName+' '+printed.labrat.lastname, style: 'tableRow' },
          { canvas: [{ type: 'line', x1: 170, y1: 30, x2: 390, y2: 30, lineWidth: 1, alignment: "center" }] },
          { text: '\n\nWydruk protokołu pobrania aplikacji Laboratorium', fontSize: 7, alignment: "center" },
          ], 
          margin: [ 20,50 ]
        },
        styles: 
        {
            header1: {
              fontSize: 14,
              bold: true,
              margin: [0, 0, 0, 10],
              alignment: "center"
            },
            subheader: {
              fontSize: 12,
              bold: true,
              margin: [0, 10, 0, 10]
            },
            column: {
              fontSize: 9,
              margin: [0, 5, 0, 0],
              alignment: "center"
            },
            space1: {
              fontSize: 9,
              margin: [0, 10, 0, 0]
            },
            tableHeader: {
              fontSize: 7,
              bold: true
            },
            tableRow: {
              fontSize: 7,
              alignment: "center"
            },
            ftheader: {
              fontSize: 12,
              bold: true,
              alignment: "center"
            },
        }
    }
  }
}
