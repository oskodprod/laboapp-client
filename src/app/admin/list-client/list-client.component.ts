import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../client';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit, OnDestroy {

  clientList: Client[] = [];
  clientListColumns: string[] = [ 'clName', 'cid', 'clAddress', 'company', 'contact', 'email', 'edit', 'delete'];
  clientListShow: Client[];
  private listSub: Subscription;

  error: any = null;

  constructor( private clService: ClientService ) { }

  ngOnInit(): void {
    this.error = null
    this.clService.err.subscribe(err => {
      this.error = err
    })

    this.clService.getList()
    this.listSub = this.clService.getListUpdateListener()
    .subscribe((list: Client[]) => {
      this.clientList = list;
    },
    err => { this.error = err });
  }

  deleteClient(id: string){
    this.clService.deleteClient(id);
    this.listSub = this.clService.getListUpdateListener()
    .subscribe((list: Client[]) => {
      this.clientList = list;
    },
    err => { this.error = err });
  }

  ngOnDestroy(){}

}
