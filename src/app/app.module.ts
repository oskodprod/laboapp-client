import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

//Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AddClientComponent } from './admin/add-client/add-client.component';
//import { AddCompanyComponent } from './admin/add-company/add-company.component';
//import { AddLabratComponent } from './admin/add-labrat/add-labrat.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { FilterCompanyComponent } from './admin/filter-company/filter-company.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListFormfieldComponent } from './admin/list-formfield/list-formfield.component';
import { ListLabratComponent } from './admin/list-labrat/list-labrat.component';
import { ViewClientComponent } from './admin/view-client/view-client.component';
import { ViewLabratComponent } from './admin/view-labrat/view-labrat.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { FilterRecipeComponent } from './recipe/filter-recipe/filter-recipe.component';
import { AddReportComponent } from './report/add-report/add-report.component';
import { FilterReportComponent } from './report/filter-report/filter-report.component';
import { ViewReportComponent } from './report/view-report/view-report.component';
//import { FilterSampleComponent } from './sample/filter-sample/filter-sample.component';
import { TestSampleComponent } from './sample/test-sample/test-sample.component';
import { ViewSampleComponent } from './sample/view-sample/view-sample.component';
//import { AddSamplingComponent } from './sampling/add-sampling/add-sampling.component';
import { ViewSamplingComponent } from './sampling/view-sampling/view-sampling.component';
import { FilterSamplingComponent } from './sampling/filter-sampling/filter-sampling.component';
import { ViewUserComponent } from './admin/view-user/view-user.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { ViewCompanyComponent } from './admin/view-company/view-company.component';
import { DialogAddCompanyFormComponent } from './navbar/dialog-add-company-form/dialog-add-company-form.component';
import { DialogAddClientFormComponent } from './navbar/dialog-add-client-form/dialog-add-client-form.component';
import { DialogAddLabratFormComponent } from './navbar/dialog-add-labrat-form/dialog-add-labrat-form.component';
import { DialogAddSamplingComponent } from './navbar/dialog-add-sampling/dialog-add-sampling.component';
import { DialogAddRecipeFormComponent } from './navbar/dialog-add-recipe-form/dialog-add-recipe-form.component';
import { DialogEditSampleFormComponent } from './sampling/view-sampling/dialog-edit-sample-form/dialog-edit-sample-form.component';
import { DialogAddSamplesFormComponent } from './sampling/view-sampling/dialog-add-samples-form/dialog-add-samples-form.component';
import { DialogConfdeleteSamplingComponent } from './sampling/filter-sampling/dialog-confdelete-sampling/dialog-confdelete-sampling.component';
import { GeneratedReportComponent } from './report/generated-report/generated-report.component';

@NgModule({
  declarations: [
    AppComponent,
    //AddClientComponent,
    //AddCompanyComponent,
    //AddLabratComponent,
    AddUserComponent,
    FilterCompanyComponent,
    ListClientComponent,
    ListFormfieldComponent,
    ListLabratComponent,
    ViewClientComponent,
    ViewLabratComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    //AddRecipeComponent,
    FilterRecipeComponent,
    AddReportComponent,
    FilterReportComponent,
    ViewReportComponent,
    //FilterSampleComponent,
    TestSampleComponent,
    ViewSampleComponent,
    //AddSamplingComponent,
    ViewSamplingComponent,
    FilterSamplingComponent,
    ViewUserComponent,
    ViewRecipeComponent,
    ViewCompanyComponent,
    DialogAddCompanyFormComponent,
    DialogAddClientFormComponent,
    DialogAddLabratFormComponent,
    DialogAddSamplingComponent,
    DialogAddRecipeFormComponent,
    DialogEditSampleFormComponent,
    DialogAddSamplesFormComponent,
    DialogConfdeleteSamplingComponent,
    GeneratedReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "pl-pl" }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddCompanyFormComponent]
})
export class AppModule { }

registerLocaleData(localePl, "pl-pl")