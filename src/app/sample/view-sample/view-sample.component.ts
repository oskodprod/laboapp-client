import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Sample2 } from 'src/app/sample2';
import { Labrat } from '../../labrat';
import { Subscription } from 'rxjs';
import { SampleService } from 'src/app/services/sample.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-view-sample',
  templateUrl: './view-sample.component.html',
  styleUrls: ['./view-sample.component.css']
})
export class ViewSampleComponent implements OnInit, OnDestroy {

  public thisid: string;
  public checkedForm: boolean;
  public checkedSide: boolean;
  public checkedUpDown: boolean;
  public checkedFlat: boolean;
  public checkedPerp: boolean;

  loggedLabrat: Labrat;
  private loggedLabratSub: Subscription;

  public testedSample: Sample2;
  private sxSub: Subscription;
  public formText: string;
  //public laboTempValue: Number;
  destTypes = [
    { value: "Prawidłowy, typ 1" },
    { value: "Prawidłowy, typ 2" },
    { value: "Prawidłowy, typ 3(eksplozyjne)" },
    { value: "Nieprawidłowy, typ 1" },
    { value: "Nieprawidłowy, typ 2" },
    { value: "Nieprawidłowy, typ 3" },
    { value: "Nieprawidłowy, typ 4" },
    { value: "Nieprawidłowy, typ 5" },
    { value: "Nieprawidłowy, typ 6" },
    { value: "Nieprawidłowy, typ 7" },
    { value: "Nieprawidłowy, typ 8" },
    { value: "Nieprawidłowy, typ 9" }
  ]
  public testedBy: string;

  error: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sxs: SampleService,
    private auth: AuthService 
  ) { }

  ngOnInit(): void {
    this.thisid = this.route.snapshot.paramMap.get('sampleId');
    this.auth.UserDetails();
    this.loggedLabratSub = this.auth.getLoggedLabratUpdateListener()
    .subscribe(res => {
      this.loggedLabrat = res;
      this.error = this.auth.message;
    }, err => { this.error = err; })

    this.sxs.getSample(this.thisid)
    this.sxSub = this.sxs.getSampleUpdatedListener()
    .subscribe(foundSample => {
      this.testedSample = foundSample;
      switch(this.testedSample.formSize) {
        case 'S100': { 
          this.formText = 'Forma sześcienna, 100mm'; 
          if(this.testedSample.wymA||this.testedSample.wymB||this.testedSample.wymC) {
            this.inputs.get('wymA').setValue(this.testedSample.wymA);
            this.inputs.get('wymB').setValue(this.testedSample.wymB);
            this.inputs.get('wymC').setValue(this.testedSample.wymC);
          }
          else{
            this.inputs.get('wymA').setValue(100.0);
            this.inputs.get('wymB').setValue(100.0);
            this.inputs.get('wymC').setValue(100.0);
          }
          break; 
        }
        case 'S150': { 
          this.formText = 'Forma sześcienna, 150mm'; 
          if(this.testedSample.wymA||this.testedSample.wymB||this.testedSample.wymC) {
            this.inputs.get('wymA').setValue(this.testedSample.wymA);
            this.inputs.get('wymB').setValue(this.testedSample.wymB);
            this.inputs.get('wymC').setValue(this.testedSample.wymC);
          }
          else{
            this.inputs.get('wymA').setValue(150.0);
            this.inputs.get('wymB').setValue(150.0);
            this.inputs.get('wymC').setValue(150.0);
          }
          break; 
        }
        default: { this.formText = 'Forma nieokreślona'; break }
      }
      if(this.testedSample.laboTemp){
        this.inputs.get('laboTemp').setValue(this.testedSample.laboTemp);
      } else this.inputs.get('laboTemp').setValue(20.0);
      this.inputs.get('comm1').setValue(this.testedSample.comm1);

      this.inputs.get('precForm').setValue(this.testedSample.precForm);
      this.inputs.get('precSide').setValue(this.testedSample.precSide);
      this.inputs.get('precUpDown').setValue(this.testedSample.precUpDown);
      this.inputs.get('precFlat').setValue(this.testedSample.precFlat);
      this.inputs.get('precPerpSide').setValue(this.testedSample.precPerpSide);
      this.checkedForm = this.testedSample.precForm;
      this.checkedSide = this.testedSample.precSide;
      this.checkedUpDown = this.testedSample.precUpDown;
      this.checkedFlat = this.testedSample.precFlat;
      this.checkedPerp = this.testedSample.precPerpSide;
      if (this.checkedForm)
      {
        this.inputs.get('precFlat').reset();
        this.inputs.get('precPerpSide').reset();
        this.checkedFlat = false;
        this.checkedPerp = false;
      }

      this.inputs.get('precComm').setValue(this.testedSample.precComm);
      this.inputs.get('mass').setValue(this.testedSample.mass);
      this.inputs.get('wymComm').setValue(this.testedSample.wymComm);
      this.inputs.get('destSpeed').setValue(this.testedSample.destSpeed);
      this.inputs.get('destForce').setValue(this.testedSample.destForce);
      this.inputs.get('destComm').setValue(this.testedSample.destComm);
      if(this.testedSample.testedBy) this.testedBy = this.testedSample.testedBy;
      else this.testedBy = this.loggedLabrat.pName+' '+this.loggedLabrat.lastname;
      this.inputs.get('chkDate').setValue(this.testedSample.chkDate);
      this.inputs.get('destType').setValue(null);
    }, err => {this.error = err})
  }

  inputs = new FormGroup({
    
    laboTemp: new FormControl(),
    comm1: new FormControl(),

    precForm: new FormControl(),
    precSide: new FormControl(),
    precUpDown: new FormControl(),
    precFlat: new FormControl(),
    precPerpSide: new FormControl(),
    precComm: new FormControl(),

    mass: new FormControl(),
    wymA: new FormControl(),
    wymB: new FormControl(),
    wymC: new FormControl(),
    wymComm: new FormControl(),

    destSpeed: new FormControl(),
    destForce: new FormControl(),
    destComm: new FormControl(),
    destType: new FormControl(this.destTypes[12]),
    chkDate: new FormControl()
  })

  onCheck()
  {
    if (this.checkedForm)
    {
      this.checkedFlat = false;
        this.checkedPerp = false;
      this.inputs.get('precFlat').reset();
      this.inputs.get('precPerpSide').reset();
    }
  }

  save()
  {
    var DTsave;
    if(this.inputs.value.destType == null) DTsave = this.testedSample.destType;
    else DTsave = this.inputs.value.destType.value; 
    this.sxs.updateTested(
      this.route.snapshot.paramMap.get('sampleId'),
      this.inputs.value.laboTemp,
      this.inputs.value.comm1,
      this.inputs.value.precForm,
      this.inputs.value.precSide,
      this.inputs.value.precUpDown,
      this.inputs.value.precFlat,
      this.inputs.value.precPerpSide,
      this.inputs.value.precComm,
      this.inputs.value.mass,
      this.inputs.value.wymA,
      this.inputs.value.wymB,
      this.inputs.value.wymC,
      this.inputs.value.wymComm,
      this.inputs.value.destSpeed,
      this.inputs.value.destForce,
      this.inputs.value.destComm,
      this.inputs.value.chkDate,
      this.testedSample.agTime,
      DTsave
    );
    this.sxs.getSample(this.thisid)
    this.router.navigateByUrl("/sample/"+this.thisid);
    this.inputs.markAsPristine();
  }

  ngOnDestroy(){}

}
