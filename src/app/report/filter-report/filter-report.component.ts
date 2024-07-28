import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { reportsList, ReportService } from 'src/app/services/report.service';
import { Report } from '../../report2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate } from '@angular/common';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@AutoUnsubscribe()
@Component({
  selector: 'app-filter-report',
  templateUrl: './filter-report.component.html',
  styleUrls: ['./filter-report.component.css']
})
export class FilterReportComponent implements OnInit, OnDestroy {
  reportsList: reportsList[] = [];
  reportsListColumns: string[] = [
    "docDate",
    "rid",
    "createdBy",
    "samplesTaken",
    "fckEnd",
    "avgEnd",
    "generated",
    "print",
    "delete"
  ]
  reportsListShow: reportsList[];
  private listSub: Subscription;
  private navSub: Subscription;
  //private openSubs: Subscription[];
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

  searchReports(start: Date, end: Date)
  {
    this.rps.getReportsList(start, end);
    this.listSub = this.rps.getReportsFilterUpdatedListener()
    .subscribe((list: reportsList[]) => {
      this.reportsList = list;
      this.errorflag = this.rps.getSamplingsListFlag();
    }, err => { this.error = err })
  }

  printReport(id: string){
    var reportSub: Subscription;
    this.rps.getGeneratedReport(id)
    .then(() => 
      reportSub = this.rps.getFoundReportUpdateListener()
      .subscribe(() => {
        var printed = this.rps.report;
        const ReportPDF = this.getReportPDF(printed);
        pdfMake.createPdf(ReportPDF).open();
        reportSub.unsubscribe();
      })
    )
  }

