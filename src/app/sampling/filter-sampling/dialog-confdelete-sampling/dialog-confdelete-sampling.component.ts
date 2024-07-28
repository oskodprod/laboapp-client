import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SamplingService } from '../../../services/sampling.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dialog-confdelete-sampling',
  templateUrl: './dialog-confdelete-sampling.component.html',
  styleUrls: ['./dialog-confdelete-sampling.component.css']
})
export class DialogConfdeleteSamplingComponent implements OnInit {

  //public userid: string;
  public isAdmin: boolean;
  public iniShort: string;

  error: any = null;

  constructor(
    private dialogRef: MatDialogRef<DialogConfdeleteSamplingComponent>,
    private ss: SamplingService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, sid: string },
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    //this.userid = this.auth.getUserId();
    this.isAdmin = this.auth.getIsAdmin();
    this.iniShort = this.auth.getIniShort();
    this.ss.err.subscribe(this.error);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(id: string): void {
    this.ss.deleteSampling(this.data.id)
    this.dialogRef.close('Refresh')
  }

}
