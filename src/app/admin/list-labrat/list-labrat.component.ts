import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabratService } from '../../services/labrat.service';
import { Labrat } from '../../labrat';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-list-labrat',
  templateUrl: './list-labrat.component.html',
  styleUrls: ['./list-labrat.component.css']
})
export class ListLabratComponent implements OnInit, OnDestroy {

  labratList: Labrat[] = [];
  labratListColumns: string[] = ['name', 'short', 'isAdmin', 'user', 'labo', 'edit', 'delete'];
  labratListShow: Labrat[];
  private listSub: Subscription;
  
  error: any = null
  constructor(private ls: LabratService) { }

  ngOnInit(): void {
    this.error = null;
    this.ls.err.subscribe(err => { this.error = err })

    this.ls.getList();
    this.listSub = this.ls.getListUpdateListener()
    .subscribe((list: Labrat[]) => { this.labratList = list }, err => { this.error = err });
  }

  deleteLabrat(id: string){
    this.ls.deleteLabrat(id);
    this.listSub = this.ls.getListUpdateListener()
    .subscribe((list: Labrat[]) => {
      this.labratList = list;
    },
    err => { this.error = err });
  }

  ngOnDestroy(): void{}
}