  getReportPDF(printed: Report)
  {
    var docDate = new Date(printed.docDate);
    var sxMak: string;
    var cert: string = '';
    var classes: string = '';
    var sxs: string = '';
    var scTrue: boolean = false;
    var scFalse: boolean = false;
    var s100check: boolean = false;
    var s150check: boolean = false;
    var comments: string = '';
    var Crit1: string = '';
    var Crit2: string = '';
    var batchesTaken: string[] = [];

    var SamplesHeader = [];
    var SamplesHeaderUnits = [];
    
    var SamplesRows = [];
    var rowsCount = 1;
    var fckplus = 1;
    var resultsign1: string = '';
    var resultsign2: string = '';
    var client: string='';
    var samplingaddress: string='';
    var docDatestring = docDate.getDate()+"-"+(docDate.getMonth()+1)+"-"+docDate.getFullYear();


    
    //var infoStart = [];
    //var firstTable = [];
    switch (printed.sampling.sxMak)
    {
      case 'Laboratorium': {
        sxMak = printed.sampling.labrat.labo.name+', '+printed.sampling.labrat.labo.address+', '+printed.sampling.labrat.labo.postalcode+' '+printed.sampling.labrat.labo.city;
        break;
      }
      case 'Zleceniodawca': {
        sxMak = printed.sampling.client.company.name+', '+printed.sampling.client.company.address+', '+printed.sampling.client.company.postalcode+' '+printed.sampling.client.company.city;
        break;
      }
      case 'Podwykonawca': {
        sxMak = 'Podwykonawca';
        break;
      }
      default: {
        sxMak = '';
        break;
      }
    }
    if (printed.sampling.rec.cert) { cert = 'Tak'; }
    else { cert = 'Nie' };

    classes = printed.sampling.rec.con;
    if (printed.sampling.rec.clW) classes += ', '+printed.sampling.rec.clW;
    if (printed.sampling.rec.clF) classes += ', '+printed.sampling.rec.clF;
    if (printed.sampling.rec.clN) classes += ', '+printed.sampling.rec.clN;

    printed.samples.forEach(element => {
      if(element.sCategory) scTrue=true;
      else scFalse=true;
      if(element.formSize=="S100") s100check = true;
      if(element.formSize=="S150") s150check = true;
    })

    if(printed.sampling.rec.comments) comments = ', '+printed.sampling.rec.comments

    if(s100check) sxs='Sześcienna, 100x100x100mm';
    if(s150check) sxs='Sześcienna, 150x150c150mm';
    if(s100check && s150check) sxs='Sześcienna, 100x100x100mm, 150x150x150mm'

    if(scTrue) sxs+=', Punktowa';
    if(scFalse) sxs+=', Złożona';
    if(scTrue && scFalse) sxs+=', Punktowa, Złożona';

    client = 'Zleceniodawca: '+printed.sampling.client.company.name+', '+printed.sampling.client.company.address+', '+printed.sampling.client.company.postalcode+' '+printed.sampling.client.company.city;
    samplingaddress = 'Miejsce pobrania: '+printed.sampling.client.clName+', '+printed.sampling.client.clAddress+', '+printed.sampling.client.clCity;

    SamplesHeader = [
      {text: ' ', style: 'tableHeader'},
      {text: 'Data pobrania', style: 'tableHeader'}, 
      {text: 'Data badania', style: 'tableHeader'}, 
      {text: 'Wiek próbki', style: 'tableHeader'},
      {text: 'Nr dostawy*', style: 'tableHeader'},
      {text: 'Ozn. próbki', style: 'tableHeader'},
      {text: 'X', style: 'tableHeader'},
      {text: 'Y', style: 'tableHeader'},
      {text: 'Z', style: 'tableHeader'},
      {text: 'Pow. ścisk.(X*Y)', style: 'tableHeader'},
      {text: 'Masa próbki', style: 'tableHeader'},
      {text: 'Rodz. zniszczenia', style: 'tableHeader'},
      {text: 'Siła niszcząca', style: 'tableHeader'},
      {text: 'Wytrzymałość fci', style: 'tableHeader'}  
    ]
    SamplesHeaderUnits = [
      {text: 'l.p.', style: 'introHeader'},
      {text: 'dd/mm/rrrr', style: 'introHeader'}, 
      {text: 'dd/mm/rrrr', style: 'introHeader'}, 
      {text: 'dni', style: 'introHeader'},
      {text: 'nr', style: 'introHeader'},
      {text: 'nr', style: 'introHeader'},
      {text: '[mm]', style: 'introHeader'},
      {text: '[mm]', style: 'introHeader'},
      {text: '[mm]', style: 'introHeader'},
      {text: '[mm]', style: 'introHeader'},
      {text: '[kg]', style: 'introHeader'},
      {text: 'typ', style: 'introHeader'},
      {text: '[kN]', style: 'introHeader'},
      {text: 'MPa', style: 'introHeader'}
    ]
    SamplesRows.push(SamplesHeader);
    SamplesRows.push(SamplesHeaderUnits);

    printed.samples.forEach(element => {
      //var rowsCount: number = 1;
      var sxRow = [];
      var sxDat: Date = new Date(element.date);
      var sxChkDat: Date = new Date(element.chkDate);

      var sxDate: string = formatDate(sxDat,'dd/MM/yyyy','pl-PL');
      var sxChkDate: string = formatDate(sxChkDat,'dd/MM/yyyy','pl-PL');
      var area: string = (element.wymA*element.wymB).toString();
      if(!batchesTaken.includes(element.WZ)) batchesTaken.push(element.WZ);
      sxRow.push({ text: rowsCount.toString(), style: 'tableRow' }); 
      rowsCount++;
      sxRow.push({ text: sxDate, style: 'tableRow'});
      sxRow.push({ text: sxChkDate, style: 'tableRow'});
      sxRow.push({ text: element.agTime.toString(), style: 'tableRow' });
      sxRow.push({ text: element.WZ, style: 'tableRow' });
      sxRow.push({ text: element.sxid.slice(5), style: 'tableRow' });
      sxRow.push({ text: element.wymA.toString(), style: 'tableRow' });
      sxRow.push({ text: element.wymB.toString(), style: 'tableRow' });
      sxRow.push({ text: element.wymC.toString(), style: 'tableRow' });
      sxRow.push({ text: area, style: 'tableRow' });
      sxRow.push({ text: element.mass.toString(), style: 'tableRow' });
      sxRow.push({ text: element.destType, style: 'tableRow' });
      sxRow.push({ text: element.destForce.toString(), style: 'tableRow' });
      sxRow.push({ text: element.destResult.toString(), style: 'tableRow' });
      SamplesRows.push(sxRow);
    }); rowsCount = 1;
    if(batchesTaken.length==1) Crit1 = 'NIE OBOWIĄZUJE'
    if(batchesTaken.length>1&&batchesTaken.length<5){
      if (printed.avgEnd>(printed.fckEnd+1))
      {
        resultsign1 = '\u2265';
        Crit1 = 'Spełnione';
      }
      else
      {
        resultsign1 = '\u2264';
        Crit1 = 'Niespełnione'
      }
    }
    if(batchesTaken.length>4){
      fckplus = 2;
      if (printed.avgEnd>(printed.fckEnd+2))
      {
        resultsign1 = '\u2265';
        Crit1 = 'Spełnione';
      }
      else
      {
        resultsign1 = '\u2264';
        Crit1 = 'Niespełnione'
      }
    }
    if(printed.minEnd>(printed.fckEnd-4))
    {
      resultsign2 = '\u2265';
      Crit2 = 'Spełnione';
    }
    else
    {
      resultsign2 = '\u2264';
      Crit1 = 'Niespełnione'
    }


    return {
      pageMargins: [20,15,20,15],
      content:
      [
        {
          table: {
            widths: ['auto','*'],
            body: [
              [
                {text: printed.sampling.labrat.labo.name+'\n'+printed.sampling.labrat.labo.address+'\n'+printed.sampling.labrat.labo.postalcode+' '+printed.sampling.labrat.labo.city, style: 'header1'}, 
                {text: "Sprawozdanie z badań wytrzymałości na ściskanie\nnr "+printed.rid.slice(6)+' wydanie '+printed.rid.slice(4,5)+'\n'+'wystawiono dnia: '+docDatestring, style: 'header1'}
              ]
            ]
          }
        },
        {
          table: {
            widths: ['*'],
            body: [
              [{text: client, style: 'tableHeader',}],
              [{text: samplingaddress, style:'tableHeader'}],
              [{text: 'Data pobrania próbki: '+docDatestring, style:'tableHeader'}],
              [{text: 'Próbkę pobrał: '+sxMak, style: 'tableHeader'}],
              [{text: 'Producent mieszanki betonowej: '+printed.sampling.rec.maker.name+'\n'+'Certyfikowana zakładowa kontrola produkcji: '+cert+'*', style: 'tableHeader'}],
              [{text: 'Deklarowane parametry mieszanki betonowej*: '+classes, style: 'tableHeader'}],
              [{text: 'Rodzaj próbek: '+sxs, style: 'tableHeader'}],
              [{text: 'Deklarowane parametry betonu: '+'\nKod betonu: '+printed.sampling.rec.recName+'\nKlasa wytrzymałości: '+printed.sampling.rec.clS, style: 'tableHeader'}],
              [{text: 'Dodatkowe oznaczenia: '+printed.sampling.rec.clX.toString()+comments, style: 'tableHeader'}],
              [{text: 'Element betonowany*: '+printed.sampling.loc.toString(), style: 'tableHeader'}],
              [{text: 'Opis*: '+printed.sampling.locDesc, style: 'tableHeader'}]
            ]
          }
        },
        { text: "Wyniki badań próbek betonu", style: "subheader" },
        { text: "Typy zniszczenia wg PN-EN 12390-3:2019-07", style: "lowerSubheader" },
        {
          table: {
            headerRows: 1,
            //keepWithHeaderRows: 1,
            body: SamplesRows
          }
        },
        { text: "Werdykt wydany wg zasady prostej akceptacji", style: "subheader" },
        { text: "Ocena identyczności zgodnie z zał. B do PN-EN 206+A1:2016-12; Beton - Wymagania, właściwości, produkcja i zgodność", style: "lowerSubheader" },
        {
          table: {
            widths: ['*','*','*'],
            body: [
              [
                { text: 'Wytrzymałość charakterystyczna (fck): ', style: 'tableRow', colSpan: 2}, {},
                { text: printed.fckEnd.toString()+' MPa', style: 'tableHeader', width:'*' }
              ],
              [
                { text: 'Wytrzymałość średnia (fcm): ', style: 'tableRow', colSpan: 2}, {},
                { text: printed.avgEnd.toString()+' MPa', style: 'tableHeader' }
              ],
              [
                { text: 'Wytrzymałość dowolna (fci): ', style: 'tableRow', colSpan: 2}, {},
                { text: printed.minEnd.toString()+' MPa', style: 'tableHeader' }
              ],
              [
                { text: 'Kryterium 1 (fcm \u2265 fck + '+fckplus+'): ', style: 'tableRow'},
                { text: printed.avgEnd.toString()+' '+resultsign1+' '+(printed.fckEnd+fckplus).toString(), style: 'tableHeader' },
                { text: Crit1, style: 'tableHeader' }
              ],
              [
                { text: 'Kryterium 2 (fci \u2265 fck - 4): ', style: 'tableRow'},
                { text: printed.minEnd.toString()+' '+resultsign2+' '+(printed.fckEnd-4).toString(), style: 'tableHeader' },
                { text: Crit2, style: 'tableHeader' }
              ]
            ]
          }
        },
        { text: 'Niepewność pomiaru', style: 'subheader' },
        { text: 'Niepewność pomiaru została określona zgodnie z dokumentem EA-04/16. Podana wartość niepewności stanowi niepewność rozszerzoną przy poziomie ufności 95% i współczynniku rozszerzenia k = 2.', style: 'lowerSubheader' },
        {
          table: {
            widths:['*','*'],
            body: [
              [
                { text: 'Odchylenie standardowe [s]: ', style: 'tableRow' },
                { text: printed.odchStd.toString(), style: 'tableHeader' }
              ],
              [
                { text: 'Niepewność rozszerzona [U(x)]: ', style: 'tableRow' },
                { text: printed.niepewnosc.toString(), style: 'tableHeader'}
              ],
              [
                { text: 'Przedział ufności', style: 'tableRow' },
                { text: '('+(printed.avgEnd-printed.niepewnosc).toString()+'; '+(printed.avgEnd+printed.niepewnosc).toString()+')', style: 'tableHeader' }
              ]
            ]
          }
        },
        { text: 'Badanie wytrzymałości betonu na ściskanie przeprowadzono zgodnie z PN-EN 12390-3:2019-07', style: 'header1' },
        {
          table: {
            widths: ['*','*','*'],
            heights: ['auto', 50],
            body: [
              [
                { text: 'Laboratorium', style: 'tableRow' },
                { text: 'Sporządził(a)', style: 'tableRow' },
                { text: 'Autoryzował(a)', style: 'tableRow' },
              ],
              [
                {},
                {},
                {}
              ]
            ]
          }
        },
        { text: "Uwagi końcowe:", style: 'lowerSubheader'},
        { text: 'KLAUZULA: 1. Wyniki dotyczą tylko badanych próbek. 2. Laboratorium nie ponosi odpowiedzialności za próbki dostarczone do laboratorium przez zleceniodawcę. 3. Niniejsze sprawozdanie nie może być powielane inaczej niż w całości, bez pisemnej zgody podmiotu sporządzającego.', style: 'fineprint'},
        { text: '* Informacje otrzymane od klienta. Laboratorium nie ponosi odpowiedzialności za otrzymane Informacje.', style: 'fineprint' }
      ],
      styles:
      {
        header1: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 10],
          alignment: "center"
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 15, 0, 5]
        },
        lowerSubheader: {
          margin: [0, 0, 0, 10],
          fontSize: 9
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
        introHeader: {
          fontSize: 7,
          bold: true,
          alignment: "center"
        },
        tableRow: {
          fontSize: 7,
          alignment: "center"
        },
        fineprint: {
          fontSize: 6
        },
        ftheader: {
          fontSize: 12,
          bold: true,
          alignment: "center"
        },
      }
    }
  }

  deleteReport(id: string){
    this.rps.deleteReport(id);
    this.searchReports(this.range.value.get('start'), this.range.value.get('end'));
  }

  ngOnDestroy(){}
}
