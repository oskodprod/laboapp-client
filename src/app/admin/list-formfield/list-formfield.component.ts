import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormfieldService } from '../../services/formfield.service';
import { NgForm } from '@angular/forms';
import { Formfield } from '../../formfield';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

interface Category {
  category: string;
}

@AutoUnsubscribe()
@Component({
  selector: 'app-list-formfield',
  templateUrl: './list-formfield.component.html',
  styleUrls: ['./list-formfield.component.css']
})


export class ListFormfieldComponent implements OnInit, OnDestroy {

  fieldList: Formfield[] = [];
  fieldListColumns: string[] = ['category', 'value', 'delete'];
  fieldListShow: Formfield[];
  private listSub: Subscription;

  categories: Category[] = [
    { category: 'Konsystencja'},
    { category: 'Klasa ekspozycji'},
    { category: 'Miejsce betonowania'},
    { category: 'Metoda zagęszczenia'},
    { category: 'Mrozoodporność'},
    { category: 'Wodoszczelność'},
    { category: 'Nasiąkliwość'},
    //{ category: 'Wymiary formy'},
    { category: 'Zniszczenie'},
    { category: 'Ściskanie'},
    //{ category: 'Konsystencja'},
    { category: 'Wykonawca próbek'},
    { category: 'Konsystencja'},
    { category: 'Okres badań'}
  ]
  private selectedCategory: string;
  //private msgSub: Subscription;

  //diaMessage: string;
  //diaCategory: string;
  //diaValue: string

  error: any = null;
  addField: boolean = false;
  constructor( private fService: FormfieldService, private changeRef: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.error = null
    this.fService.err.subscribe(err => {
      this.error = err
    })

    this.fService.getList()
    this.listSub = this.fService.getListUpdateListener()
    .subscribe((list: Formfield[]) => {
      this.fieldList = list;
    },
    err => { this.error = err });

    //this.fieldListShow = this.fieldList;
  }

  ChangeaddField(){
    this.addField = !this.addField;
  }

  deleteElement(id: string) {
    this.fService.deleteElement(id);
    this.listSub = this.fService.getListUpdateListener()
    .subscribe((list: Formfield[]) => {
      this.fieldList = list;
    },
    err => { this.error = err });
    
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const category: string = this.selectedCategory;
    const value: string = form.value.value;

    this.fService.addFormfield(category, value);
    this.addField = false;  
    form.reset();
    this.fService.getList()
    this.listSub = this.fService.getListUpdateListener()
    .subscribe((list: Formfield[]) => {
      this.fieldList = list;
    },
    err => { this.error = err });
    }

    ngOnDestroy(){}
}
