import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import { MatRadioModule } from '@angular/material/radio';
//import { Company } from '../company';
//import { CompanyService } from '../services/company.service';
//import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DialogAddCompanyFormComponent } from './dialog-add-company-form/dialog-add-company-form.component';
import { DialogAddLabratFormComponent } from './dialog-add-labrat-form/dialog-add-labrat-form.component';
import { DialogAddClientFormComponent } from './dialog-add-client-form/dialog-add-client-form.component';
import { DialogAddRecipeFormComponent } from './dialog-add-recipe-form/dialog-add-recipe-form.component';
import { DialogAddSamplingComponent } from './dialog-add-sampling/dialog-add-sampling.component';
import { Labrat } from '../labrat';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  error:any = null;

  //company data
  //name: string; address: string; postalcode: string; city: string; nip: string; category: string;
  
  isAuth = false;
  isLabrat: Labrat;
  IsLabrat = false;
  isAdmin = false;
  currentRoute: string;
  private authListenerSubs: Subscription;
  private labratListenerSub: Subscription;
  private adminListenerSub: Subscription;
  constructor(
    private authService: AuthService, 
    private router: Router,
    //private cs: CompanyService,

    public addCompany: MatDialog,
    public addLabrat: MatDialog,
    public addClient: MatDialog,
    public addRecipe: MatDialog,
    public addSampling: MatDialog
    ) {
      router.events.subscribe(val => {
        if (val instanceof NavigationEnd) { console.log(val.url); this.currentRoute = val.url }
      })
     }

  ngOnInit(){
    this.isAuth = this.authService.getIsAuth();
    this.IsLabrat = this.authService.getIsLabrat();
    this.authService.UserDetails();
    //this.authService.autoAuthUser();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuth = isAuthenticated;
        this.labratListenerSub = this.authService.getLoggedLabratUpdateListener().subscribe(labrat => {this.IsLabrat = true; this.isLabrat = labrat});
        this.adminListenerSub = this.authService.getAdminStatusListener().subscribe(Admin => {this.isAdmin = Admin})
        //this.isAdmin = this.authService.getIsAdmin();
        /*if (this.userIsAuthenticated) {
          this.getProfile()
        }*/
      });
    //console.log(this.route.url);
  }

  openAddCompanyDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    

    //this.addCompany.open(DialogAddCompanyFormComponent, dialogConfig);
    const dialogRef = this.addCompany.open(DialogAddCompanyFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => console.log("Dialog output:", data));    
  }

  openAddLabratDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.addLabrat.open(DialogAddLabratFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log("Dialog output:", data));
  }

  openAddClientDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    const dialogRef = this.addClient.open(DialogAddClientFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log("Dialog output:", data));
  }

  openAddRecipeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.addRecipe.open(DialogAddRecipeFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log("Dialog output:", data));
  }

  openAddSamplingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = '310px';
    dialogConfig.width = '600px';

    const dialogRef = this.addSampling.open(DialogAddSamplingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
          console.log("Dialog output:", data); 
          if(this.currentRoute == "/filpro")
          {
            this.router.navigate([this.router.url])
          }
    })
  }
  
  ngOnDestroy() {}
  
  onLogout() {
    this.isAuth = false;
    this.isLabrat = null;
    this.IsLabrat = false;
    this.isAdmin = false;
    this.authService.logout();
  }


}

